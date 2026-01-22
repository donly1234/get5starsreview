import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  return (
    <section className="relative pt-24 pb-12 md:pt-40 lg:pt-48 md:pb-16 overflow-hidden hero-gradient">
      {/* Background Ambience - pointer-events-none is vital to prevent click blocking */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#16A34A]/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none animate-pulse duration-[15s] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12 lg:space-y-12">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white/60 glass-panel rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 md:h-3 w-2 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 md:h-3 w-2 md:w-3 bg-[#16A34A]"></span>
            </span>
            <span className="text-[8px] md:text-[10px] lg:text-[12px] font-[900] text-slate-800 uppercase tracking-[0.2em] italic">
              Stop Losing Local Sales To Competitors • AI Sales Engine Active
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[72px] font-[900] text-[#0F172A] leading-[1.1] md:leading-[1] lg:leading-[0.85] tracking-[-0.05em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Rank #1 on <br className="hidden md:block" />
            <span className="text-[#16A34A]">Google Maps</span> <br className="hidden md:block" />
            & Increase Sales.
          </h1>
          
          <p className="text-slate-500 text-base md:text-xl lg:text-2xl font-semibold max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            If you aren't in the Top 3, you're handing profit to your competition. We automate <span className="text-[#16A34A] font-black underline decoration-[#FACC15]">Google Business Profile</span> and turn map searchers into <span className="text-[#16A34A] font-black underline decoration-[#FACC15]">paying customers</span>.
          </p>

          <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <button 
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-8 lg:px-12 py-5 lg:py-6 bg-[#16A34A] text-white rounded-2xl md:rounded-[24px] font-black text-base lg:text-lg shadow-2xl shadow-[#16A34A]/30 hover:bg-[#0F172A] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            >
              Start Free Trial
            </button>
            <button 
              onClick={onProspectorClick}
              className="w-full sm:w-auto px-8 lg:px-12 py-5 lg:py-6 bg-[#0F172A] text-white rounded-2xl md:rounded-[24px] font-black text-base lg:text-lg shadow-2xl hover:bg-[#16A34A] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            >
              Analyze My Lost Profit
            </button>
            <button 
              onClick={onStartAgency}
              className="w-full sm:w-auto px-8 lg:px-12 py-5 lg:py-6 bg-white text-[#0F172A] border-2 border-slate-100 rounded-2xl md:rounded-[24px] font-black text-base lg:text-lg shadow-xl hover:border-[#FACC15] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            >
              Agency Program
            </button>
          </div>

          {/* Minimal Device Mockup Section to reduce visual clutter */}
          <div className="pt-12 md:pt-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 pointer-events-none opacity-40">
            <div className="relative mx-auto max-w-4xl bg-[#0F172A] rounded-[32px] p-1 border border-white/10 overflow-hidden shadow-2xl">
               <div className="bg-white rounded-[28px] overflow-hidden aspect-[16/6]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
