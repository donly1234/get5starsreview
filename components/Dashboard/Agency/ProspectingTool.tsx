
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

interface Prospect {
  name: string;
  rating: number;
  reviews: number;
  issue: string;
  phone: string;
}

const ProspectingTool: React.FC = () => {
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [prospects, setProspects] = useState<Prospect[] | null>(null);
  const [selectedLead, setSelectedLead] = useState<Prospect | null>(null);
  const [pitch, setPitch] = useState("");
  const [generatingPitch, setGeneratingPitch] = useState(false);

  const findLeads = async () => {
    if (!niche || !city || loading) return;
    setLoading(true);
    setProspects(null);
    setSelectedLead(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a local SEO lead generation tool. 
      Search for real businesses in the "${niche}" industry in "${city}". 
      Identify 5 businesses that have either low ratings (under 4 stars), few reviews, or unoptimized profiles.
      Return a JSON array of objects with keys: name, rating, reviews, issue, and phone.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                reviews: { type: Type.INTEGER },
                issue: { type: Type.STRING },
                phone: { type: Type.STRING }
              },
              required: ["name", "rating", "reviews", "issue"]
            }
          }
        }
      });

      setProspects(JSON.parse(response.text));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const generatePitch = async (lead: Prospect) => {
    setSelectedLead(lead);
    setGeneratingPitch(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a short, professional, and slightly aggressive cold email pitch to the owner of "${lead.name}". 
      Mention their issue: "${lead.issue}". Explain how my agency can automate their 5-star reviews and fix their Maps ranking. 
      Use a helpful but high-authority tone. Keep it under 150 words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      setPitch(response.text || "");
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingPitch(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black text-slate-900 uppercase italic leading-tight">Hot Lead <span className="text-blue-600">Prospector</span></h2>
          <p className="text-slate-500 font-medium mt-2">Find local businesses that are losing money due to poor reputation and pitch them in seconds.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Niche (e.g. Plumbers)" 
            className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="City (e.g. Austin, TX)" 
            className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button 
            onClick={findLeads}
            disabled={loading || !niche || !city}
            className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Scanning Maps...' : 'Find Prospects'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {prospects?.map((lead, i) => (
            <div 
              key={i} 
              onClick={() => generatePitch(lead)}
              className={`p-6 bg-white rounded-3xl border-2 transition-all cursor-pointer group ${selectedLead?.name === lead.name ? 'border-blue-600 bg-blue-50/20 shadow-lg' : 'border-slate-100 hover:border-slate-200 shadow-sm'}`}
            >
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-black text-slate-900 text-lg">{lead.name}</h4>
                   <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{lead.issue}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-black text-slate-900">{lead.rating} ★</p>
                    <p className="text-[10px] font-bold text-slate-400">{lead.reviews} Reviews</p>
                 </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">{lead.phone || 'Phone hidden'}</span>
                <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">Draft AI Pitch</button>
              </div>
            </div>
          ))}
          {!prospects && !loading && (
            <div className="h-64 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-center p-8 text-slate-400">
              <span className="text-4xl mb-4">📍</span>
              <p className="text-sm font-bold uppercase tracking-widest">Search a location to populate prospects</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-slate-950 rounded-[48px] p-8 md:p-10 text-white min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden">
             <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black uppercase italic tracking-tighter">AI Outreach Script</h3>
                   {selectedLead && <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Targeting: {selectedLead.name}</span>}
                </div>
                
                {generatingPitch ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 animate-pulse">Personalizing Script...</p>
                  </div>
                ) : pitch ? (
                  <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 font-medium text-sm text-slate-300 leading-relaxed italic mb-8">
                      "{pitch}"
                    </div>
                    <div className="mt-auto flex gap-4">
                      <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-900/40">Copy to Clipboard</button>
                      <button className="px-6 py-4 bg-white/10 text-white rounded-2xl font-black uppercase text-xs hover:bg-white/20 transition-all border border-white/10">Add to CRM</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 text-slate-500">
                    <span className="text-4xl">📧</span>
                    <p className="text-sm font-bold uppercase tracking-widest max-w-[200px]">Select a lead to generate a high-conversion pitch</p>
                  </div>
                )}
             </div>
             <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectingTool;
