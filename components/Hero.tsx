import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  return (
    <section className="relative pt-24 pb-0 md:pt-48 lg:pt-56 md:pb-12 overflow-hidden hero-gradient">
      {/* Background Ambience - pointer-events-none is vital to prevent click blocking */}
      <div className="absolute top-[-15%] right-[-10%] w-[500px] md:w-[1000px] h-[500px] md:h-[1000px] bg-[#16A34A]/5 blur-[120px] md:blur-[200px] rounded-full pointer-events-none animate-pulse duration-[20s] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="max-w-6xl mx-auto text-center space-y-10 md:space-y-16">
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 glass-panel rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#16A34A]"></span>
            </span>
            <span className="text-[10px] md:text-[11px] lg:text-[13px] font-[900] text-slate-800 uppercase tracking-[0.25em] italic">
              Stop Losing Local Sales To Competitors • AI Sales Engine Active
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl 2xl:text-[92px] font-[900] text-[#0F172A] leading-[1.1] md:leading-[1] lg:leading-[0.85] 2xl:leading-[0.8] tracking-[-0.04em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Rank #1 on <br className="hidden md:block" />
            <span className="text-[#16A34A]">Google Maps</span> <br className="hidden md:block" />
            & Increase Sales.
          </h1>
          
          <p className="text-slate-500 text-base md:text-xl lg:text-2xl 2xl:text-3xl font-semibold max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            If you aren't in the Top 3, you're handing profit to your competition. We automate <span className="text-[#16A34A] font-black underline decoration-[#FACC15] underline-offset-4">Google Business Profile</span> and turn map searchers into <span className="text-[#16A34A] font-black underline decoration-[#FACC15] underline-offset-4">paying customers</span>.
          </p>

          <div className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 pb-20 md:pb-32">
            <button 
              type="button"
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-10 lg:px-14 py-6 lg:py-7 bg-[#16A34A] text-white rounded-2xl md:rounded-[28px] font-black text-base lg:text-xl shadow-[0_20px_50px_rgba(22,163,74,0.3)] hover:bg-[#0F172A] hover:scale-[1.05] hover:shadow-emerald-500/20 active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Start Free Trial
            </button>
            <button 
              type="button"
              onClick={() => {
                if (onProspectorClick) onProspectorClick();
              }}
              className="w-full sm:w-auto px-10 lg:px-14 py-6 lg:py-7 bg-[#0F172A] text-white rounded-2xl md:rounded-[28px] font-black text-base lg:text-xl shadow-2xl hover:bg-[#16A34A] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Analyze My Lost Profit
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Desktop Element */}
      <div className="hidden 2xl:block absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    </section>
  );
};

export default Hero;
