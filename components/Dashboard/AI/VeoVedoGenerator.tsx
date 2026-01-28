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
        prompt: `Cinematic commercial for: ${prompt}. Professional lighting.`,
        config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
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
        <button onClick={() => (window as any).aistudio.openSelectKey()} className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold">Link API Key</button>
      ) : (
        <div className="space-y-4">
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full p-4 bg-slate-50 border rounded-2xl h-32" placeholder="Describe your business commercial..." />
          <button onClick={generateVideo} disabled={loading} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">{loading ? status : 'Generate 1080p Video'}</button>
          {videoUrl && <video src={videoUrl} controls className="w-full rounded-2xl mt-4" />}
        </div>
      )}
    </div>
  );
};

export default VeoVideoGenerator;
