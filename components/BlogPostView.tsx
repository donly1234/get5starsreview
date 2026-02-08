import React, { useEffect, useState } from 'react';
import { blogContent } from './blogContent';
import { extendedBlogPosts } from './Blog';
import { GoogleGenAI, Type } from "@google/genai";

interface BlogPostViewProps {
  postId: string;
  onBack: () => void;
  onSignup: () => void;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const BlogPostView: React.FC<BlogPostViewProps> = ({ postId, onBack, onSignup }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const postData = blogContent[postId] || {
    title: extendedBlogPosts.find(p => p.id === postId)?.title || "Latest Insights",
    content: `<p>${extendedBlogPosts.find(p => p.id === postId)?.excerpt || "Detailed analysis coming soon."}</p>`,
    readTime: "5 min",
    keywords: ["Local SEO", "G5SR", "Ranking"],
    description: "Expert local SEO insights."
  };

  const currentUrl = window.location.href;
  const postTitle = encodeURIComponent(postData.title);

  const relatedPosts = extendedBlogPosts.filter(p => p.id !== postId).slice(0, 3);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${postData.title} | Get5StarsReview`;
    window.scrollTo(0, 0);
    return () => { document.title = originalTitle; };
  }, [postId, postData]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || isPosting) return;

    setIsPosting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this comment: "${commentText}". Is it toxic or spam? Return JSON { approved: boolean }.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: { approved: { type: Type.BOOLEAN } }
          }
        }
      });

      const { approved } = JSON.parse(response.text);

      if (approved) {
        setComments([{ id: Date.now().toString(), author: "Verified User", text: commentText, date: "Just now" }, ...comments]);
        setCommentText('');
      } else {
        alert("Your comment was flagged by our AI security filter.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <button onClick={onBack} className="mb-8 flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black uppercase text-[10px] tracking-[0.3em] transition-all group">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          Back to Knowledge Base
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3 space-y-12">
            <header className="space-y-6">
              <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 inline-block">Intelligence Update</span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-tight uppercase italic">
                {postData.title}
              </h1>
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold py-4 border-y border-slate-100">
                <span className="text-slate-900 font-black uppercase">GSR Editorial Board</span>
                <span>â€¢</span>
                <span>{postData.readTime} reading time</span>
              </div>
            </header>

            <img src={extendedBlogPosts.find(p => p.id === postId)?.image || ""} className="w-full h-auto rounded-[32px] shadow-lg border border-slate-100" alt="Article Hero" />

            <div className="prose prose-emerald max-w-none blog-article-body text-slate-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: postData.content }} />

            {/* Social Sharing Component */}
            <div className="py-8 border-y border-slate-100 flex flex-col sm:flex-row items-center gap-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share this Insight</p>
              <div className="flex gap-4">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${postTitle}&url=${currentUrl}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-400/20"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-700/20"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            <section className="pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-8">Community Discourse</h3>
              <form onSubmit={handlePostComment} className="space-y-4 mb-12">
                <textarea 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your perspective..."
                  className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl font-medium focus:border-emerald-500 outline-none transition-all h-32 resize-none"
                />
                <button disabled={isPosting} className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all disabled:opacity-50">
                  {isPosting ? 'AI Analysis Active...' : 'Post Analysis'}
                </button>
              </form>

              <div className="space-y-6">
                {comments.map(c => (
                  <div key={c.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-black text-slate-900 text-[10px] uppercase tracking-widest">{c.author}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{c.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:w-1/3 space-y-12">
            <div className="bg-slate-950 p-8 rounded-[40px] text-white space-y-6 sticky top-32 shadow-2xl">
              <h4 className="text-xl font-black uppercase italic tracking-tighter">Strategic Context</h4>
              <div className="space-y-6">
                {relatedPosts.map(p => (
                  <button key={p.id} onClick={() => window.location.href = `?p=blog-post&id=${p.id}`} className="flex gap-4 text-left group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase group-hover:text-emerald-400 transition-colors leading-tight">{p.title}</h5>
                      <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold">{p.category}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={onSignup} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Start Ranking Free</button>
            </div>
          </aside>
        </div>
      </div>
      <style>{`
        .blog-article-body h2 { font-size: 1.8rem; font-weight: 900; text-transform: uppercase; font-style: italic; color: #0f172a; margin: 2rem 0 1rem; }
        .blog-article-body p { font-size: 1rem; line-height: 1.8; color: #475569; margin-bottom: 1.5rem; }
        .blog-article-body ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
};

export default BlogPostView;
