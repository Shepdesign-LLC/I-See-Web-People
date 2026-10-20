import React, { useState, useEffect } from 'react';
import { INITIAL_MANAGED_SITES, INITIAL_VISITOR_SESSIONS } from '../data/sampleSessions';
import { VisitorSession, ManagedSite } from '../types';
import { Eye, Ghost, Sparkles, FileText, Download, Check, Compass, AlertTriangle } from 'lucide-react';

export const PwaSimulator: React.FC = () => {
  const [sites, setSites] = useState<ManagedSite[]>(INITIAL_MANAGED_SITES);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('site-1');
  const [sessions, setSessions] = useState<VisitorSession[]>(INITIAL_VISITOR_SESSIONS);
  const [selectedSession, setSelectedSession] = useState<VisitorSession | null>(INITIAL_VISITOR_SESSIONS[0]);
  const [auditGenerated, setAuditGenerated] = useState(false);

  // Periodic simulated visitor pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setSessions((prev) =>
        prev.map((s) => ({
          ...s,
          durationSeconds: s.durationSeconds + 2
        }))
      );
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const activeSite = sites.find((s) => s.id === selectedSiteId) || sites[0];
  const filteredSessions = sessions.filter((s) => s.siteId === selectedSiteId);

  const simulateNewVisitor = () => {
    const newSession: VisitorSession = {
      id: 'sess-' + Math.floor(Math.random() * 9000 + 1000),
      siteId: selectedSiteId,
      siteName: activeSite.name,
      visitorLabel: 'Living Soul Manifested',
      city: 'San Francisco, CA',
      country: 'United States',
      flag: '🇺🇸',
      device: 'desktop',
      browser: 'Chrome 122',
      currentPath: '/services/pwa-development',
      durationSeconds: 12,
      status: 'active',
      lastAction: 'Observing offline Progressive Web App capabilities',
      timeAgo: 'Just now'
    };
    setSessions([newSession, ...sessions]);
    setSelectedSession(newSession);
  };

  return (
    <div className="space-y-6">
      {/* Top Header of the Spirit Radar */}
      <div className="rounded-3xl gothic-card-gold p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 font-mono">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>Shepdesign Spirit Radar</span>
            <span aria-hidden="true">&middot;</span>
            <span>Real-time Presence Telemetry</span>
            <span aria-hidden="true">&middot;</span>
            <span className="text-cyan-400">PWA Native</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-gothic">
            The Living Soul Telemetry Deck
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-serif-gothic text-sm">
            Monitors living visitors across Shepdesign client properties. Detects wandering souls and captures ghost carts before they dissolve into the void.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateNewVisitor}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summon Live Visitor</span>
          </button>
        </div>
      </div>

      {/* Client Sites Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sites.map((site) => {
          const isSelected = site.id === selectedSiteId;
          return (
            <button
              key={site.id}
              onClick={() => {
                setSelectedSiteId(site.id);
                const first = sessions.find((s) => s.siteId === site.id);
                if (first) setSelectedSession(first);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/40 border-amber-500/70 shadow-lg shadow-amber-950/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-amber-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-400/90 uppercase">{site.platform}</span>
                <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
                  {site.activeVisitors} souls
                </span>
              </div>
              <div className="font-bold text-white text-xs mt-1 truncate font-serif-gothic text-sm">{site.name}</div>
              <div className="text-[11px] text-slate-400 truncate font-mono">{site.domain}</div>
            </button>
          );
        })}
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Active Humans Table */}
        <div className="lg:col-span-7 rounded-3xl gothic-card border border-amber-900/40 overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-900/40 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white font-gothic">
                Living Souls on {activeSite.name} ({filteredSessions.length})
              </h3>
            </div>
            <span className="text-xs text-amber-400/90 font-mono">Real-time Presence</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 font-serif-gothic text-base">
                No active human presences right now on this domain. Click "Summon Live Visitor" above to test telemetry.
              </div>
            ) : (
              filteredSessions.map((sess) => {
                const isSelected = selectedSession?.id === sess.id;
                return (
                  <div
                    key={sess.id}
                    onClick={() => setSelectedSession(sess)}
                    className={`p-4 transition-colors cursor-pointer flex items-center justify-between ${
                      isSelected ? 'bg-amber-950/30 border-l-2 border-amber-400' : 'hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white font-serif-gothic text-sm">{sess.visitorLabel}</span>
                        <span className="text-xs text-slate-400 font-mono">{sess.flag} {sess.city}</span>
                      </div>
                      <div className="text-xs font-mono text-cyan-300 truncate max-w-xs">
                        {sess.currentPath}
                      </div>
                      <div className="text-[11px] text-slate-400 font-serif-gothic">
                        {sess.lastAction}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-xs font-mono font-medium text-amber-300 tabular-nums">
                        {Math.floor(sess.durationSeconds / 60)}m {sess.durationSeconds % 60}s
                      </div>
                      {sess.status === 'rage_clicking' && (
                        <span className="text-[10px] font-semibold text-rose-300 bg-rose-950 border border-rose-800 px-2 py-0.5 rounded-full">
                          Rage Clicks ({sess.rageClicksCount})
                        </span>
                      )}
                      {sess.status === 'ghost_form' && (
                        <span className="text-[10px] font-semibold text-amber-300 bg-amber-950 border border-amber-800 px-2 py-0.5 rounded-full">
                          Ghost Lead Captured
                        </span>
                      )}
                      {sess.status === 'active' && (
                        <span className="text-[10px] text-cyan-400 font-mono">
                          Wandering
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Inspection / Replay Panel & Client Audit */}
        <div className="lg:col-span-5 space-y-4">
          {selectedSession ? (
            <div className="rounded-3xl gothic-card-gold p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-gothic">
                    Soul Observation: {selectedSession.id}
                  </h4>
                </div>
                <span className="text-xs font-mono text-slate-400">{selectedSession.timeAgo}</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Earthly Origin:</span>
                  <span className="font-medium text-white">{selectedSession.flag} {selectedSession.city}, {selectedSession.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Device Vessel:</span>
                  <span className="font-mono text-slate-200">{selectedSession.device} / {selectedSession.browser}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Haunted Route:</span>
                  <span className="font-mono text-cyan-300">{selectedSession.currentPath}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dwell Duration:</span>
                  <span className="font-mono tabular-nums text-amber-400">{selectedSession.durationSeconds}s</span>
                </div>

                {selectedSession.ghostValuePreview && (
                  <div className="rounded-xl bg-amber-950/40 border border-amber-600/50 p-3 space-y-1">
                    <div className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5 font-gothic">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ghost Form Input Captured Before Vanishing:</span>
                    </div>
                    <div className="font-mono text-white text-xs select-all">
                      {selectedSession.ghostValuePreview}
                    </div>
                  </div>
                )}

                {selectedSession.rageClicksCount && (
                  <div className="rounded-xl bg-rose-950/40 border border-rose-800/60 p-3 space-y-1">
                    <div className="text-[11px] font-bold text-rose-300 flex items-center gap-1.5 font-gothic">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Rage Click Friction Hotspot:</span>
                    </div>
                    <div className="text-xs text-slate-200 font-serif-gothic text-sm">
                      5 rapid frustrated clicks registered on checkout submit within 1.2s.
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-amber-900/40 space-y-2">
                <button
                  onClick={() => setAuditGenerated(true)}
                  className="w-full py-2.5 px-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Séance Client Audit Report</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl gothic-card p-6 text-center text-xs text-slate-400 font-serif-gothic text-base">
              Select a wandering soul on the left to inspect real-time telemetry.
            </div>
          )}

          {/* Agency Audit Card Modal / Dropdown */}
          {auditGenerated && (
            <div className="rounded-3xl bg-[#090b11] border-2 border-amber-500/60 p-5 space-y-3 animate-in fade-in duration-150 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-amber-400 font-gothic">Séance Retainer Report Ratified</div>
                <button
                  onClick={() => setAuditGenerated(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Dismiss
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-amber-900/40">
                  <div className="font-semibold text-white font-gothic text-sm">Client Domain: {activeSite.name}</div>
                  <div className="text-[11px] text-slate-300 mt-1 font-serif-gothic text-sm space-y-1">
                    <div>&bull; <strong>Saved Ghost Inquiries:</strong> {activeSite.ghostFormsSavedToday} high-intent souls retrieved.</div>
                    <div>&bull; <strong>Friction Hotspot:</strong> {activeSite.lastRageClick || 'None detected'}.</div>
                    <div>&bull; <strong>Estimated Recoverable Pipeline:</strong> $3,400 &ndash; $8,200 Sovereigns.</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Séance audit report downloaded for ${activeSite.name}!`)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-amber-950 hover:bg-amber-900 border border-amber-700 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download Ratified Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
