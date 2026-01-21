
import React from 'react';

interface TemplatePreviewProps {
  templateId: string;
  config: {
    headline: string;
    subheadline: string;
    primaryColor: string;
  };
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ templateId, config }) => {
  const isDark = templateId === 't3';

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} font-sans`}>
      {/* Header */}
      <nav className="p-8 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black" style={{ backgroundColor: config.primaryColor }}>A</div>
           <span className="font-black uppercase tracking-tighter">Your Agency</span>
        </div>
        <div className="flex gap-6">
           <span className="text-[10px] font-black uppercase opacity-40">Features</span>
           <span className="text-[10px] font-black uppercase opacity-40">Pricing</span>
           <span className="text-[10px] font-black uppercase" style={{ color: config.primaryColor }}>Login</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 text-center max-w-4xl mx-auto space-y-8">
         <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight italic">
           {config.headline}
         </h1>
         <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
           {config.subheadline}
         </p>
         <div className="flex justify-center pt-4">
           <button 
            className="px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105"
            style={{ backgroundColor: config.primaryColor, boxShadow: `0 20px 40px ${config.primaryColor}33` }}
           >
             Start Ranking Free
           </button>
         </div>
      </section>

      {/* Social Proof Mock */}
      <section className="px-8 py-12">
         <div className={`max-w-5xl mx-auto rounded-[48px] p-12 flex flex-col md:flex-row items-center justify-between gap-8 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
            <div className="text-center md:text-left">
               <p className="text-3xl font-black italic uppercase">Rank #1 on Maps</p>
               <p className="text-xs font-bold opacity-50 mt-1 uppercase tracking-widest">Powered by AI Reputation Intelligence</p>
            </div>
            <div className="flex gap-10">
               <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: config.primaryColor }}>200%</p>
                  <p className="text-[8px] font-black uppercase opacity-40">Review Growth</p>
               </div>
               <div className="text-center">
                  <p className="text-2xl font-black" style={{ color: config.primaryColor }}>14 Days</p>
                  <p className="text-[8px] font-black uppercase opacity-40">Free Setup</p>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid Mock */}
      <section className="px-8 py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
         {[1,2,3].map(i => (
           <div key={i} className={`p-8 rounded-[32px] border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100'}`}>
              <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center text-xl" style={{ backgroundColor: `${config.primaryColor}22`, color: config.primaryColor }}>⚡</div>
              <h4 className="font-black uppercase tracking-tight text-sm mb-2">Automated Response</h4>
              <p className="text-xs font-medium opacity-50 leading-relaxed">Let AI handle your customer engagement while you focus on scaling your store.</p>
           </div>
         ))}
      </section>

      <footer className="p-12 text-center border-t border-white/10 mt-20">
         <p className="text-[10px] font-black uppercase tracking-widest opacity-20">© 2025 Your White-Label Agency Name</p>
      </footer>
    </div>
  );
};

export default TemplatePreview;
