
import React, { useState, useEffect } from 'react';
import { CommentaryPack, CommentaryEntry, UserState, CommentaryKind } from '../types';
import { getCommentariesForRef, saveCommentaryEntries } from '../services/database';
import { ICON_SERMON } from '../constants';

interface CommentariesExplorerProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  onNavigateToBible?: (ref: string) => void;
}

const AVAILABLE_PACKS: CommentaryPack[] = [
  { id: 'base_logos', name: 'Logos Pack Base', author: 'Dabar Team', description: 'Comentários concisos para cada versículo da Bíblia.', kind: 'micro', isPremium: false, size: '2.4MB' },
  { id: 'expository_pro', name: 'Expositivo Pro', author: 'Matthew Henry (Adapt.)', description: 'Exposição profunda focada em pregação e ensino.', kind: 'expository', isPremium: true, size: '12.8MB' },
  { id: 'doctrinal_logos', name: 'Pack Doutrinário', author: 'Logos Institute', description: 'Foco em teologia sistemática e dogmática cristã.', kind: 'doctrinal', isPremium: true, size: '8.1MB' },
  { id: 'homiletical_studio', name: 'Homilético Studio', author: 'Homiletics Lab', description: 'Pontos e esboços prontos para aplicação púlpito.', kind: 'homiletical', isPremium: true, size: '5.5MB' },
];

const CommentariesExplorer: React.FC<CommentariesExplorerProps> = ({ userState, setUserState }) => {
  const [viewMode, setViewMode] = useState<'reader' | 'packs'>('reader');
  const [currentRef, setCurrentRef] = useState('GEN 1:1');
  const [entries, setEntries] = useState<CommentaryEntry[]>([]);
  const [activeKind, setActiveKind] = useState<CommentaryKind>('micro');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, [currentRef]);

  const loadEntries = async () => {
    const data = await getCommentariesForRef(currentRef);
    setEntries(data);
  };

  const handleDownloadPack = async (packId: string) => {
    setIsDownloading(packId);
    // Simulação de download de dados (No mundo real isso viria de um JSON remoto)
    const mockEntries: CommentaryEntry[] = [
      { id: `${packId}_GEN1_1`, packId, scope: 'verse', refStart: 'GEN 1:1', kind: 'micro', title: 'O Princípio Eterno', body: 'Este versículo estabelece a pré-existência de Deus e Sua autoridade absoluta como Criador. Nada existia antes de Sua voz.' },
      { id: `${packId}_GEN1_1_2`, packId, scope: 'verse', refStart: 'GEN 1:1', kind: 'expository', title: 'A Criação Ex-Nihilo', body: 'A palavra "bara" indica uma criação do nada. Deus não usou matéria pré-existente, Ele é a fonte de toda a realidade material e espiritual.' }
    ];
    
    await saveCommentaryEntries(mockEntries);
    setUserState(prev => ({ ...prev, installedPacks: [...(prev.installedPacks || []), packId] }));
    setIsDownloading(null);
    loadEntries();
  };

  const activeEntries = entries.filter(e => e.kind === activeKind);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Navegação de View */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-700">
        <button onClick={() => setViewMode('reader')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'reader' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}>Leitor Exegético</button>
        <button onClick={() => setViewMode('packs')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${viewMode === 'packs' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-500'}`}>Packs de Comentários</button>
      </div>

      {viewMode === 'reader' ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header de Referência */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-xl flex justify-between items-center">
             <div className="flex items-center gap-6">
                <button className="p-3 bg-slate-50 dark:bg-slate-700 rounded-2xl hover:bg-indigo-50 transition-all">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="text-center">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block mb-1">Referência Exegética</span>
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{currentRef}</h2>
                </div>
                <button className="p-3 bg-slate-50 dark:bg-slate-700 rounded-2xl hover:bg-indigo-50 transition-all">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
             </div>
             <div className="relative">
                <input type="text" placeholder="Buscar no texto..." className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-10 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
          </div>

          {/* Categorias de Comentário */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            <KindChip active={activeKind === 'micro'} onClick={() => setActiveKind('micro')} label="Resumo Rápido" color="bg-slate-800" />
            <KindChip active={activeKind === 'expository'} onClick={() => setActiveKind('expository')} label="Expositivo" color="bg-indigo-600" />
            <KindChip active={activeKind === 'doctrinal'} onClick={() => setActiveKind('doctrinal')} label="Doutrinário" color="bg-emerald-600" />
            <KindChip active={activeKind === 'homiletical'} onClick={() => setActiveKind('homiletical')} label="Homilético" color="bg-amber-500" />
            <KindChip active={activeKind === 'historical'} onClick={() => setActiveKind('historical')} label="Histórico" color="bg-rose-500" />
          </div>

          {/* Entradas de Comentário */}
          <div className="space-y-6">
            {activeEntries.length > 0 ? activeEntries.map(entry => (
              <div key={entry.id} className="bg-white dark:bg-slate-800 p-10 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all animate-in slide-in-from-bottom-4">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{entry.title}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-300 hover:text-indigo-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg></button>
                    <button className="p-2 text-slate-300 hover:text-amber-500">{ICON_SERMON('w-5 h-5')}</button>
                  </div>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none bible-text text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                  {entry.body}
                </div>
              </div>
            )) : (
              <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-[50px] border-4 border-dashed border-slate-100 dark:border-slate-700">
                <svg className="w-20 h-20 text-slate-200 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Sem comentários instalados para esta categoria.</p>
                <button onClick={() => setViewMode('packs')} className="mt-4 text-indigo-600 font-bold text-sm uppercase">Gerenciar Packs</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {AVAILABLE_PACKS.map(pack => {
            const isInstalled = (userState.installedPacks || []).includes(pack.id);
            return (
              <div key={pack.id} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{pack.kind}</span>
                    <span className="text-[10px] font-black text-slate-300 uppercase">{pack.size}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic mb-1">{pack.name}</h3>
                  <p className="text-xs text-slate-400 font-bold mb-4">Autor: {pack.author}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">{pack.description}</p>
                </div>
                
                <button 
                  onClick={() => !isInstalled && handleDownloadPack(pack.id)}
                  disabled={isInstalled || isDownloading === pack.id}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${isInstalled ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-indigo-600 hover:text-white'}`}
                >
                  {isDownloading === pack.id ? 'Baixando Atlas Logos...' : isInstalled ? 'Instalado ✓' : pack.isPremium ? 'Desbloquear Premium' : 'Baixar Agora'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const KindChip = ({ active, onClick, label, color }: any) => (
  <button onClick={onClick} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? `${color} text-white shadow-lg` : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>
    {label}
  </button>
);

export default CommentariesExplorer;
