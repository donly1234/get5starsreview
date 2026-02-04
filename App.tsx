
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import AboutUs from './components/AboutUs';
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
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import SignUpBusiness from './components/Auth/SignUpBusiness';
import SignUpAgency from './components/Auth/SignUpAgency';
import ProspectingTool from './components/Dashboard/Agency/ProspectingTool';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'login' | 'signup-business' | 'signup-agency' | 'dashboard' | 'prospector';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setUser(session.user);
          setUserType(session.user.user_metadata?.user_type || 'business');
          setView('dashboard');
        } else {
          setView('landing');
        }
      } catch (e) {
        setView('landing');
      } finally {
        setAuthReady(true);
      }
    };
    init();
  }, []);

  const navigate = (v: AppView) => {
    setView(v);
    window.scrollTo(0, 0);
  };

  if (view === 'loading' || !authReady) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && view === 'dashboard') {
    return <Dashboard onLogout={() => { supabase.auth.signOut(); setUser(null); setView('landing'); }} userType={userType || 'business'} user={user} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {view !== 'login' && view !== 'signup-business' && view !== 'signup-agency' && (
        <Header 
          onLogin={() => navigate('login')} 
          onToolsClick={() => navigate('landing')} 
          onBusinessSignup={() => navigate('signup-business')} 
          onAgencySignup={() => navigate('signup-agency')}
          onHomeClick={() => navigate('landing')}
          onBlogClick={() => navigate('landing')}
        />
      )}
      
      <main>
        {view === 'landing' && (
          <>
            <Hero onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} onProspectorClick={() => navigate('prospector')} />
            <Integrations />
            <AboutUs />
            <InteractiveDemo />
            <ROICalculator onStart={() => navigate('signup-business')} />
            <MapComparison />
            <DashboardShowcase />
            <ComparisonTable onBusinessClick={() => navigate('signup-business')} onAgencyClick={() => navigate('signup-agency')} />
            <HowItWorks onStart={() => navigate('signup-business')} />
            <Services onAuditClick={() => navigate('landing')} onSignup={() => navigate('signup-business')} />
            <Features onSignup={() => navigate('signup-business')} />
            <VideoTestimonials />
            <Pricing onStartBusiness={() => navigate('signup-business')} onStartAgency={() => navigate('signup-agency')} />
            <FAQ />
            <Blog onPostClick={() => {}} onViewAll={() => {}} />
            <ContactUs />
          </>
        )}

        {view === 'prospector' && (
          <div className="pt-32 container mx-auto px-6">
            <ProspectingTool onSignup={() => navigate('signup-business')} onHome={() => navigate('landing')} />
          </div>
        )}
        
        {view === 'login' && (
          <Login onCancel={() => navigate('landing')} onBusinessSignup={() => navigate('signup-business')} onAgencySignup={() => navigate('signup-agency')} onLoginSuccess={() => setView('dashboard')} />
        )}
        
        {view === 'signup-business' && (
          <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToAgency={() => navigate('signup-agency')} />
        )}
        
        {view === 'signup-agency' && (
          <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToBusiness={() => navigate('signup-business')} />
        )}
      </main>

      {view === 'landing' && <Footer onBlogClick={() => {}} onHomeClick={() => navigate('landing')} />}
    </div>
  );
};

export default App;
// AI Suite Components (Extensions removed for standard Vite resolution)
import LiveVoiceAssistant from './components/Dashboard/AI/LiveVoiceAssistant';
import ImageOptimizationTool from './components/Dashboard/AI/ImageOptimizationTool';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'prospector' | 'voice-assistant' | 'image-clean' | 'blog' | 'blog-post' | 'privacy' | 'terms' | 'about' | 'reset-password';

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

  useEffect(() => {
    const checkSession = async () => {
      try {
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
          } else if (p && p !== 'loading') {
            setView(p);
          } else {
            setView('landing');
          }
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setView('landing');
      } finally {
        setAuthReady(true);
      }
    };

    checkSession();

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Syncing Protocols...</p>
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
        <div className="fixed inset-0 z-[500] bg-white overflow-y-auto">
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
        {view === 'app-selector' && <AppSelector onSelect={setView as any} onBack={() => navigate('landing')} />}
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

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 z-[150] w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7-7"/></svg>
      </button>
    </div>
  );
};

export default App;
