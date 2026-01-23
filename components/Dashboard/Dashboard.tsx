import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MetricsBar from './MetricsBar';
import ReviewFeed from './ReviewFeed';
import PerformanceGraph from './PerformanceGraph';
import RequestStatus from './RequestStatus';
import PlatformBreakdown from './PlatformBreakdown';
import RequestsManager from './Requests/RequestsManager';
import MonitoringManager from './Monitoring/MonitoringManager';
import MediaManager from './Media/MediaManager';
import WidgetsManager from './Widgets/WidgetsManager';
import AnalyticsManager from './Analytics/AnalyticsManager';
import SettingsManager from './Settings/SettingsManager';
import AIAssistantManager from './AI/AIAssistantManager';
import AIStrategyManager from './AI/AIStrategyManager';
import StrategyProgress from './AI/StrategyProgress';
import AgencyManager from './Agency/AgencyManager';
import GBPAuditTool from '../GBPAuditTool';
import BottomNav from './BottomNav';
import UpgradeModal from './Trial/UpgradeModal';
import ExpiredOverlay from './Trial/ExpiredOverlay';
import TrialChecklist from './Trial/TrialChecklist';
import NotificationCenter from './Notifications/NotificationCenter';
import { UserType } from '../../App';

interface DashboardProps {
  onLogout: () => void;
  userType: UserType;
  user: any;
  justUpgraded?: boolean;
  onUpgradeFlow?: () => void;
  onDismissUpgradeMessage?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  userType: initialUserType,
  user,
  justUpgraded = false,
  onUpgradeFlow,
  onDismissUpgradeMessage 
}) => {
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const [activeTab, setActiveTab] = useState(initialUserType === 'agency' ? 'Agency Panel' : 'Dashboard');
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialDaysElapsed, setTrialDaysElapsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile(data);
          setUserType(data.user_type || initialUserType);
          
          // STRICT TRIAL LOGIC
          const created = new Date(data.created_at || user.created_at);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - created.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setTrialDaysElapsed(diffDays);
        }
      } catch (e) {
        console.error("Dashboard profile load error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, initialUserType]);

  const handleResendVerification = async () => {
    if (!user?.email) return;
    setResendingEmail(true);
    await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: { emailRedirectTo: window.location.origin }
    });
    setResendingEmail(false);
    alert("Verification email resent!");
  };

  const isTrialAccount = profile?.status !== 'paid';
  // TRIAL EXPIRES ON DAY 15
  const isExpired = isTrialAccount && trialDaysElapsed > 14;
  const trialDaysLeft = Math.max(0, 14 - trialDaysElapsed);
  const emailUnconfirmed = !user?.email_confirmed_at;

  const handleFeatureClick = (tab: string) => {
    if (userType === 'business' && isTrialAccount) {
      const proFeatures = ['AI Assistant', 'Analytics', 'GBP Media'];
      if (proFeatures.includes(tab)) {
        setShowUpgradeModal(tab);
        return;
      }
    }
    if (isExpired) {
      setShowUpgradeModal('Expired');
      return;
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (isExpired) {
      return <ExpiredOverlay onUpgrade={onUpgradeFlow || (() => {})} />;
    }

    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">🏢</div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                    {impersonatedClient ? `${impersonatedClient} Portal` : profile?.business_name || profile?.agency_name || 'My Business Hub'}
                  </h1>
                  <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isTrialAccount ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                    {isTrialAccount ? `Free Trial (${trialDaysLeft} days left)` : 'Professional Account'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleFeatureClick('SEO Auditor')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] text-white rounded-xl font-bold hover:bg-[#0F172A] transition-all shadow-lg shadow-green-500/10 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  SEO Audit
                </button>
                <button 
                  onClick={() => handleFeatureClick('Requests')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#0F172A] text-white rounded-xl font-bold hover:bg-[#16A34A] transition-all shadow-lg active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  Collect Reviews
                </button>
              </div>
            </div>

            {isTrialAccount && trialDaysLeft <= 3 && !justUpgraded && (
              <div className="bg-[#0F172A] p-6 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border-b-4 border-[#16A34A] animate-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-600/20 rounded-[20px] flex items-center justify-center text-3xl shrink-0 animate-pulse">🎁</div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight">Claim 20% Discount Before Expiry!</h4>
                    <p className="text-slate-400 text-sm font-medium">Your trial ends in {trialDaysLeft} days. Upgrade now to keep your 5-star momentum.</p>
                  </div>
                </div>
                <button onClick={onUpgradeFlow} className="bg-[#16A34A] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-white hover:text-black transition-all shadow-xl">Upgrade & Save</button>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <StrategyProgress />
                {isTrialAccount && <TrialChecklist />}
                <MetricsBar isTrial={isTrialAccount} profileId={user?.id} />
                <PerformanceGraph isTrial={isTrialAccount} />
                <ReviewFeed isTrial={isTrialAccount} profileId={user?.id} />
              </div>
              <div className="space-y-8">
                <RequestStatus requestsUsed={0} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />
                <PlatformBreakdown isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />
              </div>
            </div>
          </>
        );
      case 'Requests':
        return <RequestsManager requestsUsed={0} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />;
      case 'Monitoring':
      case 'All Reviews':
        return <MonitoringManager isTrial={isTrialAccount} onShowUpgrade={() => setShowUpgradeModal('AI Assistant')} />;
      case 'SEO Auditor':
        return <GBPAuditTool onSignup={onUpgradeFlow || (() => {})} />;
      case 'GBP Media':
        return <MediaManager />;
      case 'Widgets':
        return <WidgetsManager />;
      case 'Analytics':
        return <AnalyticsManager />;
      case 'AI Assistant':
        return <AIAssistantManager />;
      case 'AI Strategy':
        return <AIStrategyManager profile={profile} />;
      case 'Agency Panel':
        return <AgencyManager onSwitchClient={(name) => { setImpersonatedClient(name); setActiveTab('Dashboard'); }} />;
      case 'Settings':
        return <SettingsManager isTrial={isTrialAccount} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white flex-col gap-4">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Syncing Identity Hub...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-inter select-none">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleFeatureClick} 
        onLogout={onLogout} 
        userType={userType} 
        isTrial={isTrialAccount}
        onUpgrade={onUpgradeFlow}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {emailUnconfirmed && (
          <div className="bg-[#FACC15] text-[#0F172A] px-8 py-2.5 text-center text-xs font-black uppercase tracking-widest flex items-center justify-center gap-4 shrink-0 shadow-lg relative z-[70]">
             <span>⚠️ Please confirm your email to fully unlock your account</span>
             <button 
              onClick={handleResendVerification} 
              disabled={resendingEmail}
              className="px-4 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
             >
               {resendingEmail ? "Sending..." : "Resend Link"}
             </button>
          </div>
        )}

        {justUpgraded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
             <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl border-4 border-[#16A34A] animate-in zoom-in-95">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Welcome to Professional!</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">Your trial limitations have been removed. AI Response, Unlimited SMS, and Advanced Analytics are now fully unlocked.</p>
                <button onClick={onDismissUpgradeMessage} className="w-full bg-[#0F172A] text-white py-5 rounded-[24px] font-black text-lg shadow-xl hover:bg-[#16A34A] transition-all">Let's Go!</button>
             </div>
          </div>
        )}

        <TopBar 
          activeTab={activeTab} 
          onToggleNotifications={() => setShowNotifications(!showNotifications)} 
          onProfileClick={() => setActiveTab('Settings')}
          profile={profile}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 space-y-8 scroll-smooth">
          {impersonatedClient && (
            <div className="bg-[#0F172A] text-white px-6 py-2 text-center text-xs font-black uppercase tracking-[0.2em] rounded-xl border border-green-600/30">
              Viewing as client: <span className="text-[#16A34A]">{impersonatedClient}</span>
            </div>
          )}
          {renderContent()}
        </main>
        <BottomNav activeTab={activeTab} setActiveTab={handleFeatureClick} />
      </div>

      {showUpgradeModal && (
        <UpgradeModal feature={showUpgradeModal} onClose={() => setShowUpgradeModal(null)} onUpgrade={onUpgradeFlow || (() => {})} />
      )}

      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} trialDay={trialDaysElapsed} />
      )}
    </div>
  );
};

export default Dashboard;
