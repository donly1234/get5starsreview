
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VeoVideoGeneratorProps {
  onSignup: () => void;
}

const VeoVideoGenerator: React.FC<VeoVideoGeneratorProps> = ({ onSignup }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const active = await (window as any).aistudio?.hasSelectedApiKey();
      setHasKey(!!active);
    };
    checkStatus();
  }, []);

  const triggerKeySelection = async () => {
    try {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true);
    } catch (e) {
      console.error(e);
    }
  };

  const generateVideo = async () => {
    if (!prompt || loading) return;
    setLoading(true);
    setVideoUrl(null);
    setStatus("Activating Neural Veo Core...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic 4K promotional commercial for: ${prompt}. Professional lighting, stop-motion aesthetics, high resolution for Google Maps profile.`,
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
        alert("Session expired. Please re-link your API Key.");
      }
      setStatus("Error: " + (e.message || "Protocol Failure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        {!hasKey ? (
          <div className="text-center space-y-10 bg-slate-950 p-16 md:p-24 rounded-[64px] text-white shadow-3xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px]">Secure Authentication Required</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Activate Your <br /><span className="text-emerald-500">Video Generator.</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto text-lg">1080p cinematic generation requires a linked paid Google Cloud API Key. Connect your project to unlock dedicated GPU compute power.</p>
              <div className="flex flex-col items-center gap-4 pt-6">
                 <button onClick={triggerKeySelection} className="bg-emerald-500 text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-white hover:text-black transition-all">Link API Key</button>
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-slate-500 uppercase tracking-widest font-black underline">View Billing Documentation</a>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Neural Video Engine v3.1</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Veo <span className="text-emerald-600">Cinema Ad</span> Generator.</h1>
                <p className="text-slate-500 font-bold text-xl leading-relaxed">Turn any business description into a cinematic masterpiece for your Google Profile in seconds.</p>
              </div>

              <div className="space-y-6">
                <textarea 
                  className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[40px] font-bold focus:border-emerald-500 outline-none h-48 shadow-inner"
                  placeholder="A bright, modern dental office, smiling patients, professional staff, soft sunlight hitting the equipment..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button 
                  onClick={generateVideo}
                  disabled={loading || !prompt}
                  className="w-full bg-slate-950 text-white py-6 rounded-[32px] font-black uppercase tracking-widest shadow-2xl hover:bg-emerald-600 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? status : 'Generate Video Ad'}
                </button>
              </div>
            </div>

            <div className="aspect-video bg-slate-100 rounded-[64px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
              {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
              ) : (
                <div className="text-center space-y-6 opacity-30">
                  <div className="text-8xl">📽️</div>
                  <p className="font-black uppercase tracking-[0.4em] text-xs">Awaiting Narrative Input</p>
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
                  <div className="w-20 h-20 border-8 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
                  <p className="font-black uppercase text-[10px] text-slate-900 tracking-[0.3em]">{status}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VeoVideoGenerator;
