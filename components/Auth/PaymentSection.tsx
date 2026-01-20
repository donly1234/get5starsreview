
import React, { useState } from 'react';

/**
 * 💳 YOUR STRIPE LINKS (Verified from your screenshot)
 */
const STRIPE_LINKS: Record<string, string> = {
  'starter': 'https://buy.stripe.com/7sYeVe3uofet47cfN75gc00',
  'professional': 'https://buy.stripe.com/8x2aEY0iceapgTYasN5gc01',
  'agency': 'https://buy.stripe.com/fZu8Wqc0UaYd6fk0Sd5gc02'
};

interface PaymentSectionProps {
  plan: any;
  cycle: 'monthly' | 'annual';
  onBack: () => void;
  onSuccess: () => void;
  theme?: 'emerald';
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ plan, cycle, onBack, onSuccess, theme = 'emerald' }) => {
  const [method, setMethod] = useState<'stripe' | 'card' | 'payoneer' | 'ecocash'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const accentClass = 'bg-emerald-600 shadow-emerald-500/20';
  const textClass = 'text-emerald-600';
  const ringClass = 'focus:ring-emerald-500/20';

  const price = cycle === 'annual' ? Math.floor(plan.price * 0.8) : plan.price;

  const handlePayment = () => {
    setIsProcessing(true);

    if (method === 'stripe' || method === 'card') {
      const planName = plan.name?.toLowerCase() || '';
      let planKey = 'starter';
      
      if (planName.includes('professional') || planName.includes('pro')) planKey = 'professional';
      if (planName.includes('agency') || planName.includes('white label')) planKey = 'agency';

      const stripeUrl = STRIPE_LINKS[planKey];

      if (stripeUrl) {
        // This takes the user to your Stripe Checkout page
        window.location.href = stripeUrl;
      } else {
        alert("Payment link error. Please contact support.");
        setIsProcessing(false);
      }
    } else {
      // Manual methods for local testing
      setTimeout(() => {
        setIsProcessing(false);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Checkout</h2>
          <p className="text-slate-500 mt-2 font-bold">Securely complete your subscription.</p>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: 'stripe', label: 'Stripe / Card', icon: '💳' },
              { id: 'payoneer', label: 'Payoneer', icon: '🅿️' },
              { id: 'ecocash', label: 'EcoCash', icon: '📱' },
            ].map(m => (
              <button 
                key={m.id}
                onClick={() => setMethod(m.id as any)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${method === m.id ? `border-emerald-600 bg-emerald-50/30 shadow-lg` : 'border-slate-100 hover:border-slate-200'}`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
          {method === 'stripe' && (
             <div className="text-center py-8 space-y-4">
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">S</div>
               <p className="text-sm font-black text-slate-900 uppercase">Redirecting to Secure Stripe Checkout</p>
               <div className="flex justify-center gap-4 pt-2 opacity-50 grayscale">
                 <img src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" className="h-4" alt="Visa" />
                 <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-ar21.svg" className="h-4" alt="Mastercard" />
               </div>
             </div>
          )}

          {method === 'payoneer' && (
             <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payoneer Email</span>
                  <input type="email" className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold" placeholder="payoneer@example.com" />
                </label>
             </div>
          )}

          {method === 'ecocash' && (
             <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                  <input type="tel" className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold" placeholder="077..." />
                </label>
             </div>
          )}

          <label className="flex items-center gap-3 p-2 cursor-pointer">
            <input type="checkbox" className={`w-5 h-5 rounded border-slate-300 ${textClass} focus:ring-0`} defaultChecked />
            <span className="text-[11px] text-slate-600 font-bold leading-relaxed">I agree to the terms and authorize the subscription of ${price}/mo.</span>
          </label>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 sticky top-8 shadow-2xl border-b-4 border-emerald-600">
          <h3 className="text-xl font-black uppercase tracking-tighter italic">Summary</h3>
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">{plan.name}</span>
              <span className="font-black text-emerald-400">${price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Cycle</span>
              <span className="font-bold capitalize">{cycle}</span>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-lg font-bold">Total Due</span>
            <span className="text-3xl font-black text-emerald-400">${price}</span>
          </div>
          <button 
            disabled={isProcessing}
            onClick={handlePayment}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${accentClass} hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center uppercase`}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              method === 'stripe' ? 'Pay with Stripe' : 'Complete Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
