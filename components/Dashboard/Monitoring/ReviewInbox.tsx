
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [reviews, setReviews] = useState<any[]>([]);

  const selectedReview = reviews.find(r => r.id === selectedReviewId);

  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'All' || filterRating === 'All Ratings') return true;
    if (filterRating === 'Negative') return r.rating <= 2;
    if (filterRating === 'Positive') return r.rating >= 4;
    return true;
  });

  const markAllAsRead = () => {
    setReviews(prev => prev.map(r => ({ ...r, responded: true })));
    setSelectedIds(new Set());
    alert("System Sync: All reviews marked as processed.");
  };

  const handleConnectProfile = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      alert("Authentication portal opening in separate window...");
    }, 1500);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="flex h-[calc(100vh-250px)] gap-6 overflow-hidden relative">
      <div className={`flex flex-col h-full w-full transition-all duration-300 ${selectedReviewId ? 'lg:w-1/3 hidden lg:flex' : 'w-full'}`}>
        <div className="p-4 bg-white md:bg-transparent flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shrink-0 mb-4">
          <div className="relative flex-1">
            <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" placeholder="Search feedback stream..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none shadow-sm" />
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={markAllAsRead}
              className="px-4 py-3 bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 hover:border-emerald-600 rounded-2xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              Mark All Read
            </button>
            <button onClick={() => setIsBulkMode(!isBulkMode)} className={`p-3 rounded-2xl border transition-all ${isBulkMode ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 shadow-sm'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </button>
            <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} className="text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm focus:outline-none">
              <option>All Ratings</option>
              <option>Positive</option>
              <option>Negative</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-1 space-y-3 pb-24 scroll-smooth">
          {reviews.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 md:p-24 animate-in fade-in zoom-in-95 duration-700">
              <div className="relative mb-8">
                 <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center text-4xl shadow-inner border border-slate-100 relative z-10">📡</div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase italic mb-3 tracking-tighter">System Offline</h3>
              <p className="text-slate-400 text-sm font-bold max-w-xs mx-auto leading-relaxed">Connect your Google Business Profile to activate the high-speed feedback stream.</p>
              <button onClick={handleConnectProfile} disabled={isConnecting} className="mt-10 w-full max-w-[320px] py-5 bg-[#16A34A] text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-slate-950 transition-all flex items-center justify-center gap-3">
                {isConnecting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Establish G-Maps Link'}
              </button>
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
            <ReviewDetailView review={selectedReview} onBack={() => setSelectedReviewId(null)} isTrial={isTrial} onShowUpgrade={onShowUpgrade} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewInbox;
