
import React from 'react';

interface HowItWorksProps {
  onStart: () => void;
}

const steps = [
  {
    num: "01",
    title: "Sync Assets",
    description: "Connect your Google, Facebook, and POS systems in under 2 minutes with zero technical friction.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    accent: "bg-emerald-500 shadow-emerald-500/40",
    anim: "group-hover:rotate-[360deg] transition-all duration-[1.5s]"
  },
  {
    num: "02",
    title: "AI Automation",
    description: "Our neural engine handles requests and smart responses tailored specifically to your brand voice.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: "bg-yellow-400 shadow-yellow-400/40",
    anim: "animate-pulse"
  },
  {
    num: "03",
    title: "Market Capture",
    description: "Watch your ranking climb to #1, driving massive increases in directions and calls from real customers.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    accent: "bg-blue-500 shadow-blue-500/40",
    anim: "group-hover:translate-y-[-10px] transition-transform duration-500"
  }
];

const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  return (
    <section id="how-it-works" className="py-24 md:py-40 bg-slate-950 text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#16A34A]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
          <span className="text-[#16A34A] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 inline-block bg-white/5 px-4 py-2 rounded-full border border-white/10">The Mastery Framework</span>
          <h2 className="text-4xl md:text-7xl font-[900] mb-8 leading-none uppercase tracking-tighter italic">
            Engineered for <br /><span className="text-[#16A34A] underline decoration-white/10 underline-offset-[12px]">Local Success.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
            We've simplified high-level SEO into a frictionless 3-step automation cycle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-10 right-10 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative group flex flex-col items-center text-center">
              {/* Step Counter */}
              <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-8xl font-black text-white/5 pointer-events-none transition-all duration-700 group-hover:text-emerald-500/10">
                {step.num}
              </div>

              {/* Icon Container */}
              <div className={`relative mb-10 w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[48px] ${step.accent} flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-6`}>
                <div className="absolute inset-0 bg-white/10 rounded-[inherit] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`relative z-10 text-white ${step.anim}`}>
                  {step.icon}
                </div>
              </div>

              <div className="space-y-4 max-w-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                  Phase {step.num}
                </div>
                <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight">{step.title}</h4>
                <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Arrow */}
              {idx < 2 && (
                <div className="lg:hidden mt-12 mb-4">
                  <div className="w-px h-12 bg-gradient-to-b from-emerald-500/50 to-transparent mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-40 flex flex-col items-center">
           <div className="group relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-yellow-500 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
             <button 
                onClick={onStart}
                className="relative bg-white text-black dark:bg-slate-900 dark:text-white px-12 md:px-16 py-6 md:py-8 rounded-[24px] md:rounded-[32px] font-black uppercase tracking-widest text-sm md:text-lg shadow-2xl transition-all hover:bg-emerald-600 hover:text-white active:scale-95"
              >
                Launch Your Machine
              </button>
           </div>
           
           <div className="mt-12 flex items-center gap-3 opacity-40">
              <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-5 h-5 grayscale" alt="Google" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Integrated with Google API v5.0</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
