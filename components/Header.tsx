import React, { useState, useEffect } from 'react';
import Logo from './Logo.tsx';

interface HeaderProps {
  onLogin: () => void;
  onToolsClick: () => void;
  onBusinessSignup: () => void;
  onAgencySignup: () => void;
  onHomeClick: () => void;
  onBlogClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onToolsClick, onBusinessSignup, onAgencySignup, onHomeClick, onBlogClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', type: 'tools' },
    { name: 'Process', section: 'how-it-works', type: 'scroll' },
    { name: 'Pricing', section: 'pricing', type: 'scroll' },
    { name: 'Testimonials', section: 'testimonials', type: 'scroll' },
    { name: 'Blog', section: 'blog', type: 'view' },
  ];

  const handleNav = (item: any) => {
    setIsMobileMenuOpen(false);
    if (item.type === 'tools') {
      onToolsClick();
    } else if (item.type === 'view') {
      onBlogClick();
    } else {
      onHomeClick();
      // Wait for home render then scroll
      setTimeout(() => {
        const el = document.getElementById(item.section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass-panel rounded-[24px] md:rounded-[32px] px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl border-slate-200 bg-white/90' : 'border-transparent bg-transparent shadow-none'}`}>
            
            <div className="flex items-center gap-4 lg:gap-8">
              <div className="cursor-pointer hover:scale-105 transition-transform" onClick={onHomeClick}>
                 <Logo variant="full" className="scale-[0.55] md:scale-[0.7] origin-left" />
              </div>
              
              <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
                {navItems.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => handleNav(item)}
                    className="text-[10px] xl:text-[11px] font-black text-slate-500 hover:text-green-600 transition-colors uppercase tracking-[0.15em] xl:tracking-[0.2em]"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={onLogin}
                className="hidden md:block text-[10px] xl:text-[11px] font-black text-slate-500 hover:text-green-600 transition-colors uppercase tracking-[0.15em] xl:tracking-[0.2em] px-2 xl:px-4"
              >
                Login
              </button>
              <button 
                onClick={onBusinessSignup}
                className="px-4 md:px-6 xl:px-8 py-3 md:py-4 bg-slate-950 text-white rounded-xl md:rounded-[18px] text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-green-600 transition-all active:scale-95 whitespace-nowrap"
              >
                Start Ranking
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="p-8 flex justify-between items-center">
            <Logo variant="full" className="scale-75 origin-left" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-full">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div className="pt-10 px-10 space-y-8">
           {navItems.map(item => (
             <button key={item.name} onClick={() => handleNav(item)} className="block text-4xl font-black uppercase italic text-slate-900 border-b-4 border-transparent hover:border-green-600 transition-all">{item.name}</button>
           ))}
           <div className="pt-10 space-y-4">
             <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-slate-100 rounded-2xl font-black uppercase tracking-widest">Login</button>
             <button onClick={() => { onBusinessSignup(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Get Started</button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;