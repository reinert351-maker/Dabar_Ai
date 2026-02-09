
import React, { useState } from 'react';
import { 
  BOOK_INTRODUCTIONS, HISTORICAL_CONTEXTS, LOGOS_DICTIONARY, 
  THEOLOGICAL_TOPICS, SERMON_OUTLINES, DEVOTIONALS,
  TIMELINE_EVENTS, THEMATIC_PRAYERS
} from '../data/logos_hub';
import { 
  ICON_STUDY, ICON_CHRONOLOGY, ICON_STRONG, ICON_THEME, 
  ICON_SERMON, ICON_DEVOTIONAL, ICON_BIBLE
} from '../constants';

const LogosHub: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(1);
  const [subTab, setSubTab] = useState<string>('default');

  const pillars = [
    { id: 1, title: 'Estrutural', icon: ICON_STUDY('w-5 h-5 md:w-6 h-6'), color: 'bg-blue-600' },
    { id: 2, title: 'Histórico', icon: ICON_CHRONOLOGY('w-5 h-5 md:w-6 h-6'), color: 'bg-green-600' },
    { id: 3, title: 'Linguístico', icon: ICON_STRONG('w-5 h-5 md:w-6 h-6'), color: 'bg-yellow-600' },
    { id: 4, title: 'Teológico', icon: ICON_THEME('w-5 h-5 md:w-6 h-6'), color: 'bg-red-600' },
    { id: 5, title: 'Ensino', icon: ICON_SERMON('w-5 h-5 md:w-6 h-6'), color: 'bg-purple-600' },
    { id: 6, title: 'Devocional', icon: ICON_DEVOTIONAL('w-5 h-5 md:w-6 h-6'), color: 'bg-orange-600' }
  ];

  const handlePillarChange = (id: number) => {
    setActivePillar(id);
    setSubTab('default');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in pb-20">
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-xl md:text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tighter italic mb-4">Logos Content Hub</h2>
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 md:gap-3">
          {pillars.map(p => (
            <button 
              key={p.id}
              onClick={() => handlePillarChange(p.id)}
              className={`flex flex-col items-center p-3 md:p-4 rounded-2xl md:rounded-3xl transition-all ${activePillar === p.id ? `${p.color} text-white shadow-lg` : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400'}`}
            >
              {p.icon}
              <span className="text-[7px] md:text-[9px] font-black uppercase tracking-widest mt-2">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {/* PILLAR 1: ESTRUTURAL */}
        {activePillar === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in slide-in-from-bottom-4">
            {Object.values(BOOK_INTRODUCTIONS).map(intro => (
              <div key={intro.bookId} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm hover:border-blue-400 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-3xl font-black dark:text-white uppercase tracking-tighter italic">{intro.bookId}</h3>
                  <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full uppercase">{intro.genre}</span>
                </div>
                <div className="space-y-4">
                  <p className="text-indigo-600 dark:text-indigo-400 font-black text-xs md:text-sm italic">Tema: {intro.theme}</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                     <p><strong>Autor:</strong> {intro.author}</p>
                     <p><strong>Data:</strong> {intro.date}</p>
                  </div>
                  <div className="space-y-1.5 pt-4 border-t dark:border-slate-700">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Esboço Analítico</span>
                    {intro.outline.map((o, idx) => (
                      <div key={idx} className="flex justify-between p-2 bg-slate-50 dark:bg-slate-900 rounded-lg group hover:bg-blue-50 transition-colors">
                        <span className="font-bold text-slate-700 dark:text-slate-300 text-[9px] md:text-xs">{o.title}</span>
                        <span className="text-blue-500 font-mono text-[9px]">{o.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PILLAR 2: HISTÓRICO */}
        {activePillar === 2 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 max-w-4xl mx-auto">
            {HISTORICAL_CONTEXTS.map(hc => (
              <div key={hc.id} className="bg-white dark:bg-slate-800 p-6 md:p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700 group hover:border-green-400 transition-all">
                <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.2em] mb-4 block">Contexto Político-Geográfico</span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-6">{hc.title}</h3>
                <p className="bible-text text-base md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{hc.content}</p>
                <div className="flex gap-2">
                   {hc.bibleRefs.map(ref => <span key={ref} className="px-4 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full text-[10px] font-bold border border-green-100 dark:border-green-800">{ref}</span>)}
                </div>
              </div>
            ))}
            <div className="pt-10">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-[0.4em] mb-6 text-center">Linha do Tempo Logos</h4>
              <div className="space-y-4">
                {TIMELINE_EVENTS.map(ev => (
                  <div key={ev.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <span className="w-20 font-mono font-black text-green-600 shrink-0">{ev.year}</span>
                    <div>
                      <h5 className="font-black text-slate-800 dark:text-white uppercase text-xs">{ev.title}</h5>
                      <p className="text-xs text-slate-500 mt-1">{ev.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PILLAR 3: LINGUÍSTICO */}
        {activePillar === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4">
            {LOGOS_DICTIONARY.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-yellow-500 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">{ICON_STRONG('w-16 h-16')}</div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-4">{item.term}</h3>
                <p className="text-[10px] text-yellow-600 font-black uppercase mb-4 tracking-widest">{item.usage}</p>
                <p className="bible-text text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">"{item.definition}"</p>
                <div className="flex gap-2">
                   {item.keyRefs.map(ref => <span key={ref} className="text-[9px] font-bold text-slate-400 uppercase bg-slate-50 dark:bg-slate-900 px-2.5 py-1 rounded-lg">{ref}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PILLAR 4: TEOLÓGICO */}
        {activePillar === 4 && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl w-fit mx-auto">
               <SubTab active={subTab === 'default'} onClick={() => setSubTab('default')} label="Desenvolvimento" />
               <SubTab active={subTab === 'systematic'} onClick={() => setSubTab('systematic')} label="Sistemática" />
            </div>
            {THEOLOGICAL_TOPICS.map(topic => (
              <div key={topic.id} className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[50px] shadow-sm border border-slate-100 dark:border-slate-700 group hover:border-red-400 transition-all">
                <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em] mb-4 block">Eixo Doutrinário</span>
                <h3 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white uppercase italic mb-8 border-b dark:border-slate-700 pb-4 tracking-tighter">{topic.title}</h3>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800">
                  <p className="bible-text text-lg md:text-2xl leading-relaxed text-slate-700 dark:text-slate-200">
                    {subTab === 'default' ? topic.development : topic.systematic}
                  </p>
                </div>
                <div className="mt-8 flex gap-3">
                   {topic.refs.map(ref => <span key={ref} className="bg-red-50 dark:bg-red-900/20 text-red-600 px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest">{ref}</span>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PILLAR 5: ENSINO */}
        {activePillar === 5 && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4 max-w-5xl mx-auto">
            {SERMON_OUTLINES.map(out => (
              <div key={out.id} className="bg-white dark:bg-slate-800 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden group hover:border-purple-400 transition-all">
                <div className="bg-purple-600 p-8 md:p-10 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Esboço Homilético Studio</span>
                    <span className="bg-white/20 px-4 py-1 rounded-full text-[9px] font-black uppercase">{out.keyVerse}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">{out.title}</h3>
                </div>
                <div className="p-8 md:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {out.points.map((p, i) => (
                      <div key={i} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[35px] border border-slate-100 dark:border-slate-700 relative">
                        <span className="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg">{i + 1}</span>
                        <h5 className="font-black text-slate-800 dark:text-white uppercase text-xs mb-3 italic tracking-tighter">{p.title}</h5>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">{p.explanation}</p>
                        <span className="text-[9px] font-bold text-purple-500 uppercase">{p.ref}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/10 p-8 rounded-[40px] border border-purple-100 dark:border-purple-800">
                    <h6 className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-4">Aplicação Prática</h6>
                    <p className="bible-text text-lg text-slate-700 dark:text-slate-300 italic">"{out.applications.general}"</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PILLAR 6: DEVOCIONAL */}
        {activePillar === 6 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 max-w-4xl mx-auto">
            {DEVOTIONALS.map(dev => (
              <div key={dev.id} className="bg-amber-50/50 dark:bg-amber-900/10 p-10 md:p-14 rounded-[60px] border border-amber-100 dark:border-amber-800 text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full -ml-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em] block mb-6">Meditação & Presença</span>
                <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-8 leading-none">{dev.title}</h3>
                <p className="bible-text text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 italic">"{dev.content}"</p>
                <div className="bg-white/80 dark:bg-slate-900/80 p-8 rounded-[40px] shadow-sm border border-amber-100 dark:border-amber-900 backdrop-blur-md">
                   <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest block mb-4">Clamor Baseado em {dev.ref}</span>
                   <p className="text-lg font-bold text-amber-900 dark:text-amber-100 italic">"{dev.prayer}"</p>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {THEMATIC_PRAYERS.map(pr => (
                 <div key={pr.id} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                    <h5 className="font-black text-slate-800 dark:text-white uppercase text-xs mb-2">{pr.title}</h5>
                    <p className="text-sm text-slate-500 mb-4 italic">"{pr.content}"</p>
                    <span className="text-[9px] font-bold text-indigo-500 uppercase">{pr.baseRef}</span>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SubTab = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-5 py-2 md:px-8 md:py-3 rounded-xl text-[9px] md:text-[11px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
    {label}
  </button>
);

export default LogosHub;
