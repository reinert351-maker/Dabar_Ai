
import React, { useState, useMemo, useEffect } from 'react';
import { PS119_MANIFEST, BOOK_CHUNKS, PS119_BOOK_INFO, PS119_LITERAL_CHUNKS } from '../data/book_psalm119';
import { getModuleLiteralContent } from '../services/book_engine';
import { Psalm119Section, UserState, Sermon } from '../types';
import { ICON_SERMON, ICON_STUDY, ICON_BIBLE, ICON_DEVOTIONAL, ICON_STRONG } from '../constants';
import { saveSermon } from '../services/database';
import { GoogleGenAI } from "@google/genai";

type HubMode = 'book' | 'teaching' | 'preaching' | 'deep' | 'devotional';

const Psalm119Hub: React.FC<{ userState: UserState }> = ({ userState }) => {
  const [activeMode, setActiveMode] = useState<HubMode>('book');
  const [selectedId, setSelectedId] = useState<string>("intro");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  // Recupera o conteúdo literal carregado via Engine (RAG Local)
  const activeContent = useMemo(() => {
    return BOOK_CHUNKS[selectedId] || BOOK_CHUNKS["intro"];
  }, [selectedId]);

  const handleAIMode = async (mode: 'preaching' | 'teaching') => {
    setIsGenerating(true);
    setAiResult(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prompt com Protocolo de Fidelidade Dabar AI
      const prompt = `Atue como Dabar AI. Você é um motor de ensino fiel ao livro "${PS119_BOOK_INFO.title}" de ${PS119_BOOK_INFO.author}.
      
      TEXTO LITERAL RECUPERADO (FONTE NORMATIVA):
      ${activeContent.content.join('\n')}
      
      SUA TAREFA:
      Gere um ${mode === 'preaching' ? 'esboço de sermão expositivo' : 'plano de aula de EBD'} estritamente baseado no texto acima.
      
      REGRAS DE OURO:
      1. NÃO invente conteúdo. Se o texto acima for insuficiente, diga: "Conteúdo não disponível nos chunks carregados".
      2. Cite obrigatoriamente a Fonte: Módulo [${activeContent.title}] - Base Marcelo Reinert.
      3. Use tom pastoral, solene e bíblico.
      4. Use Markdown para formatação.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAiResult(response.text || "Falha na geração.");
    } catch (e) {
      setAiResult("Erro ao conectar com a Engine Logos.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToStudio = async () => {
    if (!aiResult) return;
    const newSermon: Sermon = {
      id: `ps119_proj_${Date.now()}`,
      title: `${activeMode === 'preaching' ? 'Sermão' : 'Aula'}: ${activeContent.title}`,
      type: activeMode === 'preaching' ? 'expository' : 'bible-class',
      date: new Date().toISOString(),
      tags: ['Salmo 119', 'Marcelo Reinert'],
      status: 'draft',
      version: 1,
      folder: 'Salmos 119 - Estudo Fixo',
      blocks: [
        { id: 'b1', type: 'context', title: 'Fonte Primária: Livro', content: `Trecho Original de ${activeContent.title}` },
        { id: 'b2', type: 'ai-commentary', title: 'Esboço Derivado', content: aiResult }
      ]
    };
    await saveSermon(newSermon);
    alert("Conteúdo sincronizado com o Estúdio!");
  };

  return (
    <div className="space-y-10 animate-in fade-in pb-40">
      {/* Header Premium do Hub */}
      <div className="bg-slate-900 p-10 md:p-14 rounded-[70px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/40 via-transparent to-emerald-500/10"></div>
        <div className="relative z-10 w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center text-indigo-400 shadow-2xl border border-white/10 backdrop-blur-md">
           {ICON_BIBLE('w-10 h-10')}
        </div>
        <div className="relative z-10 flex-1 text-center md:text-left">
          <span className="text-indigo-400 font-black uppercase tracking-[0.5em] text-[9px] mb-2 block">Dabar Engine • Conteúdo Fixo</span>
          <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter mb-1 leading-tight">{PS119_BOOK_INFO.title}</h2>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest italic">Autor: {PS119_BOOK_INFO.author}</p>
        </div>
      </div>

      {/* Seletor de Inteligência */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
         <ModeBtn active={activeMode === 'book'} onClick={() => setActiveMode('book')} icon={ICON_BIBLE('w-4 h-4')} label="Leitura" />
         <ModeBtn active={activeMode === 'teaching'} onClick={() => { setActiveMode('teaching'); handleAIMode('teaching'); }} icon={ICON_STUDY('w-4 h-4')} label="Aula" />
         <ModeBtn active={activeMode === 'preaching'} onClick={() => { setActiveMode('preaching'); handleAIMode('preaching'); }} icon={ICON_SERMON('w-4 h-4')} label="Sermão" />
         <ModeBtn active={activeMode === 'deep'} onClick={() => setActiveMode('deep')} icon={ICON_STRONG('w-4 h-4')} label="Análise" />
         <ModeBtn active={activeMode === 'devotional'} onClick={() => setActiveMode('devotional')} icon={ICON_DEVOTIONAL('w-4 h-4')} label="Meditar" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Baseada no Manifesto */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm p-6 max-h-[70vh] overflow-y-auto no-scrollbar">
           <div className="flex items-center justify-between mb-6 px-3">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Sumário Canônico</h4>
              <span className="text-[9px] font-bold text-indigo-500 uppercase">{PS119_MANIFEST.length} Módulos</span>
           </div>
           <div className="space-y-1.5">
             {PS119_MANIFEST.map(item => (
               <button 
                 key={item.id}
                 onClick={() => { setSelectedId(item.id); if(activeMode === 'teaching' || activeMode === 'preaching') handleAIMode(activeMode); }}
                 className={`w-full text-left p-4 rounded-[24px] transition-all border-2 flex flex-col gap-0.5 ${selectedId === item.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl' : 'hover:bg-slate-50 dark:hover:bg-slate-700 border-transparent text-slate-600 dark:text-slate-300'}`}
               >
                 <p className="font-black text-xs uppercase tracking-tighter line-clamp-1">{item.title}</p>
                 <p className={`text-[8px] font-bold uppercase tracking-widest opacity-60`}>{item.subTitle}</p>
               </button>
             ))}
           </div>
        </div>

        {/* Content Engine - FONTE REDUZIDA AQUI */}
        <div className="lg:col-span-8 space-y-6">
           {activeMode === 'book' && (
             <div className="bg-white dark:bg-slate-800 p-8 md:p-14 rounded-[60px] shadow-sm border border-slate-100 dark:border-slate-700 animate-in slide-in-from-bottom-4">
                <div className="flex flex-col mb-10">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-1 bg-indigo-600 rounded-full"></div>
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em]">Texto Literal</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-tight">{activeContent.title}</h3>
                </div>
                
                <div className="space-y-8">
                   {activeContent.content.map((paragraph, i) => (
                     <p key={i} className="bible-text text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-200 text-justify">
                        {paragraph}
                     </p>
                   ))}
                </div>

                <div className="mt-14 pt-8 border-t border-slate-50 dark:border-slate-700 flex flex-wrap gap-2">
                   {activeContent.keywords.map(k => <span key={k} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-400 text-[9px] font-black uppercase rounded-full border border-slate-100 dark:border-slate-800"># {k}</span>)}
                </div>
             </div>
           )}

           {(activeMode === 'teaching' || activeMode === 'preaching') && (
             <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[60px] shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex justify-between items-center mb-10">
                   <div>
                      <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{activeMode === 'preaching' ? 'Oficina Homilética' : 'Plano de Aula'}</h3>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mt-1">Derivação via Dabar AI</p>
                   </div>
                   {aiResult && <button onClick={saveToStudio} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase shadow-lg transition-all">Sincronizar Estúdio</button>}
                </div>
                {isGenerating ? (
                  <div className="py-24 text-center">
                     <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                     <p className="text-slate-400 font-black uppercase text-[9px] tracking-[0.3em] animate-pulse">Recuperando Chunks...</p>
                  </div>
                ) : (
                  <div className="prose prose-indigo dark:prose-invert max-w-none bible-text text-base leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-900/40 p-6 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-inner">
                    {aiResult || "Selecione uma seção para gerar o material derivado."}
                  </div>
                )}
             </div>
           )}

           {activeMode === 'deep' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
                   <div className="flex items-center gap-3 mb-6">
                      {ICON_STRONG('w-5 h-5 text-indigo-500')}
                      <span className="text-[9px] font-black uppercase text-indigo-500 tracking-[0.2em]">Meta-Dados Teológicos</span>
                   </div>
                   <div className="space-y-3">
                      {activeContent.theologicalInsights.map((insight, i) => (
                        <div key={i} className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-[24px] border border-indigo-100 dark:border-indigo-800 flex items-start gap-4">
                           <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
                           <p className="font-bold text-xs text-indigo-900 dark:text-indigo-100 uppercase tracking-tighter leading-tight">{insight}</p>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
                   <div className="flex items-center gap-3 mb-6">
                      {ICON_STUDY('w-5 h-5 text-emerald-500')}
                      <span className="text-[9px] font-black uppercase text-emerald-500 tracking-[0.2em]">Diretriz Pastoral</span>
                   </div>
                   <div className="flex-1 flex items-center justify-center p-4">
                      <p className="bible-text text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed font-bold text-center">
                        "{activeContent.application}"
                      </p>
                   </div>
                </div>
             </div>
           )}

           {activeMode === 'devotional' && (
             <div className="bg-amber-50 dark:bg-amber-900/10 p-10 md:p-16 rounded-[60px] border border-amber-100 dark:border-amber-800 shadow-sm text-center space-y-10 animate-in zoom-in-95">
                <span className="text-[9px] font-black text-amber-600 uppercase tracking-[0.5em] block">Meditação e Clamor</span>
                <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-tight">{activeContent.title}</h3>
                <p className="bible-text text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-200 italic font-bold">
                  "{activeContent.application}"
                </p>
                <div className="bg-white/90 dark:bg-black/40 p-8 md:p-10 rounded-[45px] border border-amber-200/50 shadow-2xl backdrop-blur-sm">
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block mb-4">Clamor Baseado no Texto</span>
                   <p className="text-base md:text-lg font-bold text-amber-900 dark:text-amber-100 italic">"{activeContent.prayer}"</p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

const ModeBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-[30px] transition-all border-2 ${active ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-105' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-indigo-200'}`}
  >
    {icon}
    <span className="text-[8px] font-black uppercase tracking-[0.2em]">{label}</span>
  </button>
);

export default Psalm119Hub;
