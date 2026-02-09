
import React, { useState } from 'react';
import { DISPENSATIONS_DATA } from '../data';
import { ICON_SERMON } from '../constants';
import { UserState } from '../types';

const TimelineTab: React.FC<{userState: UserState, setUserState: any}> = ({ userState, setUserState }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleSermon = (ref: string) => {
    setUserState((prev: UserState) => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  const colorMap: Record<string, string> = {
    "d1": "bg-emerald-500",
    "d2": "bg-amber-500",
    "d3": "bg-blue-500",
    "d4": "bg-violet-500",
    "d5": "bg-rose-500",
    "d6": "bg-pink-500",
    "d7": "bg-indigo-500"
  };

  const textColors: Record<string, string> = {
    "d1": "text-emerald-500",
    "d2": "text-amber-500",
    "d3": "text-blue-500",
    "d4": "text-violet-500",
    "d5": "text-rose-500",
    "d6": "text-pink-500",
    "d7": "text-indigo-500"
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <header className="bg-white dark:bg-slate-800 p-10 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm mb-12">
        <h2 className="text-4xl font-black text-slate-800 dark:text-white italic uppercase tracking-tighter mb-4">Panorama de 7.000 Anos</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-3xl text-base leading-relaxed">
          A Teologia Dispensacional mapeia os tratos de Deus com o homem através das eras. Cada período revela uma nova responsabilidade, uma falha humana e a intervenção da graça soberana.
        </p>
      </header>

      <div className="space-y-4">
        {DISPENSATIONS_DATA.map((disp, index) => {
          const isExpanded = expandedId === disp.id;
          const bgClassName = colorMap[disp.id] || "bg-indigo-600";
          const textClassName = textColors[disp.id] || "text-indigo-600";

          return (
            <div 
              key={disp.id}
              className={`rounded-[40px] border transition-all duration-300 overflow-hidden ${isExpanded ? 'bg-white dark:bg-slate-800 shadow-2xl border-slate-200 dark:border-slate-700' : 'bg-white/50 dark:bg-slate-900/50 border-transparent hover:bg-white'}`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : disp.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg ${bgClassName} group-hover:scale-110 transition-transform`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-black uppercase tracking-tighter italic ${isExpanded ? textClassName : 'text-slate-800 dark:text-white'}`}>
                      {disp.title}
                    </h3>
                    <div className="flex gap-4 mt-1">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{disp.period}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 ${textClassName}`}>
                        Duração: {disp.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-full transition-transform ${isExpanded ? 'rotate-180 bg-slate-100 dark:bg-slate-700' : 'bg-transparent'}`}>
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-8 pb-10 space-y-12 animate-in slide-in-from-top-4">
                  {/* LAYER 1: VISÃO GERAL */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                       <span className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">1</span>
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Visão Geral & Matriz de Prova</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <DetailBlock title="Responsabilidade Humana" content={disp.responsibility} color="border-indigo-500" />
                      <DetailBlock title="Falha Humana" content={disp.humanFailure} color="border-rose-500" />
                      <DetailBlock title="Juízo Divino" content={disp.divineJudgment} color="border-slate-800" />
                      <DetailBlock title="Graça Manifesta" content={disp.divineGrace} color="border-emerald-500" />
                      <DetailBlock title="Mecanismo de Transição" content={disp.transition} color="border-amber-500" />
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[30px] border border-slate-100 dark:border-slate-800">
                        <span className="text-[9px] font-black text-slate-400 uppercase block mb-2 italic">Definição Exegética</span>
                        <p className="text-xs text-slate-500 leading-relaxed italic">"{disp.description}"</p>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 2: TEXTOS-CHAVE & ALIANÇAS */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                       <span className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">2</span>
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Fundamentação Canônica & Pactos</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[40px] border border-indigo-100 dark:border-indigo-800">
                        <h5 className="text-indigo-600 font-black text-xs uppercase mb-4 tracking-widest">Referências Fundamentais</h5>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {disp.keyTexts.map(t => (
                            <span key={t} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-bold text-indigo-500 border border-indigo-100 dark:border-indigo-800">{t}</span>
                          ))}
                        </div>
                        <div className="space-y-4">
                           <div>
                             <span className="text-[9px] font-black uppercase text-indigo-400">Conexão com Promessas</span>
                             <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{disp.promisesLink}</p>
                           </div>
                           <div>
                             <span className="text-[9px] font-black uppercase text-indigo-400">Pilar da Aliança</span>
                             <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">{disp.covenantsLink}</p>
                           </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 flex justify-between items-center group/card">
                           <div>
                             <span className="text-[9px] font-black text-emerald-600 uppercase block mb-1">Gatilho da Era</span>
                             <p className="text-sm font-bold text-slate-800 dark:text-white">{disp.startRef}</p>
                             <p className="text-[10px] text-slate-500 uppercase">{disp.startText}</p>
                           </div>
                           <button onClick={() => toggleSermon(disp.startRef)} className={`p-3 rounded-xl transition-all ${userState.savedForSermons.includes(disp.startRef) ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-300 hover:text-amber-500'}`}>{ICON_SERMON('w-5 h-5')}</button>
                        </div>
                        <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800 flex justify-between items-center group/card">
                           <div>
                             <span className="text-[9px] font-black text-rose-600 uppercase block mb-1">Fechamento (Juízo)</span>
                             <p className="text-sm font-bold text-slate-800 dark:text-white">{disp.endRef}</p>
                             <p className="text-[10px] text-slate-500 uppercase">{disp.endText}</p>
                           </div>
                           <button onClick={() => toggleSermon(disp.endRef)} className={`p-3 rounded-xl transition-all ${userState.savedForSermons.includes(disp.endRef) ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-300 hover:text-amber-500'}`}>{ICON_SERMON('w-5 h-5')}</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LAYER 3: LINHA DO TEMPO INTEGRADA */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                       <span className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">3</span>
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Cronologia de Eventos Marcantes</h4>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {disp.events.map((event, i) => (
                        <div key={i} className="flex gap-4 p-6 rounded-[30px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group/event hover:border-indigo-200 transition-all">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h6 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter italic">{event.title}</h6>
                              <span className={`text-[10px] font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-700 ${textClassName}`}>{event.ref}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{event.description}</p>
                          </div>
                          <button 
                            onClick={() => toggleSermon(`${event.title} (${event.ref})`)} 
                            className={`self-start p-3 rounded-xl transition-all ${userState.savedForSermons.includes(`${event.title} (${event.ref})`) ? 'bg-amber-500 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-300 hover:text-amber-500 shadow-sm'}`}
                          >
                            {ICON_SERMON('w-4 h-4')}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* LAYER 4: DIFERENCIAL HOMILÉTICO (DIFERENCIAL) */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2">
                       <span className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">4</span>
                       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Diferencial Homilético & Hermenêutica</h4>
                    </div>
                    <div className="bg-slate-900 p-10 rounded-[50px] text-white shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                          <div>
                             <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] block mb-3">Aplicação Hoje</span>
                             <p className="text-sm italic text-slate-300 leading-relaxed">"{disp.todayLessons}"</p>
                          </div>
                          <div>
                             <span className="text-[9px] font-black text-rose-400 uppercase tracking-[0.2em] block mb-3">Erros de Interpretação</span>
                             <p className="text-sm italic text-slate-300 leading-relaxed">"{disp.interpretationErrors}"</p>
                          </div>
                          <div>
                             <span className="text-[9px] font-black text-amber-400 uppercase tracking-[0.2em] block mb-3">Como NÃO confundir</span>
                             <p className="text-sm italic text-slate-300 leading-relaxed">"{disp.howToNotConfuse}"</p>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <footer className="mt-20 p-10 text-center">
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Dabar Logos • Chronos Engine v2.5</p>
      </footer>
    </div>
  );
};

const DetailBlock = ({ title, content, color }: { title: string, content: string, color: string }) => (
  <div className={`bg-white dark:bg-slate-800 p-6 rounded-[30px] border-l-4 ${color} shadow-sm border border-slate-100 dark:border-slate-700`}>
    <span className="text-[9px] font-black text-slate-400 uppercase block mb-1 tracking-tighter">{title}</span>
    <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">{content}</p>
  </div>
);

export default TimelineTab;
