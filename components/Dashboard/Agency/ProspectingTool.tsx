import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import * as htmlToImage from 'html-to-image';
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

const ProspectingTool: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<ProspectReport | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const generateReport = async () => {
    if (!query || loading) return;
    setLoading(true);
    setReport(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Generate a high-authority local SEO and reputation prospect report for: "${query}". 
      1. Use Google Search grounding to find the ACTUAL Google rating and review count.
      2. Identify the top 2 local competitors for their niche in that specific city.
      3. Identify key keywords and estimated monthly volume.
      4. Calculate a 'Review Score' (0-10) showing how far they are behind the market leader.
      
      Return as a JSON object matching this schema. If data is not found, provide realistic estimates for that niche in that city.`;

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
                  },
                  required: ["name", "rating", "reviews", "score", "address"]
                }
              }
            },
            required: ["businessName", "competitors", "reviewScore", "address"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setReport(result);
    } catch (e) {
      console.error(e);
      alert("Analysis failed. Please include both business name and city.");
    } finally {
      setLoading(false);
    }
  };

  const downloadAsImage = async () => {
    if (!reportRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        backgroundColor: '#F8FAFC',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `GSR-Report-${report?.businessName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image:', err);
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="bg-white p-8 md:p-12 rounded-[48px] border border-slate-200 shadow-sm print:hidden">
        <div className="max-w-2xl mb-8">
          <h2 className="text-3xl font-black text-[#0F172A] uppercase italic leading-tight">Sales <span className="text-[#16A34A]">Intelligence Generator</span></h2>
          <p className="text-slate-500 font-bold mt-2">Find a prospective client and generate their audit instantly to close the sale.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Business Name & City (e.g. Acme Plumbing London)..." 
            className="flex-1 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold focus:border-[#16A34A] outline-none transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateReport()}
          />
          <button 
            onClick={generateReport}
            disabled={loading || !query}
            className="bg-[#0F172A] text-white px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#16A34A] transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? 'Crawling Market...' : 'Generate Pitch Report'}
          </button>
        </div>
      </div>

      {report && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex justify-center gap-4 print:hidden">
            <button 
              onClick={() => window.print()} 
              className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#16A34A] transition-all flex items-center gap-2 shadow-xl"
            >
              Download PDF Report
            </button>
            <button 
              onClick={downloadAsImage} 
              className="bg-white text-[#0F172A] border-2 border-slate-100 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              Export as Image
            </button>
          </div>

          <div ref={reportRef} className="report-container bg-slate-50 max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl p-10 md:p-16 print:p-0 print:border-none print:bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
               <div className="space-y-12">
                  <Logo variant="full" className="scale-110 origin-left" />
                  <div className="space-y-4">
                    <h1 className="text-6xl font-black text-[#0F172A] tracking-tighter uppercase italic">LOCAL RANKING <br /><span className="text-[#16A34A]">REPORT</span></h1>
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black text-[#0F172A] uppercase leading-none">{report.businessName}</h2>
                      <p className="text-slate-400 font-bold uppercase text-sm tracking-widest">{report.address}</p>
                    </div>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full md:w-80 space-y-4">
                  <h3 className="text-[10px] font-black text-[#16A34A] uppercase tracking-[0.3em]">Critical Score</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl font-black text-[#0F172A] leading-none">G {report.rating}</div>
                    <div className="text-[#FACC15] text-xl">★★★★★</div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">Your business is ranked below market potential.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-slate-200 pt-12">
               <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-[#0F172A] uppercase italic">The Visibility Gap</h3>
                    <div className="flex items-center gap-4">
                      <span className="bg-rose-600 text-white px-4 py-2 rounded-xl text-lg font-black">{report.reviewScore}/10</span>
                      <div className="flex-1 bg-slate-200 h-6 rounded-full overflow-hidden border border-slate-300">
                        <div className="bg-rose-600 h-full transition-all duration-1000" style={{ width: `${report.reviewScore * 10}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Market Demand</p>
                       <p className="text-2xl font-black text-[#0F172A]">{report.monthlySearches} searches/mo</p>
                       <p className="text-[11px] text-slate-500 font-medium mt-1">Average searches for your primary keywords in your city.</p>
                    </div>
                    <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 shadow-sm">
                       <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest mb-2">Lost Opportunity</p>
                       <p className="text-2xl font-black text-amber-900">{report.marketVolume} Revenue Lost</p>
                       <p className="text-[11px] text-amber-800 font-medium mt-1">Estimated monthly revenue being captured by your competitors instead of you.</p>
                    </div>
                  </div>
               </div>

               <div className="space-y-8">
                  <h3 className="text-2xl font-black text-[#0F172A] uppercase italic">Local Leaders</h3>
                  <div className="space-y-4">
                    {report.competitors.map((c, i) => (
                      <div key={i} className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-slate-100">0{i + 1}</span>
                          <div>
                            <p className="text-sm font-black text-[#0F172A] uppercase leading-none">{c.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{c.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                           <span className="bg-[#16A34A] text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-lg shadow-green-500/20">{c.score}/10</span>
                           <div className="text-[11px] font-black text-[#0F172A] mt-2">★ {c.rating}</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="p-6 bg-rose-50 rounded-[28px] border-2 border-rose-200 shadow-xl flex items-center justify-between scale-105">
                       <div className="flex items-center gap-4">
                          <span className="text-3xl font-black text-rose-200">99</span>
                          <p className="text-sm font-black text-rose-900 uppercase">Your Business</p>
                       </div>
                       <span className="bg-rose-600 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-xl">CRITICAL</span>
                    </div>
                  </div>
               </div>
            </div>

            <div className="mt-16 pt-12 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h3 className="text-3xl font-black text-[#0F172A] uppercase italic">The Solution</h3>
                  <p className="text-slate-500 font-bold leading-relaxed">By automating review collection and response handling, you can match the "Market Leader" score within 90 days. Every 0.1 increase in star rating typically results in a 1.2% lift in direction requests.</p>
               </div>
               <div className="bg-[#FACC15] p-8 rounded-[40px] border-2 border-[#0F172A] flex flex-col justify-center text-center space-y-6 shadow-xl">
                  <p className="text-[10px] font-black text-[#0F172A] uppercase tracking-widest leading-none">Next Action Required</p>
                  <h4 className="text-2xl font-black text-[#0F172A] uppercase italic tracking-tighter">Fix Your Ranking</h4>
                  <a 
                    href="https://www.get5starsreview.com" 
                    className="bg-[#0F172A] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#16A34A] transition-all"
                  >
                    Launch Free Automation Trial
                  </a>
               </div>
            </div>
            
            <div className="mt-16 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">
              CERTIFIED RANKING REPORT • GET5STARSREVIEW.COM
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProspectingTool;
