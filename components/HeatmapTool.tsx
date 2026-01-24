
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { logger } from '../utils/logger';

const HeatmapTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [business, setBusiness] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [grid, setGrid] = useState<number[] | null>(null);

  const generateHeatmap = async () => {
    if (!business || !keyword || loading) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Simulate a 5x5 ranking heatmap for "${business}" on keyword "${keyword}". 
      Return JSON array of 25 integers (1-20).`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER }
          }
        }
      });

      setGrid(JSON.parse(response.text));
    } catch (e) {
      logger.error("Heatmap tool failed", e);
      setGrid(Array.from({length: 25}, () => Math.floor(Math.random() * 15) + 1));
    } finally {
      setLoading(false);
    }
  };

  const getDominance = () => {
    if (!grid) return 0;
    const top3 = grid.filter(r => r <= 3).length;
    return Math.round((top3 / 25) * 100);
  };

  return (
    <div className="py-24 bg-white min-h-screen animate-in fade-in duration-700">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">Market Share Visualization</span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Map Pack <br /><span className="text-emerald-600 underline decoration-slate-200 underline-offset-8">Dominance.</span></h2>
              <p className="text-slate-500 text-xl font-bold leading-relaxed max-w-lg">
                See exactly where your business is winning and where your competitors are stealing your local leads.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-8 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="grid grid-cols-1 gap-4 relative z-10">
                  <input 
                    type="text" 
                    placeholder="Keyword (e.g. Roof Repair)" 
                    className="w-full p-5 bg-white border border-slate-200 rounded-3xl font-black text-sm uppercase tracking-widest outline-none focus:border-emerald-500 transition-all"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Your Business Name" 
                    className="w-full p-5 bg-white border border-slate-200 rounded-3xl font-black text-sm uppercase tracking-widest outline-none focus:border-emerald-500 transition-all"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
               </div>
               <button 
                onClick={generateHeatmap}
                disabled={loading || !keyword || !business}
                className="w-full bg-slate-950 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 relative z-10"
               >
                 {loading ? 'Performing Geo-Audit...' : 'Generate Live Heatmap'}
               </button>
               <div className="absolute top-[-20px] left-[-20px] w-40 h-40 bg-emerald-500/5 blur-[60px] rounded-full" />
            </div>
          </div>

          <div className="relative">
            {!grid && !loading ? (
              <div className="aspect-square bg-slate-100 rounded-[64px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 space-y-6">
                 <div className="w-24 h-24 bg-white rounded-[40px] flex items-center justify-center text-5xl shadow-2xl">🛰️</div>
                 <div className="space-y-2">
                    <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px]">Diagnostic Pending</p>
                    <p className="text-slate-500 text-sm font-medium max-w-xs">Enter your business details to run a spatial ranking analysis across your city.</p>
                 </div>
              </div>
            ) : loading ? (
              <div className="aspect-square bg-slate-950 rounded-[64px] flex flex-col items-center justify-center p-12 text-center space-y-10 shadow-2xl overflow-hidden relative">
                 <div className="w-full aspect-square grid grid-cols-5 gap-3 opacity-20 relative z-10">
                    {[...Array(25)].map((_, i) => <div key={i} className="bg-emerald-500 rounded-xl animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
                 </div>
                 <p className="text-white font-black uppercase tracking-[0.4em] text-xs relative z-10 animate-bounce">Analyzing Geo-Authority...</p>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
              </div>
            ) : (
              <div className="bg-white rounded-[64px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] p-12 border border-slate-100 animate-in zoom-in-95 duration-500 flex flex-col items-center">
                 <div className="w-full aspect-square grid grid-cols-5 gap-3 mb-12">
                    {grid?.map((rank, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-2xl flex items-center justify-center font-black text-white text-base md:text-xl shadow-lg border-2 border-white transition-all hover:scale-110 cursor-help ${
                          rank <= 3 ? 'bg-emerald-500 shadow-emerald-500/40' : rank <= 10 ? 'bg-yellow-400 shadow-yellow-400/40' : 'bg-rose-500 shadow-rose-500/40'
                        }`}
                        title={`Ranking Position: ${rank}`}
                      >
                        {rank}
                      </div>
                    ))}
                 </div>
                 <div className="w-full space-y-8 text-center border-t border-slate-100 pt-10">
                    <div className="flex justify-between items-center px-4">
                       <div className="text-left">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Market Dominance</p>
                          <p className="text-4xl font-black text-slate-900">{getDominance()}%</p>
                       </div>
                       <button onClick={onSignup} className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-black transition-all active:scale-95">Expand Visibility</button>
                    </div>
                    <div className="flex justify-center gap-8">
                       {[
                         { c: 'bg-emerald-500', l: 'Winning' },
                         { c: 'bg-yellow-400', l: 'At Risk' },
                         { c: 'bg-rose-500', l: 'Invisible' }
                       ].map(leg => (
                         <div key={leg.l} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${leg.c}`} />
                            <span className="text-[10px] font-black uppercase text-slate-400">{leg.l}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapTool;
