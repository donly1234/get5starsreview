
import React from 'react';

interface HowItWorksProps {
  onStart: () => void;
}

const steps = [
  {
    num: "01",
    title: "Connect Your Profiles",
    description: "Connect Google Business, Facebook Pages, Yelp, and more in under 2 minutes with our secure OAuth integrations.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    color: "from-green-500 to-green-700"
  },
  {
    num: "02",
    title: "Automate Requests",
    description: "Sync your POS or CRM and automatically send review requests via SMS or Email the moment a purchase is made.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "from-black to-slate-800"
  },
  {
    num: "03",
    title: "Watch Your Sales Grow",
    description: "Display your 5-star reviews on your site to build instant trust and see a massive lift in conversion rates.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "from-yellow-400 to-yellow-600"
  }
];

const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  return (
    <section id="how-it-works" className="py-24 bg-black text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-green-500 font-black uppercase tracking-[0.3em] text-xs mb-4">The Workflow</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-6 leading-none uppercase tracking-tighter italic">
            Simple Process, <span className="text-green-500">Massive Wins.</span>
          </h3>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            We've engineered the fastest path from a customer visit to a 5-star public review. Zero friction, total automation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -z-10"></div>

          {steps.map((step, idx) => (
            <button 
              key={idx} 
              onClick={onStart}
              className="relative group p-8 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-green-500/30 transition-all duration-500 flex flex-col items-center text-center w-full"
            >
              <div className="absolute top-6 right-8 text-7xl font-black text-white/5 select-none transition-colors group-hover:text-green-500/10">
                {step.num}
              </div>

              <div className={`mb-10 w-24 h-24 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl shadow-black/40 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative`}>
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 text-white">
                  {step.icon}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">Step {step.num}</span>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter text-white">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              {idx < 2 && (
                <div className="lg:hidden mt-8 text-slate-800">
                  <svg className="w-8 h-8 animate-bounce mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center">
           <div className="h-px w-24 bg-gradient-to-r from-transparent via-green-500 to-transparent mb-10"></div>
           <div className="bg-green-600/10 border border-green-500/20 p-8 rounded-[40px] max-w-2xl w-full text-center hover:bg-green-600/20 transition-colors">
              <p className="text-green-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Start Today</p>
              <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2">Ready to switch to auto-pilot?</h4>
              <p className="text-slate-400 text-sm mb-6">Our system integrates with 1,500+ POS and CRM tools including Shopify, Square, and HubSpot.</p>
              <button 
                onClick={onStart}
                className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-green-600/20 active:scale-95 uppercase tracking-widest text-xs"
              >
                Launch My Campaign
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
