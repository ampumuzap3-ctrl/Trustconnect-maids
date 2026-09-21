import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Moon, 
  Sun, 
  Eye, 
  Wifi, 
  WifiOff, 
  PhoneCall, 
  Download, 
  UserCheck, 
  Bell, 
  Sparkles 
} from 'lucide-react';
import { LanguageCode, UserRole } from '../types';
import { translations } from '../utils/translations';
import { OFFICIAL_CEO_INFO } from '../data/mockData';
import logoImg from '../assets/images/trustconnect_logo_1789968657734.jpg';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  lowBandwidth: boolean;
  setLowBandwidth: (val: boolean) => void;
  isOffline: boolean;
  setIsOffline: (val: boolean) => void;
  onOpenSupport: () => void;
  onOpenInstall: () => void;
  onOpenPromo: () => void;
  unreadNotifications: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  highContrast,
  setHighContrast,
  lowBandwidth,
  setLowBandwidth,
  isOffline,
  setIsOffline,
  onOpenSupport,
  onOpenInstall,
  onOpenPromo,
  unreadNotifications,
  onOpenNotifications,
}) => {
  const t = translations[language];

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors ${
      darkMode 
        ? 'bg-slate-900/95 border-slate-800 text-slate-100' 
        : highContrast
          ? 'bg-black text-white border-yellow-400'
          : 'bg-white/95 border-emerald-100 text-slate-800 backdrop-blur-md shadow-xs'
    }`}>
      {/* CEO & Trust Announcement Bar */}
      <div className={`px-4 py-1.5 text-xs font-medium flex flex-wrap items-center justify-between gap-2 border-b ${
        darkMode 
          ? 'bg-emerald-950/60 border-emerald-900/50 text-emerald-300' 
          : highContrast
            ? 'bg-yellow-400 text-black border-black font-bold'
            : 'bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-emerald-100'
      }`}>
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-500/30 text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          </span>
          <span className="font-semibold tracking-wide">TrustConnect.ug:</span>
          <span className="opacity-90 hidden sm:inline">Led by CEO Mugisha El-shaddai</span>
          <span className="hidden md:inline px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-400 text-slate-900">
            NIRA & Biometric Verified
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button 
            id="nav-hotline-quick"
            onClick={onOpenSupport}
            className="flex items-center gap-1.5 hover:underline text-amber-300 font-semibold cursor-pointer"
            title="Customer Care 24/7"
          >
            <PhoneCall className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>24/7 Hotline: {OFFICIAL_CEO_INFO.customerCareHotline}</span>
          </button>

          <span className="text-emerald-400/40 hidden sm:inline">|</span>

          <button
            id="nav-youtube-ads-btn"
            onClick={onOpenPromo}
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{t.youtubeAds}</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <img 
              src={logoImg} 
              alt="TrustConnect Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shadow-sm ring-1 ring-emerald-600/30" 
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-700"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                TrustConnect<span className="text-emerald-600 dark:text-emerald-400">.ug</span>
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300/40">
                Official
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
              Vetted House Maids & Trusted Employers • Uganda
            </p>
          </div>
        </div>

        {/* Center: Active Role Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <button
            id="role-switch-employer"
            onClick={() => setCurrentRole('employer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentRole === 'employer'
                ? 'bg-white dark:bg-emerald-700 text-emerald-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-200" />
            <span className="hidden sm:inline">I Need a Maid</span>
            <span className="sm:hidden">Employer</span>
          </button>
          <button
            id="role-switch-maid"
            onClick={() => setCurrentRole('maid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              currentRole === 'maid'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">I am a Maid</span>
            <span className="sm:hidden">Maid</span>
          </button>
        </div>

        {/* Right Action Tools: Language, Accessibility, Offline, Dark Mode, Install */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Multi-language Selector */}
          <div className="relative group">
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-semibold bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500 cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
            </div>
            <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-1.5 hidden group-hover:block z-50">
              <button
                id="lang-en"
                onClick={() => setLanguage('en')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  language === 'en' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🇺🇬 English (Official)
              </button>
              <button
                id="lang-lg"
                onClick={() => setLanguage('lg')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  language === 'lg' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🇺🇬 Oluganda (Kampala)
              </button>
              <button
                id="lang-sw"
                onClick={() => setLanguage('sw')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  language === 'sw' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🇹🇿 Kiswahili (East Africa)
              </button>
              <button
                id="lang-rn"
                onClick={() => setLanguage('rn')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  language === 'rn' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🇺🇬 Runyankole / Rukiga
              </button>
              <button
                id="lang-fr"
                onClick={() => setLanguage('fr')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                  language === 'fr' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                🇫🇷 Français (Régional)
              </button>
            </div>
          </div>

          {/* Low Bandwidth Mode Toggle */}
          <button
            id="toggle-low-bandwidth"
            onClick={() => setLowBandwidth(!lowBandwidth)}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              lowBandwidth
                ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 text-amber-800 dark:text-amber-300 font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
            title="Toggle Low Bandwidth Data Saver (2G/3G/4G MTN/Airtel optimization)"
          >
            <span className="text-[10px] font-bold">2G/3G</span>
          </button>

          {/* Offline Mode Toggle Simulation */}
          <button
            id="toggle-offline-mode"
            onClick={() => setIsOffline(!isOffline)}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              isOffline
                ? 'bg-red-100 dark:bg-red-950/70 border-red-300 text-red-700 dark:text-red-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400'
            }`}
            title={isOffline ? "App in Offline Mode" : "App Online"}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5 text-red-600" /> : <Wifi className="w-3.5 h-3.5" />}
          </button>

          {/* Accessibility / High Contrast Mode for visually impaired */}
          <button
            id="toggle-high-contrast"
            onClick={() => setHighContrast(!highContrast)}
            className={`p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
              highContrast
                ? 'bg-yellow-300 text-black border-yellow-500 font-bold'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
            title="Visual Impairment & High Contrast Accessibility Mode"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="toggle-dark-mode"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Notifications button */}
          <button
            id="nav-notifications-btn"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer"
            title="Push Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Install App Store button */}
          <button
            id="nav-install-app-btn"
            onClick={onOpenInstall}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
