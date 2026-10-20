import React, { useState } from 'react';
import { Download, Smartphone, Check, X, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already running in standalone mode, display a quiet verified indicator or nothing
  if (isInstalled || justInstalled) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-950/40 border border-red-900/60 rounded-xl">
        <Check className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Installed on Home Screen</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-950/80 hover:bg-red-900 border border-red-800/80 hover:border-red-600 rounded-xl shadow-lg shadow-black/80 transition-all whitespace-nowrap shrink-0 cursor-pointer group"
        title="Install I See Web People PWA to your home screen"
      >
        <Smartphone className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
        <span>Install App</span>
      </button>

      {/* Guided Installation Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-[#0c0c0c] border border-red-950 p-6 shadow-2xl space-y-4 text-zinc-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/80 flex items-center justify-center text-red-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-cinema">Install "I See Web People"</h3>
                  <p className="text-xs text-zinc-400">Add to your home screen for full offline access</p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              {isIOS ? (
                <div className="rounded-xl bg-[#080808] p-4 border border-zinc-900 space-y-2.5">
                  <div className="font-semibold text-red-400 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    <span>On iPhone / iPad (Safari):</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-zinc-300">
                    <li>Tap the <strong>Share</strong> icon <Share2 className="w-3 h-3 inline mx-0.5" /> in Safari's bottom toolbar.</li>
                    <li>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3 h-3 inline mx-0.5" />.</li>
                    <li>Tap <strong>Add</strong> in the top right corner.</li>
                  </ol>
                </div>
              ) : (
                <div className="rounded-xl bg-[#080808] p-4 border border-zinc-900 space-y-2.5">
                  <div className="font-semibold text-red-400 flex items-center gap-1.5">
                    <Download className="w-4 h-4" />
                    <span>On Chrome / Edge / Android:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-zinc-300">
                    <li>Tap the <strong>Install</strong> icon in the address bar, or browser menu.</li>
                    <li>Select <strong>Install "I See Web People"</strong>.</li>
                    <li>Launch instantly from your phone app drawer or desktop.</li>
                  </ol>
                </div>
              )}

              <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300 text-xs">
                🕯️ <strong>PWA Offline Resilience:</strong> The application caches case studies, services, and séance inquiries locally, working seamlessly even when disconnected.
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setJustInstalled(true);
                  setShowGuideModal(false);
                }}
                className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white cursor-pointer"
              >
                Mark as Installed
              </button>
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-600 rounded-xl transition-colors cursor-pointer shadow-lg shadow-red-950/50"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
