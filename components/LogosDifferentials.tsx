
import React, { useState, useMemo } from 'react';
import { 
  COMMON_ERRORS, NT_OT_CONNECTIONS, BIBLICAL_PROFILES, INTERTESTAMENTAL_CONTEXT 
} from '../data/logos_hub';
import { ICON_SERMON, ICON_DIFFERENTIALS, ICON_BIBLE, ICON_STRONG } from '../constants';
import { getSermons, saveSermon } from '../services/database';
import { SermonBlock } from '../types';

const LogosDifferentials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'errors' | 'connections' | 'profiles' | 'inter'>('errors');
  const [search, setSearch] = useState('');

  const sendToStudio = async (title: string, content: string) => {
    const sermons = await getSermons();
    const target = sermons.find(s => s.status === 'draft') || (sermons.length > 0 ? sermons[0] : null);
    
    if (!target) return alert("Crie um projeto no Estúdio primeiro.");

    const newBlock: SermonBlock = {
      id: `diff_${Date.now()}`,
      type: 'note',
      title: `Logos: ${title}`,
      content: content
    };

    await saveSermon({ ...target, blocks: [...target.blocks, newBlock] });
    alert(`Enviado para o Estúdio: ${target.title}`);
  };

  const filteredData = useMemo(() => {
    const s = search.toLowerCase();
    switch (activeTab) {
      case 'errors': return COMMON_ERRORS.filter(i => i.mistake.toLowerCase().includes(s) || i.ref.toLowerCase().includes(s));
      case 'connections': return NT_OT_CONNECTIONS.filter(i => i.ot_shadow.toLowerCase().includes(s) || i.nt_fulfillment.toLowerCase().includes(s));
      case 'profiles': return BIBLICAL_PROFILES.filter(i => i.name.toLowerCase().includes(s) || i.mainLessons.toLowerCase().includes(s));
      case 'inter': return INTERTESTAMENTAL_CONTEXT.filter(i => i.title.toLowerCase().includes(s) || i.description.toLowerCase().includes(s));
    }
  }, [activeTab, search]);

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      {/* Header Fixo do Hub Diferenciais */}
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
              {ICON_DIFFERENTIALS('w-6 h-6')}
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">Biblioteca de Diferenciais</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Insights Teológicos de Alta Profundidade</p>
            </div>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Pesquisar nesta biblioteca..."
              className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl px-12 py-4 text-xs font-bold w-full md:w-64 outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <SubTab active={activeTab === 'errors'} onClick={() => {setActiveTab('errors'); setSearch('');}} label="Erros de Interpretação" />
          <SubTab active={activeTab === 'connections'} onClick={() => {setActiveTab('connections'); setSearch('');}} label="Sombras e Realidades" />
          <SubTab active={activeTab === 'profiles'} onClick={() => {setActiveTab('profiles'); setSearch('');}} label="Perfis Biográficos" />
          <SubTab active={activeTab === 'inter'} onClick={() => {setActiveTab('inter'); setSearch('');}} label="Período Intertestamentário" />
        </div>
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'errors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
            {(filteredData as typeof COMMON_ERRORS).map(err => (
              <div key={err.id} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-all h-[450px]">
                <div className="overflow-y-auto no-scrollbar pr-1">
                  <span className="text-[9px] font-black uppercase text-rose-500 tracking-widest mb-4 block">Alerta Exegético</span>
                  <div className="bg-rose-50 dark:bg-rose-900/10 p-4 rounded-2xl mb-6">
                    <p className="text-rose-900 dark:text-rose-300 font-bold text-xs italic">" {err.mistake} "</p>
                  </div>
                  <h4 className="text-lg font-black text-slate-800 dark:text-white mb-4 uppercase italic">Correção Teológica</h4>
                  <p className="bible-text text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{err.correction}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Fundamento: {err.context} ({err.ref})</p>
                </div>
                <button 
                  onClick={() => sendToStudio(`Correção: ${err.ref}`, err.correction)}
                  className="mt-6 w-full py-4 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase text-[9px] hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {ICON_SERMON('w-3 h-3')} Usar como Alerta no Sermão
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 max-w-4xl mx-auto">
            {(filteredData as typeof NT_OT_CONNECTIONS).map(conn => (
              <div key={conn.id} className="bg-white dark:bg-slate-800 p-8 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all">{ICON_BIBLE('w-16 h-16')}</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10">
                   <div className="text-center md:text-left">
                     <span className="text-[8px] font-black uppercase text-indigo-500 tracking-widest mb-2 block">AT: Sombra</span>
                     <h4 className="text-xl font-black text-slate-800 dark:text-white italic leading-tight">{conn.ot_shadow}</h4>
                   </div>
                   <div className="flex justify-center">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center border border-dashed border-indigo-200">
                         <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </div>
                   </div>
                   <div className="text-center md:text-right">
                     <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest mb-2 block">NT: Realidade</span>
                     <h4 className="text-xl font-black text-slate-800 dark:text-white italic leading-tight">{conn.nt_fulfillment}</h4>
                   </div>
                </div>
                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[30px] border border-slate-100 dark:border-slate-800">
                   <p className="bible-text text-lg text-slate-600 dark:text-slate-300 italic leading-relaxed">"{conn.description}"</p>
                </div>
                <div className="mt-6 flex justify-end">
                   <button 
                     onClick={() => sendToStudio(`Conexão Tipológica`, `${conn.ot_shadow} -> ${conn.nt_fulfillment}: ${conn.description}`)}
                     className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-black uppercase text-[8px] shadow-lg flex items-center gap-2"
                   >
                     {ICON_SERMON('w-3 h-3')} Capturar Insight
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profiles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
            {(filteredData as typeof BIBLICAL_PROFILES).map(prof => (
              <div key={prof.id} className="bg-white dark:bg-slate-800 p-8 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-[550px] group hover:border-emerald-200 transition-all">
                <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic mb-6 tracking-tighter border-b border-slate-50 dark:border-slate-700 pb-4">{prof.name}</h3>
                  
                  <div className="space-y-6 mb-8">
                    <div>
                      <span className="text-[8px] font-black uppercase text-emerald-500 tracking-widest mb-2 block">Grandes Forças</span>
                      <div className="flex flex-wrap gap-1.5">
                         {prof.strengths.map(s => <span key={s} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-bold rounded-lg border border-emerald-100 dark:border-emerald-800">{s}</span>)}
                      </div>
                    </div>
                    <div>
                      <span className="text-[8px] font-black uppercase text-rose-500 tracking-widest mb-2 block">Falhas Humanas</span>
                      <div className="flex flex-wrap gap-1.5">
                         {prof.failures.map(f => <span key={f} className="px-2 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 text-[10px] font-bold rounded-lg border border-rose-100 dark:border-rose-800">{f}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-indigo-50 dark:bg-indigo-900/10 rounded-3xl mb-6">
                     <span className="text-[8px] font-black uppercase text-indigo-600 tracking-widest mb-2 block">Lição para o Pregador</span>
                     <p className="text-indigo-900 dark:text-indigo-200 bible-text text-base leading-relaxed">"{prof.mainLessons}"</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-700 mt-2">
                   <div className="flex gap-1.5 overflow-x-auto no-scrollbar max-w-[150px]">
                      {prof.appearances.map(a => <span key={a} className="text-[8px] font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded whitespace-nowrap">{a}</span>)}
                   </div>
                   <button 
                     onClick={() => sendToStudio(`Perfil: ${prof.name}`, prof.mainLessons)}
                     className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-emerald-600 rounded-xl transition-all"
                   >
                     {ICON_SERMON('w-4 h-4')}
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inter' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4">
             {(filteredData as typeof INTERTESTAMENTAL_CONTEXT).map(it => (
               <div key={it.id} className="bg-slate-900 p-10 rounded-[50px] text-white shadow-xl relative overflow-hidden group hover:bg-slate-800 transition-all border border-white/5">
                  <div className="absolute top-0 right-0 p-10 text-7xl font-black text-white/5 italic uppercase pointer-events-none group-hover:scale-110 transition-transform">{it.group}</div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${it.group === 'event' ? 'bg-indigo-500' : 'bg-amber-500'} text-white`}>
                           {it.group}
                        </span>
                        <h3 className="text-2xl font-black uppercase italic text-amber-400">{it.title}</h3>
                     </div>
                     <p className="bible-text text-xl leading-relaxed text-slate-300 mb-8 max-w-2xl">{it.description}</p>
                     
                     <div className="bg-white/5 p-6 rounded-[35px] border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                           <div className="w-8 h-8 bg-amber-400/20 rounded-lg flex items-center justify-center text-amber-400">
                              {ICON_STRONG('w-4 h-4')}
                           </div>
                           <span className="text-[9px] font-black uppercase text-amber-400 tracking-[0.2em]">Impacto Direto no Novo Testamento</span>
                        </div>
                        <p className="text-base text-slate-200 leading-snug font-medium italic">"{it.impact}"</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {filteredData?.length === 0 && (
        <div className="py-40 text-center animate-in fade-in">
           <svg className="w-16 h-16 text-slate-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Nenhum registro encontrado para "{search}"</p>
        </div>
      )}
    </div>
  );
};

const SubTab = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-700 text-slate-400 hover:bg-slate-100'}`}>
    {label}
  </button>
);

export default LogosDifferentials;
