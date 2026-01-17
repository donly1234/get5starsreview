
import React from 'react';

interface BillingSettingsProps {
  isTrial?: boolean;
}

const BillingSettings: React.FC<BillingSettingsProps> = ({ isTrial = false }) => {
  const trialFeatures = [
    '20 Email Requests',
    '100 SMS Requests',
    '1 Platform Connection',
    'Manual Review Replies',
    'Basic Analytics',
    'Badge Widget Enabled'
  ];

  const proFeatures = [
    'Unlimited Email Requests',
    'Unlimited SMS Requests',
    'GBP Image & Video Publishing',
    'AI Assistant Enabled',
    'Priority Support',
    'Custom Branding'
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Plan</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${isTrial ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>
                {isTrial ? 'Free Trial' : 'Pro Member'}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{isTrial ? 'Trial Window' : 'Professional'}</h3>
            <p className="text-slate-500 text-sm">{isTrial ? '14 Days Total • 2 Days Remaining' : '$99 / month • Renews Oct 24, 2025'}</p>
            
            <div className="pt-4 space-y-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Included Features:</p>
              {(isTrial ? trialFeatures : proFeatures).map(feature => (
                <div key={feature} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8">
            <button className="w-full bg-[#16A34A] text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-green-500/20 uppercase tracking-widest text-xs">
              {isTrial ? 'Upgrade for full access' : 'Change Plan'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 space-y-8">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Usage</h4>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-slate-700">Email Requests</span>
                <span className="text-slate-900">{isTrial ? '14 / 20' : '3,482 / Unlimited'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className={`${isTrial ? 'bg-amber-500' : 'bg-blue-600'} h-full transition-all duration-1000`} style={{ width: isTrial ? '70%' : '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-slate-700">SMS Requests</span>
                <span className="text-slate-900">{isTrial ? '0 / 100' : '842 / Unlimited'}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div className={`${isTrial ? 'bg-slate-200' : 'bg-blue-600'} h-full transition-all duration-1000`} style={{ width: isTrial ? '0%' : '100%' }}></div>
              </div>
            </div>
            {isTrial && (
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-xs text-blue-800 font-bold leading-relaxed">
                  Trial Tip: Connect 3+ platforms to see your aggregate reputation score. Pro plan users have an average rating 15% higher.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!isTrial && (
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Payment History</h3>
          </div>
          <div className="p-8 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Invoice #GSR-2025-00{i}</p>
                    <p className="text-xs text-slate-400">Paid on Oct {24 - i}, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">$99.00</p>
                  <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Download PDF</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSettings;
