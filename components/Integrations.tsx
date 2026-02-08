import React from 'react';

const allPlatforms = [
  { name: 'Google', logo: 'https://www.vectorlogo.zone/logos/google/google-ar21.svg' },
  { name: 'Facebook', logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-ar21.svg' },
  { name: 'Yelp', logo: 'https://www.vectorlogo.zone/logos/yelp/yelp-ar21.svg' },
  { name: 'Shopify', logo: 'https://www.vectorlogo.zone/logos/shopify/shopify-ar21.svg' },
  { name: 'WooCommerce', logo: 'https://www.vectorlogo.zone/logos/woocommerce/woocommerce-ar21.svg' },
  { name: 'HubSpot', logo: 'https://www.vectorlogo.zone/logos/hubspot/hubspot-ar21.svg' },
  { name: 'Salesforce', logo: 'https://www.vectorlogo.zone/logos/salesforce/salesforce-ar21.svg' },
  { name: 'Slack', logo: 'https://www.vectorlogo.zone/logos/slack/slack-ar21.svg' },
];

const Integrations: React.FC = () => {
  // Triple the list to ensure the marquee has plenty of content to fill the screen for a seamless loop
  const scrollItems = [...allPlatforms, ...allPlatforms, ...allPlatforms];

  return (
    <section className="py-12 md:py-20 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="text-center">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">
            TRUSTED BY 2,000+ BUSINESSES & INTEGRATING WITH
          </p>
        </div>
      </div>

      <div className="relative group overflow-hidden">
        {/* Left and Right Fade Gradients for "Infinite" look */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {scrollItems.map((platform, idx) => (
            <div 
              key={idx} 
              className="px-6 md:px-10 py-6 bg-white rounded-3xl border border-transparent hover:border-emerald-500/20 hover:bg-slate-50/50 transition-all duration-500 hover:scale-110 cursor-default flex items-center justify-center shrink-0 mx-4 group/logo"
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="h-7 md:h-10 w-auto max-w-[150px] object-contain transition-all duration-700 grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
