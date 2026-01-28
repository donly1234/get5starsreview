
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Core Components
import Header from './components/Header';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import AboutUs from './components/AboutUs';
import AboutView from './components/AboutView';
import InteractiveDemo from './components/InteractiveDemo';
import ROICalculator from './components/ROICalculator';
import MapComparison from './components/MapComparison';
import DashboardShowcase from './components/DashboardShowcase';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Features from './components/Features';
import ComparisonTable from './components/ComparisonTable';
import VideoTestimonials from './components/VideoTestimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import BlogPage from './components/BlogPage';
import BlogPostView from './components/BlogPostView';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpBusiness from './components/Auth/SignUpBusiness';
import SignUpAgency from './components/Auth/SignUpAgency';
import Login from './components/Auth/Login';
import AppSelector from './components/Auth/AppSelector';
import GBPAuditTool from './components/GBPAuditTool';
import HeatmapTool from './components/HeatmapTool';
import ProspectingTool from './components/Dashboard/Agency/ProspectingTool';
import LegalView from './components/LegalView';
import SocialNudge from './components/SocialNudge';
import Newsletter from './components/Newsletter';

// AI Suite Components (Explicit paths)
import VeoVideoGenerator from './components/Dashboard/AI/VeoVideoGenerator.tsx';
import LiveVoiceAssistant from './components/Dashboard/AI/LiveVoiceAssistant.tsx';
import ImageOptimizationTool from './components/Dashboard/AI/ImageOptimizationTool.tsx';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'prospector' | 'video-gen' | 'voice-assistant' | 'image-clean' | 'blog' | 'blog-post' | 'privacy' | 'terms' | 'about' | 'reset-password';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('g5sr_theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('g5sr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('g5sr_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: view === 'landing' ? '/' : `/${view}`,
        page_title: document.title,
      });
    }

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        setView('dashboard');
      } else {
        const params = new URLSearchParams(window.location.search);
        const p = params.get('p') as AppView;
        const id = params.get('id');
        if (p === 'blog-post' && id) {
          setSelectedPostId(id);
          setView('blog-post');
        } else if (p) {
          setView(p);
        } else {
          setView('landing');
        }
      }
      setAuthReady(true);
    };

    checkSession();

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (view === 'landing') {
      setTimeout(() => {
        document.querySelectorAll('section, .reveal-item').forEach(el => {
          el.classList.add('reveal');
          observer.observe(el);
        });
      }, 100);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        if (['login', 'signup-business', 'signup-agency', 'landing', 'loading'].includes(view)) {
           setView('dashboard');
        }
      } else {
        setUser(null);
        setUserType(null);
        if (view === 'dashboard') setView('landing');
      }
    });

    const consent = localStorage.getItem('g5sr_cookies_accepted');
    if (!consent) setShowCookieConsent(true);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [view]);

  const handleLogout = async () => {
    setAuthReady(false);
    await supabase.auth.signOut();
    setUser(null);
    setUserType(null);
    setView('landing');
    setAuthReady(true);
  };

  const navigate = (newView: AppView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const url = new URL(window.location.href);
    if (newView === 'landing') url.search = '';
    else url.searchParams.set('p', newView);
    window.history.pushState({}, '', url);
  };

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    setView('blog-post');
    window.scrollTo({ top: 0, behavior: 'instant' });
    const url = new URL(window.location.href);
    url.searchParams.set('p', 'blog-post');
    url.searchParams.set('id', id);
    window.history.pushState({}, '', url);
  };

  const scrollToSection = (sectionId: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (view === 'loading' || !authReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Synchronizing Protocols...</p>
      </div>
    );
  }

  if (user && view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} userType={userType || 'business'} user={user} onUpgradeFlow={() => navigate('signup-business')} />;
  }

  const isAuthView = ['login', 'signup-business', 'signup-agency', 'reset-password'].includes(view);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 overflow-x-hidden relative">
      {!isAuthView && <SystemStatus />}
      {!isAuthView && <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-yellow-400 z-[1000] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />}
      
      {isAuthView && (
        <div className="fixed inset-0 z-[500] bg-white dark:bg-slate-900 overflow-y-auto">
          {(view === 'login' || view === 'reset-password') && (
            <Login 
              initialMode={view === 'reset-password' ? 'reset' : 'login'}
              onCancel={() => navigate('landing')} 
              onBusinessSignup={() => navigate('signup-business')} 
              onAgencySignup={() => navigate('signup-agency')} 
              onLoginSuccess={() => {}} 
            />
          )}
          {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToAgency={() => navigate('signup-agency')} />}
          {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToBusiness={() => navigate('signup-business')} />}
        </div>
      )}

      {!isAuthView && (
        <Header 
          user={user}
          onLogout={handleLogout}
          onLogin={() => navigate('login')} 
          onToolsClick={() => navigate('app-selector')}
          onBusinessSignup={() => navigate('signup-business')} 
          onAgencySignup={() => navigate('signup-agency')}
          onHomeClick={() => navigate('landing')}
          onBlogClick={() => navigate('blog')}
          onAboutClick={() => navigate('about')}
          onScrollToSection={scrollToSection}
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        />
      )}
      
      <main className={`flex-grow ${isAuthView ? 'hidden' : 'block'}`}>
        {view === 'app-selector' && (
          <AppSelector 
            onSelect={(id) => {
              if (id === 'gbp-auditor') navigate('auditor');
              else if (id === 'heatmap') navigate('heatmap');
              else if (id === 'prospector') navigate('prospector');
              else if (id === 'video-ad-gen') navigate('video-gen');
              else if (id === 'voice-ai') navigate('voice-assistant');
              else if (id === 'image-optimizer') navigate('image-clean');
              else navigate(user ? 'dashboard' : 'login');
            }} 
            onBack={() => navigate('landing')} 
          />
        )}
        {view === 'blog' && <BlogPage onPostClick={handlePostClick} />}
        {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => navigate('blog')} onSignup={() => navigate('signup-business')} />}
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'heatmap' && <div className="pt-20"><HeatmapTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'video-gen' && <div className="pt-20"><VeoVideoGenerator onSignup={() => navigate('signup-business')} /></div>}
        {view === 'voice-assistant' && <div className="pt-20"><LiveVoiceAssistant onSignup={() => navigate('signup-business')} /></div>}
        {view === 'image-clean' && <div className="pt-20"><ImageOptimizationTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'prospector' && <div className="pt-20 container mx-auto px-6"><ProspectingTool onSignup={() => navigate('signup-business')} onHome={() => navigate('landing')} /></div>}
        {(view === 'privacy' || view === 'terms') && <LegalView type={view} onBack={() => navigate('landing')} />}
        {view === 'about' && <AboutView onBack={() => navigate('landing')} onStart={() => navigate('signup-business')} />}
        
        {view === 'landing' && (
          <div className="overflow-x-hidden">
            <Hero onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} onProspectorClick={() => navigate('prospector')} />
            <Integrations />
            <AboutUs />
            <section id="ranking-report" className="py-24 bg-slate-50 dark:bg-slate-900/50">
              <div className="container mx-auto px-6 text-center mb-16">
                <span className="text-[#16A34A] font-black text-[10px] uppercase tracking-widest">Market Intel</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] dark:text-white uppercase italic">Get Your <span className="text-[#16A34A]">Ranking Report</span></h2>
              </div>
              <div className="container mx-auto px-6">
                <ProspectingTool onSignup={() => navigate('signup-business')} onHome={() => navigate('landing')} />
              </div>
            </section>
            <InteractiveDemo />
            <ROICalculator onStart={() => navigate('signup-business')} />
            <MapComparison />
            <DashboardShowcase />
            <ComparisonTable onBusinessClick={() => navigate('signup-business')} onAgencyClick={() => navigate('signup-agency')} />
            <HowItWorks onStart={() => navigate('signup-business')} />
            <Services onAuditClick={() => navigate('app-selector')} onSignup={() => navigate('signup-business')} />
            <TrustStack />
            <Features onSignup={() => navigate('signup-business')} onContact={() => scrollToSection('contact')} />
            <VideoTestimonials />
            <Pricing onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} />
            <FAQ />
            <Blog onPostClick={handlePostClick} onViewAll={() => navigate('blog')} />
            <ContactUs />
            <Newsletter />
            <SocialNudge />
          </div>
        )}
      </main>

      {!isAuthView && (
        <Footer 
          onBlogClick={() => navigate('blog')} 
          onHomeClick={() => navigate('landing')} 
          onPrivacyClick={() => navigate('privacy')}
          onTermsClick={() => navigate('terms')}
          onAboutClick={() => navigate('about')}
          onScrollToSection={scrollToSection}
          onAgencySignup={() => navigate('signup-agency')}
          onToolsClick={() => navigate('app-selector')}
        />
      )}

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 z-[150] w-12 h-12 bg-black dark:bg-[#16A34A] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7-7"/></svg>
      </button>

      {showCookieConsent && (
        <CookieConsent onClose={() => { localStorage.setItem('g5sr_cookies_accepted', 'true'); setShowCookieConsent(false); }} onViewPrivacy={() => navigate('privacy')} />
      )}
    </div>
  );
};

