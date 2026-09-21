import React, { useState } from 'react';
import { 
  FileCheck, 
  FileText, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  UserCheck, 
  ShieldCheck, 
  Phone, 
  MapPin,
  Clock,
  PenTool,
  Printer
} from 'lucide-react';
import { Contract, UserRole } from '../types';

interface ActiveContractsDashboardProps {
  contracts: Contract[];
  currentRole: UserRole;
  currentUserId: string;
  currentUserName: string;
  onSignContract: (contractId: string, role: UserRole) => void;
  onCreateContract: (newContract: Contract) => void;
  darkMode: boolean;
}

export const ActiveContractsDashboard: React.FC<ActiveContractsDashboardProps> = ({
  contracts,
  currentRole,
  currentUserId,
  currentUserName,
  onSignContract,
  onCreateContract,
  darkMode,
}) => {
  const [showNewContractForm, setShowNewContractForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(contracts[0] || null);

  // New contract form state
  const [maidName, setMaidName] = useState('');
  const [maidPhone, setMaidPhone] = useState('');
  const [agreedSalaryUgx, setAgreedSalaryUgx] = useState(300000);
  const [workLocation, setWorkLocation] = useState('Kololo, Kampala');
  const [workType, setWorkType] = useState<'live_in' | 'day_worker'>('live_in');
  const [offDays, setOffDays] = useState('Every Sunday');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCtr: Contract = {
      id: `ctr-${Date.now()}`,
      contractNumber: `TC-UG-CTR-2026-${Math.floor(100 + Math.random() * 900)}`,
      employerId: 'emp-1',
      employerName: currentRole === 'employer' ? currentUserName : 'Employer Household',
      employerPhone: '+256 774 201 993',
      maidId: 'maid-custom',
      maidName: maidName || 'Domestic Candidate',
      maidPhone: maidPhone || '+256 772 000 000',
      workLocation,
      agreedSalaryUgx,
      paymentCycle: 'monthly',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      workType,
      status: 'pending_signature',
      responsibilities: [
        'Housekeeping, dusting, and general sanitization',
        'Laundry and ironing of clothing',
        'Preparation of meals and dishwashing',
        'Maintaining family confidentiality and security protocol'
      ],
      offDays,
      probationMonths: 1,
      emergencyContact: {
        name: emergencyName || 'Relative Next of Kin',
        relationship: 'Guarantor',
        phone: emergencyPhone || '+256 700 000 000'
      },
      employerSigned: currentRole === 'employer',
      maidSigned: currentRole === 'maid',
      createdAt: new Date().toISOString()
    };

    onCreateContract(newCtr);
    setSelectedContract(newCtr);
    setShowNewContractForm(false);
  };

  const handlePrintContract = () => {
    window.print();
  };

  return (
    <div className={`rounded-2xl border p-4 sm:p-6 transition-colors shadow-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold">Active Domestic Contracts Dashboard</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300">
              Ugandan Labor Law Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent wage agreements, duty checklists, off-days, and mutual legal protection.
          </p>
        </div>

        <button
          id="btn-draft-new-contract"
          onClick={() => setShowNewContractForm(!showNewContractForm)}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showNewContractForm ? 'Cancel Form' : 'Draft New Contract'}</span>
        </button>
      </div>

      {/* New Contract Modal/Form */}
      {showNewContractForm && (
        <form onSubmit={handleCreateSubmit} className="mt-5 p-4 sm:p-5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <PenTool className="w-4 h-4 text-emerald-600" />
              <span>Draft Legal Domestic Contract</span>
            </h4>
            <span className="text-[11px] text-slate-500">Uganda Employment Act Standards</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold mb-1">House Maid Name:</label>
              <input
                type="text"
                required
                value={maidName}
                onChange={e => setMaidName(e.target.value)}
                placeholder="e.g. Acan Florence"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Maid Phone Number:</label>
              <input
                type="text"
                required
                value={maidPhone}
                onChange={e => setMaidPhone(e.target.value)}
                placeholder="+256 772 000 000"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Agreed Monthly Salary (UGX):</label>
              <input
                type="number"
                required
                step={10000}
                value={agreedSalaryUgx}
                onChange={e => setAgreedSalaryUgx(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Work Location:</label>
              <input
                type="text"
                required
                value={workLocation}
                onChange={e => setWorkLocation(e.target.value)}
                placeholder="e.g. Naguru Hill, Kampala"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Work Type:</label>
              <select
                value={workType}
                onChange={e => setWorkType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="live_in">Live-in Maid (Board & Lodging included)</option>
                <option value="day_worker">Day Worker (Comes daily/scheduled)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-1">Scheduled Rest / Off-Days:</label>
              <input
                type="text"
                value={offDays}
                onChange={e => setOffDays(e.target.value)}
                placeholder="e.g. Every Sunday"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Emergency Contact / Guarantor Name:</label>
              <input
                type="text"
                value={emergencyName}
                onChange={e => setEmergencyName(e.target.value)}
                placeholder="e.g. Otim John (Brother / Guarantor)"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Emergency Phone:</label>
              <input
                type="text"
                value={emergencyPhone}
                onChange={e => setEmergencyPhone(e.target.value)}
                placeholder="+256 700 000 000"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewContractForm(false)}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Generate Legal Contract
            </button>
          </div>
        </form>
      )}

      {/* Main Content: List + Detail View */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Contracts List */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Registered Contracts ({contracts.length})
          </h4>

          {contracts.map(c => {
            const isSelected = selectedContract?.id === c.id;
            return (
              <div
                key={c.id}
                id={`contract-item-${c.id}`}
                onClick={() => setSelectedContract(c)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/40'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                    {c.contractNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    c.status === 'active' 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                  }`}>
                    {c.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-2 text-xs">
                  <p className="font-bold text-slate-800 dark:text-slate-200">
                    {c.maidName} ↔ {c.employerName}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    Salary: <strong>{c.agreedSalaryUgx.toLocaleString()} UGX / mo</strong>
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Start: {c.startDate}</span>
                  <span>{c.workType === 'live_in' ? '🏠 Live-in' : '☀️ Day Worker'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Contract Document */}
        <div className="lg:col-span-2">
          {selectedContract ? (
            <div className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
              darkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50/70 border-slate-200'
            }`}>
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      Domestic Employment Agreement
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-600 text-white">
                      {selectedContract.contractNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Verified through TrustConnect Uganda Platform • Registered under CEO Mugisha El-shaddai
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintContract}
                    className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Print / Save PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                </div>
              </div>

              {/* Parties Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase block">Employer (Household Head)</span>
                  <p className="font-bold text-sm mt-0.5">{selectedContract.employerName}</p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {selectedContract.employerPhone}
                  </p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {selectedContract.workLocation}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] font-bold text-emerald-600 uppercase block">Domestic Worker (House Maid)</span>
                  <p className="font-bold text-sm mt-0.5">{selectedContract.maidName}</p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {selectedContract.maidPhone}
                  </p>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <UserCheck className="w-3 h-3" /> Emergency: {selectedContract.emergencyContact.name} ({selectedContract.emergencyContact.phone})
                  </p>
                </div>
              </div>

              {/* Financial Terms & Schedule */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-[11px]">Agreed Salary</span>
                  <p className="font-black text-emerald-600 text-sm mt-0.5">
                    {selectedContract.agreedSalaryUgx.toLocaleString()} UGX
                  </p>
                  <span className="text-[10px] text-slate-400">Paid Monthly</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-[11px]">Work Type</span>
                  <p className="font-bold text-sm mt-0.5 capitalize">
                    {selectedContract.workType.replace('_', ' ')}
                  </p>
                  <span className="text-[10px] text-slate-400">Board included</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-[11px]">Off Days</span>
                  <p className="font-bold text-xs mt-0.5">
                    {selectedContract.offDays}
                  </p>
                  <span className="text-[10px] text-slate-400">Mandatory Rest</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 text-[11px]">Contract Term</span>
                  <p className="font-bold text-xs mt-0.5">
                    12 Months
                  </p>
                  <span className="text-[10px] text-slate-400">Renewable</span>
                </div>
              </div>

              {/* Responsibilities Checklist */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Defined Duties & Quality Standards:
                </span>
                <div className="space-y-1">
                  {selectedContract.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signatures & Execution Status */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Employer Signature */}
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Employer Digital Signature</span>
                    {selectedContract.employerSigned ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Signed ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    )}
                  </div>
                  {selectedContract.employerSigned ? (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 font-serif italic text-emerald-800 dark:text-emerald-300 text-xs">
                      {selectedContract.employerName} (Verified via MoMo & NIN)
                    </div>
                  ) : currentRole === 'employer' ? (
                    <button
                      id="sign-contract-employer-btn"
                      onClick={() => onSignContract(selectedContract.id, 'employer')}
                      className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Sign as Employer
                    </button>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Awaiting Employer Signature</p>
                  )}
                </div>

                {/* Maid Signature */}
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Maid Digital Signature</span>
                    {selectedContract.maidSigned ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Signed ✓
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        Pending
                      </span>
                    )}
                  </div>
                  {selectedContract.maidSigned ? (
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded border border-emerald-200 dark:border-emerald-800 font-serif italic text-emerald-800 dark:text-emerald-300 text-xs">
                      {selectedContract.maidName} (Biometric & NIN Confirmed)
                    </div>
                  ) : currentRole === 'maid' ? (
                    <button
                      id="sign-contract-maid-btn"
                      onClick={() => onSignContract(selectedContract.id, 'maid')}
                      className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                    >
                      Sign as Maid
                    </button>
                  ) : (
                    <p className="text-[11px] text-slate-400 italic">Awaiting Maid Signature</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center border rounded-2xl border-dashed border-slate-300 dark:border-slate-700">
              <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                Select a contract to review terms and signatures
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
