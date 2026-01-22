import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  onLogin: () => void;
  onToolsClick: () => void;
  onBusinessSignup: () => void;
  onAgencySignup: () => void;
  onHomeClick: () => void;
  onBlogClick: () => void;
  onAboutClick?: () => void;
  onScrollToSection?: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onLogin, 
  onToolsClick, 
  onBusinessSignup, 
  onAgencySignup, 
  onHomeClick, 
  onBlogClick, 
  onAboutClick,
  onScrollToSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Services', section: 'services' },
    { name: 'About', type: 'about' },
    { name: 'Pricing', section: 'pricing' },
    { name: 'Agency', section: 'agency-program' },
    { name: 'Blog', type: 'blog' },
  ];

  const handleNav = (item: any) => {
    setIsMobileMenuOpen(false);
    if (item.type === 'about' && onAboutClick) {
      onAboutClick();
    } else if (item.type === 'blog') {
      onBlogClick();
      window.scrollTo(0,0);
    } else if (item.section && onScrollToSection) {
      onScrollToSection(item.section);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 transition-all duration-700 z-[200] ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-10'}`}>
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className={`glass-panel rounded-[24px] md:rounded-[40px] px-4 md:px-10 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-slate-200 bg-white/95' : 'border-transparent bg-transparent shadow-none'}`}>
            
            <div className="flex items-center gap-4 md:gap-16">
              <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => { onHomeClick(); window.scrollTo(0,0); }}>
                 <Logo variant="full" className="scale-[0.55] md:scale-[0.8] origin-left" />
              </div>
              
              <nav className="hidden lg:flex items-center gap-2 xl:gap-8">
                {navItems.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => handleNav(item)}
                    className="text-[11px] xl:text-[12px] font-black text-slate-500 hover:text-[#16A34A] transition-all uppercase tracking-[0.2em] cursor-pointer p-4 hover:translate-y-[-2px] relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#16A34A] transition-all group-hover:w-4"></span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <button 
                onClick={onLogin}
                className="hidden md:block text-[11px] xl:text-[12px] font-black text-slate-500 hover:text-[#16A34A] transition-all uppercase tracking-[0.2em] px-5 py-2 cursor-pointer hover:translate-y-[-2px]"
              >
                Login
              </button>
              <button 
                onClick={onBusinessSignup}
                className="px-6 md:px-10 py-3 md:py-5 bg-[#0F172A] text-white rounded-[16px] md:rounded-[24px] text-[9px] md:text-[12px] font-black uppercase tracking-widest shadow-xl hover:bg-[#16A34A] hover:shadow-emerald-500/30 transition-all active:scale-95 whitespace-nowrap cursor-pointer hover:translate-y-[-2px]"
              >
                Start Ranking
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900 cursor-pointer" aria-label="Toggle Mobile Menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[300] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="p-6 md:p-8 flex justify-between items-center">
            <div onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); window.scrollTo(0,0); }} className="cursor-pointer">
              <Logo variant="full" className="scale-90 origin-left" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 bg-slate-50 rounded-full cursor-pointer" aria-label="Close Menu">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div className="pt-10 px-10 space-y-8">
           {navItems.map(item => (
             <button key={item.name} onClick={() => handleNav(item)} className="block w-full text-left text-4xl md:text-5xl font-black uppercase italic text-[#0F172A] border-b-4 border-transparent hover:border-[#16A34A] transition-all cursor-pointer pb-2">{item.name}</button>
           ))}
           <div className="pt-12 space-y-6">
             <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-slate-100 rounded-3xl font-black uppercase tracking-widest text-base cursor-pointer">Login</button>
             <button onClick={() => { onBusinessSignup(); setIsMobileMenuOpen(false); }} className="w-full py-6 bg-[#16A34A] text-white rounded-3xl font-black uppercase tracking-widest text-base shadow-2xl cursor-pointer">Get Started Now</button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;
