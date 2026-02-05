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

// AI Suite Components
import LiveVoiceAssistant from './components/Dashboard/AI/LiveVoiceAssistant';
import ImageOptimizationTool from './components/Dashboard/AI/ImageOptimizationTool';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'prospector' | 'voice-assistant' | 'image-clean' | 'blog' | 'blog-post' | 'privacy' | 'terms' | 'about' | 'reset-password' | 'connection-error';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  const initApp = async () => {
    setAuthReady(false);
    setView('loading');
    
    // Increased timeout to 10 seconds to handle severe DNS/Network delays
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Connection Timeout: Database Unreachable")), 10000)
    );

    try {
      const authPromise = supabase.auth.getSession();
      const { data: { session } } = await Promise.race([authPromise, timeout]) as any;

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
        } else if (p && p !== 'loading' && p !== 'dashboard' && p !== 'landing' && p !== 'connection-error') {
          setView(p);
        } else {
          setView('landing');
        }
      }
    } catch (err: any) {
      console.error("Auth initialization failed:", err);
      // Explicitly catch network/DNS errors
      setView('connection-error');
    } finally {
      setAuthReady(true);
    }
  };

  useEffect(() => {
    initApp();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        if (event === 'SIGNED_IN') {
          setView('dashboard');
        }
      } else {
        setUser(null);
        setUserType(null);
        if (event === 'SIGNED_OUT') {
          setView('landing');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    if (newView === 'landing') {
      url.search = '';
    } else {
      url.searchParams.set('p', newView);
    }
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

  if (view === 'connection-error') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[28px] flex items-center justify-center text-4xl mb-8 animate-pulse shadow-inner">ðŸ“¡</div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-4">Signal Lost.</h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold max-w-md leading-relaxed mb-10">
          Our core link to the database is experiencing DNS failures (Supabase Infrastructure Issue). This affects users in specific regions. We are attempting to reconnect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
          <button 
            onClick={() => initApp()} 
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-black transition-all active:scale-95"
          >
            Retry Connection
          </button>
          <a 
            href="https://status.supabase.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full py-4 bg-white dark:bg-white/5 text-slate-400 rounded-2xl font-black uppercase text-xs tracking-widest border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center"
          >
            Check Provider Status
          </a>
        </div>
      </div>
    );
  }

  if (!authReady && view === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Establishing GSR Core Link...</p>
      </div>
    );
  }

  if (user && view === 'dashboard') {
    return <Dashboard onLogout={handleLogout} userType={userType || 'business'} user={user} onUpgradeFlow={() => navigate('signup-business')} />;
  }

  const isAuthView = ['login', 'signup-business', 'signup-agency', 'reset-password'].includes(view);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 overflow-x-hidden relative">
      {!isAuthView && <div className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-yellow-400 z-[1000] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />}
      
      {isAuthView && (
        <div className="fixed inset-0 z-[500] bg-white dark:bg-slate-950 overflow-y-auto">
          {(view === 'login' || view === 'reset-password') && (
            <Login 
              initialMode={view === 'reset-password' ? 'reset' : 'login'}
              onCancel={() => navigate('landing')} 
              onBusinessSignup={() => navigate('signup-business')} 
              onAgencySignup={() => navigate('signup-agency')} 
              onLoginSuccess={() => setView('dashboard')} 
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
        {view === 'app-selector' && <AppSelector onSelect={navigate as any} onBack={() => navigate('landing')} />}
        {view === 'blog' && <BlogPage onPostClick={(id) => { setSelectedPostId(id); navigate('blog-post'); }} />}
        {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => navigate('blog')} onSignup={() => navigate('signup-business')} />}
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'heatmap' && <div className="pt-20"><HeatmapTool onSignup={() => navigate('signup-business')} /></div>}
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
                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">Market Intel</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase italic">Analyze Your <span className="text-emerald-600">Local Rank</span></h2>
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
            <Features onSignup={() => navigate('signup-business')} onContact={() => scrollToSection('contact')} />
            <VideoTestimonials />
            <Pricing onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} />
            <FAQ />
            <Blog onPostClick={(id) => { setSelectedPostId(id); navigate('blog-post'); }} onViewAll={() => navigate('blog')} />
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

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
        className={`fixed bottom-8 right-8 z-[150] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7-7"/></svg>
      </button>
    </div>
  );
};

export default App;
