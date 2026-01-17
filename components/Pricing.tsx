
import React from 'react';

interface PricingProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
}

const tiers = [
  {
    name: "Starter",
    price: "$25",
    description: "Ideal for small, single-location shops looking to automate trust.",
    features: ["1 Business Location", "20 Email Requests /mo", "100 SMS Requests /mo", "Google & Facebook Sync", "Standard Review Widget"],
    cta: "Start Free Trial",
    popular: false,
    path: 'business'
  },
  {
    name: "Professional",
    price: "$99",
    description: "The complete toolkit for growing service businesses.",
    features: ["Up to 3 Locations", "Unlimited Email Requests", "Unlimited SMS Requests", "GBP Image & Video Publishing", "AI Response Assistant", "Negative Feedback Filter", "Priority Support"],
    cta: "Start Free Trial",
    popular: true,
    path: 'business'
  },
  {
    name: "White Label Agency",
    price: "$250",
    description: "Fixed-price reseller solution for growing agencies.",
    features: ["Unlimited Clients", "Full White Labeling", "Custom CNAME/Domain", "Agency Command Center", "Marketing Materials", "Dedicated Support"],
    cta: "Activate Agency",
    popular: false,
    path: 'agency'
  }
];

const Pricing: React.FC<PricingProps> = ({ onStartBusiness, onStartAgency }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Built for scale, priced for <span className="text-green-600">success</span></h2>
          <p className="text-slate-600 text-lg">Predictable monthly costs with zero hidden fees.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-[40px] flex flex-col border transition-all duration-500 ${
                tier.popular 
                ? 'bg-white border-green-600 shadow-2xl scale-105 z-10' 
                : tier.path === 'agency' 
                  ? 'bg-slate-950 border-slate-800 text-white' 
                  : 'bg-slate-50 border-slate-100 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Recommended
                </div>
              )}
              {tier.path === 'agency' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black border border-slate-200 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Reseller Plan
                </div>
              )}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${tier.path === 'agency' ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className={`text-4xl font-black ${tier.path === 'agency' ? 'text-green-500' : 'text-slate-900'}`}>{tier.price}</span>
                  <span className="text-slate-500 ml-1">/mo</span>
                </div>
                <p className={`text-sm leading-relaxed ${tier.path === 'agency' ? 'text-slate-400' : 'text-slate-600'}`}>{tier.description}</p>
                {tier.path === 'agency' && (
                  <div className="mt-3 inline-block bg-white/10 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">Unlimited Clients • Fixed Fee</div>
                )}
                {tier.path === 'business' && (
                  <div className="mt-3 inline-block bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">14 Day Trial Included</div>
                )}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start text-sm font-bold ${tier.path === 'agency' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <svg className="w-5 h-5 mr-3 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => tier.path === 'agency' ? onStartAgency() : onStartBusiness()}
                className={`w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${
                  tier.path === 'agency'
                  ? 'bg-white text-black hover:bg-green-600 hover:text-white shadow-xl'
                  : tier.popular 
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-xl shadow-green-600/20' 
                    : 'bg-black text-white hover:bg-slate-800 shadow-xl shadow-black/10'
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
