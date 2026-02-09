
import React, { useState } from 'react';
import { MAPS_DATA } from '../data';

const MapsExplorer: React.FC = () => {
  const [activeMapId, setActiveMapId] = useState(MAPS_DATA[0].id);
  const activeMap = MAPS_DATA.find(m => m.id === activeMapId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-4">
        {MAPS_DATA.map(map => (
          <button
            key={map.id}
            onClick={() => setActiveMapId(map.id)}
            className={`w-full text-left p-6 rounded-3xl border transition-all ${
              activeMapId === map.id 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 dark:shadow-none' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white'
            }`}
          >
            <h4 className="font-bold text-lg mb-1">{map.name}</h4>
            <p className={`text-xs ${activeMapId === map.id ? 'text-indigo-100' : 'text-slate-400'}`}>{map.description}</p>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 min-h-[400px] flex flex-col">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{activeMap?.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 italic">Interação Geográfica Offline</p>
          </div>
          
          <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 relative flex items-center justify-center overflow-hidden">
            <div className="grid grid-cols-2 gap-4 w-full">
               {activeMap?.regions.map(region => (
                 <div key={region.name} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform cursor-pointer">
                    <h5 className="font-bold text-slate-800 dark:text-white">{region.name}</h5>
                    <span className="text-xs text-indigo-500 font-bold">{region.bibleRef}</span>
                 </div>
               ))}
            </div>
            
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
               <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 20 20"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/><path d="M12 6a1 1 0 011 1v4h3a1 1 0 110 2h-4a1 1 0 01-1-1V7a1 1 0 011-1z"/></svg>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-xl border border-amber-100 dark:border-amber-800">
             <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             Clique nas regiões para explorar o contexto bíblico em tempo real.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsExplorer;
