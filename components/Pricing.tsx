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
      features: ["1 Business Location", "50 Requests /mo", "Google & FB Sync", "Review Widget", "SEO Dashboard"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "GROWTH",
      monthlyPrice: 49,
      description: "The sweet spot for established local businesses scaling up.",
      features: ["Up to 3 Locations", "500 Requests /mo", "SMS Enabled", "AI Auto-Response", "GBP Media Hub", "QR Kit Creator"],
      cta: "START FREE TRIAL",
      popular: true,
      path: 'business'
    },
    {
      name: "PROFESSIONAL",
      monthlyPrice: 99,
      description: "Complete power-tools for high-volume franchises.",
      features: ["Unlimited Locations", "Unlimited Requests", "Advanced AI Voice", "Competitor Audit", "API Access", "Priority Support"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "WHITE LABEL AGENCY",
      monthlyPrice: 250,
      description: "The complete reseller engine for marketing firms.",
      features: ["Unlimited Clients", "Full White Labeling", "Custom CNAME", "Agency Dashboard", "Client Success Kit", "Bulk Billing"],
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
    <section id="pricing" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-6 md:space-y-8">
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Investment <span className="text-[#16A34A]">Plans.</span></h2>
          <p className="text-slate-500 text-sm md:text-lg font-bold max-w-xl mx-auto">Predictable monthly costs with zero hidden fees and a 14-day free trial.</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 md:gap-6">
             <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
             <button 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 md:w-16 h-6 md:h-8 bg-slate-100 rounded-full p-1 relative transition-all border border-slate-200"
             >
                <div className={`w-4 md:w-6 h-4 md:h-6 bg-[#16A34A] rounded-full shadow-lg transition-all transform ${billingCycle === 'annual' ? 'translate-x-6 md:translate-x-8' : 'translate-x-0'}`} />
             </button>
             <div className="flex items-center gap-2">
                <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-400'}`}>Annual</span>
                <span className="bg-emerald-100 text-emerald-600 text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full">SAVE 20%</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 md:p-10 rounded-[32px] md:rounded-[48px] flex flex-col transition-all duration-500 ${
                tier.popular 
                ? 'bg-white border-2 border-[#16A34A] shadow-2xl scale-100 lg:scale-105 z-10' 
                : tier.path === 'agency' 
                  ? 'bg-[#0F172A] border-none text-white' 
                  : 'bg-[#F8FAFC] border-none shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#16A34A] text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              
              <div className="mb-6 md:mb-10">
                <h3 className={`text-lg md:text-xl font-black uppercase tracking-tighter mb-2 md:mb-4 ${tier.path === 'agency' ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-4 md:mb-6">
                  <span className={`text-4xl md:text-6xl font-black tracking-tighter ${tier.path === 'agency' ? 'text-[#16A34A]' : 'text-slate-900'}`}>{getPrice(tier.monthlyPrice)}</span>
                  <span className="text-slate-500 ml-1 font-bold text-base md:text-lg">/mo</span>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed font-medium min-h-0 md:min-h-[48px] ${tier.path === 'agency' ? 'text-slate-400' : 'text-slate-600'}`}>{tier.description}</p>
              </div>

              <div className={`h-px w-full mb-6 md:mb-10 ${tier.path === 'agency' ? 'bg-white/10' : 'bg-slate-200'}`} />

              <ul className="space-y-3 md:space-y-5 mb-8 md:mb-12 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start text-xs md:text-[13px] font-bold ${tier.path === 'agency' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 shrink-0 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={tier.path === 'agency' ? onStartAgency : onStartBusiness}
                className={`w-full py-4 md:py-5 rounded-[18px] md:rounded-[24px] font-black uppercase text-[10px] md:text-xs tracking-widest transition-all active:scale-95 shadow-xl cursor-pointer ${
                  tier.path === 'agency'
                  ? 'bg-white text-black hover:bg-[#16A34A] hover:text-white'
                  : tier.popular 
                    ? 'bg-[#16A34A] text-white hover:bg-black shadow-[#16A34A]/20' 
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
