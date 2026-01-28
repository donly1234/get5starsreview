import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const VeoVideoGenerator: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      // @ts-ignore
      if (window.aistudio?.hasSelectedApiKey) {
        // @ts-ignore
        const active = await window.aistudio.hasSelectedApiKey();
        setHasKey(!!active);
      }
    };
    checkStatus();
  }, []);

  const handleLinkKey = async () => {
    // @ts-ignore
    if (window.aistudio?.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const generateVideo = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setStatus("Activating Neural Veo Core...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic commercial for: ${prompt}. Professional lighting, 4K resolution, high-end production for Google Maps.`,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        setStatus("Synthesizing frames... (takes ~2 mins)");
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
      setStatus("Error: " + (e.message || "Protocol Failure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-[40px] shadow-sm border border-slate-100 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">📽️</div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase italic">Veo AI Video Engine</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">1080p Cinematic Generation</p>
        </div>
      </div>
      
      {!hasKey ? (
        <div className="bg-slate-50 p-12 rounded-[32px] text-center space-y-6 border border-slate-100">
          <p className="text-slate-500 font-bold max-w-sm mx-auto">Cinematic video generation requires a linked paid Google Cloud API Key for dedicated compute power.</p>
          <button onClick={handleLinkKey} className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-emerald-500/20">Link Cloud Key</button>
          <p className="text-[10px] text-slate-400 uppercase font-black"><a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">View Billing Documentation</a></p>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <textarea 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)} 
            className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl h-32 font-bold focus:border-emerald-500 outline-none transition-all" 
            placeholder="Describe your business commercial (e.g. A modern dental office with smiling patients)..." 
          />
          <button 
            onClick={generateVideo} 
            disabled={loading || !prompt} 
            className="w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
          >
            {loading ? status : 'Generate Cinema Ad'}
          </button>
          {videoUrl && (
            <div className="mt-8 space-y-4">
              <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.3em]">Generation Complete:</p>
              <video src={videoUrl} controls className="w-full rounded-[32px] shadow-2xl border-4 border-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VeoVideoGenerator;
