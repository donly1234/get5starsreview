
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { logger } from '../../logger';

interface ReviewDetailViewProps {
  review: any;
  onBack: () => void;
  isTrial?: boolean;
  onShowUpgrade?: () => void;
}

const ReviewDetailView: React.FC<ReviewDetailViewProps> = ({ review, onBack, isTrial = false, onShowUpgrade }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const generateAIResponse = async () => {
    if (isTrial) {
      onShowUpgrade?.();
      return;
    }
    
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a helpful customer success manager. Write a professional, empathetic, and short response to this ${review.rating}-star review: "${review.comment}". Acknowledge the user ${review.author}.`;
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 200,
          thinkingConfig: { thinkingBudget: 50 },
        }
      });

      const text = result.text;
      setSuggestion(text || null);
      if (text) setReplyText(text);
    } catch (error) {
      logger.error("AI Response Generation Failed", error);
      setReplyText(`Hi ${review.author}, thank you for your feedback. We appreciate your support!`);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!isTrial) generateAIResponse();
  }, [review.id]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-4">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
          <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Review Intelligence</h3>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-xl font-black text-slate-400">
              {review.author[0]}
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900">{review.author}</h4>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-slate-600 text-lg italic leading-relaxed bg-slate-50 p-6 rounded-[32px] border border-slate-100">
            "{review.comment}"
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Suggested Reply</h5>
            {isGenerating && <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>}
          </div>
          
          <textarea 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full h-48 p-6 bg-slate-50 border border-slate-200 rounded-[32px] text-sm font-medium focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none resize-none"
            placeholder={isTrial ? "Upgrade to unlock AI suggestions..." : "Drafting..."}
          />

          <div className="flex gap-3">
            <button 
              onClick={onBack}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all active:scale-95 shadow-xl"
            >
              Post to Google
            </button>
            <button 
              onClick={generateAIResponse}
              className="px-6 py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-2xl font-black hover:text-emerald-600 hover:border-emerald-600 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailView;
