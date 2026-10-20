import React, { useState } from 'react';
import { Smartphone, Bell, Eye, Shield, Phone, MessageSquare, AlertTriangle, Check, ArrowRight, Zap } from 'lucide-react';

export const NativeAppSimulator: React.FC = () => {
  const [activeNotification, setActiveNotification] = useState<number | null>(0);
  const [intervenedLead, setIntervenedLead] = useState<string | null>(null);

  const notifications = [
    {
      id: 0,
      title: 'Whale Lead On-Site (Techstars IP)',
      body: 'Visitor from Seattle on /work/brand-identity-system for 3m 45s.',
      time: 'Just now',
      urgency: 'high',
      site: 'shepdesign.com'
    },
    {
      id: 1,
      title: 'Rage Clicks Detected',
      body: '5 rapid clicks on [Submit RFQ] from Munich buyer ($4,800 RFQ).',
      time: '2m ago',
      urgency: 'critical',
      site: 'apex-equip.io'
    },
    {
      id: 2,
      title: 'High-Value Cart Waiting ($142.50)',
      body: 'Austin buyer hesitating on Shipping Step for 1m 20s.',
      time: '5m ago',
      urgency: 'medium',
      site: 'velvetroast.shop'
    }
  ];

  const handleIntervene = (action: string) => {
    setIntervenedLead(action);
    setTimeout(() => setIntervenedLead(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
            <span>Native Mobile App Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>iOS Dynamic Island &amp; APNs Push Radar</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Second Triage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            "I See Web People" Pocket Radar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Designed for founders and high-touch closers who want audible push alerts when high-value buyers land on their web properties.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            iOS 18 &middot; Dynamic Island
          </span>
        </div>
      </div>

      {intervenedLead && (
        <div className="p-3 rounded-lg bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Action triggered: <strong>{intervenedLead}</strong> sent directly to visitor's active session!</span>
        </div>
      )}

      {/* Interactive Mobile Device Frame */}
      <div className="flex justify-center py-4">
        <div className="w-[340px] sm:w-[380px] rounded-[44px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl p-4 space-y-4 relative overflow-hidden">
          {/* iOS Dynamic Island */}
          <div className="w-28 h-6 bg-black rounded-full mx-auto flex items-center justify-between px-2.5 text-[9px] text-white">
            <div className="flex items-center gap-1 text-cyan-400">
              <Eye className="w-2.5 h-2.5" />
              <span>4 live</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>

          {/* Phone Top Status */}
          <div className="flex justify-between items-center px-2 text-[11px] text-slate-400 font-mono">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>

          {/* App Header inside phone */}
          <div className="px-2 pt-1 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Web People Radar</div>
              <div className="text-base font-bold text-white">Live Push Feed</div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 text-xs">
              <Bell className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Push Notification Cards */}
          <div className="space-y-2.5 px-1">
            {notifications.map((n) => {
              const isActive = activeNotification === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setActiveNotification(n.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500/60 shadow-md shadow-indigo-950/40'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-mono text-indigo-400">{n.site}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{n.time}</span>
                  </div>
                  <div className="text-xs font-bold text-white mt-1">{n.title}</div>
                  <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{n.body}</div>

                  {isActive && (
                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIntervene('Personalized Live Chat greeting');
                        }}
                        className="flex-1 py-1 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chat Invite</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIntervene('Slack Emergency Ping');
                        }}
                        className="py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-medium cursor-pointer"
                      >
                        Slack Team
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Metrics Bar at bottom of phone */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-around text-center">
            <div>
              <div className="text-xs font-bold text-white font-mono">18</div>
              <div className="text-[9px] text-slate-400">Total Today</div>
            </div>
            <div className="h-6 w-[1px] bg-slate-800" />
            <div>
              <div className="text-xs font-bold text-emerald-400 font-mono">$6.2k</div>
              <div className="text-[9px] text-slate-400">Whale Pipeline</div>
            </div>
            <div className="h-6 w-[1px] bg-slate-800" />
            <div>
              <div className="text-xs font-bold text-cyan-400 font-mono">&lt; 1s</div>
              <div className="text-[9px] text-slate-400">Push Latency</div>
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
        </div>
      </div>
    </div>
  );
};
