
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface AIStrategyManagerProps {
  profile: any;
}

interface StrategyTask {
  id: string;
  week: number;
  text: string;
  completed: boolean;
}

interface Strategy {
  summary: string;
  weeks: Array<{
    week: number;
    title: string;
    tasks: string[];
  }>;
  proTips: string[];
}

const AIStrategyManager: React.FC<AIStrategyManagerProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('g5sr_active_strategy');
    if (saved) {
      // Check if current strategy in storage matches current generation (simplified)
      setIsActivated(true);
    }
  }, []);

  const generateStrategy = async () => {
    setLoading(true);
    setError(null);
    setIsActivated(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a world-class reputation management consultant. 
      Create a highly effective 30-day reputation growth and Google Maps ranking strategy for a business.
      
      BUSINESS CONTEXT:
      - Name: ${profile?.business_name || 'Our Valued Client'}
      - Industry: ${profile?.industry || 'Service'}
      - Current State: ${profile?.status === 'trial' ? 'New user starting automation' : 'Existing professional user'}

      INSTRUCTIONS:
      1. Analyze the industry nuances.
      2. Provide a cohesive summary of the 30-day objective.
      3. Breakdown the strategy into 4 distinct weeks with 3-4 specific tasks each.
      4. Include 3 high-impact 'Pro Tips' that are specific to this industry.
      
      The output MUST be a JSON object strictly following the response schema.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              weeks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["week", "title", "tasks"]
                }
              },
              proTips: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["summary", "weeks", "proTips"]
          }
        }
      });

      if (response.text) {
        setStrategy(JSON.parse(response.text));
      }
    } catch (err: any) {
      console.error("Strategy Generation Failed:", err);
      setError("The AI Intelligence core is busy. Please try generating your strategy again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const activateStrategy = () => {
    if (!strategy) return;
    
    const flattenedTasks: StrategyTask[] = strategy.weeks.flatMap(w => 
      w.tasks.map((t, i) => ({
        id: `task-w${w.week}-${i}`,
        week: w.week,
        text: t,
        completed: false
      }))
    );

    localStorage.setItem('g5sr_active_strategy', JSON.stringify({
      businessName: profile?.business_name,
      activatedAt: new Date().toISOString(),
      tasks: flattenedTasks,
      summary: strategy.summary
    }));

    setIsActivated(true);
    alert("Strategy Activated! Your tasks have been added to your Dashboard checklist.");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
            AI Strategy Consultant
            <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">AI Live</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">Personalized 30-day growth blueprints powered by Gemini Intelligence.</p>
        </div>
        {!strategy && !loading && (
          <button 
            onClick={generateStrategy}
            className="bg-black text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-xl shadow-black/10 active:scale-95"
          >
            Generate Blueprint
          </button>
        )}
      </div>

      {!strategy && !loading && (
        <div className="bg-white p-12 rounded-[48px] border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-6">
           <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-5xl">🧠</div>
           <div className="space-y-2">
             <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tight">Ready for a roadmap?</h3>
             <p className="text-slate-500 max-w-md mx-auto font-medium">Our AI analyzes your business industry and profile to build a custom schedule for review collection and GBP optimization.</p>
           </div>
           <button 
            onClick={generateStrategy}
            className="bg-emerald-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-black transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
           >
             Launch Strategy Engine
           </button>
        </div>
      )}

      {loading && (
        <div className="bg-slate-950 p-16 rounded-[48px] text-white flex flex-col items-center text-center space-y-10 shadow-2xl overflow-hidden relative">
           <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500 overflow-hidden">
              <div className="h-full bg-white/40 w-1/3 animate-[loading_2s_infinite]" />
           </div>
           <div className="w-32 h-32 bg-emerald-600/20 rounded-full flex items-center justify-center relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin relative z-10"></div>
           </div>
           <div className="space-y-4 relative z-10">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">Analyzing {profile?.industry || 'Market'} Trends...</h3>
              <p className="text-slate-400 font-medium max-w-sm mx-auto">Gemini is constructing your 30-day growth plan based on 50+ local search ranking factors.</p>
           </div>
           <div className="flex gap-2 text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
              <span>Checking Keywords</span> • <span>Optimizing Velocity</span> • <span>Mapping Competitors</span>
           </div>
        </div>
      )}

      {error && (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-600 text-center font-bold animate-in shake duration-500">
          {error}
          <button onClick={generateStrategy} className="block mx-auto mt-4 underline text-rose-700">Retry Generation</button>
        </div>
      )}

      {strategy && !loading && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
           <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 flex gap-3">
                 <button 
                  onClick={() => window.print()}
                  className="bg-slate-100 text-slate-900 p-4 rounded-2xl hover:bg-black hover:text-white transition-all shadow-sm"
                  title="Print Strategy"
                 >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                 </button>
                 <button 
                  onClick={activateStrategy}
                  disabled={isActivated}
                  className={`px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-sm flex items-center gap-2 ${isActivated ? 'bg-emerald-100 text-emerald-600 cursor-default' : 'bg-black text-white hover:bg-emerald-600'}`}
                 >
                    {isActivated ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                        Activated
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        Activate Plan
                      </>
                    )}
                 </button>
              </div>

              <div className="max-w-3xl space-y-12">
                 <div className="space-y-4">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Consultant Memo</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter uppercase italic">30-Day Growth <br /> <span className="text-emerald-600">Strategy Blueprint</span></h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">"{strategy.summary}"</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {strategy.weeks.map(w => (
                      <div key={w.week} className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 hover:border-emerald-200 transition-all group">
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-xs font-black shadow-lg">W{w.week}</div>
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight italic group-hover:text-emerald-600 transition-colors">{w.title}</h4>
                         </div>
                         <ul className="space-y-4">
                            {w.tasks.map((t, idx) => (
                              <li key={idx} className="flex gap-3 text-sm font-bold text-slate-600">
                                 <div className="w-5 h-5 rounded-full border-2 border-slate-200 mt-0.5 shrink-0 group-hover:border-emerald-400 transition-colors" />
                                 {t}
                              </li>
                            ))}
                         </ul>
                      </div>
                    ))}
                 </div>

                 <div className="pt-8 border-t border-slate-100">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Expert Industry Tips</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       {strategy.proTips.map((tip, idx) => (
                         <div key={idx} className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 relative overflow-hidden group">
                            <p className="text-xs font-bold text-emerald-800 relative z-10 leading-relaxed italic">"{tip}"</p>
                            <div className="absolute bottom-[-10px] right-[-10px] text-5xl opacity-5 group-hover:scale-125 transition-transform">⭐</div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-12 text-center md:text-left">
                    <button 
                      onClick={() => { setStrategy(null); setIsActivated(false); }}
                      className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors underline underline-offset-4"
                    >
                      Regenerate Different Strategy
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default AIStrategyManager;
