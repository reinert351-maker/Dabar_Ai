
import React, { useState } from 'react';
import { STRONGS_DATA } from '../data';
import { ICON_SERMON } from '../constants';
import { StrongEntry, UserState } from '../types';

interface StrongsDictionaryProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const StrongsDictionary: React.FC<StrongsDictionaryProps> = ({ userState, setUserState }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = (Object.values(STRONGS_DATA) as StrongEntry[]).filter(entry => 
    entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSermon = (id: string) => {
    const ref = `STRONG ${id}`;
    setUserState(prev => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Buscar por número (H7225), palavra ou definição..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-12 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 transition-all group relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded mb-2 inline-block">
                  {entry.id.startsWith('H') ? 'Hebraico' : 'Grego'} {entry.id}
                </span>
                <h3 className="text-4xl font-serif font-bold text-slate-800 dark:text-white">{entry.original}</h3>
                <p className="text-slate-400 italic">Transliteração: {entry.transliteration}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-10 w-10 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-bold text-xs">
                  {entry.occurrences}
                </div>
                <button 
                  onClick={() => toggleSermon(entry.id)}
                  className={`p-2 rounded-xl transition-all ${userState.savedForSermons.includes(`STRONG ${entry.id}`) ? 'bg-amber-500 text-white' : 'bg-slate-50 dark:bg-slate-700 text-slate-300 hover:text-amber-500'}`}
                  title="Incluir no Sermão"
                >
                  {ICON_SERMON('w-5 h-5')}
                </button>
              </div>
            </div>
            <div className="prose prose-slate dark:prose-invert">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                {entry.definition}
              </p>
            </div>
          </div>
        ))}
        {filteredEntries.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400">Nenhum registro Strong encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrongsDictionary;
