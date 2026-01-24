
import React, { useState } from 'react';

interface SocialShareModalProps {
  review: any;
  onClose: () => void;
}

type ShareStep = 'config' | 'confirm' | 'publishing' | 'success';

const SocialShareModal: React.FC<SocialShareModalProps> = ({ review, onClose }) => {
  const [platforms, setPlatforms] = useState<string[]>(['Facebook']);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [step, setStep] = useState<ShareStep>('config');

  const availablePlatforms = [
    { id: 'Facebook', icon: '🔵' },
    { id: 'Instagram', icon: '📸' },
    { id: 'LinkedIn', icon: '💼' },
    { id: 'Twitter/X', icon: '🐦' }
  ];

  const togglePlatform = (p: string) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]);
  };

  const handleInitiateShare = () => {
    if (platforms.length === 0) return;
    setStep('confirm');
  };

  const handleFinalConfirm = () => {
    setStep('publishing');
    // Simulate API broadcast
    setTimeout(() => {
      setStep('success');
      setTimeout(onClose, 2500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl max-h-[95vh] rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 sm:px-10 sm:py-8 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase italic">
              {step === 'config' && 'Configure Broadcast'}
              {step === 'confirm' && 'Verify Share'}
              {(step === 'publishing' || step === 'success') && 'Success'}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              {step === 'config' && 'Select destinations and timing'}
              {step === 'confirm' && 'Final check before sending'}
              {step === 'publishing' && 'Transmitting to social networks...'}
              {step === 'success' && 'Review broadcast complete'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all border border-transparent hover:border-slate-200"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 scrollbar-hide">
          {step === 'config' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left Column: Social Card Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Post Preview</h4>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Optimized for Social</span>
                </div>
                
                <div className="bg-slate-950 aspect-square rounded-[48px] p-8 sm:p-12 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl group border border-white/10">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#16A34A]/10 to-transparent opacity-50"></div>
                   <div className="relative z-10 space-y-6">
                      <div className="flex gap-1 justify-center animate-bounce">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-[#FACC15] text-2xl drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]">★</span>)}
                      </div>
                      <p className="text-white font-bold text-xl sm:text-2xl leading-tight px-2">"{review.comment}"</p>
                      <div className="pt-8 border-t border-white/10 w-full max-w-[200px]">
                        <p className="text-[#16A34A] font-black uppercase text-[11px] tracking-[0.3em]">{review.author}</p>
                        <p className="text-slate-500 text-[9px] font-bold mt-1 uppercase">Local Business Hero</p>
                      </div>
                   </div>
                   {/* Background Graphics */}
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#16A34A]/10 rounded-full blur-3xl pointer-events-none"></div>
                </div>
              </div>

              {/* Right Column: Configuration */}
              <div className="space-y-10">
                <section className="space-y-5">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Broadcast Channels</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availablePlatforms.map(p => (
                      <button 
                        key={p.id} 
                        onClick={() => togglePlatform(p.id)}
                        className={`p-4 rounded-3xl border-2 text-xs font-black uppercase tracking-widest transition-all flex flex-col items-center gap-3 active:scale-95 ${
                          platforms.includes(p.id) 
                          ? 'border-[#16A34A] bg-emerald-50 text-[#16A34A] shadow-lg shadow-emerald-500/10' 
                          : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
                        }`}
                      >
                        <span className="text-2xl">{p.icon}</span>
                        {p.id}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="space-y-6 pt-10 border-t border-slate-100">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-900 uppercase italic">Smart Scheduler</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Post during peak traffic hours</p>
                      </div>
                      <button 
                        onClick={() => setIsScheduling(!isScheduling)}
                        className={`w-14 h-7 rounded-full relative transition-all duration-300 ${isScheduling ? 'bg-[#16A34A]' : 'bg-slate-200'}`}
                      >
                        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${isScheduling ? 'right-1' : 'left-1'}`}></div>
                      </button>
                   </div>
                   
                   {isScheduling && (
                     <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="relative group">
                          <label className="absolute -top-2.5 left-5 bg-white px-2 text-[9px] font-black text-[#16A34A] uppercase tracking-widest z-10">Select Execution Date</label>
                          <input 
                            type="datetime-local" 
                            value={scheduleDate}
                            onChange={(e) => setScheduleDate(e.target.value)}
                            className="w-full p-5 bg-white border-2 border-[#16A34A]/30 rounded-3xl text-sm font-black text-slate-900 focus:border-[#16A34A] outline-none transition-all shadow-inner" 
                          />
                        </div>
                        <p className="mt-3 text-[10px] text-slate-400 italic font-medium px-2">Recommendation: Automated AI timing (Friday at 6:00 PM) improves visibility by 24%.</p>
                     </div>
                   )}
                </section>

                <div className="pt-4">
                  <button 
                    onClick={handleInitiateShare}
                    disabled={platforms.length === 0}
                    className="w-full bg-[#16A34A] text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-emerald-500/30 hover:bg-slate-950 transition-all active:scale-[0.98] disabled:opacity-30 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    {isScheduling ? 'Review Schedule' : 'Review & Share'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="max-w-xl mx-auto space-y-12 py-10 animate-in fade-in zoom-in-95 duration-500">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-[40px] flex items-center justify-center mx-auto text-4xl shadow-sm border border-amber-100">⚖️</div>
                <h4 className="text-3xl font-[900] text-slate-900 uppercase italic tracking-tighter">Ready for blast-off?</h4>
                <p className="text-slate-500 font-bold max-w-md mx-auto">Please confirm the broadcast details. This action will schedule public posts on your selected social assets.</p>
              </div>

              <div className="bg-slate-50 rounded-[48px] p-10 space-y-8 border border-slate-200/50 shadow-inner">
                 <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Channels</span>
                    <div className="flex gap-2">
                       {platforms.map(p => (
                         <span key={p} className="bg-white px-3 py-1 rounded-lg text-[9px] font-black uppercase text-slate-900 shadow-sm border border-slate-100">{p}</span>
                       ))}
                    </div>
                 </div>
                 <div className="flex justify-between items-center py-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Post Timing</span>
                    <span className="text-sm font-black text-[#16A34A] uppercase italic">
                      {isScheduling ? `Scheduled: ${new Date(scheduleDate).toLocaleString()}` : 'Immediate Transmission'}
                    </span>
                 </div>
                 <div className="space-y-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Content Safety Check</span>
                    <div className="flex items-center gap-3 text-emerald-600">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                       <span className="text-xs font-bold">100% Brand-Safe Content Verified</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setStep('config')}
                  className="flex-1 py-5 rounded-[24px] font-black text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all uppercase tracking-widest text-xs"
                >
                  Edit Configuration
                </button>
                <button 
                  onClick={handleFinalConfirm}
                  className="flex-[2] bg-[#16A34A] text-white py-6 rounded-[28px] font-black uppercase tracking-widest text-sm shadow-2xl shadow-emerald-500/40 hover:bg-slate-950 transition-all active:scale-95"
                >
                  Confirm & Broadcast
                </button>
              </div>
            </div>
          )}

          {step === 'publishing' && (
            <div className="py-24 text-center space-y-12 animate-in fade-in duration-500">
              <div className="relative">
                <div className="w-32 h-32 border-8 border-slate-100 border-t-[#16A34A] rounded-full animate-spin mx-auto shadow-inner"></div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">🛰️</div>
              </div>
              <div className="space-y-4">
                 <h4 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Syncing Networks</h4>
                 <p className="text-slate-400 font-bold max-w-sm mx-auto">Gemini is establishing secure API tunnels to your social assets. Hold tight...</p>
              </div>
              <div className="flex justify-center gap-2">
                 <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                 <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                 <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-24 text-center space-y-10 animate-in zoom-in-95 duration-700">
              <div className="w-32 h-32 bg-emerald-50 text-[#16A34A] rounded-[56px] flex items-center justify-center mx-auto text-6xl shadow-[0_20px_60px_-15px_rgba(22,163,74,0.3)] animate-pulse">
                ✨
              </div>
              <div className="space-y-3">
                <h4 className="text-4xl font-[900] text-slate-900 uppercase italic tracking-tighter">Broadcast Scheduled!</h4>
                <p className="text-slate-500 text-lg font-bold">Your reputation win is being shared with the world.</p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Auto-closing window...</span>
              </div>
            </div>
          )}
        </div>

        {/* Static Footer */}
        <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center shrink-0">
           <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
             Powered by GSR Multi-Channel Intelligence Engine v5.6
           </p>
        </div>
      </div>
    </div>
  );
};

export default SocialShareModal;