const SystemStatus = () => (
  <div className="bg-slate-950 py-2 border-b border-white/5 relative z-[30]">
     <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
           </span>
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GSR Session Engine v5.6: Online & Synchronized</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">System Health: Nominal</span>
        </div>
     </div>
  </div>
);

const CookieConsent = ({ onClose, onViewPrivacy }: { onClose: () => void; onViewPrivacy: () => void }) => (
  <div className="fixed bottom-0 inset-x-0 z-[500] p-6 animate-in slide-in-from-bottom-full duration-500">
     <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl shrink-0">🍪</div>
           <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">We value your privacy.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">We use cookies to enhance your experience. View our <button onClick={onViewPrivacy} className="underline text-[#16A34A] font-bold">Privacy Policy</button>.</p>
           </div>
        </div>
        <button onClick={onClose} className="px-8 py-3 bg-black dark:bg-[#16A34A] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-80 transition-all shadow-xl cursor-pointer">Accept All</button>
     </div>
  </div>
);

const TrustStack = () => (
  <div className="container mx-auto px-6 py-12">
     <div className="bg-slate-950 rounded-[32px] md:rounded-[48px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-[#16A34A] shadow-2xl">
        <div className="space-y-4 text-center md:text-left">
           <span className="text-[#16A34A] font-black text-[10px] uppercase tracking-[0.3em]">Market Authority</span>
           <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight leading-none">The Trusted Choice for <br />Local Domination.</h3>
           <p className="text-slate-400 font-medium max-w-sm mx-auto md:mx-0 text-sm">Join 2,000+ brands automating their path to Google Maps perfection.</p>
        </div>
        <div className="flex gap-6 md:gap-10">
           <div className="text-center group transition-transform hover:scale-110">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">98%</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">Retention</p>
           </div>
           <div className="text-center group transition-transform hover:scale-110">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">1.2M</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">Requests</p>
           </div>
           <div className="text-center group transition-transform hover:scale-110">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">24/7</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">AI Logic</p>
           </div>
        </div>
     </div>
  </div>
);

export default App;
