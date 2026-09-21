import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  CEOStatementBanner 
} from './components/CEOStatementBanner';
import { 
  GPSRadarMap 
} from './components/GPSRadarMap';
import { 
  CandidateGrid 
} from './components/CandidateGrid';
import { 
  ActiveContractsDashboard 
} from './components/ActiveContractsDashboard';
import { 
  FinancialBudgetDashboard 
} from './components/FinancialBudgetDashboard';
import { 
  MobileMoneyPaymentModal 
} from './components/MobileMoneyPaymentModal';
import { 
  BiometricVerificationModal 
} from './components/BiometricVerificationModal';
import { 
  CustomerCare247Modal 
} from './components/CustomerCare247Modal';
import { 
  InAppChatModal 
} from './components/InAppChatModal';
import { 
  CandidateDetailModal 
} from './components/CandidateDetailModal';
import { 
  AppStoreAndAdsModal 
} from './components/AppStoreAndAdsModal';
import { 
  SeamlessOnboardingModal 
} from './components/SeamlessOnboardingModal';
import { 
  NotificationsModal, 
  AppNotification 
} from './components/NotificationsModal';
import { 
  OfflineSyncBanner 
} from './components/OfflineSyncBanner';
import { 
  LanguageCode, 
  UserRole, 
  UserProfile, 
  MaidProfile, 
  EmployerProfile, 
  Contract, 
  PaymentTransaction 
} from './types';
import { 
  INITIAL_MAIDS, 
  INITIAL_EMPLOYERS, 
  INITIAL_CONTRACTS, 
  INITIAL_TRANSACTIONS, 
  OFFICIAL_CEO_INFO 
} from './data/mockData';
import { translations } from './utils/translations';
import { 
  Search, 
  Compass, 
  FileCheck, 
  TrendingUp, 
  PhoneCall, 
  CreditCard, 
  Volume2, 
  ShieldCheck, 
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function App() {
  // App state
  const [currentRole, setCurrentRole] = useState<UserRole>('employer');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [lowBandwidth, setLowBandwidth] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [queuedSyncCount, setQueuedSyncCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'directory' | 'gps_radar' | 'contracts' | 'finances'>('directory');

  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'usr-001',
    name: 'Dr. Mukasa David & Julian',
    phone: '+256 774 201 993',
    email: 'david.mukasa@kampalahealth.org',
    role: 'employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Family in Naguru Hill looking for trusted house help and cook.',
    location: {
      lat: 0.3470,
      lng: 32.5990,
      neighborhood: 'Naguru Hill',
      district: 'Kampala'
    },
    ninNumber: 'CM84021980031R',
    isNinVerified: true,
    isBiometricVerified: true,
    rating: 4.95,
    totalReviews: 8,
    monthlySalaryUgx: 350000,
    connectionFeePaid: true,
    connectionFeeTxRef: 'TC-MM-1029481',
    connectionFeePaidAt: '2026-09-10T15:00:00Z',
    budgetGoalUgx: 450000,
  });

  // Entities
  const [maids, setMaids] = useState<MaidProfile[]>(INITIAL_MAIDS);
  const [employers, setEmployers] = useState<EmployerProfile[]>(INITIAL_EMPLOYERS);
  const [contracts, setContracts] = useState<Contract[]>(INITIAL_CONTRACTS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS);

  // Modals state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);
  const [showAppStoreModal, setShowAppStoreModal] = useState<boolean>(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<MaidProfile | EmployerProfile | null>(null);
  
  // Chat state
  const [chatRecipient, setChatRecipient] = useState<{
    id: string;
    name: string;
    role: UserRole;
    open: boolean;
  }>({
    id: 'maid-1',
    name: 'Acan Florence',
    role: 'maid',
    open: false,
  });

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Mobile Money Verified',
      body: `Your connection fee of 15,000 UGX was received by CEO Mugisha El-shaddai (0785490344). Platform contacts unlocked.`,
      time: '10m ago',
      type: 'payment',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Nearby Maid Available in Ntinda',
      body: 'Acan Florence is currently active and within 2.1 km of your location.',
      time: '1h ago',
      type: 'gps',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Contract TC-UG-CTR-2026-041 Active',
      body: 'Both employer and maid signatures confirmed under Ugandan Labor guidelines.',
      time: '1d ago',
      type: 'contract',
      read: true,
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const t = translations[language];

  // Screen reader speech synthesis for visual impairment accessibility
  const handleSpeakSummary = () => {
    if ('speechSynthesis' in window) {
      const text = `TrustConnect Uganda. Current view: ${activeTab}. You are signed in as ${userProfile.name} in role: ${currentRole}. 24/7 care hotline is 07518446077. Official receiving Mobile Money account is 0785490344 under Mugisha El-shaddai.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOpenChat = (id: string, name: string, role: UserRole) => {
    setChatRecipient({
      id,
      name,
      role,
      open: true,
    });
  };

  const handlePaymentSuccess = (tx: PaymentTransaction) => {
    setTransactions(prev => [tx, ...prev]);
    setUserProfile(prev => ({
      ...prev,
      connectionFeePaid: true,
      connectionFeeTxRef: tx.txRef,
      connectionFeePaidAt: new Date().toISOString(),
    }));

    // Add push notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Payment Received by Mugisha El-shaddai',
        body: `Connection fee of ${tx.amountUgx.toLocaleString()} UGX confirmed via ${tx.mobileNetwork}. Reference: ${tx.txRef}.`,
        time: 'Just now',
        type: 'payment',
        read: false,
      },
      ...prev
    ]);
  };

  const handleVerificationComplete = (nin: string) => {
    setUserProfile(prev => ({
      ...prev,
      isNinVerified: true,
      isBiometricVerified: true,
      ninNumber: nin,
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Biometrics & NIN Approved',
        body: `National ID (${nin}) verified successfully against NIRA registry.`,
        time: 'Just now',
        type: 'security',
        read: false,
      },
      ...prev
    ]);
  };

  const handleSignContract = (contractId: string, role: UserRole) => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        const updated = {
          ...c,
          employerSigned: role === 'employer' ? true : c.employerSigned,
          maidSigned: role === 'maid' ? true : c.maidSigned,
          status: 'active' as const,
          signedAt: new Date().toISOString()
        };
        return updated;
      }
      return c;
    }));

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Contract Digitally Signed',
        body: `Contract signed successfully by ${role === 'employer' ? 'Employer' : 'Maid'}.`,
        time: 'Just now',
        type: 'contract',
        read: false,
      },
      ...prev
    ]);
  };

  const handleCreateContract = (newCtr: Contract) => {
    setContracts(prev => [newCtr, ...prev]);
    if (isOffline) {
      setQueuedSyncCount(prev => prev + 1);
    }
  };

  const handleTriggerTestPush = () => {
    setShowAppStoreModal(false);
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'TrustConnect Live Push Alert',
        body: 'New verified house maid matches your schedule in Naguru Hill!',
        time: 'Just now',
        type: 'gps',
        read: false,
      },
      ...prev
    ]);
    alert("🔔 Push notification sent to your device simulation!");
  };

  const handleSyncCloud = () => {
    setQueuedSyncCount(0);
    alert("☁️ TrustConnect Cloud Sync Complete: All contracts, messages, and biometric tokens are synchronized.");
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      darkMode 
        ? 'bg-slate-950 text-slate-100' 
        : highContrast
          ? 'bg-black text-yellow-300'
          : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Offline Sync Status Bar */}
      <OfflineSyncBanner
        isOffline={isOffline}
        onSyncNow={handleSyncCloud}
        queuedCount={queuedSyncCount}
      />

      {/* Primary Top Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        lowBandwidth={lowBandwidth}
        setLowBandwidth={setLowBandwidth}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenInstall={() => setShowAppStoreModal(true)}
        onOpenPromo={() => setShowAppStoreModal(true)}
        unreadNotifications={unreadCount}
        onOpenNotifications={() => setShowNotificationsModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* CEO Identity & Mission Banner */}
        <CEOStatementBanner
          language={language}
          darkMode={darkMode}
          onOpenPaymentModal={() => setShowPaymentModal(true)}
          onOpenBiometricModal={() => setShowBiometricModal(true)}
          onOpenSupportModal={() => setShowSupportModal(true)}
        />

        {/* View Navigation Switcher Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              id="tab-directory"
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'directory'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>{currentRole === 'employer' ? 'Browse Vetted Maids' : 'Browse Verified Employers'}</span>
            </button>

            <button
              id="tab-gps-radar"
              onClick={() => setActiveTab('gps_radar')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'gps_radar'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>GPS Live Radar Map</span>
            </button>

            <button
              id="tab-contracts"
              onClick={() => setActiveTab('contracts')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'contracts'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>Active Contracts</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-black">
                {contracts.length}
              </span>
            </button>

            <button
              id="tab-finances"
              onClick={() => setActiveTab('finances')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'finances'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Spending Habits & Budget</span>
            </button>
          </div>

          {/* Quick Audio Assistance & Onboarding Quick Action */}
          <div className="flex items-center gap-2">
            <button
              id="btn-voice-accessibility"
              onClick={handleSpeakSummary}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
              title="Voice Screen Reader Announcement (Accessibility Mode)"
            >
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Read Aloud</span>
            </button>

            <button
              id="btn-quick-onboarding"
              onClick={() => setShowOnboardingModal(true)}
              className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer transition-colors shadow-xs"
            >
              <span>+ Phone Onboarding</span>
            </button>
          </div>
        </div>

        {/* Dynamic Main View Tab */}
        {activeTab === 'directory' && (
          <CandidateGrid
            currentRole={currentRole}
            maids={maids}
            employers={employers}
            connectionFeePaid={userProfile.connectionFeePaid}
            onSelectMaid={(maid) => setSelectedCandidate(maid)}
            onSelectEmployer={(emp) => setSelectedCandidate(emp)}
            onOpenChat={handleOpenChat}
            onOpenPaymentModal={() => setShowPaymentModal(true)}
            darkMode={darkMode}
          />
        )}

        {activeTab === 'gps_radar' && (
          <GPSRadarMap
            currentRole={currentRole}
            maids={maids}
            employers={employers}
            darkMode={darkMode}
            onSelectMaid={(maid) => setSelectedCandidate(maid)}
            onSelectEmployer={(emp) => setSelectedCandidate(emp)}
            onOpenChat={handleOpenChat}
          />
        )}

        {activeTab === 'contracts' && (
          <ActiveContractsDashboard
            contracts={contracts}
            currentRole={currentRole}
            currentUserId={userProfile.id}
            currentUserName={userProfile.name}
            onSignContract={handleSignContract}
            onCreateContract={handleCreateContract}
            darkMode={darkMode}
          />
        )}

        {activeTab === 'finances' && (
          <FinancialBudgetDashboard
            transactions={transactions}
            userRole={currentRole}
            userName={userProfile.name}
            darkMode={darkMode}
            onOpenPaymentModal={() => setShowPaymentModal(true)}
          />
        )}
      </main>

      {/* Floating Action Bar for Urgent Ugandan Hotlines & Mobile Money */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
        {/* Connection Fee Pill */}
        <button
          id="floating-pay-connection-fee"
          onClick={() => setShowPaymentModal(true)}
          className="px-3.5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 border-2 border-slate-950"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Connection Fee (0785490344)</span>
        </button>

        {/* 24/7 Care Hotline Floating Button */}
        <button
          id="floating-care-hotline"
          onClick={() => setShowSupportModal(true)}
          className="px-4 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 border-2 border-amber-300"
        >
          <PhoneCall className="w-4 h-4 animate-bounce text-amber-300" />
          <span>24/7 Care: {OFFICIAL_CEO_INFO.customerCareHotline}</span>
        </button>
      </div>

      {/* Footer */}
      <footer className={`mt-16 border-t py-8 px-4 text-xs transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                TrustConnect.ug
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">• CEO Mugisha El-shaddai</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                trustconnect.ug
              </span>
            </div>
            <p className="text-[11px] mt-0.5">
              Headquartered at Plot 14 Lumumba Avenue, Nakasero, Kampala. Reg: {OFFICIAL_CEO_INFO.registrationNo} • Visible across all web browsers (Chrome, Safari, Firefox, Edge, Opera)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button onClick={() => setShowSupportModal(true)} className="hover:underline cursor-pointer">
              24/7 Hotline: {OFFICIAL_CEO_INFO.customerCareHotline}
            </button>
            <span>•</span>
            <button onClick={() => setShowPaymentModal(true)} className="hover:underline cursor-pointer">
              MoMo: {OFFICIAL_CEO_INFO.mobileMoneyNumber}
            </button>
            <span>•</span>
            <button onClick={() => setShowAppStoreModal(true)} className="hover:underline cursor-pointer">
              Install App & Ads Hub
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MobileMoneyPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        userRole={currentRole}
        userName={userProfile.name}
        userPhone={userProfile.phone}
        onPaymentSuccess={handlePaymentSuccess}
        darkMode={darkMode}
      />

      <BiometricVerificationModal
        isOpen={showBiometricModal}
        onClose={() => setShowBiometricModal(false)}
        userRole={currentRole}
        userName={userProfile.name}
        onVerificationComplete={handleVerificationComplete}
        darkMode={darkMode}
      />

      <CustomerCare247Modal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
        userName={userProfile.name}
        darkMode={darkMode}
      />

      <InAppChatModal
        isOpen={chatRecipient.open}
        onClose={() => setChatRecipient(prev => ({ ...prev, open: false }))}
        recipientId={chatRecipient.id}
        recipientName={chatRecipient.name}
        recipientRole={chatRecipient.role}
        currentUserId={userProfile.id}
        currentUserName={userProfile.name}
        onDraftContractForUser={(name) => {
          setActiveTab('contracts');
        }}
        darkMode={darkMode}
      />

      <CandidateDetailModal
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        candidate={selectedCandidate}
        connectionFeePaid={userProfile.connectionFeePaid}
        onOpenPaymentModal={() => {
          setSelectedCandidate(null);
          setShowPaymentModal(true);
        }}
        onOpenChat={handleOpenChat}
        onDraftContract={(name) => {
          setSelectedCandidate(null);
          setActiveTab('contracts');
        }}
        darkMode={darkMode}
      />

      <AppStoreAndAdsModal
        isOpen={showAppStoreModal}
        onClose={() => setShowAppStoreModal(false)}
        onTriggerTestPush={handleTriggerTestPush}
        darkMode={darkMode}
      />

      <SeamlessOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        onCompleteProfile={(updated) => {
          setUserProfile(prev => ({ ...prev, ...updated }));
          if (updated.role) setCurrentRole(updated.role);
        }}
        darkMode={darkMode}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }}
        darkMode={darkMode}
      />
    </div>
  );
}
