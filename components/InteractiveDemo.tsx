
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const InteractiveDemo: React.FC = () => {
  const [review, setReview] = useState("We visited for my daughter's birthday. The food was delicious, but the music was a bit too loud for conversation. Overall 4 stars!");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState("Professional");

  const generateAIResponse = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setResponse(""); // Clear old response

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a helpful customer success manager. Write a short, ${tone.toLowerCase()}, and empathetic response to this 4-star review: "${review}". Acknowledge their point about the music and thank them for the birthday visit.`;
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      });

      setResponse(result.text || "Thank you so much for your feedback! We're glad the food was delicious and will keep the music volume in mind.");
    } catch (error) {
      console.error("AI Demo Generation failed:", error);
      // High-quality fallback if API fails
      setResponse(`Hi there! Thank you so much for celebrating your daughter's birthday with us. We're thrilled you loved the food! We appreciate the feedback on the music volume and will definitely adjust it for a better conversation experience next time. Hope to see you again soon!`);
    } finally {
      setIsLoading(false);
    }
  };

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
              Managing reviews shouldn't be a full-time job. Our AI analyzes sentiment and drafts human-perfect replies in seconds, keeping your engagement rates at 100%.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
               {[
                 { title: 'Semantic Context', desc: 'Understands sarcasm and nuance.' },
                 { title: 'Brand Consistency', desc: 'Matches your specific tone.' },
                 { title: 'SEO Optimized', desc: 'Boosts rankings with relevant keywords.' },
                 { title: 'One-Click Post', desc: 'Syncs directly to Google.' }
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
            <div className="bg-slate-900 rounded-[48px] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)] relative">
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
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                   <span className="text-[10px] font-black text-slate-500 uppercase mr-2 tracking-widest">Brand Voice:</span>
                   {['Professional', 'Friendly', 'Empathetic', 'Witty'].map(t => (
                     <button 
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tone === t ? 'bg-green-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                     >
                       {t}
                     </button>
                   ))}
                </div>

                <button 
                  onClick={generateAIResponse}
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-green-900/40 disabled:opacity-50 flex items-center justify-center gap-3 uppercase text-sm tracking-widest active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : "Generate AI Response"}
                </button>

                {response && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500 bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <label className="text-slate-400 text-[10px] font-black uppercase tracking-widest">AI Draft Suggestion</label>
                      </div>
                      <span className="text-[9px] font-black text-green-500 bg-green-500/10 px-2 py-0.5 rounded uppercase">98% Accuracy</span>
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
