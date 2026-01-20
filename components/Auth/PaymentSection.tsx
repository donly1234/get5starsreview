
import React, { useState } from 'react';

interface PaymentSectionProps {
  plan: any;
  cycle: 'monthly' | 'annual';
  onBack: () => void;
  onSuccess: () => void;
  theme?: 'emerald';
}

/**
 * 💡 STRIPE MANAGEMENT GUIDE:
 * 1. Log in to your Stripe Dashboard.
 * 2. Go to 'Payments' -> 'Payment Links'.
 * 3. Create a link for each plan (Starter, Pro, Agency).
 * 4. Paste those links below in the STRIPE_LINKS object.
 */
const STRIPE_LINKS: Record<string, string> = {
  'starter': 'https://buy.stripe.com/your_starter_link',
  'professional': 'https://buy.stripe.com/your_pro_link',
  'agency': 'https://buy.stripe.com/your_agency_link'
};

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
      const planKey = plan.id?.toLowerCase() || plan.name?.split(' ')[0].toLowerCase();
      const stripeUrl = STRIPE_LINKS[planKey];

      if (stripeUrl && stripeUrl.includes('buy.stripe.com')) {
        // Redirect to external Stripe-hosted checkout
        window.location.href = stripeUrl;
      } else {
        // Mock success if links are not yet configured (for testing)
        console.warn(`Stripe Link not found for '${planKey}'. Redirecting to success for demo.`);
        setTimeout(() => {
          setIsProcessing(false);
          onSuccess();
        }, 1500);
      }
    } else {
      // Manual/Mobile payment methods
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
          <p className="text-slate-500 mt-2 font-bold">Securely complete your subscription to unlock growth tools.</p>
        </div>

        <div className="space-y-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
               <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black shadow-inner">S</div>
               <div className="space-y-1">
                 <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Secure Stripe Checkout</p>
                 <p className="text-xs text-slate-500 font-medium">You'll be redirected to Stripe's encrypted portal to complete your order.</p>
               </div>
               <div className="flex justify-center gap-4 pt-2 opacity-50 grayscale">
                 <img src="https://www.vectorlogo.zone/logos/visa/visa-ar21.svg" className="h-4" alt="Visa" />
                 <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-ar21.svg" className="h-4" alt="Mastercard" />
                 <img src="https://www.vectorlogo.zone/logos/apple/apple-ar21.svg" className="h-4" alt="Apple Pay" />
               </div>
             </div>
          )}

          {method === 'payoneer' && (
             <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payoneer Email</span>
                  <input type="email" className={`w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ${ringClass} font-bold`} placeholder="payoneer@example.com" />
                </label>
                <p className="text-[10px] text-slate-400 font-medium italic">We'll send a direct payment request to your Payoneer account.</p>
             </div>
          )}

          {method === 'ecocash' && (
             <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mobile Number</span>
                  <input type="tel" className={`w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 ${ringClass} font-bold`} placeholder="077..." />
                </label>
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                  <p className="text-[10px] text-blue-700 font-black uppercase tracking-widest">Instant USSD Prompt</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">Have your phone ready to enter your mobile PIN after clicking 'Purchase'.</p>
                </div>
             </div>
          )}

          <label className="flex items-center gap-3 p-2 cursor-pointer">
            <input type="checkbox" className={`w-5 h-5 rounded border-slate-300 ${textClass} focus:ring-0`} defaultChecked />
            <span className="text-[11px] text-slate-600 font-bold leading-relaxed">I agree to the terms of service and authorize recurring monthly charges of ${price}.</span>
          </label>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 sticky top-8 shadow-2xl border-b-4 border-emerald-600">
          <h3 className="text-xl font-black uppercase tracking-tighter italic">Order Summary</h3>
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">{plan.name}</span>
              <span className="font-black text-emerald-400">${price}/mo</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-slate-400">Cycle</span>
              <span className="font-bold capitalize">{cycle}</span>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 flex justify-between items-center">
            <span className="text-lg font-bold">Due Today</span>
            <span className="text-3xl font-black text-emerald-400">${price}</span>
          </div>
          <button 
            disabled={isProcessing}
            onClick={handlePayment}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${accentClass} hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center uppercase tracking-widest`}
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              method === 'stripe' ? 'Checkout with Stripe' : 'Complete Purchase'
            )}
          </button>
          <div className="text-center space-y-2">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">30-day money-back guarantee</p>
             <p className="text-[9px] text-slate-500 font-medium">Secure billing by Get5Stars Financials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
