
import React from 'react';

interface ComparisonTableProps {
  onBusinessClick: () => void;
  onAgencyClick: () => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ onBusinessClick, onAgencyClick }) => {
  return (
    <section id="comparison" className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-4">
          <h2 className="text-[#16A34A] font-black text-[10px] uppercase tracking-[0.4em]">Decision Intel</h2>
          <h3 className="text-4xl md:text-7xl font-black text-slate-900 leading-none uppercase italic tracking-tighter">
            Manual Effort vs <br /> <span className="text-[#16A34A]">GSR Intelligence.</span>
          </h3>
          <p className="text-slate-500 text-lg font-bold max-w-xl mx-auto">
            Why leave your rankings to chance? See how our automation stack outpaces traditional management.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="bg-slate-50 rounded-[48px] p-10 md:p-14 border border-slate-100 flex flex-col relative group">
               <div className="absolute top-10 right-10 text-4xl opacity-20 grayscale group-hover:grayscale-0 transition-all">🐌</div>
               <div className="space-y-2 mb-12">
                  <h4 className="text-2xl font-black text-slate-400 uppercase italic">The Manual Way</h4>
                  <p className="text-slate-400 text-sm font-bold">Chasing reviews & slow growth.</p>
               </div>
               <ul className="space-y-6 flex-grow">
                 {[
                   'Asking customers verbally (low conversion)',
                   'Delayed email follow-ups',
                   'Inconsistent profile updates',
                   'Manual, often delayed replies',
                   'Guessing which keywords help ranking',
                   'Reactive management of bad feedback'
                 ].map(item => (
                   <li key={item} className="flex items-start gap-4 text-sm font-bold text-slate-400">
                     <span className="text-rose-400 text-lg leading-none mt-1">✕</span>
                     {item}
                   </li>
                 ))}
               </ul>
            </div>

            {/* The GSR Way */}
            <div className="bg-[#0F172A] rounded-[48px] p-10 md:p-14 border-b-8 border-[#16A34A] flex flex-col relative shadow-2xl scale-105 z-10 group">
               <div className="absolute top-10 right-10 text-4xl group-hover:scale-110 transition-transform">⚡</div>
               <div className="space-y-2 mb-12">
                  <h4 className="text-2xl font-black text-white uppercase italic">The GSR Way</h4>
                  <p className="text-[#16A34A] text-sm font-black uppercase tracking-widest">AI-Driven Domination</p>
               </div>
               <ul className="space-y-6 flex-grow">
                 {[
                   'SMS Requests sent instantly at checkout',
                   'Verified 14.2% higher review conversion',
                   'Weekly automated GBP media publishing',
                   'AI Smart Compose tailored to your voice',
                   'Deep diagnostic audit tools built-in',
                   'Proactive "Unhappy Filter" feedback loops'
                 ].map(item => (
                   <li key={item} className="flex items-start gap-4 text-sm font-black text-white">
                     <span className="text-[#16A34A] text-lg leading-none mt-1">✓</span>
                     {item}
                   </li>
                 ))}
               </ul>
               <div className="pt-12">
                 <button 
                  onClick={onBusinessClick}
                  className="w-full bg-[#16A34A] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl active:scale-95"
                 >
                   Upgrade My Business
                 </button>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Are you a Marketing Agency?</p>
           <button onClick={onAgencyClick} className="text-[#16A34A] font-black uppercase text-xs tracking-widest border-b-2 border-[#16A34A] pb-1 hover:text-slate-900 hover:border-slate-900 transition-all cursor-pointer">Launch White-Label Reseller Portal →</button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
