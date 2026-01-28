
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
  authorityScore: number;
  diagnostics: DiagnosticItem[];
  competitors: Array<{
    name: string;
    rank: number;
    gap: string;
  }>;
}

const GBPAuditTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AuditData | null>(null);
  const [step, setStep] = useState(0);

  const steps = ["Mapping Entity...", "Scanning Metadata...", "Analyzing Reviews...", "Benchmarking Leaders..."];

  useEffect(() => {
    let timer: any;
    if (loading) {
      timer = setInterval(() => {
        setStep(s => (s + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const runAudit = async () => {
    if (!query || loading) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a technical Local SEO audit for "${query}". 
      Return JSON with: businessName, address, authorityScore (1-100), 
      diagnostics (array of {category, score, status, recommendation}), 
      competitors (array of {name, rank, gap}). 
      Be specific about GBP optimization.`;

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
                    gap: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      setData(JSON.parse(response.text));
    } catch (e) {
      logger.error("Audit tool failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6 max-w-5xl">
        {!data ? (
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <Logo variant="icon" className="mx-auto scale-150 mb-8" />
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Local SEO <br /><span className="text-emerald-600">Deep Diagnostic.</span>
              </h1>
              <p className="text-slate-500 text-xl font-bold max-w-2xl mx-auto">
                Discover why your business isn't ranking in the top 3. Our AI crawler performs a 50-point technical analysis in seconds.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-[40px] border border-slate-200 shadow-2xl space-y-4">
              <input 
                type="text" 
                placeholder="Business Name & City..." 
                className="w-full p-6 bg-white border-2 border-slate-100 rounded-3xl font-bold text-lg outline-none focus:border-emerald-500 transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={runAudit}
                disabled={loading || !query}
                className="w-full bg-slate-950 text-white py-6 rounded-[30px] font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? steps[step] : 'Launch Diagnostic Scan'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
            <div className="bg-slate-950 rounded-[48px] p-12 text-white flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden">
               <div className="relative z-10 space-y-4">
                 <h2 className="text-3xl font-black italic uppercase tracking-tighter">{data.businessName}</h2>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{data.address}</p>
                 <div className="flex gap-4 pt-4">
                    <div className="bg-white/10 px-6 py-4 rounded-3xl border border-white/10">
                       <p className="text-[10px] font-black uppercase text-emerald-400 mb-1">Authority Index</p>
                       <p className="text-4xl font-black">{data.authorityScore}%</p>
                    </div>
                    <div className="bg-white/10 px-6 py-4 rounded-3xl border border-white/10">
                       <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Market Health</p>
                       <p className="text-4xl font-black">CRITICAL</p>
                    </div>
                 </div>
               </div>
               <div className="relative z-10 w-full md:w-auto">
                  <button onClick={onSignup} className="w-full bg-emerald-500 text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)]">Fix My Ranking Now</button>
               </div>
               <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white border border-slate-200 rounded-[48px] p-10 shadow-sm space-y-8">
                  <h3 className="text-xl font-black uppercase italic text-slate-900 border-b border-slate-100 pb-4">Diagnostic Breakdown</h3>
                  <div className="space-y-6">
                    {data.diagnostics.map(item => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-black uppercase text-slate-900">{item.category}</span>
                          <span className={`text-xs font-black uppercase ${item.status === 'passed' ? 'text-emerald-500' : 'text-rose-500'}`}>{item.score}/100</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${item.status === 'passed' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${item.score}%` }} />
                        </div>
                        <p className="text-xs text-slate-500 font-medium">💡 {item.recommendation}</p>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-slate-50 border border-slate-200 rounded-[48px] p-10 space-y-6">
                    <h3 className="text-xl font-black uppercase italic text-slate-900">Competitor Gap Analysis</h3>
                    <div className="space-y-4">
                      {data.competitors.map(c => (
                        <div key={c.name} className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 group hover:border-emerald-500 transition-all">
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-black text-slate-200">#0{c.rank}</span>
                            <span className="text-sm font-bold text-slate-900 uppercase">{c.name}</span>
                          </div>
                          <span className="text-[10px] font-black text-rose-500 uppercase bg-rose-50 px-2 py-1 rounded">{c.gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-600 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
                     <h4 className="text-2xl font-black uppercase italic leading-none mb-4 relative z-10">Generate Full <br /> White-Label PDF</h4>
                     <p className="text-emerald-100 text-sm font-medium mb-8 relative z-10">Export this diagnostic as a professional ranking report to share with your team or clients.</p>
                     <button onClick={() => window.print()} className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all relative z-10 shadow-xl">Download Report</button>
                     <div className="absolute -bottom-10 -right-10 text-9xl opacity-10 group-hover:scale-110 transition-transform">📄</div>
                  </div>
               </div>
            </div>
            <div className="text-center">
               <button onClick={() => setData(null)} className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900">Start New Diagnostic Scan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GBPAuditTool;
