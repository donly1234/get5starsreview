
import React from 'react';

interface BlogPostViewProps {
  postId: string;
  onBack: () => void;
  onSignup: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ postId, onBack, onSignup }) => {
  return (
    <div className="pt-40 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <button onClick={onBack} className="mb-12 flex items-center gap-2 text-slate-400 hover:text-green-600 font-black uppercase text-[10px] tracking-[0.3em] transition-all group">
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          Back to Blog
        </button>

        <article className="space-y-12">
          <header className="space-y-6">
            <span className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">Featured Article</span>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
              How to dominate <span className="text-green-600">Local Search</span> results in 2025
            </h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm font-bold border-y border-slate-50 py-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-xs font-black">GSR</div>
              <div>
                <p className="text-slate-900 font-black uppercase text-[10px] tracking-widest">G5SR Intelligence Hub</p>
                <p className="text-[11px] mt-1">Verified Authority Post • 12 min read</p>
              </div>
            </div>
          </header>

          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200" className="w-full h-auto rounded-[48px] shadow-2xl border border-slate-50" alt="Local SEO Strategy" />

          <div className="prose prose-lg prose-slate max-w-none space-y-8">
            <p className="text-2xl text-slate-600 leading-relaxed font-medium">
              Ranking in the local "Map Pack" is the difference between a business that struggles and one that dominates its territory. As Google integrates AI into every search, your reputation score is your new currency.
            </p>
            
            <h2 className="text-3xl font-black text-slate-900 uppercase italic">1. Proximity is Fixed, Prominence is Earned</h2>
            <p className="text-slate-600 leading-relaxed">
              Google uses three main factors: Proximity, Relevance, and Prominence. While you can't move your physical storefront, you can improve prominence by using Get5StarsReview to generate a steady stream of keyword-rich reviews. Our AI helps ensure those reviews contain the specific terms your customers are searching for.
            </p>

            <h2 className="text-3xl font-black text-slate-900 uppercase italic">2. The Impact of Review Velocity</h2>
            <p className="text-slate-600 leading-relaxed">
              Getting 50 reviews in one day and none for a month is a red flag to Google. Real growth requires consistent review velocity. By automating SMS requests the moment a customer leaves your store, you build a natural, upward-trending growth curve that algorithms love.
            </p>

            <div className="bg-slate-950 p-12 md:p-16 rounded-[64px] text-white my-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden group">
               <div className="relative z-10 space-y-8 text-center md:text-left">
                 <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">Ready to automate <br /> your <span className="text-green-500">5-star success?</span></h3>
                 <p className="text-slate-400 text-lg max-w-xl font-medium">Join over 2,000 brands that use Get5StarsReview to handle the hard part of local SEO while they focus on their customers.</p>
                 <button 
                  onClick={onSignup}
                  className="bg-green-600 text-white px-12 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-green-900/40 active:scale-95"
                 >
                   Start 14-Day Free Trial
                 </button>
               </div>
               <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
            </div>

            <h2 className="text-3xl font-black text-slate-900 uppercase italic">Summary</h2>
            <p className="text-slate-600 leading-relaxed">
              Google Maps SEO isn't a one-time project; it's an ongoing process of engagement. At Get5StarsReview, we simplify that process so you can enjoy the #1 spot without the technical headache.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostView;
