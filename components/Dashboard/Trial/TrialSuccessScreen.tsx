
import React from 'react';

interface TrialSuccessScreenProps {
  onProceed: () => void;
  businessName: string;
}

const TrialSuccessScreen: React.FC<TrialSuccessScreenProps> = ({ onProceed, businessName }) => {
  const inclusions = [
    '20 Review Requests',
    '1 Platform Connection',
    'Manual Review Replies',
    'Basic Analytics',
    'Badge Widget'
  ];

  const steps = [
    { title: 'Connect Your Platform', desc: 'Sync Google Business or Facebook to import your reviews.', icon: '🔌' },
    { title: 'Send Your First Request', desc: 'Add a customer and send a request via SMS or Email.', icon: '📱' },
    { title: 'Install Your Widget', desc: 'Show off your 5-star rating on your website instantly.', icon: '🎨' },
  ];

  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 py-4 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-[28px] flex items-center justify-center mx-auto text-4xl shadow-xl shadow-emerald-500/10 animate-bounce">🎉</div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">Welcome to Get5StarsReview, <br/><span className="text-emerald-600">{businessName}</span></h2>
        <p className="text-slate-500 text-lg">Your 14-day free trial starts now! <strong>No credit card required.</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 space-y-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">What's Included</h4>
          <ul className="space-y-3">
            {inclusions.map(item => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">✓</div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-600 rounded-[32px] p-8 text-white space-y-6 shadow-xl shadow-blue-900/20">
          <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.2em]">Quick Start Guide</h4>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center text-xs font-black shrink-0">{i+1}</span>
                <div>
                  <h5 className="font-bold text-sm">{step.title}</h5>
                  <p className="text-blue-100 text-[11px] leading-relaxed opacity-80">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 pt-4">
        <button 
          onClick={onProceed}
          className="flex-1 bg-slate-900 text-white py-5 rounded-[24px] font-black text-lg shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          Go to Dashboard
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
        </button>
        <button className="px-8 py-5 rounded-[24px] border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all">
          Watch Tutorials
        </button>
      </div>

      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Support: help@get5starsreview.com • Online 24/7</p>
    </div>
  );
};

export default TrialSuccessScreen;
