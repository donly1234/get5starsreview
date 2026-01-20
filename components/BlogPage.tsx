
import React from 'react';
import { extendedBlogPosts } from './Blog';

interface BlogPageProps {
  onPostClick: (id: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onPostClick }) => {
  return (
    <div className="pt-40 pb-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 space-y-6">
           <span className="text-green-600 font-black uppercase tracking-widest text-xs">The Intelligence Hub</span>
           <h1 className="text-5xl md:text-7xl font-[900] text-slate-900 tracking-tighter uppercase italic leading-none">
             Mastering <br /> <span className="text-green-600">Local Reputation</span>
           </h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             Latest strategies, case studies, and updates to help your business dominate Google Maps and AI search results.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {extendedBlogPosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onPostClick(post.id)}
              className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6">
                  <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                </div>
              </div>
              <div className="p-10 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{post.date}</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-green-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
                <div className="pt-4">
                   <button className="text-xs font-black uppercase tracking-widest text-slate-950 flex items-center gap-2 group/btn">
                     Read Full Story
                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
