
import React, { useState } from 'react';
import { UserState } from '../types';

interface EntitlementGateProps {
  userState: UserState;
  onActivate: () => void;
  children: React.ReactNode;
}

const EntitlementGate: React.FC<EntitlementGateProps> = ({ userState, onActivate, children }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);

  if (userState.isPremium) return <>{children}</>;

  const handleVerify = () => {
    if (!code.trim()) return;
    setIsVerifying(true);
    setError(false);

    // Simulação de validação de licença/transação Hotmart
    setTimeout(() => {
      if (code.length >= 5) {
        onActivate();
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-sky-50 dark:bg-slate-950 overflow-hidden">
      {/* Background Decorativo Estilo HP */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-300 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[60px] shadow-2xl border border-white dark:border-slate-800 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-indigo-600 rounded-[35px] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-indigo-200 dark:shadow-none">
           <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
           </svg>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white mb-3 leading-none">Dabar Logos</h2>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-10">Ativação de Licença Vitalícia</p>

        <div className="space-y-6">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Insira seu código de ativação..."
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(false); }}
                className={`w-full bg-slate-50 dark:bg-slate-800 border-2 ${error ? 'border-rose-500' : 'border-slate-100 dark:border-slate-700'} rounded-[25px] px-8 py-5 text-center font-black uppercase tracking-widest text-lg outline-none focus:border-indigo-500 dark:text-white transition-all`}
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              {error && <p className="text-[10px] font-black text-rose-500 uppercase mt-3 animate-bounce">Código inválido ou expirado</p>}
           </div>

           <button 
             onClick={handleVerify}
             disabled={isVerifying || !code}
             className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black py-5 rounded-[25px] shadow-xl transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[0.2em]"
           >
             {isVerifying ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
             ) : 'Ativar Agora'}
           </button>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-50 dark:border-slate-800 flex flex-col gap-4">
           <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
             O seu código foi enviado para o e-mail cadastrado na Hotmart após a confirmação do pagamento.
           </p>
           <a 
             href="https://pay.hotmart.com/YOUR_PRODUCT_ID" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline"
           >
             Ainda não possui um código? Adquira aqui.
           </a>
        </div>
      </div>
      
      <footer className="absolute bottom-10 left-0 right-0 text-center">
         <p className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">Powered by Hotmart HP Gateway</p>
      </footer>
    </div>
  );
};

export default EntitlementGate;
