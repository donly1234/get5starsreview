import React from 'react';

interface HeroProps {
  onStartBusiness: () => void;
  onStartAgency: () => void;
  onProspectorClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartBusiness, onStartAgency, onProspectorClick }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Get5StarsReview | Rank #1 on Google Maps',
          text: 'Automate your 5-star reputation and dominate local search results with Get5StarsReview.',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.origin);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <section className="relative pt-24 pb-8 md:pt-48 lg:pt-56 md:pb-12 overflow-hidden hero-gradient">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[1000px] h-[300px] md:h-[1000px] bg-[#16A34A]/5 blur-[80px] md:blur-[200px] rounded-full pointer-events-none animate-pulse duration-[20s] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <div className="max-w-6xl mx-auto text-center space-y-8 md:space-y-16">
          
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/60 glass-panel rounded-full shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-[#16A34A]"></span>
            </span>
            <span className="text-[8px] sm:text-[10px] md:text-[13px] font-[900] text-slate-800 uppercase tracking-[0.15em] md:tracking-[0.25em] italic whitespace-nowrap overflow-hidden">
              AI-Powered Reputation Growth • Ranking Engine Active
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[92px] font-[900] text-[#0F172A] leading-[1.2] md:leading-[1] tracking-[-0.04em] uppercase italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Dominate Google Maps <br />
            <span className="text-[#16A34A]">With AI Automation.</span>
          </h1>
          
          <p className="text-slate-500 text-sm sm:text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-semibold max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            Stop chasing reviews. We automate your <span className="text-[#16A34A] font-black underline decoration-[#FACC15] underline-offset-4">5-star reputation</span> and turn local searchers into customers on autopilot.
          </p>

          <div className="relative z-50 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500 pb-12 md:pb-32">
            <button 
              type="button"
              onClick={onStartBusiness}
              className="w-full sm:w-auto px-8 md:px-12 lg:px-14 py-5 md:py-7 bg-[#16A34A] text-white rounded-2xl md:rounded-[28px] font-black text-sm md:text-xl shadow-[0_20px_50px_rgba(22,163,74,0.3)] hover:bg-[#0F172A] hover:scale-[1.05] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Start Free Trial
            </button>
            <button 
              type="button"
              onClick={() => {
                if (onProspectorClick) onProspectorClick();
              }}
              className="w-full sm:w-auto px-8 md:px-12 lg:px-14 py-5 md:py-7 bg-[#0F172A] text-white rounded-2xl md:rounded-[28px] font-black text-sm md:text-xl shadow-2xl hover:bg-[#16A34A] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer"
            >
              Analyze Lost Profit
            </button>
            <button 
              type="button"
              onClick={handleShare}
              className="w-full sm:w-auto px-8 md:px-12 lg:px-14 py-5 md:py-7 bg-white border-2 border-slate-200 text-[#0F172A] rounded-2xl md:rounded-[28px] font-black text-sm md:text-xl shadow-sm hover:border-[#16A34A] hover:text-[#16A34A] active:scale-95 transition-all uppercase tracking-[0.1em] cursor-pointer flex items-center justify-center gap-2 md:gap-3"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
