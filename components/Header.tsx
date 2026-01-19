
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  onLogin: () => void;
  onToolsClick: () => void;
  onBusinessSignup: () => void;
  onAgencySignup: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onToolsClick, onBusinessSignup, onAgencySignup }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tools = [
    { name: 'GBP Management', action: onToolsClick },
    { name: 'Heatmap Generator', action: onToolsClick },
    { name: 'GBP Auditor', action: onToolsClick },
    { name: 'Partner Hub', action: onToolsClick },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
               <Logo variant="full" className="scale-75 md:scale-90 origin-left" />
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors">Pricing</button>
              <button onClick={() => scrollToSection('pricing')} className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors">Agency Program</button>
              
              <div className="relative group">
                <button onClick={onToolsClick} className="text-sm font-bold text-slate-600 group-hover:text-[#16A34A] transition-colors flex items-center gap-1.5 py-2">
                  Tools
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-[-20px] pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 min-w-[220px] overflow-hidden p-2">
                    {tools.map((tool) => (
                      <button key={tool.name} onClick={tool.action} className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#16A34A] rounded-xl transition-all flex items-center justify-between group/item">
                        {tool.name}
                        <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={() => scrollToSection('testimonials')} className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors">Testimonials</button>
              <button onClick={() => scrollToSection('blog')} className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors">Blog</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors">Contact Us</button>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={onLogin}
              className="hidden md:block px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
              LOGIN
            </button>
            <button 
              onClick={onBusinessSignup}
              className="px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-sm font-black text-white bg-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tight"
            >
              <span className="md:hidden">SEE RANKINGS</span>
              <span className="hidden md:inline">SEE YOUR RANKINGS</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full pt-24 px-6 pb-12 overflow-y-auto">
            <div className="space-y-6 flex-1">
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-2xl font-black text-slate-900 uppercase italic">Pricing</button>
              <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-2xl font-black text-slate-900 uppercase italic">Agency Program</button>
              <div className="h-px bg-slate-100" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Tools</p>
              {tools.map(tool => (
                <button key={tool.name} onClick={() => { tool.action(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-lg font-bold text-slate-600">{tool.name}</button>
              ))}
              <div className="h-px bg-slate-100" />
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-2xl font-black text-slate-900 uppercase italic">Testimonials</button>
              <button onClick={() => scrollToSection('blog')} className="block w-full text-left text-2xl font-black text-slate-900 uppercase italic">Blog</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-2xl font-black text-slate-900 uppercase italic">Contact Us</button>
            </div>
            
            <div className="pt-8 space-y-4">
               <button onClick={onLogin} className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs">Login to Account</button>
               <button onClick={onBusinessSignup} className="w-full py-4 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-green-500/20">Start Free Trial</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;