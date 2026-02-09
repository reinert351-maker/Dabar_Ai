import React, { useState } from 'react';
import { UserState } from '../types';
import { ICON_MEASURES, ICON_STRONG, ICON_BIBLE, ICON_SERMON, ICON_TABERNACLE } from '../constants';

interface MeasureItem {
  name: string;
  original: string;
  strong: string;
  modern: string;
  note?: string;
}

interface MeasureCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: MeasureItem[];
  explanation: string[];
  usageTags: string[];
}

const MEASURES_DATA: MeasureCategory[] = [
  {
    id: 'length',
    title: 'Medidas de Comprimento',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    explanation: [
      "As medidas de comprimento na Bíblia possuem uma natureza antropométrica, baseando-se na proporção do corpo humano, o que reforça a ideia de que a revelação de Deus se adapta à escala da experiência humana. O 'Dedo' e o 'Palmo' representam as menores unidades, utilizadas para detalhes minuciosos do mobiliário sagrado.",
      "O 'Côvado' (ammáh) é a unidade central, baseada na distância do cotovelo à ponta do dedo médio. É fascinante notar a distinção entre o côvado comum (~45cm) e o côvado longo ou 'côvado real' (~52,5cm). Essa diferença não é meramente técnica, mas teológica: o Templo de Ezequiel e o Templo de Salomão frequentemente utilizam o côvado maior, simbolizando uma escala superior e mais santa.",
      "A 'Braça' e o 'Estádio' são medidas introduzidas ou popularizadas no período helenista e romano, aparecendo com frequência no Novo Testamento para descrever distâncias marítimas ou dimensões de cidades, como a Nova Jerusalém em Apocalipse.",
      "A 'Vara' de medir (qané) era um instrumento de cana utilizado por agrimensores. Em contextos proféticos, o ato de 'medir' algo (como o Templo ou a cidade) simboliza a posse divina, a proteção e o julgamento reto de Deus sobre aquele espaço.",
      "Entender essas proporções permite ao estudante visualizar a imponência do Tabernáculo no deserto ou a vastidão das promessas geográficas feitas aos patriarcas, transformando números áridos em visões espaciais vívidas."
    ],
    usageTags: ['Tabernáculo', 'Templo', 'Profecias', 'Navegação'],
    items: [
      { name: 'Dedo', original: 'etsba', strong: 'H676', modern: '~1,9 cm' },
      { name: 'Palmo', original: 'tefah', strong: 'H2947', modern: '~7,6 cm' },
      { name: 'Côvado (comum)', original: 'ammáh', strong: 'H520', modern: '~45 cm' },
      { name: 'Côvado longo', original: 'ammáh gedoláh', strong: 'H520', modern: '~52,5 cm' },
      { name: 'Braça', original: 'orguia (gr.)', strong: 'G3712', modern: '~1,85 m' },
      { name: 'Vara', original: 'qané', strong: 'H7070', modern: '~3,15 m' },
      { name: 'Estádio', original: 'stadion', strong: 'G4712', modern: '~185 m' },
      { name: 'Milha romana', original: 'mílion', strong: 'G3400', modern: '~1.480 m' },
    ]
  },
  {
    id: 'weight',
    title: 'Pesos Bíblicos',
    // Fix: ICON_MEASURES is a function that returns a JSX element, not a React component class.
    icon: ICON_MEASURES("w-6 h-6"),
    explanation: [
      "O sistema de pesos era fundamental para a economia teocrática e para o sistema de impostos do santuário. O 'Siclo' (sheqel) era a unidade padrão, e sua precisão era guardada pelo 'siclo do santuário', um peso padrão mantido pelos sacerdotes para evitar fraudes comerciais.",
      "A relação 1 siclo = 20 gerás (Êx 30:13) estabelece uma base decimal de precisão. O peso não era apenas uma questão de mercado, mas de justiça ética; Deus condena repetidamente a 'balança enganosa', pois o peso justo reflete o caráter de Deus como o Justo Juiz.",
      "A 'Mina' e o 'Talento' representam pesos de grande valor e massa. Um talento (~34kg) era a carga máxima que um homem comum poderia carregar convenientemente. Quando Jesus fala de talentos nas parábolas, Ele se refere a fortunas imensas, não apenas pequenas quantias.",
      "O peso do ouro e da prata no Tabernáculo totalizava toneladas, o que revela a riqueza investida na adoração a Deus, mesmo em um ambiente nômade de deserto.",
      "Tipologicamente, o 'peso' está ligado à 'Glória' (Kavod no hebraico, que compartilha a raiz de 'pesado'). A glória de Deus não é algo etéreo ou leve, mas possui uma densidade espiritual que fundamenta toda a realidade."
    ],
    usageTags: ['Comércio', 'Ofertas', 'Tributo', 'Justiça'],
    items: [
      { name: 'Gerá', original: 'gerá', strong: 'H1626', modern: '~0,57 g' },
      { name: 'Beca', original: 'beqá', strong: 'H1235', modern: '~5,7 g' },
      { name: 'Siclo', original: 'sheqel', strong: 'H8255', modern: '~11,4 g' },
      { name: 'Mina', original: 'maneh', strong: 'H4488', modern: '~570 g' },
      { name: 'Talento', original: 'kikkár', strong: 'H3603', modern: '~34 kg' },
    ]
  },
  {
    id: 'capacity',
    title: 'Capacidade (Líquidos & Sólidos)',
    icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.618.309a6 6 0 01-3.86.517l-2.387-.477a2 2 0 00-1.022.547l-1.162 1.162a2 2 0 00.586 3.414l1.162.116a2 2 0 001.414-.586l1.162-1.162a2 2 0 011.414-.586l2.324.232a2 2 0 001.414-.586l1.162-1.162a2 2 0 011.414-.586l1.162.116a2 2 0 001.162-.116z" /></svg>,
    explanation: [
      "As medidas de volume eram essenciais para a vida agrária e sacerdotal, dividindo-se entre capacidade para secos (cereais, farinha) e líquidos (azeite, vinho). O 'Log' era a menor medida, equivalente a cerca de um copo pequeno.",
      "O 'Hin' (~3,6 L) era a medida padrão para o azeite das unções e o vinho das libações. A precisão dessas medidas nos rituais era vital, pois cada detalhe da oferta deveria seguir o padrão exato da santidade de Deus.",
      "O 'Omer' é famoso por ser a medida do Maná diário recolhido por cada israelita no deserto (Êx 16). Ele representa a provisão divina sob medida: nem sobra para o orgulho, nem falta para a necessidade.",
      "A 'Efa' e o 'Bate' são equivalentes em volume (~22 L), sendo a primeira para secos e a segunda para líquidos. O 'Coro' (~220 L) é a unidade de carga de um jumento, representando grandes quantidades comerciais.",
      "Muitas parábolas e profecias (como o 'alqueire' ou as 'medidas de trigo') dependem do entendimento desses volumes para que a escala da fome, da abundância ou do juízo seja devidamente apreciada."
    ],
    usageTags: ['Rituais', 'Agricultura', 'Ofertas', 'Suprimento'],
    items: [
      { name: 'Log (Líq.)', original: 'log', strong: 'H3843', modern: '~0,3 L' },
      { name: 'Hin (Líq.)', original: 'hin', strong: 'H1969', modern: '~3,6 L' },
      { name: 'Bate (Líq.)', original: 'bath', strong: 'H1324', modern: '~22 L' },
      { name: 'Coro (Líq/Sól)', original: 'kor', strong: 'H3734', modern: '~220 L' },
      { name: 'Omer (Sól.)', original: 'ômer', strong: 'H6016', modern: '~2,2 L' },
      { name: 'Efa (Sól.)', original: 'êfah', strong: 'H374', modern: '~22 L' },
    ]
  }
];

