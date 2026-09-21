import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  MessageSquare, 
  Phone, 
  UserCheck, 
  Lock,
  Heart,
  Utensils
} from 'lucide-react';
import { MaidProfile, EmployerProfile, UserRole } from '../types';

interface CandidateGridProps {
  currentRole: UserRole;
  maids: MaidProfile[];
  employers: EmployerProfile[];
  connectionFeePaid: boolean;
  onSelectMaid: (maid: MaidProfile) => void;
  onSelectEmployer: (emp: EmployerProfile) => void;
  onOpenChat: (id: string, name: string, role: UserRole) => void;
  onOpenPaymentModal: () => void;
  darkMode: boolean;
}

export const CandidateGrid: React.FC<CandidateGridProps> = ({
  currentRole,
  maids,
  employers,
  connectionFeePaid,
  onSelectMaid,
  onSelectEmployer,
  onOpenChat,
  onOpenPaymentModal,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'live_in' | 'day_worker'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // Filter maids or employers depending on role
  const isBrowsingMaids = currentRole === 'employer';

  const filteredMaids = maids.filter(m => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      m.cookingSpecialties?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || m.workType === filterType || m.workType === 'both';
    const matchesVerified = !verifiedOnly || (m.isNinVerified && m.isBiometricVerified);

    return matchesSearch && matchesType && matchesVerified;
  });

  const filteredEmployers = employers.filter(e => {
    const matchesSearch = 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.requirements.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesVerified = !verifiedOnly || (e.isNinVerified && e.isBiometricVerified);

    return matchesSearch && matchesVerified;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className={`p-4 rounded-2xl border transition-colors flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isBrowsingMaids ? "Search maids by name, location (Ntinda, Kololo), cooking, skills..." : "Search employers by family name, area, salary offer..."}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {isBrowsingMaids && (
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === 'all' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                All Work
              </button>
              <button
                onClick={() => setFilterType('live_in')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === 'live_in' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                Live-in
              </button>
              <button
                onClick={() => setFilterType('day_worker')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  filterType === 'day_worker' ? 'bg-white dark:bg-slate-700 font-bold shadow-xs' : 'text-slate-500'
                }`}
              >
                Day Worker
              </button>
            </div>
          )}

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
              verifiedOnly
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% NIRA Verified</span>
          </button>
        </div>
      </div>

      {/* Candidates Grid */}
      {isBrowsingMaids ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaids.map(maid => (
            <div
              key={maid.id}
              className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="space-y-3">
                {/* Profile Top Row */}
                <div className="flex items-start gap-3">
                  <div className="relative cursor-pointer" onClick={() => onSelectMaid(maid)}>
                    <img
                      src={maid.avatar}
                      alt={maid.name}
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-emerald-500/40 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 
                        onClick={() => onSelectMaid(maid)}
                        className="font-bold text-sm truncate cursor-pointer hover:text-emerald-600"
                      >
                        {maid.name}
                      </h4>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{maid.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{maid.location.neighborhood}</span>
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {maid.workType === 'live_in' ? 'Live-In' : maid.workType === 'day_worker' ? 'Day Worker' : 'Flexible'}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        • {maid.experienceYears} yrs exp
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification Badges */}
                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NIN: {maid.ninNumber}</span>
                  <span>• Biometric Verified</span>
                </div>

                {/* Specialties / Skills Tags */}
                <div className="flex flex-wrap gap-1">
                  {maid.skills?.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {maid.bio}
                </p>

                {/* Salary Info */}
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Monthly Expected:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {maid.monthlySalaryUgx.toLocaleString()} UGX
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectMaid(maid)}
                  className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  View Dossier
                </button>

                <button
                  onClick={() => onOpenChat(maid.id, maid.name, maid.role)}
                  className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat Direct</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Employer Household Cards for Maids to browse */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployers.map(emp => (
            <div
              key={emp.id}
              className={`p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-14 h-14 rounded-xl object-cover ring-2 ring-emerald-500/40 shadow-xs cursor-pointer"
                    onClick={() => onSelectEmployer(emp)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 
                        onClick={() => onSelectEmployer(emp)}
                        className="font-bold text-sm truncate cursor-pointer hover:text-emerald-600"
                      >
                        {emp.name}
                      </h4>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{emp.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{emp.location.neighborhood}</span>
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                      Household: {emp.householdSize} people ({emp.numberOfChildren} kids)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Prompt Salary Payer • Verified Employer</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {emp.bio}
                </p>

                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">Offered Salary:</span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-300">
                    {emp.offeredSalaryUgx.toLocaleString()} UGX / mo
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onSelectEmployer(emp)}
                  className="py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer"
                >
                  View Home
                </button>

                <button
                  onClick={() => onOpenChat(emp.id, emp.name, emp.role)}
                  className="py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Family</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
