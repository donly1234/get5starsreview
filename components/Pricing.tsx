import React, { useState } from 'react';

interface PricingProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onStartBusiness, onStartAgency }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const tiers = [
    {
      name: "STARTER",
      monthlyPrice: 25,
      description: "Ideal for single-location shops looking to automate trust.",
      features: ["1 Business Location", "50 Requests /mo", "Google & FB Sync", "Review Widget", "Basic SEO Dashboard"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "GROWTH",
      monthlyPrice: 49,
      description: "The sweet spot for established local businesses scaling up.",
      features: ["Up to 3 Locations", "500 Requests /mo", "SMS Enabled", "AI Auto-Response", "GBP Media Hub", "Professional QR Kit"],
      cta: "START FREE TRIAL",
      popular: true,
      path: 'business'
    },
    {
      name: "PROFESSIONAL",
      monthlyPrice: 99,
      description: "Complete power-tools for high-volume local franchises.",
      features: ["Unlimited Locations", "Unlimited Requests", "Advanced AI Voice", "Competitor Audit", "API Access", "Priority Support"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "WHITE LABEL AGENCY",
      monthlyPrice: 250,
      description: "The complete reseller engine for marketing firms.",
      features: ["Unlimited Clients", "100% White Labeling", "Custom CNAME/Domain", "Agency Dashboard", "Sales Growth Kit", "Bulk Reseller Billing"],
      cta: "ACTIVATE AGENCY",
      popular: false,
      path: 'agency'
    }
  ];

  const getPrice = (monthly: number) => {
    if (billingCycle === 'monthly') return `$${monthly}`;
    const discounted = Math.floor(monthly * 0.8);
    return `$${discounted}`;
  };

  return (
    <section id="pricing" className="py-24 md:py-40 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-[1440px]">
        <div className="text-center max-w-4xl mx-auto mb-20 md:mb-28 space-y-8">
          <span className="text-[#16A34A] font-black uppercase tracking-[0.4em] text-[11px]">Investment Options</span>
          <h2 className="text-4xl md:text-7xl lg:text-[80px] font-black text-slate-900 uppercase tracking-tighter italic leading-none">
            Scale Your <span className="text-[#16A34A]">Authority.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-xl font-bold max-w-2xl mx-auto">Predictable monthly costs with zero hidden fees and a 14-day free trial on all business plans.</p>
          
          {/* Billing Toggle Desktop Refined */}
          <div className="flex items-center justify-center gap-6 md:gap-10 pt-4">
             <button 
              onClick={() => setBillingCycle('monthly')}
              className={`text-sm font-black uppercase tracking-[0.2em] transition-all ${billingCycle === 'monthly' ? 'text-slate-950 scale-110' : 'text-slate-300 hover:text-slate-500'}`}
             >
               Monthly
             </button>
             <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-20 h-10 bg-slate-100 rounded-full p-1.5 relative transition-all border-2 border-slate-100 shadow-inner group"
             >
                <div className={`w-6 h-6 bg-[#16A34A] rounded-full shadow-lg transition-all transform duration-500 ${billingCycle === 'annual' ? 'translate-x-10' : 'translate-x-0'} group-hover:scale-110`} />
             </button>
             <div className="flex items-center gap-3">
                <button 
                  onClick={() => setBillingCycle('annual')}
                  className={`text-sm font-black uppercase tracking-[0.2em] transition-all ${billingCycle === 'annual' ? 'text-slate-950 scale-110' : 'text-slate-300 hover:text-slate-500'}`}
                >
                  Annual
                </button>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-[0_10px_20px_rgba(22,163,74,0.3)] animate-pulse">SAVE 20%</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 md:p-12 rounded-[48px] flex flex-col transition-all duration-700 hover:translate-y-[-16px] ${
                tier.popular 
                ? 'bg-white border-2 border-[#16A34A] shadow-[0_50px_100px_-20px_rgba(22,163,74,0.15)] z-10 scale-100 lg:scale-[1.05]' 
                : tier.path === 'agency' 
                  ? 'bg-[#0F172A] border-none text-white shadow-2xl' 
                  : 'bg-[#F8FAFC] border border-slate-100 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#16A34A] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(22,163,74,0.4)] whitespace-nowrap">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-10 md:mb-14">
                <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tighter mb-6 ${tier.path === 'agency' ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className={`text-5xl md:text-7xl font-black tracking-tighter ${tier.path === 'agency' ? 'text-[#16A34A]' : 'text-slate-900'}`}>{getPrice(tier.monthlyPrice)}</span>
                  <span className="text-slate-400 ml-2 font-bold text-lg">/month</span>
                </div>
                <p className={`text-sm md:text-base leading-relaxed font-medium min-h-[60px] ${tier.path === 'agency' ? 'text-slate-400' : 'text-slate-600'}`}>{tier.description}</p>
              </div>

              <div className={`h-px w-full mb-10 md:mb-14 ${tier.path === 'agency' ? 'bg-white/10' : 'bg-slate-200'}`} />

              <ul className="space-y-4 md:space-y-6 mb-12 md:mb-16 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start text-sm md:text-base font-bold ${tier.path === 'agency' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4 shrink-0 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={tier.path === 'agency' ? onStartAgency : onStartBusiness}
                className={`w-full py-6 md:py-8 rounded-[24px] md:rounded-[32px] font-black uppercase text-xs md:text-sm tracking-[0.2em] transition-all active:scale-95 shadow-2xl cursor-pointer ${
                  tier.path === 'agency'
                  ? 'bg-[#16A34A] text-white hover:bg-white hover:text-black'
                  : tier.popular 
                    ? 'bg-[#16A34A] text-white hover:bg-black shadow-emerald-500/20' 
                    : 'bg-black text-white hover:bg-[#16A34A] shadow-black/10'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
