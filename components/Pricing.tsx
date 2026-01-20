
import React from 'react';

interface PricingProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
}

const tiers = [
  {
    name: "Starter",
    price: "$25",
    description: "Ideal for single-location shops looking to automate trust.",
    features: ["1 Business Location", "50 Email Requests /mo", "Google & Facebook Sync", "Standard Review Widget", "Core SEO Dashboard"],
    cta: "Start Free Trial",
    popular: false,
    path: 'business'
  },
  {
    name: "Growth",
    price: "$49",
    description: "The sweet spot for established local businesses scaling up.",
    features: ["Up to 3 Locations", "500 Review Requests /mo", "SMS Requests Enabled", "AI Auto-Response Core", "GBP Media Management", "Review QR Kit Creator"],
    cta: "Start Free Trial",
    popular: true,
    path: 'business'
  },
  {
    name: "Professional",
    price: "$99",
    description: "Complete power-tools for high-volume franchises.",
    features: ["Unlimited Locations", "Unlimited Review Requests", "Advanced AI Brand Voice", "Competitor Sentiment Audit", "Custom API Access", "Priority 1-on-1 Support"],
    cta: "Start Free Trial",
    popular: false,
    path: 'business'
  },
  {
    name: "White Label Agency",
    price: "$250",
    description: "The complete reseller engine for marketing firms.",
    features: ["Unlimited Clients", "Full White Labeling", "Custom CNAME/Domain", "Agency Reseller Dashboard", "Client Success Kit", "Bulk Billing Manager"],
    cta: "Activate Agency",
    popular: false,
    path: 'agency'
  }
];

const Pricing: React.FC<PricingProps> = ({ onStartBusiness, onStartAgency }) => {
  return (
    <section id="pricing" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <span className="text-emerald-600 font-black uppercase text-xs tracking-[0.3em]">Transparent Pricing</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Built for scale, <br />priced for <span className="text-emerald-600">growth.</span></h2>
          <p className="text-slate-500 text-lg font-medium">Predictable monthly costs with zero hidden fees and a 14-day free trial.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-[40px] flex flex-col border transition-all duration-500 ${
                tier.popular 
                ? 'bg-white border-emerald-600 shadow-2xl scale-105 z-10' 
                : tier.path === 'agency' 
                  ? 'bg-slate-950 border-slate-800 text-white' 
                  : 'bg-slate-50 border-slate-100 shadow-sm'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Best Value
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${tier.path === 'agency' ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className={`text-4xl font-black ${tier.path === 'agency' ? 'text-emerald-500' : 'text-slate-900'}`}>{tier.price}</span>
                  <span className="text-slate-500 ml-1 font-bold text-sm">/mo</span>
                </div>
                <p className={`text-xs leading-relaxed font-medium min-h-[40px] ${tier.path === 'agency' ? 'text-slate-400' : 'text-slate-600'}`}>{tier.description}</p>
              </div>

              <div className="h-px w-full bg-slate-200/50 mb-8" />

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`flex items-start text-xs font-bold ${tier.path === 'agency' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <svg className="w-4 h-4 mr-3 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => tier.path === 'agency' ? onStartAgency() : onStartBusiness()}
                className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 ${
                  tier.path === 'agency'
                  ? 'bg-white text-black hover:bg-emerald-600 hover:text-white shadow-xl'
                  : tier.popular 
                    ? 'bg-emerald-600 text-white hover:bg-black shadow-xl shadow-emerald-600/20' 
                    : 'bg-black text-white hover:bg-emerald-600 shadow-xl shadow-black/10'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          All plans include a 30-day money-back guarantee • Encrypted Secure Payments
        </p>
      </div>
    </section>
  );
};

export default Pricing;
