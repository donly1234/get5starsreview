import React, { useState } from 'react';

interface ROICalculatorProps {
  onStart: () => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ onStart }) => {
  const [customers, setCustomers] = useState(100);
  const [rating, setRating] = useState(3.5);
  const [avgTicket, setAvgTicket] = useState(50);

  // Business logic: Research shows that every 0.1 star increase can boost conversion by ~1.5-2%
  const ratingLift = Math.max(0, (4.8 - rating) * 0.18); 
  const estimatedNewRevenue = customers * avgTicket * ratingLift;
  const yearlyImpact = estimatedNewRevenue * 12;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-slate-950 rounded-[64px] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl border-b-8 border-emerald-500">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-emerald-500 font-black uppercase tracking-[0.3em] text-[10px]">Sales Performance Audit</span>
                <h3 className="text-4xl md:text-6xl font-black leading-none uppercase italic tracking-tighter">
                  Calculate Your <br /> <span className="text-emerald-500">Untapped Profit</span>.
                </h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                  In local search, reviews aren't just vanity—they are <span className="text-white font-bold">sales triggers</span>. See exactly how much more you could be making with a 4.8-star reputation.
                </p>
              </div>

              <div className="space-y-8 max-w-md">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Monthly Leads</span>
                    <span className="text-xl font-black text-white">{customers}</span>
                  </div>
                  <input 
                    type="range" min="10" max="1000" step="10" value={customers}
                    onChange={(e) => setCustomers(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Google Rating</span>
                    <div className="flex items-center gap-2">
                       <span className="text-yellow-400 text-sm">★</span>
                       <span className="text-xl font-black text-white">{rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <input 
                    type="range" min="1.0" max="4.7" step="0.1" value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Avg. Order Value</span>
                    <span className="text-xl font-black text-white">${avgTicket}</span>
                  </div>
                  <input 
                    type="range" min="5" max="500" step="5" value={avgTicket}
                    onChange={(e) => setAvgTicket(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[48px] text-center space-y-10 relative group hover:bg-white/[0.08] transition-all shadow-inner">
               <div className="space-y-2">
                  <p className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.25em]">Projected Monthly Revenue Boost</p>
                  <div className="text-6xl md:text-8xl font-black text-white tracking-tighter italic drop-shadow-lg">
                    +${Math.round(estimatedNewRevenue).toLocaleString()}
                  </div>
               </div>

               <div className="h-px w-full bg-white/10"></div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="text-left space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Sales Impact</p>
                    <p className="text-2xl md:text-3xl font-black text-emerald-500">${Math.round(yearlyImpact).toLocaleString()}</p>
                  </div>
                  <div className="text-left space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Conversion Lift</p>
                    <p className="text-2xl md:text-3xl font-black text-blue-400">+{Math.round(ratingLift * 100)}%</p>
                  </div>
               </div>

               <button 
                onClick={onStart}
                className="w-full bg-emerald-600 text-white py-6 rounded-[28px] font-black text-lg shadow-2xl shadow-emerald-900/40 hover:bg-white hover:text-black transition-all active:scale-95 uppercase tracking-widest"
               >
                 Capture This Revenue Now
               </button>
               
               <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                  <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Validated by 2025 Local Consumer Sentiment Models
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
