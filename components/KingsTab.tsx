
import React, { useState, useMemo } from 'react';
import { KINGS_DATA } from '../data/kings_data';
import { ICON_SERMON, ICON_STUDY, ICON_CHRONOLOGY, ICON_BIBLE, ICON_STRONG, ICON_DIFFERENTIALS } from '../constants';
import { King, UserState, Sermon } from '../types';
import { saveSermon } from '../services/database';

type ViewMode = 'monarchs' | 'prophets' | 'events' | 'compare';

const KingsTab: React.FC<{userState: UserState, setUserState: any}> = ({ userState, setUserState }) => {
  const [activeView, setActiveView] = useState<ViewMode>('monarchs');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleSermon = (ref: string) => {
    setUserState((prev: UserState) => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  const createProject = async (king: King, type: 'sermon' | 'lesson') => {
    const newSermon: Sermon = {
      id: `king_proj_${Date.now()}`,
      title: type === 'sermon' ? `Sermão: A Vida de ${king.name}` : `Aula: O Reinado de ${king.name}`,
      type: type === 'sermon' ? 'expository' : 'bible-class',
      date: new Date().toISOString(),
      tags: ['Reis', king.name, king.dynasty],
      status: 'draft',
      version: 1,
      folder: type === 'sermon' ? 'Sermões Biográficos' : 'História Bíblica',
      blocks: type === 'sermon' ? [
        { id: 'b1', type: 'context', title: 'Contexto Histórico', content: `Rei ${king.name} (${king.years}). Período: ${king.dispensationContext || 'Monarquia'}.` },
        { id: 'b2', type: 'text-base', title: 'Texto Base', content: king.bibleRef },
        { id: 'b3', type: 'point', title: 'Perfil Espiritual', content: king.spiritualProfile || king.summary },
        { id: 'b4', type: 'point', title: 'Lição Central', content: king.leadershipLessons || '' },
        { id: 'b5', type: 'application', title: 'Aplicação Hoje', content: king.spiritualAlerts || '' }
      ] : [
        { id: 'b1', type: 'chronology', title: 'Linha do Tempo', content: `Anos: ${king.years}. Duração: ${king.duration}.` },
        { id: 'b2', type: 'point', title: 'Eventos Chave', content: (king.keyEvents || []).map(e => `${e.title}: ${e.desc}`).join('\n') },
        { id: 'b3', type: 'exegesis', title: 'Análise do Reinado', content: king.summary },
        { id: 'b4', type: 'student-questions', title: 'Questões para Classe', content: `1. Como o perfil de ${king.name} influenciou o povo?\n2. Qual o papel dos profetas ${king.prophets.join(', ')} neste período?` }
      ]
    };

    await saveSermon(newSermon);
    alert(`${type === 'sermon' ? 'Sermão' : 'Aula'} sobre ${king.name} criado no Estúdio!`);
  };

  const prophetsMap = useMemo(() => {
    const map: Record<string, { name: string, kings: string[], periods: string[] }> = {};
    const allKings = [...KINGS_DATA.united, ...KINGS_DATA.judah, ...KINGS_DATA.israel];
    
    allKings.forEach(k => {
      k.prophets.forEach(p => {
        if (!map[p]) map[p] = { name: p, kings: [], periods: [] };
        if (!map[p].kings.includes(k.name)) map[p].kings.push(k.name);
        if (!map[p].periods.includes(k.years)) map[p].periods.push(k.years);
      });
    });
    return Object.values(map);
  }, []);

  // DADOS EXAUSTIVOS: MARCOS HISTÓRICOS
  const historicalMilestones = [
    { 
      year: '1050 a.C.', 
      title: 'Fundação da Monarquia', 
      desc: 'Após séculos sob a liderança de Juízes, Israel exige um rei "como as outras nações". Saul é ungido por Samuel sob uma nuvem de ambivalência divina. O evento marca a transição da Teocracia direta para a Monarquia Teocrática Mediada, onde o rei humano deveria ser um representante do Rei Divino.', 
      importance: 'Revela a tensão entre o desejo humano por segurança visível versus a dependência invisível de Yahweh. Teologicamente, estabelece o "Ofício Real" que mais tarde seria tipificado perfeitamente em Cristo. A falha de Saul prova que o coração do líder é mais importante que sua estatura física.' 
    },
    { 
      year: '957 a.C.', 
      title: 'Consagração do Templo', 
      desc: 'Salomão finaliza a habitação fixa da Glória de Deus (Shekinah) em Jerusalém. O Templo substitui o Tabernáculo móvel, centralizando o culto sacrificial e a presença de Deus em um ponto geográfico fixo, cumprindo a promessa feita a Davi.', 
      importance: 'O Templo torna-se o centro do cosmos teológico. Simboliza a estabilidade da Aliança e a santidade de Deus habitando entre os homens. Tipologicamente, aponta para o corpo de Cristo (Jo 2:21) e, posteriormente, para a Igreja como templo vivo do Espírito Santo.' 
    },
    { 
      year: '931 a.C.', 
      title: 'O Grande Cisma', 
      desc: 'A arrogância de Roboão e o pragmatismo de Jeroboão dividem a nação. As dez tribos do Norte (Israel/Efraim) se separam de Judá e Benjamim (Sul). Jeroboão introduz os bezerros de ouro em Dã e Betel para evitar que o povo subisse a Jerusalém.', 
      importance: 'O início da decadência espiritual institucionalizada. O "Pecado de Jeroboão" torna-se a métrica pela qual todos os reis do Norte serão julgados. Demonstra como o medo político pode levar à corrupção total do culto divino e à perda da herança espiritual.' 
    },
    { 
      year: '860 a.C.', 
      title: 'Confronto no Carmelo', 
      desc: 'Elias desafia os 450 profetas de Baal e 400 de Aserá. O fogo do céu consome o holocausto encharcado, provando que Yahweh é o único Deus em Israel. O evento ocorre sob o reinado de Acabe e Jezabel, o auge da apostasia fenícia no Norte.', 
      importance: 'Uma intervenção direta contra o sincretismo. Reafirma que Deus não divide Sua glória com ídolos. Teologicamente, marca o papel do profeta como o "advogado da aliança" que chama a nação de volta à lei de Moisés em tempos de escuridão total.' 
    },
    { 
      year: '841 a.C.', 
      title: 'Ascensão de Jeú', 
      desc: 'Sob ordem profética, Jeú executa um expurgo sangrento contra a casa de Acabe, Jezabel e os sacerdotes de Baal. Em Judá, a usurpadora Atalia tenta exterminar a linhagem de Davi, mas o jovem Joás é escondido no Templo.', 
      importance: 'A preservação milagrosa da linhagem messiânica. Se Atalia tivesse tido sucesso, a promessa de Gênesis 3:15 teria sido interrompida humanamente. Prova a fidelidade de Deus em manter a "lâmpada de Davi" acesa, mesmo através de meios violentos e crises dinásticas.' 
    },
    { 
      year: '722 a.C.', 
      title: 'Queda de Samaria', 
      desc: 'O Império Assírio, sob Salmaneser V e Sargão II, destrói Samaria e deporta as dez tribos de Israel. O Reino do Norte deixa de existir como entidade soberana devido à idolatria persistente de 209 anos.', 
      importance: 'A consumação do juízo profetizado por Amós e Oseias. Ensina que a eleição nacional não é um salvo-conduto para o pecado. Israel torna-se um exemplo para Judá e para nós de que Deus eventualmente retira Sua proteção de quem endurece o pescoço contra a correção.' 
    },
    { 
      year: '701 a.C.', 
      title: 'Cerco de Jerusalém', 
      desc: 'O rei assírio Senaqueribe sitia Jerusalém após destruir as cidades fortificadas de Judá. Ezequias ora fervorosamente no Templo e o profeta Isaías garante o livramento. Um anjo destrói 185.000 soldados assírios em uma noite.', 
      importance: 'A maior demonstração de teocracia defensiva. Prova que um rei que se humilha e confia em Deus é mais poderoso que o império mais vasto da terra. Teologicamente, reforça a inviolabilidade de Sião enquanto o povo mantiver a Aliança.' 
    },
    { 
      year: '622 a.C.', 
      title: 'Achado do Livro da Lei', 
      desc: 'Durante reformas no Templo sob Josias, o Sumo Sacerdote Hilquias encontra o rolo da Torá (provavelmente o Deuteronômio). A leitura gera um impacto profundo, levando Josias a rasgar suas vestes e iniciar o último grande avivamento de Judá.', 
      importance: 'A autoridade das Escrituras como motor de reforma. Mostra que o verdadeiro avivamento não é emocionalismo, mas retorno à obediência bíblica. Josias remove a idolatria até em Betel, tentando reunificar o culto puro, mas o juízo sobre Judá já estava selado.' 
    },
    { 
      year: '605 a.C.', 
      title: 'Primeira Deportação', 
      desc: 'Nabucodonosor invade Jerusalém pela primeira vez e leva os jovens nobres, incluindo Daniel e seus amigos, para a Babilônia. O Templo é saqueado mas permanece de pé por mais alguns anos sob reis vassalos.', 
      importance: 'O início do "Tempo dos Gentios". Deus começa a disciplinar Judá através do exílio progressivo. Teologicamente, prepara o cenário para que a fidelidade a Deus seja testada fora da terra prometida e longe do sistema ritualístico do Templo.' 
    },
    { 
      year: '586 a.C.', 
      title: 'Destruição de Jerusalém', 
      desc: 'Após rebeliões de Sedequias, Nabucodonosor destrói totalmente os muros de Jerusalém e incendeia o Templo de Salomão. O remanescente é levado para o exílio e a linhagem real física de Davi deixa de governar em um trono terreno.', 
      importance: 'O "Ichabod" de Judá: a glória partiu. O exílio serve para curar a nação da idolatria (que nunca mais retornou como antes). Estabelece a esperança escatológica de um Reino que não é deste mundo e de um Templo que Deus mesmo reconstruiria no coração dos Seus.' 
    }
  ];

  const KingCard: React.FC<{ king: King; type: 'united' | 'judah' | 'israel' }> = ({ king, type }) => {
    const isExpanded = expandedId === king.id;
    const borderColors = { united: 'border-l-amber-500', judah: 'border-l-blue-600', israel: 'border-l-rose-600' };
    const evalColors = { good: 'bg-emerald-500', bad: 'bg-rose-500', mixed: 'bg-amber-500' };

    return (
      <div className={`bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all border-l-[8px] ${borderColors[type]} ${isExpanded ? 'ring-2 ring-indigo-500/20 shadow-xl' : ''}`}>
        <button onClick={() => setExpandedId(isExpanded ? null : king.id)} className="w-full p-6 text-left flex justify-between items-center group">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
               <h3 className="font-black text-xl md:text-2xl uppercase tracking-tighter italic text-slate-800 dark:text-white">{king.name}</h3>
               <div className={`w-3.5 h-3.5 rounded-full ${evalColors[king.evaluation]}`} title={`Avaliação: ${king.evaluation}`}></div>
            </div>
            <div className="flex gap-4 text-[10px] md:text-sm font-black uppercase text-slate-400 tracking-widest">
               <span>{king.years}</span>
               <span className="text-indigo-500">{king.duration}</span>
            </div>
          </div>
          <div className={`p-4 rounded-full transition-transform ${isExpanded ? 'rotate-180 bg-slate-100 dark:bg-slate-700' : ''}`}>
            <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </button>

        {isExpanded && (
          <div className="px-6 md:px-8 pb-10 pt-2 animate-in slide-in-from-top-2 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-inner">
                   <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest block mb-4">Perfil Espiritual</span>
                   <p className="text-base md:text-lg text-slate-700 dark:text-slate-200 font-bold leading-relaxed mb-6 italic">{king.spiritualProfile || king.summary}</p>
                   <div className="space-y-4">
                      <p className="text-sm md:text-base text-slate-500"><strong className="text-slate-800 dark:text-white uppercase text-[10px] tracking-tighter">Relação com Deus:</strong> {king.relationshipWithGod || 'Informação em análise...'}</p>
                      <p className="text-sm md:text-base text-slate-500"><strong className="text-slate-800 dark:text-white uppercase text-[10px] tracking-tighter">Influência no Povo:</strong> {king.spiritualInfluence || 'Informação em análise...'}</p>
                   </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-amber-100 dark:border-amber-800">
                   <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest block mb-5">Diferencial Homilético</span>
                   <div className="space-y-6">
                      <div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Alerta Espiritual</span>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">"{king.spiritualAlerts || 'Analise a integridade do líder.'}"</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Lição de Liderança</span>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">"{king.leadershipLessons || 'O exemplo arrasta gerações.'}"</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Eventos Marcantes & Voz Profética</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      {(king.keyEvents || []).map((e, i) => (
                        <div key={i} className="p-5 bg-white dark:bg-slate-700 rounded-2xl border border-slate-100 dark:border-slate-600 shadow-sm hover:shadow-md transition-all">
                           <span className="text-[10px] font-black text-indigo-600 block mb-2 uppercase tracking-tighter">{e.title}</span>
                           <p className="text-xs md:text-sm text-slate-500 dark:text-slate-300 leading-relaxed font-medium">{e.desc}</p>
                        </div>
                      ))}
                   </div>
                   <div className="p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-[40px] md:rounded-[50px] border border-indigo-100 dark:border-indigo-800 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            {ICON_CHRONOLOGY('w-6 h-6')}
                         </div>
                         <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Profetas Contemporâneos</span>
                      </div>
                      <p className="text-xl font-black text-slate-800 dark:text-white mb-4 italic tracking-tighter uppercase">{king.prophets.join(', ') || 'Nenhum registro principal'}</p>
                      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 italic leading-relaxed">{king.contemporaryProphetsDesc || 'Atuaram na manutenção da aliança mosaica.'}</p>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-100 dark:border-slate-700">
                <button onClick={() => createProject(king, 'sermon')} className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl">
                   {ICON_SERMON('w-5 h-5')} Criar Sermão
                </button>
                <button onClick={() => createProject(king, 'lesson')} className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xl">
                   {ICON_STUDY('w-5 h-5')} Criar Aula
                </button>
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 animate-in fade-in pb-40">
      {/* Navigation View Modes */}
      <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto no-scrollbar py-2">
         <ModeTab active={activeView === 'monarchs'} onClick={() => setActiveView('monarchs')} label="Lista de Monarcas" />
         <ModeTab active={activeView === 'prophets'} onClick={() => setActiveView('prophets')} label="Vozes Proféticas" />
         <ModeTab active={activeView === 'events'} onClick={() => setActiveView('events')} label="Marcos Históricos" />
         <ModeTab active={activeView === 'compare'} onClick={() => setActiveView('compare')} label="Comparativo Real" />
      </div>

      {activeView === 'monarchs' && (
        <div className="space-y-12 md:space-y-20">
          <section className="space-y-6 md:space-y-10">
            <div className="bg-slate-950 p-8 md:p-16 rounded-[40px] md:rounded-[70px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none"></div>
               <div className="relative z-10 flex-1">
                  <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">1050 - 931 a.C.</span>
                  <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">Reino Unificado</h2>
                  <p className="text-slate-400 max-w-2xl text-base md:text-xl leading-relaxed bible-text">
                    A Era de Ouro de Israel. Doze tribos sob um único cetro, centralizando o culto em Jerusalém e expandindo as fronteiras prometidas.
                  </p>
               </div>
               <div className="relative z-10 flex gap-4 md:gap-8 bg-white/5 p-6 md:p-10 rounded-[32px] md:rounded-[50px] border border-white/10 backdrop-blur-md">
                  <div className="text-center px-4 md:px-6 border-r border-white/10">
                     <span className="text-[10px] font-black uppercase text-slate-500 block mb-2">Duração</span>
                     <span className="text-3xl md:text-5xl font-black italic text-amber-500">120</span>
                     <span className="text-[10px] font-black uppercase text-slate-500 block mt-2 tracking-widest italic">Anos</span>
                  </div>
                  <div className="text-center px-4 md:px-6">
                     <span className="text-[10px] font-black uppercase text-slate-500 block mb-2">Reis</span>
                     <span className="text-3xl md:text-5xl font-black italic text-amber-500">03</span>
                     <span className="text-[10px] font-black uppercase text-slate-500 block mt-2 tracking-widest italic">Principais</span>
                  </div>
               </div>
            </div>
            <div className="space-y-4 md:space-y-8">
               {KINGS_DATA.united.map(k => <KingCard key={k.id} king={k} type="united" />)}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
             <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between mb-4 px-6 md:px-8 py-4 md:py-6 bg-blue-50 dark:bg-blue-900/10 rounded-[30px] md:rounded-[40px] border border-blue-100 dark:border-blue-800">
                   <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-blue-600 italic leading-none">Judá (Sul)</h3>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Linhagem Messiânica</span>
                   </div>
                   <span className="text-2xl md:text-3xl font-black text-blue-200">20</span>
                </div>
                <div className="space-y-4 md:space-y-6">
                   {KINGS_DATA.judah.map(k => <KingCard key={k.id} king={k} type="judah" />)}
                </div>
             </div>
             <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between mb-4 px-6 md:px-8 py-4 md:py-6 bg-rose-50 dark:bg-rose-900/10 rounded-[30px] md:rounded-[40px] border border-rose-100 dark:border-rose-800">
                   <div>
                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-rose-600 italic leading-none">Israel (Norte)</h3>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Reino das 10 Tribos</span>
                   </div>
                   <span className="text-2xl md:text-3xl font-black text-rose-200">19</span>
                </div>
                <div className="space-y-4 md:space-y-6">
                   {KINGS_DATA.israel.map(k => <KingCard key={k.id} king={k} type="israel" />)}
                </div>
             </div>
          </section>
        </div>
      )}

      {activeView === 'prophets' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 animate-in slide-in-from-bottom-6">
          {prophetsMap.map((p, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 md:p-10 rounded-[32px] md:rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all border-b-8 border-b-indigo-500">
               <h3 className="text-2xl md:text-3xl font-black uppercase italic text-indigo-600 mb-6 tracking-tighter">{p.name}</h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Intervenções Reais:</p>
               <div className="flex flex-wrap gap-2 mb-6">
                  {p.kings.map(k => <span key={k} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-700 rounded-lg text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-600">{k}</span>)}
               </div>
               <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Períodos de Atuação</span>
                  <p className="text-[10px] font-bold text-slate-500">{p.periods.join(' / ')}</p>
               </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'events' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8">
           <header className="text-center mb-12">
              <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Dabar History Engine</span>
              <h3 className="text-3xl md:text-5xl font-black italic uppercase text-slate-800 dark:text-white tracking-tighter">Cronologia de Engenharia Monárquica</h3>
           </header>
           
           <div className="space-y-4">
              {historicalMilestones.map((m, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row gap-6 group hover:border-indigo-300 transition-all">
                   <div className="md:w-32 flex-shrink-0">
                      <span className="text-2xl font-black italic text-indigo-600 block leading-none">{m.year}</span>
                      <div className="h-1 w-12 bg-indigo-100 mt-2 rounded-full"></div>
                   </div>
                   <div className="flex-1">
                      <h4 className="text-xl font-black uppercase italic text-slate-800 dark:text-white mb-2 tracking-tighter">{m.title}</h4>
                      <p className="bible-text text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{m.desc}</p>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                         <span className="text-[9px] font-black uppercase text-indigo-600 tracking-widest block mb-2 italic">Importância Teológica e Impacto Canônico</span>
                         <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{m.importance}</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => toggleSermon(`MARCO: ${m.title} (${m.year})`)}
                     className="self-start p-4 bg-slate-50 dark:bg-slate-700 text-slate-300 hover:text-indigo-600 rounded-2xl shadow-sm transition-all"
                   >
                     {ICON_SERMON('w-6 h-6')}
                   </button>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeView === 'compare' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dashboard Judá */}
              <div className="bg-white dark:bg-slate-800 p-10 rounded-[60px] border-t-[16px] border-blue-600 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic text-blue-600 pointer-events-none">SUL</div>
                 <h3 className="text-3xl font-black uppercase italic text-blue-600 mb-8 tracking-tighter">Reino de Judá</h3>
                 
                 <div className="grid grid-cols-2 gap-4 mb-10">
                    <CompareMetric label="Total de Reis" value="20" sub="Todos da Casa de Davi" />
                    <CompareMetric label="Longevidade" value="~345" sub="Anos de existência" />
                    <CompareMetric label="Avaliação IA" value="08" sub="Reis Bons ou Mistos" />
                    <CompareMetric label="Dinastias" value="01" sub="Aliança Incondicional" />
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Resumo Analítico da Soberania</h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-justify">
                       Judá manteve a legitimidade teocrática através da **Aliança Davídica (2 Sm 7)**. A estabilidade dinástica (uma única linhagem por 345 anos) permitiu períodos de restauração espiritual profunda (Ezequias, Josias, Asa). Sua sobrevivência dependia da fidelidade ao Templo em Jerusalém. Mesmo quando reis ímpios governaram, Deus preservou a "lâmpada de Davi" visando o cumprimento da promessa messiânica. O cativeiro babilônico não foi o fim, mas um processo de purificação para o retorno e a reconstrução do remanescente.
                    </p>
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-[30px] border border-blue-100 dark:border-blue-800">
                       <span className="text-[9px] font-black uppercase text-blue-500 block mb-2 tracking-widest">Destino Final e Propósito</span>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase leading-relaxed">Cativeiro Babilônico em 586 a.C. como disciplina de 70 anos para cura da idolatria, seguido do retorno sob Ciro para a restauração da linhagem do Messias.</p>
                    </div>
                 </div>
              </div>

              {/* Dashboard Israel */}
              <div className="bg-white dark:bg-slate-800 p-10 rounded-[60px] border-t-[16px] border-rose-600 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic text-rose-600 pointer-events-none">NORTE</div>
                 <h3 className="text-3xl font-black uppercase italic text-rose-600 mb-8 tracking-tighter">Reino de Israel</h3>

                 <div className="grid grid-cols-2 gap-4 mb-10">
                    <CompareMetric label="Total de Reis" value="19" sub="Múltiplas linhagens" />
                    <CompareMetric label="Longevidade" value="~209" sub="Anos de existência" />
                    <CompareMetric label="Avaliação IA" value="00" sub="Reis Integramente Bons" />
                    <CompareMetric label="Dinastias" value="09" sub="Goles e Traições Constantes" />
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Resumo Analítico da Decadência</h4>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-justify">
                       Israel (Efraim) nasceu de uma rebelião política e espiritual, consolidando-se sobre o **"Pecado de Jeroboão"** (idolatria estatal como controle de fronteira). A instabilidade era extrema: 9 dinastias diferentes e constantes assassinatos por poder. Sem o Templo legítimo e sem a Aliança Davídica, o Norte mergulhou em um sincretismo que culminou no culto oficial a Baal sob a casa de Acabe. A rejeição sistemática aos avisos de Elias e Eliseu selou seu destino. Foi um reino marcado por força militar volátil e fraqueza teológica absoluta.
                    </p>
                    <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-[30px] border border-rose-100 dark:border-rose-800">
                       <span className="text-[9px] font-black uppercase text-rose-500 block mb-2 tracking-widest">Destino Final e Dispersão</span>
                       <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase leading-relaxed">Cativeiro Assírio em 722 a.C. resultando na dispersão total das dez tribos e na substituição da população por povos estrangeiros (origem dos samaritanos).</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Matriz de Diferenciais */}
           <div className="bg-slate-900 p-10 rounded-[60px] text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                    {ICON_DIFFERENTIALS('w-7 h-7')}
                 </div>
                 <h4 className="text-2xl font-black uppercase italic tracking-tighter">Matriz Comparativa de Engenharia Logos</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <MatrixItem title="Capital e Estabilidade" south="Jerusalém: Centro espiritual estável." north="Siquém -> Tirza -> Samaria: Mudanças constantes." />
                 <MatrixItem title="Hermenêutica do Culto" south="O Templo: Ordem Levítica e Yahweh." north="Dã e Betel: Bezerros, sincretismo e Baal." />
                 <MatrixItem title="Legitimidade Real" south="Monodinástica: Hereditariedade Davídica." north="Polidinástica: Usurpação e golpes militares." />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const CompareMetric = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[30px] border border-slate-100 dark:border-slate-800">
     <span className="text-[8px] font-black uppercase text-slate-400 block mb-1 tracking-widest">{label}</span>
     <div className="text-3xl font-black text-slate-800 dark:text-white italic tracking-tighter leading-none mb-1">{value}</div>
     <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{sub}</p>
  </div>
);

const MatrixItem = ({ title, south, north }: { title: string, south: string, north: string }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-[35px] backdrop-blur-md">
     <h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-4 text-center border-b border-white/10 pb-2">{title}</h5>
     <div className="space-y-4">
        <div>
           <span className="text-[8px] font-black uppercase text-blue-400 tracking-widest block mb-1">Judá (Sul)</span>
           <p className="text-xs font-medium text-slate-200 italic leading-snug">{south}</p>
        </div>
        <div>
           <span className="text-[8px] font-black uppercase text-rose-400 tracking-widest block mb-1">Israel (Norte)</span>
           <p className="text-xs font-medium text-slate-200 italic leading-snug">{north}</p>
        </div>
     </div>
  </div>
);

const ModeTab = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 md:px-10 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600 border border-slate-100 dark:border-slate-700'}`}
  >
    {label}
  </button>
);

export default KingsTab;
