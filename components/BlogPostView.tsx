import React, { useEffect, useState } from 'react';
import { blogContent } from '../constants/blogContent';
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
                <span>•</span>
                <span>{postData.readTime} reading time</span>
              </div>
            </header>

            <img src={extendedBlogPosts.find(p => p.id === postId)?.image || ""} className="w-full h-auto rounded-[32px] shadow-lg border border-slate-100" alt="Article Hero" />

            <div className="prose prose-emerald max-w-none blog-article-body text-slate-600 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: postData.content }} />

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
