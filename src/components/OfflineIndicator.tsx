import React from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
  simulatedOffline: boolean;
  onToggleSimulatedOffline: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  simulatedOffline,
  onToggleSimulatedOffline
}) => {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
      {!isOnline && (
        <div className="flex items-center gap-2 rounded-xl bg-red-950/95 text-red-200 px-3.5 py-2 text-xs font-semibold shadow-2xl border border-red-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <WifiOff className="w-4 h-4 shrink-0 text-red-400" />
          <span>Offline PWA Active &mdash; Serving cached records</span>
        </div>
      )}

      {/* Evaluator offline toggle */}
      <button
        onClick={onToggleSimulatedOffline}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium border shadow-lg backdrop-blur-md transition-all cursor-pointer ${
          simulatedOffline
            ? 'bg-red-950 text-red-300 border-red-800 hover:bg-red-900'
            : 'bg-black/90 text-zinc-500 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
        }`}
        title="Toggle simulated offline mode to test PWA caching"
      >
        {simulatedOffline ? (
          <>
            <WifiOff className="w-3.5 h-3.5 text-red-400" />
            <span>Simulated Offline</span>
          </>
        ) : (
          <>
            <Wifi className="w-3.5 h-3.5 text-zinc-500" />
            <span>Test Offline</span>
          </>
        )}
      </button>
    </div>
  );
};
