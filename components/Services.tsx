import React from 'react';

interface ServicesProps {
  onAuditClick: () => void;
  onSignup?: () => void;
}

const services = [
  {
    title: "Review Automation",
    description: "Hands-off collection of verified 5-star reviews via SMS and Email triggered instantly by your point of sale system.",
    rating: "4.9 â˜…",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    )
  },
  {
    title: "GBP Optimization",
    description: "Deep-level Google Business Profile management to ensure you maintain authority and rank at the top of local search.",
    rating: "4.8 â˜…",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    )
  },
  {
    title: "Reputation Monitoring",
    description: "24/7 real-time alerts for every new review across Google, Facebook, Yelp, and dozens of niche local directories.",
    rating: "5.0 â˜…",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
    )
  },
  {
    title: "AI Smart Responses",
    description: "Gemini-powered responses tailored to your unique brand voice to engage every customer and boost SEO relevance.",
    rating: "4.7 â˜…",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    )
  }
];

const Services: React.FC<ServicesProps> = ({ onAuditClick, onSignup }) => {
  return (
    <section id="services" className="py-20 md:py-40 bg-slate-50 dark:bg-slate-900/30 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-28 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-[#16A34A] font-black uppercase tracking-[0.3em] text-[10px] md:text-[11px] mb-4">Service Excellence</h2>
            <h3 className="text-4xl sm:text-5xl md:text-7xl font-[900] text-slate-900 dark:text-white leading-[1.1] md:leading-[1] uppercase tracking-tighter italic">
              Full Spectrum <br className="hidden sm:block" /> Reputation <span className="text-[#16A34A] underline decoration-slate-900/10 dark:decoration-white/10 underline-offset-[8px] md:underline-offset-[12px]">Growth.</span>
            </h3>
          </div>
          <div className="w-full md:w-auto shrink-0">
             <button 
              onClick={onAuditClick}
              className="w-full md:w-auto bg-[#16A34A] text-white px-10 py-5 rounded-[20px] font-black uppercase tracking-widest text-[11px] shadow-xl hover:bg-slate-950 transition-all active:scale-95"
             >
               Run Technical Audit
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[32px] md:rounded-[48px] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-8 md:mb-10 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase italic tracking-tight">{service.title}</h4>
              <div className="flex items-center gap-1.5 mb-4">
                <div className="flex text-yellow-400 text-xs">
                  {[...Array(5)].map((_, i) => <span key={i}>â˜…</span>)}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{service.rating}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-8">
                {service.description}
              </p>
              <button 
                onClick={onSignup}
                className="text-[10px] font-[900] text-[#16A34A] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-32 p-8 md:p-20 bg-[#0F172A] rounded-[48px] md:rounded-[72px] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-b-8 border-[#16A34A]">
           <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <h4 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter mb-4">Enterprise Citation Building</h4>
              <p className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed">We sync your business data across 50+ local directories including Bing, Yelp, and Apple Maps to build unstoppable ranking authority.</p>
           </div>
           <button onClick={onSignup} className="relative z-10 bg-[#16A34A] px-10 md:px-14 py-5 md:py-7 rounded-[24px] md:rounded-[36px] font-black uppercase tracking-widest text-[11px] md:text-xs hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 shrink-0 whitespace-nowrap">
             Scale My Business
           </button>
           
           <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#16A34A]/5 blur-3xl rounded-full translate-x-1/2 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;
