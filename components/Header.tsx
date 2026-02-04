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
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
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
  onScrollToSection,
  isDarkMode,
  onThemeToggle
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'AI Tools', type: 'tools' },
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
    } else if (item.type === 'tools') {
      onToolsClick();
    } else if (item.section && onScrollToSection) {
      onScrollToSection(item.section);
    }
  };

  const handleLogoClick = () => {
    onHomeClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 transition-all duration-700 z-[200] pointer-events-none ${isScrolled ? 'py-2 md:py-4' : 'py-4 md:py-8'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className={`glass-panel pointer-events-auto rounded-[24px] md:rounded-[32px] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl border-slate-200 bg-white/95 dark:bg-slate-900/95 dark:border-white/10' : 'border-transparent bg-transparent shadow-none'}`}>
            
            <div className="flex items-center gap-2 md:gap-12">
              <div className="cursor-pointer hover:scale-105 transition-transform" onClick={handleLogoClick}>
                 <Logo variant="full" className="scale-[0.55] md:scale-[0.75] origin-left" />
              </div>
              
              <nav className="hidden xl:flex items-center gap-2">
                {navItems.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => handleNav(item)}
                    className={`text-[10px] font-black transition-all uppercase tracking-[0.2em] cursor-pointer px-5 py-3 rounded-xl ${
                      item.type === 'tools' 
                      ? 'bg-emerald-600 text-white hover:bg-slate-950 shadow-lg shadow-emerald-600/20' 
                      : 'text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={onThemeToggle}
                className="p-2 md:p-3 bg-slate-100 dark:bg-white/5 rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? '🌞' : '🌙'}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex flex-col items-end">
                    <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase truncate max-w-[120px]">{user.user_metadata?.full_name || user.email}</p>
                    <button onClick={onLogout} className="text-[8px] font-black text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors">Terminate Session</button>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-950 dark:bg-emerald-600 shadow-xl flex items-center justify-center text-white font-black text-xs border border-white/10">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onLogin}
                    className="hidden sm:block text-[10px] font-black text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all uppercase tracking-[0.2em] px-5 py-3 cursor-pointer"
                  >
                    Login
                  </button>
                  <button 
                    onClick={onBusinessSignup}
                    className="px-5 md:px-8 py-3 md:py-4 bg-[#16A34A] text-white rounded-[16px] md:rounded-[20px] text-[10px] md:text-[11px] font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(22,163,74,0.3)] hover:bg-slate-950 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                  >
                    Start Ranking
                  </button>
                </div>
              )}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-3 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer" 
                aria-label="Toggle Mobile Menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between items-end overflow-hidden">
                   <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-5 translate-y-1.5 rotate-45' : 'w-5'}`} />
                   <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-3'}`} />
                   <div className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-4'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[300] bg-white dark:bg-slate-950 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-full flex flex-col p-8 pt-24 overflow-y-auto">
           <div className="flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <button 
                 key={item.name} 
                 onClick={() => handleNav(item)} 
                 style={{ transitionDelay: `${idx * 75}ms` }}
                 className={`text-5xl md:text-7xl font-black uppercase italic text-left transition-all duration-500 transform ${
                   isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                 } ${item.type === 'tools' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'} hover:text-emerald-500 hover:translate-x-4`}
                >
                  {item.name}
                </button>
              ))}
           </div>
           
           <div className={`mt-auto space-y-4 pt-12 border-t border-slate-100 dark:border-white/10 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
             {!user ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full py-6 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white rounded-[32px] font-black uppercase tracking-widest text-sm">Login Hub</button>
                 <button onClick={() => { onBusinessSignup(); setIsMobileMenuOpen(false); }} className="w-full py-6 bg-emerald-500 text-white rounded-[32px] font-black uppercase tracking-widest text-sm shadow-xl">Get Started Free</button>
               </div>
             ) : (
               <button onClick={onLogout} className="w-full py-6 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-[32px] font-black uppercase tracking-widest text-sm">Terminate Session</button>
             )}
           </div>
        </div>
      </div>
    </>
  );
};

export default Header;

