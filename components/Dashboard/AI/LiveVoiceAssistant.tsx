
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const LiveVoiceAssistant: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState("");
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      let nextStartTime = 0;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const input = e.inputBuffer.getChannelData(0);
              const l = input.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = input[i] * 32768;
              const base64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(processor);
            processor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            if (msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data) {
              const base64 = msg.serverContent.modelTurn.parts[0].inlineData.data;
              const binary = atob(base64);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              
              const int16 = new Int16Array(bytes.buffer);
              const buffer = outputCtx.createBuffer(1, int16.length, 24000);
              const channel = buffer.getChannelData(0);
              for (let i = 0; i < int16.length; i++) channel[i] = int16[i] / 32768.0;
              
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
            }
          },
          onerror: (e) => console.error(e),
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: 'You are an elite Local SEO expert. Talk specifically about Google Maps ranking, review automation, and citations. Be brief and professional.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error(e);
      alert("Mic access required for Voice Assistant.");
    }
  };

  const stopSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    if (audioContextRef.current) audioContextRef.current.close();
    setIsActive(false);
  };

  return (
    <div className="py-24 bg-slate-950 min-h-screen text-white">
      <div className="container mx-auto px-6 max-w-4xl text-center space-y-12">
        <div className="space-y-4">
          <span className="text-emerald-500 font-black uppercase tracking-widest text-xs">GSR Live Engine v2.0</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Talk to <span className="text-emerald-500">Gemini.</span></h1>
          <p className="text-slate-400 text-xl font-bold max-w-2xl mx-auto">Get real-time vocal feedback on your Google Business strategy. Just speak naturally.</p>
        </div>

        <div className="relative h-80 flex items-center justify-center">
          <div className={`w-64 h-64 rounded-full border-4 border-emerald-500/20 flex items-center justify-center relative transition-all duration-700 ${isActive ? 'scale-110' : 'scale-100'}`}>
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-3xl animate-pulse"></div>
            )}
            <button 
              onClick={isActive ? stopSession : startSession}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all active:scale-95 z-10 ${isActive ? 'bg-rose-600' : 'bg-emerald-500'}`}
            >
              {isActive ? '⏹' : '🎙️'}
            </button>
            
            {isActive && [...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping" 
                style={{ animationDelay: `${i * 0.5}s`, animationDuration: '2s' }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 max-w-md mx-auto">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-4">Voice Session Status</p>
          <p className="text-sm font-bold">{isActive ? "Session Active: Speak now..." : "Ready: Tap mic to start consultation"}</p>
        </div>
        
        <button onClick={onSignup} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500 pb-1">Upgrade to 24/7 Priority Support</button>
      </div>
    </div>
  );
};

export default LiveVoiceAssistant;
