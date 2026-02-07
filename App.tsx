import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Core Components
import Header from './components/Header';
import Hero from './components/Hero';
import Integrations from './components/Integrations';
import ROICalculator from './components/ROICalculator';
import MapComparison from './components/MapComparison';
import DashboardShowcase from './components/DashboardShowcase';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import SignUpBusiness from './components/Auth/SignUpBusiness';
import SignUpAgency from './components/Auth/SignUpAgency';
import Login from './components/Auth/Login';
import AppSelector from './components/Auth/AppSelector';
import GBPAuditTool from './components/GBPAuditTool';
import HeatmapTool from './components/HeatmapTool';
import ProspectingTool from './components/Agency/ProspectingTool';
import Newsletter from './components/Newsletter';
import FAQ from './components/FAQ';
import VideoTestimonials from './components/VideoTestimonials';
import AboutView from './components/AboutView';
import BlogPage from './components/BlogPage';
import BlogPostView from './components/BlogPostView';
import SocialNudge from './components/SocialNudge';

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'prospector' | 'about' | 'blog' | 'blog-post' | 'connection-error';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
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
        } else if (p && ['auditor', 'heatmap', 'prospector', 'app-selector', 'login', 'about', 'blog', 'signup-business', 'signup-agency'].includes(p)) {
          setView(p);
        } else {
          setView('landing');
        }
      }
    } catch (err: any) {
      console.error("Auth init error", err);
      setView('landing');
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
        if (event === 'SIGNED_IN') setView('dashboard');
      } else {
        setUser(null);
        setUserType(null);
        if (event === 'SIGNED_OUT') setView('landing');
      }
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = (newView: AppView, id?: string) => {
    setView(newView);
    if (id) setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const url = new URL(window.location.href);
    if (newView === 'landing') {
      url.search = '';
    } else {
      url.searchParams.set('p', newView);
      if (id) url.searchParams.set('id', id);
      else url.searchParams.delete('id');
    }
    window.history.pushState({}, '', url);
  };

  if (!authReady && view === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Sync...</p>
      </div>
    );
  }

  if (user && view === 'dashboard') {
    return <Dashboard onLogout={() => supabase.auth.signOut()} userType={userType || 'business'} user={user} onUpgradeFlow={() => navigate('signup-business')} />;
  }

  const isAuthView = ['login', 'signup-business', 'signup-agency'].includes(view);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 overflow-x-hidden relative selection:bg-emerald-200 selection:text-emerald-900">
      {!isAuthView && <div className="fixed top-0 left-0 h-[4px] bg-[#16A34A] z-[1000] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />}
      
      {isAuthView && (
        <div className="fixed inset-0 z-[500] bg-white dark:bg-slate-950 overflow-y-auto">
          {view === 'login' && <Login onCancel={() => navigate('landing')} onBusinessSignup={() => navigate('signup-business')} onAgencySignup={() => navigate('signup-agency')} onLoginSuccess={() => setView('dashboard')} />}
          {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToAgency={() => navigate('signup-agency')} />}
          {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => navigate('landing')} onSwitchToBusiness={() => navigate('signup-business')} />}
        </div>
      )}

      {!isAuthView && (
        <Header 
          user={user}
          onLogout={() => supabase.auth.signOut()}
          onLogin={() => navigate('login')} 
          onToolsClick={() => navigate('app-selector')}
          onBusinessSignup={() => navigate('signup-business')} 
          onAgencySignup={() => navigate('signup-agency')}
          onHomeClick={() => navigate('landing')}
          onBlogClick={() => navigate('blog')}
          onAboutClick={() => navigate('about')}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
      )}
      
      <main className={`flex-grow ${isAuthView ? 'hidden' : 'block'}`}>
        {view === 'app-selector' && <AppSelector onSelect={(id) => {
          if(id === 'prospector') navigate('prospector');
          else if(id === 'heatmap') navigate('heatmap');
          else if(id === 'auditor') navigate('auditor');
          else navigate('signup-business');
        }} onBack={() => navigate('landing')} />}
        
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'heatmap' && <div className="pt-20"><HeatmapTool onSignup={() => navigate('signup-business')} /></div>}
        {view === 'prospector' && <div className="pt-20 container mx-auto px-6"><ProspectingTool onSignup={() => navigate('signup-business')} onHome={() => navigate('landing')} /></div>}
        {view === 'about' && <AboutView onBack={() => navigate('landing')} onStart={() => navigate('signup-business')} />}
        {view === 'blog' && <BlogPage onPostClick={(id) => navigate('blog-post', id)} />}
        {view === 'blog-post' && <BlogPostView postId={selectedPostId || 'p1'} onBack={() => navigate('blog')} onSignup={() => navigate('signup-business')} />}
        
        {view === 'landing' && (
          <div className="animate-in fade-in duration-1000">
            <Hero 
              onStartBusiness={() => navigate('signup-business')} 
              onStartAgency={() => navigate('signup-agency')} 
              onProspectorClick={() => navigate('prospector')} 
            />
            
            <Integrations />

            <section id="pro-intelligence" className="py-24 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
              <div className="container mx-auto px-6 text-center mb-16">
                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">Market Intelligence Engine</span>
                <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Analyze Your <span className="text-emerald-600">Local Visibility.</span></h2>
                <p className="text-slate-500 font-bold mt-4">Generate a real-time Ranking Report to see how you stack up against competitors.</p>
              </div>
              <div className="container mx-auto px-6">
                <ProspectingTool onSignup={() => navigate('signup-business')} onHome={() => navigate('landing')} />
              </div>
            </section>

            <DashboardShowcase />
            <MapComparison />
            <VideoTestimonials />
            <ROICalculator onStart={() => navigate('signup-business')} />
            <HowItWorks onStart={() => navigate('signup-business')} />
            <Services 
              onAuditClick={() => navigate('auditor')} 
              onSignup={() => navigate('signup-business')} 
            />
            <FAQ />
            <Newsletter />
          </div>
        )}
      </main>

      {!isAuthView && (
        <Footer 
          onBlogClick={() => navigate('blog')} 
          onHomeClick={() => navigate('landing')} 
          onAboutClick={() => navigate('about')}
          onAgencySignup={() => navigate('signup-agency')}
          onToolsClick={() => navigate('app-selector')}
        />
      )}

      {/* Floating Action Elements */}
      {!isAuthView && (
        <>
          <SocialNudge />
          <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4">
            <a 
              href="https://wa.me/263776496110" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 border-4 border-white group"
              aria-label="WhatsApp Support"
            >
              <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.7 17.8 69.4 27.2 106.2 27.2 122.4 0 222-99.6 222-222 0-59.3-23-115.1-65-157.1zM223.9 446.3c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 54 81.2 54 130.4 0 101.7-82.8 184.5-184.6 184.5zm101.1-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.5 5.5-9.2 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className={`w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ${showScrollTop ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'} border-4 border-white`}
              aria-label="Scroll to top"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7-7"/></svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
