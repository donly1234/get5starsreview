
import React, { useState } from 'react';

interface ReviewCardProps {
  review: any;
  isSelected: boolean;
  isBulkMode: boolean;
  isBulkSelected: boolean;
  onSelect: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, isSelected, isBulkMode, isBulkSelected, onSelect }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - (touchStart || 0);
    // Only allow left swipe
    if (diff < 0) {
      setSwipeOffset(Math.max(diff, -100));
    }
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    
    if (isLeftSwipe) {
      setSwipeOffset(-100);
      // Simulate mark as read
      setTimeout(() => setSwipeOffset(0), 1500);
    } else {
      setSwipeOffset(0);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background Action (Swipe Reveal) */}
      <div className="absolute inset-0 bg-emerald-500 flex items-center justify-end px-6 text-white font-bold text-xs uppercase tracking-widest">
        Mark Read
      </div>

      <div 
        onClick={onSelect}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        className={`bg-white p-4 border rounded-2xl transition-all cursor-pointer relative z-10 ${
          isSelected ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600/50' : 'border-slate-100'
        } ${isBulkSelected ? 'ring-2 ring-blue-600' : ''}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {isBulkMode ? (
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isBulkSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'}`}>
                {isBulkSelected && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0">
                {review.avatar}
              </div>
            )}
            <div>
              <h4 className="text-sm font-bold text-slate-900 truncate max-w-[120px]">{review.author}</h4>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{review.platform} • {review.date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-3 h-3 ${i < review.rating ? (review.rating <= 2 ? 'text-rose-500' : 'text-emerald-500') : 'text-slate-100'} fill-current`} 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          "{review.comment}"
        </p>

        <div className="flex items-center justify-between">
           <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
             review.sentiment === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
           }`}>
             {review.sentiment}
           </div>
           <div className="flex gap-4">
              <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600">Flag</button>
              <button className="text-[10px] font-bold text-blue-600">Respond</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
