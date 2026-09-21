import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Receipt, 
  Download, 
  Share2, 
  Sparkles,
  ArrowRight,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserRole, PaymentTransaction } from '../types';
import { OFFICIAL_CEO_INFO } from '../data/mockData';

interface MobileMoneyPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  userName: string;
  userPhone: string;
  onPaymentSuccess: (transaction: PaymentTransaction) => void;
  darkMode: boolean;
}

export const MobileMoneyPaymentModal: React.FC<MobileMoneyPaymentModalProps> = ({
  isOpen,
  onClose,
  userRole,
  userName,
  userPhone,
  onPaymentSuccess,
  darkMode,
}) => {
  const [network, setNetwork] = useState<'MTN Mobile Money' | 'Airtel Money'>('MTN Mobile Money');
  const [payerPhone, setPayerPhone] = useState(userPhone || '0772000000');
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [lastTx, setLastTx] = useState<PaymentTransaction | null>(null);

  if (!isOpen) return null;

  const requiredFeeUgx = userRole === 'maid' 
    ? OFFICIAL_CEO_INFO.maidConnectionFeeUgx 
    : OFFICIAL_CEO_INFO.employerConnectionFeeUgx;

  const handleInitiatePayment = () => {
    setStep('processing');

    // Simulate real-time Mobile Money USSD prompt and API webhook confirmation
    setTimeout(() => {
      const generatedRef = `TC-MM-${Math.floor(1000000 + Math.random() * 9000000)}`;
      const newTx: PaymentTransaction = {
        id: `tx-${Date.now()}`,
        txRef: generatedRef,
        userId: userRole === 'maid' ? 'maid-current' : 'emp-current',
        userName: userName || (userRole === 'maid' ? 'House Maid Candidate' : 'Verified Employer'),
        userRole,
        type: 'connection_fee',
        amountUgx: requiredFeeUgx,
        mobileNetwork: network,
        recipientPhone: OFFICIAL_CEO_INFO.mobileMoneyNumber,
        recipientName: OFFICIAL_CEO_INFO.name,
        status: 'completed',
        date: new Date().toLocaleString(),
        notes: `TrustConnect Connection Fee for ${userRole === 'maid' ? 'House Maid' : 'Employer'} Access`
      };

      setLastTx(newTx);
      setStep('confirmed');
      onPaymentSuccess(newTx);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }, 2800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-950 shadow-xs">
              <Smartphone className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">In-App Mobile Money Payment</h3>
              <p className="text-xs text-emerald-200">
                Official TrustConnect Direct Remittance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {step === 'details' && (
            <>
              {/* Fee Breakdown Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
                    {userRole === 'maid' ? 'House Maid Connection Fee' : 'Employer Platform Connection Fee'}
                  </span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {requiredFeeUgx.toLocaleString()} <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">UGX</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Unlocks direct contact phone numbers, GPS coordinates, and verified contract generation.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-xs text-center">
                  <span>100%</span>
                  <span className="block text-[10px] font-normal opacity-90">Secure</span>
                </div>
              </div>

              {/* Official Account Information (Mugisha El-shaddai) */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    Verified Receiving Account (CEO):
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-950 font-extrabold uppercase">
                    Direct MoMo
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 border-t border-amber-200 dark:border-amber-900">
                  <span className="text-slate-600 dark:text-slate-400">Registered Name:</span>
                  <strong className="text-slate-900 dark:text-white font-extrabold text-sm">{OFFICIAL_CEO_INFO.name}</strong>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Mobile Money Account Number:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-sm tracking-wider font-bold">
                    {OFFICIAL_CEO_INFO.mobileMoneyNumber}
                  </strong>
                </div>
              </div>

              {/* Select Network */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Your Mobile Money Provider:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNetwork('MTN Mobile Money')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      network === 'MTN Mobile Money'
                        ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                      MTN
                    </div>
                    <div>
                      <p className="text-xs font-bold">MTN MoMo</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">*165#</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNetwork('Airtel Money')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 cursor-pointer transition-all ${
                      network === 'Airtel Money'
                        ? 'bg-red-500/15 border-red-500 ring-2 ring-red-500/30 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      Airtel
                    </div>
                    <div>
                      <p className="text-xs font-bold">Airtel Money</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">*185#</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payer Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Registered Phone Number for Prompt:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={payerPhone}
                    onChange={(e) => setPayerPhone(e.target.value)}
                    placeholder="e.g. 0772 000 000 or 0701 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] text-slate-400">Uganda (+256)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  You will receive a PIN prompt on your phone to authorize {requiredFeeUgx.toLocaleString()} UGX.
                </p>
              </div>

              {/* Action Button */}
              <button
                id="initiate-momo-payment-btn"
                onClick={handleInitiatePayment}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Authorize {requiredFeeUgx.toLocaleString()} UGX via {network}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin"></div>
                <Smartphone className="w-6 h-6 text-emerald-600 absolute inset-0 m-auto" />
              </div>
              <div>
                <h4 className="text-base font-bold">Pushing USSD Request to Phone...</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Please check your phone (<strong>{payerPhone}</strong>) and enter your Mobile Money PIN to approve <strong>{requiredFeeUgx.toLocaleString()} UGX</strong> to <strong>{OFFICIAL_CEO_INFO.name} ({OFFICIAL_CEO_INFO.mobileMoneyNumber})</strong>.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 max-w-xs mx-auto text-left text-xs space-y-1 font-mono">
                <div className="text-slate-400 text-[10px]">SIMULATING USSD PROMPT:</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold">Transfer {requiredFeeUgx.toLocaleString()} UGX to Mugisha El-shaddai?</div>
                <div className="text-slate-500">1: Confirm with PIN</div>
                <div className="text-slate-500">2: Cancel</div>
              </div>
            </div>
          )}

          {step === 'confirmed' && lastTx && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                  Payment Verified Successfully!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your TrustConnect platform connection fee is active. You can now access verified contacts, contracts, and GPS radar.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-slate-50 dark:bg-slate-800/80 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <Receipt className="w-4 h-4 text-emerald-600" />
                    <span>TRUSTCONNECT RECEIPT</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    PAID
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Transaction Reference:</span>
                    <strong className="text-slate-800 dark:text-slate-200">{lastTx.txRef}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Amount Paid:</span>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{lastTx.amountUgx.toLocaleString()} UGX</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Paid By:</span>
                    <span className="text-slate-800 dark:text-slate-200">{lastTx.userName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Recipient (CEO):</span>
                    <span className="text-slate-800 dark:text-slate-200">{lastTx.recipientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Recipient Account:</span>
                    <span className="text-slate-800 dark:text-slate-200">{lastTx.recipientPhone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Provider:</span>
                    <span className="text-slate-800 dark:text-slate-200">{lastTx.mobileNetwork}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 text-center">
                  TrustConnect Uganda Ltd. • CEO Mugisha El-shaddai • Nakasero, Kampala
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrintReceipt}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Continue to Dashboard</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
