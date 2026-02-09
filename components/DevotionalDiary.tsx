
import React, { useState } from 'react';
import { UserState } from '../types';

interface DevotionalDiaryProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const DevotionalDiary: React.FC<DevotionalDiaryProps> = ({ userState, setUserState }) => {
  const [newEntry, setNewEntry] = useState('');

  const addEntry = () => {
    if (!newEntry.trim()) return;
    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    setUserState(prev => ({
      ...prev,
      devotionalEntries: [{ date, text: newEntry }, ...prev.devotionalEntries]
    }));
    setNewEntry('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 dark:shadow-none">
          <h3 className="text-2xl font-bold mb-2">Vida Devocional</h3>
          <p className="text-indigo-100 text-sm mb-6">Registre seus insights espirituais diariamente, mesmo sem internet.</p>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
             <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-60">Plano de Leitura</span>
             <p className="font-bold">Em progresso: 12% concluído</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700">
           <h4 className="font-bold text-slate-800 dark:text-white mb-4">Promessas de Hoje</h4>
           <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800 italic text-slate-700 dark:text-amber-200 text-sm">
             "O SENHOR é o meu pastor, nada me faltará." - Salmo 23:1
           </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Novo Registro</h3>
          <textarea 
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white mb-4 min-h-[150px]"
            placeholder="O que Deus falou com você hoje?"
            value={newEntry}
            onChange={e => setNewEntry(e.target.value)}
          />
          <button 
            onClick={addEntry}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all"
          >
            Salvar no Diário
          </button>
        </div>

        <div className="space-y-4">
          {userState.devotionalEntries.map((entry, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm animate-in slide-in-from-top-4 duration-300">
              <span className="text-xs font-bold text-indigo-500 mb-2 block">{entry.date}</span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {entry.text}
              </p>
            </div>
          ))}
          {userState.devotionalEntries.length === 0 && (
            <div className="py-20 text-center text-slate-400">
               Seu diário espiritual está vazio. Comece hoje!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevotionalDiary;
