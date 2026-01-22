import React from 'react';

interface ServicesProps {
  onAuditClick: () => void;
  onSignup?: () => void;
}

const services = [
  {
    title: "Review Automation",
    description: "Hands-off collection of verified 5-star reviews via SMS and Email triggered instantly by your point of sale system.",
    icon: (
      <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    )
  },
  {
    title: "GBP Optimization",
    description: "Deep-level Google Business Profile management to ensure you maintain authority and rank at the top of local search.",
    icon: (
      <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    )
  },
  {
    title: "Reputation Monitoring",
    description: "24/7 real-time alerts for every new review across Google, Facebook, Yelp, and dozens of niche local directories.",
    icon: (
      <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
    )
  },
  {
    title: "AI Smart Responses",
    description: "Gemini-powered responses tailored to your unique brand voice to engage every customer and boost SEO relevance.",
    icon: (
      <svg className="w-10 h-10 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    )
  }
];

const Services: React.FC<ServicesProps> = ({ onAuditClick, onSignup }) => {
  return (
    <section id="services" className="py-24 md:py-40 bg-slate-50 scroll-mt-32">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-28 gap-10">
          <div className="max-w-3xl">
            <h2 className="text-[#16A34A] font-black uppercase tracking-[0.3em] text-[11px] mb-6">Service Excellence</h2>
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0F172A] leading-[1] uppercase tracking-tighter italic">
              Full Spectrum <br /> Reputation <span className="text-[#16A34A] underline decoration-[#0F172A] underline-offset-[12px]">Growth</span>
            </h3>
          </div>
          <div className="text-right md:max-w-md">
             <p className="text-slate-500 text-lg font-bold mb-6">
              More than just a tool, we are your partner in digital credibility. We handle the technical SEO while you focus on your customers.
            </p>
            <button onClick={onAuditClick} className="bg-white border-2 border-slate-200 px-8 py-3 rounded-2xl text-[#16A34A] text-xs font-black uppercase tracking-widest hover:border-[#16A34A] hover:bg-emerald-50 transition-all cursor-pointer">Launch Diagnostic Audit →</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          {services.map((s, i) => (
            <button 
              key={i} 
              onClick={onSignup}
              className="bg-white p-12 lg:p-14 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] hover:border-[#16A34A] hover:translate-y-[-12px] transition-all group text-left w-full h-full flex flex-col cursor-pointer active:scale-[0.98] duration-500"
            >
              <div className="mb-10 group-hover:scale-110 transition-transform duration-500">
                {s.icon}
              </div>
              <h4 className="text-2xl font-black text-[#0F172A] mb-5 uppercase tracking-tighter italic leading-none">{s.title}</h4>
              <p className="text-slate-500 text-base font-medium leading-relaxed mb-10 flex-grow">
                {s.description}
              </p>
              <span className="text-[11px] font-black text-[#16A34A] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Explore Feature →</span>
            </button>
          ))}
        </div>

        {/* Feature Banner for Audit Tool */}
        <div className="mt-20 md:mt-32 bg-[#0F172A] rounded-[48px] md:rounded-[64px] p-10 md:p-24 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group border-b-8 border-[#16A34A]">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#16A34A]/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4 group-hover:scale-125 transition-transform duration-1000 pointer-events-none"></div>
           <div className="space-y-8 relative z-10 max-w-2xl">
              <span className="text-[11px] font-black uppercase tracking-[0.4em] bg-[#16A34A]/20 px-4 py-2 rounded-full text-[#16A34A]">Market Intelligence</span>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] italic">
                Local Competitor <br /> <span className="text-[#16A34A]">Audit Tool.</span>
              </h4>
              <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">Discover exactly where your competitors are outperforming you in real-time. Turn their weaknesses into your local dominance.</p>
           </div>
           <button onClick={onAuditClick} className="bg-[#16A34A] text-white px-12 md:px-16 py-6 md:py-8 rounded-2xl md:rounded-[32px] font-black uppercase tracking-widest text-base lg:text-lg hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(22,163,74,0.4)] active:scale-95 shrink-0 relative z-10 cursor-pointer hover:translate-y-[-4px]">
             Audit My Business Now
           </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
