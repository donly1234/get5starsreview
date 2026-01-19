
import React, { useState, useRef } from 'react';

const MapComparison: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  const getWithRank = (index: number) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    const dist = Math.sqrt(Math.pow(row - 4.5, 2) + Math.pow(col - 5, 2));
    if (dist < 2) return { val: 1, color: 'bg-green-500' };
    if (dist < 3.5) return { val: Math.floor(Math.random() * 2) + 2, color: 'bg-green-400' };
    if (dist < 5) return { val: Math.floor(Math.random() * 4) + 4, color: 'bg-yellow-400' };
    return { val: Math.floor(Math.random() * 10) + 8, color: 'bg-orange-400' };
  };

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-8 md:mb-16 leading-tight">
            Rank <span className="text-[#16A34A]">#1 on Google Maps</span> <br className="hidden md:block" /> & AI Mode faster with <br className="hidden md:block" /> Get5StarsReview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-3xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-xs md:text-sm font-black text-[#ef4444] uppercase tracking-wider mb-2">Before Get5Starsreviews</p>
              <p className="text-[10px] md:text-[11px] leading-relaxed text-[#ef4444] font-bold mx-auto md:mx-0 max-w-[240px]">Few optimizations leads to limited visibility and fewer calls from local search.</p>
            </div>
            <div className="text-center md:text-left md:pl-8">
              <p className="text-xs md:text-sm font-black text-[#16A34A] uppercase tracking-wider mb-2">With Get5Starsreviews</p>
              <p className="text-[10px] md:text-[11px] leading-relaxed text-[#16A34A] font-bold mx-auto md:mx-0 max-w-[240px]">AI-powered ranking puts you in front of more customers on autopilot.</p>
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full max-w-3xl mx-auto aspect-[16/11] rounded-[24px] md:rounded-[32px] overflow-hidden border-[4px] md:border-[6px] border-[#3b82f6] shadow-[0_20px_50px_-10px_rgba(59,130,246,0.3)] cursor-col-resize select-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Base Layer: With side */}
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-20" alt="map" />
             <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 p-2 md:p-12 gap-0.5 md:gap-1">
                {[...Array(100)].map((_, i) => {
                  const rank = getWithRank(i);
                  return (
                    <div key={i} className="flex items-center justify-center">
                      <div className={`w-full aspect-square rounded-full ${rank.color} text-white font-black text-[5px] md:text-[10px] flex items-center justify-center shadow-sm border border-white/10`}>
                        {rank.val}
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Top Overlay: Before side */}
          <div className="absolute inset-0 z-10 overflow-hidden" style={{ width: `${sliderPos}%` }}>
             <div className="absolute top-0 left-0 h-full w-[100vw] md:w-[768px]">
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-20" alt="map" />
               <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 p-2 md:p-12 gap-0.5 md:gap-1">
                  {[...Array(100)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className="w-full aspect-square rounded-full bg-[#991b1b] text-white font-black text-[5px] md:text-[9px] flex items-center justify-center shadow-sm border border-white/10">
                        20+
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          {/* Slider Handle */}
          <div className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#3b82f6]" style={{ left: `${sliderPos}%` }}>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 bg-[#3b82f6] rounded-full flex items-center justify-center text-white border-[2px] md:border-[3px] border-[#3b82f6] shadow-xl">
                <div className="flex items-center gap-0.5">
                   <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M11 17l-5-5 5-5"/></svg>
                   <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5-5 5"/></svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComparison;