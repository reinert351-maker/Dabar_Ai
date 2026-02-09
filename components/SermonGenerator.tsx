
import React, { useState } from 'react';
import { generateSermonWithAI } from '../services/gemini';
import { aiLimitService } from '../services/aiLimitService';
import { UserState } from '../types';

interface SermonGeneratorProps {
  isPremium: boolean;
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const SermonGenerator: React.FC<SermonGeneratorProps> = ({ isPremium, userState, setUserState }) => {
  const [topic, setTopic] = useState('');
  const [mode, setMode] = useState<'sermon' | 'lesson'>('sermon');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const canUseIA = aiLimitService.canUseFeature('sermon_generator');

  const handleGenerate = async () => {
    if (!topic || userState.savedForSermons.length === 0 || !canUseIA) return;
    setIsLoading(true);
    try {
      const output = await generateSermonWithAI(topic, userState.savedForSermons, mode);
      setResult(output || null);
    } catch (error: any) {
      alert(error.message || "Erro na conexão com Dabar AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeVerse = (ref: string) => {
    setUserState(prev => ({
      ...prev,
      savedForSermons: prev.savedForSermons.filter(r => r !== ref)
    }));
  };

  if (!isPremium) return <div className="p-20 text-center font-bold">Funcionalidade exclusiva Premium.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-xl">
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-8 italic uppercase tracking-tighter">Gerador Homilético AI</h3>
        
        <div className="space-y-6">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-fit border border-slate-200 dark:border-slate-800">
            <button 
              onClick={() => setMode('sermon')}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'sermon' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Sermão Expositivo
            </button>
            <button 
              onClick={() => setMode('lesson')}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'lesson' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Aula Temática
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tema ou Título Provável</label>
            <input 
              type="text" 
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Ex: A Soberania de Deus no Sofrimento"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl px-6 py-4 text-lg font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
            />
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cesto de Versículos ({userState.savedForSermons.length})</label>
             <div className="flex flex-wrap gap-2">
                {userState.savedForSermons.map(ref => (
                  <div key={ref} className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-4 py-2 rounded-xl flex items-center gap-2 group">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">{ref}</span>
                    <button onClick={() => removeVerse(ref)} className="text-slate-400 hover:text-rose-500 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                {userState.savedForSermons.length === 0 && (
                  <div className="text-slate-400 text-xs italic p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl w-full border-2 border-dashed border-slate-200 dark:border-slate-800">
                    Nenhum versículo selecionado. Navegue pela Bíblia e clique no ícone de sermão para adicionar aqui.
                  </div>
                )}
             </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isLoading || !topic || userState.savedForSermons.length === 0 || !canUseIA}
            className={`w-full ${canUseIA ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'} text-white font-black py-5 rounded-[30px] shadow-2xl transition-all flex flex-col items-center justify-center italic uppercase tracking-tighter`}
          >
            <span className="text-xl">{isLoading ? "Processando Teologia..." : canUseIA ? `Gerar Esboço de ${mode === 'sermon' ? 'Sermão' : 'Aula'}` : "Limite Diário Atingido"}</span>
            {!canUseIA && <span className="text-[8px] mt-1 normal-case font-bold tracking-widest">Disponível novamente em 24h</span>}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-2xl animate-in slide-in-from-bottom-6">
           <div className="prose prose-indigo dark:prose-invert max-w-none bible-text">
              {result.split('\n').map((line, i) => (
                <p key={i} className="mb-2 text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{line}</p>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default SermonGenerator;
