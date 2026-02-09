
import React, { useState } from 'react';
import { UserState } from '../types';
import { ICON_SERMON, ICON_BIBLE, ICON_STRONG, ICON_CHRONOLOGY, ICON_DIFFERENTIALS, ICON_STUDY } from '../constants';

const TabernacleTab: React.FC<{ userState: UserState, setUserState: any }> = ({ userState, setUserState }) => {
  const [activeSector, setActiveSector] = useState<'architecture' | 'journey' | 'lexical' | 'prophetic'>('architecture');

  const toggleSermon = (ref: string) => {
    setUserState((prev: UserState) => ({
      ...prev,
      savedForSermons: prev.savedForSermons.includes(ref) 
        ? prev.savedForSermons.filter(r => r !== ref)
        : [...prev.savedForSermons, ref]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 animate-in fade-in pb-40">
      {/* Intro Header */}
      <div className="bg-slate-950 p-8 md:p-16 rounded-[40px] md:rounded-[70px] text-white shadow-2xl relative overflow-hidden mb-12 flex flex-col md:flex-row items-center gap-10 border border-indigo-500/20">
         <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none"></div>
         <div className="relative z-10 flex-1">
            <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block italic">SISTEMA TOTAL DA REVELAÇÃO: ÊXODO 25:40</span>
            <h2 className="text-3xl md:text-6xl font-black italic uppercase tracking-tighter mb-6 text-white leading-none">O Tabernáculo</h2>
            <p className="text-slate-400 max-w-2xl text-base md:text-xl leading-relaxed bible-text">
               O Tabernáculo não é um artefato histórico; é a **Bíblia em forma de arquitetura**. Nada é decorativo, nada é cultural e nada é arbitrário. Cada centímetro é um dado profético.
            </p>
         </div>
         <div className="relative z-10 bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-md hidden lg:block">
            <div className="text-amber-500 text-xs font-black uppercase mb-4 tracking-widest border-b border-white/10 pb-2">Fundamentos de Engenharia</div>
            <ul className="space-y-3">
               <li className="flex items-center gap-3 text-[10px] font-black uppercase text-indigo-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Sombra do Celestial
               </li>
               <li className="flex items-center gap-3 text-[10px] font-black uppercase text-indigo-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Realidade em Cristo
               </li>
               <li className="flex items-center gap-3 text-[10px] font-black uppercase text-indigo-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Futuro na Glória
               </li>
            </ul>
         </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
         <SectorBtn active={activeSector === 'architecture'} onClick={() => setActiveSector('architecture')} label="Eixos & Aritmética" />
         <SectorBtn active={activeSector === 'journey'} onClick={() => setActiveSector('journey')} label="Mapa do Crente & Corpo" />
         <SectorBtn active={activeSector === 'lexical'} onClick={() => setActiveSector('lexical')} label="Léxico Profundo" />
         <SectorBtn active={activeSector === 'prophetic'} onClick={() => setActiveSector('prophetic')} label="Hebreus & Apocalipse" />
      </div>

      <div className="animate-in slide-in-from-bottom-4">
         {activeSector === 'architecture' && <ArchitectureSection toggleSermon={toggleSermon} />}
         {activeSector === 'journey' && <JourneySection toggleSermon={toggleSermon} />}
         {activeSector === 'lexical' && <LexicalSection toggleSermon={toggleSermon} />}
         {activeSector === 'prophetic' && <PropheticSection toggleSermon={toggleSermon} />}
      </div>
    </div>
  );
};

/* --- SECTIONS --- */

const ArchitectureSection: React.FC<{ toggleSermon: any }> = ({ toggleSermon }) => (
  <div className="space-y-16">
    {/* I. OS GRANDES EIXOS */}
    <section>
       <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
             {ICON_DIFFERENTIALS('w-6 h-6')}
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">I. Os Grandes Eixos da Revelação</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailCard title="Plano da Salvação" desc="O protocolo jurídico de redenção." />
          <DetailCard title="Pessoa de Cristo" desc="A encarnação em cada tábua de acácia." />
          <DetailCard title="Jornada do Crente" desc="A trilha da porta até a Arca." />
          <DetailCard title="Estrutura do Reino" desc="O governo teocrático materializado." />
          <DetailCard title="Modelo do Céu" desc="O blueprint da sala do trono celestial." />
          <DetailCard title="História da Redenção" desc="Da queda no Éden à Glória em Sião." />
          <DetailCard title="Economia Divina" desc="A gestão dos recursos espirituais." />
          <DetailCard title="Escatologia" desc="A consumação final de todas as coisas." />
       </div>
       <div className="mt-8 bg-slate-900 p-10 rounded-[50px] text-white border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl font-black italic">AXIS</div>
          <p className="text-sm md:text-base leading-relaxed italic text-slate-300 relative z-10">
             <strong>Análise de Arquitetura:</strong> O Tabernáculo opera simultaneamente nestes 8 eixos. Ele é um sistema de informação multi-camada. Quando você estuda um material, você está vendo um atributo de Cristo; quando estuda uma medida, está vendo uma verdade escatológica. É a prova de que a Bíblia possui um Autor Único que projetou o fim desde o princípio.
          </p>
       </div>
    </section>

    {/* III. OS NÚMEROS DO TABERNÁCULO */}
    <section>
       <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg">
             {ICON_STRONG('w-6 h-6')}
          </div>
          <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">III. Aritmética Divina (Gematria do Deserto)</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NumberBox num="1" sign="Unicidade" desc="O monoteísmo absoluto: 'O Senhor é um'. Reflete a unidade indivisível de Deus." />
          <NumberBox num="3" sign="Divindade" desc="A marca da Trindade (Pai, Filho, Espírito). Presente nas divisões do santuário." />
          <NumberBox num="4" sign="Universalidade" desc="O mundo e os 4 pontos cardeais. As 4 cores da porta e os 4 lados do acampamento." />
          <NumberBox num="5" sign="Graça" desc="As 5 colunas da entrada. O número da benevolência divina salvando o homem incapaz." />
          <NumberBox num="7" sign="Perfeição" desc="O Candelabro de 7 hastes. A plenitude do Espírito e a conclusão da obra criativa." />
          <NumberBox num="12" sign="Governo" desc="As 12 tribos e os 12 pães. A organização administrativa do Reino de Deus na terra." />
          <NumberBox num="40" sign="Provação" desc="Os 40 anos de jornada e os 40 dias no monte. O tempo necessário para o refino da fé." />
          <NumberBox num="50" sign="Jubileu" desc="O Pentecostes e a liberdade. Representa a liberação total de dívidas e a posse da herança." />
       </div>
    </section>

    {/* IV. OS MATERIAIS */}
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
       <div className="bg-white dark:bg-slate-800 p-10 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <h4 className="text-xl font-black uppercase italic text-indigo-600 mb-8 tracking-tighter">IV. Materiais: A Escada do Resgate</h4>
          <div className="space-y-4">
             <MaterialItem label="Bronze" orig="Terra / Fogo" sign="Juízo" desc="Onde o pecado é julgado pelo fogo da justiça divina (Altar)." />
             <MaterialItem label="Prata" orig="Resgate / Preço" sign="Redenção" desc="O preço da alma. As bases do Tabernáculo eram de prata (Dinheiro do Resgate)." />
             <MaterialItem label="Ouro" orig="Céu / Sol" sign="Glória" desc="A natureza divina e a realeza. Reveste tudo o que está na presença imediata de Deus." />
          </div>
       </div>
       <div className="bg-indigo-50 dark:bg-indigo-900/10 p-10 rounded-[50px] border border-indigo-100 dark:border-indigo-800 flex flex-col justify-center">
          <span className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] mb-4">Nota de Engenharia</span>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed bible-text italic">
             "Sabendo que não foi com coisas corruptíveis, como prata ou ouro, que fostes resgatados... mas com o precioso sangue de Cristo." (1 Pedro 1:18-19). <br/><br/>
             A prata no Tabernáculo é o fundamento físico que aponta para o fundamento espiritual: a Expiação. Sem a prata (resgate), o Tabernáculo colapsaria na areia; sem o sangue (redenção), a vida cristã não tem sustento legal diante de Deus.
          </p>
       </div>
    </section>

    {/* V. COBERTURAS */}
    <section>
       <h4 className="text-2xl font-black uppercase italic text-slate-800 dark:text-white mb-8 tracking-tighter text-center">V. As Coberturas: A Revelação Progressiva de Cristo</h4>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <PhaseCard title="Linho Bordado" desc="Cristo Glorioso" detail="Visto apenas de dentro. A pureza absoluta e as cores da divindade." />
          <PhaseCard title="Pelos de Cabra" desc="Cristo feito Pecado" detail="Refere-se ao sacrifício do Yom Kippur. O bode que leva as iniquidades." />
          <PhaseCard title="Peles de Carneiro" desc="Substituição Sangrenta" detail="Tingidas de vermelho. O sacrifício que protege e cobre a tenda." />
          <PhaseCard title="Peles Exteriores" desc="Humilhação (Is 53)" detail="Pele de Texugo/Golfinho. Sem beleza externa; o Messias humilde aos olhos do mundo." />
       </div>
    </section>
  </div>
);

const JourneySection: React.FC<{ toggleSermon: any }> = ({ toggleSermon }) => (
  <div className="space-y-16">
    {/* VI. A JORNADA ESPIRITUAL COMPLETA */}
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
         <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block italic">VI. MAPA DO CRENTE</span>
         <h3 className="text-3xl md:text-5xl font-black italic uppercase text-slate-800 dark:text-white tracking-tighter leading-none">O Protocolo de Aproximação</h3>
         <div className="flex justify-center gap-8 mt-6">
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">📌 Não é Automático</span>
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">📌 É Progressivo</span>
         </div>
      </div>
      
      <div className="space-y-4 relative">
         <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-100 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
         <JourneyStep num="1" place="Porta" exp="Conversão" desc="A entrada exclusiva. O reconhecimento de que só há um caminho para o Pai. É o início da vida teocrática." />
         <JourneyStep num="2" place="Altar" exp="Justificação" desc="Onde a culpa é tratada. O sangue do Cordeiro apaga a dívida jurídica e nos torna retos diante do Juiz." />
         <JourneyStep num="3" place="Pia" exp="Santificação" desc="A lavagem pela Palavra. O crente justificado precisa de purificação diária para o serviço e comunhão." />
         <JourneyStep num="4" place="Luz" exp="Iluminação" desc="O Candelabro. A direção do Espírito Santo. Sem luz divina, a jornada no Lugar Santo é impossível." />
         <JourneyStep num="5" place="Pão" exp="Comunhão" desc="A Mesa da Proposição. Sustento e intimidade. Alimentar-se da Palavra na presença do Rei." />
         <JourneyStep num="6" place="Incenso" exp="Oração" desc="Intercessão constante. A vida de clamor que sobe como aroma suave antes do encontro final." />
         <JourneyStep num="7" place="Véu Rasgado" exp="Acesso" desc="A carne de Cristo rompida. O fim da separação. O privilégio real de entrar onde ninguém podia." />
         <JourneyStep num="8" place="Arca" exp="Presença" desc="O destino final. A união mística com a Glória Shekinah. Habitar no Kadosh HaKadoshim eternamente." />
      </div>
    </section>

    {/* VII. O TABERNÁCULO E O CORPO HUMANO */}
    <section>
       <div className="bg-slate-950 p-12 md:p-20 rounded-[60px] md:rounded-[100px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl">
                {ICON_BIBLE('w-12 h-12')}
             </div>
             <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">VII. O Homem como Tabernáculo</h3>
             <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-xs mb-12">"E o vosso espírito, alma e corpo sejam conservados íntegros" (1 Ts 5:23)</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
                <BodyBox label="Átrio (Exterior)" part="Corpo" desc="Onde os sentidos interagem com o mundo. O lugar do sacrifício vivo e do serviço físico." />
                <BodyBox label="Lugar Santo" part="Alma" desc="A sede da mente, vontade e emoções. Onde a alma é iluminada e alimentada pela Palavra." />
                <BodyBox label="Santo dos Santos" part="Espírito" desc="A morada profunda. O ponto de contato direto com Deus através do novo nascimento." />
             </div>
             <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-[40px] max-w-3xl">
                <p className="bible-text text-xl italic text-slate-300">"Não sabeis vós que o vosso corpo é o templo do Espírito Santo?" (1 Co 6:19). <br/><br/> <strong>Comentário:</strong> A engenharia de Deus para o homem segue o padrão do Tabernáculo. O pecado corrompeu os três níveis, mas a redenção restaura a Glória no espírito, ilumina a alma e santifica o corpo.</p>
             </div>
          </div>
       </div>
    </section>
  </div>
);

const LexicalSection: React.FC<{ toggleSermon: any }> = ({ toggleSermon }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     <LexEntry strong="H4908" heb="מִשְׁכָּן" trans="mishkán" def="Tabernáculo: Raiz 'shakan' (habitar). O ato de Deus se estabelecer fisicamente entre os homens." />
     <LexEntry strong="H4720" heb="מִקְדָּשׁ" trans="miqdásh" def="Santuário: Raiz 'qadash' (separar). Um lugar onde a qualidade da presença exige santidade ética." />
     <LexEntry strong="H4196" heb="מִזְבֵּחַ" trans="mizbêach" def="Altar: 'Lugar de matar'. Indica que a vida só é preservada mediante a morte de um substituto." />
     <LexEntry strong="H4501" heb="מְנוֹRָה" trans="menorá" def="Candelabro: Portador de luz. A única fonte de claridade no Lugar Santo; símbolo do Espírito Santo." />
     <LexEntry strong="H3899" heb="לֶחֶם פָּנִים" trans="lechem panim" def="Pão da Presença: 'Pão da Face'. Comunhão contínua diante da face de Deus; o sustento da alma." />
     <LexEntry strong="H7004" heb="קְטֹרֶת" trans="qetóret" def="Incenso: Perfume que sobe. Tipifica as orações que são aceitáveis pelo mérito de Cristo." />
     <LexEntry strong="H6532" heb="פָּרֹכֶת" trans="parókhet" def="Véu: De 'parak' (separar). A barreira intransponível que guardava a santidade de Deus do pecado humano." />
     <LexEntry strong="H727" heb="אֲרוֹן" trans="aron" def="Arca: Cofre real. O depositório da Lei, do Maná e da Vara de Arão; o trono governamental de Deus." />
     <LexEntry strong="H3727" heb="כַּפֹּרֶת" trans="kappóret" def="Propiciatório: De 'kaphar' (cobrir). O ponto exato onde a Lei encontra a Misericórdia através do sangue." />
  </div>
);

const PropheticSection: React.FC<{ toggleSermon: any }> = ({ toggleSermon }) => (
  <div className="space-y-16">
    {/* VIII. O TABERNÁCULO E O CÉU */}
    <section className="bg-white dark:bg-slate-800 p-10 md:p-16 rounded-[60px] border border-slate-100 dark:border-slate-700 shadow-sm">
       <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
             {ICON_CHRONOLOGY('w-8 h-8')}
          </div>
          <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-slate-800 dark:text-white">VIII. O Reflexo do Celestial (Hb 8:5)</h3>
       </div>
       <p className="bible-text text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-10">
          "Servem de exemplo e sombra das coisas celestiais." O Tabernáculo não é uma cópia da terra; ele é uma tradução do céu para a nossa dimensão física. Moisés viu o protótipo no monte e construiu a réplica no deserto.
       </p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800">
             <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest block mb-4">Dimensão Terrena</span>
             <p className="text-sm font-bold text-slate-500 uppercase leading-relaxed italic">Limitado por tempo, espaço, tecidos e metais. Sujeito à impureza e necessidade de repetição contínua de ritos.</p>
          </div>
          <div className="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-[40px] border border-blue-100 dark:border-blue-800">
             <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-4">Dimensão Celestial</span>
             <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200 uppercase leading-relaxed italic">Eterno, espiritual e perfeito. Onde Cristo entrou como Sumo Sacerdote para garantir nossa redenção definitiva.</p>
          </div>
       </div>
    </section>

    {/* IX. O TABERNÁCULO E O APOCALIPSE */}
    <section>
       <div className="text-center mb-12">
          <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">IX. A CONEXÃO ESCATOLÓGICA</span>
          <h3 className="text-3xl md:text-5xl font-black italic uppercase text-slate-800 dark:text-white tracking-tighter">O Fim que Êxodo Abriu</h3>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ComparePair item="Incenso" shadow="Oração Sacerdotal" reality="As Taças de Orações (Ap 5:8)" />
          <ComparePair item="Arca" shadow="Trono Terreno" reality="O Trono de Deus (Ap 4:2)" />
          <ComparePair item="Querubins" shadow="Figuras no Véu" reality="Seres Viventes (Ap 4:6)" />
          <ComparePair item="Luz" shadow="Candelabro de Ouro" reality="O Cordeiro é a Luz (Ap 21:23)" />
          <ComparePair item="Sacrifício" shadow="Cordeiro Diário" reality="O Cordeiro Vivo que foi morto (Ap 5:6)" />
          <ComparePair item="Tabernáculo" shadow="Tenda no Deserto" reality="A Nova Jerusalém (Ap 21:3)" />
       </div>
       <div className="mt-8 p-8 bg-indigo-600 text-white rounded-[40px] text-center shadow-2xl">
          <p className="font-black italic text-xl uppercase tracking-tighter">"Eis aqui o tabernáculo de Deus com os homens" (Ap 21:3)</p>
       </div>
    </section>

    {/* X. HEBREUS 8-10: A SÍNTESE FINAL */}
    <section className="bg-slate-900 p-12 md:p-20 rounded-[60px] md:rounded-[100px] text-white">
       <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="flex-1">
             <span className="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">X. TRATADO TEOLÓGICO</span>
             <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8 leading-none">O Tabernáculo em Hebreus</h3>
             <p className="bible-text text-xl leading-relaxed text-slate-300 mb-10">
                Hebreus não explica o Tabernáculo; ele o **pressupõe** como a gramática básica da fé. Sem o Tabernáculo, Hebreus é um livro selado. <br/><br/>
                "Tendo, pois, irmãos, ousadia para entrar no santuário, pelo sangue de Jesus, pelo **novo e vivo caminho** que ele nos consagrou, pelo véu, isto é, pela sua carne." (Hebreus 10:19-20).
             </p>
             <ul className="space-y-6">
                <li className="flex items-start gap-4">
                   <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                   <p className="text-sm font-bold uppercase tracking-widest text-slate-400">O Véu no deserto era uma barreira; em Cristo, o véu (Sua carne) tornou-se a ponte.</p>
                </li>
                <li className="flex items-start gap-4">
                   <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                   <p className="text-sm font-bold uppercase tracking-widest text-slate-400">O sangue de touros apenas cobria; o sangue de Jesus remove definitivamente a consciência do pecado.</p>
                </li>
             </ul>
          </div>
          <div className="w-full md:w-80 p-8 bg-white/5 border border-white/10 rounded-[50px] flex flex-col items-center justify-center text-center shadow-inner">
             <div className="text-6xl mb-6">🔐</div>
             <p className="text-xs font-black uppercase tracking-[0.2em] leading-relaxed text-amber-500">MISTÉRIO REVELADO</p>
             <p className="text-sm italic text-slate-400 mt-4 font-medium">A Arca foi feita ANTES do Altar. Deus inicia na Presença e vai em direção ao homem. A Graça sempre antecede o Juízo no coração de Deus.</p>
          </div>
       </div>
    </section>
  </div>
);

/* --- HELPER COMPONENTS --- */

const SectorBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 md:px-10 py-3 md:py-4 rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${active ? 'bg-indigo-600 text-white shadow-xl scale-105 border-transparent' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600 border border-slate-100 dark:border-slate-700'}`}
  >
    {label}
  </button>
);

const DetailCard = ({ title, desc }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-[30px] border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:border-indigo-300 transition-all flex flex-col justify-center">
     <h5 className="font-black text-[10px] uppercase text-indigo-600 mb-2 tracking-widest">{title}</h5>
     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-tight">{desc}</p>
  </div>
);

const NumberBox = ({ num, sign, desc }: any) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm hover:scale-105 transition-all flex flex-col items-center text-center">
     <div className="text-5xl font-black italic text-amber-500 mb-4">{num}</div>
     <h5 className="text-[11px] font-black uppercase text-slate-800 dark:text-white tracking-[0.2em] mb-4">{sign}</h5>
     <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{desc}</p>
  </div>
);

const MaterialItem = ({ label, orig, sign, desc }: any) => (
  <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
     <div className="flex justify-between items-center mb-2">
        <h5 className="font-black uppercase text-slate-800 dark:text-white italic">{label}</h5>
        <div className="flex gap-4">
           <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{orig}</span>
           <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">{sign}</span>
        </div>
     </div>
     <p className="text-xs text-slate-500 font-medium leading-snug">{desc}</p>
  </div>
);

const PhaseCard = ({ title, desc, detail }: any) => (
  <div className="p-8 bg-white dark:bg-slate-800 rounded-[45px] border border-slate-100 dark:border-slate-700 text-center shadow-sm hover:border-indigo-200 transition-all flex flex-col h-full">
     <h5 className="font-black uppercase tracking-tighter text-slate-800 dark:text-white mb-2 text-base leading-none">{title}</h5>
     <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] block mb-5 italic">{desc}</span>
     <div className="h-px w-10 bg-slate-100 mx-auto mb-5"></div>
     <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{detail}</p>
  </div>
);

