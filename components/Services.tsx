
import React from 'react';

interface ServicesProps {
  onAuditClick: () => void;
}

const services = [
  {
    title: "Review Automation",
    description: "Hands-off collection of 5-star reviews via SMS and Email triggered by your point of sale.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    )
  },
  {
    title: "GBP Optimization",
    description: "Expert Google Business Profile management to ensure you rank at the top of local search.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    )
  },
  {
    title: "Reputation Monitoring",
    description: "Real-time alerts for every review across Google, Facebook, Yelp, and more.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
    )
  },
  {
    title: "AI Response Managed",
    description: "AI-generated responses tailored to your brand voice to engage customers instantly.",
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    )
  }
];

const Services: React.FC<ServicesProps> = ({ onAuditClick }) => {
  return (
    <section id="services" className="py-24 bg-slate-50 scroll-mt-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-green-600 font-black uppercase tracking-widest text-xs mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-6xl font-black text-black leading-none uppercase tracking-tighter">
              Full Spectrum <br /> Reputation <span className="text-green-600 underline decoration-black underline-offset-8">Growth</span>
            </h3>
          </div>
          <div className="text-right">
             <p className="text-slate-500 font-bold max-w-sm mb-2">
              More than just a tool, we are your partner in digital credibility. We handle the tech so you can handle the customers.
            </p>
            <button onClick={onAuditClick} className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline">Launch Diagnostic Audit →</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-green-600 transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h4 className="text-xl font-black text-black mb-3 uppercase tracking-tighter">{s.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Banner for Audit Tool */}
        <div className="mt-12 bg-blue-600 rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
           <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 px-3 py-1 rounded-full">New Feature</span>
              <h4 className="text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none italic">
                GBP Competitor <br /> Intelligence Audit
              </h4>
              <p className="text-blue-100 font-medium max-w-md">Discover exactly where your competitors are outperforming you in local search results.</p>
           </div>
           <button onClick={onAuditClick} className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all shadow-xl active:scale-95 shrink-0 relative z-10">
             Audit My Business
           </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
