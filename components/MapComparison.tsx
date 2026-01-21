
import React, { useState, useEffect } from 'react';

const MapComparison: React.FC = () => {
  const [view, setView] = useState<'before' | 'after'>('before');
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimate(true);
      setTimeout(() => setView(v => v === 'before' ? 'after' : 'before'), 300);
      setTimeout(() => setIsAnimate(false), 800);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getRankData = (index: number, isAfter: boolean) => {
    if (!isAfter) return { val: '20+', color: 'bg-rose-900', shadow: 'shadow-rose-900/40' };
    
    // Create a "hotspot" in the center for the 'After' state
    const row = Math.floor(index / 7);
    const col = index % 7;
    const dist = Math.sqrt(Math.pow(row - 3, 2) + Math.pow(col - 3, 2));
    
    if (dist < 1.5) return { val: '1', color: 'bg-emerald-500', shadow: 'shadow-emerald-500/60' };
    if (dist < 2.5) return { val: '2', color: 'bg-emerald-400', shadow: 'shadow-emerald-400/40' };
    if (dist < 3.5) return { val: '4', color: 'bg-yellow-400', shadow: 'shadow-yellow-400/30' };
    return { val: '9', color: 'bg-orange-400', shadow: 'shadow-orange-400/20' };
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-2/5 space-y-10">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                Market Penetration Audit
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
                From <span className="text-rose-600">Invisible</span> <br /> To <span className="text-emerald-600">Unstoppable.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Most businesses are "ghosting" 80% of their local territory. Our AI strategy builds the authority needed to turn red zones into green revenue.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${view === 'before' ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-100 opacity-40'}`} onClick={() => setView('before')}>
                  <p className="text-[10px] font-black uppercase text-rose-500 mb-1">Status Quo</p>
                  <p className="text-xl font-black text-slate-900 leading-none">Red Zone</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">12% Visibility</p>
               </div>
               <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer ${view === 'after' ? 'bg-emerald-50 border-emerald-200 shadow-xl shadow-emerald-500/10' : 'bg-white border-slate-100 opacity-40'}`} onClick={() => setView('after')}>
                  <p className="text-[10px] font-black uppercase text-emerald-500 mb-1">Optimized</p>
                  <p className="text-xl font-black text-slate-900 leading-none">Green Dominance</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2">94% Visibility</p>
               </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex items-center gap-6">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-xs font-black">👤</div>
                 ))}
               </div>
               <p className="text-xs font-bold text-slate-400 max-w-[180px] leading-relaxed">Join 2,100+ business owners who fixed their map rankings.</p>
            </div>
          </div>

          <div className="lg:w-3/5 w-full relative">
            {/* The Professional Map UI Container */}
            <div className="bg-slate-950 rounded-[48px] p-2 md:p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/10 relative overflow-hidden">
              
              {/* Header Context Bar */}
              <div className="bg-white/5 border-b border-white/5 px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                 <div className="flex gap-6 items-center">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Target Keyword</p>
                      <p className="text-xs font-bold text-white">"Emergency Plumber Near Me"</p>
                    </div>
                    <div className="w-px h-6 bg-white/10" />
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Radius</p>
                      <p className="text-xs font-bold text-white">5.0 Miles (49 Nodes)</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Live Audit Simulation</span>
                 </div>
              </div>

              {/* The Map Grid */}
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-900 m-2">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
                  className={`w-full h-full object-cover transition-all duration-1000 ${view === 'before' ? 'grayscale opacity-20' : 'opacity-40'}`} 
                  alt="map" 
                />
                
                <div className={`absolute inset-0 grid grid-cols-7 grid-rows-7 p-4 md:p-12 gap-2 md:gap-4 transition-all duration-500 ${isAnimate ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100'}`}>
                  {[...Array(49)].map((_, i) => {
                    const data = getRankData(i, view === 'after');
                    return (
                      <div key={i} className="flex items-center justify-center">
                        <div 
                          className={`w-full aspect-square rounded-full ${data.color} ${data.shadow} flex items-center justify-center text-white font-black text-[8px] md:text-[14px] shadow-2xl transition-all duration-700 hover:scale-125 cursor-default relative group`}
                        >
                           {data.val}
                           {/* Rank Change Indicator */}
                           {view === 'after' && (
                             <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                               <svg className="w-2 h-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
                             </div>
                           )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Floating Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-4 animate-in slide-in-from-bottom-4">
                   <div className="flex-1 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Average Rank</p>
                        <p className={`text-xl font-black ${view === 'before' ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {view === 'before' ? '20.4' : '1.8'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Share of Voice</p>
                        <p className={`text-xl font-black ${view === 'before' ? 'text-rose-500' : 'text-emerald-500'}`}>
                          {view === 'before' ? '4%' : '88%'}
                        </p>
                      </div>
                   </div>
                </div>
              </div>
              
              {/* Bottom Legend */}
              <div className="px-8 py-6 flex items-center justify-center gap-8 border-t border-white/5">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Top 3 Rank</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mid-Tier</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-900"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">The "Dead Zone"</span>
                 </div>
              </div>
            </div>
            
            {/* Background decorative ring */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-100 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComparison;
