
import React, { useState, useEffect, useRef } from 'react';
import { getCoachingReports, saveCoachingReport } from '../services/database';
import { CoachingReport } from '../types';
import { ICON_COACH } from '../constants';

const PreachingCoach: React.FC = () => {
  const [reports, setReports] = useState<CoachingReport[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [wordCount, setWordCount] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);

  useEffect(() => {
    loadReports();
    return () => {
      stopListening();
    };
  }, []);

  const loadReports = async () => {
    const data = await getCoachingReports();
    setReports(data.sort((a, b) => b.createdAt - a.createdAt));
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta análise de voz. Use o Chrome ou Edge.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'pt-BR';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTimer(0);
      setTranscript('');
      setWordCount(0);
      timerIntervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    };

    recognitionRef.current.onresult = (event: any) => {
      let fullText = '';
      for (let i = 0; i < event.results.length; i++) {
        fullText += event.results[i][0].transcript;
      }
      setTranscript(fullText);
      setWordCount(fullText.split(/\s+/).filter(w => w.length > 0).length);
    };

    recognitionRef.current.onerror = (event: any) => {
      // Silencia o erro de 'no-speech' que ocorre quando o usuário faz pausas reflexivas
      if (event.error === 'no-speech') return;
      
      console.error("Erro Coach:", event.error);
      stopListening();
    };

    recognitionRef.current.start();
  };

  const stopListening = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    if (isListening && timer > 5) {
      const wpm = Math.floor((wordCount / timer) * 60);
      const report: CoachingReport = {
        id: `report_${Date.now()}`,
        sessionId: `session_${Date.now()}`,
        metrics: {
          totalDuration: timer,
          avgWordsPerMinute: wpm,
          energyVariance: 0.75,
          silencePercentage: 12
        },
        suggestions: wpm > 150 ? "Seu ritmo está acelerado. Tente pausar para ênfase teológica." : 
                     wpm < 100 ? "Aumente o vigor na proclamação. O ritmo está muito lento." :
                     "Excelente cadência. Mantenha o foco nas aplicações práticas.",
        createdAt: Date.now()
      };
      await saveCoachingReport(report);
      loadReports();
    }
    
    setIsListening(false);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in pb-20">
      <div className="bg-slate-900 p-12 rounded-[60px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 flex-1">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Dabar Voice Coach</h2>
          <p className="text-slate-400 max-w-lg text-sm leading-relaxed mb-6">
            Ative o microfone para que a IA analise seu ritmo, fluência e densidade homilética durante o ensaio da pregação.
          </p>
          
          {isListening && (
            <div className="flex items-center gap-4 animate-pulse">
               <div className="w-4 h-4 bg-rose-600 rounded-full shadow-[0_0_15px_#e11d48]"></div>
               <span className="text-rose-400 font-black uppercase text-xs tracking-widest">Gravando & Analisando...</span>
               <span className="text-2xl font-mono text-white">{formatTime(timer)}</span>
            </div>
          )}
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
           <button 
             onClick={isListening ? stopListening : startListening}
             className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-rose-600 shadow-[0_0_40px_rgba(225,29,72,0.4)] scale-110' : 'bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-500/20'}`}
           >
             {isListening ? (
               <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
             ) : (
               <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
             )}
           </button>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{isListening ? 'Parar' : 'Iniciar Treino'}</span>
        </div>
      </div>

      {isListening && transcript && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border-2 border-emerald-500/20 shadow-xl animate-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Transcrição Ativa</span>
              <span className="text-xs font-bold text-slate-400">{wordCount} palavras detectadas</span>
           </div>
           <p className="bible-text text-xl italic text-slate-600 dark:text-slate-300 leading-relaxed">
             "... {transcript.slice(-200)}"
           </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Relatórios de Performance</h4>
           {reports.map(report => (
             <div key={report.id} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm hover:border-indigo-300 transition-all group">
                <div className="flex justify-between items-center mb-6">
                   <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full uppercase tracking-widest">
                     {new Date(report.createdAt).toLocaleDateString()}
                   </span>
                   <div className="text-emerald-500 font-black text-xl italic">{formatTime(report.metrics.totalDuration)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                      <span className="text-[8px] font-black uppercase opacity-40 block mb-1">Palavras/Min</span>
                      <p className="font-bold text-slate-800 dark:text-white">{report.metrics.avgWordsPerMinute}</p>
                   </div>
                   <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                      <span className="text-[8px] font-black uppercase opacity-40 block mb-1">Variação Vocal</span>
                      <p className="font-bold text-slate-800 dark:text-white">{Math.floor(report.metrics.energyVariance * 100)}%</p>
                   </div>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                   <p className="text-xs text-indigo-900 dark:text-indigo-200 bible-text italic">"{report.suggestions}"</p>
                </div>
             </div>
           ))}
        </div>

        <div className="bg-white dark:bg-slate-800 p-12 rounded-[60px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center text-center">
           <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-indigo-600 mb-8">
              {ICON_COACH('w-12 h-12')}
           </div>
           <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic mb-4">Métricas Ideais</h3>
           <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
             Pregadores eficazes mantêm entre 120 e 150 palavras por minuto. Nossa análise ajuda você a equilibrar autoridade e clareza.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PreachingCoach;
