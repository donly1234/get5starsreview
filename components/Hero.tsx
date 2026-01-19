
import React, { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  useComma?: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, suffix = "", decimals = 0, useComma = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOut * end;
      setCount(currentCount);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  const formattedNumber = count.toFixed(decimals);
  const displayValue = useComma 
    ? Number(formattedNumber).toLocaleString('en-US', { minimumFractionDigits: decimals }) 
    : formattedNumber;

  return <span>{displayValue}{suffix}</span>;
};

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency }) => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-32 overflow-hidden bg-[#F8FBFF]">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6 md:mb-8">
            The #1 AI SEO Tool for Small <br className="hidden md:block" /> Businesses & Agencies
          </h1>
          
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xl md:text-2xl font-black text-slate-900 ml-2">4.9/5</span>
              </div>
              <p className="text-slate-500 font-medium text-xs md:text-base">Based on 900+ <span className="text-slate-900 font-bold border-b-2 border-slate-900">Google</span> and <span className="text-slate-900 font-bold border-b-2 border-slate-900">Trustpilot</span> reviews</p>
            </div>
            
            <button 
              onClick={onStartBusiness}
              className="w-full md:w-auto px-10 py-5 bg-[#16A34A] text-white rounded-xl font-black uppercase tracking-tight shadow-2xl shadow-green-500/30 hover:scale-105 active:scale-95 transition-all text-xs md:text-sm"
            >
              START FOR FREE
            </button>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto flex justify-center items-center py-6 md:py-10">
          {/* Floating Cards - Hidden on mobile to keep layout clean */}
          <div className="absolute left-[-2%] top-[5%] w-60 p-4 soft-card floating-card hidden xl:block shadow-xl rotate-[-3deg]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 font-bold text-lg">G</span>
              <div className="flex text-yellow-400 scale-75 origin-left">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
            </div>
            <p className="text-[11px] font-bold text-slate-800 leading-relaxed mb-2">"Super easy tool to use. Very intuitive. The AI is the bomb!"</p>
          </div>

          {/* Central Featured Content */}
          <div className="relative group w-full max-w-xl mx-auto px-4 z-20">
            <div className="absolute -inset-4 bg-green-500/10 rounded-[48px] blur-3xl"></div>
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] bg-slate-800 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl z-10">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" alt="Testimonial" className="w-full h-full object-cover grayscale-[20%]" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/15 transition-all cursor-pointer">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl text-white border border-white/40">
                  <svg className="w-6 h-6 md:w-8 md:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Row - Vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mt-12 md:mt-16 relative z-30 px-4">
          {[
            { label: 'GBPS optimized', value: 20000, suffix: '+', useComma: true },
            { label: '5-star reviews', value: 500, suffix: '+' },
            { label: 'Hours saved', value: 6.5, suffix: 'M+', decimals: 1 },
            { label: 'Trial conversions', value: 80, suffix: '%+' },
          ].map((stat, i) => (
            <div key={i} className="bg-white px-8 py-6 md:px-10 md:py-8 rounded-[24px] md:rounded-[32px] shadow-lg border border-slate-100 flex flex-col items-center justify-center text-center">
              <p className="text-2xl md:text-3xl lg:text-4xl font-black text-[#16A34A] mb-1">
                <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals} useComma={stat.useComma} />
              </p>
              <p className="text-[9px] md:text-[10px] lg:text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;