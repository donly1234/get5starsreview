
import React, { useState, useEffect } from 'react';
import ReviewDetailView from './ReviewDetailView';
import ReviewCard from './ReviewCard';

interface ReviewInboxProps {
  isTrial?: boolean;
  onShowUpgrade?: () => void;
}

const ReviewInbox: React.FC<ReviewInboxProps> = ({ isTrial = false, onShowUpgrade }) => {
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [filterRating, setFilterRating] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [reviews, setReviews] = useState<any[]>([]); // Starting with empty data

  const selectedReview = reviews.find(r => r.id === selectedReviewId);

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'All' || filterRating === 'All Ratings') return true;
    if (filterRating === 'Negative') return r.rating <= 2;
    if (filterRating === 'Positive') return r.rating >= 4;
    return true;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="flex h-[calc(100vh-250px)] md:h-[calc(100vh-250px)] gap-6 overflow-hidden relative">
      <div className={`flex flex-col h-full w-full transition-all duration-300 ${selectedReviewId ? 'lg:w-1/3 hidden lg:flex' : 'w-full'}`}>
        <div className="p-4 bg-white md:bg-transparent border-b md:border-none border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input 
              type="text" 
              placeholder="Search feedback..." 
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20" 
            />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setIsBulkMode(!isBulkMode)}
              className={`p-2.5 rounded-xl border transition-all ${isBulkMode ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </button>
            <select 
              value={filterRating} 
              onChange={(e) => setFilterRating(e.target.value)}
              className="text-xs font-bold bg-white border border-slate-200 rounded-xl px-3 py-2.5 shadow-sm focus:outline-none"
            >
              <option>All Ratings</option>
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-0 space-y-3 pb-20 scroll-smooth flex flex-col items-center justify-center text-center">
          {reviews.length === 0 ? (
            <div className="animate-in fade-in zoom-in-95 duration-700 max-w-sm px-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">📭</div>
              <h3 className="text-xl font-black text-slate-900 uppercase italic mb-2">Inbox is Empty</h3>
              <p className="text-slate-400 text-sm font-medium">Connect your Google Business Profile to begin monitoring real-time customer feedback.</p>
              <button className="mt-8 px-8 py-3 bg-[#16A34A] text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg">Link Profile</button>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <ReviewCard 
                key={rev.id} 
                review={rev} 
                isSelected={selectedReviewId === rev.id}
                isBulkMode={isBulkMode}
                isBulkSelected={selectedIds.has(rev.id)}
                onSelect={() => isBulkMode ? toggleSelect(rev.id) : setSelectedReviewId(rev.id)}
              />
            ))
          )}
        </div>
      </div>

      {selectedReviewId && (
        <div className="fixed inset-0 lg:relative lg:flex-1 lg:inset-auto z-[60] lg:z-0 bg-white lg:bg-transparent overflow-hidden">
          <div className="h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <ReviewDetailView 
              review={selectedReview} 
              onBack={() => setSelectedReviewId(null)} 
              isMobileComposer={true}
              isTrial={isTrial}
              onShowUpgrade={onShowUpgrade}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewInbox;
