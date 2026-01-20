
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.ts';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Integrations from './components/Integrations.tsx';
import AboutUs from './components/AboutUs.tsx';
import InteractiveDemo from './components/InteractiveDemo.tsx';
import MapComparison from './components/MapComparison.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Services from './components/Services.tsx';
import Features from './components/Features.tsx';
import VideoTestimonials from './components/VideoTestimonials.tsx';
import ComparisonTable from './components/ComparisonTable.tsx';
import Pricing from './components/Pricing.tsx';
import FAQ from './components/FAQ.tsx';
import Blog from './components/Blog.tsx';
import BlogPage from './components/BlogPage.tsx';
import BlogPostView from './components/BlogPostView.tsx';
import ContactUs from './components/ContactUs.tsx';
import Footer from './components/Footer.tsx';
import Dashboard from './components/Dashboard/Dashboard.tsx';
import SignUpBusiness from './components/Auth/SignUpBusiness.tsx';
import SignUpAgency from './components/Auth/SignUpAgency.tsx';
import Login from './components/Auth/Login.tsx';
import AppSelector from './components/Auth/AppSelector.tsx';
import GBPAuditTool from './components/GBPAuditTool.tsx';

export type UserType = 'business' | 'agency';
export type AppView = 'landing' | 'signup-business' | 'signup-agency' | 'login' | 'dashboard' | 'app-selector' | 'auditor' | 'blog' | 'blog-post';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Initial session check and Stripe redirect detection
  useEffect(() => {
    let mounted = true;
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Check for Stripe success parameter in URL
      const params = new URLSearchParams(window.location.search);
      const isPaymentSuccess = params.get('session') === 'success';

      if (mounted) {
        if (session) {
          setUser(session.user);
          setUserType(session.user.user_metadata?.user_type || 'business');
          
          // CRITICAL: Force Dashboard if they just paid OR if they are already logged in on a fresh visit
          if (isPaymentSuccess || view === 'landing' || view === 'login') {
            setView('dashboard');
            // Clean up the URL
            window.history.replaceState({}, '', window.location.pathname);
          }
        } else if (isPaymentSuccess) {
          // If paid but not logged in, prompt login
          setView('login');
        }
        setAuthLoading(false);
      }
    };
    checkSession();
    return () => { mounted = false; };
  }, []);

  // Listen for auth changes
  useEffect(() => {
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

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  const handleAppSelect = (id: string) => {
    if (id === 'gbp-auditor') {
      setView('auditor');
    } else {
      if (user) {
        setView('dashboard');
      } else {
        setView('login');
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (view === 'dashboard' && user) {
    return (
      <Dashboard 
        onLogout={handleLogout} 
        userType={userType || 'business'} 
        user={user} 
        onUpgradeFlow={() => setView('signup-business')} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {view === 'login' && <Login onCancel={() => setView('landing')} onBusinessSignup={() => setView('signup-business')} onAgencySignup={() => setView('signup-agency')} onLoginSuccess={() => setView('dashboard')} />}
      {view === 'signup-business' && <SignUpBusiness onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToAgency={() => setView('signup-agency')} />}
      {view === 'signup-agency' && <SignUpAgency onComplete={() => setView('dashboard')} onCancel={() => setView('landing')} onSwitchToBusiness={() => setView('signup-business')} />}

      <Header 
        onLogin={() => {
          if (user) setView('dashboard');
          else setView('login');
        }} 
        onToolsClick={() => {
          setView('app-selector');
          window.scrollTo(0, 0);
        }}
        onBusinessSignup={() => setView('signup-business')} 
        onAgencySignup={() => setView('signup-agency')}
        onHomeClick={() => setView('landing')}
        onBlogClick={() => setView('blog')}
      />
      
      <main className="flex-grow">
        {view === 'app-selector' && (
          <AppSelector 
            onSelect={handleAppSelect} 
            onBack={() => setView('landing')} 
          />
        )}
        {view === 'blog' && <BlogPage onPostClick={(id) => { setSelectedPostId(id); setView('blog-post'); }} />}
        {view === 'blog-post' && selectedPostId && <BlogPostView postId={selectedPostId} onBack={() => setView('blog')} onSignup={() => setView('signup-business')} />}
        {view === 'auditor' && <div className="pt-20"><GBPAuditTool onSignup={() => setView('signup-business')} /></div>}
        
        {view === 'landing' && (
          <>
            <Hero onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <Integrations />
            <AboutUs />
            <InteractiveDemo />
            <MapComparison />
            <HowItWorks onStart={() => setView('signup-business')} />
            <Services onAuditClick={() => setView('app-selector')} />
            <FeatureBanner />
            <Features />
            <VideoTestimonials />
            <ComparisonTable onBusinessClick={() => setView('signup-business')} onAgencyClick={() => setView('signup-agency')} />
            <Pricing onStartBusiness={() => setView('signup-business')} onStartAgency={() => setView('signup-agency')} />
            <FAQ />
            <Blog onPostClick={(id) => { setSelectedPostId(id); setView('blog-post'); }} onViewAll={() => setView('blog')} />
            <ContactUs />
          </>
        )}
      </main>
      
      <Footer onBlogClick={() => setView('blog')} onHomeClick={() => setView('landing')} />
    </div>
  );
};

// Internal component for clean organization
const FeatureBanner = () => (
  <div className="container mx-auto px-6 py-12">
     <div className="bg-black rounded-[48px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-b-4 border-green-600">
        <div className="space-y-4">
           <h3 className="text-3xl font-black uppercase italic tracking-tight">The #1 Choice for Local Business.</h3>
           <p className="text-slate-400 font-medium">Join 2,000+ brands automating their path to 5-star perfection.</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center">
             <p className="text-3xl font-black text-green-500">98%</p>
             <p className="text-[10px] font-bold text-slate-500 uppercase">Retention</p>
           </div>
           <div className="text-center">
             <p className="text-3xl font-black text-green-500">24/7</p>
             <p className="text-[10px] font-bold text-slate-500 uppercase">Support</p>
           </div>
        </div>
     </div>
  </div>
);

export default App;
