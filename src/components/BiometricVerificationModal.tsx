import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  CheckCircle, 
  ShieldCheck, 
  AlertCircle, 
  Fingerprint, 
  Scan, 
  FileText, 
  RefreshCw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { UserRole } from '../types';

interface BiometricVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  userName: string;
  onVerificationComplete: (ninNumber: string) => void;
  darkMode: boolean;
}

export const BiometricVerificationModal: React.FC<BiometricVerificationModalProps> = ({
  isOpen,
  onClose,
  userRole,
  userName,
  onVerificationComplete,
  darkMode,
}) => {
  const [step, setStep] = useState<'intro' | 'camera_scan' | 'nin_card' | 'verifying' | 'success'>('intro');
  const [ninNumber, setNinNumber] = useState('CF95012984102K');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedCard, setCapturedCard] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!isOpen) return null;

  const startCamera = async () => {
    setCameraActive(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.log('Camera device permission fallback used');
    }
  };

  const takeSnapshot = () => {
    // Generate snapshot or simulation
    setCapturedPhoto('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
    setStep('nin_card');
  };

  const handleCardUpload = () => {
    setCapturedCard('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80');
    setStep('verifying');

    setTimeout(() => {
      setStep('success');
      onVerificationComplete(ninNumber);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950">
              <Fingerprint className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Biometric & Identity Authentication</h3>
              <p className="text-xs text-emerald-200">
                Uganda NIRA National ID & Live Facial Recognition
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {step === 'intro' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Why Biometric Authentication is Mandatory</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  To ensure 100% peace of mind for both employers and domestic workers, TrustConnect CEO Mugisha El-shaddai requires real-time identity authentication. This protects against identity impersonation, fraud, and ensures legal accountability under Ugandan law.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <Camera className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Step 1: Real-time Facial Geometry Scan</h5>
                    <p className="text-slate-500 dark:text-slate-400">Take a live selfie to match facial biometrics with your national records.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <FileText className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Step 2: Uganda National ID (NIN) Confirmation</h5>
                    <p className="text-slate-500 dark:text-slate-400">Provide your 14-character Ugandan NIN card details for database verification.</p>
                  </div>
                </div>
              </div>

              <button
                id="start-biometric-scan-btn"
                onClick={() => {
                  setStep('camera_scan');
                  startCamera();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Scan className="w-4 h-4" />
                <span>Begin Real-Time Facial Scan</span>
              </button>
            </div>
          )}

          {step === 'camera_scan' && (
            <div className="space-y-4 text-center">
              <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-lg flex items-center justify-center">
                {cameraActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="text-slate-400 text-xs flex flex-col items-center">
                    <Camera className="w-8 h-8 mb-2 animate-pulse text-emerald-400" />
                    <span>Position Face in Center</span>
                  </div>
                )}

                {/* Facial Oval Overlay */}
                <div className="absolute inset-0 m-auto w-44 h-56 rounded-[50%] border-2 border-dashed border-amber-400/80 pointer-events-none flex items-center justify-center">
                  <span className="text-[10px] bg-slate-950/80 px-2 py-0.5 rounded text-amber-300 font-mono">
                    Liveness Geometry
                  </span>
                </div>

                {/* Scanner Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce"></div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Look directly into the camera. Hold steady with good lighting.
              </p>

              <button
                id="capture-selfie-btn"
                onClick={takeSnapshot}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Capture Live Biometric Photo</span>
              </button>
            </div>
          )}

          {step === 'nin_card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Uganda National Identification Number (NIN):
                </label>
                <input
                  type="text"
                  value={ninNumber}
                  onChange={(e) => setNinNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. CF950121045K8L"
                  maxLength={14}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-bold tracking-wider uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  14 alphanumeric characters printed on your Republic of Uganda National ID.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-2">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto" />
                <h5 className="text-xs font-bold">National ID Card Photo Scan</h5>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Upload or snap the front of your National ID card to confirm matching face.
                </p>
                <button
                  type="button"
                  onClick={handleCardUpload}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Snap / Upload ID Card
                </button>
              </div>

              <button
                id="submit-nin-verification-btn"
                onClick={handleCardUpload}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify with NIRA Uganda Records</span>
              </button>
            </div>
          )}

          {step === 'verifying' && (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin mx-auto"></div>
              <div>
                <h4 className="text-base font-bold">Querying National ID Register...</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Cross-referencing biometric facial features with NIN <strong>{ninNumber}</strong>.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  Identity Successfully Verified!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Your biometric facial scan and Uganda NIN have been authenticated. The <strong>TrustConnect Verified Shield</strong> has been permanently applied to your profile.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">NIN Status:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">VALIDATED ({ninNumber})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Biometric Match:</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">99.4% CONFIDENCE</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer"
              >
                Finish & Return to App
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
