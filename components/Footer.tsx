
import React from 'react';
import Logo from './Logo.tsx';

interface FooterProps {
  onBlogClick: () => void;
  onHomeClick: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBlogClick, onHomeClick, onPrivacyClick, onTermsClick }) => {
  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-24">
          <div className="space-y-6 md:space-y-8">
            <Logo variant="full" className="brightness-0 invert scale-90 origin-left" />
            <div className="space-y-4 text-xs md:text-sm font-medium text-slate-400">
               <p className="flex items-center gap-3">
                 <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                 Richmond, KY
               </p>
               <p className="flex items-center gap-3">
                 <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                 323-212-5327
               </p>
               <p className="flex items-center gap-3">
                 <svg className="w-5 h-5 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                 Support@get5starsreview.com
               </p>
            </div>
            <div className="flex gap-4">
              {['f', 't', 'i', 'in', 'y'].map((s, i) => (
                <div key={i} className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#16A34A] transition-all cursor-pointer">
                  <span className="font-bold text-[10px] md:text-xs uppercase">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-black mb-6 md:mb-8 uppercase tracking-tight">Services</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium text-slate-400">
              <li><button onClick={onHomeClick} className="hover:text-[#16A34A] transition-colors text-left">GBP Management Service</button></li>
              <li><button onClick={onHomeClick} className="hover:text-[#16A34A] transition-colors text-left">Agency Partner Program</button></li>
              <li><button onClick={onHomeClick} className="hover:text-[#16A34A] transition-colors text-left">Local Citation Building</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-black mb-6 md:mb-8 uppercase tracking-tight">Helpful Links</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm font-medium text-slate-400">
              <li><button onClick={onHomeClick} className="hover:text-[#16A34A] transition-colors text-left">Home</button></li>
              <li><button onClick={onBlogClick} className="hover:text-[#16A34A] transition-colors font-bold text-white text-left">Latest Blog Posts</button></li>
              <li><button onClick={onPrivacyClick} className="hover:text-[#16A34A] transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={onTermsClick} className="hover:text-[#16A34A] transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold uppercase tracking-widest">
             <span className="text-white">© Get5StarsReview</span>
             <button onClick={onTermsClick} className="text-slate-400 hover:text-[#16A34A]">Terms</button>
             <button onClick={onPrivacyClick} className="text-slate-400 hover:text-[#16A34A]">Privacy</button>
           </div>
           <div className="flex items-center gap-2 md:gap-3">
              <span className="text-[10px] md:text-xs font-bold text-slate-400">Excellent</span>
              <div className="flex text-[#16A34A] gap-0.5">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white">Trustpilot</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
