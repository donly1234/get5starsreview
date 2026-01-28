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
      const active = await window.aistudio?.hasSelectedApiKey?.();
      setHasKey(!!active);
    };
    checkStatus();
  }, []);

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
      setStatus("Error: " + (e.message || "Protocol Failure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black mb-6 uppercase italic">AI Video Ad Generator</h2>
      {!hasKey ? (
        <div className="bg-slate-50 p-6 rounded-2xl text-center space-y-4">
          <p className="text-sm font-bold text-slate-500">A Google Cloud API Key is required for 1080p video generation.</p>
          <button onClick={() => (window as any).aistudio?.openSelectKey?.()} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Link API Key</button>
        </div>
      ) : (
        <div className="space-y-4">
          <textarea 
            value={prompt} 
            onChange={e => setPrompt(e.target.value)} 
            className="w-full p-6 bg-slate-50 border rounded-3xl h-32 font-bold focus:border-emerald-500 outline-none" 
            placeholder="Describe your business commercial (e.g. A modern dental office with smiling patients)..." 
          />
          <button 
            onClick={generateVideo} 
            disabled={loading || !prompt} 
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? status : 'Generate 1080p Video'}
          </button>
          {videoUrl && (
            <div className="mt-6 space-y-2">
              <p className="text-[10px] font-black uppercase text-emerald-600">Generation Complete:</p>
              <video src={videoUrl} controls className="w-full rounded-2xl shadow-lg border border-slate-100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VeoVideoGenerator;
