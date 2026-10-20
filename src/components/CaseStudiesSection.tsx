import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/pwaStudioData';
import { ArrowRight, X, ExternalLink, ShieldCheck } from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="case-studies" className="space-y-6">
      <div className="border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
          <span>02 &middot; Case Studies</span>
          <span aria-hidden="true">&middot;</span>
          <span>shepdesign records</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-cinema tracking-wide text-white mt-1">
          Documented Work &amp; Recovered Spirits
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed font-editorial text-base">
          Proven deployments where shepdesign salvaged lost intent, eliminated digital friction, and built uncompromising web experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            className="group rounded-2xl bg-[#0a0a0a] border border-zinc-900 hover:border-red-950/80 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl shadow-black/80"
          >
            <div>
              {/* Image Preview with Dark Vignette */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-black/40" />
                <div className="absolute top-3 left-3 text-[11px] text-zinc-300 bg-black/80 px-2.5 py-1 rounded border border-zinc-800 font-mono">
                  {study.industry}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="space-y-1">
                  <div className="text-xs text-red-400 font-mono font-medium">{study.client} &middot; {study.year}</div>
                  <h3 className="text-base font-bold text-white font-cinema group-hover:text-red-300 transition-colors leading-snug">
                    {study.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 font-editorial text-sm line-clamp-3 leading-relaxed">
                  {study.summary}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-zinc-900 text-center font-mono">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx}>
                      <div className="text-xs sm:text-sm font-bold text-white tabular-nums">{m.value}</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-tighter truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedCase(study)}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900/80 hover:bg-red-950/80 border border-zinc-800 hover:border-red-900/60 text-xs font-semibold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Read Case Archive</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal Deep Dive */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0c0c0c] border border-red-950 p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-300">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
                  {selectedCase.client} &middot; {selectedCase.year}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-cinema mt-1">
                  {selectedCase.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800">
              <img
                src={selectedCase.image}
                alt={selectedCase.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#080808] border border-zinc-900 text-center font-mono">
              {selectedCase.metrics.map((m, mIdx) => (
                <div key={mIdx}>
                  <div className="text-base sm:text-lg font-bold text-red-400 tabular-nums">{m.value}</div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-tight">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed font-editorial">
              <div>
                <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider text-red-400 mb-1">
                  The Haunting / The Friction
                </h4>
                <p className="text-zinc-300 text-base">{selectedCase.challenge}</p>
              </div>

              <div>
                <h4 className="font-sans font-bold text-white text-xs uppercase tracking-wider text-red-400 mb-1">
                  The Exorcism / The Architecture
                </h4>
                <p className="text-zinc-300 text-base">{selectedCase.solution}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-zinc-400">
                <span className="text-zinc-400 uppercase">Stack:</span>
                {selectedCase.technologies.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-900 text-white font-semibold cursor-pointer shadow-lg shadow-black"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
