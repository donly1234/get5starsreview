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
      <header className={`fixed top-0 left-0 right-0 transition-all duration-700 pointer-events-none z-[200] ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass-panel rounded-[24px] md:rounded-[32px] px-3 md:px-6 py-2 md:py-3 flex items-center justify-between transition-all duration-500 pointer-events-auto ${isScrolled ? 'shadow-2xl border-slate-200 bg-white/95' : 'border-transparent bg-transparent shadow-none'}`}>
            
            <div className="flex items-center gap-2 md:gap-8">
              <div className="cursor-pointer hover:scale-105 transition-transform" onClick={() => { onHomeClick(); window.scrollTo(0,0); }}>
                 <Logo variant="full" className="scale-[0.5] md:scale-[0.7] origin-left" />
              </div>
              
              <nav className="hidden lg:flex items-center gap-2 xl:gap-6">
                {navItems.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => handleNav(item)}
                    className="text-[10px] xl:text-[11px] font-black text-slate-500 hover:text-[#16A34A] transition-all uppercase tracking-[0.15em] xl:tracking-[0.2em] cursor-pointer p-4 hover:scale-110 active:scale-95"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 md:gap-4">
              <button 
                onClick={onLogin}
                className="hidden md:block text-[10px] xl:text-[11px] font-black text-slate-500 hover:text-[#16A34A] transition-all uppercase tracking-[0.15em] xl:tracking-[0.2em] px-4 py-2 cursor-pointer hover:scale-110 active:scale-95"
              >
                Login
              </button>
              <button 
                onClick={onBusinessSignup}
                className="px-3 md:px-6 xl:px-8 py-2.5 md:py-4 bg-[#0F172A] text-white rounded-[14px] md:rounded-[18px] text-[8px] md:text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-[#16A34A] transition-all active:scale-95 whitespace-nowrap cursor-pointer"
              >
                Start Ranking
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900 cursor-pointer" aria-label="Toggle Mobile Menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[300] bg-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="p-6 md:p-8 flex justify-between items-center">
            <div onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); window.scrollTo(0,0); }} className="cursor-pointer">
              <Logo variant="full" className="scale-75 origin-left" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-full cursor-pointer" aria-label="Close Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div className="pt-6 px-8 space-y-6">
           {navItems.map(item => (
             <button key={item.name} onClick={() => handleNav(item)} className="block w-full text-left text-3xl md:text-4xl font-black uppercase italic text-[#0F172A] border-b-4 border-transparent hover:border-[#16A34A] transition-all cursor-pointer">{item.name}</button>
           ))}
           <div className="pt-8 space-y-4">
             <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-slate-100 rounded-2xl font-black uppercase tracking-widest text-sm cursor-pointer">Login</button>
             <button onClick={() => { onBusinessSignup(); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-[#16A34A] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl cursor-pointer">Get Started</button>
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;
