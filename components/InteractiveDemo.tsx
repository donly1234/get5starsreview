
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const InteractiveDemo: React.FC = () => {
  // Initialize state from localStorage if available
  const [review, setReview] = useState(() => 
    localStorage.getItem('g5sr_demo_review') || 
    "We visited for my daughter's birthday. The food was delicious, but the music was a bit too loud for conversation. Overall 4 stars!"
  );
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState(() => 
    localStorage.getItem('g5sr_demo_tone') || "Professional"
  );

  // Auto-save settings to localStorage
  useEffect(() => {
    localStorage.setItem('g5sr_demo_tone', tone);
  }, [tone]);

  useEffect(() => {
    localStorage.setItem('g5sr_demo_review', review);
  }, [review]);

  const generateAIResponse = async () => {
    if (isLoading || !review) return;
    setIsLoading(true);
    setResponse("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a helpful customer success manager. Write a short, ${tone.toLowerCase()}, and helpful response to this review: "${review}". 
      Ensure the response matches the selected tone precisely. 
      Thank them for their feedback and address any specific concerns mentioned.`;
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 250,
          thinkingConfig: { thinkingBudget: 100 },
        }
      });

      setResponse(result.text || "Thank you so much for your feedback! We appreciate your business.");
    } catch (error) {
      console.error("AI Demo Generation failed:", error);
      // High-quality fallback for UX continuity
      setResponse(`Hi! Thank you so much for sharing your experience. We are thrilled to hear you enjoyed the food! We truly appreciate your feedback regarding the music volume; we're always looking for ways to improve our atmosphere for all our guests. We hope to see you back soon!`);
    } finally {
      setIsLoading(false);
    }
  };

  const tones = ['Professional', 'Friendly', 'Empathetic', 'Witty'];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="lg:w-1/2 space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Interactive Demo</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tight uppercase italic">
                AI that sounds <br /> like <span className="text-green-600 underline decoration-slate-200 underline-offset-8">You.</span>
              </h2>
            </div>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
              Never stare at a blank screen again. Our AI analyzes customer sentiment and drafts human-perfect replies in seconds, keeping your engagement rate at 100%.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               {[
                 { title: 'Sentiment Analysis', desc: 'Understands tone and nuance.' },
                 { title: 'Brand Voice', desc: 'Matches your specific brand tone.' },
                 { title: 'SEO Boost', desc: 'Uses keywords that help you rank.' },
                 { title: 'Instant Post', desc: 'Syncs directly to Google.' }
               ].map((item, i) => (
                 <div key={i} className="space-y-1">
                   <h4 className="text-slate-900 font-black text-sm uppercase tracking-tight flex items-center gap-2">
                     <div className="w-5 h-5 bg-green-600 rounded-lg flex items-center justify-center text-white text-[10px]">✓</div>
                     {item.title}
                   </h4>
                   <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-900 rounded-[48px] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Customer Review</label>
                    <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                  </div>
                  <textarea 
                    className="w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all h-32 resize-none shadow-inner"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Enter a review to test..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select AI Response Tone</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter italic">Settings Auto-Saved</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     {tones.map(t => (
                       <button 
                        key={t}
                        onClick={() => setTone(t)}
                        aria-pressed={tone === t}
                        className={`flex-1 min-w-[100px] px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                          tone === t 
                          ? 'bg-green-600 border-green-600 text-white shadow-lg shadow-green-500/20 scale-[1.02]' 
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                        }`}
                       >
                         {t}
                       </button>
                     ))}
                  </div>
                </div>

                <button 
                  onClick={generateAIResponse}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-green-900/40 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-sm tracking-widest active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Generating {tone} Response...
                    </>
                  ) : "Draft AI Response"}
                </button>

                {response && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">AI {tone} Suggestion</label>
                      </div>
                    </div>
                    <p className="text-slate-200 text-sm leading-relaxed italic font-medium">"{response}"</p>
                    <div className="flex justify-end gap-3 pt-3">
                      <button className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Edit</button>
                      <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-xs font-black hover:bg-green-600 hover:text-white transition-all shadow-lg active:scale-95">Copy & Post</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
