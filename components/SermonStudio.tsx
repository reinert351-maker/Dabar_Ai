
import React, { useState, useEffect } from 'react';
import { getSermons, saveSermon, deleteSermon } from '../services/database';
import { Sermon, SermonType, UserState, SermonBlock } from '../types';
import SermonEditor from './SermonEditor';
import PulpitMode from './PulpitMode';
import SermonGenerator from './SermonGenerator';

interface SermonStudioProps {
  userState: UserState;
}

const SermonStudio: React.FC<SermonStudioProps> = ({ userState }) => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPulpitMode, setIsPulpitMode] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [filter, setFilter] = useState<SermonType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    const data = await getSermons();
    setSermons(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const getTemplateBlocks = (type: SermonType): SermonBlock[] => {
    switch (type) {
      case 'expository':
        return [
          { id: 'b1', type: 'text-base', title: 'Texto Áureo', content: '' },
          { id: 'b2', type: 'context', title: 'Contexto do Livro', content: '' },
          { id: 'b3', type: 'introduction', title: 'Introdução Pastoral', content: '' },
          { id: 'b4', type: 'exegesis', title: 'Análise do Texto', content: '' },
          { id: 'b5', type: 'point', title: 'Ponto I', content: '' },
          { id: 'b6', type: 'application', title: 'Aplicação', content: '' },
          { id: 'b7', type: 'conclusion', title: 'Conclusão', content: '' }
        ];
      case 'bible-class':
        return [
          { id: 'b1', type: 'lesson-goal', title: 'Objetivo da Aula', content: '' },
          { id: 'b2', type: 'text-base', title: 'Texto de Referência', content: '' },
          { id: 'b3', type: 'introduction', title: 'Introdução Didática', content: '' },
          { id: 'b4', type: 'point', title: 'Desenvolvimento', content: '' },
          { id: 'b5', type: 'student-questions', title: 'Perguntas para Fixação', content: '' },
          { id: 'b6', type: 'application', title: 'Prática na Semana', content: '' }
        ];
      default:
        return [
          { id: 'b1', type: 'introduction', title: 'Introdução', content: '' },
          { id: 'b2', type: 'point', title: 'Desenvolvimento', content: '' },
          { id: 'b3', type: 'conclusion', title: 'Conclusão', content: '' }
        ];
    }
  };

  const createNewSermon = (type: SermonType) => {
    const newSermon: Sermon = {
      id: `sermon_${Date.now()}`,
      title: 'Novo Projeto Teológico',
      type,
      date: new Date().toISOString(),
      tags: [],
      status: 'draft',
      version: 1,
      folder: type === 'bible-class' ? 'Aulas' : 'Sermões',
      blocks: getTemplateBlocks(type)
    };
    setActiveSermon(newSermon);
    setIsEditorOpen(true);
  };

  const handleDuplicate = async (sermon: Sermon) => {
    const duplicated: Sermon = {
      ...sermon,
      id: `sermon_${Date.now()}`,
      title: `${sermon.title} (Cópia)`,
      date: new Date().toISOString(),
    };
    await saveSermon(duplicated);
    loadSermons();
  };

  const handleSave = async (sermon: Sermon) => {
    await saveSermon(sermon);
    await loadSermons();
    setActiveSermon(sermon);
  };

  const folders = Array.from(new Set(sermons.map(s => s.folder || 'Geral')));

  const filteredSermons = sermons.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filter === 'all' || s.type === filter;
    const matchFolder = selectedFolder === 'all' || s.folder === selectedFolder;
    return matchSearch && matchType && matchFolder;
  });

  if (isPulpitMode && activeSermon) {
    return <PulpitMode sermon={activeSermon} onClose={() => setIsPulpitMode(false)} />;
  }

  if (isEditorOpen && activeSermon) {
    return (
      <SermonEditor 
        sermon={activeSermon} 
        onSave={handleSave} 
        onClose={() => setIsEditorOpen(false)} 
        onPulpit={() => setIsPulpitMode(true)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Estúdio Header */}
      <div className="bg-white dark:bg-slate-800 p-10 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
            <div>
              <h2 className="text-4xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic mb-2">Logos Pro Studio</h2>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Ambiente de Engenharia Homilética & Didática</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowAIGenerator(!showAIGenerator)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${showAIGenerator ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-indigo-600 text-white shadow-indigo-200'} shadow-lg`}
              >
                {showAIGenerator ? 'Fechar Gerador' : 'Abrir Gerador IA'}
              </button>
              <TemplateButton onClick={() => createNewSermon('expository')} label="Expositivo" color="bg-emerald-600" />
              <TemplateButton onClick={() => createNewSermon('bible-class')} label="Aula EBD" color="bg-amber-500" />
            </div>
          </div>

          {showAIGenerator ? (
             <div className="mt-8 animate-in slide-in-from-top-4">
                <SermonGenerator isPremium={userState.isPremium} userState={userState} setUserState={() => {}} />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="relative col-span-1 md:col-span-2">
                  <input 
                    type="text" 
                    placeholder="Pesquisar em seus arquivos teológicos..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white text-sm"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <select 
                 className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none dark:text-white text-sm font-bold"
                 value={selectedFolder}
                 onChange={e => setSelectedFolder(e.target.value)}
               >
                  <option value="all">Todas as Pastas</option>
                  {folders.map(f => <option key={f} value={f}>{f}</option>)}
               </select>
            </div>
          )}
        </div>
      </div>

      {!showAIGenerator && (
        <>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label="Todos" />
            <FilterChip active={filter === 'expository'} onClick={() => setFilter('expository')} label="Expositivos" />
            <FilterChip active={filter === 'thematic'} onClick={() => setFilter('thematic')} label="Temáticos" />
            <FilterChip active={filter === 'bible-class'} onClick={() => setFilter('bible-class')} label="Aulas EBD" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map(sermon => (
              <div key={sermon.id} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 hover:border-indigo-300 transition-all group shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-1">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit ${getTypeColor(sermon.type)}`}>
                        {sermon.type}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sermon.folder || 'Geral'}</span>
                    </div>
                    <div className="flex gap-1">
                       <button onClick={() => handleDuplicate(sermon)} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors" title="Duplicar">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                       </button>
                       <button onClick={() => { setActiveSermon(sermon); setIsPulpitMode(true); }} className="p-2 text-slate-300 hover:text-emerald-600 transition-colors" title="Púlpito">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10l4.553 2.276A1 1 0 0120 13.17V21a1 1 0 01-1.447.894L15 20M5 10l-4.553 2.276A1 1 0 000 13.17V21a1 1 0 001.447.894L5 20" /></svg>
                       </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight mb-4 uppercase tracking-tighter italic group-hover:text-indigo-600 transition-colors">
                    {sermon.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex -space-x-2">
                       {sermon.blocks.slice(0, 3).map((b, i) => (
                         <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                            {b.type.charAt(0)}
                         </div>
                       ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{sermon.blocks.length} blocos modulares</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-700">
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">v{sermon.version || 1} • {new Date(sermon.date).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <button onClick={() => { setActiveSermon(sermon); setIsEditorOpen(true); }} className="px-5 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl font-black uppercase text-[9px] hover:bg-indigo-600 hover:text-white transition-all">
                      Editar
                    </button>
                    <button onClick={() => { if(confirm('Excluir permanentemente?')) deleteSermon(sermon.id).then(loadSermons); }} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TemplateButton = ({ onClick, label, color }: any) => (
  <button onClick={onClick} className={`${color} text-white px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:brightness-110 active:scale-95 transition-all`}>
    + {label}
  </button>
);

const FilterChip = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'}`}>
    {label}
  </button>
);

const getTypeColor = (type: string) => {
  switch(type) {
    case 'expository': return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
    case 'thematic': return 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400';
    case 'bible-class': return 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
    case 'theological-study': return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    default: return 'bg-slate-50 text-slate-600';
  }
}

export default SermonStudio;
