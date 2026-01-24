import React, { useEffect } from 'react';
import { blogContent } from '../constants/blogContent';
import { extendedBlogPosts } from './Blog';

interface BlogPostViewProps {
  postId: string;
  onBack: () => void;
  onSignup: () => void;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ postId, onBack, onSignup }) => {
  const postData = blogContent[postId] || {
    title: extendedBlogPosts.find(p => p.id === postId)?.title || "Latest Insights",
    content: `<p>${extendedBlogPosts.find(p => p.id === postId)?.excerpt || "Detailed analysis coming soon."}</p><p>Check back in 48 hours for the full 600-word SEO breakdown for this topic.</p>`,
    readTime: "5 min",
    keywords: ["Local SEO", "G5SR", "Ranking"],
    description: "Expert local SEO insights from the Get5StarsReview team."
  };

  useEffect(() => {
    // Dynamic SEO Metadata Injection
    const originalTitle = document.title;
    document.title = `${postData.title} | Get5StarsReview Blog`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', postData.description);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${window.location.pathname}?p=blog-post&id=${postId}`);

    window.scrollTo(0, 0);

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
    };
  }, [postId, postData]);

  const metadata = extendedBlogPosts.find(p => p.id === postId);

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
              {postData.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-400 text-sm font-bold border-y border-slate-50 py-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white text-xs font-black">GSR</div>
              <div>
                <p className="text-slate-900 font-black uppercase text-[10px] tracking-widest">G5SR Intelligence Hub</p>
                <p className="text-[11px] mt-1">Verified Authority Post • {postData.readTime} read</p>
              </div>
            </div>
          </header>

          <img 
            src={metadata?.image || "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200"} 
            className="w-full h-auto rounded-[48px] shadow-2xl border border-slate-50" 
            alt={postData.title} 
            loading="lazy" 
          />

          <div 
            className="prose prose-lg prose-slate max-w-none space-y-8 blog-content-view"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />

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

          <div className="pt-12 border-t border-slate-100">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Article Keywords</h4>
             <div className="flex flex-wrap gap-2">
                {postData.keywords.map(k => (
                  <span key={k} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold border border-slate-100">#{k}</span>
                ))}
             </div>
          </div>
        </article>
      </div>
      <style>{`
        .blog-content-view h2 { font-size: 2rem; font-weight: 900; text-transform: uppercase; font-style: italic; color: #0f172a; margin-top: 3rem; }
        .blog-content-view h3 { font-size: 1.5rem; font-weight: 800; color: #16a34a; margin-top: 2rem; }
        .blog-content-view p { font-size: 1.125rem; line-height: 1.8; color: #475569; margin-bottom: 1.5rem; }
        .blog-content-view strong { color: #0f172a; font-weight: 800; }
        .blog-content-view ul { list-style-type: disc; padding-left: 1.5rem; color: #475569; margin-bottom: 1.5rem; }
        .blog-content-view li { margin-bottom: 0.5rem; font-weight: 500; }
      `}</style>
    </div>
  );
};

export default BlogPostView;
