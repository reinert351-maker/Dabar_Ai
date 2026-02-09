
import React, { useState } from 'react';
import { PROPHECIES_DATA } from '../data/prophecies_data';
import { ICON_SERMON, ICON_BIBLE } from '../constants';
import { Prophecy, UserState } from '../types';

const PropheciesTab: React.FC<{userState: UserState, setUserState: any}> = ({ userState, setUserState }) => {
  const [activeTestament, setActiveTestament] = useState<'OT' | 'NT'>('OT');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSermon = (ref: string, text: string) => {
    setUserState((prev: UserState) => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  const filteredProphecies = PROPHECIES_DATA.filter(p => p.testament === activeTestament);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in pb-32">
      {/* Header Profético */}
      <header className="bg-slate-900 text-white p-12 rounded-[50px] shadow-2xl mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Profecias & Cumprimentos</h2>
          <p className="text-indigo-200 max-w-2xl text-sm leading-relaxed font-medium">
            Explore a linha da fidelidade divina. Das promessas messiânicas no Antigo Testamento até os eventos escatológicos revelados por Cristo e Seus apóstolos.
          </p>
        </div>

        <div className="flex gap-2 mt-10">
          <button 
            onClick={() => setActiveTestament('OT')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTestament === 'OT' ? 'bg-white text-slate-900 shadow-xl scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Antigo Testamento (Sombras)
          </button>
          <button 
            onClick={() => setActiveTestament('NT')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTestament === 'NT' ? 'bg-white text-slate-900 shadow-xl scale-105' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            Novo Testamento (Realidades)
          </button>
        </div>
      </header>

      {/* Grid de Profecias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProphecies.map(p => (
          <div 
            key={p.id} 
            className={`bg-white dark:bg-slate-800 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all overflow-hidden ${expandedId === p.id ? 'ring-2 ring-indigo-500/20 shadow-xl' : 'hover:border-indigo-200'}`}
          >
            {/* Context Header */}
            <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
               <div className="flex gap-4">
                 {p.ruler.king && <span className="text-[8px] font-black uppercase text-indigo-500 tracking-tighter">Rei: {p.ruler.king}</span>}
                 {p.ruler.priest && <span className="text-[8px] font-black uppercase text-emerald-500 tracking-tighter">Sacerdote: {p.ruler.priest}</span>}
                 {p.ruler.judge && <span className="text-[8px] font-black uppercase text-amber-500 tracking-tighter">Juiz: {p.ruler.judge}</span>}
               </div>
               <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">{p.year}</span>
            </div>

            <div className="p-8">
               <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{p.theme}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Profeta: {p.prophet}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${p.fulfillmentStatus === 'fulfilled' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {p.fulfillmentStatus === 'fulfilled' ? 'Cumprido ✓' : 'Pendente ⌛'}
                  </div>
               </div>

               <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 mb-6">
                  <span className="text-[9px] font-black text-indigo-500 uppercase block mb-2">{p.prophecyRef}</span>
                  <p className="bible-text text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed">"{p.prophecyText}"</p>
               </div>

               <button 
                 onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                 className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-700 rounded-2xl text-[10px] font-black uppercase text-slate-500 hover:text-indigo-600 transition-all mb-4"
               >
                 {expandedId === p.id ? 'Ocultar Detalhes' : 'Ver Cumprimento & Contexto'}
               </button>

               {expandedId === p.id && (
                 <div className="animate-in slide-in-from-top-2 space-y-6">
                    {p.fulfillmentStatus === 'fulfilled' && p.fulfillmentRef && (
                      <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800">
                         <span className="text-[9px] font-black text-emerald-600 uppercase block mb-2">Cumprimento: {p.fulfillmentRef}</span>
                         <p className="bible-text text-lg italic text-emerald-900 dark:text-emerald-200 leading-relaxed">"{p.fulfillmentText}"</p>
                      </div>
                    )}
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-3xl">
                       <span className="text-[9px] font-black text-slate-400 uppercase block mb-2">Comentário Exegético</span>
                       <p className="text-xs text-slate-500 leading-relaxed">{p.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                       <button 
                         onClick={() => toggleSermon(`PROFECIA: ${p.prophecyRef}`, p.prophecyText)}
                         className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${userState.savedForSermons.includes(`PROFECIA: ${p.prophecyRef}`) ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-amber-500'}`}
                       >
                         {ICON_SERMON('w-3 h-3')} Estúdio
                       </button>
                       {p.fulfillmentRef && (
                         <button 
                           onClick={() => toggleSermon(`CUMPRIMENTO: ${p.fulfillmentRef}`, p.fulfillmentText || '')}
                           className={`flex-1 py-4 rounded-2xl text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${userState.savedForSermons.includes(`CUMPRIMENTO: ${p.fulfillmentRef}`) ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-amber-500'}`}
                         >
                           {ICON_BIBLE('w-3 h-3')} Cumprimento
                         </button>
                       )}
                    </div>
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 py-10 border-t border-slate-100 dark:border-slate-800 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Dabar Logos • Prophetic Hub v1.0</p>
      </footer>
    </div>
  );
};

export default PropheciesTab;
