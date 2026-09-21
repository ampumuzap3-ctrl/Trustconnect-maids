import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Download, 
  FileText, 
  Lock, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Printer, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { PaymentTransaction, UserRole } from '../types';
import { OFFICIAL_CEO_INFO } from '../data/mockData';

interface FinancialBudgetDashboardProps {
  transactions: PaymentTransaction[];
  userRole: UserRole;
  userName: string;
  darkMode: boolean;
  onOpenPaymentModal: () => void;
}

export const FinancialBudgetDashboard: React.FC<FinancialBudgetDashboardProps> = ({
  transactions,
  userRole,
  userName,
  darkMode,
  onOpenPaymentModal,
}) => {
  const [budgetGoalUgx, setBudgetGoalUgx] = useState<number>(450000);
  const [editBudget, setEditBudget] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState<number>(450000);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Compute total spending
  const totalSpentUgx = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amountUgx, 0);

  const budgetUsagePercent = Math.min(100, Math.round((totalSpentUgx / budgetGoalUgx) * 100));

  // Monthly breakdown mock data for visual chart
  const monthlyData = [
    { month: 'May 2026', total: 295000, salary: 280000, fee: 15000 },
    { month: 'Jun 2026', total: 310000, salary: 280000, fee: 30000 },
    { month: 'Jul 2026', total: 305000, salary: 280000, fee: 25000 },
    { month: 'Aug 2026', total: 320000, salary: 280000, fee: 40000 },
    { month: 'Sep 2026', total: totalSpentUgx, salary: 280000, fee: 35000 },
  ];

  const maxMonthValue = Math.max(...monthlyData.map(d => d.total), 400000);

  const handleExportEncryptedData = () => {
    const complianceExport = {
      complianceStandard: "UGANDA-DATA-PROTECTION-PRIVACY-ACT-2019",
      issuer: "TrustConnect Uganda Ltd.",
      ceoName: OFFICIAL_CEO_INFO.name,
      platformAccountId: OFFICIAL_CEO_INFO.mobileMoneyNumber,
      generatedAt: new Date().toISOString(),
      user: {
        name: userName,
        role: userRole,
      },
      auditTransactions: transactions,
      totalDisbursedUgx: totalSpentUgx,
      checksumEncryptedHash: `SHA256-${Math.random().toString(36).substring(2)}-TC-AUDIT`
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(complianceExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustConnect_Compliance_Report_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    setExportNotice("Encrypted compliance audit report downloaded successfully.");
    setTimeout(() => setExportNotice(null), 4000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className={`rounded-2xl border p-4 sm:p-6 transition-colors shadow-xs ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-bold">Financial Habits & Expense Tracking</h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              UGX Currency
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize monthly household staffing expenses, connection fees, and compliance exports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-print-financial-pdf"
            onClick={handlePrintReport}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF Report</span>
          </button>
          <button
            id="btn-export-encrypted-audit"
            onClick={handleExportEncryptedData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Compliance Export</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Spent this month */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Staffing Disbursed</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {totalSpentUgx.toLocaleString()} <span className="text-sm font-bold text-emerald-600">UGX</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Includes salary & MoMo connection fees</span>
        </div>

        {/* Budget Target Goal */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-500" />
              Monthly Budget Goal
            </span>
            <button
              onClick={() => setEditBudget(!editBudget)}
              className="text-[11px] font-bold text-emerald-600 hover:underline cursor-pointer"
            >
              {editBudget ? 'Cancel' : 'Adjust'}
            </button>
          </div>

          {editBudget ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                type="number"
                step={20000}
                value={newBudgetInput}
                onChange={e => setNewBudgetInput(Number(e.target.value))}
                className="w-28 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 font-bold bg-white dark:bg-slate-900"
              />
              <button
                onClick={() => {
                  setBudgetGoalUgx(newBudgetInput);
                  setEditBudget(false);
                }}
                className="px-2 py-1 text-xs bg-emerald-600 text-white font-bold rounded cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              {budgetGoalUgx.toLocaleString()} <span className="text-sm font-bold text-amber-500">UGX</span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              style={{ width: `${budgetUsagePercent}%` }}
              className={`h-full rounded-full transition-all ${
                budgetUsagePercent > 90 ? 'bg-red-500' : 'bg-emerald-500'
              }`}
            ></div>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {budgetUsagePercent}% of monthly budget allocated
          </span>
        </div>

        {/* CEO Verified Platform Status */}
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40">
          <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            <span>Official Billing Authority</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base font-black text-slate-900 dark:text-white mt-1">
            {OFFICIAL_CEO_INFO.name}
          </div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">
            MoMo: {OFFICIAL_CEO_INFO.mobileMoneyNumber}
          </p>
          <button
            onClick={onOpenPaymentModal}
            className="mt-2 text-xs font-bold text-amber-600 dark:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>+ Make Direct MoMo Payment</span>
          </button>
        </div>
      </div>

      {/* Visual Spending Habit Chart */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
        <h4 className="text-sm font-bold mb-4 flex items-center justify-between">
          <span>Monthly Spending Habits (Last 5 Months)</span>
          <span className="text-xs text-slate-400 font-normal">Wages & Platform Fees</span>
        </h4>

        {/* SVG Responsive Bar Chart */}
        <div className="h-44 sm:h-52 w-full flex items-end justify-between gap-3 sm:gap-6 pt-4 pb-2 px-2 border-b border-slate-200 dark:border-slate-700">
          {monthlyData.map((d, i) => {
            const barHeightPct = Math.round((d.total / maxMonthValue) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {Math.round(d.total / 1000)}k
                </div>

                <div className="w-full max-w-[48px] rounded-t-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex flex-col justify-end" style={{ height: `${barHeightPct}%` }}>
                  <div
                    className="w-full bg-amber-400"
                    style={{ height: `${(d.fee / d.total) * 100}%` }}
                    title={`Fees: ${d.fee.toLocaleString()} UGX`}
                  ></div>
                  <div
                    className="w-full bg-emerald-600 hover:bg-emerald-500 transition-colors"
                    style={{ height: `${(d.salary / d.total) * 100}%` }}
                    title={`Salary: ${d.salary.toLocaleString()} UGX`}
                  ></div>
                </div>

                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 text-center">
                  {d.month.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-600"></span>
            <span>Maid Monthly Salary</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400"></span>
            <span>Connection & Service Fees</span>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-bold flex items-center justify-between">
          <span>Transaction Records & Mobile Money Audit</span>
          <span className="text-xs text-slate-400">{transactions.length} Total</span>
        </h4>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Tx Reference</th>
                <th className="p-3">Type</th>
                <th className="p-3">Recipient / Provider</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Amount (UGX)</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                    {tx.txRef}
                  </td>
                  <td className="p-3 font-sans">
                    <span className="capitalize">{tx.type.replace('_', ' ')}</span>
                  </td>
                  <td className="p-3 font-sans">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{tx.recipientName}</div>
                    <div className="text-[10px] text-slate-400">{tx.recipientPhone} • {tx.mobileNetwork}</div>
                  </td>
                  <td className="p-3 text-slate-500 font-sans">{tx.date}</td>
                  <td className="p-3 text-right font-bold text-slate-900 dark:text-white">
                    {tx.amountUgx.toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      ✓ {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
