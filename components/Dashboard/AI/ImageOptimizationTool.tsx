import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageOptimizationTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [optimizedUrl, setOptimizedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const runClean = async () => {
    if (!image || loading) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/png' } },
            { text: "Remove background clutter like trash cans or signs. Enhance lighting for a storefront photo." }
          ]
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setOptimizedUrl(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    } catch (e) {
      console.error(e);
      setOptimizedUrl(image);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Visual SEO Boost</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">AI Image <br /><span className="text-emerald-600">Cleanup.</span></h1>
            <p className="text-slate-500 font-bold text-xl leading-relaxed">Better photos = 42% more clicks. Let Gemini remove distractions automatically.</p>
            <div className="space-y-4">
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 border-2 border-dashed border-slate-200 rounded-3xl font-black uppercase text-xs hover:bg-slate-50 transition-all cursor-pointer">
                {image ? 'Change Photo' : 'Upload Business Photo'}
              </button>
              {image && (
                <button onClick={runClean} disabled={loading} className="w-full bg-slate-950 text-white py-6 rounded-3xl font-black uppercase shadow-2xl hover:bg-emerald-600 transition-all cursor-pointer">
                  {loading ? 'Analyzing Pixels...' : 'AI Clean Background'}
                </button>
              )}
            </div>
          </div>
          <div className="relative bg-slate-50 rounded-[64px] p-8 aspect-square grid grid-cols-2 gap-4 shadow-inner border border-slate-100 overflow-hidden">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm relative">
              {image ? <img src={image} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center text-slate-200 uppercase font-black text-xs">Original</div>}
            </div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative">
              {optimizedUrl ? <img src={optimizedUrl} className="w-full h-full object-cover animate-in fade-in" /> : <div className="h-full flex items-center justify-center text-slate-200 uppercase font-black text-xs">Optimized</div>}
              {loading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizationTool;
