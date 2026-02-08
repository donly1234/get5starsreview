import React, { useState } from 'react';

const initialTestimonials = [
  {
    id: 't1',
    quote: "Our Google rating went from 3.8 to 4.8 stars in just three months. The automated SMS requests are a game changer for our local bakery.",
    author: "Elena Rodriguez",
    role: "Owner, Sweet Temptations",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: 't2',
    quote: "The AI response feature saves me at least 5 hours a week. I no longer dread checking my Yelp notificationsâ€”I just click 'Generate' and post.",
    author: "Marcus Chen",
    role: "Manager, Tech Solutions Inc.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    id: 't3',
    quote: "Displaying our reviews directly on our checkout page increased our conversion rate by 15%. This is the best ROI tool we use.",
    author: "Sarah Jenkins",
    role: "Marketing Director, LuxStay",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  }
];

const Testimonials: React.FC = () => {
  const [featuredId, setFeaturedId] = useState('t1');
  
  const featured = initialTestimonials.find(t => t.id === featuredId) || initialTestimonials[0];
  const others = initialTestimonials.filter(t => t.id !== featuredId);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 uppercase tracking-tight italic italic">Trusted by <span className="text-[#16A34A]">Market Leaders.</span></h2>
          <p className="text-slate-600 text-lg font-medium">Join thousands of businesses that trust Get5StarsReview to power their growth.</p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-white p-10 md:p-16 rounded-[48px] shadow-2xl border-4 border-[#16A34A]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl opacity-5 grayscale group-hover:grayscale-0 transition-all pointer-events-none">â­</div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-xl">
                <img src={featured.avatar} alt={featured.author} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Featured Success Story
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-2xl md:text-4xl font-black text-slate-900 leading-tight italic">"{featured.quote}"</p>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{featured.author}</h4>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">{featured.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {others.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col justify-between group hover:shadow-xl transition-all">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <button 
                    onClick={() => setFeaturedId(t.id)}
                    className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-[#16A34A] transition-colors border border-slate-100 rounded-lg px-3 py-1 bg-slate-50 group-hover:bg-emerald-50 group-hover:border-emerald-100"
                  >
                    Make Featured
                  </button>
                </div>
                <p className="text-slate-700 italic font-medium leading-relaxed mb-8">"{t.quote}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-2xl object-cover shadow-md" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.author}</h4>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
