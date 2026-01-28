import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

const LiveVoiceAssistant: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [isActive, setIsActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startSession = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // @ts-ignore
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      // @ts-ignore
      const outputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
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
            const audioData = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const binary = atob(audioData);
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
          systemInstruction: 'You are an elite Local SEO expert. Talk specifically about Google Maps ranking, review automation, and citations.'
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
          <p className="text-slate-400 text-xl font-bold max-w-2xl mx-auto">Get real-time vocal feedback on your local search strategy.</p>
        </div>
        <div className="relative h-80 flex items-center justify-center">
          <button 
            onClick={isActive ? stopSession : startSession}
            className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all active:scale-95 z-10 cursor-pointer ${isActive ? 'bg-rose-600' : 'bg-emerald-500'}`}
          >
            {isActive ? '⏹' : '🎙️'}
          </button>
          {isActive && (
            <div className="absolute inset-0 rounded-full border border-emerald-500/50 animate-ping" />
          )}
        </div>
        <button onClick={onSignup} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-500 pb-1 cursor-pointer">Upgrade for Priority Support</button>
      </div>
    </div>
  );
};

export default LiveVoiceAssistant;
