import React, { useEffect } from 'react';

interface AppSelectorProps {
  onSelect: (appId: string) => void;
  onBack: () => void;
}

const apps = [
  {
    id: 'gbp-mgmt',
    name: 'GBP Management',
    desc: 'Log in to manage your GBP with Get5Starsreview automation.',
    icon: (
      <div className="flex items-center gap-1">
        <span className="text-2xl font-black text-[#16A34A] italic uppercase tracking-tighter">GBP Boost</span>
      </div>
    )
  },
  {
    id: 'prospector',
    name: 'Ranking Report Tool',
    desc: 'Generate a professional ranking report with verified grounding sources.',
    icon: <div className="w-12 h-10 bg-slate-950 rounded-lg flex items-center justify-center text-emerald-500 font-black text-xs italic">REPORT</div>
  },
  {
    id: 'voice-ai',
    name: 'Gemini Live Assistant',
    desc: 'Real-time voice consultation for your local SEO strategy.',
    icon: <div className="text-2xl">🎙️</div>
  },
  {
    id: 'heatmap',
    name: 'Heatmap Generator',
    desc: 'Audit your local ranking position across your entire city.',
    icon: (
      <div className="w-12 h-10 bg-slate-100 rounded border border-slate-200 overflow-hidden grid grid-cols-4 grid-rows-3 p-1 gap-0.5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`rounded-sm ${i === 5 || i === 6 ? 'bg-red-500' : i < 4 ? 'bg-green-500' : 'bg-yellow-400'}`}></div>
        ))}
      </div>
    )
  },
  {
    id: 'image-optimizer',
    name: 'AI Image Cleaner',
    desc: 'Clean background clutter from storefront photos to boost CTR.',
    icon: <div className="text-2xl">🪄</div>
  }
];

const AppSelector: React.FC<AppSelectorProps> = ({ onSelect, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative flex flex-col font-sans pt-20">
      <div className="h-[350px] md:h-[450px] bg-[#064e3b] relative overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="absolute rounded-full border border-white/50"
              style={{ width: `${i * 300}px`, height: `${i * 300}px`, animation: `pulse ${4 + i}s infinite ease-in-out` }}
            />
          ))}
        </div>

        <button onClick={onBack} className="absolute top-12 left-8 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold z-30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </button>

        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-black tracking-tight z-10 uppercase italic animate-in fade-in slide-in-from-bottom-4 duration-700">
          Reputation <br /> Intelligence Suite
        </h1>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 -mt-20 relative z-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, idx) => (
            <button 
              key={app.id} 
              onClick={() => onSelect(app.id)}
              className="bg-white rounded-[32px] p-10 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-2xl hover:border-green-200 transition-all duration-500 group text-left w-full animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
              <div>
                <div className="mb-8">{app.icon}</div>
                <div className="h-px w-full bg-slate-100 mb-8" />
                <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase italic tracking-tighter">{app.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{app.desc}</p>
              </div>
              <div className="mt-12 flex justify-end">
                <div className="bg-[#16A34A] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all active:scale-95">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.15; } 50% { transform: scale(1.05); opacity: 0.25; } }
      `}</style>
    </div>
  );
};

export default AppSelector;
