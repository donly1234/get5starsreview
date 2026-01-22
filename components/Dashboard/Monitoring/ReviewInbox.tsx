import React, { useState, useEffect } from 'react';
import ReviewDetailView from './ReviewDetailView';
import ReviewCard from './ReviewCard';

const mockReviews = [
  {
    id: 'rev-1',
    author: "James Wilson",
    platform: "Google",
    rating: 5,
    date: "2 hours ago",
    comment: "Excellent service! The bread was fresh and the staff was very welcoming. My new favorite spot in the neighborhood.",
    responded: false,
    sentiment: 'positive',
    avatar: "JW"
  },
  {
    id: 'rev-2',
    author: "Robert Brown",
    platform: "Yelp",
    rating: 2,
    date: "3 days ago",
    comment: "It was too crowded and I had to wait 20 minutes for a simple croissant. Needs better queue management.",
    responded: false,
    sentiment: 'negative',
    avatar: "RB"
  },
  {
    id: 'rev-3',
    author: "Aria Stone",
    platform: "Facebook",
    rating: 4,
    date: "Yesterday",
    comment: "Loved the atmosphere. The coffee was a bit cold but they replaced it immediately without any hassle.",
    responded: true,
    sentiment: 'positive',
    avatar: "AS"
  },
  {
    id: 'rev-4',
    author: "Sarah J.",
    platform: "Trustpilot",
    rating: 3,
    date: "5 days ago",
    comment: "Decent products but the online ordering system is a bit clunky. Took me three tries to check out.",
    responded: false,
    sentiment: 'neutral',
    avatar: "SJ"
  },
  {
    id: 'rev-5',
    author: "Michael T.",
    platform: "Google",
    rating: 5,
    date: "1 week ago",
    comment: "Been a customer for 5 years and they never disappoint. Consistent quality.",
    responded: true,
    sentiment: 'positive',
    avatar: "MT"
  }
];

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

  const selectedReview = mockReviews.find(r => r.id === selectedReviewId);

  const filteredReviews = mockReviews.filter(r => {
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

        <div className="px-4 py-2 md:hidden flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
          Swipe left to mark read
        </div>

        <div 
          className="flex-1 overflow-y-auto px-4 md:px-0 space-y-3 pb-20 scroll-smooth"
          onScroll={(e) => {
            const target = e.currentTarget;
            if (target.scrollTop < -50 && !isRefreshing) handleRefresh();
          }}
        >
          {isRefreshing && (
             <div className="flex justify-center py-4">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
             </div>
          )}

          {filteredReviews.map((rev) => (
            <ReviewCard 
              key={rev.id} 
              review={rev} 
              isSelected={selectedReviewId === rev.id}
              isBulkMode={isBulkMode}
              isBulkSelected={selectedIds.has(rev.id)}
              onSelect={() => isBulkMode ? toggleSelect(rev.id) : setSelectedReviewId(rev.id)}
            />
          ))}
        </div>

        {isBulkMode && selectedIds.size > 0 && (
          <div className="fixed bottom-20 left-4 right-4 bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-4 z-[100]">
            <span className="text-sm font-bold">{selectedIds.size} Selected</span>
            <div className="flex gap-2">
              <button className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-bold">Mark Read</button>
              <button className="bg-rose-600 hover:bg-rose-700 px-3 py-1.5 rounded-lg text-xs font-bold">Delete</button>
            </div>
          </div>
        )}
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

      {!selectedReviewId && (
        <button 
          className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 animate-bounce transition-transform active:scale-95"
          onClick={() => {}}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
        </button>
      )}
    </div>
  );
};

export default ReviewInbox;
