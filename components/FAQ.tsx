
import React, { useState } from 'react';

const faqs = [
  {
    q: "What is Get5StarsReview and how does it help small businesses rank on Google Maps and AI search?",
    a: "Get5StarsReview is the #1 automated AI local SEO tool for small businesses and agencies, built to help you rank higher on Google Maps and AI search results without needing to be an expert. Our AI assistant, GBP Boost, analyzes what top-ranking profiles are doing and then automatically applies those best practices to your profile."
  },
  {
    q: "How does GBP Boost, Get5StarsReview's AI SEO tool, work for Google Business Profile management?",
    a: "GBP Boost uses advanced language models to generate high-conversion descriptions, respond to reviews with brand-specific voice, and automatically post updates that keep your profile active and favored by algorithms."
  },
  {
    q: "Who is GBP Boost best for - small businesses, franchises, or marketing agencies?",
    a: "All of them! We have tiered solutions that scale from single-location mom-and-pop shops to large agencies managing thousands of client profiles."
  },
  {
    q: "Can Get5StarsReview help my business show up in ChatGPT, Gemini, and other AI search results?",
    a: "Yes. By optimizing your digital footprint and citation accuracy, we ensure that LLMs have the right data to recommend your business when users ask for local services."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 font-medium">Here are some of the most common questions about Get5StarsReview. If you don't see your question here, feel free to reach out to us!</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`rounded-[32px] overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-black text-white border-black' : 'bg-white text-slate-800 border-slate-100'}`}>
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className={`text-sm md:text-lg font-bold ${isOpen ? 'text-white' : 'text-slate-800'}`}>{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-[#16A34A] text-white rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                    {isOpen ? '−' : '+'}
                  </div>
                </button>
                <div className={`px-8 transition-all duration-300 ${isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-sm md:text-base leading-relaxed opacity-90">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
