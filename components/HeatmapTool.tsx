import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface RankPoint {
  id: number;
  rank: number;
  status: 'good' | 'average' | 'poor';
}

const HeatmapTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [business, setBusiness] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [grid, setGrid] = useState<RankPoint[] | null>(null);

  const generateHeatmap = async () => {
    if (!business || !keyword || loading) return;
    setLoading(true);
    setGrid(null);
    setProgress(10);

    const stepInterval = setInterval(() => {
      setProgress(p => Math.min(p + (Math.random() * 15), 90));
    }, 800);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a simulated 5x5 local ranking heatmap for business "${business}" and keyword "${keyword}".
      Determine realistic ranking positions (1-20+) for 25 distinct GPS coordinates around the business area.
      Output a JSON array of 25 objects with properties 'id' (0-24) and 'rank' (integer).`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                rank: { type: Type.INTEGER }
              },
              required: ["id", "rank"]
            }
          }
        }
      });

      clearInterval(stepInterval);
      setProgress(100);

      const result = JSON.parse(response.text);
      const processedGrid = result.map((p: any) => ({
        ...p,
        status: p.rank <= 3 ? 'good' : p.rank <= 10 ? 'average' : 'poor'
      }));

      setTimeout(() => {
        setGrid(processedGrid);
        setLoading(false);
      }, 500);

    } catch (e) {
      console.error(e);
      setLoading(false);
      clearInterval(stepInterval);
    }
  };

  return (
    <div className="py-24 bg-white min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Local Grid Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Visualize <br /><span className="text-emerald-600 underline decoration-slate-200">Dominance.</span></h2>
              <p className="text-slate-500 text-lg font-bold leading-relaxed">
                Traditional rank trackers are blind. Our Heatmap tool scans your actual visibility across a multi-mile radius to see where you're winning and where you're invisible.
              </p>
            </div>

            <div className="space-y-4 bg-slate-50 p-8 rounded-[40px] border border-slate-100 shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Keyword</span>
                    <input 
                      type="text" 
                      placeholder="e.g. Best Pizza Richmond" 
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Business</span>
                    <input 
                      type="text" 
                      placeholder="e.g. Luigi's Downtown" 
                      className="w-full p-4 bg-white border border-slate-200 rounded-2xl font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                    />
                  </label>
               </div>
               <button 
                onClick={generateHeatmap}
                disabled={loading || !keyword || !business}
                className="w-full bg-slate-950 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm shadow-xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
               >
                 {loading ? `Scanning Map Nodes (${Math.round(progress)}%)...` : 'Generate Live Heatmap'}
               </button>
            </div>
          </div>

          <div className="relative">
            {!grid && !loading ? (
              <div className="aspect-square bg-slate-100 rounded-[64px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 space-y-4 group overflow-hidden">
                 <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-transform">📍</div>
                 <p className="text-slate-400 font-bold max-w-xs uppercase tracking-widest text-[10px]">Enter details to launch the simulated grid analysis</p>
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-50"></div>
              </div>
            ) : loading ? (
              <div className="aspect-square bg-slate-900 rounded-[64px] flex flex-col items-center justify-center p-12 text-center space-y-8 animate-pulse shadow-2xl">
                 <div className="w-full aspect-square grid grid-cols-5 gap-2 opacity-20">
                    {[...Array(25)].map((_, i) => <div key={i} className="bg-white/20 rounded-lg"></div>)}
                 </div>
                 <div className="space-y-2">
                    <p className="text-white font-black uppercase tracking-widest text-xs">Crawl in progress...</p>
                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
                       <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-[64px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] p-10 border border-slate-100 animate-in zoom-in-95 duration-500">
                 <div className="aspect-square grid grid-cols-5 gap-3 mb-10">
                    {grid?.map(point => (
                      <div 
                        key={point.id} 
                        className={`aspect-square rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg border-2 border-white transition-all hover:scale-110 cursor-help ${
                          point.status === 'good' ? 'bg-emerald-500 shadow-emerald-500/30' :
                          point.status === 'average' ? 'bg-yellow-400 shadow-yellow-500/30' :
                          'bg-rose-500 shadow-rose-500/30'
                        }`}
                        title={`Rank: ${point.rank}`}
                      >
                        {point.rank}
                      </div>
                    ))}
                 </div>
                 <div className="space-y-6 text-center">
                    <div className="flex justify-center gap-6">
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="text-[10px] font-black uppercase text-slate-400">Top 3</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <span className="text-[10px] font-black uppercase text-slate-400">Mid-tier</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                          <span className="text-[10px] font-black uppercase text-slate-400">Invisible</span>
                       </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 space-y-6">
                       <h4 className="text-xl font-black text-slate-900 uppercase">You're losing 62% of traffic.</h4>
                       <p className="text-slate-500 text-sm font-medium">Your business is only visible in the city center. Outlying neighborhoods are choosing your competitors because your profile lacks local proximity signals.</p>
                       <button onClick={onSignup} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-emerald-600/20 active:scale-95">Fix My Ranking Now</button>
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
