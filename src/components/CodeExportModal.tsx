import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, Layers, Zap } from 'lucide-react';
import { generateWordPressPluginCode, downloadWordPressPluginFile } from '../utils/wpPluginGenerator';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'wordpress' | 'pwa' | 'markdown'>('wordpress');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const wpCode = generateWordPressPluginCode({});

  const pwaManifestCode = JSON.stringify(
    {
      id: "/",
      name: "I See Web People",
      short_name: "WebPeople",
      description: "Progressive Web App for I See Web People: digital studio services, case studies, and real-time UX telemetry.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#020617",
      theme_color: "#020617",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    },
    null,
    2
  );

  const markdownSpec = `# "I See Web People" — Commercial & Technical Product Specification
Author: Ryan Shephard / Shepdesign
License: Proprietary / GPL-2.0 (WP Plugin)

## 1. Executive Summary
"I See Web People" transforms lifeless web traffic into actionable human relationships.
Through real-time telemetry, admin-bar presence indicators, and ghost form capture,
site owners and agencies can see visitors as living human beings rather than cold bounce metrics.

## 2. Platform Strategy & Phasing
- **Phase 1: WordPress Plugin** — Zero-acquisition wedge. Captures 43% of the web market.
- **Phase 2: Progressive Web App (PWA)** — Multi-tenant agency cockpit for Shepdesign clients.
- **Phase 3: Native Push Companion** — iOS Dynamic Island & APNs alerts for high-value whale buyers.

## 3. Core Tech Stack
- Frontend: React 19, TypeScript, Tailwind CSS, Vite
- Caching & Service Workers: vite-plugin-pwa, IndexedDB
- WP Plugin: PHP 8.1+, Transients API, navigator.sendBeacon
`;

  const getCurrentCode = () => {
    switch (selectedFormat) {
      case 'wordpress': return wpCode;
      case 'pwa': return pwaManifestCode;
      case 'markdown': return markdownSpec;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Export Starter Code &amp; Specifications</h3>
              <p className="text-xs text-slate-400">Production-ready boilerplate for your selected platform</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedFormat('wordpress')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
              selectedFormat === 'wordpress' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>WordPress Plugin (i-see-web-people.php)</span>
          </button>
          <button
            onClick={() => setSelectedFormat('pwa')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
              selectedFormat === 'pwa' ? 'bg-cyan-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>PWA Manifest (manifest.json)</span>
          </button>
          <button
            onClick={() => setSelectedFormat('markdown')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
              selectedFormat === 'markdown' ? 'bg-slate-700 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Architecture Spec (Markdown)</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed select-all">
          <pre>{getCurrentCode()}</pre>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-slate-900">
          <span className="text-xs text-slate-400">
            Ready to use in production or upload directly to WordPress.
          </span>

          <div className="flex items-center gap-2">
            {selectedFormat === 'wordpress' && (
              <button
                onClick={() => downloadWordPressPluginFile({})}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .php</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
