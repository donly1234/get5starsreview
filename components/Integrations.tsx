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
  // Duplicate the array for seamless infinite scroll
  const scrollItems = [...allPlatforms, ...allPlatforms];

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <div className="text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            TRUSTED BY 2,000+ BUSINESSES & INTEGRATING WITH
          </p>
        </div>
      </div>

      <div className="relative flex">
        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Container */}
        <div className="animate-marquee flex gap-8 md:gap-12 px-6">
          {scrollItems.map((platform, idx) => (
            <div 
              key={idx} 
              className="px-8 py-4 bg-white rounded-2xl border border-slate-50 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all hover:scale-105 cursor-default flex items-center justify-center min-w-[180px] h-20 group"
              aria-label={`Integrated with ${platform.name}`}
            >
              <img 
                src={platform.logo} 
                alt={platform.name} 
                className="h-8 w-auto max-w-[140px] object-contain transition-all duration-500 grayscale group-hover:grayscale-0" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://logo.clearbit.com/${platform.name.toLowerCase().replace(/\s/g, '')}.com`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
