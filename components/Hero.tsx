import React, { useState } from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onProspectorClick) onProspectorClick();
  };

  return (
    <section className="relative pt-32 pb-12 md:pt-48 lg:pt-56 md:pb-24 overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-[900] text-slate-900 dark:text-white leading-[0.85] tracking-tighter uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000">
              RANK #1 ON <br />
              <span className="text-[#16A34A] drop-shadow-sm">GOOGLE MAPS.</span>
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-xl lg:text-2xl font-bold max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Automate your 5-star reputation and steal back <br className="hidden md:block" /> local leads from your competitors on autopilot.
            </p>
          </div>

          <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400 px-4 md:px-0">
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 p-2 md:p-3 rounded-[24px] md:rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center gap-3">
               <div className="flex-1 flex items-center gap-4 px-6 py-4">
                  <span className="text-2xl md:text-3xl">ðŸ“¡</span>
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ENTER BUSINESS NAME & CITY TO AUDIT" 
                    className="w-full bg-transparent border-none outline-none font-black text-slate-900 dark:text-white placeholder:text-slate-200 uppercase tracking-widest text-sm md:text-lg"
                  />
               </div>
               <button 
                type="submit"
                className="bg-[#16A34A] text-white px-12 py-5 rounded-[20px] md:rounded-[32px] font-black uppercase tracking-widest text-xs shadow-xl hover:bg-slate-950 transition-all active:scale-95 whitespace-nowrap"
               >
                 AUDIT MY RANKING
               </button>
            </form>
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
               <span className="flex items-center gap-2">REVENUE IMPACT ANALYSIS</span>
               <span className="flex items-center gap-2">COMPETITOR BENCHMARKING</span>
               <span className="flex items-center gap-2">AI GROWTH ROADMAP</span>
            </div>
          </div>

          <div className="pt-12 md:pt-24 flex flex-col items-center gap-4">
             <div className="bg-slate-50 dark:bg-white/5 px-8 py-4 rounded-full border border-slate-100 dark:border-white/10 flex items-center gap-6 shadow-sm">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden"><img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" /></div>)}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Rated 4.9/5 Excellence</span>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-[#16A34A] text-[10px]">â˜…</span>)}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
