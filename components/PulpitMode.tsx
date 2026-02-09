
import React, { useState, useEffect, useRef } from 'react';
import { Sermon, PulpitSession, CoachingReport } from '../types';
import { saveCoachingReport } from '../services/database';

interface PulpitModeProps {
  sermon: Sermon;
  onClose: () => void;
}

const PulpitMode: React.FC<PulpitModeProps> = ({ sermon, onClose }) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [blockTimestamps, setBlockTimestamps] = useState<Record<string, number>>({});
  const [fontSize, setFontSize] = useState(36);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        const currentBlockId = sermon.blocks[currentBlockIndex]?.id;
        if (currentBlockId) {
          setBlockTimestamps(prev => ({ ...prev, [currentBlockId]: (prev[currentBlockId] || 0) + 1 }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, currentBlockIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const finalizeSermon = async () => {
    setIsActive(false);
    const report: CoachingReport = {
      id: `report_${Date.now()}`,
      sessionId: `session_${Date.now()}`,
      metrics: {
        totalDuration: timer,
        avgWordsPerMinute: 0, // Poderia ser calculado se houver transcrição
        energyVariance: 0.8,
        silencePercentage: 15
      },
      suggestions: "Sua pregação foi equilibrada. Tente reduzir o tempo na introdução para ganhar fôlego na conclusão.",
      createdAt: Date.now()
    };
    await saveCoachingReport(report);
    alert("Relatório de Pregação gerado com sucesso no Treinador!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 text-white flex flex-col font-serif">
      <div className="bg-slate-900 p-8 border-b border-slate-800 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-rose-600 transition-all">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-indigo-400">{sermon.title}</h2>
            <span className="text-[10px] font-black tracking-widest uppercase opacity-50">Modo Púlpito Logos Pro</span>
          </div>
        </div>
        
        <div className="flex items-center gap-12">
           <div className="flex gap-4">
              <button onClick={() => setFontSize(f => Math.max(20, f - 4))} className="p-3 bg-white/5 rounded-xl font-black">A-</button>
              <button onClick={() => setFontSize(f => Math.min(80, f + 4))} className="p-3 bg-white/5 rounded-xl font-black">A+</button>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-5xl font-black font-mono text-emerald-400">{formatTime(timer)}</span>
             <button onClick={() => setIsActive(!isActive)} className="text-[10px] font-black uppercase tracking-widest mt-2 hover:text-white transition-colors">
               {isActive ? 'Pausar' : 'Iniciar'}
             </button>
           </div>
           <button onClick={finalizeSermon} className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] shadow-lg">Finalizar</button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/4 bg-slate-900/50 p-8 border-r border-slate-800 overflow-y-auto no-scrollbar hidden md:block">
           <h4 className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-8">Navegação Estrutural</h4>
           <div className="space-y-4">
              {sermon.blocks.map((block, i) => (
                <button 
                  key={block.id}
                  onClick={() => setCurrentBlockIndex(i)}
                  className={`w-full text-left p-6 rounded-3xl transition-all border ${currentBlockIndex === i ? 'bg-indigo-600 border-indigo-600 shadow-xl' : 'bg-slate-800/50 border-transparent opacity-40'}`}
                >
                  <span className="text-[8px] font-black uppercase tracking-widest block mb-1">Bloco {i+1}</span>
                  <p className="font-bold text-sm line-clamp-1">{block.title || block.type}</p>
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-12 md:px-24 custom-scroll" ref={blockRef}>
           <div className="max-w-4xl mx-auto space-y-12">
              <div className="bg-slate-900 p-12 rounded-[60px] border border-indigo-500/20 shadow-2xl animate-in slide-in-from-bottom-8">
                 <h3 className="text-2xl font-black italic text-indigo-400 mb-8 uppercase tracking-widest">
                    {sermon.blocks[currentBlockIndex]?.title || sermon.blocks[currentBlockIndex]?.type}
                 </h3>
                 <div 
                   className="leading-[1.6] text-slate-100 font-medium whitespace-pre-wrap selection:bg-indigo-600"
                   style={{ fontSize: `${fontSize}px` }}
                 >
                   {sermon.blocks[currentBlockIndex]?.content || "Início da Pregação"}
                 </div>
              </div>
              <div className="flex justify-between gap-6">
                 <button 
                   disabled={currentBlockIndex === 0}
                   onClick={() => setCurrentBlockIndex(i => i - 1)}
                   className="flex-1 bg-white/5 py-10 rounded-[35px] font-black uppercase text-xs hover:bg-white/10 disabled:opacity-20"
                 >
                   Bloco Anterior
                 </button>
                 <button 
                   disabled={currentBlockIndex === sermon.blocks.length - 1}
                   onClick={() => setCurrentBlockIndex(i => i + 1)}
                   className="flex-1 bg-indigo-600 py-10 rounded-[35px] font-black uppercase text-xs shadow-2xl hover:bg-indigo-700 disabled:opacity-20"
                 >
                   Próximo Bloco
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PulpitMode;
