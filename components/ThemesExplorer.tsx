
import React, { useState, useEffect, useMemo } from 'react';
import { TOPICAL_BIBLE } from '../data';
import { searchVersesByKeyword, getVerseByRef } from '../services/database';
import { BIBLE_METADATA, ICON_SERMON } from '../constants';
import { Verse, TopicalTheme, Subtheme, UserState } from '../types';

interface ThemesExplorerProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const ThemesExplorer: React.FC<ThemesExplorerProps> = ({ userState, setUserState }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'concordance'>('topics');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [expandedSubtheme, setExpandedSubtheme] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [themeFilter, setThemeFilter] = useState('');
  const [concordanceResults, setConcordanceResults] = useState<Verse[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [topicVerses, setTopicVerses] = useState<Record<string, Verse>>({});

  const translateRef = (ref: string) => {
    const parts = ref.split(' ');
    if (parts.length < 2) return ref;
    const bookId = parts[0];
    const rest = parts.slice(1).join(' ');
    const portugueseName = BIBLE_METADATA[bookId]?.name || bookId;
    return `${portugueseName} ${rest}`;
  };

  const filteredThemes = useMemo(() => {
    return TOPICAL_BIBLE.filter(t => 
      t.title.toLowerCase().includes(themeFilter.toLowerCase()) ||
      t.description.toLowerCase().includes(themeFilter.toLowerCase())
    );
  }, [themeFilter]);

  const activeTheme = TOPICAL_BIBLE.find(t => t.id === selectedThemeId);

  useEffect(() => {
    if (activeTheme) {
      const allRefs = activeTheme.subthemes.flatMap(s => s.verses);
      // Added explicit string[] type assertion to fix unknown type in iteration
      const uniqueRefs = Array.from(new Set(allRefs)) as string[];
      
      const loadRefs = async () => {
        const newVerses: Record<string, Verse> = {};
        for (const ref of uniqueRefs) {
          // Explicitly handled ref as string via assertion above
          const v = await getVerseByRef(ref);
          if (v) newVerses[ref] = v;
        }
        setTopicVerses(newVerses);
      };
      loadRefs();
    }
  }, [selectedThemeId, activeTheme]);

  const toggleSermon = (ref: string) => {
    setUserState(prev => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  const handleConcordanceSearch = async () => {
    if (searchKeyword.length < 2) return;
    setIsSearching(true);
    const results = await searchVersesByKeyword(searchKeyword);
    setConcordanceResults(results);
    setIsSearching(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-700">
        <button 
          onClick={() => setActiveTab('topics')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'topics' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          Índice de Temas
        </button>
        <button 
          onClick={() => setActiveTab('concordance')}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'concordance' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Busca por Palavra
        </button>
      </div>

      {activeTab === 'topics' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Filtrar temas bíblicos..."
                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-12 py-3 focus:outline-none focus:border-indigo-500 text-sm font-bold dark:text-white transition-all shadow-sm"
                value={themeFilter}
                onChange={e => setThemeFilter(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>

            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
              {filteredThemes.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => { setSelectedThemeId(theme.id); setExpandedSubtheme(null); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    selectedThemeId === theme.id 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white hover:border-indigo-200'
                  }`}
                >
                  <div className="flex-1">
                    <h4 className="font-black text-sm italic uppercase tracking-tighter leading-tight">{theme.title}</h4>
                    <span className={`text-[9px] font-bold uppercase tracking-widest block mt-0.5 ${selectedThemeId === theme.id ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {theme.subthemes.length} subtemas
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${selectedThemeId === theme.id ? 'rotate-90' : 'opacity-0 group-hover:opacity-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            {activeTheme ? (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm mb-6 animate-in slide-in-from-right-4">
                   <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2 italic uppercase tracking-tighter">{activeTheme.title}</h2>
                   <p className="text-slate-500 dark:text-slate-400 bible-text text-lg italic">{activeTheme.description}</p>
                </div>

                <div className="space-y-4">
                  {activeTheme.subthemes.map((sub, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden transition-all shadow-sm">
                      <button 
                        onClick={() => setExpandedSubtheme(expandedSubtheme === sub.title ? null : sub.title)}
                        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                            {idx + 1}
                          </div>
                          <div className="text-left">
                            <h5 className="font-bold text-slate-800 dark:text-white">{sub.title}</h5>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub.verses.length} Referências</span>
                          </div>
                        </div>
                        <svg className={`w-5 h-5 transition-transform ${expandedSubtheme === sub.title ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                      </button>

                      {expandedSubtheme === sub.title && (
                        <div className="px-6 pb-6 pt-2 space-y-4 animate-in slide-in-from-top-2">
                           <div className="grid grid-cols-1 gap-3">
                              {sub.verses.map(ref => (
                                <div key={ref} className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group relative">
                                   <div className="flex justify-between items-center mb-2">
                                      <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                        {translateRef(ref)}
                                      </span>
                                      <button 
                                        onClick={() => toggleSermon(ref)}
                                        className={`p-2 transition-all ${userState.savedForSermons.includes(ref) ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}
                                      >
                                        {ICON_SERMON('w-5 h-5')}
                                      </button>
                                   </div>
                                   <p className="bible-text text-slate-800 dark:text-slate-200 text-base leading-relaxed">
                                      {topicVerses[ref]?.text || "Carregando texto canônico..."}
                                   </p>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-700">
                <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Selecione um tema teológico</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6 italic uppercase tracking-tighter">Concordância Exaustiva</h3>
            <div className="relative">
               <input 
                 type="text" 
                 placeholder="Digite uma palavra para buscar versículos..."
                 className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-14 py-5 focus:outline-none focus:border-indigo-500 transition-all dark:text-white text-lg font-medium"
                 value={searchKeyword}
                 onChange={e => setSearchKeyword(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleConcordanceSearch()}
               />
               <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               <button 
                 onClick={handleConcordanceSearch}
                 className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-2xl font-bold hover:bg-indigo-700 transition-all"
               >
                 Buscar
               </button>
            </div>
          </div>

          <div className="space-y-4">
             {isSearching ? (
               <div className="py-20 text-center">
                 <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Vasculhando as Escrituras...</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 gap-4">
                 {concordanceResults.map((v, i) => (
                   <div key={v.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
                            {translateRef(v.id)}
                          </span>
                          <button 
                            onClick={() => toggleSermon(v.id)}
                            className={`p-2 transition-all ${userState.savedForSermons.includes(v.id) ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'}`}
                          >
                            {ICON_SERMON('w-5 h-5')}
                          </button>
                        </div>
                        <p className="bible-text text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                          {v.text.split(new RegExp(`(${searchKeyword})`, 'gi')).map((part, i) => 
                            part.toLowerCase() === searchKeyword.toLowerCase() 
                              ? <mark key={i} className="bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 rounded px-1 font-bold">{part}</mark> 
                              : part
                          )}
                        </p>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemesExplorer;
