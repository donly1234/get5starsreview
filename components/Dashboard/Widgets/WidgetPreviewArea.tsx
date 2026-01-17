
import React from 'react';

interface WidgetPreviewAreaProps {
  config: {
    name: string;
    type: string;
    primaryColor: string;
    minRating: number;
    showDate: boolean;
    showPlatform: boolean;
    borderRadius: string;
    shadowIntensity: string;
    fontFamily: string;
    count: number;
    sources: string[];
  };
}

const mockReviews = [
  { id: 1, author: 'Alex Rivera', rating: 5, date: '2 hours ago', text: 'Absolutely incredible service. Highly recommended for anyone looking for quality bread and welcoming staff!', platform: 'Google' },
  { id: 2, author: 'Emily Zhang', rating: 4, date: 'Yesterday', text: 'Great atmosphere and friendly staff. The coffee was a bit cold but they replaced it immediately without any hassle.', platform: 'Facebook' },
  { id: 3, author: 'Chris Nolan', rating: 5, date: '2 days ago', text: 'The best experience I have had in years. Professional, clean, and extremely high-quality products.', platform: 'Yelp' },
  { id: 4, author: 'Sarah J.', rating: 5, date: '3 days ago', text: 'Wow, just wow. Exceeded all my expectations. The special birthday cake they made was spectacular!', platform: 'Google' },
  { id: 5, author: 'Michael T.', rating: 5, date: '1 week ago', text: 'Been a customer for 5 years and they never disappoint. Consistent quality and great service every single time.', platform: 'Trustpilot' },
];

const WidgetPreviewArea: React.FC<WidgetPreviewAreaProps> = ({ config }) => {
  const filteredReviews = mockReviews
    .filter(r => r.rating >= config.minRating)
    .filter(r => config.sources.includes(r.platform))
    .slice(0, config.count);

  const getFontFamily = () => {
    switch (config.fontFamily) {
      case 'Serif': return 'font-serif';
      case 'Mono': return 'font-mono';
      case 'System': return 'font-sans';
      default: return 'font-inter';
    }
  };

  const getShadow = () => {
    const intensity = parseInt(config.shadowIntensity) / 10;
    if (intensity === 0) return 'none';
    return `0 ${intensity * 4}px ${intensity * 10}px -${intensity * 2}px rgba(0,0,0,0.15)`;
  };

  const StarRating = ({ rating, size = "w-3 h-3" }: { rating: number, size?: string }) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${size} ${i < rating ? 'text-yellow-400' : 'text-slate-200'} fill-current`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  const renderLayout = () => {
    const commonStyle = {
      borderRadius: `${config.borderRadius}px`,
      boxShadow: getShadow(),
      fontFamily: getFontFamily()
    };

    if (filteredReviews.length === 0) {
      return <div className="p-8 text-center text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">No reviews match your filters</div>;
    }

    switch (config.type) {
      case 'Badge':
        return (
          <div className="flex justify-center">
            <div 
              style={{ ...commonStyle, borderColor: config.primaryColor }}
              className={`bg-white p-6 border-2 flex items-center gap-6 animate-in zoom-in-90 duration-300 ${getFontFamily()}`}
            >
              <div className="text-center border-r border-slate-100 pr-6 shrink-0">
                <p className="text-4xl font-black text-slate-900 leading-none">4.8</p>
                <div className="flex justify-center mt-2"><StarRating rating={5} size="w-4 h-4" /></div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">Trusted Business</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">1,284 Verified Reviews</p>
                <div className="flex gap-1.5 mt-3 opacity-60">
                   {config.sources.map(s => <span key={s} className="w-4 h-4 bg-slate-100 rounded flex items-center justify-center text-[8px] font-black text-slate-400 border border-slate-200">{s.charAt(0)}</span>)}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Carousel':
        const rev = filteredReviews[0];
        return (
          <div className={`relative group px-12 animate-in fade-in duration-500 ${getFontFamily()}`}>
            <div 
              style={commonStyle}
              className="bg-white p-10 border border-slate-100 flex flex-col items-center text-center relative"
            >
              <div className="absolute top-4 left-6 text-slate-100 font-serif text-8xl leading-none select-none">“</div>
              <div className="flex justify-center mb-6 z-10"><StarRating rating={rev.rating} size="w-5 h-5" /></div>
              <p className="text-slate-700 italic text-xl mb-8 leading-relaxed z-10">"{rev.text}"</p>
              <div className="z-10">
                <h5 className="font-bold text-slate-900 text-lg">{rev.author}</h5>
                <div className="flex items-center justify-center gap-2 mt-2">
                  {config.showPlatform && <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{rev.platform}</span>}
                  {config.showDate && <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>}
                </div>
              </div>
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        );

      case 'Grid':
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500 ${getFontFamily()}`}>
            {filteredReviews.map(r => (
              <div key={r.id} style={commonStyle} className="bg-white p-6 border border-slate-100 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={r.rating} />
                  {config.showPlatform && <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{r.platform}</span>}
                </div>
                <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed line-clamp-4">"{r.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-sm font-bold text-slate-900">{r.author}</span>
                  {config.showDate && <span className="text-[10px] text-slate-400 font-bold">{r.date}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'Sidebar':
        return (
          <div className={`w-[320px] mx-auto space-y-4 animate-in slide-in-from-left-4 duration-500 ${getFontFamily()}`}>
            {filteredReviews.map(r => (
              <div key={r.id} style={{ ...commonStyle, borderRadius: `${parseInt(config.borderRadius)/1.5}px` }} className="bg-white p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={r.rating} />
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 mb-3 italic leading-relaxed">"{r.text}"</p>
                <div className="flex items-center justify-between">
                   <p className="text-[11px] font-bold text-slate-900">{r.author}</p>
                   {config.showPlatform && <span className="text-[8px] font-black text-blue-500 uppercase">{r.platform}</span>}
                </div>
              </div>
            ))}
          </div>
        );

      case 'Floating':
        return (
          <div className={`flex flex-col items-center justify-center h-full pt-20 ${getFontFamily()}`}>
            <div 
              style={{ ...commonStyle, borderColor: config.primaryColor }}
              className="bg-white border-2 p-4 flex items-center gap-4 animate-pulse hover:animate-none cursor-pointer group shadow-2xl transition-all"
            >
              <div style={{ backgroundColor: config.primaryColor }} className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900">4.8 / 5.0</span>
                  <StarRating rating={5} size="w-3.5 h-3.5" />
                </div>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Trusted Social Proof</p>
              </div>
            </div>
            <p className="text-slate-400 text-xs text-center italic mt-12 max-w-xs">The Floating Badge typically anchors to the corner of your page. Here it's centered for previewing.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`w-full ${getFontFamily()}`}>
      {renderLayout()}
    </div>
  );
};

export default WidgetPreviewArea;
