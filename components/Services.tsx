import React from 'react';

interface FeaturesProps {
  onSignup?: () => void;
  onContact?: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onSignup, onContact }) => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 space-y-32">
        {/* Secure & Approved */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Secure & Approved</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Get5StarsReview uses 100% white-hat SEO strategies designed to meet Google’s latest guidelines. We protect your business from search engine penalties while delivering sustainable, high-quality results.
            </p>
            <button onClick={onSignup} className="px-8 py-3 bg-[#16A34A] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-green-500/20">LEARN MORE</button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative soft-card p-6 md:p-8 flex items-center justify-center bg-slate-50/50 backdrop-blur max-w-sm mx-auto">
              <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full"></div>
              <div className="relative z-10 space-y-3 w-full max-w-[260px]">
                 <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#16A34A] text-lg">🛡️</div>
                    <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">Google Developer Approved</p>
                 </div>
                 <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 translate-x-4">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-[#16A34A] text-lg">✅</div>
                    <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">CASA Certified Security</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* All-In-One Tool */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-32">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">All-In-One Marketing Tool</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Replace your entire tech stack and cut costs with our all-in-one marketing platform. Get5StarsReview consolidates reputation management, local citations, SEO reporting, image optimization, and video creation into one powerful, Google-compliant solution. Automate your workflow and scale your business without the need for multiple subscriptions.
            </p>
            <button onClick={onSignup} className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-[#16A34A] transition-all shadow-lg">LEARN MORE</button>
          </div>
          <div className="lg:w-1/2">
             <div className="relative soft-card p-6 md:p-8 flex items-center justify-center bg-green-50/30 max-w-sm mx-auto">
               <div className="w-60 h-60 rounded-full border-2 border-dashed border-white/60 flex items-center justify-center relative">
                  <div className="w-36 h-36 rounded-full bg-black text-white flex flex-col items-center justify-center text-center p-4 shadow-2xl ring-[12px] ring-white/20">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#16A34A]">All-In-One AI</p>
                    <p className="text-xs font-bold leading-tight">Marketing Platform</p>
                  </div>
                  
                  {/* Surrounding Labels - Words remain readable size */}
                  <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-md border border-[#16A34A]/10 uppercase whitespace-nowrap">Reputation</div>
                  <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-md border border-[#16A34A]/10 uppercase whitespace-nowrap">GBP Audits</div>
                  <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-md border border-[#16A34A]/10 uppercase whitespace-nowrap">Social Media</div>
                  <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-full text-[10px] font-black shadow-md border border-[#16A34A]/10 uppercase whitespace-nowrap">Heatmaps</div>
               </div>
             </div>
          </div>
        </div>

        {/* Optimize Everywhere - Background changed to green and layout polished */}
        <div className="p-12 md:p-20 bg-green-50/60 rounded-[64px] border border-green-100 flex flex-col lg:flex-row items-center gap-16 lg:gap-32 shadow-sm">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">Optimize Everywhere</h3>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              Ranking higher in local search results means more than just optimizing your Google Business Profile. That's why Get5StarsReview can also fully manage its own on your YouTube channel, social media profiles, and how your business appears on other online directories including ChatGPT.
            </p>
            <button onClick={onContact} className="px-8 py-3 bg-[#16A34A] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg">LEARN MORE</button>
          </div>
          <div className="lg:w-1/2">
             <div className="soft-card p-10 bg-white flex flex-wrap gap-4 justify-center items-center max-w-md mx-auto">
                {['google', 'chatgpt', 'youtube', 'facebook', 'instagram', 'yelp', 'bing'].map(brand => {
                  const iconUrl = brand === 'chatgpt' 
                    ? 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
                    : `https://www.vectorlogo.zone/logos/${brand}/${brand}-icon.svg`;
                  
                  return (
                    <div key={brand} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center p-4 border border-slate-100 hover:border-[#16A34A] hover:scale-110 transition-all cursor-default shadow-sm overflow-hidden">
                      <img 
                        src={iconUrl} 
                        alt={brand} 
                        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all"
                        onError={(e) => {
                          const target = brand === 'chatgpt' ? 'openai' : brand;
                          (e.target as HTMLImageElement).src = `https://logo.clearbit.com/${target}.com`;
                        }}
                      />
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
