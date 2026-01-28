
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { extendedBlogPosts } from './Blog';

interface BlogPageProps {
  onPostClick: (id: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onPostClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const cats = new Set(extendedBlogPosts.map(post => post.category));
    return ['All', ...Array.from(cats)].sort();
  }, []);

  const filteredPosts = useMemo(() => {
    return extendedBlogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && visibleCount < filteredPosts.length) {
        setVisibleCount(prev => prev + 3);
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, filteredPosts.length]);

  return (
    <div className="pt-40 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-12">
           <div className="space-y-4">
             <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">Intelligence Archive</span>
             <h1 className="text-5xl md:text-8xl font-[900] text-slate-900 tracking-tighter uppercase italic leading-none">Knowledge <br /><span className="text-emerald-600">Protocol.</span></h1>
           </div>

           <div className="max-w-2xl mx-auto relative group">
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(6); }}
                placeholder="Search algorithms, strategy, or ranking factors..."
                className="w-full p-6 pl-14 bg-white border-2 border-slate-100 rounded-[32px] font-bold text-slate-900 focus:border-emerald-500 outline-none transition-all shadow-xl"
              />
              <svg className="w-6 h-6 absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                activeCategory === cat ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedPosts.map((post) => (
            <div key={post.id} onClick={() => onPostClick(post.id)} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer flex flex-col h-full animate-in fade-in duration-500">
              <div className="relative aspect-[16/10] overflow-hidden shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-sm">{post.category}</span>
                </div>
              </div>
              <div className="p-10 space-y-4 flex flex-col flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{post.date}</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors uppercase italic tracking-tighter">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">{post.excerpt}</p>
                <div className="pt-6 mt-auto">
                   <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950 flex items-center gap-2">Decrypt Analysis <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={loaderRef} className="py-20 text-center">
          {visibleCount < filteredPosts.length ? (
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            <p className="text-slate-300 font-black uppercase text-[10px] tracking-widest">Protocol Sync Complete</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
