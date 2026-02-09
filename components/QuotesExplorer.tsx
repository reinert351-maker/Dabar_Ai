
import React, { useState, useMemo, useEffect } from 'react';
import { HISTORICAL_QUOTES } from '../data/quotes_data';
import { ICON_SERMON, ICON_QUOTES, ICON_STUDY } from '../constants';
import { Quote, UserState, SermonBlock, Sermon } from '../types';
import { getSermons, saveSermon } from '../services/database';

const QuotesExplorer: React.FC<{ userState: UserState }> = ({ userState }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [projects, setProjects] = useState<Sermon[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    if (showSelector) {
      getSermons().then(setProjects);
    }
  }, [showSelector]);

  const filteredQuotes = useMemo(() => {
    return HISTORICAL_QUOTES.filter(q => {
      const matchesSearch = q.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            q.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeFilter === 'all' || q.category === activeFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeFilter]);

  const handleAddAction = async (quote: Quote, targetSermon?: Sermon, forceType?: 'expository' | 'bible-class') => {
    let target = targetSermon;
    if (!target) {
      const type = forceType || 'expository';
      target = {
        id: `sermon_${Date.now()}`,
        title: `${type === 'bible-class' ? 'Aula' : 'Sermão'}: ${quote.author}`,
        type: type,
        date: new Date().toISOString(),
        tags: ['Citação Histórica'],
        blocks: [],
        status: 'draft',
        version: 1,
        folder: type === 'bible-class' ? 'Aulas' : 'Sermões'
      };
    }
    const newBlock: SermonBlock = {
      id: `quote_${Date.now()}`,
      type: 'illustration',
      title: `Citação: ${quote.author}`,
      content: `"${quote.text}" — ${quote.author} (${quote.century} d.C.)`
    };
    await saveSermon({ ...target, blocks: [...target.blocks, newBlock] });
    alert(`Adicionado com sucesso.`);
    setShowSelector(false);
    setSelectedQuote(null);
  };

  const getCategoryLabel = (cat: string) => {
    const labels: any = { father: 'Pais', reformer: 'Reformadores', puritan: 'Puritanos', revivalist: 'Avivalistas', modern: 'Modernos', contemporary: 'Atuais' };
    return labels[cat] || cat;
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in pb-40">
      <header className="bg-white dark:bg-slate-800 p-6 md:p-10 rounded-[32px] md:rounded-[60px] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4 md:gap-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-[18px] md:rounded-[22px] flex items-center justify-center text-white shadow-xl shrink-0">
                 {ICON_QUOTES('w-6 h-6 md:w-8 h-8')}
              </div>
              <div>
                 <h2 className="text-xl md:text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter leading-none">Vozes da História</h2>
                 <p className="text-slate-400 font-black uppercase text-[8px] md:text-[10px] tracking-widest mt-1 md:mt-2">20 Séculos de Homilética</p>
              </div>
           </div>
           <div className="relative w-full md:w-96">
              <input 
                type="text" 
                placeholder="Buscar autor ou tema..." 
                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl md:rounded-[25px] px-10 md:px-14 py-3 md:py-4 text-xs md:text-sm font-bold focus:ring-2 focus:ring-indigo-500 dark:text-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 md:mt-10">
           <FilterBtn active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} label="Todos" />
           <FilterBtn active={activeFilter === 'father'} onClick={() => setActiveFilter('father')} label="Pais" />
           <FilterBtn active={activeFilter === 'reformer'} onClick={() => setActiveFilter('reformer')} label="Reformas" />
           <FilterBtn active={activeFilter === 'puritan'} onClick={() => setActiveFilter('puritan')} label="Puritanos" />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredQuotes.map(quote => (
          <div key={quote.id} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] md:rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all group">
             <div>
                <div className="flex justify-between items-center mb-4 md:mb-6">
                   <span className="text-[8px] md:text-[9px] font-black uppercase text-indigo-500 tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-full">{getCategoryLabel(quote.category)}</span>
                   <span className="text-[9px] md:text-[10px] font-black text-slate-300 uppercase italic">Séc. {quote.century}</span>
                </div>
                <p className="bible-text text-base md:text-xl leading-relaxed text-slate-700 dark:text-slate-200 mb-6 md:mb-8 italic">
                   "{quote.text}"
                </p>
             </div>
             <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-slate-50 dark:border-slate-700">
                <span className="font-black text-xs md:text-sm uppercase tracking-tighter italic text-slate-900 dark:text-white">{quote.author}</span>
                <button 
                  onClick={() => { setSelectedQuote(quote); setShowSelector(true); }}
                  className="bg-indigo-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-lg"
                >
                  Adicionar
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* MODAL SELETOR - Ajuste para Mobile */}
      {showSelector && selectedQuote && (
        <div className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-xl flex items-end md:items-center justify-center p-0 md:p-6">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-t-[32px] md:rounded-[50px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in-95">
             <div className="p-6 md:p-10 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div>
                   <h3 className="text-xl md:text-2xl font-black dark:text-white uppercase tracking-tighter italic">Vincular Citação</h3>
                   <p className="text-slate-400 text-[9px] font-black uppercase mt-1">De: {selectedQuote.author}</p>
                </div>
                <button onClick={() => setShowSelector(false)} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 custom-scroll">
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => handleAddAction(selectedQuote, undefined, 'expository')} className="p-4 md:p-6 bg-indigo-50 dark:bg-indigo-900/30 border-2 border-dashed border-indigo-200 rounded-2xl flex flex-col items-center gap-2">
                      {ICON_SERMON('w-6 h-6 md:w-8 h-8 text-indigo-500')}
                      <span className="text-[8px] md:text-[10px] font-black uppercase text-indigo-600">Sermão</span>
                   </button>
                   <button onClick={() => handleAddAction(selectedQuote, undefined, 'bible-class')} className="p-4 md:p-6 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-dashed border-emerald-200 rounded-2xl flex flex-col items-center gap-2">
                      {ICON_STUDY('w-6 h-6 md:w-8 h-8 text-emerald-500')}
                      <span className="text-[8px] md:text-[10px] font-black uppercase text-emerald-600">Aula EBD</span>
                   </button>
                </div>
                {projects.length > 0 && (
                  <div className="space-y-3">
                     <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Projeto Ativo</h4>
                     {projects.slice(0, 5).map(p => (
                        <button key={p.id} onClick={() => handleAddAction(selectedQuote, p)} className="w-full text-left p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex justify-between items-center group">
                           <p className="font-bold text-xs text-slate-700 dark:text-slate-200 truncate pr-4">{p.title}</p>
                           <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
                        </button>
                     ))}
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 md:px-5 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}
  >
    {label}
  </button>
);

export default QuotesExplorer;
