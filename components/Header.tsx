import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-40 lg:pt-56 md:pb-52 overflow-hidden hero-gradient">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-green-500/5 blur-[100px] md:blur-[160px] rounded-full pointer-events-none animate-pulse duration-[15s]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-12 lg:space-y-16">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white/60 glass-panel rounded-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 md:h-3 w-2 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 md:h-3 w-2 md:w-3 bg-green-600"></span>
            </span>
            <span className="text-[8px] md:text-[10px] lg:text-[12px] font-[900] text-slate-800 uppercase tracking-[0.2em] italic">
              Stop Losing Local Sales To Competitors • AI Sales Engine Active
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[72px] font-[900] text-slate-950 leading-[1.1] md:leading-[1] lg:leading-[0.85] tracking-[-0.05em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Rank #1 on <br className="hidden md:block" />
            <span className="gradient-text">Google Maps</span> <br className="hidden md:block" />
            Capture More Sales.
          </h1>
          
          <p className="text-slate-500 text-base md:text-xl lg:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            If you aren't in the Top 3, you're handing profit to your competition. We automate the 5-star trust that turns map searchers into <span className="text-green-600 font-black">paying customers</span>.
          </p>

          <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <button 
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-8 lg:px-16 py-5 lg:py-7 bg-green-600 text-white rounded-2xl md:rounded-[28px] font-black text-base lg:text-xl shadow-2xl shadow-green-600/30 hover:bg-slate-950 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest cursor-pointer"
            >
              Unlock My Sales Growth
            </button>
            <button 
              onClick={onProspectorClick}
              className="w-full sm:w-auto px-8 lg:px-16 py-5 lg:py-7 bg-slate-950 text-white rounded-2xl md:rounded-[28px] font-black text-base lg:text-xl shadow-2xl hover:bg-emerald-600 transition-all uppercase tracking-widest cursor-pointer"
            >
              Analyze My Lost Profit
            </button>
            <button 
              onClick={onStartAgency}
              className="w-full sm:w-auto px-8 lg:px-16 py-5 lg:py-7 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl md:rounded-[28px] font-black text-base lg:text-xl shadow-xl hover:bg-slate-50 transition-all uppercase tracking-widest cursor-pointer relative z-30"
            >
              Agency Program
            </button>
          </div>

          {/* Device Mockup Section */}
          <div className="pt-12 md:pt-24 lg:pt-36 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 relative z-10">
            <div className="relative mx-auto max-w-5xl bg-slate-950 rounded-[32px] md:rounded-[44px] lg:rounded-[56px] p-1.5 md:p-3 lg:p-5 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)] border border-white/10 overflow-hidden">
               <div className="bg-white rounded-[24px] md:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-slate-200 aspect-[16/9] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-50 flex flex-col">
                    <div className="h-10 md:h-12 lg:h-16 border-b border-slate-200 bg-white flex items-center px-4 md:px-6 lg:px-10 gap-2 shrink-0">
                      <div className="flex gap-1.5 lg:gap-2.5">
                        <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-rose-400"></div>
                        <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-amber-400"></div>
                        <div className="w-2 h-2 lg:w-3.5 lg:h-3.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="flex-1 h-2 lg:h-3.5 bg-slate-100 rounded-full max-w-[120px] md:max-w-[280px] ml-4"></div>
                    </div>
                    
                    <div className="flex-1 p-4 lg:p-12 grid grid-cols-12 gap-4 lg:gap-10 text-left">
                       <div className="col-span-12 md:col-span-8 space-y-4 lg:space-y-10">
                          <div className="flex items-center gap-3">
                            <div className="h-4 md:h-8 lg:h-12 w-24 md:w-44 lg:w-56 bg-slate-200/60 rounded-lg"></div>
                            <div className="h-4 md:h-8 lg:h-12 w-16 md:w-24 lg:w-32 bg-green-600/10 rounded-lg"></div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 lg:gap-8">
                             {[1,2,3].map(i => (
                               <div key={i} className="h-12 md:h-24 lg:h-36 bg-white rounded-lg lg:rounded-[32px] border border-slate-100 shadow-sm p-2 lg:p-8 space-y-1 lg:space-y-4">
                                  <div className="h-1 md:h-2 w-1/2 bg-slate-100 rounded-full"></div>
                                  <div className="h-2 md:h-5 lg:h-7 w-3/4 bg-slate-900 rounded lg:rounded-xl"></div>
                               </div>
                             ))}
                          </div>
                          <div className="hidden md:block bg-white rounded-[24px] lg:rounded-[40px] p-6 lg:p-10 border border-slate-100 shadow-sm space-y-4 lg:space-y-6">
                             <div className="h-3 lg:h-5 w-1/4 bg-slate-200 rounded-full"></div>
                             <div className="h-2 lg:h-4 w-full bg-slate-50 rounded-full"></div>
                             <div className="h-2 lg:h-4 w-5/6 bg-slate-50 rounded-full"></div>
                          </div>
                       </div>
                       <div className="hidden md:block col-span-4 space-y-4 lg:space-y-8">
                          <div className="bg-slate-900 rounded-[24px] lg:rounded-[40px] p-6 lg:p-10 space-y-4 lg:space-y-8 shadow-2xl">
                             <div className="h-2 lg:h-4 w-2/3 bg-white/20 rounded-full"></div>
                             <div className="w-full aspect-square bg-white/5 rounded-xl lg:rounded-[32px] flex items-center justify-center text-4xl lg:text-6xl">💰</div>
                             <div className="h-8 lg:h-14 w-full bg-green-600 rounded-lg lg:rounded-[20px]"></div>
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                     <div className="bg-white p-4 md:p-8 lg:p-12 rounded-[24px] md:rounded-[36px] lg:rounded-[48px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.18)] border border-slate-50 flex items-center gap-3 lg:gap-10 max-w-[85%] md:max-w-xl animate-bounce duration-[3000ms]">
                        <div className="w-10 h-10 md:w-16 lg:w-24 bg-green-600 rounded-lg md:rounded-3xl flex items-center justify-center text-white text-xl md:text-3xl lg:text-5xl shrink-0">📈</div>
                        <div>
                           <p className="text-[6px] md:text-[8px] lg:text-[10px] font-[900] text-green-600 uppercase tracking-[0.25em] mb-1">Profit Intelligence</p>
                           <p className="text-xs md:text-2xl lg:text-3xl font-[900] text-slate-950 leading-tight tracking-tight uppercase italic">Sales increased by <br className="hidden md:block" />40% this month!</p>
                        </div>
                     </div>
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
