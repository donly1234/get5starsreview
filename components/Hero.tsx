import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-40 lg:pt-56 md:pb-52 overflow-hidden hero-gradient">
      {/* Background Ambience - pointer-events-none is vital to prevent click blocking */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#16A34A]/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none animate-pulse duration-[15s] -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12 lg:space-y-16">
          
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
            Rank #1 on <br /> <span className="text-[#16A34A]">Google Maps.</span>
          </h1>

          <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            Automate your local SEO, generate 5-star reviews on autopilot, and outrank your competitors using our advanced Gemini-powered reputation engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-600">
            <button 
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-10 py-5 bg-[#16A34A] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#0F172A] transition-all shadow-2xl shadow-green-500/20 active:scale-95"
            >
              Start Free Trial
            </button>
            <button 
              onClick={onProspectorClick}
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              Free Ranking Report
            </button>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-8 opacity-40 grayscale animate-in fade-in duration-1000 delay-1000">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs uppercase tracking-widest">Google Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs uppercase tracking-widest">CASA Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xs uppercase tracking-widest">AI Built</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
