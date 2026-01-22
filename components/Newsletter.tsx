import React, { useState } from 'react';

/**
 * MAILCHIMP CONFIGURATION
 * URL cleaned and extracted from user input.
 */
const MAILCHIMP_URL = "https://get5starsreview.us8.list-manage.com/subscribe/post?u=7211a67e99585813cbf1ac7d6&id=18c6c019ee"; 

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-[#0F172A] rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow Effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 max-w-xl space-y-6">
             <span className="text-[#16A34A] font-black uppercase tracking-[0.3em] text-[11px]">The Intelligence Hub</span>
             <h3 className="text-4xl md:text-5xl lg:text-6xl font-[900] text-white uppercase italic tracking-tighter leading-[0.95]">
               Get Local SEO <br /> <span className="text-[#16A34A]">Mastery</span> In Your Inbox.
             </h3>
             <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg">
               Join 5,000+ business owners receiving weekly strategies to dominate Google Maps and AI search.
             </p>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <form 
              action={MAILCHIMP_URL} 
              method="POST" 
              target="_blank" 
              className="flex flex-col sm:flex-row gap-3"
            >
              {/* Mailchimp standard email field name is 'EMAIL' */}
              <input 
                type="email" 
                name="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-bold placeholder:text-slate-500 focus:border-[#16A34A] focus:outline-none transition-all shadow-inner"
                required
              />
              
              {/* 
                  BOT PROTECTION (Honeypot): 
                  Name constructed from your specific Mailchimp IDs: u=7211a67e99585813cbf1ac7d6 & id=18c6c019ee
              */}
              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_7211a67e99585813cbf1ac7d6_18c6c019ee" tabIndex={-1} value="" readOnly />
              </div>

              <button 
                type="submit"
                className="bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#16A34A] hover:text-white transition-all shadow-xl active:scale-95 shrink-0"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-[10px] text-slate-500 mt-6 text-center lg:text-left font-black uppercase tracking-[0.2em] opacity-80">
              No spam. Only high-value ranking logic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
