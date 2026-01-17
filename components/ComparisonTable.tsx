
import React from 'react';

interface ComparisonTableProps {
  onBusinessClick: () => void;
  onAgencyClick: () => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ onBusinessClick, onAgencyClick }) => {
  return (
    <section id="comparison" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Decision Guide</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-black mb-6">Which solution is <span className="text-green-600">right for you?</span></h3>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Business Solution */}
          <div className="bg-green-50/30 border-2 border-green-100 rounded-[40px] p-10 flex flex-col relative overflow-hidden group hover:border-green-200 transition-all">
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-all"></div>
            
            <div className="mb-8">
              <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-green-600/20">🏢</div>
              <h4 className="text-2xl font-black text-black mb-2">For Businesses</h4>
              <p className="text-slate-600 text-sm font-medium">Manage your own reputation and build trust with direct tools.</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                'Manage your own reputation',
                'Single or Multi-location access',
                'Direct dashboard control',
                '14-day free trial available',
                'Scalable business features',
                'Plans from $25/month'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={onBusinessClick}
              className="w-full bg-green-600 text-white py-5 rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-500/20 active:scale-[0.98]"
            >
              Try Free for 14 Days
            </button>
          </div>

          {/* Agency Solution - Updated from Purple to Black/Yellow */}
          <div className="bg-slate-50 border-2 border-slate-200 rounded-[40px] p-10 flex flex-col relative overflow-hidden group hover:border-black transition-all">
             <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-black/5 rounded-full blur-2xl group-hover:bg-black/10 transition-all"></div>

            <div className="mb-8">
              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-black/20">🚀</div>
              <h4 className="text-2xl font-black text-black mb-2">For Agencies</h4>
              <p className="text-slate-600 text-sm font-medium">Scale your services with a fully branded reseller platform.</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                'Resell to unlimited clients',
                'Full white-label branding',
                'Multi-client centralized dashboard',
                'No free trial - immediate setup',
                'Agency-only reseller tools',
                'Fixed price: $250/month'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                  <svg className="w-5 h-5 text-yellow-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                  {item}
                </li>
              ))}
            </ul>

            <button 
              onClick={onAgencyClick}
              className="w-full bg-black text-white py-5 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
            >
              Start Agency Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;