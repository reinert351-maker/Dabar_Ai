
import React, { useState, useEffect, useRef } from 'react';
import { getChapter, initDB, getSermons, saveSermon } from '../services/database';
import { BIBLE_METADATA, BIBLE_VERSION, ICON_SERMON, BibleBookMetadata } from '../constants';
import { STRONGS_DATA } from '../data';
import { UserState, Verse, StrongEntry, Sermon, SermonBlock, TheologicalLens } from '../types';
import { generateMultiLensStudy } from '../services/ai_generator';

interface BibleReaderProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const BibleReader: React.FC<BibleReaderProps> = ({ userState, setUserState }) => {
  const [currentBookId, setCurrentBookId] = useState<string>("GEN");
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedVerses, setSelectedVerses] = useState<Verse[]>([]);
  
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLens, setActiveLens] = useState<TheologicalLens>('expository');
  const [lensResults, setLensResults] = useState<Record<TheologicalLens, string> | null>(null);

  const [navModalOpen, setNavModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'book' | 'chapter'>('book');
  const [strongModalOpen, setStrongModalOpen] = useState(false);
  const [activeStrong, setActiveStrong] = useState<StrongEntry | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeBook = BIBLE_METADATA[currentBookId];

  useEffect(() => {
    initDB().then(() => setIsInitializing(false));
  }, []);

  useEffect(() => {
    if (isInitializing) return;
    getChapter(currentBookId, currentChapter).then(data => {
      setVerses(data);
      window.scrollTo(0, 0);
    });
  }, [currentBookId, currentChapter, isInitializing]);

  const toggleVerseSelection = (v: Verse) => {
    const isSelected = selectedVerses.some(sv => sv.id === v.id);
    if (isSelected) {
      setSelectedVerses(selectedVerses.filter(sv => sv.id !== v.id));
    } else {
      setSelectedVerses([...selectedVerses, v].sort((a, b) => a.verse - b.verse));
    }
  };

  const getFontSizePx = (size: string) => {
    // Escalonamento adaptativo baseado no dispositivo
    const isMobile = window.innerWidth < 768;
    const factor = isMobile ? 0.85 : 1;
    switch (size) {
      case 'small': return `${1.1 * factor}rem`;
      case 'medium': return `${1.4 * factor}rem`;
      case 'large': return `${1.8 * factor}rem`;
      case 'xl': return `${2.4 * factor}rem`;
      default: return `${1.4 * factor}rem`;
    }
  };

  const handleGenerateStudy = async () => {
    if (selectedVerses.length === 0) return;
    setIsGenerating(true);
    setAiModalOpen(true);
    try {
      const results = await generateMultiLensStudy(
        selectedVerses, 
        userState.theologicalMode || 'christian',
        userState.aiPreference || 'lite'
      );
      setLensResults(results);
    } catch (e) {
      alert("Erro ao gerar estudo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveLensToStudio = async (mode: 'current' | 'all', targetType: 'sermon' | 'lesson') => {
    if (!lensResults) return;
    const sermons = await getSermons();
    let targetSermon = sermons.find(s => s.status === 'draft') || (sermons.length > 0 ? sermons[0] : null);
    
    if (!targetSermon) {
      targetSermon = {
        id: `sermon_${Date.now()}`,
        title: `Estudo: ${selectedVerses[0].id}`,
        type: targetType === 'lesson' ? 'bible-class' : 'expository',
        date: new Date().toISOString(),
        tags: ['Logos AI'],
        blocks: [],
        status: 'draft',
        version: 1,
        folder: targetType === 'lesson' ? 'Aulas' : 'Sermões'
      };
    }

    const newBlocks: SermonBlock[] = [];
    if (mode === 'current') {
      newBlocks.push({
        id: `ai_${Date.now()}`,
        type: 'ai-commentary',
        title: `Lente ${activeLens}`,
        content: lensResults[activeLens]
      });
    } else {
      Object.keys(lensResults).forEach((lens: any, idx) => {
        newBlocks.push({
          id: `ai_${Date.now()}_${idx}`,
          type: 'ai-commentary',
          title: `Lente ${lens}`,
          content: (lensResults as any)[lens]
        });
      });
    }

    await saveSermon({ ...targetSermon, blocks: [...targetSermon.blocks, ...newBlocks] });
    alert("Salvo com sucesso.");
    setAiModalOpen(false);
  };

  if (isInitializing) return <div className="p-20 text-center animate-pulse font-black text-indigo-600">INICIANDO...</div>;

  return (
    <div className="flex flex-col gap-4 md:gap-6 pb-40">
      {/* NAV HEADER */}
      <div className="bg-white dark:bg-slate-800 sepia:bg-[#fdf6e3] p-4 md:p-6 rounded-[24px] md:rounded-[32px] shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between sticky top-20 lg:top-4 z-30">
        <button onClick={() => { setNavModalOpen(true); setModalMode('book'); }} className="text-left">
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{BIBLE_VERSION}</span>
          <h2 className="text-lg md:text-2xl font-black text-slate-800 dark:text-white truncate max-w-[150px] md:max-w-none">
            {activeBook.name} {currentChapter}
          </h2>
        </button>
        <div className="flex gap-1 md:gap-2">
          <button onClick={() => setCurrentChapter(c => Math.max(1, c - 1))} className="p-2 md:p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setCurrentChapter(c => Math.min(activeBook.chapters, c + 1))} className="p-2 md:p-4 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      {/* TEXT AREA */}
      <div className="bg-white dark:bg-slate-800 sepia:bg-[#fdf6e3] p-6 md:p-16 rounded-[32px] md:rounded-[60px] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-10">
          {verses.map((v) => {
            const isSelected = selectedVerses.some(sv => sv.id === v.id);
            return (
              <div 
                key={v.id} 
                onClick={() => toggleVerseSelection(v)}
                className={`group relative transition-all cursor-pointer rounded-2xl p-3 -mx-2 ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-500 shadow-md' : 'hover:bg-slate-50 dark:hover:bg-slate-900/30'}`}
              >
                <div className="flex gap-3 md:gap-6 items-start">
                  <span className={`font-serif font-black text-lg md:text-2xl italic w-6 md:w-8 text-right shrink-0 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`}>{v.verse}</span>
                  <p 
                    className={`${userState.fontFamily === 'serif' ? 'bible-text' : 'font-sans'} leading-relaxed text-slate-800 dark:text-slate-100`}
                    style={{ fontSize: getFontSizePx(userState.fontSize) }}
                  >
                    {v.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE SELECTION BAR */}
      {selectedVerses.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 z-50 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-2xl">
          <div className="bg-slate-900 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-2 border border-white/10">
             <div className="flex items-center gap-3 ml-2">
               <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center font-black text-white text-xs">{selectedVerses.length}</div>
               <span className="hidden sm:block text-xs font-bold text-white uppercase">{selectedVerses[0].id}...</span>
             </div>
             <div className="flex gap-2">
                <button 
                  onClick={handleGenerateStudy}
                  className="bg-white text-slate-900 px-4 py-2.5 rounded-xl font-black uppercase text-[10px] shadow-lg"
                >
                  Estudo AI
                </button>
                <button onClick={() => setSelectedVerses([])} className="p-2.5 bg-white/10 text-white rounded-xl">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
          </div>
        </div>
      )}

      {/* NAVIGATION MODAL */}
      {navModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[32px] md:rounded-[50px] flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl md:text-2xl font-black dark:text-white uppercase tracking-tighter">
                {modalMode === 'book' ? 'Escolha o Livro' : `${activeBook.name}`}
              </h3>
              <button onClick={() => setNavModalOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
              {modalMode === 'book' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {(Object.values(BIBLE_METADATA) as BibleBookMetadata[]).map(meta => (
                    <button key={meta.id} onClick={() => { setCurrentBookId(meta.id); setModalMode('chapter'); }} className={`p-4 rounded-xl font-bold text-sm border ${currentBookId === meta.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 dark:bg-slate-700 dark:text-slate-200'}`}>{meta.name}</button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {Array.from({ length: activeBook.chapters }, (_, i) => i + 1).map(chap => (
                    <button key={chap} onClick={() => { setCurrentChapter(chap); setNavModalOpen(false); }} className="h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 font-black text-lg">{chap}</button>
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

export default BibleReader;
