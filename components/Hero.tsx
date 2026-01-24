
import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 lg:pt-48 md:pb-24 overflow-hidden hero-gradient">
      {/* Background Ambience Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[1200px] h-[400px] md:h-[1200px] bg-[#16A34A]/5 blur-[100px] md:blur-[250px] rounded-full pointer-events-none animate-pulse-slow -z-10"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#FACC15]/5 blur-[80px] md:blur-[200px] rounded-full pointer-events-none animate-pulse-slow -z-10"></div>
      
      {/* Floating Micro-Proof (Desktop Only) */}
      <div className="hidden xl:block absolute left-[10%] top-[30%] animate-float">
         <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-lg">★</div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 leading-none">New 5-Star</p>
              <p className="text-xs font-bold text-slate-900 mt-1">Acme Plumbing Co.</p>
            </div>
         </div>
      </div>
      <div className="hidden xl:block absolute right-[12%] top-[45%] animate-float" style={{ animationDelay: '1.5s' }}>
         <div className="bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-lg">📈</div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Ranking Boost</p>
              <p className="text-xs font-bold text-slate-900 mt-1">#1 Maps in London</p>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-5 md:px-6 py-2 md:py-2.5 bg-white/60 glass-panel rounded-full shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]"></span>
            </span>
            <span className="text-[9px] md:text-[11px] font-bold text-slate-700 uppercase tracking-[0.2em] italic whitespace-nowrap overflow-hidden">
              AI Reputation Engine: Active & Optimizing
            </span>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[84px] font-[900] text-[#0F172A] leading-[1.1] md:leading-[1] tracking-[-0.04em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Rank #1 on <br />
              <span className="text-[#16A34A] drop-shadow-sm">Google Maps.</span>
            </h1>
            
            <p className="text-slate-500 text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              Automate your 5-star reputation and win more local customers. We help your business become an <span className="text-[#16A34A] font-black underline decoration-[#FACC15] decoration-[4px] underline-offset-4">unstoppable ranking machine</span> while you focus on work.
            </p>
          </div>

          <div className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <button 
              type="button"
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-[#16A34A] text-white rounded-[20px] md:rounded-[24px] font-black text-xs md:text-base shadow-[0_20px_40px_rgba(22,163,74,0.3)] hover:bg-[#0F172A] hover:scale-[1.03] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Start Free Trial
            </button>
            <button 
              type="button"
              onClick={onProspectorClick}
              className="w-full sm:w-auto px-10 md:px-12 py-5 md:py-6 bg-[#0F172A] text-white rounded-[20px] md:rounded-[24px] font-black text-xs md:text-base shadow-xl hover:bg-[#16A34A] hover:scale-[1.03] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Audit My Market
            </button>
          </div>

          {/* Social Proof Footer Section */}
          <div className="pt-8 md:pt-16 flex flex-col items-center gap-2 opacity-60 group hover:opacity-100 transition-opacity">
             <div className="flex items-center gap-3">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-900">Trustpilot: 4.8/5 Stars</span>
                <div className="flex gap-0.5">
                   {[1,2,3,4,5].map(i => <span key={i} className="text-[#16A34A] text-lg">★</span>)}
                </div>
             </div>
             <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">Join 2,000+ Local Businesses</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
