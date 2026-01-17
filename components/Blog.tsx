import React from 'react';

const posts = [
  {
    title: "How to Rank #1 on Google Maps in 2025",
    category: "SEO Strategy",
    date: "Aug 12, 2025",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "The Impact of AI Search on Local Businesses",
    category: "AI Trends",
    date: "Aug 10, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "5 Tips for Managing Negative Reviews Gracefully",
    category: "Reputation",
    date: "Aug 05, 2025",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#16A34A] font-black uppercase tracking-widest text-xs mb-4">Inside the Industry</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
            Latest From Our <span className="text-[#16A34A]">Blog</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden mb-6 border border-slate-100 shadow-sm transition-all group-hover:shadow-xl group-hover:scale-[1.02]">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-900">{post.category}</span>
                </div>
              </div>
              <div className="px-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{post.date}</p>
                <h4 className="text-xl font-black text-slate-900 group-hover:text-[#16A34A] transition-colors leading-tight mb-4">{post.title}</h4>
                <button className="text-xs font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 group-hover:border-[#16A34A] group-hover:text-[#16A34A] transition-all pb-1">Read Article</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;