
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const InteractiveDemo: React.FC = () => {
  const [review, setReview] = useState("I had a fantastic experience at the downtown location! Sarah was extremely helpful and made sure I found exactly what I needed. Highly recommend!");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Act as a professional customer success manager. Write a friendly, concise, and professional reply to the following customer review: "${review}"`;
      
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 200,
        }
      });

      setResponse(result.text || "Thank you for the review! We're glad you enjoyed your experience.");
    } catch (error) {
      console.error("AI Generation failed:", error);
      setResponse("Hi there! Thank you so much for your kind words. We're thrilled to hear you had a great experience with us. We'll be sure to pass your feedback along to our team!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">AI Smart Response</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-black mb-6 leading-tight">
              Manage feedback at <span className="gradient-text">Lightning Speed</span>
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Don't leave your customers hanging. Our AI Assistant crafts professional, context-aware responses in seconds, ensuring your social proof remains active and engaging.
            </p>
            <ul className="space-y-4 mb-8">
              {['Sentiment-aware replies', 'Brand voice matching', 'Multilingual support', 'One-click posting'].map((item, i) => (
                <li key={i} className="flex items-center text-slate-700 font-medium">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-black rounded-[40px] p-6 md:p-10 shadow-2xl relative border-t-8 border-green-600">
              <div className="absolute top-4 right-10 flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              
              <div className="mb-6 mt-4">
                <label className="block text-slate-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">Incoming Customer Feedback</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all h-32 resize-none shadow-inner"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>

              <div className="flex justify-center mb-6">
                <button 
                  onClick={generateAIResponse}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-green-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center uppercase text-xs tracking-widest"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Thinking...
                    </>
                  ) : "Generate AI Reply"}
                </button>
              </div>

              {response && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <label className="block text-slate-400 text-[10px] font-black mb-2 uppercase tracking-[0.2em]">Smart Suggestion</label>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5 text-slate-300 text-sm leading-relaxed italic">
                    "{response}"
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <button className="text-slate-500 text-xs font-bold hover:text-white transition-colors">Adjust Tone</button>
                    <button className="bg-white text-black px-6 py-2 rounded-xl text-xs font-black hover:bg-green-50 transition-all uppercase tracking-tighter shadow-lg">
                      Copy Response
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;