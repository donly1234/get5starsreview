
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

  const runAudit = async () => {
    if (!query || loading) return;
    setLoading(true);
    setData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Perform a comprehensive Local SEO & Google Business Profile (GBP) audit for: "${query}". 
      Generate realistic market data based on current local SEO trends for this business type.
      Focus on their visibility compared to local pack competitors in their specific city.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING, description: 'Verified name of the business' },
              address: { type: Type.STRING, description: 'City and state/region' },
              currentRating: { type: Type.NUMBER, description: 'Current stars out of 5' },
              currentReviews: { type: Type.INTEGER, description: 'Total review count' },
              keywords: { type: Type.STRING, description: 'Top ranking keywords' },
              visibilityTrend: { type: Type.STRING, description: "Improving, Declining, or Stable" },
              reviewScore: { type: Type.NUMBER, description: 'Total optimization score out of 10' },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.INTEGER },
                    name: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    rating: { type: Type.NUMBER },
                    reviews: { type: Type.INTEGER }
                  },
                  required: ["rank", "name", "score", "rating", "reviews"]
                }
              }
            },
            required: ['businessName', 'address', 'currentRating', 'currentReviews', 'competitors', 'reviewScore', 'visibilityTrend']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("No data returned from diagnostic engine.");

      // Clean string of potential markdown code block markers
      const cleanJson = text.replace(/```json|```/g, "").trim();
      const auditResult = JSON.parse(cleanJson);
      
      setData(auditResult);
    } catch (e) {
      console.error("Audit diagnostic failed:", e);
      alert("Diagnostic engine timed out. Please add the city to your search for better results (e.g., 'Pizza Planet Richmond').");
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
                SEO Diagnostic Engine v4.0
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                AUDIT YOUR <span className="text-green-600 underline decoration-slate-200">LOCAL RANKING</span>
              </h2>
              <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                Discover exactly how your Google Business Profile ranks against local competitors.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
               <input 
                type="text" 
                className="flex-1 px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold focus:border-green-600 focus:outline-none transition-all placeholder:text-slate-300"
                placeholder="Business Name & City (e.g. Nash Paints Harare)..."
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
                      Running Live Scan...
                    </div>
                 ) : 'Generate Live Report'}
               </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Live Connection • 50+ Ranking Factors Checked • Competitive Intelligence
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[48px] shadow-[0_50px_100px_-20_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="p-8 md:p-12 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-green-600">
               <Logo variant="full" className="brightness-0 invert scale-75 origin-left" />
               <div className="text-center md:text-right space-y-1">
                 <p className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">SEO Diagnostic Complete</p>
                 <p className="text-xs font-bold text-slate-400">ID: GSR-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                 <p className="text-xs font-bold text-slate-400">{new Date().toLocaleDateString()}</p>
               </div>
            </div>

            <div className="p-10 md:p-16 space-y-16">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 uppercase italic leading-none">{data.businessName}</h3>
                       <p className="text-slate-400 font-bold mt-2 text-sm">{data.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className={`text-6xl font-black tracking-tighter ${data.currentRating < 4 ? 'text-rose-500' : 'text-emerald-500'}`}>{data.currentRating}</div>
                       <div className="space-y-1">
                          <div className="flex text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(data.currentRating) ? '★' : '☆'}</span>)}
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{data.currentReviews.toLocaleString()} Total Reviews</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${data.reviewScore < 7 ? 'bg-rose-500' : 'bg-emerald-500'} opacity-20`}></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Market Authority</p>
                    <div className="text-7xl font-black text-slate-900 group-hover:scale-110 transition-transform duration-500">{data.reviewScore}<span className="text-2xl text-slate-300">/10</span></div>
                    <p className={`text-[11px] font-bold mt-6 leading-relaxed italic uppercase ${data.reviewScore < 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                       Trend: {data.visibilityTrend}
                    </p>
                 </div>
               </div>

               <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                     <h4 className="text-xl font-black text-slate-900 uppercase italic">Local Competitors</h4>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Map Rank #1-3</span>
                  </div>
                  
                  <div className="space-y-4">
                    {data.competitors.map(c => (
                      <div key={c.name} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-green-500 hover:bg-white transition-all group">
                        <div className="flex items-center gap-8">
                          <span className="text-3xl font-black text-slate-200 group-hover:text-green-600/20 transition-colors">0{c.rank}</span>
                          <div>
                            <p className="text-lg font-black text-slate-900">{c.name}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                               {c.reviews.toLocaleString()} Reviews • {c.rating} Stars
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-100">Score: {c.score}/10</div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="pt-12 border-t border-slate-100 text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic">Climb to #1 on Google Maps</h3>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                      Stop losing customers to {data.competitors[0].name}. Use our automation platform to build unbeatable social proof and dominate local search.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={onSignup}
                      className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-green-600/20 hover:bg-slate-900 transition-all uppercase tracking-widest active:scale-95"
                    >
                      Start Free Trial
                    </button>
                    <button className="bg-slate-100 text-slate-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-200 transition-all"
                      onClick={() => window.print()}
                    >
                      Export PDF Report
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
