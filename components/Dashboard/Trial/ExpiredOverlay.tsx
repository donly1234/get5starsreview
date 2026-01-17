
import React from 'react';

interface ExpiredOverlayProps {
  onUpgrade: () => void;
}

const ExpiredOverlay: React.FC<ExpiredOverlayProps> = ({ onUpgrade }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col md:flex-row border-4 border-white">
        {/* Left Side: Branding & Info */}
        <div className="bg-slate-50 p-12 md:w-2/5 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-[24px] flex items-center justify-center text-3xl mb-8">🔒</div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Your 30-Day Trial Has Ended</h2>
            <p className="text-slate-500 mt-6 text-lg leading-relaxed">Choose a plan to restore access to your data and continue automating your reputation growth.</p>
          </div>
          <div className="pt-12">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Data Retention Policy</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">We'll save your data for 30 more days. You can upgrade anytime or export to CSV.</p>
          </div>
        </div>

        {/* Right Side: Plan Selection */}
        <div className="p-12 flex-1 bg-white">
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: 'Starter', price: '$25', features: '100 requests, basic widgets', btn: 'Select Starter' },
              { name: 'Professional', price: '$49', features: '500 requests, AI Assistant', btn: 'Select Professional', popular: true },
              { name: 'Enterprise', price: '$99', features: 'Unlimited, White-label', btn: 'Select Enterprise' }
            ].map(plan => (
              <div key={plan.name} className={`p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${plan.popular ? 'border-blue-600 bg-blue-50/20' : 'border-slate-100 hover:border-slate-200'}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black text-slate-900">{plan.name}</h4>
                    {plan.popular && <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 bg-blue-600 text-white rounded">Recommended</span>}
                  </div>
                  <p className="text-xs text-slate-500 font-bold mt-1">{plan.features}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-3">
                   <p className="text-2xl font-black text-slate-900">{plan.price}<span className="text-xs text-slate-400 font-bold">/mo</span></p>
                   <button onClick={onUpgrade} className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${plan.popular ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-white'}`}>{plan.btn}</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-center gap-8">
             <button className="text-sm font-bold text-slate-400 hover:text-slate-600">Export Trial Data (CSV)</button>
             <button className="text-sm font-bold text-slate-400 hover:text-slate-600">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpiredOverlay;