const JourneyStep = ({ num, place, exp, desc }: any) => (
  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 group">
     <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black italic shadow-xl shrink-0 group-hover:scale-110 transition-transform">{num}</div>
     <div className="flex-1 bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm group-hover:border-indigo-300 transition-all">
        <div className="flex justify-between items-center mb-3">
           <h4 className="text-xl font-black uppercase italic text-slate-800 dark:text-white tracking-tighter">{place}</h4>
           <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 text-[10px] font-black uppercase rounded-full border border-indigo-100 dark:border-indigo-800">{exp}</span>
        </div>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed italic font-medium">"{desc}"</p>
     </div>
  </div>
);

const BodyBox = ({ label, part, desc }: any) => (
  <div className="p-8 bg-white/5 border border-white/10 rounded-[35px] hover:bg-white/10 transition-all text-center">
     <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] block mb-3">{label}</span>
     <h5 className="text-2xl font-black uppercase mb-3 italic tracking-tight">{part}</h5>
     <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"{desc}"</p>
  </div>
);

const LexEntry = ({ strong, heb, trans, def }: any) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-[45px] border border-slate-100 dark:border-slate-700 shadow-sm relative group hover:border-indigo-200 transition-all h-full flex flex-col">
     <div className="flex justify-between items-start mb-8">
        <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-1.5 rounded-full uppercase tracking-widest">{strong}</span>
        <h3 className="text-4xl font-serif font-black text-slate-800 dark:text-white group-hover:scale-110 transition-transform">{heb}</h3>
     </div>
     <div className="mb-4">
        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-1">Transliteração</span>
        <p className="text-xs font-bold text-slate-600 dark:text-slate-300 italic">{trans}</p>
     </div>
     <div className="flex-1">
        <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest block mb-2">Definição Exegética</span>
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-bold italic">"{def}"</p>
     </div>
  </div>
);

const ComparePair = ({ item, shadow, reality }: any) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-[30px] border border-slate-100 dark:border-slate-700 shadow-sm">
     <h5 className="text-[11px] font-black uppercase text-indigo-600 mb-4 tracking-widest border-b border-slate-50 dark:border-slate-700 pb-2">{item}</h5>
     <div className="space-y-4">
        <div>
           <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Sombra (Êxodo)</span>
           <p className="text-xs font-bold text-slate-700 dark:text-slate-200 italic">{shadow}</p>
        </div>
        <div>
           <span className="text-[8px] font-black text-amber-500 uppercase block mb-1">Realidade (Apocalipse)</span>
           <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 italic">{reality}</p>
        </div>
     </div>
  </div>
);

export default TabernacleTab;
