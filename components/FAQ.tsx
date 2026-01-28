
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
    <section id="faq" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-[900] text-slate-900 dark:text-white tracking-tight uppercase italic mb-6">
            Frequently Asked <span className="text-[#16A34A]">Questions.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-lg">
            Everything you need to know about dominating Google Maps with AI.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 border ${
                  isOpen 
                  ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-2xl' 
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-100 dark:border-white/5'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 md:px-10 md:py-8 flex items-center justify-between text-left group transition-all"
                >
                  <span className={`text-sm md:text-xl font-bold leading-tight ${isOpen ? 'pr-4' : 'pr-8'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isOpen 
                    ? 'bg-[#16A34A] text-white rotate-[225deg]' 
                    : 'bg-slate-50 dark:bg-white/5 text-slate-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10'
                  }`}>
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                </button>
                <div 
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-10 md:pb-10">
                      <div className="h-px w-12 bg-[#16A34A] mb-6 opacity-30"></div>
                      <p className="text-sm md:text-lg leading-relaxed font-medium opacity-80 max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </div>
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
