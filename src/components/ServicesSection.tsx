import React, { useState } from 'react';
import { STUDIO_SERVICES } from '../data/pwaStudioData';
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Layers, Eye, Smartphone, Flame } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForContact
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('service-web-presence');

  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0: return <Layers className="w-5 h-5 text-red-500" />;
      case 1: return <Eye className="w-5 h-5 text-red-500" />;
      case 2: return <Smartphone className="w-5 h-5 text-red-500" />;
      case 3: return <Flame className="w-5 h-5 text-red-500" />;
      default: return <Layers className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <section id="services" className="space-y-6">
      <div className="border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
          <span>01 &middot; Capabilities</span>
          <span aria-hidden="true">&middot;</span>
          <span>shepdesign</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-cinema tracking-wide text-white mt-1">
          Crafted for Living Human Intent
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed font-editorial text-base">
          We don't build generic tech templates. We engineer dark, atmospheric Progressive Web Apps, custom digital storefronts, and ghost visitor recovery systems that reveal who walks through your digital doors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {STUDIO_SERVICES.map((srv, idx) => {
          const isExpanded = expandedId === srv.id;

          return (
            <div
              key={srv.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isExpanded
                  ? 'bg-[#0e0c0c] border-red-900/80 shadow-2xl shadow-red-950/20'
                  : 'bg-[#0a0a0a] border-zinc-900 hover:border-zinc-800'
              } p-6 flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/60 flex items-center justify-center">
                      {getServiceIcon(idx)}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">{srv.number}.</span>
                      <h3 className="text-lg font-bold text-white font-cinema tracking-wide">{srv.title}</h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {srv.timeline}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-editorial text-sm">
                  {srv.description}
                </p>

                {isExpanded && (
                  <div className="pt-3 border-t border-zinc-900/80 space-y-3 animate-in fade-in duration-200">
                    <div className="text-[11px] font-mono uppercase text-red-400 tracking-wider">
                      Artifacts &amp; Deliverables
                    </div>
                    <ul className="space-y-2">
                      {srv.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-900/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-zinc-500 block">Investment</span>
                  <span className="text-xs sm:text-sm font-semibold text-white font-mono">{srv.priceModel}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer text-xs flex items-center gap-1"
                    aria-label="Toggle details"
                  >
                    <span className="text-[11px] font-mono">{isExpanded ? 'Collapse' : 'Details'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {onSelectServiceForContact && (
                    <button
                      onClick={() => onSelectServiceForContact(srv.title)}
                      className="px-3 py-1.5 rounded-lg bg-red-950 hover:bg-red-900 border border-red-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-black cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight className="w-3 h-3 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
