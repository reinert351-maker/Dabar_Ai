
import React, { useState, useEffect } from 'react';
import { 
  APP_NAME, 
  ICON_BIBLE, 
  ICON_LIBRARY, 
  ICON_ASSISTANT, 
  ICON_COACH, 
  ICON_STRONG, 
  ICON_THEME, 
  ICON_CHRONOLOGY, 
  ICON_MAPS, 
  ICON_SERMON, 
  ICON_STUDY, 
  ICON_DIFFERENTIALS, 
  ICON_SETTINGS, 
  ICON_NOTE,
  ICON_QUOTES,
  ICON_TABERNACLE,
  ICON_TYPOLOGY,
  ICON_MEASURES
} from './constants';
import BibleReader from './components/BibleReader';
import LibraryExplorer from './components/LibraryExplorer';
import LogosHub from './components/LogosHub';
import LogosDifferentials from './components/LogosDifferentials';
import TimelineTab from './components/TimelineTab';
import KingsTab from './components/KingsTab';
import PropheciesTab from './components/PropheciesTab';
import AIConsole from './components/AIConsole';
import PreachingCoach from './components/PreachingCoach';
import SermonStudio from './components/SermonStudio';
import TeiaTab from './components/TeiaTab';
import QuotesExplorer from './components/QuotesExplorer';
import TabernacleTab from './components/TabernacleTab';
import TypologyTab from './components/TypologyTab';
import MeasuresTab from './components/MeasuresTab';
import AppSettings from './components/AppSettings';
import Settings from './components/Settings';
import EntitlementGate from './components/EntitlementGate';
import { entitlementService } from './services/entitlementService';
import { UserState } from './types';

