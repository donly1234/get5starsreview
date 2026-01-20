
import React, { useRef } from 'react';

export const blogPostsData = [
  {
    id: 'p1',
    title: "How to Rank #1 on Google Maps in 2025",
    category: "SEO Strategy",
    date: "Aug 12, 2025",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    excerpt: "Discover the latest local SEO ranking factors that Get5StarsReview automates for your business."
  },
  {
    id: 'p2',
    title: "The Impact of AI Search on Local Businesses",
    category: "AI Trends",
    date: "Aug 10, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    excerpt: "Why traditional SEO isn't enough anymore and how AI-driven responses boost visibility."
  },
  {
    id: 'p3',
    title: "5 Tips for Managing Negative Reviews Gracefully",
    category: "Reputation",
    date: "Aug 05, 2025",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
    excerpt: "Turn unhappy customers into brand advocates using Get5StarsReview's smart empathy engine."
  },
  {
    id: 'p4',
    title: "Why Local Citations are the Backbone of Map Ranking",
    category: "Authority",
    date: "Aug 01, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Consistency is key. Learn how we sync your data across 50+ directories instantly."
  },
  {
    id: 'p5',
    title: "The Shift from Clicks to Actions in Local Search",
    category: "UX Design",
    date: "July 28, 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    excerpt: "How to optimize your GBP profile to drive more calls and directions, not just impressions."
  }
];

export const extendedBlogPosts = [
  ...blogPostsData,
  {
    id: 'p6',
    title: "Review Velocity: The Secret Local Ranking Factor",
    category: "Algorithm",
    date: "July 20, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Google tracks how often you get new reviews. Learn how automation maintains your ranking velocity."
  },
  {
    id: 'p7',
    title: "Social Proof Automation: From 0 to 500 Reviews",
    category: "Growth",
    date: "July 15, 2025",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    excerpt: "A step-by-step guide to scaling your reputation without lifting a finger using Get5StarsReview."
  },
  {
    id: 'p8',
    title: "Why SMS Requests Convert 3x Better Than Email",
    category: "Data",
    date: "July 10, 2025",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=800",
    excerpt: "Our internal metrics show SMS is the superior channel for capturing customer feedback."
  },
  {
    id: 'p9',
    title: "Google Business Profile Optimization Checklist 2025",
    category: "Checklist",
    date: "July 05, 2025",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    excerpt: "Don't miss these 12 critical settings that tell Google you are a high-authority local business."
  },
  {
    id: 'p10',
    title: "The Future of Local Search: ChatGPT & AI Agents",
    category: "Future Tech",
    date: "June 28, 2025",
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
    excerpt: "How to ensure AI agents recommend your business when customers ask for local help."
  }
];

interface BlogProps {
  onPostClick: (id: string) => void;
  onViewAll: () => void;
}

const Blog: React.FC<BlogProps> = ({ onPostClick, onViewAll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="py-24 bg-white scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#16A34A] font-black uppercase tracking-widest text-xs mb-4">Intelligence Feed</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter italic">
              Local SEO <span className="text-[#16A34A]">Insights</span>
            </h3>
          </div>
          <div className="flex gap-4">
             <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
             </button>
             <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
             </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x">
          {blogPostsData.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onPostClick(post.id)}
              className="min-w-[320px] md:min-w-[400px] group cursor-pointer snap-start"
            >
              <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-6 border border-slate-100 shadow-sm transition-all group-hover:shadow-2xl group-hover:scale-[1.01]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900">{post.category}</span>
                </div>
              </div>
              <div className="px-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{post.date}</p>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-[#16A34A] transition-colors leading-tight mb-4">{post.title}</h4>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <button className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 group-hover:border-[#16A34A] group-hover:text-[#16A34A] transition-all pb-1">Read Article</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <button onClick={onViewAll} className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all border border-slate-200">View Full Blog Archive</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
