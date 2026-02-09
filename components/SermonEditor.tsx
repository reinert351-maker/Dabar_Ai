
import React, { useState, useEffect } from 'react';
import { Sermon, SermonBlock, SermonBlockType } from '../types';
import { GoogleGenAI } from "@google/genai";
import { aiLimitService } from '../services/aiLimitService';

interface SermonEditorProps {
  sermon: Sermon;
  onSave: (sermon: Sermon) => void;
  onClose: () => void;
  onPulpit: () => void;
}

const SermonEditor: React.FC<SermonEditorProps> = ({ sermon, onSave, onClose, onPulpit }) => {
  const [localSermon, setLocalSermon] = useState<Sermon>(sermon);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const addBlock = (type: SermonBlockType) => {
    const newBlock: SermonBlock = {
      id: `b_${Date.now()}`,
      type,
      title: getBlockLabel(type),
      content: ''
    };
    setLocalSermon(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const updateBlock = (id: string, content: string, title?: string) => {
    setLocalSermon(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, content, title: title ?? b.title } : b)
    }));
  };

  const removeBlock = (id: string) => {
    if(confirm('Remover este bloco teológico?')) {
      setLocalSermon(prev => ({
        ...prev,
        blocks: prev.blocks.filter(b => b.id !== id)
      }));
    }
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...localSermon.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBlocks.length) return;
    
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setLocalSermon(prev => ({ ...prev, blocks: newBlocks }));
  };

  const handleAISuggest = async (blockId: string, type: SermonBlockType) => {
    if (!aiLimitService.canUseFeature('sermon_block_ai')) {
      alert("Você já usou sua sugestão diária de blocos. Tente novamente amanhã.");
      return;
    }

    setIsGenerating(blockId);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Atue como um teólogo sênior e mestre em homilética, sugira conteúdo para a seção de "${getBlockLabel(type)}" de um sermão sobre o tema "${localSermon.title}". Use tom bíblico, profundo e acadêmico. Responda em Português do Brasil com formatação clara.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      updateBlock(blockId, response.text || '');
      aiLimitService.recordUsage('sermon_block_ai');
    } catch (e) {
      alert('Erro na conexão com Dabar AI.');
    } finally {
      setIsGenerating(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-[85vh] bg-slate-50 dark:bg-slate-900 rounded-[50px] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xl print:h-auto print:rounded-none print:border-none print:bg-white">
      <div className="bg-white dark:bg-slate-800 p-8 border-b border-slate-100 dark:border-slate-700 flex flex-wrap justify-between items-center gap-6 print:hidden">
        <div className="flex-1 min-w-[300px]">
          <input 
            value={localSermon.title}
            onChange={e => setLocalSermon(prev => ({ ...prev, title: e.target.value }))}
            className="text-3xl font-black bg-transparent border-none outline-none dark:text-white uppercase tracking-tighter italic w-full"
            placeholder="Título do Projeto..."
          />
          <div className="flex items-center gap-4 mt-1">
             <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Estúdio Logos v{localSermon.version || 1}</span>
             <input 
               value={localSermon.folder}
               onChange={e => setLocalSermon(prev => ({ ...prev, folder: e.target.value }))}
               className="text-[10px] font-bold text-slate-400 bg-transparent border-none uppercase tracking-widest"
               placeholder="Pasta..."
             />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onSave(localSermon)} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[9px] shadow-lg hover:bg-indigo-700 transition-all">Salvar</button>
          <button onClick={onPulpit} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black uppercase text-[9px] shadow-lg hover:bg-emerald-700 transition-all">Púlpito</button>
          <button onClick={handlePrint} className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-2xl font-black uppercase text-[9px] hover:bg-slate-200 transition-all">PDF</button>
          <button onClick={onClose} className="p-3 text-slate-300 hover:text-rose-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden print:overflow-visible">
        <div className="w-20 lg:w-72 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700 p-6 overflow-y-auto no-scrollbar hidden md:block print:hidden flex-shrink-0">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Engenharia Logos</h4>
           <div className="space-y-4 pb-10">
              <div className="space-y-1">
                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest px-2 block mb-1">Fundamentação</span>
                <BlockTool onClick={() => addBlock('text-base')} label="Texto Áureo" />
                <BlockTool onClick={() => addBlock('lesson-goal')} label="Objetivo" />
                <BlockTool onClick={() => addBlock('context')} label="Contexto" />
              </div>
              <div className="space-y-1 mt-4">
                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest px-2 block mb-1">Exegese</span>
                <BlockTool onClick={() => addBlock('exegesis')} label="Exegese" />
                <BlockTool onClick={() => addBlock('strong-word')} label="Strong" />
              </div>
              <div className="space-y-1 mt-4">
                <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest px-2 block mb-1">Corpo</span>
                <BlockTool onClick={() => addBlock('introduction')} label="Introdução" />
                <BlockTool onClick={() => addBlock('point')} label="Tópico" />
                <BlockTool onClick={() => addBlock('illustration')} label="Ilustração" />
              </div>
              <div className="space-y-1 mt-4">
                <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest px-2 block mb-1">Fechamento</span>
                <BlockTool onClick={() => addBlock('application')} label="Aplicação" />
                <BlockTool onClick={() => addBlock('conclusion')} label="Conclusão" />
              </div>
           </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto custom-scroll space-y-8 bg-slate-50 dark:bg-slate-900 print:p-0 print:bg-white">
           <div className="max-w-4xl mx-auto space-y-8 pb-32">
             {localSermon.blocks.map((block, index) => (
               <div key={block.id} className={`group relative bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm transition-all print:shadow-none print:border-none print:p-4 ${getBlockColorClass(block.type)}`}>
                  <div className="flex justify-between items-center mb-6 print:hidden">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-slate-800 dark:text-white font-black text-xs">
                        {index + 1}
                      </div>
                      <input 
                        value={block.title}
                        onChange={e => updateBlock(block.id, block.content, e.target.value)}
                        className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-[10px] bg-transparent border-none outline-none"
                        placeholder="Título da Seção..."
                      />
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => moveBlock(index, 'up')} className="p-2 text-slate-300 hover:text-indigo-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg></button>
                      <button onClick={() => moveBlock(index, 'down')} className="p-2 text-slate-300 hover:text-indigo-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7 7" /></svg></button>
                      <button onClick={() => handleAISuggest(block.id, block.type)} className="p-2 text-slate-300 hover:text-amber-500" disabled={!!isGenerating}>
                        {isGenerating === block.id ? <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                      </button>
                      <button onClick={() => removeBlock(block.id)} className="p-2 text-slate-300 hover:text-rose-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                    </div>
                  </div>

                  <textarea 
                    value={block.content}
                    onChange={e => updateBlock(block.id, e.target.value)}
                    placeholder={`Redija o conteúdo de ${block.title}...`}
                    className="w-full bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl p-8 bible-text text-xl leading-relaxed outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all min-h-[160px] dark:text-slate-100 print:bg-white print:p-0 print:text-base print:min-h-0"
                  />
               </div>
             ))}

             {localSermon.blocks.length === 0 && (
               <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[50px]">Estúdio vazio. Adicione componentes ao lado.</div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

const BlockTool = ({ onClick, label }: any) => (
  <button onClick={onClick} className="w-full text-left p-3 rounded-xl border border-slate-50 dark:border-slate-700 hover:border-indigo-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group">
    <span className="text-[10px] font-black text-slate-500 group-hover:text-indigo-600 uppercase tracking-widest leading-none">{label}</span>
  </button>
);

const getBlockLabel = (type: SermonBlockType): string => {
  const labels: Record<SermonBlockType, string> = {
    'text-base': 'Texto Áureo',
    'introduction': 'Introdução',
    'context': 'Contexto Histórico',
    'exegesis': 'Análise Exegética',
    'point': 'Tópico Principal',
    'strong-word': 'Original / Strong',
    'illustration': 'Ilustração',
    'application': 'Aplicação Prática',
    'conclusion': 'Conclusão',
    'note': 'Nota Adicional',
    'chronology': 'Cronologia Bíblica',
    'student-questions': 'Perguntas para Alunos',
    'lesson-goal': 'Objetivo da Lição',
    'ai-commentary': 'Insight IA',
    'library-clip': 'Captura da Biblioteca',
    'coaching-insight': 'Insight de Coaching'
  };
  return labels[type] || 'Bloco';
};

const getBlockColorClass = (type: SermonBlockType): string => {
  switch (type) {
    case 'text-base': return 'border-l-[8px] border-l-indigo-500';
    case 'exegesis': return 'border-l-[8px] border-l-emerald-500';
    case 'point': return 'border-l-[8px] border-l-amber-500';
    case 'application': return 'border-l-[8px] border-l-rose-500';
    default: return 'border-l-[8px] border-l-slate-200';
  }
}

export default SermonEditor;