const NavItem: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 p-3.5 lg:px-4 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 sepia:hover:bg-[#dbd3bc]'}`}
  >
    <div className="shrink-0">{icon}</div>
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const DEFAULT_USER_STATE: UserState = {
  isPremium: false,
  theme: 'ocean', // PADRÃO OCEAN DEFINIDO
  fontFamily: 'serif',
  fontSize: 'medium',
  savedForSermons: [],
  devotionalEntries: [],
  installedPacks: ['base_logos'],
  aiPreference: 'deep',
  theologicalMode: 'christian'
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bible' | 'library' | 'hub' | 'differentials' | 'timeline' | 'kings' | 'prophecies' | 'tabernacle' | 'typology' | 'measures' | 'assistant' | 'coach' | 'sermons' | 'teia' | 'quotes' | 'settings' | 'config'>('bible');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('dabar_user_state');
    const initialState = saved ? JSON.parse(saved) : DEFAULT_USER_STATE;
    
    const entitlement = entitlementService.getStoredEntitlement();
    return {
      ...initialState,
      theme: initialState.theme || 'ocean',
      isPremium: entitlementService.isPremiumActive(entitlement),
      entitlement
    };
  });

  useEffect(() => {
    const sync = async () => {
      const entitlement = entitlementService.getStoredEntitlement();
      if (entitlement) {
        const updated = await entitlementService.syncWithServer('current_user_id');
        if (updated) {
          setUserState(prev => ({
            ...prev,
            isPremium: entitlementService.isPremiumActive(updated),
            entitlement: updated
          }));
        }
      }
    };
    sync();
    window.addEventListener('online', sync);
    return () => window.removeEventListener('online', sync);
  }, []);

  useEffect(() => {
    localStorage.setItem('dabar_user_state', JSON.stringify(userState));
  }, [userState]);

  const getTabTitle = (tab: string) => {
    const titles: Record<string, string> = {
      bible: 'Leitor Bíblico',
      library: 'Biblioteca',
      hub: 'Hub Logos',
      differentials: 'Diferenciais',
      timeline: 'Cronologia',
      kings: 'Reis',
      prophecies: 'Profecias',
      tabernacle: 'Tabernáculo',
      typology: 'Tipos & Sombras',
      measures: 'Pesos & Medidas',
      assistant: 'Assistente AI',
      coach: 'Coach Voz',
      sermons: 'Estúdio',
      teia: 'Teia',
      quotes: 'Vozes da História',
      settings: 'Sistema',
      config: 'Ajustes'
    };
    return titles[tab] || tab;
  };

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleActivate = (success: boolean) => {
    if (success) {
      const mockEntitlement = {
        status: 'ACTIVE' as const,
        validUntil: Date.now() + 30 * 24 * 60 * 60 * 1000,
        lastCheckedAt: Date.now(),
        planType: 'monthly' as const
      };
      entitlementService.cacheEntitlement(mockEntitlement);
      setUserState(prev => ({ ...prev, isPremium: true, entitlement: mockEntitlement }));
    }
  };

  const themeClass = userState.theme === 'light' ? '' : userState.theme;

  return (
    <div className={`min-h-screen flex flex-col lg:flex-row transition-colors duration-300 ${themeClass} ${userState.theme === 'dark' || userState.theme === 'midnight' ? 'dark' : ''} ${userState.theme === 'light' ? 'bg-slate-50 text-slate-900' : ''}`}>
      
      {/* BARREIRA DE ATIVAÇÃO HOTMART HP */}
      {!userState.isPremium ? (
        <EntitlementGate userState={userState} onActivate={() => handleActivate(true)}>
          <div /> {/* Placeholder children para o Gate */}
        </EntitlementGate>
      ) : (
        <>
          {isMenuOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          <nav className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-800 sepia:bg-[#fdf6e3] border-r border-slate-200 dark:border-slate-700 sepia:border-[#eee8d5] z-[70] transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full py-6 px-4 overflow-y-auto no-scrollbar">
              <div className="flex items-center gap-3 mb-8 px-2">
                 <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">D</div>
                 <span className="font-black text-xs text-indigo-900 dark:text-indigo-100 uppercase tracking-widest">{APP_NAME}</span>
              </div>
              
              <div className="space-y-1">
                <NavItem active={activeTab === 'bible'} onClick={() => handleNavClick('bible')} icon={ICON_BIBLE('w-5 h-5')} label="Bíblia" />
                <NavItem active={activeTab === 'library'} onClick={() => handleNavClick('library')} icon={ICON_LIBRARY('w-5 h-5')} label="Biblioteca" />
                <NavItem active={activeTab === 'hub'} onClick={() => handleNavClick('hub')} icon={ICON_STUDY('w-5 h-5')} label="Hub Logos" />
                <NavItem active={activeTab === 'differentials'} onClick={() => handleNavClick('differentials')} icon={ICON_DIFFERENTIALS('w-5 h-5')} label="Diferenciais" />
                <NavItem active={activeTab === 'timeline'} onClick={() => handleNavClick('timeline')} icon={ICON_CHRONOLOGY('w-5 h-5')} label="Cronologia" />
                <NavItem active={activeTab === 'kings'} onClick={() => handleNavClick('kings')} icon={ICON_STRONG('w-5 h-5')} label="Reis" />
                <NavItem active={activeTab === 'tabernacle'} onClick={() => handleNavClick('tabernacle')} icon={ICON_TABERNACLE('w-5 h-5')} label="Tabernáculo" />
                <NavItem active={activeTab === 'typology'} onClick={() => handleNavClick('typology')} icon={ICON_TYPOLOGY('w-5 h-5')} label="Tipologia" />
                <NavItem active={activeTab === 'measures'} onClick={() => handleNavClick('measures')} icon={ICON_MEASURES('w-5 h-5')} label="Metrologia" />
                <NavItem active={activeTab === 'prophecies'} onClick={() => handleNavClick('prophecies')} icon={ICON_MAPS('w-5 h-5')} label="Profecias" />
                <NavItem active={activeTab === 'teia'} onClick={() => handleNavClick('teia')} icon={ICON_NOTE('w-5 h-5')} label="Teia" />
                <NavItem active={activeTab === 'quotes'} onClick={() => handleNavClick('quotes')} icon={ICON_QUOTES('w-5 h-5')} label="Vozes" />
                <NavItem active={activeTab === 'assistant'} onClick={() => handleNavClick('assistant')} icon={ICON_ASSISTANT('w-5 h-5')} label="Assistente" />
                <NavItem active={activeTab === 'coach'} onClick={() => handleNavClick('coach')} icon={ICON_COACH('w-5 h-5')} label="Coach" />
                <NavItem active={activeTab === 'sermons'} onClick={() => handleNavClick('sermons')} icon={ICON_SERMON('w-5 h-5')} label="Estúdio" />
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700">
                  <NavItem active={activeTab === 'config'} onClick={() => handleNavClick('config')} icon={ICON_SETTINGS('w-5 h-5')} label="Ajustes" />
                  <NavItem active={activeTab === 'settings'} onClick={() => handleNavClick('settings')} icon={ICON_SETTINGS('w-5 h-5')} label="Sistema" />
                </div>
              </div>
            </div>
          </nav>

          <div className="flex-1 flex flex-col min-w-0">
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 sepia:bg-[#f4ecd8]/80 backdrop-blur-md px-4 md:px-8 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white sepia:text-[#586e75] uppercase tracking-tighter italic truncate">
                  {getTabTitle(activeTab)}
                </h1>
              </div>
              <div className="hidden sm:block bg-indigo-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">Acesso Liberado</div>
            </header>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
              <div className="max-w-6xl mx-auto h-full">
                 {activeTab === 'bible' && <BibleReader userState={userState} setUserState={setUserState} />}
                 {activeTab === 'library' && <LibraryExplorer />}
                 {activeTab === 'hub' && <LogosHub />}
                 {activeTab === 'differentials' && <LogosDifferentials />}
                 {activeTab === 'timeline' && <TimelineTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'kings' && <KingsTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'tabernacle' && <TabernacleTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'typology' && <TypologyTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'measures' && <MeasuresTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'prophecies' && <PropheciesTab userState={userState} setUserState={setUserState} />}
                 {activeTab === 'assistant' && <AIConsole />}
                 {activeTab === 'coach' && <PreachingCoach />}
                 {activeTab === 'sermons' && <SermonStudio userState={userState} />}
                 {activeTab === 'teia' && <TeiaTab userState={userState} />}
                 {activeTab === 'quotes' && <QuotesExplorer userState={userState} />}
                 {activeTab === 'config' && <AppSettings userState={userState} setUserState={setUserState} />}
                 {activeTab === 'settings' && <Settings userState={userState} setUserState={setUserState} />}
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
