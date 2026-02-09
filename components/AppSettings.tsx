
import React, { useState } from 'react';
import { UserState } from '../types';

interface AppSettingsProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
}

const AppSettings: React.FC<AppSettingsProps> = ({ userState, setUserState }) => {
  const [showSaveToast, setShowSaveToast] = useState(false);

  const updateState = (key: keyof UserState, value: any) => {
    setUserState(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('dabar_user_state', JSON.stringify(userState));
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const getFontSizePx = (size: string) => {
    switch (size) {
      case 'small': return '16px';
      case 'medium': return '20px';
      case 'large': return '24px';
      case 'xl': return '32px';
      default: return '20px';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 pb-32 relative">
      {/* Feedback de Salvamento */}
      {showSaveToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl font-black uppercase text-xs tracking-widest animate-in slide-in-from-top-10">
          ✓ Configurações Sincronizadas com Sucesso
        </div>
      )}

      {/* SEÇÃO VISUAL */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-white">Interface & Leitura</h3>
           </div>
           <button 
             onClick={handleSave}
             className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-black uppercase text-[10px] shadow-lg transition-all active:scale-95"
           >
             Salvar Mudanças
           </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Temas Expandidos */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 text-center">Esquema de Cores do Santuário</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
               <ThemeButton 
                 active={userState.theme === 'light'} 
                 onClick={() => updateState('theme', 'light')} 
                 label="Light" 
                 colors="bg-white border-slate-200"
               />
               <ThemeButton 
                 active={userState.theme === 'dark'} 
                 onClick={() => updateState('theme', 'dark')} 
                 label="Dark" 
                 colors="bg-slate-900 border-slate-700"
               />
               <ThemeButton 
                 active={userState.theme === 'sepia'} 
                 onClick={() => updateState('theme', 'sepia')} 
                 label="Sepia" 
                 colors="bg-[#f4ecd8] border-[#eee8d5]"
               />
               <ThemeButton 
                 active={userState.theme === 'midnight'} 
                 onClick={() => updateState('theme', 'midnight')} 
                 label="Midnight" 
                 colors="bg-black border-slate-800"
               />
               <ThemeButton 
                 active={userState.theme === 'ocean'} 
                 onClick={() => updateState('theme', 'ocean')} 
                 label="Ocean" 
                 colors="bg-sky-100 border-sky-300"
               />
               <ThemeButton 
                 active={userState.theme === 'forest'} 
                 onClick={() => updateState('theme', 'forest')} 
                 label="Forest" 
                 colors="bg-emerald-100 border-emerald-300"
               />
            </div>
          </div>

          {/* Tipografia */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
            <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Família de Fonte</h4>
            <div className="flex gap-3">
               <button 
                 onClick={() => updateState('fontFamily', 'serif')}
                 className={`flex-1 py-4 rounded-2xl font-serif text-lg transition-all border ${userState.fontFamily === 'serif' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
               >
                 Abc (Serif)
               </button>
               <button 
                 onClick={() => updateState('fontFamily', 'sans')}
                 className={`flex-1 py-4 rounded-2xl font-sans text-lg transition-all border ${userState.fontFamily === 'sans' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}
               >
                 Abc (Sans)
               </button>
            </div>
          </div>
        </div>

        {/* Escala de Texto */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[50px] border border-slate-100 dark:border-slate-700 shadow-sm">
           <div className="flex justify-between items-center mb-8">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Escala do Cânon (Tamanho da Fonte)</h4>
              <span className="text-indigo-600 font-bold text-xs uppercase">{userState.fontSize}</span>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">A</span>
              <input 
                type="range" 
                min="0" max="3" step="1"
                className="flex-1 accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                value={['small', 'medium', 'large', 'xl'].indexOf(userState.fontSize)}
                onChange={(e) => updateState('fontSize', ['small', 'medium', 'large', 'xl'][parseInt(e.target.value)])}
              />
              <span className="text-2xl text-slate-400">A</span>
           </div>
           
           {/* Preview Area */}
           <div className="mt-10 p-8 bg-slate-50 dark:bg-slate-900 rounded-[30px] border border-slate-100 dark:border-slate-800">
              <p className={`text-slate-400 text-[9px] font-black uppercase tracking-widest mb-4`}>Preview de Leitura</p>
              <p 
                className={`${userState.fontFamily === 'serif' ? 'bible-text' : 'font-sans'} leading-relaxed text-slate-800 dark:text-slate-200 italic`}
                style={{ fontSize: getFontSizePx(userState.fontSize) }}
              >
                "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus." — João 1:1
              </p>
           </div>
        </div>
      </section>

      {/* SEÇÃO MOTOR TEOLÓGICO */}
      <section className="space-y-6">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
              <h3 className="text-xl font-black uppercase tracking-widest text-slate-800 dark:text-white">Engine & Inteligência</h3>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Motor Logos AI</h4>
              <div className="space-y-3">
                 <ConfigOption 
                   active={userState.aiPreference === 'lite'} 
                   onClick={() => updateState('aiPreference', 'lite')}
                   title="Lite (Offline-First)" 
                   desc="Usa dados locais e modelos estáticos. Ideal para economia de bateria e uso sem rede."
                 />
                 <ConfigOption 
                   active={userState.aiPreference === 'deep'} 
                   onClick={() => updateState('aiPreference', 'deep')}
                   title="Deep (Gemini Cloud)" 
                   desc="Conecta-se ao Gemini 3 Pro para análises exegéticas avançadas e sínteses complexas."
                 />
              </div>
           </div>

           <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Véspera Teológica</h4>
              <div className="space-y-3">
                 <ConfigOption 
                   active={userState.theologicalMode === 'christian'} 
                   onClick={() => updateState('theologicalMode', 'christian')}
                   title="Cristocêntrico" 
                   desc="As análises e sermões assumem a divindade de Cristo e a infalibilidade bíblica."
                 />
                 <ConfigOption 
                   active={userState.theologicalMode === 'neutral'} 
                   onClick={() => updateState('theologicalMode', 'neutral')}
                   title="Acadêmico Neutro" 
                   desc="Foco em exegese histórica, gramática e crítica textual sem viés denominacional."
                 />
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER DE MANUTENÇÃO */}
      <footer className="pt-10 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dabar Logos Infinity • App Version 2.4.0</p>
            <p className="text-[9px] text-slate-300 uppercase mt-1">Todos os dados são armazenados localmente no seu dispositivo.</p>
         </div>
         <button 
           onClick={() => { if(confirm('Limpar todas as preferências e voltar ao padrão?')) localStorage.clear(); window.location.reload(); }}
           className="px-6 py-2 bg-rose-50 text-rose-500 rounded-xl font-bold text-[10px] uppercase hover:bg-rose-500 hover:text-white transition-all"
         >
           Resetar Fábrica
         </button>
      </footer>
    </div>
  );
};

const ThemeButton = ({ active, onClick, label, colors }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${active ? 'border-indigo-600 shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
  >
    <div className={`w-12 h-12 rounded-full border ${colors} shadow-inner`}></div>
    <span className={`text-[10px] font-black uppercase ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
  </button>
);

const ConfigOption = ({ active, onClick, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left p-5 rounded-2xl border transition-all ${active ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-900 border-transparent hover:border-slate-200'}`}
  >
    <h5 className={`font-black text-xs uppercase tracking-tighter mb-1 ${active ? 'text-indigo-600' : 'text-slate-700 dark:text-slate-300'}`}>{title}</h5>
    <p className="text-[10px] text-slate-500 leading-snug">{desc}</p>
  </button>
);

export default AppSettings;
