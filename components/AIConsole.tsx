import React, { useState, useEffect, useRef } from 'react';
import { ICON_ASSISTANT } from '../constants';
import { getSermons, getLibraryClips } from '../services/database';

const AIConsole: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');

  const startListening = () => {
    // If already listening, stop the current session
    if (isListening) {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
      return;
    }

    // Speech API requires a secure context (HTTPS)
    const isSecure = window.isSecureContext || window.location.protocol === 'https:' || window.location.hostname === 'localhost';
    if (!isSecure) {
      alert("ERRO DE SEGURANÇA: O assistente de voz requer uma conexão segura (HTTPS).");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("ERRO DE COMPATIBILIDADE: Comandos de voz não suportados neste navegador.");
      return;
    }

    // Cleanup previous instances to avoid conflict
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
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      transcriptRef.current = '';
    };

    recognition.onresult = (event: any) => {
      const current = event.results[0][0].transcript;
      setTranscript(current);
      transcriptRef.current = current;
    };

    recognition.onend = () => {
      setIsListening(false);
      const finalTranscript = transcriptRef.current;
      if (finalTranscript && finalTranscript.trim().length > 0) {
        handleIntent(finalTranscript);
      }
      recognitionRef.current = null;
    };

    recognition.onerror = (event: any) => {
      console.error("Assistant Voice Error:", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        alert("PERMISSÃO NEGADA: O microfone foi bloqueado pelo navegador. Verifique as configurações de privacidade do seu navegador clicando no ícone de CADEADO na barra de endereços.");
      } else if (event.error === 'no-speech') {
        // Handle no speech
      } else {
        alert("Erro no assistente: " + event.error);
      }
      recognitionRef.current = null;
    };

    // CRITICAL: Call start() immediately and synchronously inside the click handler to satisfy browser trust
    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Erro fatal ao iniciar SpeechRecognition:", e);
      setIsListening(false);
      alert("Erro ao ativar assistente. Tente recarregar a página ou verificar as permissões do microfone.");
    }
  };

  const handleIntent = async (text: string) => {
    if (!text || text.trim() === '') return;
    const query = text.toLowerCase();
    let response = "";

    // NLU Leve - Regras de Intenção
    if (query.includes("buscar") || query.includes("mostre") || query.includes("sobre")) {
      const keyword = query.replace("buscar", "").replace("mostre tudo sobre", "").replace("sobre", "").trim();
      const sermons = await getSermons();
      const clips = await getLibraryClips();
      
      const foundSermons = sermons.filter(s => s.title.toLowerCase().includes(keyword) || s.blocks.some(b => b.content.toLowerCase().includes(keyword)));
      const foundClips = clips.filter(c => c.content.toLowerCase().includes(keyword));

      response = `Encontrei ${foundSermons.length} sermões e ${foundClips.length} capturas da biblioteca sobre "${keyword}".`;
    } else if (query.includes("abrir") && (query.includes("púlpito") || query.includes("pulpito"))) {
      response = "Preparando modo púlpito. Selecione o sermão na aba Estúdio.";
    } else {
      response = "Entendi seu comando. Como posso auxiliar seu estudo hoje?";
    }

    setHistory(prev => [{ q: text, a: response }, ...prev]);
    
    // TTS (Offline)
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
    setTranscript('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-20">
      <div className="bg-slate-950 p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none"></div>
        
        <button 
          aria-label={isListening ? 'Parar de ouvir' : 'Ativar assistente de voz'}
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all cursor-pointer border-none outline-none z-10 ${isListening ? 'bg-rose-600 animate-pulse scale-110 shadow-[0_0_50px_rgba(225,29,72,0.5)]' : 'bg-indigo-600 shadow-xl shadow-indigo-500/20 hover:bg-indigo-500'}`} 
          onClick={startListening}
        >
          <div className="text-white">
            {ICON_ASSISTANT('w-16 h-16')}
          </div>
        </button>
        
        <p className="mt-8 font-black uppercase tracking-[0.3em] text-[11px] text-indigo-300 relative z-10">
          {isListening ? 'Ouvindo Preceito...' : 'Toque para Assistente de Voz'}
        </p>
        <div className="mt-6 h-12 text-center text-indigo-100 italic bible-text text-xl max-w-lg relative z-10">
          {transcript || (isListening ? "Processando..." : "Fale um comando (ex: Buscar sobre fé)")}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Histórico do Assistente</h4>
        {history.length === 0 ? (
          <div className="p-12 text-center border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px]">
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Nenhuma atividade recente.</p>
          </div>
        ) : (
          history.map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm animate-in slide-in-from-top-4">
              <div className="flex gap-4 mb-4">
                <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full text-[9px] font-black uppercase shrink-0 h-fit">Comando</span>
                <p className="text-slate-800 dark:text-white font-bold">{item.q}</p>
              </div>
              <div className="flex gap-4 items-start border-t border-slate-50 dark:border-slate-700 pt-4">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[9px] font-black uppercase shrink-0 h-fit">Dabar AI</span>
                <p className="text-slate-600 dark:text-slate-400 bible-text text-lg italic">{item.a}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AIConsole;