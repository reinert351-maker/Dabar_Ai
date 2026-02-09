
import React, { useState } from 'react';
import { generateTeiaOffline, enrichTeiaWithAI } from '../services/graph_engine';
import { TeiaNode, TeiaGraph, UserState, Sermon, SermonBlock } from '../types';
import { saveTeiaCache, getTeiaCache, getSermons, saveSermon } from '../services/database';
import GraphCanvas from './GraphCanvas';
import { ICON_SERMON, ICON_BIBLE, ICON_ASSISTANT } from '../constants';

const TeiaTab: React.FC<{ userState: UserState }> = ({ userState }) => {
  const [query, setQuery] = useState('');
  const [graph, setGraph] = useState<TeiaGraph | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TeiaNode | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    const hash = btoa(query.toLowerCase().trim());
    const cached = await getTeiaCache(hash);
    
    if (cached) {
      setGraph(cached);
      setIsLoading(false);
      return;
    }

    const result = await generateTeiaOffline(query);
    await saveTeiaCache(result);
    setGraph(result);
    setIsLoading(false);
  };

  const handleExpand = async () => {
    if (!selectedNode || !graph) return;
    setIsEnriching(true);
    const result = await generateTeiaOffline(selectedNode.title, graph);
    setGraph(result);
    setIsEnriching(false);
  };

  const handleAIEnrich = async () => {
    if (!selectedNode || !graph) return;
    setIsEnriching(true);
    const enriched = await enrichTeiaWithAI(graph, selectedNode);
    setGraph(enriched);
    setIsEnriching(false);
  };

  const saveToStudio = async (node: TeiaNode) => {
    const sermons = await getSermons();
    let target = sermons.find(s => s.status === 'draft') || sermons[0];
    if (!target) return alert("Crie um projeto no Estúdio.");

    const newBlock: SermonBlock = {
      id: `teia_${Date.now()}`,
      type: 'ai-commentary',
      title: `Teia Insight: ${node.title}`,
      content: `${node.summary}\n\nFontes: ${node.refs.join(', ') || 'Base Hermenêutica Local'}`,
    };

    await saveSermon({ ...target, blocks: [...target.blocks, newBlock] });
    alert("Inserido no Estúdio Logos.");
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-20">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row gap-6">
           <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Escavar tema (Fé, Tabernáculo, Êxodo)..."
                className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-14 py-5 focus:outline-none focus:border-indigo-500 text-lg font-black italic uppercase dark:text-white transition-all"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           </div>
           <button 
             onClick={handleSearch}
             disabled={isLoading}
             className="bg-indigo-600 text-white px-12 py-5 rounded-3xl font-black uppercase italic shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
           >
             {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Mapear Conhecimento'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={selectedNode ? 'lg:col-span-8' : 'lg:col-span-12'}>
          {graph ? (
            <GraphCanvas nodes={graph.nodes} edges={graph.edges} onNodeClick={setSelectedNode} theme={userState.theme} />
          ) : (
            <div className="h-[650px] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-[60px] border-4 border-dashed border-slate-200 dark:border-slate-800">
               <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h3 className="text-2xl font-black uppercase text-slate-400 italic">Dabar Graph Engine</h3>
               <p className="text-slate-300 font-bold mt-2 uppercase text-xs tracking-widest">A inteligência visual aplicada à teologia</p>
            </div>
          )}
        </div>

        {selectedNode && (
          <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-2xl p-10 animate-in slide-in-from-right-8 sticky top-24">
             <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{selectedNode.type}</span>
                <button onClick={() => setSelectedNode(null)} className="text-slate-300 hover:text-rose-500">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
             
             <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-6">{selectedNode.title}</h3>
             
             <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[35px] mb-8 border border-slate-100 dark:border-slate-800">
                <p className="bible-text text-xl italic text-slate-600 dark:text-slate-300 leading-relaxed">
                   "{selectedNode.summary}"
                </p>
             </div>

             <div className="grid grid-cols-2 gap-3 mb-8">
                <button 
                  onClick={handleExpand}
                  className="bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all flex flex-col items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Expandir Local
                </button>
                <button 
                  onClick={handleAIEnrich}
                  disabled={isEnriching}
                  className="bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-700 transition-all flex flex-col items-center gap-2"
                >
                  {isEnriching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : ICON_ASSISTANT('w-5 h-5')}
                  IA Enriquecer
                </button>
             </div>

             <div className="space-y-3">
                <button 
                  onClick={() => saveToStudio(selectedNode)}
                  className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-black uppercase text-[11px] tracking-widest shadow-lg hover:bg-indigo-700 flex items-center justify-center gap-3"
                >
                   {ICON_SERMON('w-5 h-5')} Salvar no Estúdio
                </button>
                <button className="w-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 py-5 rounded-[25px] font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-3">
                   {ICON_BIBLE('w-5 h-5')} Abrir Referências
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeiaTab;
