import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Logo from './Logo';

const GBPAuditTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAudit = async () => {
    if (!query || loading) return;
    if (!process.env.API_KEY) {
      setError("Deep Analysis Core offline. System admin check required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Technical Local SEO audit for "${query}". Return JSON with businessName, rating, and authorityScore.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        }
      });
      setData(JSON.parse(response.text));
    } catch (e) {
      setError("AI Grounding Error: The search model timed out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
        <h1 className="text-6xl font-black text-slate-900 uppercase italic">Local <span className="text-emerald-600">Geo-Audit.</span></h1>
        {error && <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black uppercase">{error}</div>}
        <div className="flex gap-4 max-w-2xl mx-auto">
          <input type="text" className="flex-1 p-6 bg-slate-50 border-2 rounded-[32px] font-bold outline-none focus:border-emerald-500" placeholder="Business Name & City..." value={query} onChange={e => setQuery(e.target.value)} />
          <button onClick={runAudit} className="bg-slate-950 text-white px-10 rounded-[32px] font-black uppercase text-xs shadow-xl">{loading ? 'SCANNING...' : 'LAUNCH'}</button>
        </div>
        {data && (
           <div className="bg-slate-900 text-white p-12 rounded-[56px] animate-in zoom-in-95 duration-500">
              <h2 className="text-4xl font-black uppercase italic mb-6">{data.businessName}</h2>
              <div className="flex justify-center gap-12">
                 <div className="text-center">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Authority</p>
                    <p className="text-5xl font-black">{data.authorityScore}%</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Rating</p>
                    <p className="text-5xl font-black">{data.rating}â˜…</p>
                 </div>
              </div>
              <button onClick={onSignup} className="mt-12 bg-emerald-500 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs">Start Ranking Pro</button>
           </div>
        )}
      </div>
    </div>
  );
};

export default GBPAuditTool;
