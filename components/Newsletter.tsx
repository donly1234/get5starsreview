
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 max-w-xl space-y-4">
             <span className="text-green-400 font-black uppercase tracking-[0.3em] text-[10px]">The Intelligence Hub</span>
             <h3 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
               Get Local SEO <br /> <span className="text-green-500">Mastery</span> In Your Inbox.
             </h3>
             <p className="text-slate-400 font-medium">Join 5,000+ business owners receiving weekly strategies to dominate Google Maps and AI search.</p>
          </div>

          <div className="relative z-10 w-full max-w-md">
            {subscribed ? (
              <div className="bg-green-600 text-white p-6 rounded-3xl text-center font-black animate-in zoom-in duration-300">
                YOU'RE ON THE LIST! 🚀
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-bold focus:border-green-500 focus:outline-none transition-all"
                  required
                />
                <button className="bg-white text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-500 hover:text-white transition-all shadow-xl active:scale-95">
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-500 mt-4 text-center sm:text-left font-bold uppercase tracking-widest">No spam. Only high-value ranking logic.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
