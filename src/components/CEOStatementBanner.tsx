import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  CheckCircle2, 
  Smartphone, 
  Building2, 
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { OFFICIAL_CEO_INFO } from '../data/mockData';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface CEOStatementBannerProps {
  language: LanguageCode;
  darkMode: boolean;
  onOpenPaymentModal: () => void;
  onOpenBiometricModal: () => void;
  onOpenSupportModal: () => void;
}

export const CEOStatementBanner: React.FC<CEOStatementBannerProps> = ({
  language,
  darkMode,
  onOpenPaymentModal,
  onOpenBiometricModal,
  onOpenSupportModal
}) => {
  const [expanded, setExpanded] = useState(false);
  const t = translations[language];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-5 sm:p-6 shadow-md border border-emerald-800/40">
      {/* Background Subtle Geometric Pattern */}
      <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-teal-500/10 blur-2xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* CEO & Trust Title */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/90 text-slate-950 shadow-xs">
                <Award className="w-3.5 h-3.5" />
                Uganda's Verified Domestic Platform
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/60">
                <Building2 className="w-3.5 h-3.5" />
                Plot 14 Lumumba Ave, Nakasero, Kampala
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              TrustConnect: Safe, Verified Domestic Staffing for Ugandan Homes
            </h2>

            <p className="text-sm text-emerald-100/90 leading-relaxed">
              "As Founder & CEO, my solemn commitment is that every house maid and employer on TrustConnect is strictly authenticated via National ID (NIN), real-time facial biometric scans, and local authority verification. No shortcuts. Digital security for East Africa."
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-amber-400 flex items-center justify-center font-bold text-amber-300 text-sm shadow-xs">
                ME
              </div>
              <div>
                <p className="text-sm font-bold text-amber-300">{OFFICIAL_CEO_INFO.name}</p>
                <p className="text-xs text-emerald-200/80">{OFFICIAL_CEO_INFO.title} • {OFFICIAL_CEO_INFO.company}</p>
              </div>
            </div>
          </div>

          {/* Quick Action Badges & Fee Summary */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[280px]">
            {/* Connection Fee Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-700/60 backdrop-blur-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  Mobile Money Connection Fee:
                </span>
                <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  Official Account
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40">
                  <p className="text-emerald-300/80 text-[11px]">House Maids</p>
                  <p className="text-base font-extrabold text-white">5,000 UGX</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-800/40">
                  <p className="text-emerald-300/80 text-[11px]">Employers</p>
                  <p className="text-base font-extrabold text-amber-300">15,000 UGX</p>
                </div>
              </div>

              <div className="text-[11px] text-emerald-200/90 pt-1 border-t border-emerald-800/40 flex items-center justify-between">
                <span>Account: <strong className="text-white">{OFFICIAL_CEO_INFO.mobileMoneyNumber}</strong></span>
                <span className="text-amber-300 font-medium">({OFFICIAL_CEO_INFO.name})</span>
              </div>

              <button
                id="banner-pay-connection-fee-btn"
                onClick={onOpenPaymentModal}
                className="w-full mt-1 py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>Pay Fee via MTN / Airtel MoMo</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Verification action */}
            <div className="flex items-center justify-between gap-2">
              <button
                id="banner-biometric-verify-btn"
                onClick={onOpenBiometricModal}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 border border-emerald-600/60 transition-colors cursor-pointer"
              >
                <Fingerprint className="w-3.5 h-3.5 text-amber-300" />
                <span>Verify Biometrics & NIN</span>
              </button>

              <button
                id="banner-care-hotline-btn"
                onClick={onOpenSupportModal}
                className="py-2 px-3 rounded-lg bg-teal-800/80 hover:bg-teal-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1 border border-teal-600/60 transition-colors cursor-pointer"
                title="Customer Care Live Assistance"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 Care</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verification Guarantee Highlights */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>NIRA National ID Check</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Real-time Face Biometric</span>
          </div>
        </div>
      </div>
    </div>
  );
};
