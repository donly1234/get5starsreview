
import React, { useState } from 'react';

interface SocialShareModalProps {
  review: any;
  onClose: () => void;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({ review, onClose }) => {
  const [platforms, setPlatforms] = useState<string[]>(['Facebook']);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]);
  };

  const handleShare = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
      setTimeout(onClose, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Share Success</h3>
            <p className="text-sm text-slate-500 mt-1">Broadcast this 5-star review to your social networks.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full text-slate-400 shadow-sm border border-slate-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {isSuccess ? (
          <div className="p-20 text-center space-y-4 animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl">🚀</div>
            <h4 className="text-2xl font-black text-slate-900 uppercase">Post Shared!</h4>
            <p className="text-slate-500 font-bold">Your review post is now live on your selected platforms.</p>
          </div>
        ) : (
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Post Preview</h4>
                <div className="bg-slate-900 rounded-[32px] p-6 shadow-xl relative overflow-hidden aspect-square flex flex-col justify-center items-center text-center">
                   <div className="relative z-10 space-y-4">
                      <div className="flex gap-1 justify-center">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-xl">★</span>)}
                      </div>
                      <p className="text-white font-bold text-lg leading-relaxed px-4">"{review.comment}"</p>
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-blue-400 font-black uppercase text-[10px] tracking-[0.2em]">{review.author}</p>
                        <p className="text-slate-500 text-[8px] font-bold mt-1">THE DOWNTOWN BAKERY</p>
                      </div>
                   </div>
                   <div className="absolute top-0 right-0 p-4 opacity-20">
                      <div className="w-20 h-20 border-4 border-white/20 rounded-full"></div>
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <section className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Platforms</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Facebook', 'Instagram', 'X (Twitter)', 'LinkedIn'].map(p => (
                      <button 
                        key={p} 
                        onClick={() => togglePlatform(p)}
                        className={`p-3 rounded-xl border-2 text-xs font-bold transition-all ${platforms.includes(p) ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-500'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-4 pt-4 border-t border-slate-100">
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">Schedule Post</span>
                      <button 
                        onClick={() => setIsScheduling(!isScheduling)}
                        className={`w-10 h-5 rounded-full relative transition-all ${isScheduling ? 'bg-blue-600' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${isScheduling ? 'right-0.5' : 'left-0.5'}`}></div>
                      </button>
                   </div>
                   {isScheduling && (
                     <input type="datetime-local" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" />
                   )}
                </section>

                <button 
                  onClick={handleShare}
                  disabled={isPublishing || platforms.length === 0}
                  className="w-full bg-[#16A34A] text-white py-4 rounded-2xl font-black shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isPublishing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
                      {isScheduling ? 'Schedule Post' : 'Share Now'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialShareModal;
