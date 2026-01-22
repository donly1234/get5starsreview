import React from 'react';
import Logo from './Logo';

interface AboutViewProps {
  onBack: () => void;
  onStart: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack, onStart }) => {
  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-slate-400 hover:text-green-600 font-black uppercase text-[10px] tracking-[0.3em] transition-all group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          Back to Home
        </button>

        <header className="space-y-8 mb-24 text-center md:text-left">
          <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Our Story & Mission</span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
            Building trust in a <span className="text-emerald-600">Digital-First</span> world.
          </h1>
          <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed">
            Get5StarsReview is an AI-powered reputation management platform dedicated to helping local businesses rank #1 on Google Maps and build undeniable social proof.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-center">
           <div className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight">The Bridge Between Continents.</h2>
              <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed font-medium">
                <p>Founded in 2023, Get5StarsReview was born from a simple observation: local businesses provide incredible value, but they are often outranked by competitors with inferior services simply because of technical SEO advantages.</p>
                <p>Our dual-operational model is our greatest strength. With our executive leadership headquartered in <strong>Richmond, Kentucky, USA</strong>, and our high-speed technical operations hub in <strong>Harare, Zimbabwe</strong>, we provide a 24/7 global service engine that never sleeps.</p>
                <p>This "Bridge of Expertise" allows us to combine Western market intelligence with world-class technical engineering from one of Africa's fastest-growing tech hubs.</p>
              </div>
           </div>
           <div className="bg-slate-900 rounded-[64px] p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-12">
                 <div>
                    <p className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-2">North America HQ</p>
                    <p className="text-2xl font-bold">Richmond, Kentucky</p>
                    <p className="text-slate-400 mt-1">Strategic Direction & Client Success</p>
                 </div>
                 <div>
                    <p className="text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-2">Global Operations Hub</p>
                    <p className="text-2xl font-bold">Harare, Zimbabwe</p>
                    <p className="text-slate-400 mt-1">AI Engineering & Data Analysis</p>
                 </div>
                 <div className="pt-8 border-t border-white/10">
                    <p className="text-4xl font-black italic">24/7</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Uptime Support</p>
                 </div>
              </div>
              <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-emerald-600/10 blur-[120px] rounded-full"></div>
           </div>
        </div>

        <section className="bg-slate-50 rounded-[64px] p-12 md:p-20 text-center space-y-12 mb-32 border border-slate-100">
           <div className="max-w-2xl mx-auto space-y-4">
              <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter">Our Core Values.</h3>
              <p className="text-slate-500 font-medium">The principles that drive every line of code and every customer response.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { h: "Integrity First", p: "We use 100% white-hat strategies approved by Google Developer terms.", i: "🛡️" },
                { h: "AI For Good", p: "We leverage Gemini intelligence to save humans time, not to replace them.", i: "🧠" },
                { h: "Local Empowerment", p: "We believe a bakery in Harare should have the same SEO power as one in NYC.", i: "🌍" }
              ].map(v => (
                <div key={v.h} className="space-y-4">
                   <div className="text-4xl">{v.i}</div>
                   <h4 className="text-xl font-black uppercase text-slate-900">{v.h}</h4>
                   <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.p}</p>
                </div>
              ))}
           </div>
        </section>

        <div className="text-center space-y-8">
           <Logo variant="full" className="scale-125 mb-8" />
           <h3 className="text-3xl font-black uppercase italic">Ready to join our mission?</h3>
           <button 
            onClick={onStart}
            className="bg-green-600 text-white px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl shadow-green-900/40 active:scale-95"
           >
             Start Your Free Trial
           </button>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
