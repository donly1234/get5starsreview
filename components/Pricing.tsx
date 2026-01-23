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
      description: "Automate your reputation with the essentials.",
      features: ["1 Business Location", "100 Requests /mo", "Google & FB Sync", "Basic AI Response", "Social Proof Widget"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "GROWTH",
      monthlyPrice: 49,
      description: "Scale your map dominance with SMS.",
      features: ["Up to 3 Locations", "500 Requests /mo", "SMS Enabled", "Pro AI Auto-Response", "GBP Media Hub", "QR Review Kit"],
      cta: "START FREE TRIAL",
      popular: true,
      path: 'business'
    },
    {
      name: "PROFESSIONAL",
      monthlyPrice: 99,
      description: "Enterprise tools for serious business growth.",
      features: ["Unlimited Locations", "Unlimited Requests", "Advanced AI Voice", "Competitor Audit", "Full API Access", "Account Manager"],
      cta: "START FREE TRIAL",
      popular: false,
      path: 'business'
    },
    {
      name: "AGENCY LICENSE",
      monthlyPrice: 250,
      description: "Resell 5-Star success under your own brand.",
      features: ["Unlimited Clients", "100% White Label", "Custom Domain", "Agency Reseller Dashboard", "Marketing Sales Kit", "Partner Support"],
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
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
          <span className="text-[#16A34A] font-black uppercase tracking-[0.4em] text-[11px]">Investment Plans</span>
          <h2 className="text-4xl md:text-7xl font-black text-[#0F172A] uppercase tracking-tighter italic leading-none">
            Ready to <span className="text-[#16A34A]">Dominate?</span>
          </h2>
          <p className="text-slate-500 text-lg font-bold">14-day risk-free trial on all business plans. Cancel anytime.</p>
          
          <div className="flex items-center justify-center gap-10 pt-4">
             <button onClick={() => setBillingCycle('monthly')} className={`text-sm font-black uppercase tracking-widest ${billingCycle === 'monthly' ? 'text-[#0F172A]' : 'text-slate-300'}`}>Monthly</button>
             <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')} className="w-16 h-8 bg-slate-100 rounded-full p-1 relative border-2 border-slate-100">
                <div className={`w-5 h-5 bg-[#16A34A] rounded-full shadow-lg transition-all transform duration-500 ${billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-0'}`} />
             </button>
             <div className="flex items-center gap-2">
                <button onClick={() => setBillingCycle('annual')} className={`text-sm font-black uppercase tracking-widest ${billingCycle === 'annual' ? 'text-[#0F172A]' : 'text-slate-300'}`}>Annual</button>
                <span className="bg-[#FACC15] text-[#0F172A] text-[9px] font-black px-2 py-1 rounded-full">-20% OFF</span>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-10 rounded-[48px] flex flex-col transition-all duration-700 hover:translate-y-[-12px] ${
                tier.popular 
                ? 'bg-white border-4 border-[#16A34A] shadow-2xl z-10 scale-105' 
                : tier.path === 'agency' 
                  ? 'bg-[#0F172A] text-white shadow-2xl' 
                  : 'bg-slate-50 border border-slate-100'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#16A34A] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-4 ${tier.path === 'agency' ? 'text-[#FACC15]' : 'text-[#0F172A]'}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-6xl font-black tracking-tighter">{getPrice(tier.monthlyPrice)}</span>
                  <span className="text-slate-400 ml-1 font-bold">/mo</span>
                </div>
                <p className={`text-sm leading-relaxed font-medium ${tier.path === 'agency' ? 'text-slate-400' : 'text-slate-500'}`}>{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-12 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-xs font-bold gap-3">
                    <span className="text-[#16A34A]">★</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={tier.path === 'agency' ? onStartAgency : onStartBusiness}
                className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-xl ${
                  tier.path === 'agency' ? 'bg-[#16A34A] text-white hover:bg-white hover:text-black' :
                  tier.popular ? 'bg-[#16A34A] text-white hover:bg-[#0F172A]' : 'bg-[#0F172A] text-white hover:bg-[#16A34A]'
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
