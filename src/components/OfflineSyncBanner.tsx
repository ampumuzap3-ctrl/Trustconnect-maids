import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OfflineSyncBannerProps {
  isOffline: boolean;
  onSyncNow: () => void;
  queuedCount: number;
}

export const OfflineSyncBanner: React.FC<OfflineSyncBannerProps> = ({
  isOffline,
  onSyncNow,
  queuedCount,
}) => {
  if (!isOffline && queuedCount === 0) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold shadow-xs flex items-center justify-between">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 animate-pulse" />
        <span>
          {isOffline 
            ? 'Offline Mode Active (Remote Uganda Area): Candidates & contracts are cached offline.' 
            : 'Connection Restored: Ready to synchronize local changes.'}
        </span>
        {queuedCount > 0 && (
          <span className="px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 text-[10px] font-bold">
            {queuedCount} Queued Actions
          </span>
        )}
      </div>

      <button
        onClick={onSyncNow}
        className="flex items-center gap-1 px-2 py-1 rounded bg-slate-950 text-white hover:bg-slate-800 text-[11px] font-bold cursor-pointer transition-colors"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Sync Cloud Backup</span>
      </button>
    </div>
  );
};
