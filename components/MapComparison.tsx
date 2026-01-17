
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

  // Generate grid numbers for the "With" side to look realistic
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
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Decorative Floating Bubbles from the design */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[25%] w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">14</div>
        <div className="absolute top-[25%] left-[28%] w-6 h-6 rounded-full bg-green-200 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">2</div>
        <div className="absolute top-[35%] left-[26%] w-7 h-7 rounded-full bg-green-300 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">1</div>
        <div className="absolute top-[10%] right-[25%] w-6 h-6 rounded-full bg-orange-300 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">11</div>
        <div className="absolute top-[22%] right-[27%] w-7 h-7 rounded-full bg-orange-200 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">16</div>
        <div className="absolute top-[32%] right-[26%] w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-white shadow-sm opacity-60">9</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-16 leading-[1.1]">
            Rank <span className="text-[#16A34A]">#1 on Google Maps</span> <br /> & AI Mode faster with <br /> Get5StarsReview
          </h2>
          
          <div className="grid grid-cols-2 gap-12 max-w-3xl mx-auto">
            <div className="text-left">
              <p className="text-sm font-black text-[#ef4444] uppercase tracking-wider mb-2">Before Get5Starsreviews</p>
              <p className="text-[11px] leading-relaxed text-[#ef4444] font-bold max-w-[240px]">You're too busy to consistently optimize your Google Business Profile, so you get few calls.</p>
            </div>
            <div className="text-left pl-8">
              <p className="text-sm font-black text-[#16A34A] uppercase tracking-wider mb-2">With Get5Starsreviews</p>
              <p className="text-[11px] leading-relaxed text-[#16A34A] font-bold max-w-[240px]">Your business starts showing up in more search results and you get more customers on autopilot.</p>
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative max-w-3xl mx-auto aspect-[16/11] rounded-[32px] overflow-hidden border-[6px] border-[#3b82f6] shadow-[0_40px_100px_-20px_rgba(59,130,246,0.2)] cursor-col-resize select-none"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* Base Layer: With side (Optimized) */}
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-20" alt="map" />
             <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 p-6 md:p-12 gap-1">
                {[...Array(100)].map((_, i) => {
                  const rank = getWithRank(i);
                  return (
                    <div key={i} className="flex items-center justify-center">
                      <div className={`w-full aspect-square rounded-full ${rank.color} text-white font-black text-[8px] md:text-[10px] flex items-center justify-center shadow-md border border-white/20`}>
                        {rank.val}
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>

          {/* Top Overlay: Before side (Red) */}
          <div 
            className="absolute inset-0 z-10 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
             <div className="absolute top-0 left-0 h-full w-[768px]"> {/* Width of the container (max-w-3xl = 768px) */}
               <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-20" alt="map" />
               <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 p-6 md:p-12 gap-1">
                  {[...Array(100)].map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                      <div className="w-full aspect-square rounded-full bg-[#991b1b] text-white font-black text-[7px] md:text-[9px] flex items-center justify-center shadow-md border border-white/10">
                        20+
                      </div>
                    </div>
                  ))}
               </div>
             </div>
          </div>

          {/* Slider Handle (The Specific Blue Design) */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#3b82f6]"
            style={{ left: `${sliderPos}%` }}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#3b82f6] rounded-full flex items-center justify-center text-white border-[3px] border-[#3b82f6] shadow-xl">
                <div className="flex items-center gap-0.5">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M11 17l-5-5 5-5"/></svg>
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5-5 5"/></svg>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComparison;
