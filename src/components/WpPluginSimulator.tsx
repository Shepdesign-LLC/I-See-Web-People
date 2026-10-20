import React, { useState } from 'react';
import { Eye, Download, Shield, Sparkles, CheckCircle2, AlertCircle, Settings, ToggleLeft, ToggleRight, Code } from 'lucide-react';
import { PluginSettings } from '../types';
import { downloadWordPressPluginFile } from '../utils/wpPluginGenerator';

export const WpPluginSimulator: React.FC = () => {
  const [settings, setSettings] = useState<PluginSettings>({
    adminBarTicker: true,
    ghostFormCapture: true,
    rageClickDetection: true,
    visitorWelcomeToast: false,
    privacyStrictGdpr: true,
    anonymizeIp: true,
    alertThresholdValue: 100,
    slackWebhookUrl: ''
  });

  const [activeTab, setActiveTab] = useState<'admin_hud' | 'settings' | 'ghost_leads'>('admin_hud');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const toggleSetting = (key: keyof PluginSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDownloadPlugin = () => {
    downloadWordPressPluginFile({
      siteName: 'Shepdesign Studio',
      enableGhostForms: settings.ghostFormCapture,
      enableRageClicks: settings.rageClickDetection,
      enableAdminBar: settings.adminBarTicker
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400">
            <span>WordPress Plugin Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Official wp.org Ready Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Zero SaaS Subscriptions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            "I See Web People" WordPress Plugin
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Self-hosted, lightweight (&lt; 4KB beacon), hooks directly into WP-Admin and WooCommerce.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPlugin}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-blue-400 hover:bg-blue-300 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Starter Plugin (.php)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Successfully generated and downloaded <strong>i-see-web-people.php</strong>! You can upload it directly to any WordPress site under Plugins &rarr; Add New.</span>
        </div>
      )}

      {/* Simulated WP-Admin Environment Container */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        {/* WP-Admin Bar (Top Bar) */}
        <div className="bg-[#1d2327] border-b border-[#2c3338] px-4 py-2 flex items-center justify-between text-xs text-slate-300 font-sans">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <span className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-white">W</span>
              <span>Shepdesign</span>
            </div>

            {/* The "I See Web People" Live Admin Bar Ticker */}
            {settings.adminBarTicker && (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#2271b1] text-white font-medium text-[11px] shadow-sm animate-pulse">
                <Eye className="w-3 h-3 text-cyan-300" />
                <span>I See Web People: <strong>4 active</strong></span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Howdy, Ryan Shephard</span>
            <span className="w-5 h-5 rounded-full bg-slate-600 text-center text-[10px] text-white leading-5">R</span>
          </div>
        </div>

        {/* WP Admin Layout with Sidebar + Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
          {/* WP Sidebar Menu */}
          <div className="md:col-span-3 bg-[#1d2327] border-r border-[#2c3338] p-3 space-y-1 text-xs">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">WordPress Core</div>
            <div className="px-2 py-1.5 rounded text-slate-400 hover:text-white cursor-pointer">Dashboard</div>
            <div className="px-2 py-1.5 rounded text-slate-400 hover:text-white cursor-pointer">Posts</div>
            <div className="px-2 py-1.5 rounded text-slate-400 hover:text-white cursor-pointer">WooCommerce</div>

            <div className="pt-4 text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2 py-1">I See Web People</div>
            <button
              onClick={() => setActiveTab('admin_hud')}
              className={`w-full text-left px-2 py-1.5 rounded cursor-pointer transition-colors ${
                activeTab === 'admin_hud' ? 'bg-[#2271b1] text-white font-medium' : 'text-slate-300 hover:text-white'
              }`}
            >
              Live Human Radar
            </button>
            <button
              onClick={() => setActiveTab('ghost_leads')}
              className={`w-full text-left px-2 py-1.5 rounded cursor-pointer transition-colors ${
                activeTab === 'ghost_leads' ? 'bg-[#2271b1] text-white font-medium' : 'text-slate-300 hover:text-white'
              }`}
            >
              Ghost Form Leads (3)
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-2 py-1.5 rounded cursor-pointer transition-colors ${
                activeTab === 'settings' ? 'bg-[#2271b1] text-white font-medium' : 'text-slate-300 hover:text-white'
              }`}
            >
              Plugin Settings
            </button>
          </div>

          {/* WP Admin Content Viewport */}
          <div className="md:col-span-9 p-6 bg-[#f0f0f1] text-slate-900 overflow-y-auto">
            {activeTab === 'admin_hud' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Live Human Radar</h3>
                    <p className="text-xs text-slate-600">Active visitors on shepdesign.com right now</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    Transient Caching Active (0% CPU Impact)
                  </span>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-700">
                        <th className="py-2.5 px-3">Session Hash</th>
                        <th className="py-2.5 px-3">Current Path</th>
                        <th className="py-2.5 px-3">Behavior Event</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-slate-600">iswp_9f81a</td>
                        <td className="py-2.5 px-3 font-medium text-blue-600">/case-studies/nexus-finance</td>
                        <td className="py-2.5 px-3 text-slate-600">Scrolled to ROI metrics</td>
                        <td className="py-2.5 px-3 font-mono">3m 14s</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-slate-600">iswp_3b12c</td>
                        <td className="py-2.5 px-3 font-medium text-blue-600">/contact</td>
                        <td className="py-2.5 px-3 text-amber-700 font-medium">Ghost Form: typed email</td>
                        <td className="py-2.5 px-3 font-mono">1m 45s</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800">Hesitating</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-mono text-slate-600">iswp_77e09</td>
                        <td className="py-2.5 px-3 font-medium text-blue-600">/services/pwa</td>
                        <td className="py-2.5 px-3 text-slate-600">Hovered pricing table</td>
                        <td className="py-2.5 px-3 font-mono">52s</td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <div className="text-[11px] text-slate-500">Recovered Leads This Week</div>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">14 Inquiries</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <div className="text-[11px] text-slate-500">Rage Click Incidents</div>
                    <div className="text-lg font-bold text-slate-900 mt-0.5">0 Detected</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <div className="text-[11px] text-slate-500">Front-End Script Weight</div>
                    <div className="text-lg font-bold text-emerald-600 mt-0.5">2.8 KB (Gzipped)</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ghost_leads' && (
              <div className="space-y-4">
                <div className="border-b border-slate-300 pb-3">
                  <h3 className="text-xl font-bold text-slate-900">Ghost Form Recovery Log</h3>
                  <p className="text-xs text-slate-600">Captured contact inputs from visitors who abandoned before submitting</p>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">marcus.vance@vancemedia.co</div>
                      <div className="text-slate-500 text-[11px]">Abandoned on: /contact &middot; 42 seconds ago</div>
                    </div>
                    <button
                      onClick={() => alert('Lead email copied to clipboard!')}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                    >
                      Copy Lead
                    </button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">elena.rostova@berlin-tech.de</div>
                      <div className="text-slate-500 text-[11px]">Abandoned on: /services/pwa &middot; 3 hours ago</div>
                    </div>
                    <button
                      onClick={() => alert('Lead email copied to clipboard!')}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium"
                    >
                      Copy Lead
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <div className="border-b border-slate-300 pb-3">
                  <h3 className="text-xl font-bold text-slate-900">Plugin Configuration</h3>
                  <p className="text-xs text-slate-600">Toggle live features and privacy rules</p>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="font-bold text-slate-900">WP-Admin Bar Live Eye Radar</div>
                      <div className="text-slate-500">Show active visitor count in the top WP bar for admins.</div>
                    </div>
                    <button
                      onClick={() => toggleSetting('adminBarTicker')}
                      className={`text-lg cursor-pointer ${settings.adminBarTicker ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      {settings.adminBarTicker ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="font-bold text-slate-900">Ghost Form Lead Capture</div>
                      <div className="text-slate-500">Capture email inputs before form abandonment.</div>
                    </div>
                    <button
                      onClick={() => toggleSetting('ghostFormCapture')}
                      className={`text-lg cursor-pointer ${settings.ghostFormCapture ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      {settings.ghostFormCapture ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="font-bold text-slate-900">Rage Click &amp; Friction Telemetry</div>
                      <div className="text-slate-500">Flag when visitors rapidly click unclickable elements.</div>
                    </div>
                    <button
                      onClick={() => toggleSetting('rageClickDetection')}
                      className={`text-lg cursor-pointer ${settings.rageClickDetection ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      {settings.rageClickDetection ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Strict GDPR IP Anonymization</div>
                      <div className="text-slate-500">Hashes all IP addresses with SHA-256 before storing.</div>
                    </div>
                    <button
                      onClick={() => toggleSetting('anonymizeIp')}
                      className={`text-lg cursor-pointer ${settings.anonymizeIp ? 'text-blue-600' : 'text-slate-400'}`}
                    >
                      {settings.anonymizeIp ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
