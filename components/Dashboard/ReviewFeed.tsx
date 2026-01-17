import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

interface ReviewFeedProps {
  isTrial?: boolean;
  profileId?: string;
}

const mockReviews = [
  {
    id: 1,
    author: "James Wilson",
    platform: "Google",
    rating: 5,
    date: "2 hours ago",
    comment: "Excellent service! The bread was fresh and the staff was very welcoming. My new favorite spot in the neighborhood.",
    responded: false
  },
  {
    id: 2,
    author: "Aria Stone",
    platform: "Facebook",
    rating: 4,
    date: "Yesterday",
    comment: "Loved the atmosphere. The coffee was a bit cold but they replaced it immediately without any hassle.",
    responded: true
  },
  {
    id: 3,
    author: "Robert Brown",
    platform: "Yelp",
    rating: 2,
    date: "3 days ago",
    comment: "It was too crowded and I had to wait 20 minutes for a simple croissant. Needs better queue management.",
    responded: false
  }
];

const ReviewFeed: React.FC<ReviewFeedProps> = ({ isTrial = false, profileId }) => {
  const [filter, setFilter] = useState('All');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!profileId) return;
      setLoading(true);
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setReviews(data);
      } else {
        // Fallback to mock data for demonstration if DB is empty
        setReviews(mockReviews);
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

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'Google': return <span className="text-red-600 font-bold">G</span>;
      case 'Facebook': return <span className="text-blue-600 font-bold">f</span>;
      case 'Yelp': return <span className="text-red-700 font-bold">Y</span>;
      default: return null;
    }
  };

  const filteredReviews = reviews.filter(rev => {
    if (filter === 'All') return true;
    if (filter === 'Positive') return rev.rating >= 4;
    if (filter === 'Negative') return rev.rating <= 2;
    return true;
  });

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Recent Feedback</h3>
          <p className="text-sm text-slate-500">Monitor and respond across your connected channels.</p>
        </div>
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 shadow-inner">
          {['All', 'Positive', 'Negative'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100 min-h-[200px]">
        {loading ? (
          <div className="p-20 text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Syncing Feed...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No reviews found matching filter</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="p-8 hover:bg-slate-50/50 transition-colors group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[20px] bg-slate-100 flex items-center justify-center font-black text-slate-400 shadow-sm">
                    {(review.author || 'U').charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        {getPlatformIcon(review.platform)} {review.platform}
                      </span>
                      <span>•</span>
                      <span>{review.date || review.date_received || 'Recently'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < review.rating ? getRatingColor(review.rating) : 'text-slate-100'} fill-current`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-base text-slate-600 mb-6 leading-relaxed">
                "{review.comment}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {review.responded ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                      Responded
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      Pending Response
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {isTrial && !review.responded && (
                    <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase border border-blue-100 flex items-center gap-1 shadow-sm group-hover:scale-105 transition-transform">
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                      AI Suggestions Locked
                    </span>
                  )}
                  <button className="text-blue-600 text-sm font-black hover:underline px-2 py-1 rounded-lg hover:bg-blue-50 transition-all">
                    {review.responded ? 'View Response' : isTrial ? 'Manual Response' : 'AI Assistant'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-100 text-center relative group">
        <button className="text-blue-600 text-sm font-black hover:text-blue-700 transition-colors uppercase tracking-widest">
          View all {loading ? '...' : filteredReviews.length > 5 ? filteredReviews.length : '1,284'} reviews
        </button>
        {isTrial && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-black shadow-xl">Upgrade for Full History</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewFeed;