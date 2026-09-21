import React from 'react';
import { X, Bell, CheckCircle2, DollarSign, FileText, MapPin } from 'lucide-react';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'payment' | 'contract' | 'gps' | 'security';
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
  darkMode: boolean;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  darkMode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div className={`relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="p-4 bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Real-Time Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2 border-b border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onMarkAllRead}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline px-2 py-1 cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2.5">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-colors ${
                !n.read 
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                  {n.type === 'payment' && <DollarSign className="w-3.5 h-3.5 text-amber-500" />}
                  {n.type === 'contract' && <FileText className="w-3.5 h-3.5 text-emerald-600" />}
                  {n.type === 'gps' && <MapPin className="w-3.5 h-3.5 text-teal-500" />}
                  <span>{n.title}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                {n.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
