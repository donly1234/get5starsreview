
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  onLogin: () => void;
  onToolsClick: () => void;
  onBusinessSignup: () => void;
  onAgencySignup: () => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onToolsClick, onBusinessSignup, onAgencySignup, onHomeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Pricing', section: 'pricing' },
    { name: 'Agency Hub', section: 'pricing' },
    { name: 'Testimonials', section: 'testimonials' },
    { name: 'Blog', section: 'blog' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="container mx-auto px-6">
          <div className={`glass-panel rounded-[32px] px-8 py-3 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'shadow-2xl border-slate-200' : 'border-transparent bg-transparent shadow-none'}`}>
            
            <div className="flex items-center gap-12">
              <div className="cursor-pointer hover:scale-105 transition-transform" onClick={onHomeClick}>
                 <Logo variant="full" className="scale-75 origin-left" />
              </div>
              
              <nav className="hidden lg:flex items-center gap-10">
                {navItems.map(item => (
                  <button 
                    key={item.name}
                    onClick={() => scrollTo(item.section)}
                    className="text-[11px] font-black text-slate-500 hover:text-green-600 transition-colors uppercase tracking-[0.2em]"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onBusinessSignup}
                className="px-8 py-4 bg-slate-950 text-white rounded-[18px] text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-green-600 transition-all active:scale-95"
              >
                See Your Rankings
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="pt-32 px-10 space-y-8">
           {navItems.map(item => (
             <button key={item.name} onClick={() => scrollTo(item.section)} className="block text-4xl font-black uppercase italic text-slate-900">{item.name}</button>
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
