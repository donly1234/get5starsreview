import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageOptimizationTool: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-white rounded-[40px] shadow-sm border border-slate-100 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 uppercase italic">AI Storefront Enhancer</h2>
        <p className="text-slate-500 text-sm font-medium">Remove background clutter and optimize lighting for your business photos.</p>
      </div>
      
      <div className="space-y-4">
        <input 
          type="file" 
          onChange={handleUpload} 
          className="w-full text-xs text-slate-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-slate-100 file:text-slate-600 hover:file:bg-slate-200 cursor-pointer" 
        />
        
        {image ? (
          <div className="aspect-video rounded-3xl overflow-hidden border-2 border-slate-100 shadow-inner">
            <img src={image} className="w-full h-full object-cover" alt="Preview" />
          </div>
        ) : (
          <div className="aspect-video rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center">
             <span className="text-[10px] font-black uppercase text-slate-300">Upload Image to Begin</span>
          </div>
        )}

        <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl active:scale-95">
          Run Visual Cleanup
        </button>
      </div>
    </div>
  );
};

export default ImageOptimizationTool;
