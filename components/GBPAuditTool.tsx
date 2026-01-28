
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { logger } from './logger';
import Logo from './Logo';

interface DiagnosticItem {
  category: string;
  score: number;
  status: 'passed' | 'warning' | 'critical';
  recommendation: string;
}

interface AuditData {
  businessName: string;
  address: string;
  rating: number;
  reviews: number;
  authorityScore: number;
  diagnostics: DiagnosticItem[];
  competitors: Array<{
    name: string;
    rank: number;
    rating: number;
    reviews: number;
    gap: string;
  }>;
}

const GBPAuditTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuditData | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [step, setStep] = useState(0);

  const steps = ["Decrypting Entity...", "Scraping SERP Data...", "Analyzing G-Maps Data...", "Mapping Local Leaders..."];

  useEffect(() => {
    let timer: any;
    if (loading) {
      timer = setInterval(() => setStep(s => (s + 1) % steps.length), 2000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const runAudit = async () => {
    if (!query || loading) return;
    setLoading(true);
    setSources([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a technical Local SEO audit for "${query}". 
      1. Find the REAL Google rating and review count.
      2. Identify the top 3 competitors in that city.
      3. Return JSON: { businessName, address, rating, reviews, authorityScore, diagnostics: [{category, score, status, recommendation}], competitors: [{name, rank, rating, reviews, gap}] }.
      Be specific. Use real-time search grounding for high accuracy.`;

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
              rating: { type: Type.NUMBER },
              reviews: { type: Type.NUMBER },
              authorityScore: { type: Type.NUMBER },
              diagnostics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    category: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    status: { type: Type.STRING },
                    recommendation: { type: Type.STRING }
                  }
                }
              },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    rank: { type: Type.NUMBER },
                    rating: { type: Type.NUMBER },
                    reviews: { type: Type.NUMBER },
                    gap: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extractedSources = chunks.filter((c: any) => c.web).map((c: any) => c.web);
      
      setSources(extractedSources);
      setData(JSON.parse(response.text));
    } catch (e) {
      logger.error("Audit tool failed", e);
      alert("Grounding error: Please provide a more specific business name and city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6 max-w-6xl">
        {!data ? (
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <Logo variant="icon" className="mx-auto scale-150 mb-8" />
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Local SEO <br /><span className="text-emerald-600">Geo-Audit.</span></h1>
              <p className="text-slate-500 text-xl font-bold max-w-2xl mx-auto leading-relaxed">Decrypt your local ranking factors instantly. Our AI scans real-time search data to find your visibility gaps.</p>
            </div>
            <div className="max-w-2xl mx-auto bg-white p-4 rounded-[48px] border-2 border-slate-100 shadow-3xl space-y-2 flex flex-col md:flex-row items-center">
              <input type="text" placeholder="Business Name & City..." className="flex-1 p-6 md:p-8 bg-transparent text-xl font-black uppercase tracking-widest outline-none" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && runAudit()} />
              <button onClick={runAudit} disabled={loading || !query} className="bg-slate-950 text-white px-10 py-6 md:py-8 rounded-[40px] font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap">
                {loading ? 'Decrypting...' : 'Launch Audit'}
              </button>
            </div>
            {loading && (
              <div className="space-y-4">
                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em]">{steps[step]}</p>
                <div className="w-64 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden"><div className="h-full bg-emerald-500 w-1/2 animate-[loading_2s_infinite]" /></div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-950 rounded-[56px] p-8 md:p-16 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative overflow-hidden shadow-3xl">
               <div className="relative z-10 space-y-6">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">{data.businessName}</h2>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <div className="bg-white/5 backdrop-blur-xl px-8 py-6 rounded-3xl border border-white/10 shadow-inner">
                       <p className="text-[10px] font-black uppercase text-emerald-400 mb-1 tracking-widest">Authority</p>
                       <p className="text-5xl font-black">{data.authorityScore}%</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl px-8 py-6 rounded-3xl border border-white/10 shadow-inner">
                       <p className="text-[10px] font-black uppercase text-yellow-400 mb-1 tracking-widest">Rating</p>
                       <p className="text-5xl font-black">{data.rating}★</p>
                    </div>
                 </div>
               </div>
               <div className="relative z-10 w-full md:w-auto">
                  <button onClick={onSignup} className="w-full bg-emerald-500 text-white px-16 py-8 rounded-[32px] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-xl">Claim #1 Spot Now</button>
               </div>
               <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="bg-white border-2 border-slate-50 rounded-[48px] p-8 md:p-12 shadow-xl space-y-10">
                  <h3 className="text-2xl font-black uppercase italic text-slate-900 border-b border-slate-100 pb-6">Technical Diagnostics</h3>
                  <div className="space-y-8">
                    {data.diagnostics.map(item => (
                      <div key={item.category} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-900">{item.category}</span>
                          <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${item.status === 'passed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{item.score}/100</span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-[2s] ${item.status === 'passed' ? 'bg-emerald-500 shadow-lg' : 'bg-rose-500'}`} style={{ width: `${item.score}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic">Recommendation: {item.recommendation}</p>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="bg-slate-50 border border-slate-100 rounded-[48px] p-8 md:p-12 space-y-8 shadow-sm">
                    <h3 className="text-2xl font-black uppercase italic text-slate-900">Market Displacement</h3>
                    <div className="space-y-4">
                      {data.competitors.map(c => (
                        <div key={c.name} className="flex items-center justify-between p-6 bg-white rounded-[32px] border border-slate-100 group hover:border-emerald-500 transition-all shadow-sm">
                          <div className="flex items-center gap-6">
                            <span className="text-4xl font-black text-slate-100 group-hover:text-emerald-500/10 transition-colors">#0{c.rank}</span>
                            <div>
                               <span className="text-sm font-black text-slate-900 uppercase truncate max-w-[150px] block">{c.name}</span>
                               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 block">{c.reviews} reviews • {c.rating}★</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">{c.gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {sources.length > 0 && (
              <div className="pt-12 border-t border-slate-100 space-y-6">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Verified SERP Intelligence
                 </h4>
                 <div className="flex flex-wrap gap-3">
                    {sources.map((s, idx) => (
                      <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-600 hover:text-white hover:bg-emerald-600 font-bold bg-white px-5 py-2.5 rounded-2xl border-2 border-emerald-50 transition-all shadow-sm flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        {s.title || s.uri}
                      </a>
                    ))}
                 </div>
              </div>
            )}
            <div className="text-center pt-8">
               <button onClick={() => { setData(null); setSources([]); }} className="text-slate-300 font-black uppercase tracking-widest text-[10px] hover:text-slate-900">Start New Cycle</button>
            </div>
          </div>
        )}
      </div>
      <style>{` @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } } `}</style>
    </div>
  );
};

export default GBPAuditTool;
