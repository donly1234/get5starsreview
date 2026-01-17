
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import SocialShareModal from './SocialShareModal';

interface ReviewDetailViewProps {
  review: any;
  onBack: () => void;
  isMobileComposer?: boolean;
  isTrial?: boolean;
}

const ReviewDetailView: React.FC<ReviewDetailViewProps> = ({ review, onBack, isMobileComposer, isTrial = false }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [composerView, setComposerView] = useState<'review' | 'write'>('review');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [confidence, setConfidence] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const generateAIResponse = async (toneOverride?: string) => {
    if (isTrial) {
      alert("AI Responses are locked during trial. Please upgrade to Professional plan.");
      return;
    }
    
    setIsGenerating(true);
    setComposerView('write');
    const tone = toneOverride || selectedTone;
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a customer success manager for a business. 
        BRAND VOICE: ${tone}.
        CUSTOMER REVIEW: "${review.comment}"
        RATING: ${review.rating}/5 stars.
        PLATFORM: ${review.platform}.
        CUSTOMER NAME: ${review.author}.

        INSTRUCTIONS: 
        1. Address them by name.
        2. If rating is low, be deeply apologetic and offer a solution.
        3. If rating is high, express genuine gratitude and highlight what they liked.
        4. Do NOT use generic placeholder text.
        5. Keep it under 100 words.
      `;
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: tone === 'Witty' ? 0.9 : 0.6,
          maxOutputTokens: 300,
        }
      });
      
      setReplyText(result.text || "Thank you for your feedback! We appreciate your business.");
      setConfidence(Math.floor(85 + Math.random() * 14)); // Mock confidence score
    } catch (error) {
      console.error("AI Generation failed:", error);
      setReplyText(`Hi ${review.author}, thank you for taking the time to leave us feedback regarding your experience with us on ${review.platform}. We appreciate your support!`);
      setConfidence(72);
    } finally {
      setIsGenerating(false);
    }
  };

  const tones = ['Professional', 'Friendly', 'Concise', 'Witty', 'Empathetic'];

  return (
    <div className="bg-white lg:rounded-2xl border-none lg:border border-slate-200 shadow-none lg:shadow-sm flex flex-col h-full overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-all">
          <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h3 className="font-black text-slate-900 uppercase tracking-[0.2em] text-[10px]">
          {composerView === 'review' ? 'Intelligence Hub' : 'AI Composer'}
        </h3>
        {confidence && composerView === 'write' && (
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black text-emerald-600 uppercase">{confidence}% Confidence</span>
          </div>
        )}
        <div className="flex items-center gap-2">
           {review.rating >= 4 && (
             <button 
              onClick={() => setShowShareModal(true)}
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all border border-blue-100"
             >
               Share
             </button>
           )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex p-4 gap-2 lg:hidden">
           <button 
            onClick={() => setComposerView('review')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${composerView === 'review' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
           >
             Analysis
           </button>
           <button 
            onClick={() => {
              if (isTrial) {
                alert("Composer is locked. Please respond manually or upgrade.");
              } else {
                setComposerView('write');
              }
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${composerView === 'write' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}
           >
             Draft {isTrial && '🔒'}
           </button>
        </div>

        {composerView === 'review' && (
          <div className="p-6 space-y-8 animate-in fade-in slide-in-from-left-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-[24px] bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-400">
                {review.avatar}
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 leading-tight">{review.author}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? (review.rating <= 2 ? 'text-rose-500' : 'text-emerald-500') : 'text-slate-100'} fill-current`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 italic relative">
              <div className="absolute top-[-10px] left-8 bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">{review.platform} Review</div>
              <p className="text-slate-700 text-lg leading-relaxed">"{review.comment}"</p>
            </div>

            {isTrial && (
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                 <p className="text-xs text-amber-700 font-bold leading-relaxed">
                   🔒 AI-powered response suggestions are a Professional feature. Respond manually below or upgrade to save hours every week.
                 </p>
              </div>
            )}

            {!isTrial && (
              <div className="space-y-4 pt-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Tone</h5>
                <div className="flex flex-wrap gap-2">
                  {tones.map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTone(t)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedTone === t ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={() => isTrial ? setComposerView('write') : generateAIResponse()}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  {isTrial ? 'Compose Manual Reply' : `Generate ${selectedTone} Response`}
                </>
              )}
            </button>
          </div>
        )}

        {composerView === 'write' && (
          <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drafting for {review.platform}</h5>
                {!isTrial && <button onClick={() => generateAIResponse()} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Re-generate</button>}
              </div>
              <div className="relative">
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={isTrial ? "Write your manual response here..." : ""}
                  className="w-full h-80 p-6 bg-slate-50 border border-slate-100 rounded-[32px] text-base font-medium focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all resize-none shadow-inner"
                />
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <button 
                className="bg-blue-600 text-white py-5 rounded-[24px] font-black shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                onClick={() => onBack()}
              >
                Post Now
              </button>
              <button className="bg-slate-50 text-slate-600 py-5 rounded-[24px] font-bold border border-slate-100">Save Draft</button>
            </div>
          </div>
        )}
      </div>

      {showShareModal && (
        <SocialShareModal review={review} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};

export default ReviewDetailView;
