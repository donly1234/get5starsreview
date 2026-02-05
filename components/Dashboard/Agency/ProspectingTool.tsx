import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import Logo from '../../Logo';

interface ProspectReport {
  businessName: string;
  address: string;
  rating: number;
  reviews: number;
  keywords: string;
  monthlySearches: string;
  reviewScore: number;
  marketVolume: string;
  competitors: Array<{
    name: string;
    rating: number;
    reviews: number;
    score: number;
    address: string;
  }>;
}

const ProspectingTool: React.FC<{ onSignup?: () => void; onHome?: () => void }> = ({ onSignup, onHome }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [report, setReport] = useState<ProspectReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const generateReport = async () => {
    if (!query || loading) return;
    
    // Check for API key availability before calling SDK to prevent browser alerts
    if (!process.env.API_KEY) {
      setError("AI Analysis Core is currently in maintenance mode. Please try again later.");
      return;
    }

    setLoading(true);
    setReport(null);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a high-authority local SEO and reputation prospect report for: "${query}". 
      Return as a JSON object matching this schema. Calculate a 'Review Score' (0-10) and identify 2 competitors.`;

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
              reviews: { type: Type.INTEGER },
              keywords: { type: Type.STRING },
              monthlySearches: { type: Type.STRING },
              reviewScore: { type: Type.NUMBER },
              marketVolume: { type: Type.STRING },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    rating: { type: Type.NUMBER },
                    reviews: { type: Type.INTEGER },
                    score: { type: Type.NUMBER },
                    address: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      setReport(JSON.parse(response.text));
    } catch (e: any) {
      console.error(e);
      setError("Ranking Engine Timeout: The server is experiencing high load. Please refine your search query.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm">
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl font-black text-[#0F172A] uppercase italic leading-tight">Sales <span className="text-[#16A34A]">Intelligence Generator</span></h2>
          <p className="text-slate-500 font-bold mt-2">Find a prospective client and generate their audit instantly to close the sale.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3">
             <span>âš ï¸</span> {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Business Name & City..." 
            className="flex-1 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold focus:border-[#16A34A] outline-none transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={generateReport}
            disabled={loading || !query}
            className="bg-[#0F172A] text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#16A34A] transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'CRAWLING MARKET...' : 'GENERATE PITCH REPORT'}
          </button>
        </div>
      </div>

      {report && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div ref={reportRef} className="bg-white max-w-4xl mx-auto rounded-[32px] border border-slate-200 shadow-2xl p-10 md:p-16 text-left">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
               <div className="space-y-12">
                  <Logo variant="full" className="scale-110 origin-left" />
                  <div className="space-y-4">
                    <h1 className="text-6xl font-black text-[#0F172A] tracking-tighter uppercase italic">RANKING REPORT</h1>
                    <h2 className="text-3xl font-black text-[#0F172A] uppercase leading-none">{report.businessName}</h2>
                    <p className="text-slate-400 font-bold uppercase text-sm tracking-widest">{report.address}</p>
                  </div>
               </div>
            </div>
            {/* ... Rest of report content ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-12">
               <div className="bg-rose-50 p-8 rounded-3xl">
                  <p className="text-rose-600 font-black text-[10px] uppercase mb-2">Visibility Gap</p>
                  <p className="text-4xl font-black text-rose-900">{report.reviewScore}/10 Score</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-3xl">
                  <p className="text-slate-400 font-black text-[10px] uppercase mb-2">Monthly Potential</p>
                  <p className="text-4xl font-black text-slate-900">{report.monthlySearches} Leads</p>
               </div>
            </div>
            <button onClick={onSignup} className="w-full mt-12 bg-[#16A34A] text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl">Close the Gap Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProspectingTool;
