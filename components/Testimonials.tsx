
import React from 'react';

const testimonials = [
  {
    quote: "Our Google rating went from 3.8 to 4.8 stars in just three months. The automated SMS requests are a game changer for our local bakery.",
    author: "Elena Rodriguez",
    role: "Owner, Sweet Temptations",
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    quote: "The AI response feature saves me at least 5 hours a week. I no longer dread checking my Yelp notifications—I just click 'Generate' and post.",
    author: "Marcus Chen",
    role: "Manager, Tech Solutions Inc.",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    quote: "Displaying our reviews directly on our checkout page increased our conversion rate by 15%. This is the best ROI tool we use.",
    author: "Sarah Jenkins",
    role: "Marketing Director, LuxStay",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Loved by businesses like yours</h2>
          <p className="text-slate-600 text-lg">Join thousands of businesses that trust Get5StarsReview to power their growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 italic mb-6">"{t.quote}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full border-2 border-blue-100" />
                <div>
                  <h4 className="font-bold text-slate-900">{t.author}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
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
