
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
  const [data, setData] = useState<AuditData | null>(null);

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

      // Robust JSON extraction: Find the first '{' and last '}'
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("Invalid response format");
      
      const auditResult = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      
      // Extract verification sources
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const urls = groundingChunks?.map((c: any) => c.web?.uri).filter(Boolean) || [];
      
      setData({
        ...auditResult,
        groundingUrls: urls.slice(0, 4)
      });
    } catch (e) {
      console.error("Audit processing error:", e);
      alert("We couldn't generate the audit report. Please try a more specific search including city (e.g. 'Paints Harare').");
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
                Live Diagnostic Core v5.1
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                AUDIT YOUR <span className="text-green-600 underline decoration-slate-200">LOCAL RANKING</span>
              </h2>
              <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
                Scan Google Maps in real-time to see where your business stands against local competitors.
              </p>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-[32px] shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
               <input 
                type="text" 
                className="flex-1 px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold focus:border-green-600 focus:outline-none transition-all placeholder:text-slate-300"
                placeholder="Enter Business Name & City (e.g. Nash Paints Harare)..."
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
                 ) : 'Get Live SEO Report'}
               </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Verified Data • Competitor Benchmarking • Real-Time Map Positioning
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[48px] shadow-[0_50px_100px_-20_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
            <div className="p-8 md:p-12 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-green-600">
               <Logo variant="full" className="brightness-0 invert scale-75 origin-left" />
               <div className="text-center md:text-right space-y-1">
                 <p className="text-[10px] font-black uppercase text-green-500 tracking-[0.3em]">SEO Diagnostic Complete</p>
                 <p className="text-xs font-bold text-slate-400">ID: GSR-LIVE-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                 <p className="text-xs font-bold text-slate-400">{new Date().toLocaleDateString()}</p>
               </div>
            </div>

            <div className="p-10 md:p-16 space-y-16">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="space-y-6">
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 uppercase italic leading-none">{data.businessName}</h3>
                       <p className="text-slate-400 font-bold mt-2 text-sm">{data.address || 'Local Market Identified'}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className={`text-6xl font-black tracking-tighter ${data.currentRating < 4 ? 'text-rose-500' : 'text-emerald-500'}`}>{data.currentRating || 'N/A'}</div>
                       <div className="space-y-1">
                          <div className="flex text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => <span key={i}>{i < Math.floor(data.currentRating || 0) ? '★' : '☆'}</span>)}
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{(data.currentReviews || 0).toLocaleString()} Verified Reviews</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex flex-col items-center text-center relative overflow-hidden group">
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${data.reviewScore < 7 ? 'bg-rose-500' : 'bg-emerald-500'} opacity-20`}></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Authority Index</p>
                    <div className="text-7xl font-black text-slate-900 group-hover:scale-110 transition-transform duration-500">{data.reviewScore}<span className="text-2xl text-slate-300">/10</span></div>
                    <p className={`text-[11px] font-bold mt-6 leading-relaxed italic uppercase ${data.reviewScore < 7 ? 'text-rose-500' : 'text-emerald-500'}`}>
                       Visibility: {data.visibilityTrend}
                    </p>
                 </div>
               </div>

               <div className="space-y-8">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                     <h4 className="text-xl font-black text-slate-900 uppercase italic">Local Search Landscape</h4>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Map Top 3 Benchmarking</span>
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

               {data.groundingUrls && data.groundingUrls.length > 0 && (
                 <div className="pt-8 space-y-4">
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Sources & Verified Links</h5>
                    <div className="flex flex-wrap gap-2">
                       {data.groundingUrls.map((url, i) => (
                         <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all truncate max-w-[200px]">
                           {new URL(url).hostname}
                         </a>
                       ))}
                    </div>
                 </div>
               )}

               <div className="pt-12 border-t border-slate-100 text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic">Outrank {data.competitors[0].name}</h3>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                      Your business currently ranks below the market leaders. Automate your reputation growth and climb to #1 with Get5StarsReview.
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
