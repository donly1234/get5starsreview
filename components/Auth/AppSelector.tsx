
import React, { useEffect } from 'react';

interface AppSelectorProps {
  onSelect: (appId: string) => void;
  onBack: () => void;
}

const apps = [
  {
    id: 'gbp-mgmt',
    name: 'GBP Management',
    desc: 'Log in to manage your GBP with Get5Starsreview.',
    icon: (
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black text-[#16A34A] italic uppercase tracking-tighter">GBP Boost</span>
        <svg className="w-4 h-4 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    )
  },
  {
    id: 'partner-hub',
    name: 'Partner Hub',
    desc: 'Log in to access partner resources.',
    icon: (
      <div className="flex flex-col">
        <span className="text-2xl font-black text-[#16A34A] leading-none text-nowrap">get5starsreview</span>
        <span className="text-[10px] font-black text-slate-800 tracking-[0.2em] uppercase">Partner Hub</span>
      </div>
    )
  },
  {
    id: 'heatmap',
    name: 'Heatmap Generator',
    desc: 'Log in to audit your local ranking position.',
    icon: (
      <div className="w-12 h-10 bg-slate-100 rounded border border-slate-200 overflow-hidden grid grid-cols-4 grid-rows-3 p-1 gap-0.5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`rounded-sm ${i === 5 || i === 6 ? 'bg-red-500' : i < 4 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
        ))}
      </div>
    )
  },
  {
    id: 'gbp-auditor',
    name: 'GBP Auditor',
    desc: 'Log in to audit your GBP optimization and see recommendations.',
    icon: (
      <div className="flex flex-col gap-1">
        <span className="text-[8px] font-bold text-green-600 uppercase">Optimization Score</span>
        <div className="w-12 h-6 rounded-full border-4 border-slate-100 border-t-orange-500 relative flex items-center justify-center">
          <span className="text-[8px] font-bold">43%</span>
        </div>
      </div>
    )
  }
];

const AppSelector: React.FC<AppSelectorProps> = ({ onSelect, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col font-sans pt-20">
      {/* Background Header with Ring Pattern */}
      <div className="h-[350px] md:h-[450px] bg-[#064e3b] relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
        {/* Concentric Rings Pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="absolute rounded-full border border-white/50"
              style={{ 
                width: `${i * 300}px`, 
                height: `${i * 300}px`,
                animation: `pulse ${4 + i}s infinite ease-in-out`
              }}
            />
          ))}
        </div>

        <button 
          onClick={onBack}
          className="absolute top-12 left-8 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold z-30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tight z-10 uppercase italic animate-in fade-in slide-in-from-bottom-4 duration-700">
          Select Your <br /> Reputation Tool
        </h1>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto w-full px-6 -mt-20 relative z-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, idx) => (
            <button 
              key={app.id} 
              onClick={() => onSelect(app.id)}
              className={`bg-white rounded-[32px] p-10 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-2xl hover:border-green-200 transition-all duration-500 group text-left w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[${idx * 100}ms]`}
            >
              <div>
                <div className="mb-8">
                  {app.icon}
                </div>
                <div className="h-px w-full bg-slate-100 mb-8" />
                <h3 className="text-2xl font-black text-slate-900 mb-3">{app.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {app.desc}
                </p>
              </div>
              
              <div className="mt-12 flex justify-end">
                <div className="bg-[#16A34A] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20 group-hover:scale-110 transition-all active:scale-95">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Nudgify Bubble */}
      <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-10 duration-700">
        <div className="bg-white p-4 pr-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-sm">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
             🔥
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
               <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                 <svg className="w-1.5 h-1.5 text-white fill-current" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">It's popular</span>
            </div>
            <p className="text-xs font-bold text-slate-700 leading-tight">
              <span className="text-green-600 font-black">79 people</span> started working with Get5Starsreview within the last week
            </p>
            <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
              Verified by Get5Starsreview
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.05); opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};

export default AppSelector;
