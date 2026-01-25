
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
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
  user,
  onLogout,
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
      <header className={`fixed top-0 left-0 right-0 transition-all duration-700 z-[200] pointer-events-none ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass-panel pointer-events-auto rounded-[24px] md:rounded-[32px] px-3 md:px-6 py-2 md:py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl border-slate-200 bg-white/95' : 'border-transparent bg-transparent shadow-none'}`}>
            
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
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex flex-col items-end">
                    <p className="text-[10px] font-black text-slate-900 uppercase truncate max-w-[120px]">{user.user_metadata?.full_name || user.email}</p>
                    <button onClick={onLogout} className="text-[8px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors">Logout</button>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#16A34A] border-2 border-white shadow-md flex items-center justify-center text-white font-black text-xs">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                  </div>
                </div>
              ) : (
                <>
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
                </>
              )}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900 cursor-pointer" aria-label="Toggle Mobile Menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[300] bg-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-50">
            <div onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); window.scrollTo(0,0); }} className="cursor-pointer">
              <Logo variant="full" className="scale-75 origin-left" />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer" aria-label="Close Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        
        <div className="pt-12 px-8 space-y-6">
           {navItems.map((item, idx) => (
             <button 
              key={item.name} 
              onClick={() => handleNav(item)} 
              style={{ transitionDelay: `${idx * 100}ms` }}
              className={`block w-full text-left text-4xl font-black uppercase italic text-[#0F172A] border-b-4 border-transparent hover:border-[#16A34A] transition-all transform cursor-pointer ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
             >
               {item.name}
             </button>
           ))}
           
           <div 
            className={`pt-12 space-y-4 transition-all duration-700 delay-500 transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
           >
             {user ? (
               <button onClick={onLogout} className="w-full py-5 bg-rose-50 text-rose-600 rounded-[24px] font-black uppercase tracking-widest text-sm cursor-pointer hover:bg-rose-100 transition-colors">Logout Account</button>
             ) : (
               <>
                 <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-slate-100 text-slate-900 rounded-[24px] font-black uppercase tracking-widest text-sm cursor-pointer hover:bg-slate-200 transition-colors">Login</button>
                 <button onClick={() => { onBusinessSignup(); setIsMobileMenuOpen(false); }} className="w-full py-5 bg-[#16A34A] text-white rounded-[24px] font-black uppercase tracking-widest text-sm shadow-xl cursor-pointer hover:bg-[#0F172A] transition-all">Get Started Free</button>
               </>
             )}
           </div>
        </div>
        
        {/* Mobile Menu Footer Decoration */}
        <div className="absolute bottom-12 left-8 right-8 text-center opacity-30 pointer-events-none">
           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">#1 Google Maps Automation</p>
        </div>
      </div>
    </>
  );
};

export default Header;
