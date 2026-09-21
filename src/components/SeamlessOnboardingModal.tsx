import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  Fingerprint, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  User,
  KeyRound
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import logoImg from '../assets/images/trustconnect_logo_1789968657734.jpg';
import { OFFICIAL_CEO_INFO } from '../data/mockData';

interface SeamlessOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteProfile: (user: Partial<UserProfile>) => void;
  darkMode: boolean;
}

export const SeamlessOnboardingModal: React.FC<SeamlessOnboardingModalProps> = ({
  isOpen,
  onClose,
  onCompleteProfile,
  darkMode,
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'details' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('employer');
  const [enableBiometricUnlock, setEnableBiometricUnlock] = useState(true);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('details');
  };

  const handleFinishSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteProfile({
      name: name || (selectedRole === 'employer' ? 'Mukasa Julian' : 'Acan Joy'),
      phone: phone.startsWith('+256') ? phone : `+256 ${phone}`,
      email: email || undefined,
      role: selectedRole,
      isNinVerified: true,
      isBiometricVerified: enableBiometricUnlock,
    });
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Top Branding Banner */}
        <div className="p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white text-center space-y-2 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/10 text-white/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <img src={logoImg} alt="TrustConnect" className="w-12 h-12 rounded-xl mx-auto shadow-md ring-2 ring-amber-400" />
          <h3 className="text-lg font-black tracking-tight">TrustConnect Uganda</h3>
          <p className="text-xs text-emerald-200">
            Quick Seamless Onboarding • Verified by CEO {OFFICIAL_CEO_INFO.name}
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="text-sm font-bold">Enter Your Mobile Phone</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick sign-in with your MTN or Airtel Uganda number for SMS OTP security.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Uganda Mobile Phone Number:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0772 123 456 or 0701 123 456"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-emerald-600 font-bold">🇺🇬 +256</span>
                </div>
              </div>

              <button
                id="btn-send-sms-otp"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <span>Receive 4-Digit SMS Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <KeyRound className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <h4 className="text-sm font-bold">Enter 4-Digit OTP Code</h4>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a verification SMS to <strong>{phone}</strong>. (Auto-filled for demonstration: <strong>7241</strong>)
                </p>
              </div>

              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="7241"
                className="w-40 mx-auto text-center tracking-widest text-xl font-mono font-black py-2 rounded-xl border-2 border-emerald-500 bg-slate-50 dark:bg-slate-800"
              />

              <button
                id="btn-confirm-sms-otp"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Verify & Continue
              </button>
            </form>
          )}

          {step === 'details' && (
            <form onSubmit={handleFinishSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Your Full Legal Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Dr. Mukasa Julian or Acan Florence"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Email (Optional):</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="julian@domain.ug"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">I am joining TrustConnect as:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('employer')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                      selectedRole === 'employer'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    Employer (Need Maid)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('maid')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-bold cursor-pointer transition-all ${
                      selectedRole === 'maid'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    House Maid (Seeking Work)
                  </button>
                </div>
              </div>

              {/* Biometric toggle */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-emerald-600" />
                  <div>
                    <span className="text-xs font-bold block">Biometric Fast Access</span>
                    <span className="text-[10px] text-slate-400">Unlock app with Fingerprint / Face ID</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={enableBiometricUnlock}
                  onChange={e => setEnableBiometricUnlock(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <button
                id="btn-complete-onboarding"
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Complete Onboarding
              </button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                Welcome to TrustConnect Uganda!
              </h4>
              <p className="text-xs text-slate-500">
                Your profile is active and synced. You can now track live GPS candidates, verify biometrics, and pay connection fees.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                Start Exploring Platform
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
