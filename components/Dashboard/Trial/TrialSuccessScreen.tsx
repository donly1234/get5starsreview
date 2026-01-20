import React from 'react';
import Logo from '../../Logo.tsx';

interface TrialSuccessScreenProps {
  onProceed: () => void;
  businessName: string;
}

const TrialSuccessScreen: React.FC<TrialSuccessScreenProps> = ({ onProceed, businessName }) => {
  return (
    <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 py-12">
      <div className="flex justify-center mb-4">
        <Logo variant="full" className="scale-110" />
      </div>
      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-5xl shadow-sm animate-bounce">
        ✨
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic">
          Success, {businessName}!
        </h2>
        <p className="text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
          Your 14-day free trial is now active. We've initialized your dashboard and you're ready to start ranking #1 on Google Maps.
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 max-w-sm mx-auto space-y-4">
        <div className="flex items-center gap-3 text-left">
           <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-xs font-bold shadow-lg">1</div>
           <p className="text-xs font-bold text-slate-700">Connect your Google Business Profile</p>
        </div>
        <div className="flex items-center gap-3 text-left">
           <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-lg flex items-center justify-center text-xs font-bold">2</div>
           <p className="text-xs font-bold text-slate-400">Send your first 5 review requests</p>
        </div>
      </div>

      <button 
        onClick={onProceed}
        className="w-full max-w-sm bg-slate-950 text-white py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-green-600 transition-all active:scale-95 uppercase tracking-widest"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default TrialSuccessScreen;