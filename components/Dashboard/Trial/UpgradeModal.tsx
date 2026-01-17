
import React from 'react';

interface UpgradeModalProps {
  feature: string;
  onClose: () => void;
  onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ feature, onClose, onUpgrade }) => {
  const isExpired = feature === 'Expired';
  
  const getFeatureDetails = () => {
    switch (feature) {
      case 'AI Assistant':
        return {
          title: 'AI Smart Response Assistant',
          desc: 'Unlock AI-powered sentiment analysis and automatic response generation based on your brand voice.',
          price: '$49/mo'
        };
      case 'Analytics':
        return {
          title: 'Advanced Reputation Analytics',
          desc: 'Get deep insights into customer sentiment, keyword clouds, and competitor benchmarking.',
          price: '$49/mo'
        };
      case 'Requests':
        return {
          title: 'Unlimited Review Requests',
          desc: 'Trial is limited to 20 requests. Professional plans offer 500+ requests with smart filtering.',
          price: '$49/mo'
        };
      default:
        return {
          title: 'Professional Plan',
          desc: 'Unlock all the premium tools needed to dominate your local market and automate social proof.',
          price: '$49/mo'
        };
    }
  };

  const details = getFeatureDetails();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl shadow-inner">
               {isExpired ? '🔒' : '⭐'}
             </div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tight">{isExpired ? 'Trial Expired' : details.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-lg text-slate-400 transition-all border border-transparent hover:border-slate-100 shadow-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-10 space-y-8">
          <div className="text-center space-y-3">
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {isExpired 
                ? "Your 30-day trial window has closed." 
                : details.desc}
            </p>
            <p className="text-slate-500 text-sm leading-relaxed px-4">
              Upgrade today to remove all limits and scale your reputation management effortlessly.
            </p>
          </div>

          <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50 space-y-6">
             <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] text-center">Professional Plan Benefits</h4>
             <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
               {[
                 'AI Smart Replies',
                 'SMS Requests',
                 'Competitor Insights',
                 'Custom Branding',
                 '3 Team Seats',
                 'Priority Support'
               ].map(benefit => (
                 <li key={benefit} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    {benefit}
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={onUpgrade}
              className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              Upgrade to Professional — {details.price}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </button>
            <button onClick={onClose} className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-[10px]">
              Continue with Trial Limitations
            </button>
          </div>
        </div>

        <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
             30-Day Money Back Guarantee • Encrypted Checkout
           </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
