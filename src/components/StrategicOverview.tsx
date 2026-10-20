import React from 'react';
import { Eye, Layers, Smartphone, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { PLATFORM_CONCEPTS, COMPARISON_CRITERIA, STRATEGIC_RECOMMENDATION_FLOW, BRAND_STORY } from '../data/conceptsData';

interface StrategicOverviewProps {
  onSelectSimulator: (platform: 'wordpress' | 'pwa' | 'native') => void;
  onLaunchWizard: () => void;
}

export const StrategicOverview: React.FC<StrategicOverviewProps> = ({
  onSelectSimulator,
  onLaunchWizard
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <span>Brand Strategy & Architecture Studio</span>
            <span aria-hidden="true">·</span>
            <span>Created for Ryan @ Shepdesign</span>
            <span aria-hidden="true">·</span>
            <span>Comprehensive Product Matrix</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
            What makes a winning Native App, PWA, or WordPress Plugin for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">"I See Web People"</span>?
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The brand name <span className="text-white font-medium">"I See Web People"</span> is an unforgettable, high-concept homage to <em>The Sixth Sense</em>: moving past cold, lifeless analytics to reveal the <strong className="text-cyan-300">living human beings</strong> on your website in real time.
          </p>

          <p className="text-sm text-slate-400 leading-relaxed">
            Depending on your delivery vehicle, the brand transforms: as a <strong className="text-white">WordPress Plugin</strong> it becomes an essential ghost-cart & admin radar; as a <strong className="text-white">PWA</strong> it becomes a multi-site agency command center; and as a <strong className="text-white">Native App</strong> it becomes a pocket VIP alarm that rings when whales land on your pricing page.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onLaunchWizard}
              className="px-4 py-2 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Interactive Decision Wizard</span>
            </button>
            <span className="text-xs text-slate-400">or test the working prototypes below</span>
          </div>
        </div>
      </section>

      {/* The 3 Core Platform Concepts */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">The Three Product Blueprints</h2>
          <p className="text-sm text-slate-400 mt-1">
            Compare how "I See Web People" functions across the three form factors, and launch the interactive simulator for each.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* WordPress Plugin Card */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Layers className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Fastest Distribution Wedge</div>
                <h3 className="text-xl font-bold text-white mt-1">WordPress Plugin</h3>
                <p className="text-xs text-slate-400 mt-0.5">Live Visitor Radar & Ghost Form Recovery</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Plugs directly into WP-Admin. Adds a live eye counter to the top admin bar showing active people, hooks into WooCommerce carts, and catches abandoned form inputs before submit.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Market reach:</strong> 43% of the internet directly via WP.org repo</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero server bill:</strong> Self-hosted transients or local SQLite</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Monetization:</strong> $49/yr single site · $149/yr agency unlimited</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => onSelectSimulator('wordpress')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open WordPress Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* PWA Card */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Universal Cross-Platform SaaS</div>
                <h3 className="text-xl font-bold text-white mt-1">Progressive Web App (PWA)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Multi-Site Agency Command Cockpit</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Zero app store fees (0% Apple tax). One dashboard monitoring 5 to 50 client websites simultaneously across WordPress, Shopify, Webflow, and custom code with offline audit generation.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Universal:</strong> Works on any website via 1-line script tag</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Desktop + Mobile:</strong> Installs instantly to Mac, Windows, iPhone</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Monetization:</strong> $29/mo starter · $79/mo agency retainer</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => onSelectSimulator('pwa')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open PWA Studio Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Native App Card */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Smartphone className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Peak Urgency & VIP Triage</div>
                <h3 className="text-xl font-bold text-white mt-1">Native Mobile App</h3>
                <p className="text-xs text-slate-400 mt-0.5">Push Radar, Dynamic Island & Lead Closer</p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Lives in your pocket. Sends instant audible chimes when an enterprise buyer is dwelling on pricing or when a checkout error triggers rage clicks. Swipe directly to call or ping Slack.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Real-time push:</strong> APNs & Dynamic Island Live Activities</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Biometric security:</strong> FaceID protection for lead contact info</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Monetization:</strong> Value-add companion for Agency/Enterprise tiers</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                onClick={() => onSelectSimulator('native')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Mobile Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-white">Side-by-Side Comparison Matrix</h2>
        <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  <th className="py-3 px-4">Evaluation Dimension</th>
                  <th className="py-3 px-4 text-blue-400">WordPress Plugin</th>
                  <th className="py-3 px-4 text-cyan-400">Progressive Web App (PWA)</th>
                  <th className="py-3 px-4 text-indigo-400">Native Mobile App</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                {COMPARISON_CRITERIA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{row.criterion}</td>
                    <td className="py-3 px-4">{row.wordpress}</td>
                    <td className="py-3 px-4">{row.pwa}</td>
                    <td className="py-3 px-4">{row.native}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The Strategic Phased Roadmap */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">The Recommended Rollout Sequence</h2>
          <p className="text-sm text-slate-400 mt-1">
            Why you shouldn't pick just one in isolation: here is how all three work synergistically as a complete commercial strategy.
          </p>
        </div>

        <div className="space-y-4">
          {STRATEGIC_RECOMMENDATION_FLOW.suggestedSequence.map((step, idx) => (
            <div key={idx} className="rounded-xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">{step.step}</h3>
                  <span className="text-xs text-slate-400 font-mono">({step.timing})</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{step.why}</p>
                <div className="text-xs text-cyan-300 font-medium pt-1">
                  Core Deliverable: <span className="text-slate-200">{step.deliverable}</span>
                </div>
              </div>

              <div className="shrink-0 self-end md:self-center">
                {idx === 0 && (
                  <button
                    onClick={() => onSelectSimulator('wordpress')}
                    className="py-1.5 px-3 text-xs font-semibold text-slate-950 bg-blue-400 hover:bg-blue-300 rounded-md transition-colors cursor-pointer"
                  >
                    View WP Prototype
                  </button>
                )}
                {idx === 1 && (
                  <button
                    onClick={() => onSelectSimulator('pwa')}
                    className="py-1.5 px-3 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors cursor-pointer"
                  >
                    View PWA Prototype
                  </button>
                )}
                {idx === 2 && (
                  <button
                    onClick={() => onSelectSimulator('native')}
                    className="py-1.5 px-3 text-xs font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-md transition-colors cursor-pointer"
                  >
                    View Mobile Prototype
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand & Positioning Manifesto */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <span>Brand Manifesto & Positioning: "I See Web People"</span>
        </h3>
        <blockquote className="border-l-2 border-cyan-500 pl-4 py-1 text-slate-300 italic text-sm">
          "{BRAND_STORY.originStory}"
        </blockquote>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {BRAND_STORY.coreValues.map((val, i) => (
            <div key={i} className="rounded-lg bg-slate-950/60 border border-slate-800/80 p-4 space-y-1">
              <h4 className="text-sm font-semibold text-white">{val.title}</h4>
              <p className="text-xs text-slate-400">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
