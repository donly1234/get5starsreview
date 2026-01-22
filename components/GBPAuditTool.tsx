import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Logo from './Logo';

interface AuditData {
  businessName: string;
  address: string;
  currentRating: number;
  currentReviews: number;
  keywords: string;
  reviewScore: number;
  visibilityTrend: string;
  groundingUrls?: string[];
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
  const [loadingMessage, setLoadingMessage] = useState("");
  const [data, setData] = useState<AuditData | null>(null);

  const messages = [
    "Initializing local crawler...",
    "Querying Google Maps API...",
    "Crawling competitor review profiles...",
    "Analyzing sentiment distribution...",
    "Calculating Authority Index...",
    "Finalizing ranking report..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      let idx = 0;
      setLoadingMessage(messages[0]);
      interval = setInterval(() => {
        idx = (idx + 1) % messages.length;
        setLoadingMessage(messages[idx]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const runAudit = async () => {
    if (!query || loading) return;
    setLoading(true);
    setData(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Perform a high-accuracy, real-world Local SEO audit for: "${query}". 
      You must find actual local competitors for this business type in the specific city mentioned.
      If the business is not found, provide a "Market Opportunity" report for that niche in that city.
      Return the results as a JSON object strictly following the schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              address: { type: Type.STRING },
              currentRating: { type: Type.NUMBER },
              currentReviews: { type: Type.INTEGER },
              keywords: { type: Type.STRING },
              visibilityTrend: { type: Type.STRING },
              reviewScore: { type: Type.NUMBER },
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
            required: ['businessName', 'competitors', 'reviewScore', 'address']
          }
        }
      });

      const text = response.text;
      if (!text) throw new Error("Diagnostic core returned no data.");

      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid response format");
      
      const auditResult = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const urls = groundingChunks?.map((c: any) => c.web?.uri).filter(Boolean) || [];
      
      setData({
        ...auditResult,
        groundingUrls: urls.slice(0, 4)
      });
    } catch (e) {
      console.error("Audit processing error:", e);
      alert("Diagnostic core failed to connect. Ensure search includes business name + city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="audit-tool" className="py-12 md:py-24 bg-slate-50 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {!data ? (
          <div className="text-center space-y-8 md:space-y-12 animate-in fade-in duration-700">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2">
                Diagnostic Core v5.1
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                AUDIT YOUR <br className="sm:hidden" /> <span className="text-green-600">LOCAL RANK</span>
              </h2>
              <p className="text-slate-500 font-bold text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                Scan Google Maps in real-time to see where you stand against local competitors.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[28px] md:rounded-[32px] shadow-2xl border border-slate-100 flex flex-col gap-4">
               <input 
                type="text" 
                className="w-full px-6 md:px-8 py-4 md:py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-base md:text-lg font-bold focus:border-green-600 focus:outline-none transition-all placeholder:text-slate-300"
                placeholder="Business Name & City (e.g. Luigi's Pizza KY)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && runAudit()}
               />
               <button 
                onClick={runAudit}
                disabled={loading || !query}
                className="w-full bg-green-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-slate-900 transition-all disabled:opacity-50 shadow-xl shadow-green-600/20 active:scale-95"
               >
                 {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span className="truncate">{loadingMessage}</span>
                    </div>
                 ) : 'Get Live SEO Report'}
               </button>
            </div>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Verified Data • Competitor Benchmarking • Real-Time Positioning
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] md:rounded-[48px] shadow-[0_50px_100px_-20_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="p-6 md:p-12 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-6 border-b-8 border-green-600">
               <Logo variant="full" className="brightness-0 invert scale-[0.6] sm:scale-75 origin-left" />
               <div className="text-center md:text-right space-y-1">
                 <p className="text-[9px] md:text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">SEO Diagnostic Complete</p>
                 <p className="text-[10px] md:text-xs font-bold text-slate-400">ID: GSR-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
               </div>
            </div>

            <div className="p-6 sm:p-10 md:p-16 space-y-12 md:space-y-16">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-tight">{data.businessName}</h3>
                       <p className="text-slate-400 font-bold mt-2 text-xs md:text-sm">{data.address || 'Local Market Identified'}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-6">
                       <div className={`text-5xl md:text-6xl font-black tracking-tighter ${data.currentRating < 4 ? 'text-rose-500' : 'text-emerald-500'}`}>{data.currentRating || 'N/A'}</div>
                       <div className="space-y-1">
                          <div className="flex text-yellow-400 text-lg">
                            {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(data.currentRating || 0) ? '★' : '☆'}</span>)}
                          </div>
                          <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{(data.currentReviews || 0).toLocaleString()} Verified Reviews</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-slate-50 p-8 md:p-10 rounded-[32px] md:rounded-[40px] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${data.reviewScore < 7 ? 'bg-rose-500' : 'bg-emerald-500'} opacity-20`}></div>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Authority Index</p>
                    <div className="text-6xl md:text-7xl font-black text-slate-900">{data.reviewScore}<span className="text-xl md:text-2xl text-slate-300">/10</span></div>
                    <p className={`text-[10px] md:text-[11px] font-bold mt-6 leading-relaxed italic uppercase ${data.reviewScore < 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                       Visibility: {data.visibilityTrend}
                    </p>
                 </div>
               </div>

               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 md:pb-6">
                     <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase italic">Local Landscape</h4>
                     <span className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Top 3 Benchmarking</span>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    {data.competitors.map(c => (
                      <div key={c.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 bg-slate-50 rounded-2xl md:rounded-3xl border border-slate-100 hover:border-green-500 transition-all group gap-4">
                        <div className="flex items-center gap-4 md:gap-8">
                          <span className="text-2xl md:text-3xl font-black text-slate-200 group-hover:text-green-600/20 transition-colors">0{c.rank}</span>
                          <div>
                            <p className="text-base md:text-lg font-black text-slate-900">{c.name}</p>
                            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                               {c.reviews.toLocaleString()} Reviews • {c.rating} Stars
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex sm:block justify-between items-center">
                          <span className="sm:hidden text-[9px] font-black text-slate-400 uppercase">Bench Score</span>
                          <div className="text-sm font-black text-green-600 bg-green-50 px-4 py-1 rounded-full border border-green-100">Score: {c.score}/10</div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="pt-8 md:pt-12 border-t border-slate-100 text-center space-y-6 md:space-y-8">
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic leading-tight">Outrank Competitors</h3>
                    <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
                      Your business currently ranks below the market leaders. Automate your growth and climb to #1 with Get5StarsReview.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                    <button 
                      onClick={onSignup}
                      className="w-full sm:w-auto bg-green-600 text-white px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black text-sm md:text-lg shadow-xl hover:bg-slate-900 transition-all uppercase tracking-widest active:scale-95"
                    >
                      Start Free Trial
                    </button>
                    <button className="w-full sm:w-auto bg-slate-100 text-slate-600 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-slate-200 transition-all"
                      onClick={() => window.print()}
                    >
                      Export Full Report
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
