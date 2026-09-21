import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Share2, 
  Youtube, 
  Play, 
  Smartphone, 
  CheckCircle, 
  Copy, 
  Sparkles, 
  Bell, 
  Globe,
  ExternalLink
} from 'lucide-react';
import logoImg from '../assets/images/trustconnect_logo_1789968657734.jpg';
import { OFFICIAL_CEO_INFO } from '../data/mockData';

interface AppStoreAndAdsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerTestPush: () => void;
  darkMode: boolean;
}

export const AppStoreAndAdsModal: React.FC<AppStoreAndAdsModalProps> = ({
  isOpen,
  onClose,
  onTriggerTestPush,
  darkMode,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'stores' | 'youtube_ads' | 'push'>('stores');

  if (!isOpen) return null;

  const appShareUrl = 'https://trustconnect.ug';
  const promoText = `Discover TrustConnect.ug! Uganda's official domestic worker platform connecting vetted house maids with trusted employers featuring biometric ID verification, MTN & Airtel Mobile Money, and active contracts led by CEO Mugisha El-shaddai. Access now on Chrome, Safari or any browser at: ${appShareUrl}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(promoText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className={`relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border my-8 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="TrustConnect Logo" className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">App Store, Google Play & Promotion Hub</h3>
              <p className="text-xs text-emerald-200">Global Download & Ugandan Marketing Kit</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('stores')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'stores'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            App Store & Play Store
          </button>
          <button
            onClick={() => setActiveTab('youtube_ads')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'youtube_ads'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            YouTube & Social Ads Kit
          </button>
          <button
            onClick={() => setActiveTab('push')}
            className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
              activeTab === 'push'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Push Notifications
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {activeTab === 'stores' && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <img src={logoImg} alt="TrustConnect.ug" className="w-16 h-16 rounded-2xl mx-auto shadow-md ring-2 ring-emerald-500" />
                <h4 className="text-base font-extrabold">TrustConnect.ug: Uganda Domestic Network</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Accessible directly on all web browsers at <strong className="text-emerald-600 dark:text-emerald-400">trustconnect.ug</strong>, or installable as a mobile application.
                </p>
              </div>

              {/* Universal Web Browser Access Banner */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-500/40 space-y-2 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="font-extrabold text-xs text-emerald-300 uppercase tracking-wide">Live Web Address:</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-bold border border-emerald-400/30">
                    All Browsers Ready
                  </span>
                </div>
                <div className="flex items-center justify-between bg-black/40 px-3 py-2 rounded-lg border border-emerald-500/20">
                  <span className="font-mono text-sm font-bold text-emerald-200">https://trustconnect.ug</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://trustconnect.ug');
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2500);
                    }}
                    className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold text-white transition-colors cursor-pointer"
                  >
                    Copy URL
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  ✓ 100% visible and responsive on Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, Opera, and Samsung Internet on mobile and desktop.
                </p>
              </div>

              {/* Official Store Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Google Play */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    ▶ Play
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">GET IT ON</span>
                    <strong className="text-xs font-black">Google Play Store</strong>
                    <span className="text-[10px] text-emerald-600 block">Uganda & Worldwide</span>
                  </div>
                </div>

                {/* Apple Store */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                     App
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Download on the</span>
                    <strong className="text-xs font-black">Apple App Store</strong>
                    <span className="text-[10px] text-emerald-600 block">iOS 16+ Ready</span>
                  </div>
                </div>
              </div>

              {/* Low data direct APK option for Uganda */}
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-emerald-900 dark:text-emerald-300 font-bold block">
                    Direct Lite APK (Low Data for Uganda)
                  </strong>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Optimized for 2G/3G MTN & Airtel networks (Only 8.4 MB).
                  </span>
                </div>
                <button
                  onClick={() => alert("TrustConnect Lite APK download initiated. Compatible with all Android smartphones across Uganda.")}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 cursor-pointer shadow-xs"
                >
                  Download APK
                </button>
              </div>

              {/* Share */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                <button
                  onClick={handleCopyShare}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedLink ? 'Link Copied! ✓' : 'Copy Download Link'}</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(promoText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share to WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {activeTab === 'youtube_ads' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 space-y-2">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold">
                  <Youtube className="w-5 h-5" />
                  <span>Official YouTube Video Ad & Campaign Brief</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Campaign Title: <em>"Find Safe, Vetted House Maids in Kampala with TrustConnect"</em>. Directed under the leadership of CEO Mugisha El-shaddai.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>30-Second Commercial Script:</span>
                  <span className="text-amber-400 font-mono">0:30 TV & YouTube Bumper</span>
                </div>
                <p className="text-xs italic text-slate-200 leading-relaxed font-sans">
                  "Finding reliable domestic help shouldn't be a gamble. With TrustConnect Uganda, every house maid and employer is 100% verified with biometric facial scans and National ID cards. Pay connection fees safely via MTN or Airtel Mobile Money to CEO Mugisha El-shaddai (0785490344). Download TrustConnect on Google Play and Apple App Store today!"
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Target Social Channels for Visibility:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold">
                    YouTube Ads (Kampala)
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold">
                    TikTok Uganda
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold">
                    Facebook & Instagram
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'push' && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Bell className="w-7 h-7 animate-bounce" />
              </div>

              <div>
                <h4 className="text-base font-bold">Real-Time Push Notifications</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Receive instant mobile alerts for new nearby candidates, contract status changes, and Mobile Money confirmation from Mugisha El-shaddai.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-left text-xs space-y-1.5 font-mono">
                <div className="text-emerald-600 font-bold">🔔 TrustConnect Notification Sample:</div>
                <div className="text-slate-800 dark:text-slate-200">
                  "Acan Florence accepted your domestic contract terms! Review & sign in your TrustConnect dashboard."
                </div>
              </div>

              <button
                id="test-push-notification-btn"
                onClick={onTriggerTestPush}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Bell className="w-4 h-4" />
                <span>Send Real-Time Test Push Alert</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