const TRAVEL_DATA = [
  { label: 'Caminhada de um dia', value: '~25–30 km', ref: 'Gn 31:23', context: 'Ritmo médio de viagem em caravana.' },
  { label: 'Jornada de sábado', value: '~900 m', ref: 'At 1:12', context: 'Limite rabínico de distância permitida no descanso.' },
  { label: 'Estádio', value: '~185 m', ref: 'Lc 24:13', context: 'O caminho de Emaús tinha 60 estádios (~11km).' },
  { label: 'Milha romana', value: '~1,48 km', ref: 'Mt 5:41', context: '"Se alguém te obrigar a caminhar uma milha..."' }
];

const TABERNACLE_DIMENSIONS = [
  { item: 'Comprimento Total', bib: '100 côvados', mod: '~45 m' },
  { item: 'Largura Total', bib: '50 côvados', mod: '~22,5 m' },
  { item: 'Altar do Holocausto', bib: '5 × 5 × 3 côvados', mod: '~2,25 × 2,25 × 1,35 m' },
  { item: 'Lugar Santo', bib: '20 × 10 × 10 côvados', mod: '~9 × 4,5 × 4,5 m' },
  { item: 'Santo dos Santos', bib: '10 × 10 × 10 côvados', mod: '~4,5 × 4,5 × 4,5 m' }
];

const MeasuresTab: React.FC<{ userState: UserState, setUserState: any }> = ({ userState, setUserState }) => {
  const [activeTab, setActiveTab] = useState<string>('length');

  return (
    <div className="space-y-10 animate-in fade-in pb-40">
      {/* Header Estilo Dashboard */}
      <div className="bg-white dark:bg-slate-800 p-10 md:p-14 rounded-[50px] md:rounded-[70px] border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10 w-24 h-24 bg-indigo-600 rounded-[35px] flex items-center justify-center text-white shadow-2xl">
           {ICON_MEASURES('w-12 h-12')}
        </div>
        <div className="relative z-10 flex-1 text-center md:text-left">
           <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2 block">Dabar Metrology Engine</span>
           <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white leading-tight mb-2">Metrologia Teocrática</h2>
           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest italic">A Escala do Sagrado: Pesos, Medidas e Distâncias</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Selector */}
        <div className="lg:col-span-4 space-y-4">
           {MEASURES_DATA.map(cat => (
             <button
               key={cat.id}
               onClick={() => setActiveTab(cat.id)}
               className={`w-full p-6 rounded-[35px] border-2 text-left transition-all flex items-center gap-6 ${activeTab === cat.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-[1.02]' : 'bg-white dark:bg-slate-800 border-transparent text-slate-400 hover:border-indigo-100'}`}
             >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${activeTab === cat.id ? 'bg-white/20' : 'bg-slate-50 dark:bg-slate-700 text-indigo-500'}`}>
                   {cat.icon}
                </div>
                <div>
                   <h4 className="font-black uppercase italic tracking-tighter text-lg">{cat.title}</h4>
                   <div className="flex gap-2 mt-1">
                      {cat.usageTags.slice(0, 2).map(t => <span key={t} className={`text-[8px] font-black uppercase ${activeTab === cat.id ? 'text-indigo-200' : 'text-slate-300'}`}>{t}</span>)}
                   </div>
                </div>
             </button>
           ))}

           <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[40px] border border-amber-100 dark:border-amber-800 mt-10">
              <h5 className="font-black text-amber-600 uppercase text-[10px] mb-4 tracking-widest">Referência-Chave</h5>
              <p className="text-xs text-amber-900 dark:text-amber-200 bible-text italic leading-relaxed">
                 "Balança justa, pesos justos, efa justa e hin justo tereis. Eu sou o Senhor vosso Deus." <br/>
                 <strong>— Levítico 19:36</strong>
              </p>
           </div>
        </div>

        {/* Content Viewer */}
        <div className="lg:col-span-8 space-y-8">
           {MEASURES_DATA.find(c => c.id === activeTab) && (
             <div className="animate-in slide-in-from-right-4 space-y-8">
                {/* Explanations Section */}
                <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm">
                   <h3 className="text-2xl font-black text-indigo-600 uppercase italic tracking-tighter mb-8 border-b dark:border-slate-700 pb-4">Análise Exegética</h3>
                   <div className="space-y-6">
                      {MEASURES_DATA.find(c => c.id === activeTab)?.explanation.map((p, i) => (
                        <p key={i} className="bible-text text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify italic">
                          {p}
                        </p>
                      ))}
                   </div>
                </div>

                {/* Conversion Table Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {MEASURES_DATA.find(c => c.id === activeTab)?.items.map((item, idx) => (
                     <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-[35px] border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h5 className="font-black text-slate-800 dark:text-white uppercase italic">{item.name}</h5>
                              <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-lg">{item.strong}</span>
                           </div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.original}</p>
                        </div>
                        <div className="text-right">
                           <div className="text-xl font-black text-indigo-600 italic tracking-tighter">{item.modern}</div>
                           <span className="text-[8px] font-black text-slate-300 uppercase">Equivalência</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Supplemental Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Distâncias de Viagem */}
         <div className="bg-slate-900 p-10 md:p-14 rounded-[60px] text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute top-0 right-0 p-10 opacity-5 text-7xl font-black italic uppercase pointer-events-none">TRAVEL</div>
            <h4 className="text-2xl font-black uppercase italic text-amber-500 mb-10 tracking-tighter">Distâncias & Jornadas</h4>
            <div className="space-y-6">
               {TRAVEL_DATA.map((t, i) => (
                 <div key={i} className="flex gap-6 items-start group">
                    <div className="w-1.5 h-12 bg-amber-500/30 rounded-full group-hover:bg-amber-500 transition-colors shrink-0"></div>
                    <div>
                       <div className="flex justify-between items-baseline gap-4">
                          <h5 className="font-black uppercase text-sm tracking-tight">{t.label}</h5>
                          <span className="text-amber-500 font-mono font-black">{t.value}</span>
                       </div>
                       <p className="text-xs text-slate-400 mt-1 italic">{t.context}</p>
                       <span className="text-[9px] font-black text-slate-500 uppercase mt-2 block">{t.ref}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Dimensões do Tabernáculo */}
         <div className="bg-white dark:bg-slate-800 p-10 md:p-14 rounded-[60px] border border-slate-100 dark:border-slate-700 shadow-xl">
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
                  {ICON_TABERNACLE('w-8 h-8')}
               </div>
               <h4 className="text-2xl font-black uppercase italic text-slate-800 dark:text-white tracking-tighter">Geometria do Tabernáculo</h4>
            </div>
            <div className="space-y-4">
               {TABERNACLE_DIMENSIONS.map((dim, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                       <h6 className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{dim.item}</h6>
                       <p className="font-bold text-slate-800 dark:text-white">{dim.bib}</p>
                    </div>
                    <div className="text-right">
                       <span className="text-[8px] font-black text-slate-400 uppercase">Métrico</span>
                       <p className="text-sm font-black text-slate-500 italic">{dim.mod}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl text-center border border-dashed border-indigo-200">
               <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Base de Cálculo: Côvado Comum (~45cm)</p>
            </div>
         </div>
      </div>

      <footer className="mt-20 py-20 border-t border-slate-100 dark:border-slate-800 text-center">
         <div className="w-16 h-1 bg-indigo-100 mx-auto mb-6 rounded-full"></div>
         <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Dabar Logos • Metrology Standard v1.0</p>
         <p className="text-[9px] text-slate-300 uppercase mt-2 italic">Pesos e medidas fiéis são o alicerce da retidão na Casa de Deus.</p>
      </footer>
    </div>
  );
};

const SectorBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`px-6 md:px-8 py-3 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-slate-200'}`}
  >
    {label}
  </button>
);

export default MeasuresTab;