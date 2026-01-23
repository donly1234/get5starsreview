import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface ReviewFeedProps {
  isTrial?: boolean;
  profileId?: string;
  onConnectClick?: () => void;
}

const ReviewFeed: React.FC<ReviewFeedProps> = ({ isTrial = false, profileId, onConnectClick }) => {
  const [filter, setFilter] = useState('All');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!profileId) {
        // Simulate a delay even if no profileId to show the system state
        setTimeout(() => setLoading(false), 800);
        return;
      }
      setLoading(true);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (data) {
        setReviews(data);
      }
      setLoading(false);
    };

    fetchReviews();
  }, [profileId]);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-emerald-500';
    if (rating === 3) return 'text-yellow-500';
    return 'text-rose-500';
  };

  const filteredReviews = reviews.filter(rev => {
    if (filter === 'All') return true;
    if (filter === 'Positive') return rev.rating >= 4;
    if (filter === 'Negative') return rev.rating <= 2;
    return true;
  });

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase italic">Intelligence Feed</h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Real-time feedback monitoring engine.</p>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 w-full sm:w-auto overflow-x-auto">
          {['All', 'Positive', 'Negative'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              disabled={reviews.length === 0}
              className={`flex-1 sm:flex-none px-4 py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap disabled:opacity-30 ${
                filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100 min-h-[400px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-20">
            <div className="w-10 h-10 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Scanning Data Channels...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-24 text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-[40px] md:rounded-[56px] flex items-center justify-center text-5xl shadow-inner border border-slate-100 relative z-10">
                📡
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500/5 rounded-full blur-3xl -z-0 animate-pulse"></div>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
               <h4 className="text-2xl font-[900] text-slate-900 uppercase italic tracking-tighter">Connect Your Profile</h4>
               <p className="text-slate-500 font-semibold leading-relaxed">
                 We haven't detected any active review streams yet. To begin automating your reputation, you must link your <span className="text-[#16A34A]">Google Business Profile</span>.
               </p>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
              <button 
                onClick={onConnectClick}
                className="bg-[#16A34A] text-white px-8 py-5 rounded-[20px] font-black uppercase tracking-widest text-xs shadow-[0_20px_40px_rgba(22,163,74,0.2)] hover:bg-[#0F172A] transition-all transform active:scale-95 flex items-center justify-center gap-3 group"
              >
                <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" className="w-4 h-4 brightness-0 invert" alt="G" />
                Connect Google Maps
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </button>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Takes less than 60 seconds</p>
            </div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-24 text-center space-y-6">
            <div className="text-4xl">🔍</div>
            <div>
              <h4 className="text-lg font-black text-slate-900 uppercase italic">No {filter} Reviews</h4>
              <p className="text-sm text-slate-500 font-medium">None of your current reviews match this filter.</p>
            </div>
            <button onClick={() => setFilter('All')} className="text-emerald-600 font-black uppercase text-[10px] tracking-widest hover:underline">Clear All Filters</button>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="p-5 sm:p-8 hover:bg-slate-50/50 transition-colors group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[16px] sm:rounded-[20px] bg-slate-100 flex items-center justify-center font-black text-slate-400 shadow-sm text-sm">
                    {(review.author || 'U').charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                    <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                      <span>{review.platform || 'Google'}</span>
                      <span>•</span>
                      <span className="truncate max-w-[60px] sm:max-w-none">{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${i < review.rating ? getRatingColor(review.rating) : 'text-slate-100'} fill-current`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed font-medium">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {review.responded ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                      Responded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest">
                      Pending AI
                    </span>
                  )}
                </div>
                <button className="text-emerald-600 text-[10px] font-black uppercase tracking-widest hover:underline px-3 py-2 rounded-lg hover:bg-emerald-50 transition-all active:scale-95">
                  {review.responded ? 'Details' : 'Smart Respond'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {reviews.length > 0 && (
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button className="text-slate-400 text-[9px] font-black hover:text-emerald-600 transition-colors uppercase tracking-[0.2em]">
            Export Full Sentiment Archive
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewFeed;
