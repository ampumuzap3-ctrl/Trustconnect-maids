import React from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Heart, 
  Utensils, 
  Clock, 
  MessageSquare, 
  FileText, 
  Lock,
  Building2,
  Calendar
} from 'lucide-react';
import { MaidProfile, EmployerProfile, UserRole } from '../types';

interface CandidateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: MaidProfile | EmployerProfile | null;
  connectionFeePaid: boolean;
  onOpenPaymentModal: () => void;
  onOpenChat: (id: string, name: string, role: UserRole) => void;
  onDraftContract: (name: string) => void;
  darkMode: boolean;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  isOpen,
  onClose,
  candidate,
  connectionFeePaid,
  onOpenPaymentModal,
  onOpenChat,
  onDraftContract,
  darkMode,
}) => {
  if (!isOpen || !candidate) return null;

  const isMaid = candidate.role === 'maid';
  const maid = isMaid ? (candidate as MaidProfile) : null;
  const employer = !isMaid ? (candidate as EmployerProfile) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border my-8 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        {/* Header Hero */}
        <div className="relative p-6 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/30 hover:bg-black/50 text-white cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-400 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-extrabold">{candidate.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950">
                  {isMaid ? 'Verified House Maid' : 'Verified Employer'}
                </span>
              </div>

              <p className="text-xs text-emerald-200 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{candidate.location.neighborhood}, {candidate.location.district}</span>
                {candidate.distanceKm && (
                  <span className="font-bold text-amber-300">• {candidate.distanceKm} km away</span>
                )}
              </p>

              <div className="flex items-center gap-2 text-xs pt-1">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{candidate.rating}</span>
                </div>
                <span className="text-emerald-200/80">({candidate.totalReviews} verified reviews)</span>
                <span className="text-emerald-200/80">•</span>
                <span className="font-bold text-white">
                  {candidate.monthlySalaryUgx.toLocaleString()} UGX / mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800">
          <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>TrustConnect Certified Security Dossier:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Uganda NIN</span>
                <span className="font-bold font-mono text-[11px]">{candidate.ninNumber}</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Biometrics</span>
                <span className="font-bold text-[11px] text-emerald-700 dark:text-emerald-400">Match Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bio & Details */}
        <div className="p-6 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Personal Bio & Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {candidate.bio}
            </p>
          </div>

          {/* Maid specific details */}
          {maid && (
            <div className="space-y-4">
              {/* Culinary & Childcare Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-emerald-600" />
                    <span>Cooking Specialties:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {maid.cookingSpecialties.map((dish, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium border border-emerald-200 dark:border-emerald-800">
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-emerald-600" />
                    <span>Key Qualifications:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {maid.skills?.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-medium border border-teal-200 dark:border-teal-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Past Employer References */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Verified Employer Reviews ({maid.reviews.length})
                </h4>
                <div className="space-y-2">
                  {maid.reviews.map(rev => (
                    <div key={rev.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span>{rev.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Verified Employer</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{rev.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 italic">
                        "{rev.comment}"
                      </p>
                      <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Employer specific details */}
          {employer && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[11px]">Household Size:</span>
                  <p className="font-bold text-sm">{employer.householdSize} Persons</p>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[11px]">Children:</span>
                  <p className="font-bold text-sm">{employer.numberOfChildren} Kids</p>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[11px]">Salary Offered:</span>
                  <p className="font-bold text-sm text-emerald-600">{employer.offeredSalaryUgx.toLocaleString()} UGX</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Household Requirements:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {employer.requirements.map((req, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                      • {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Contact Details & Connection Fee Gate */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Direct Contact Details:</span>
              </span>
              {connectionFeePaid ? (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  Connection Fee Paid (Unlocked)
                </span>
              ) : (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Locked
                </span>
              )}
            </div>

            {connectionFeePaid ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <a href={`tel:${candidate.phone}`} className="font-bold text-emerald-600 hover:underline">
                    {candidate.phone}
                  </a>
                </div>
                <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-sans">{candidate.email}</span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs space-y-2">
                <p className="text-slate-700 dark:text-slate-300">
                  To view candidate phone numbers, GPS coordinates, and draft active contracts, please pay the platform connection fee directly to CEO Mugisha El-shaddai (0785490344).
                </p>
                <button
                  onClick={onOpenPaymentModal}
                  className="w-full py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer shadow-xs"
                >
                  Pay Connection Fee (MTN / Airtel MoMo)
                </button>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              id="detail-start-chat-btn"
              onClick={() => {
                onClose();
                onOpenChat(candidate.id, candidate.name, candidate.role);
              }}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message in Chat</span>
            </button>

            <button
              id="detail-offer-contract-btn"
              onClick={() => {
                onClose();
                onDraftContract(candidate.name);
              }}
              className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Draft Active Contract</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
