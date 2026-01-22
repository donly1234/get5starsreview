import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
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

export type UserType = 'business' | 'agency';
export type AppView = 'loading' | 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'heatmap' | 'prospector' | 'blog' | 'blog-post' | 'privacy' | 'terms' | 'about' | 'reset-password';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('loading');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserType(session.user.user_metadata?.user_type || 'business');
        setView('dashboard');
      } else {
        setView('landing');
      }
      setAuthReady(true);
    };

    checkSession();

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
        if (view === 'dashboard') {
          setView('landing');
        }
      }

      if (event === 'PASSWORD_RECOVERY') {
        setView('reset-password');
      }
    });

    const consent = localStorage.getItem('g5sr_cookies');
    if (!consent) setShowCookieConsent(true);

    return () => subscription.unsubscribe();
  }, [view]);

  const handleLogout = async () => {
    setAuthReady(false);
    await supabase.auth.signOut();
    setView('landing');
    setAuthReady(true);
  };

  const navigate = (newView: AppView) => {
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Securing Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden relative">
      <SystemStatus />
      
      {user && view === 'dashboard' ? (
        <Dashboard 
          onLogout={handleLogout} 
          userType={userType || 'business'} 
          user={user} 
          onUpgradeFlow={() => navigate('signup-business')} 
        />
      ) : (
        <>
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

          <Header 
            onLogin={() => user ? setView('dashboard') : navigate('login')} 
            onToolsClick={() => navigate('app-selector')}
            onBusinessSignup={() => navigate('signup-business')} 
            onAgencySignup={() => navigate('signup-agency')}
            onHomeClick={() => navigate('landing')}
            onBlogClick={() => navigate('blog')}
            onAboutClick={() => navigate('about')}
            onScrollToSection={scrollToSection}
          />
          
          <main className="flex-grow">
            {view === 'app-selector' && (
              <AppSelector 
                onSelect={(id) => {
                  if (id === 'gbp-auditor') navigate('auditor');
                  else if (id === 'heatmap') navigate('heatmap');
                  else if (id === 'prospector') navigate('prospector');
                  else navigate(user ? 'dashboard' : 'login');
                }} 
                onBack={() => navigate('landing')} 
              />
            )}
            {view === 'blog' && <BlogPage onPostClick={(id) => { setSelectedPostId(id); navigate('blog-post'); }} />}
            {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => navigate('blog')} onSignup={() => navigate('signup-business')} />}
            {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => navigate('signup-business')} /></div>}
            {view === 'heatmap' && <div className="pt-20"><HeatmapTool onSignup={() => navigate('signup-business')} /></div>}
            {view === 'prospector' && <div className="pt-20 container mx-auto px-6"><ProspectingTool /></div>}
            {(view === 'privacy' || view === 'terms') && <LegalView type={view} onBack={() => navigate('landing')} />}
            {view === 'about' && <AboutView onBack={() => navigate('landing')} onStart={() => navigate('signup-business')} />}
            
            {view === 'landing' && (
              <div className="overflow-x-hidden">
                <Hero 
                  onStartBusiness={() => navigate('signup-business')} 
                  onStartAgency={() => navigate('signup-agency')} 
                  onProspectorClick={() => navigate('prospector')} 
                />
                <Integrations />
                <AboutUs />
                <section id="ranking-report" className="py-24 bg-slate-50">
                  <div className="container mx-auto px-6 text-center mb-16">
                    <span className="text-[#16A34A] font-black text-[10px] uppercase tracking-widest">Market Intel</span>
                    <h2 className="text-4xl md:text-6xl font-black text-[#0F172A] uppercase italic">Get Your <span className="text-[#16A34A]">Ranking Report</span></h2>
                  </div>
                  <div className="container mx-auto px-6">
                    <ProspectingTool />
                  </div>
                </section>
                <InteractiveDemo />
                <ROICalculator onStart={() => navigate('signup-business')} />
                
                {/* Agency Program Details Section */}
                <section id="agency-program" className="py-24 bg-white scroll-mt-32">
                  <div className="container mx-auto px-6">
                    <div className="bg-[#0F172A] rounded-[64px] p-8 md:p-20 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#FACC15]">
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#16A34A]/5 blur-3xl rounded-full translate-x-1/2"></div>
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                          <div className="space-y-4">
                            <span className="text-[#FACC15] font-black uppercase tracking-[0.3em] text-[10px]">Partnership Opportunity</span>
                            <h2 className="text-4xl md:text-6xl font-black leading-none uppercase italic tracking-tighter">
                              Scale Your <br /> <span className="text-[#16A34A]">Agency Brand.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                              Own the #1 local SEO software under your own brand. Provide world-class reputation tools to your clients without writing a single line of code.
                            </p>
                          </div>
                          <ul className="space-y-4">
                            {[
                              '100% White Label Branding',
                              'Custom CNAME / Custom Domain',
                              'Centralized Multi-Client Dashboard',
                              'Bulk Reseller Pricing',
                              'Lead Prospecting & Audit Tools',
                              'Marketing Sales Kits Included'
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                <svg className="w-5 h-5 text-[#FACC15] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <button 
                            onClick={() => navigate('signup-agency')}
                            className="bg-[#16A34A] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 cursor-pointer"
                          >
                            Join Agency Program
                          </button>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-10 md:p-16 rounded-[48px] space-y-8 relative group">
                           <div className="text-center space-y-2">
                             <p className="text-[#FACC15] font-black uppercase text-[10px] tracking-widest">Reseller Package</p>
                             <p className="text-5xl font-black text-white">$250<span className="text-lg text-slate-500">/mo</span></p>
                             <p className="text-xs text-slate-400 font-bold">Unlimited Client Accounts</p>
                           </div>
                           <div className="h-px w-full bg-white/10"></div>
                           <div className="space-y-4">
                              <p className="text-sm font-bold text-slate-300 italic">"Get5StarsReview is the most profitable service in our agency. Our clients love the automated responses and we love the white-label recurring revenue."</p>
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-800"></div>
                                <div>
                                   <p className="text-xs font-black uppercase tracking-tighter">Mark Thompson</p>
                                   <p className="text-[10px] text-slate-500 font-bold">Summit Marketing Director</p>
                                </div>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <MapComparison />
                <DashboardShowcase />
                <HowItWorks onStart={() => navigate('signup-business')} />
                <Services onAuditClick={() => navigate('app-selector')} onSignup={() => navigate('signup-business')} />
                <TrustStack />
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
        </>
      )}

      {showCookieConsent && <CookieConsent onClose={() => { localStorage.setItem('g5sr_cookies', 'true'); setShowCookieConsent(false); }} />}
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
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GSR Session Engine v5.6: Locked & Persisted</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Identity State: Verified</span>
        </div>
     </div>
  </div>
);

const CookieConsent = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed bottom-0 inset-x-0 z-[500] p-6 animate-in slide-in-from-bottom-full duration-500">
     <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4">
           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">🍪</div>
           <div>
              <p className="text-sm font-bold text-slate-900 leading-tight">We value your privacy.</p>
              <p className="text-xs text-slate-500 mt-1">We use cookies to enhance your experience.</p>
           </div>
        </div>
        <div className="flex gap-3 shrink-0">
           <button onClick={onClose} className="px-8 py-3 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#16A34A] transition-all shadow-xl cursor-pointer">Accept All</button>
        </div>
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
           <div className="text-center">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">98%</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">Retention</p>
           </div>
           <div className="text-center">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">1.2M</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">Requests</p>
           </div>
           <div className="text-center">
             <p className="text-2xl md:text-4xl font-black text-[#16A34A]">24/7</p>
             <p className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase mt-1">AI Logic</p>
           </div>
        </div>
     </div>
  </div>
);

export default App;
