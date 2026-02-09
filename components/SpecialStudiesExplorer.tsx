
import React, { useState } from 'react';
import { SPECIAL_STUDIES_DATA } from '../data';

const SpecialStudiesExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const study = SPECIAL_STUDIES_DATA.find(s => s.id === selectedId);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SPECIAL_STUDIES_DATA.map(s => (
          <button 
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className={`p-6 rounded-3xl border text-center transition-all ${
              selectedId === s.id 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white hover:border-indigo-300'
            }`}
          >
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-indigo-600 dark:text-indigo-400">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h4 className="font-bold text-sm uppercase tracking-wider">{s.title}</h4>
          </button>
        ))}
      </div>

      {study ? (
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-50 dark:border-slate-700 pb-4">{study.title}</h2>
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 bible-text">
              {study.content}
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                <h5 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">Simbolismo Teológico</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">A tipologia aplicada a este estudo revela camadas profundas sobre o plano da redenção.</p>
             </div>
             <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-slate-900 dark:text-slate-200 mb-2">Referências Cruzadas</h5>
                <p className="text-sm text-slate-600 dark:text-slate-400">Conecte este estudo com outros temas para uma visão holística das Escrituras.</p>
             </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-400 font-medium">Selecione um tópico acima para iniciar o estudo profundo.</p>
        </div>
      )}
    </div>
  );
};

export default SpecialStudiesExplorer;
