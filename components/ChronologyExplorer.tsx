
import React, { useState } from 'react';
import { DISPENSATIONS_DATA } from '../data';
import { ICON_SERMON } from '../constants';
import { UserState } from '../types';

interface ChronologyExplorerProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const ChronologyExplorer: React.FC<ChronologyExplorerProps> = ({ userState, setUserState }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSermon = (ref: string) => {
    setUserState(prev => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <header className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-4">Panorama das 7 Dispensações</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">A progressão histórica da revelação divina e o trato de Deus com a humanidade.</p>
      </header>

      <div className="space-y-6">
        {DISPENSATIONS_DATA.map((disp, index) => (
          <div 
            key={disp.id}
            className={`group relative overflow-hidden rounded-[40px] border transition-all duration-500 ${
              expandedId === disp.id 
                ? 'bg-white dark:bg-slate-800 shadow-2xl border-transparent' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
            }`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-3" style={{ backgroundColor: disp.color }} />
            <div className="flex flex-col md:flex-row md:items-center justify-between p-10 gap-6">
              <button
                onClick={() => setExpandedId(expandedId === disp.id ? null : disp.id)}
                className="flex-1 text-left flex items-center gap-6"
              >
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-white font-black text-2xl italic shadow-lg" style={{ backgroundColor: disp.color }}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{disp.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">{disp.period}</span>
                    <span className="text-[10px] font-black uppercase text-indigo-500">Duração: {disp.duration}</span>
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => toggleSermon(`DISPENSAÇÃO: ${disp.title}`)}
                  className={`p-4 rounded-2xl transition-all ${userState.savedForSermons.includes(`DISPENSAÇÃO: ${disp.title}`) ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-700 text-slate-300 hover:text-amber-500'}`}
                  title="Salvar Era no Sermão"
                >
                  {ICON_SERMON('w-6 h-6')}
                </button>
                <button onClick={() => setExpandedId(expandedId === disp.id ? null : disp.id)} className="p-4 text-slate-300">
                  <svg className={`w-8 h-8 transition-transform ${expandedId === disp.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {expandedId === disp.id && (
              <div className="px-10 pb-10 space-y-10 animate-in slide-in-from-top-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800">
                  <p className="bible-text text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed">{disp.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-start group/card">
                    <div>
                      <span className="text-[10px] font-black text-emerald-500 uppercase block mb-2">Início da Era</span>
                      <h5 className="font-bold text-slate-800 dark:text-white mb-1">{disp.startRef}</h5>
                      <p className="text-xs text-slate-500">{disp.startText}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSermon(disp.startRef); }} 
                      className={`p-3 rounded-xl transition-all ${userState.savedForSermons.includes(disp.startRef) ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-700 text-slate-300 hover:text-amber-500'}`}
                      title="Salvar no Sermão"
                    >
                      {ICON_SERMON('w-5 h-5')}
                    </button>
                  </div>
                  <div className="p-6 rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-start group/card">
                    <div>
                      <span className="text-[10px] font-black text-rose-500 uppercase block mb-2">Juízo Final</span>
                      <h5 className="font-bold text-slate-800 dark:text-white mb-1">{disp.endRef}</h5>
                      <p className="text-xs text-slate-500">{disp.endText}</p>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleSermon(disp.endRef); }} 
                      className={`p-3 rounded-xl transition-all ${userState.savedForSermons.includes(disp.endRef) ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-700 text-slate-300 hover:text-amber-500'}`}
                      title="Salvar no Sermão"
                    >
                      {ICON_SERMON('w-5 h-5')}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Marcos Históricos e Proféticos</h4>
                  {disp.events.map((event, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group/event hover:border-indigo-200 transition-all">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h6 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{event.title}</h6>
                          <span className="text-[10px] font-bold text-indigo-500 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700">{event.ref}</span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">{event.description}</p>
                      </div>
                      <button 
                        onClick={() => toggleSermon(`${event.title} (${event.ref})`)} 
                        className={`self-start p-3 rounded-xl transition-all ${userState.savedForSermons.includes(`${event.title} (${event.ref})`) ? 'bg-amber-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-300 hover:text-amber-500 shadow-sm'}`}
                        title="Incluir no Sermão"
                      >
                        {ICON_SERMON('w-5 h-5')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChronologyExplorer;
