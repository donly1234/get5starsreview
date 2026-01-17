
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
             <Logo variant="full" className="scale-90 origin-left" />
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors"
            >
              Agency Program
            </button>
            
            {/* Tools Dropdown */}
            <div className="relative group">
              <button 
                onClick={onToolsClick}
                className="text-sm font-bold text-slate-600 group-hover:text-[#16A34A] transition-colors flex items-center gap-1.5 py-2"
              >
                Tools
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className="absolute top-full left-[-20px] pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 min-w-[220px] overflow-hidden p-2">
                  {tools.map((tool) => (
                    <button
                      key={tool.name}
                      onClick={tool.action}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#16A34A] rounded-xl transition-all flex items-center justify-between group/item"
                    >
                      {tool.name}
                      <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-sm font-bold text-slate-600 hover:text-[#16A34A] transition-colors"
            >
              Contact Us
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onLogin}
            className="px-6 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
          >
            LOGIN
          </button>
          <button 
            onClick={onBusinessSignup}
            className="px-6 py-2.5 text-sm font-black text-white bg-black rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-tight"
          >
            SEE YOUR RANKINGS
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
