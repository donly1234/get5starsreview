import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient.ts';
import Sidebar from './Sidebar';
import TopBar from './TopBar.tsx';
import MetricsBar from './MetricsBar.tsx';
import ReviewFeed from './ReviewFeed.tsx';
import PerformanceGraph from './PerformanceGraph.tsx';
import RequestStatus from './RequestStatus.tsx';
import PlatformBreakdown from './PlatformBreakdown.tsx';
import RequestsManager from './Requests/RequestsManager.tsx';
import MonitoringManager from './Monitoring/MonitoringManager.tsx';
import MediaManager from './Media/MediaManager.tsx';
import WidgetsManager from './Widgets/WidgetsManager.tsx';
import AnalyticsManager from './Analytics/AnalyticsManager.tsx';
import SettingsManager from './Settings/SettingsManager.tsx';
import AIAssistantManager from './AI/AIAssistantManager.tsx';
import AIStrategyManager from './AI/AIStrategyManager.tsx';
import StrategyProgress from './AI/StrategyProgress.tsx';
import AgencyManager from './Agency/AgencyManager.tsx';
import GBPAuditTool from '../GBPAuditTool.tsx';
import BottomNav from './BottomNav.tsx';
import UpgradeModal from './Trial/UpgradeModal.tsx';
import ExpiredOverlay from './Trial/ExpiredOverlay.tsx';
import TrialChecklist from './Trial/TrialChecklist.tsx';
import NotificationCenter from './Notifications/NotificationCenter.tsx';
import { UserType } from '../../App.tsx';

interface DashboardProps {
  onLogout: () => void;
  userType: UserType;
  user: any;
  isTrial?: boolean;
  justUpgraded?: boolean;
  onUpgradeComplete?: () => void;
  onUpgradeFlow?: () => void;
  onDismissUpgradeMessage?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  onLogout, 
  userType,
  user,
  justUpgraded = false,
  onUpgradeFlow,
  onDismissUpgradeMessage 
}) => {
  const [activeTab, setActiveTab] = useState(userType === 'agency' ? 'Agency Panel' : 'Dashboard');
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [trialDaysElapsed, setTrialDaysElapsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
        
        // Calculate trial duration from creation date
        const created = new Date(data.created_at || user.created_at);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - created.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTrialDaysElapsed(diffDays);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const isTrialAccount = profile?.status !== 'active';
  const isExpired = isTrialAccount && trialDaysElapsed > 14;
  const trialDaysLeft = Math.max(0, 14 - trialDaysElapsed);

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
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Account Status: {isTrialAccount ? `Trial (${trialDaysLeft} days left)` : 'Professional'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleFeatureClick('SEO Auditor')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#16A34A] text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-green-500/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  SEO Audit
                </button>
                <button 
                  onClick={() => handleFeatureClick('Requests')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl font-bold hover:bg-[#16A34A] transition-colors shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  Request Reviews
                </button>
              </div>
            </div>

            {isTrialAccount && trialDaysLeft <= 3 && !justUpgraded && (
              <div className="bg-black p-6 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border-b-4 border-[#16A34A] animate-in slide-in-from-top-4 duration-700">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-600/20 rounded-[20px] flex items-center justify-center text-3xl shrink-0 animate-pulse">🎁</div>
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-tight">Last Chance: 20% OFF Professional!</h4>
                    <p className="text-slate-400 text-sm font-medium">Your trial ends in {trialDaysLeft} days. Upgrade now to keep your ranking momentum.</p>
                  </div>
                </div>
                <button onClick={onUpgradeFlow} className="bg-[#16A34A] text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl">Claim Discount</button>
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
                <RequestStatus requestsUsed={12} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />
                <PlatformBreakdown isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />
              </div>
            </div>
          </>
        );
      case 'Requests':
        return <RequestsManager requestsUsed={12} isTrial={isTrialAccount} onUpgrade={onUpgradeFlow} />;
      case 'Monitoring':
      case 'All Reviews':
        return <MonitoringManager isTrial={isTrialAccount} />;
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
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin"></div>
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
        {justUpgraded && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500">
             <div className="bg-white rounded-[40px] p-10 max-w-lg w-full text-center shadow-2xl border-4 border-green-500 animate-in zoom-in-95">
                <div className="text-6xl mb-6">🚀</div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Welcome to Professional!</h2>
                <p className="text-slate-500 mb-8 leading-relaxed">Your trial limitations have been removed. AI Response, Unlimited SMS, and Advanced Analytics are now fully unlocked.</p>
                <button onClick={onDismissUpgradeMessage} className="w-full bg-black text-white py-5 rounded-[24px] font-black text-lg shadow-xl hover:bg-green-600 transition-all">Let's Go!</button>
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
            <div className="bg-black text-white px-6 py-2 text-center text-xs font-black uppercase tracking-[0.2em] rounded-xl border border-green-600/30">
              Viewing as client: <span className="text-green-500">{impersonatedClient}</span>
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
