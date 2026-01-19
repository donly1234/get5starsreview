import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency }) => {
  return (
    <section className="relative pt-32 pb-24 md:pt-56 md:pb-52 overflow-hidden hero-gradient">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-green-500/5 blur-[160px] rounded-full pointer-events-none animate-pulse duration-[15s]"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12 md:space-y-16">
          
          <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/60 glass-panel rounded-full shadow-2xl shadow-green-500/5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
            </span>
            <span className="text-[10px] md:text-[12px] font-[900] text-slate-800 uppercase tracking-[0.2em] italic">
              AI-Powered Reputation Growth • 2,000+ Brands
            </span>
          </div>

          <h1 className="text-5xl md:text-[115px] font-[900] text-slate-950 leading-[0.85] tracking-[-0.05em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Rank #1 on <br className="hidden md:block" />
            <span className="gradient-text">Google Maps</span> <br className="hidden md:block" />
            On Autopilot.
          </h1>
          
          <p className="text-slate-500 text-lg md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            Don't just collect reviews. Dominate local search. Our AI engine automates requests, replies in your voice, and boosts rankings while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <button 
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-16 py-7 bg-green-600 text-white rounded-[28px] font-black text-xl shadow-2xl shadow-green-600/30 hover:bg-slate-950 hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-widest"
            >
              Start Free Trial
            </button>
            <button 
              onClick={onStartAgency}
              className="w-full sm:w-auto px-16 py-7 bg-white text-slate-900 border-2 border-slate-100 rounded-[28px] font-black text-xl shadow-xl hover:bg-slate-50 hover:border-green-600/20 transition-all uppercase tracking-widest"
            >
              Agency Program
            </button>
          </div>

          {/* Device Mockup Section */}
          <div className="pt-24 md:pt-36 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
            <div className="relative mx-auto max-w-5xl bg-slate-950 rounded-[56px] p-3 md:p-5 shadow-[0_100px_180px_-40px_rgba(15,23,42,0.4)] border border-white/10">
               <div className="bg-white rounded-[44px] overflow-hidden border border-slate-200 aspect-[16/9] flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-slate-50 flex flex-col">
                    {/* Fake Browser Top Bar */}
                    <div className="h-16 border-b border-slate-200 bg-white flex items-center px-10 gap-4 shrink-0">
                      <div className="flex gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-400"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-amber-400"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="flex-1 h-3.5 bg-slate-100 rounded-full max-w-[280px] ml-8"></div>
                    </div>
                    
                    {/* Dashboard Visual Placeholder */}
                    <div className="flex-1 p-12 grid grid-cols-12 gap-10 text-left">
                       <div className="col-span-8 space-y-10">
                          <div className="flex items-center gap-5">
                            <div className="h-12 w-56 bg-slate-200/60 rounded-2xl"></div>
                            <div className="h-12 w-32 bg-green-600/10 rounded-2xl"></div>
                          </div>
                          <div className="grid grid-cols-3 gap-8">
                             {[1,2,3].map(i => (
                               <div key={i} className="h-36 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-4">
                                  <div className="h-2.5 w-1/2 bg-slate-100 rounded-full"></div>
                                  <div className="h-7 w-3/4 bg-slate-900 rounded-xl"></div>
                               </div>
                             ))}
                          </div>
                          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
                             <div className="h-5 w-1/4 bg-slate-200 rounded-full"></div>
                             <div className="h-4 w-full bg-slate-50 rounded-full"></div>
                             <div className="h-4 w-5/6 bg-slate-50 rounded-full"></div>
                          </div>
                       </div>
                       <div className="col-span-4 space-y-8">
                          <div className="bg-slate-900 rounded-[40px] p-10 space-y-8 shadow-2xl">
                             <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
                             <div className="w-full aspect-square bg-white/5 rounded-[32px] flex items-center justify-center text-6xl">📍</div>
                             <div className="h-14 w-full bg-green-600 rounded-[20px]"></div>
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  {/* Floating Action/Notification Card */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
                     <div className="bg-white p-12 rounded-[48px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.18)] border border-slate-50 flex items-center gap-10 max-w-xl transform hover:scale-105 transition-transform duration-500 animate-bounce duration-[3000ms]">
                        <div className="w-24 h-24 bg-green-600 rounded-[32px] flex items-center justify-center text-white text-5xl shadow-2xl shadow-green-500/20">⭐</div>
                        <div>
                           <p className="text-[10px] font-[900] text-green-600 uppercase tracking-[0.25em] mb-2 leading-none">Growth Intelligence</p>
                           <p className="text-3xl font-[900] text-slate-950 leading-tight tracking-tight uppercase italic">Ranked #1 for <br />"Best Bakery" <br />In Downtown!</p>
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
