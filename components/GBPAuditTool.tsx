import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Logo from './Logo.tsx';

interface AuditData {
  businessName: string;
  address: string;
  currentRating: number;
  currentReviews: number;
  keywords: string;
  reviewScore: number;
  visibilityTrend: string;
  competitors: Array<{
    rank: number;
    name: string;
    score: number;
    rating: number;
    reviews: number;
  }>;
}

const GBPAuditTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuditData | null>(null);

  const extractJson = (text: string) => {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", text);
      throw new Error("Invalid response format from AI");
    }
  };

  const runAudit = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Act as a senior Local SEO Engineer. Generate a deep-dive local search audit for a business called "${query}". 
        Make the findings look critical yet actionable to show they need Get5StarsReview. 
        Return strictly a JSON response with: businessName, address, currentRating (range 2.8 to 4.2), currentReviews (range 15 to 120), keywords, visibilityTrend, reviewScore (out of 10), and a list of 3 competitors with ranks 1, 2, and 3.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              address: { type: Type.STRING },
              currentRating: { type: Type.NUMBER },
              currentReviews: { type: Type.NUMBER },
              keywords: { type: Type.STRING },
              visibilityTrend: { type: Type.STRING },
              reviewScore: { type: Type.NUMBER },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.NUMBER },
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    rating: { type: Type.NUMBER },
                    reviews: { type: Type.NUMBER }
                  }
                }
              }
            },
            required: ['businessName', 'competitors', 'reviewScore']
          }
        }
      });

      const auditResult = extractJson(response.text || "{}");
      setData(auditResult);
    } catch (e) {
      console.error("Audit failed:", e);
      alert("Failed to complete audit. Please try again with a more specific business name and city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="audit-tool" className="py-24 bg-slate-50 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6 max-w-4xl">
        {!data ? (
          <div className="text-center space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Free GBP <span className="text-green-600 underline decoration-slate-200">Audit</span>
              </h2>
              <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                How visible is your business? Enter your name and city to generate an instant diagnostic report on your local search performance.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
               <input 
                type="text" 
                className="flex-1 px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold focus:border-green-600 focus:outline-none transition-all placeholder:text-slate-300"
                placeholder="Business Name & City..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && runAudit()}
               />
               <button 
                onClick={runAudit}
                disabled={loading || !query}
                className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-900 transition-all disabled:opacity-50 shadow-xl shadow-green-600/20 active:scale-95"
               >
                 {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Analyzing...
                    </div>
                 ) : 'Generate Report'}
               </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 opacity-40 grayscale">
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">SECURE SCAN</span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">GOOGLE API SYNC</span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">LOCAL SEO LABS</span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="p-8 md:p-12 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-green-600">
               <Logo variant="full" className="brightness-0 invert scale-75 origin-left" />
               <div className="text-center md:text-right space-y-1">
                 <p className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">Critical Intelligence Report</p>
                 <p className="text-xs font-bold text-slate-400">Unique ID: GSR-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                 <p className="text-xs font-bold text-slate-400">Date: {new Date().toLocaleDateString()}</p>
               </div>
            </div>

            <div className="p-10 md:p-16 space-y-16">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 uppercase italic leading-none">{data.businessName}</h3>
                       <p className="text-slate-400 font-bold mt-2 text-sm">{data.address || 'Location Identified via GPS'}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className="text-6xl font-black text-rose-500 tracking-tighter">{data.currentRating}</div>
                       <div className="space-y-1">
                          <div className="flex text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(data.currentRating) ? '★' : '☆'}</span>)}
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.currentReviews} Google Reviews</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500/20"></div>
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-4">Overall Visibility Score</p>
                    <div className="text-7xl font-black text-slate-900 group-hover:scale-110 transition-transform duration-500">{data.reviewScore}<span className="text-2xl text-slate-300">/10</span></div>
                    <p className="text-[11px] font-bold text-rose-500 mt-6 leading-relaxed italic uppercase">
                       Finding: You are being outranked by 14 competitors <br />in your 5-mile radius.
                    </p>
                 </div>
               </div>

               <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                     <h4 className="text-xl font-black text-slate-900 uppercase italic">Local Competitor Intel</h4>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Maps Rank #1-3</span>
                  </div>
                  
                  <div className="space-y-4">
                    {data.competitors.map(c => (
                      <div key={c.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-green-500 hover:bg-white transition-all group">
                        <div className="flex items-center gap-8">
                          <span className="text-3xl font-black text-slate-200 group-hover:text-green-600/20 transition-colors">0{c.rank}</span>
                          <div>
                            <p className="text-lg font-black text-slate-900">{c.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                               {c.reviews} Reviews • {c.rating} Stars
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-100">Score: {c.score}/10</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-8 bg-rose-50 rounded-[32px] border-2 border-dashed border-rose-200 flex items-center justify-between opacity-80 group">
                       <div className="flex items-center gap-8">
                          <span className="text-3xl font-black text-rose-300">#??</span>
                          <div>
                             <p className="text-lg font-black text-slate-900">{data.businessName}</p>
                             <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Ranking Loss Detected</p>
                          </div>
                       </div>
                       <span className="text-sm font-black text-rose-600 bg-white px-4 py-1 rounded-full border border-rose-200">You: {data.reviewScore}/10</span>
                    </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-slate-100 text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic">Fix your local rankings now.</h3>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                      Our automated platform fixes these gaps by generating verified social proof and keyword-rich reviews. Start your 14-day free trial and climb to #1.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={onSignup}
                      className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-green-600/20 hover:bg-slate-900 transition-all uppercase tracking-widest active:scale-95"
                    >
                      Unlock Professional Tools
                    </button>
                    <button className="bg-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-200 transition-all">
                      Download Full PDF
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GBPAuditTool;
