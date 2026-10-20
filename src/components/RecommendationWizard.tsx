import React, { useState } from 'react';
import { WizardAnswers, RecommendationResult, PlatformType } from '../types';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle, Layers, Zap, Smartphone } from 'lucide-react';

interface RecommendationWizardProps {
  onSelectPlatform: (platform: PlatformType) => void;
}

export const RecommendationWizard: React.FC<RecommendationWizardProps> = ({
  onSelectPlatform
}) => {
  const [answers, setAnswers] = useState<WizardAnswers>({
    primaryGoal: 'agency_value',
    targetAudience: 'mixed_clients',
    teamCapacity: 'small_team',
    monetizationPreference: 'agency_retainer'
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRecommendation = (): RecommendationResult => {
    // If target audience is primarily WP users -> WordPress
    if (answers.targetAudience === 'wp_users') {
      return {
        recommendedPlatform: 'wordpress',
        secondaryPlatform: 'pwa',
        confidenceScore: 94,
        reasoning: [
          'Immediate access to 43% of the web with direct distribution via the WordPress.org repository.',
          'Zero hosting and server infrastructure costs for you—plugin runs locally on client sites using transients.',
          'Native hooks into WooCommerce and WP-Admin bar maximize daily organic engagement.'
        ],
        suggestedRoadmap: [
          { phase: 'Phase 1', timeline: 'Week 1-3', deliverable: 'Core WordPress plugin with Admin Bar radar & ghost form capture.' },
          { phase: 'Phase 2', timeline: 'Month 2', deliverable: 'Freemius / FastSpring Pro tier ($49/yr single site, $149/yr agency license).' },
          { phase: 'Phase 3', timeline: 'Month 4', deliverable: 'PWA companion portal for multi-site agencies.' }
        ]
      };
    }

    // If mobile first urgency -> Native / Hybrid
    if (answers.targetAudience === 'mobile_first') {
      return {
        recommendedPlatform: 'native',
        secondaryPlatform: 'pwa',
        confidenceScore: 91,
        reasoning: [
          'Unmatched push notification reliability (APNs / FCM) for VIP visitor alarms.',
          'iOS Dynamic Island & Live Activities provide ambient visibility without opening tabs.',
          'Highest perceived value for executive founders and high-touch closers.'
        ],
        suggestedRoadmap: [
          { phase: 'Phase 1', timeline: 'Week 1-4', deliverable: 'Capacitor/React Native wrapper around real-time radar feed.' },
          { phase: 'Phase 2', timeline: 'Month 2', deliverable: 'Dynamic Island & Lock Screen Live Activity widgets.' },
          { phase: 'Phase 3', timeline: 'Month 3', deliverable: '1-tap live chat intervention and Slack webhook routing.' }
        ]
      };
    }

    // Default: PWA is the universal agency command center
    return {
      recommendedPlatform: 'pwa',
      secondaryPlatform: 'wordpress',
      confidenceScore: 96,
      reasoning: [
        'Universal compatibility: Works across WordPress, Shopify, Webflow, and custom Jamstack via a single 1-line script tag.',
        'Zero App Store gatekeeping or 30% Apple commission—instant continuous deployment.',
        'Full offline capability for client pitches and executive audit generation on the go.',
        'Perfect fit for Shepdesign agency workflow managing multiple client brands simultaneously.'
      ],
      suggestedRoadmap: [
        { phase: 'Phase 1', timeline: 'Week 1-4', deliverable: 'PWA Command Center with multi-site switcher and offline session storage.' },
        { phase: 'Phase 2', timeline: 'Month 2', deliverable: 'Official WordPress companion plugin serving as an easy installer wedge.' },
        { phase: 'Phase 3', timeline: 'Month 4', deliverable: 'Capacitor mobile build for iOS / Android push alerts.' }
      ]
    };
  };

  const result = calculateRecommendation();

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>Strategic Decision Engine</span>
          <span aria-hidden="true">·</span>
          <span>Personalized Commercial Roadmap</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1" style={{ textWrap: 'balance' }}>
          Which Format Should You Build First?
        </h2>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Select your business model, target audience, and team capacity to calculate the highest-ROI development sequence for "I See Web People".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Questionnaire Form */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              1. What is your primary business model?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'agency_value', label: 'Agency Retainer Value (Shepdesign)' },
                { id: 'saas_revenue', label: 'Standalone SaaS Software' },
                { id: 'free_brand_building', label: 'Free Tool / Lead Magnet' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, primaryGoal: opt.id as any });
                    setHasCalculated(true);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    answers.primaryGoal === opt.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              2. What platform do your clients or target audience use?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'mixed_clients', label: 'Mixed (WordPress, Shopify, Webflow)' },
                { id: 'wp_users', label: 'Strictly WordPress & WooCommerce' },
                { id: 'mobile_first', label: 'On-the-go Executives & Closers' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, targetAudience: opt.id as any });
                    setHasCalculated(true);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    answers.targetAudience === opt.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider">
              3. What is your team's development capacity?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'solo_builder', label: 'Solo Designer / Founder' },
                { id: 'small_team', label: 'Small Core Studio Team' },
                { id: 'funded', label: 'Funded / Scaling Resources' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAnswers({ ...answers, teamCapacity: opt.id as any });
                    setHasCalculated(true);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    answers.teamCapacity === opt.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Recommendation Score: {result.confidenceScore}% Match
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {result.recommendedPlatform === 'pwa' && 'Progressive Web App (PWA Studio)'}
                {result.recommendedPlatform === 'wordpress' && 'WordPress Plugin (The WP Wedge)'}
                {result.recommendedPlatform === 'native' && 'Native Mobile App (Pocket Radar)'}
              </h3>
            </div>

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              {result.recommendedPlatform === 'pwa' && <Zap className="w-6 h-6" />}
              {result.recommendedPlatform === 'wordpress' && <Layers className="w-6 h-6" />}
              {result.recommendedPlatform === 'native' && <Smartphone className="w-6 h-6" />}
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            {result.reasoning.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300">Recommended Rollout Phasing:</div>
            <div className="space-y-2">
              {result.suggestedRoadmap.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">{item.phase}:</span>
                    <span className="text-slate-200">{item.deliverable}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono shrink-0 ml-2">{item.timeline}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onSelectPlatform(result.recommendedPlatform)}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore {result.recommendedPlatform.toUpperCase()} Prototype</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
