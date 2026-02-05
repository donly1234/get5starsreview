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
    <section className="relative pt-32 pb-12 md:pt-48 lg:pt-60 md:pb-24 overflow-hidden bg-white dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-[0.05] dark:opacity-[0.1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-5xl mx-auto text-left md:text-center space-y-10 md:space-y-14">
          
          <div className="space-y-6 md:space-y-10">
            <div className="inline-flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-500/20 mb-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
               <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.2em]">Next-Gen Local SEO Engine</span>
            </div>
            
            <h1 className="text-[45px] sm:text-7xl md:text-8xl lg:text-[120px] font-[900] text-slate-900 dark:text-white leading-[0.82] tracking-tighter uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
              RANK #1 ON <br />
              <span className="text-[#16A34A] drop-shadow-[0_4px_12px_rgba(22,163,74,0.15)] underline decoration-slate-100 dark:decoration-white/5 underline-offset-[14px]">GOOGLE MAPS.</span>
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl lg:text-3xl font-bold max-w-3xl md:mx-auto leading-tight animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              Automate your 5-star reputation and displace <br className="hidden md:block" /> 
              your competitors from the Map Pack on autopilot.
            </p>
          </div>

          <div className="max-w-4xl md:mx-auto w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-400">
            <form onSubmit={handleSearch} className="bg-white dark:bg-slate-900 p-2 md:p-3 rounded-[32px] md:rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-white/10 flex flex-col md:flex-row items-stretch md:items-center gap-3">
               <div className="flex-1 flex items-center gap-5 px-6 py-4 md:py-6">
                  <span className="text-3xl md:text-4xl opacity-30">ðŸ“¡</span>
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ENTER BUSINESS NAME & CITY" 
                    className="w-full bg-transparent border-none outline-none font-black text-slate-900 dark:text-white placeholder:text-slate-300 uppercase tracking-widest text-base md:text-xl"
                  />
               </div>
               <button 
                type="submit"
                className="bg-[#16A34A] text-white px-14 py-6 md:py-7 rounded-[24px] md:rounded-[36px] font-[900] uppercase tracking-widest text-sm shadow-2xl hover:bg-slate-950 transition-all active:scale-95 whitespace-nowrap"
               >
                 AUDIT MY RANKING
               </button>
            </form>
            
            <div className="mt-10 flex flex-wrap md:justify-center gap-8 md:gap-12 text-[10px] font-[900] text-slate-400 dark:text-slate-500 uppercase tracking-[0.35em]">
               <span className="flex items-center gap-2 group cursor-default">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                 REVENUE GAP ANALYSIS
               </span>
               <span className="flex items-center gap-2 group cursor-default">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                 COMPETITOR INTELLIGENCE
               </span>
               <span className="flex items-center gap-2 group cursor-default">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform"></div>
                 AI GROWTH BLUEPRINT
               </span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse-slow { 0%, 100% { opacity: 0.1; } 50% { opacity: 0.2; } }
        .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
      `}</style>
    </section>
  );
};

export default Hero;
