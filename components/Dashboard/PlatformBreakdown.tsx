
import React from 'react';

interface PlatformBreakdownProps {
  isTrial?: boolean;
  // added onUpgrade prop to fix error in Dashboard.tsx
  onUpgrade?: () => void;
}

const platforms = [
  { name: 'Google', rating: '4.9', count: 842, color: 'text-red-500', locked: false },
  { name: 'Facebook', rating: '4.7', count: 320, color: 'text-blue-600', locked: true },
  { name: 'Yelp', rating: '4.2', count: 122, color: 'text-red-700', locked: true },
];

const PlatformBreakdown: React.FC<PlatformBreakdownProps> = ({ isTrial = false, onUpgrade }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Platform Breakdown</h3>
      
      <div className="space-y-4">
        {platforms.map((p) => {
          const isLocked = isTrial && p.locked;
          return (
            <div key={p.name} className={`flex items-center justify-between p-3 rounded-xl border border-slate-50 transition-all group ${isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'}`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black group-hover:scale-110 transition-transform relative">
                  <span className={p.color}>{p.name.charAt(0)}</span>
                  {isLocked && <span className="absolute -top-1 -right-1 text-[8px]">🔒</span>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                  <p className="text-xs text-slate-500">{isLocked ? 'Upgrade Required' : `${p.count} reviews`}</p>
                </div>
              </div>
              {!isLocked && (
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{p.rating}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 ${i < Math.floor(Number(p.rating)) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button 
        onClick={isTrial ? onUpgrade : undefined}
        className={`w-full mt-6 py-3 rounded-xl text-xs font-bold transition-all ${isTrial ? 'bg-slate-100 text-slate-400' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
      >
        Add New Platform {isTrial && '🔒'}
      </button>
    </div>
  );
};

export default PlatformBreakdown;
