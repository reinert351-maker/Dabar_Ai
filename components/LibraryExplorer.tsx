import React, { useState, useEffect, useRef } from 'react';
import { saveLibraryClip, getLibraryClips, deleteLibraryClip, getSermons, saveSermon } from '../services/database';
import { LibraryClip, Sermon, SermonBlock } from '../types';
import { GoogleGenAI } from "@google/genai";

const LibraryExplorer: React.FC = () => {
  const [clips, setClips] = useState<LibraryClip[]>([]);
  const [isCapturing, setIsCapturing] = useState<'ocr' | 'voice' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    loadClips();
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, []);

  const loadClips = async () => {
    const data = await getLibraryClips();
    setClips(data.sort((a, b) => b.createdAt - a.createdAt));
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      alert("Câmera indisponível.");
    }
  };

  const handleStartVoice = () => {
    // Speech Recognition requires a secure context (HTTPS or localhost)
    const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (!isSecure) {
      alert("ERRO DE SEGURANÇA: O reconhecimento de voz requer uma conexão segura (HTTPS). Se você estiver em desenvolvimento local, use localhost.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("ERRO DE COMPATIBILIDADE: Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    // Attempt to stop existing instance before starting new one
    if (recognitionRef.current) {
      try { 
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop(); 
      } catch(e) {}
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsCapturing('voice');
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      let current = '';
      for (let i = 0; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Error:", event.error);
      setIsCapturing(null);
      if (event.error === 'not-allowed') {
        alert("PERMISSÃO NEGADA: O microfone foi bloqueado pelo navegador. Clique no ícone de CADEADO na barra de endereços e ative o Microfone para este site.");
      } else if (event.error === 'no-speech') {
        // Silently handle no speech detected
      } else {
        alert("Erro no microfone: " + event.error);
      }
    };

    recognition.onend = () => {
      // Clean up ref on natural end
      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    // CRITICAL: Call start() immediately in the click handler to satisfy "user gesture" requirement
    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Falha ao iniciar reconhecimento:", e);
      setIsCapturing(null);
      alert("Falha ao ativar o microfone. Verifique se outra aba não está utilizando o dispositivo.");
    }
  };

  const saveVoiceClip = async () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    
    if (!transcript.trim()) {
      setIsCapturing(null);
      return;
    }
    
    setProcessing(true);
    const newClip: LibraryClip = {
      id: `clip_${Date.now()}`,
      type: 'voice',
      title: `Transcrição ${new Date().toLocaleTimeString()}`,
      content: transcript,
      tags: ['Voz'],
      bibleRefs: [],
      createdAt: Date.now()
    };

    await saveLibraryClip(newClip);
    await loadClips();
    setTranscript('');
    setIsCapturing(null);
    setProcessing(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setProcessing(true);
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');
    const base64Data = dataUrl.split(',')[1];

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: "Extraia o texto desta imagem. Identifique referências bíblicas e retorne apenas o texto limpo e as referências." }
          ]
        }
      });

      const newClip: LibraryClip = {
        id: `clip_${Date.now()}`,
        type: 'ocr',
        title: `Scan ${new Date().toLocaleTimeString()}`,
        content: response.text || "Falha no OCR.",
        tags: ['Scan'],
        bibleRefs: [],
        createdAt: Date.now()
      };

      await saveLibraryClip(newClip);
      loadClips();
      setIsCapturing(null);
    } catch (e) {
      alert("Erro no processamento IA. Usando modo manual.");
    } finally {
      setProcessing(false);
    }
  };

  const sendToStudio = async (clip: LibraryClip) => {
    const sermons = await getSermons();
    const target = sermons.find(s => s.status === 'draft') || sermons[0];
    if (!target) return alert("Crie um sermão no estúdio primeiro.");

    const newBlock: SermonBlock = {
      id: `block_${Date.now()}`,
      type: 'library-clip',
      title: clip.title,
      content: clip.content,
      metadata: { clipId: clip.id, refs: clip.bibleRefs }
    };

    await saveSermon({ ...target, blocks: [...target.blocks, newBlock] });
    alert(`Enviado para: ${target.title}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Biblioteca de Captura</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Digitalize Livros e Insights por Voz</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setIsCapturing('ocr'); startCamera(); }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:bg-indigo-700"
          >
            Escaneamento OCR
          </button>
          <button 
            onClick={handleStartVoice}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] shadow-lg hover:bg-emerald-700"
          >
            Transcrição de Áudio
          </button>
        </div>
      </div>

      {isCapturing === 'ocr' && (
        <div className="fixed inset-0 z-[150] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-2xl bg-black rounded-[40px] overflow-hidden shadow-2xl">
             <video ref={videoRef} autoPlay playsInline className="w-full" />
             <canvas ref={canvasRef} className="hidden" />
             {processing && (
               <div className="absolute inset-0 bg-indigo-900/50 flex items-center justify-center backdrop-blur-md">
                 <div className="text-white text-center">
                   <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                   <p className="font-black uppercase tracking-widest text-xs">Extraindo Teologia...</p>
                 </div>
               </div>
             )}
             <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-6">
                <button onClick={() => setIsCapturing(null)} className="bg-white/10 text-white px-8 py-4 rounded-3xl font-bold">Cancelar</button>
                <button onClick={capturePhoto} className="bg-white text-slate-950 px-10 py-5 rounded-3xl font-black uppercase shadow-2xl">Capturar Texto</button>
             </div>
          </div>
        </div>
      )}

      {isCapturing === 'voice' && (
        <div className="fixed inset-0 z-[150] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[40px] p-10 shadow-2xl text-center">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <h3 className="text-2xl font-black dark:text-white uppercase mb-4">Ouvindo Insight...</h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 min-h-[150px] mb-8 text-left italic bible-text dark:text-slate-200">
              {transcript || "Fale agora para transcrever seu pensamento..."}
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => { if(recognitionRef.current) try { recognitionRef.current.stop(); } catch(e) {} setIsCapturing(null); }} className="px-8 py-4 bg-slate-100 dark:bg-slate-700 dark:text-white rounded-2xl font-bold">Cancelar</button>
              <button onClick={saveVoiceClip} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase">Finalizar e Salvar</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map(clip => (
          <div key={clip.id} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${clip.type === 'ocr' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {clip.type}
                </span>
                <button onClick={() => deleteLibraryClip(clip.id).then(loadClips)} className="text-slate-200 hover:text-rose-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg>
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mb-4 italic leading-tight">{clip.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-4 bible-text mb-6">{clip.content}</p>
            </div>
            <button 
              onClick={() => sendToStudio(clip)}
              className="w-full py-4 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase text-[10px] hover:bg-indigo-600 hover:text-white transition-all"
            >
              Inserir no Estúdio Logos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryExplorer;