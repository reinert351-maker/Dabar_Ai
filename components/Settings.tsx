
import React, { useState, useEffect } from 'react';
import { bulkInsertVerses, resetDatabase, getDBStats } from '../services/database';
import { UserState, Verse } from '../types';
import { BIBLE_METADATA } from '../constants';
import { INITIAL_SEED } from '../data';

interface SettingsProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const Settings: React.FC<SettingsProps> = ({ userState, setUserState }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, label: 'Omni-Shield Standby' });
  const [verseCount, setVerseCount] = useState(0);
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);
  const [showManual, setShowManual] = useState(false);
  const [manualText, setManualText] = useState('');

  useEffect(() => {
    checkStats();
  }, []);

  const addLog = (msg: string) => setDebugLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));

  const checkStats = async () => {
    const stats = await getDBStats();
    setVerseCount(stats.count);
  };

  const parseAndStoreBible = async (rawData: any) => {
    addLog("Iniciando Deep-Parsing Titan v1.8...");
    
    // Mapeamento Estrito de Abreviações do Repositório ACF (thiagobodruk)
    const abbrevMap: Record<string, string> = {
      'gn': 'GEN', 'ex': 'EXO', 'lv': 'LEV', 'nm': 'NUM', 'dt': 'DEU', 'js': 'JOS', 'jz': 'JDG', 'rt': 'RUT',
      '1sm': '1SA', '2sm': '2SA', '1rs': '1KI', '2rs': '2KI', '1cr': '1CH', '2cr': '2CH', 'ed': 'EZR', 'ne': 'NEH',
      'et': 'EST', 'sl': 'PSA', 'pv': 'PRO', 'ec': 'ECC', 'ct': 'SNG', 'is': 'ISA', 'jr': 'JER',
      'lm': 'LAM', 'dn': 'DAN', 'os': 'HOS', 'jl': 'JOE', 'am': 'AMO', 'ob': 'OBA', 'jn': 'JON',
      'mq': 'MIC', 'na': 'NAH', 'hc': 'HAB', 'sf': 'ZEP', 'ag': 'HAG', 'zc': 'ZEC', 'ml': 'MAL',
      'mt': 'MAT', 'mc': 'MRK', 'lc': 'LUK', 'at': 'ACT', 'rm': 'ROM', '1co': '1CO', '2co': '2CO',
      'gl': 'GAL', 'ef': 'EPH', 'fp': 'PHI', 'cl': 'COL', '1ts': '1TH', '2ts': '2TH', '1tm': '1TI', '2tm': '2TI',
      'tt': 'TIT', 'fm': 'PHM', 'hb': 'HEB', 'tg': 'JAM', '1pe': '1PE', '2pe': '2PE', '1jo': '1JN', '2jo': '2JN',
      '3jo': '3JN', 'jd': 'JUD', 'ap': 'REV'
    };

    const getBookId = (bookObj: any): string | null => {
      const name = (bookObj.name || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const abbrev = (bookObj.abbrev || '').toLowerCase();

      // RESOLUÇÃO DE COLISÃO CRÍTICA: "jo" (Jó vs João)
      if (abbrev === 'jo' || name === 'jo' || name === 'joao' || name === 'jo') {
        // Se o nome contiver explicitamente 'joao', mapeia para JHN
        if (name.includes('joao')) return 'JHN';
        // Caso contrário, se for apenas 'jo' ou 'jó', mapeia para JOB
        return 'JOB';
      }

      // RESOLUÇÃO DE COLISÃO CRÍTICA: "ez" (Esdras vs Ezequiel)
      if (abbrev === 'ez' || abbrev === 'ed') {
        if (name.includes('ezequiel')) return 'EZE';
        if (name.includes('esdras') || abbrev === 'ed') return 'EZR';
      }

      // Busca por Abreviação Direta no Mapa Estrito
      if (abbrevMap[abbrev]) return abbrevMap[abbrev];

      // Fallback por Reconhecimento de Nome Normalizado
      if (name.includes('genesis')) return 'GEN';
      if (name.includes('exodo')) return 'EXO';
      if (name.includes('levitico')) return 'LEV';
      if (name.includes('numeros')) return 'NUM';
      if (name.includes('deuteronomio')) return 'DEU';
      if (name.includes('josue')) return 'JOS';
      if (name.includes('juizes')) return 'JDG';
      if (name.includes('rute')) return 'RUT';
      if (name.includes('samuel')) return name.includes('1') ? '1SA' : '2SA';
      if (name.includes('reis')) return name.includes('1') ? '1KI' : '2KI';
      if (name.includes('cronicas')) return name.includes('1') ? '1CH' : '2CH';
      if (name.includes('neemias')) return 'NEH';
      if (name.includes('ester')) return 'EST';
      if (name.includes('salmos')) return 'PSA';
      if (name.includes('proverbios')) return 'PRO';
      if (name.includes('eclesiastes')) return 'ECC';
      if (name.includes('cantares') || name.includes('cantico')) return 'SNG';
      if (name.includes('isaias')) return 'ISA';
      if (name.includes('jeremias')) return 'JER';
      if (name.includes('lamentacoes')) return 'LAM';
      if (name.includes('ezequiel')) return 'EZE';
      if (name.includes('daniel')) return 'DAN';
      if (name.includes('oseias')) return 'HOS';
      if (name.includes('joel')) return 'JOE';
      if (name.includes('amos')) return 'AMO';
      if (name.includes('obadias')) return 'OBA';
      if (name.includes('jonas')) return 'JON';
      if (name.includes('miqueias')) return 'MIC';
      if (name.includes('naum')) return 'NAH';
      if (name.includes('habacuque')) return 'HAB';
      if (name.includes('sofonia')) return 'ZEP';
      if (name.includes('ageu')) return 'HAG';
      if (name.includes('zacarias')) return 'ZEC';
      if (name.includes('malaquias')) return 'MAL';
      if (name.includes('mateus')) return 'MAT';
      if (name.includes('marcos')) return 'MRK';
      if (name.includes('lucas')) return 'LUK';
      if (name.includes('atos')) return 'ACT';
      if (name.includes('romanos')) return 'ROM';
      if (name.includes('corintios')) return name.includes('1') ? '1CO' : '2CO';
      if (name.includes('galatas')) return 'GAL';
      if (name.includes('efesios')) return 'EPH';
      if (name.includes('filipenses')) return 'PHI';
      if (name.includes('colossenses')) return 'COL';
      if (name.includes('tessalonicenses')) return name.includes('1') ? '1TH' : '2TH';
      if (name.includes('timoteo')) return name.includes('1') ? '1TI' : '2TI';
      if (name.includes('tito')) return 'TIT';
      if (name.includes('filemom')) return 'PHM';
      if (name.includes('hebreus')) return 'HEB';
      if (name.includes('tiago')) return 'JAM';
      if (name.includes('pedro')) return name.includes('1') ? '1PE' : '2PE';
      if (name.includes('joao')) {
        if (name.includes('1')) return '1JN';
        if (name.includes('2')) return '2JN';
        if (name.includes('3')) return '3JN';
        return 'JHN';
      }
      if (name.includes('judas')) return 'JUD';
      if (name.includes('apocalipse')) return 'REV';
      
      return null;
    };

    let booksArray = Array.isArray(rawData) ? rawData : (rawData.books || rawData.biblia || []);
    if (booksArray.length === 0) throw new Error("Dataset vazio.");

    const versesToInsert: Verse[] = [];
    const mappedBooks = new Set<string>();
    
    booksArray.forEach((bookObj: any) => {
      const bookId = getBookId(bookObj);
      const meta = bookId ? BIBLE_METADATA[bookId] : null;
      const chapters = bookObj.chapters || bookObj.capitulos || [];

      if (meta && Array.isArray(chapters)) {
        mappedBooks.add(meta.id);
        chapters.forEach((chapterVerses: any, cIdx: number) => {
          const versesArray = Array.isArray(chapterVerses) ? chapterVerses : Object.values(chapterVerses);
          versesArray.forEach((text: any, vIdx: number) => {
            if (text && typeof text === 'string') {
              versesToInsert.push({
                id: `${meta.id} ${cIdx + 1}:${vIdx + 1}`,
                bookId: meta.id,
                book: meta.name,
                chapter: cIdx + 1,
                verse: vIdx + 1,
                text: text.trim()
              });
            }
          });
        });
      }
    });

    addLog(`Integridade de Mapeamento: ${mappedBooks.size}/66 livros.`);
    
    if (mappedBooks.size < 66) {
      addLog(`⚠️ CRÍTICO: ${66 - mappedBooks.size} livros ausentes. Verifique Jó/João.`);
    }

    if (versesToInsert.length === 0) throw new Error("Extração de dados falhou.");

    setProgress({ percent: 30, label: `Consolidando ${versesToInsert.length.toLocaleString()} versículos...` });
    await resetDatabase();
    
    await bulkInsertVerses(versesToInsert, (p) => {
      setProgress({ 
        percent: 30 + Math.floor(p * 0.7), 
        label: `Escrita Titan DB: ${Math.floor((p * versesToInsert.length) / 100).toLocaleString()} registros` 
      });
    });
    
    await checkStats();
    setIsSyncing(false);
    
    if (mappedBooks.size === 66) {
      alert(`SINCRONIA CANÔNICA TOTAL (v1.8)!\n${mappedBooks.size} livros mapeados.\n${versesToInsert.length.toLocaleString()} versículos salvos.`);
    } else {
      alert(`SINCRONIA PARCIAL (${mappedBooks.size}/66 livros).\nVerifique o log de depuração.`);
    }
  };

  const handleManualImport = async () => {
    if (!manualText) return;
    setIsSyncing(true);
    setProgress({ percent: 10, label: 'Validando Payload...' });
    try {
      const json = JSON.parse(manualText);
      await parseAndStoreBible(json);
      setManualText('');
      setShowManual(false);
    } catch (e) {
      alert("Erro no JSON. Copie o conteúdo integral do arquivo acf.json.");
      setIsSyncing(false);
    }
  };

  const syncBibleAuto = async () => {
    setErrorLog(null);
    setDebugLog([]);
    setIsSyncing(true);
    setProgress({ percent: 5, label: 'Handshake Canônico...' });

    const CANONICAL_URL = 'https://raw.githubusercontent.com/thiagobodruk/biblia/master/json/acf.json';

    try {
      addLog(`Conectando ao repositório Dabar...`);
      const response = await fetch(CANONICAL_URL);
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      const data = await response.json();
      await parseAndStoreBible(data);
    } catch (e) {
      addLog(`Erro de conexão externa.`);
      setIsSyncing(false);
      setErrorLog("Erro de Infraestrutura: Conexão bloqueada. Utilize o Protocolo Titan Bypass.");
    }
  };

  const activateLocalSeed = async () => {
    setIsSyncing(true);
    setProgress({ percent: 10, label: 'Injetando Semente...' });
    await resetDatabase();
    await bulkInsertVerses(INITIAL_SEED, (p) => {
      setProgress({ percent: 10 + Math.floor(p * 0.9), label: 'Injetando Cânon de Sobrevivência...' });
    });
    await checkStats();
    setIsSyncing(false);
    alert("Semente Local Ativada.");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in pb-40">
      {/* Dashboard Titan Integrity */}
      <div className="bg-slate-950 p-12 rounded-[60px] text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/10 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
          <div className="flex-1">
            <h3 className="text-6xl font-black italic tracking-tighter uppercase mb-2">Titan v1.8</h3>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.6em] mb-10">Data Integrity Enforcement</p>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[45px] backdrop-blur-3xl shadow-inner">
              <span className="text-[10px] font-black uppercase opacity-40 block mb-4 tracking-widest flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${verseCount > 31000 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 animate-pulse shadow-[0_0_10px_#f43f5e]'}`}></div>
                DB Capacity Pulse
              </span>
              <div className="flex items-baseline gap-4">
                <div className={`text-9xl font-black font-mono tracking-tighter transition-colors ${verseCount > 31000 ? 'text-indigo-400' : 'text-rose-400'}`}>
                  {verseCount.toLocaleString()}
                </div>
                <span className="text-slate-500 font-black text-xl italic uppercase tracking-tighter">versículos</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end md:items-end md:text-right gap-6">
             <div className={`inline-flex px-8 py-4 rounded-full border text-[11px] font-black tracking-widest uppercase ${verseCount > 31000 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400 animate-pulse'}`}>
                {verseCount > 31000 ? 'Cânon: INTEGRAL' : 'Cânon: INCOMPLETO'}
             </div>
             <p className="text-slate-500 max-w-xs text-sm leading-relaxed italic">
               A versão v1.8 corrigiu a colisão entre Jó e João para garantir o download completo de 66 livros.
             </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-12 rounded-[60px] border border-slate-100 dark:border-slate-800 shadow-sm relative">
        {errorLog && (
          <div className="mb-12 p-10 bg-rose-50 dark:bg-rose-950/20 border-l-[16px] border-rose-600 rounded-3xl animate-in slide-in-from-top-6">
             <h5 className="font-black uppercase text-[11px] text-rose-600 tracking-widest mb-4">Falha Crítica de Conexão</h5>
             <p className="font-bold text-2xl text-rose-900 dark:text-rose-100 leading-tight mb-10">{errorLog}</p>
             <div className="flex gap-4">
                <button onClick={activateLocalSeed} className="bg-rose-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] shadow-xl">Ativar Offline Seed</button>
                <button onClick={() => setShowManual(true)} className="bg-slate-950 text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px]">Titan Bypass</button>
             </div>
          </div>
        )}

        {isSyncing ? (
          <div className="space-y-12 py-10">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-6 animate-pulse">{progress.label}</span>
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic">Titan Synchronization...</span>
              </div>
              <span className="text-8xl font-black text-indigo-600 italic tracking-tighter">{progress.percent}%</span>
            </div>
            <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border-4 border-white dark:border-slate-950 shadow-inner">
              <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${progress.percent}%` }} />
            </div>
            <div className="bg-slate-950 p-8 rounded-[40px] font-mono text-[10px] text-emerald-400/80 h-48 overflow-y-auto shadow-2xl">
              {debugLog.map((log, i) => <div key={i} className="mb-1 border-l border-emerald-500/20 pl-4">{log}</div>)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <button onClick={syncBibleAuto} className="bg-indigo-600 hover:bg-indigo-700 text-white p-24 rounded-[60px] transition-all shadow-2xl flex flex-col items-center justify-center gap-8 group">
              <svg className="w-20 h-20 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <div className="text-center">
                <span className="text-3xl font-black uppercase italic tracking-tighter block">Sincronia v1.8</span>
                <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">66 Livros / ACF INTEGRAL</span>
              </div>
            </button>
            <button onClick={() => setShowManual(true)} className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white p-24 rounded-[60px] transition-all flex flex-col items-center justify-center gap-8 border-4 border-slate-200 dark:border-slate-700">
              <svg className="w-20 h-20 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              <div className="text-center">
                <span className="text-3xl font-black uppercase italic tracking-tighter block">Titan Bypass</span>
                <span className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em]">Injeção Manual de Buffer</span>
              </div>
            </button>
          </div>
        )}

        {showManual && (
          <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in zoom-in-95">
             <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[70px] shadow-2xl flex flex-col p-16 relative">
                <button onClick={() => setShowManual(false)} className="absolute top-12 right-12 text-slate-400 hover:text-rose-600 transition-colors">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 italic uppercase tracking-tighter">Titan Manual Injection</h3>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-3xl mb-10 text-sm font-bold text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                  1. Abra o dataset canônico em uma nova aba. <br/>
                  2. Selecione tudo (Ctrl+A) e copie (Ctrl+C). <br/>
                  3. Cole abaixo e inicie a desambiguação e injeção v1.8.
                </div>
                <textarea 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-[40px] p-10 font-mono text-[10px] mb-10 min-h-[400px] outline-none dark:text-white focus:border-indigo-500 transition-colors"
                  placeholder="Cole o JSON acf.json aqui..."
                  value={manualText}
                  onChange={e => setManualText(e.target.value)}
                />
                <button onClick={handleManualImport} disabled={!manualText} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-10 rounded-[40px] text-2xl uppercase tracking-tighter italic shadow-2xl transition-all active:scale-[0.98]">Validar & Injetar Cânon</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
