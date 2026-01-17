
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import Logo from './Logo';

interface AuditData {
  businessName: string;
  address: string;
  currentRating: number;
  currentReviews: number;
  keywords: string;
  monthlySearches: string;
  reviewScore: number;
  competitors: Array<{
    rank: number;
    name: string;
    address: string;
    score: number;
    rating: number;
    reviews: number;
  }>;
}

interface GBPAuditToolProps {
  onSignup?: () => void;
}

const GBPAuditTool: React.FC<GBPAuditToolProps> = ({ onSignup }) => {
  const [businessNameInput, setBusinessNameInput] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [auditData, setAuditData] = useState<AuditData | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const startAudit = async () => {
    if (!businessNameInput) return;
    setIsAuditing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Generate a realistic but critical Google Business Profile SEO audit for a business named "${businessNameInput}". 
        The business should be shown as underperforming to encourage optimization.
        
        Return JSON with:
        - businessName: string
        - address: a realistic local address
        - currentRating: number (low, e.g. 0-3.5)
        - currentReviews: number (low, e.g. 0-10)
        - keywords: string of 3 relevant local keywords
        - monthlySearches: a number like "8,100"
        - reviewScore: number (0-10, make it low like 0 or 1)
        - competitors: array of 2 top competitors with high scores (9/10 or 10/10) and the user's business at a very low rank (e.g. #319) with a score of 0/10.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              businessName: { type: Type.STRING },
              address: { type: Type.STRING },
              currentRating: { type: Type.NUMBER },
              currentReviews: { type: Type.NUMBER },
              keywords: { type: Type.STRING },
              monthlySearches: { type: Type.STRING },
              reviewScore: { type: Type.NUMBER },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.NUMBER },
                    name: { type: Type.STRING },
                    address: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    rating: { type: Type.NUMBER },
                    reviews: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      setAuditData(parsed);
      setIsAuditing(false);
      setShowResults(true);
    } catch (error) {
      console.error("Audit failed:", error);
      setIsAuditing(false);
      alert("Failed to complete audit. Please try again.");
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (!showResults) {
    return (
      <section className="py-24 bg-slate-50 min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-green-600 font-black uppercase tracking-[0.2em] text-xs mb-4">SEO Diagnostic Tool</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-none uppercase tracking-tighter italic mb-6">
            Audit Your <span className="text-green-600">Local Ranking</span>
          </h3>
          <p className="text-slate-500 font-bold">Discover how your Google Business Profile ranks against local competitors in seconds.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-2xl border border-slate-100 w-full max-w-2xl">
          <div className="space-y-6">
            <input 
              type="text" 
              placeholder="Enter Business Name & City..." 
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-lg font-bold focus:border-green-600 focus:outline-none transition-all"
              value={businessNameInput}
              onChange={(e) => setBusinessNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && startAudit()}
            />
            <button 
              onClick={startAudit}
              disabled={isAuditing}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
            >
              {isAuditing ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Running Deep Audit...</span>
                </div>
              ) : "Get Free SEO Report"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pb-20 print:bg-white print:pb-0">
      <div className="max-w-6xl mx-auto px-6 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Your Diagnostic Report</h2>
          <p className="text-slate-500 font-medium">Generated by Get5StarsReview AI Agent v4.0</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleDownloadPDF}
             className="px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             <span className="text-sm font-bold">Download PDF</span>
           </button>
           <button 
             onClick={onSignup}
             className="px-8 py-4 bg-[#16A34A] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-green-700 transition-all shadow-xl shadow-green-600/20"
           >
             Claim 14-Day Free Trial
           </button>
        </div>
      </div>

      <div ref={reportRef} className="max-w-5xl mx-auto mt-10 print:mt-0 bg-white shadow-2xl rounded-[40px] print:shadow-none print:rounded-none overflow-hidden border border-slate-200 print:border-none">
        {/* Report Header */}
        <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-8 items-start">
           <div className="space-y-6 flex-1">
              <div className="flex items-center gap-2 grayscale opacity-60">
                 <Logo variant="icon" className="scale-75 -ml-4" />
                 <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Get5Stars Agency Partner</span>
              </div>
              <div className="space-y-1">
                 <h1 className="text-4xl font-black text-slate-900 tracking-tight">Google Ranking Report</h1>
                 <p className="text-xl font-bold text-slate-800">{auditData?.businessName}</p>
                 <p className="text-slate-500 font-medium">{auditData?.address}</p>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 font-black text-lg">G</span>
                    <span className="text-lg font-black text-slate-900">{auditData?.currentRating}</span>
                    <div className="flex text-slate-200">
                       {[...Array(5)].map((_, i) => <span key={i} className="text-xl">★</span>)}
                    </div>
                    <span className="text-slate-400 font-medium">({auditData?.currentReviews} Reviews)</span>
                 </div>
              </div>

              <div className="space-y-2 pt-6">
                 <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Google search results</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Keywords:</p>
                 <p className="text-xs font-bold text-slate-700">{auditData?.keywords}</p>
                 <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Google Monthly Searches:</p>
                    <p className="text-xs font-black text-slate-900">{auditData?.monthlySearches}</p>
                    <p className="text-[10px] text-slate-400 font-medium">(Last 12 month average)</p>
                 </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
                 <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-black">!</div>
                 <p className="text-[11px] text-blue-800 font-medium leading-relaxed">The best way to <strong>attract these people</strong> to your local business is by improving your Google Ranking.</p>
              </div>
           </div>

           <div className="md:w-1/3 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Google ranking factors</h3>
              {[
                { title: 'Relevance', desc: 'Refers to how well a local Business Profile matches what someone is searching for.' },
                { title: 'Distance', desc: 'Considers how far each search result is from the location term searched.' },
                { title: 'Reviews', desc: 'More reviews and positive ratings can improve your business\' local ranking.' }
              ].map(f => (
                <div key={f.title} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">{f.title}</h5>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                </div>
              ))}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
                 <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-black">!</div>
                 <p className="text-[11px] text-blue-800 font-medium leading-relaxed">The <strong>only factor</strong> you can actively influence to improve ranking are your reviews.</p>
              </div>
           </div>
        </div>

        {/* Scoring & Ranking Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
           {/* Left: Your Score */}
           <div className="p-10 border-r border-slate-100">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Your Review Score</h3>
              <div className="relative mb-10">
                 <span className="absolute top-[-24px] left-0 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full">{auditData?.reviewScore}/10</span>
                 <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-rose-600 h-full" style={{ width: `${(auditData?.reviewScore || 0) * 10}%` }}></div>
                 </div>
              </div>

              <div className="space-y-8">
                 <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">How it is calculated</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                       The Review Score is a number from 0 to 10, calculated by <strong>averaging your star rating</strong> and your <strong>review volume</strong> (related to the <strong>highest volume in your area</strong>). It indicates how your business is perceived in your area.
                    </p>
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">How it impacts revenue</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                       If you have a <strong>low Review Score</strong>, people who search your category through Google will <strong>choose your competitors</strong>.
                    </p>
                 </div>
              </div>
           </div>

           {/* Right: Score Ranking */}
           <div className="p-10 bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Review score ranking</h3>
              <div className="space-y-4">
                 {auditData?.competitors.map((c, i) => {
                    const isUser = c.rank > 2;
                    return (
                      <div key={i} className={`p-4 rounded-3xl border ${isUser ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'} shadow-sm relative`}>
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                               <p className="text-sm font-black text-slate-900">{c.rank}. {c.name}</p>
                               <p className="text-[10px] font-medium text-slate-400 uppercase">{c.address}</p>
                            </div>
                            <div className={`px-2 py-1 rounded-lg text-[10px] font-black text-white ${c.score >= 8 ? 'bg-emerald-500' : 'bg-rose-600'}`}>
                               {c.score}/10
                            </div>
                         </div>
                         <div className="mt-3 flex items-center gap-1.5">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-xs font-black text-slate-900">{c.rating}</span>
                            <span className="text-[10px] font-bold text-slate-400">({c.reviews} Reviews)</span>
                         </div>
                      </div>
                    );
                 })}
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-3xl flex gap-3 items-center">
                 <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 text-xs font-black">!</div>
                 <p className="text-[11px] text-blue-800 font-bold leading-relaxed">90% of people look for businesses with the highest review score in the area.</p>
              </div>
           </div>
        </div>

        {/* Footer Advice & CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3">
           <div className="md:col-span-2 p-10 space-y-8">
              <h3 className="text-2xl font-black text-slate-900">How to get more clients</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div>
                    <h5 className="text-sm font-black text-slate-900 mb-1">Review Volume</h5>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Automate the process of asking for a review to every client.</p>
                 </div>
                 <div>
                    <h5 className="text-sm font-black text-slate-900 mb-1">Review recency</h5>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Get reviews every day to make sure Google ranks you higher.</p>
                 </div>
                 <div>
                    <h5 className="text-sm font-black text-slate-900 mb-1">Review Rating</h5>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Recover unhappy clients so they don't leave negative reviews.</p>
                 </div>
              </div>
              <div className="flex items-center gap-3 p-1.5 px-4 bg-yellow-50 border border-yellow-200 rounded-full w-fit">
                 <span className="text-sm">💰</span>
                 <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest">Do this to improve your Ranking, leading to new clients.</p>
              </div>
           </div>

           <div className="p-10 bg-orange-50/30 flex flex-col justify-between">
              <div>
                 <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-4">Choose your next move</h4>
                 <div className="flex gap-3 mb-6">
                    <span className="text-2xl">👎</span>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-slate-900">Hardly get positive reviews</p>
                       <p className="text-[10px] font-medium text-slate-500">Get outranked by competitors</p>
                    </div>
                 </div>
                 <div className="flex gap-3 mb-8">
                    <span className="text-2xl">👍</span>
                    <div className="space-y-1">
                       <p className="text-sm font-black text-slate-900">Get 4/5 reviews on autopilot</p>
                       <p className="text-[10px] font-medium text-slate-500">Get more clients from Google</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <button 
                  onClick={onSignup}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 uppercase tracking-tight"
                 >
                   Start Free Trial
                 </button>
                 <p className="text-center text-[10px] font-black text-blue-600 uppercase tracking-widest">www.get5starsreview.com</p>
              </div>
           </div>
        </div>
      </div>

      {/* Social Proof Bubble */}
      <div className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-bottom-10 duration-700 print:hidden">
        <div className="bg-white p-4 pr-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-sm">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl shrink-0">🔥</div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
               <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                 <svg className="w-1.5 h-1.5 text-white fill-current" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
               </span>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">It's popular</span>
            </div>
            <p className="text-xs font-bold text-slate-700 leading-tight">
              <span className="text-green-600 font-black">79 people</span> started working with Get5Stars within the last week
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:border-none { border: none !important; }
          .print\\:mt-0 { margin-top: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default GBPAuditTool;
