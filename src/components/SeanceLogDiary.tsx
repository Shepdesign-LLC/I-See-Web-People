import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Feather, CheckCircle, Ghost, Eye, Calendar, ArrowRight, X, Plus, Sparkles, Radio } from 'lucide-react';
import { SpiritRadar } from './SpiritRadar';

export interface SeanceSpiritEntry {
  id: string;
  spiritNumber: string;
  codename: string;
  humanName: string;
  emailWhisper: string;
  dateRecovered: string;
  riteRequested: string;
  offeringTier: string;
  spiritStatus: 'manifested' | 'ghost_recovered' | 'reclaimed_soul';
  inkNote: string;
  pageHaunted: string;
  dwellDuration: string;
}

export const INITIAL_SPIRITS: SeanceSpiritEntry[] = [
  {
    id: 'spirit-1',
    spiritNumber: 'No. 104',
    codename: 'The Spectral Financier',
    humanName: 'Marcus Vance',
    emailWhisper: 'marcus.vance@vancemedia.co',
    dateRecovered: 'October 12th · Midnight',
    riteRequested: 'High-Conversion Web Systems & Jamstack',
    offeringTier: '$10,000 – $25,000',
    spiritStatus: 'ghost_recovered',
    inkNote: 'Subject lingered upon our Contact grimoire for nearly 4 minutes before hesitating at the threshold. Our spirit beacon caught their coordinates into the ledger moments before total abandonment.',
    pageHaunted: '/services/web-systems',
    dwellDuration: '3m 48s'
  },
  {
    id: 'spirit-2',
    spiritNumber: 'No. 105',
    codename: 'The Roaster of Antiquity',
    humanName: 'Elena Rostova',
    emailWhisper: 'elena@equinoxcoffee.com',
    dateRecovered: 'October 15th · 3:15 AM',
    riteRequested: 'Ghost Lead Recovery & Web App',
    offeringTier: '$5,000 – $10,000',
    spiritStatus: 'manifested',
    inkNote: 'A clear manifestation. Elena sought an installable PWA for single-origin subscription orders with offline cart resilience. All spectral requirements documented and sealed.',
    pageHaunted: '/case-studies/equinox-roasters',
    dwellDuration: '5m 12s'
  },
  {
    id: 'spirit-3',
    spiritNumber: 'No. 106',
    codename: 'The Brutalist Atelier',
    humanName: 'Julian Thorne',
    emailWhisper: 'j.thorne@mesadesign.eu',
    dateRecovered: 'October 17th · Twilight',
    riteRequested: 'Installable PWA & Offline Monograph',
    offeringTier: '$25,000+',
    spiritStatus: 'reclaimed_soul',
    inkNote: 'Discovered repeatedly rage-clicking on high-resolution architectural plates. We exorcised the layout shift and converted Julian into an active retainer client.',
    pageHaunted: '/work/architectural-pavilion',
    dwellDuration: '8m 20s'
  },
  {
    id: 'spirit-4',
    spiritNumber: 'No. 107',
    codename: 'The Wandering Merchant',
    humanName: 'Sarah Sterling',
    emailWhisper: 'sterling.goods@mercantile.io',
    dateRecovered: 'October 19th · Dusk',
    riteRequested: 'Custom WordPress Plugins & Headless Core',
    offeringTier: '$5,000 – $10,000',
    spiritStatus: 'ghost_recovered',
    inkNote: 'Typed phone and email into our checkout inquiry before leaving. Recovered by shepdesign and summoned back into the circle with a tailored response.',
    pageHaunted: '/checkout/inquiry',
    dwellDuration: '2m 14s'
  }
];

export const SeanceLogDiary: React.FC = () => {
  const [spirits, setSpirits] = useState<SeanceSpiritEntry[]>(INITIAL_SPIRITS);
  const [selectedSpirit, setSelectedSpirit] = useState<SeanceSpiritEntry>(INITIAL_SPIRITS[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'radar' | 'diary'>('radar');
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState<boolean>(false);
  const [dispatchSuccessMessage, setDispatchSuccessMessage] = useState<string | null>(null);

  // New spirit form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRite, setNewRite] = useState('High-Conversion Web Systems & Jamstack');
  const [newOffering, setNewOffering] = useState('$5,000 – $10,000');
  const [newNote, setNewNote] = useState('');

  // Load queued inquiries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('iswp_queued_inquiries');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: SeanceSpiritEntry[] = parsed.map((inq: any, idx: number) => ({
            id: inq.id || `spirit-custom-${idx}`,
            spiritNumber: `No. ${200 + idx}`,
            codename: `The Manifested Soul (${inq.name})`,
            humanName: inq.name,
            emailWhisper: inq.email,
            dateRecovered: inq.timestamp || 'Recorded recently',
            riteRequested: inq.service || 'Bespoke Web Systems',
            offeringTier: inq.budget || '$5k - $10k',
            spiritStatus: 'manifested',
            inkNote: inq.message || 'Direct inquiry transmitted through the shepdesign spirit veil.',
            pageHaunted: '/contact',
            dwellDuration: '1m 30s'
          }));

          setSpirits(prev => {
            const ids = new Set(prev.map(p => p.id));
            const fresh = formatted.filter(f => !ids.has(f.id));
            return [...fresh, ...prev];
          });
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const handleAddManualSpirit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newSpirit: SeanceSpiritEntry = {
      id: 'spirit-' + Date.now(),
      spiritNumber: `No. ${Math.floor(Math.random() * 800 + 110)}`,
      codename: `The Newly Summoned (${newName})`,
      humanName: newName.trim(),
      emailWhisper: newEmail.trim(),
      dateRecovered: 'Recorded Today · In Séance',
      riteRequested: newRite,
      offeringTier: newOffering,
      spiritStatus: 'manifested',
      inkNote: newNote.trim() || 'A living patron seeks counsel on digital presence and visitor telemetry.',
      pageHaunted: '/seance-log',
      dwellDuration: 'Just recorded'
    };

    setSpirits([newSpirit, ...spirits]);
    setSelectedSpirit(newSpirit);
    setIsNewEntryModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewNote('');
    setDispatchSuccessMessage(`Spirit ${newSpirit.spiritNumber} inscribed into the ledger.`);
    setTimeout(() => setDispatchSuccessMessage(null), 4000);
  };

  const handleDispatchReply = () => {
    setDispatchSuccessMessage(`Summoning response sealed and dispatched to ${selectedSpirit.emailWhisper}`);
    setTimeout(() => setDispatchSuccessMessage(null), 4000);
  };

  const handleRadarSelectSpirit = (spirit: SeanceSpiritEntry) => {
    setSelectedSpirit(spirit);
    // Smooth scroll down to ledger entry or toggle view
  };

  const filteredSpirits = spirits.filter(s => {
    const matchesStatus = filterStatus === 'all' || s.spiritStatus === filterStatus;
    const matchesSearch =
      s.humanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.emailWhisper.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.inkNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <section id="seance-log" className="space-y-6">
      {/* Section Header */}
      <div className="border-b border-zinc-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            <span>03 &middot; The Séance Log &amp; Radar</span>
            <span aria-hidden="true">&middot;</span>
            <span>shepdesign records</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cinema tracking-wide text-white mt-1">
            Past Inquiries &amp; Recovered Spirits
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed font-editorial text-base">
            "They don't know they're lost. They just wander away." 
            Simulate live spectral radar scans over visitor paths, or browse the field ledger of inquiries salvaged by shepdesign.
          </p>
        </div>

        {/* View Switcher: Radar vs Ledger + Inscribe Button */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black border border-zinc-900 text-xs font-mono">
            <button
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-red-950 text-red-200 font-bold border border-red-900 shadow-md shadow-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-red-500" />
              <span>Spirit Radar</span>
            </button>
            <button
              onClick={() => setViewMode('diary')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'diary'
                  ? 'bg-red-950 text-red-200 font-bold border border-red-900 shadow-md shadow-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              <span>Diary Ledger</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewEntryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-red-950 hover:bg-red-900 border border-red-900/80 shadow-lg shadow-black transition-all cursor-pointer font-cinema tracking-wider"
          >
            <Feather className="w-3.5 h-3.5 text-red-400" />
            <span>Inscribe Entry</span>
          </button>
        </div>
      </div>

      {/* Dispatch Notification Banner */}
      {dispatchSuccessMessage && (
        <div className="rounded-xl p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
          <span>{dispatchSuccessMessage}</span>
        </div>
      )}

      {/* VIEW 1: SPIRIT RADAR (GRID SCAN WITH GHOSTLY PATHS & RED PULSE EFFECTS) */}
      {viewMode === 'radar' ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          <SpiritRadar
            onSelectSpirit={(spirit) => {
              setSelectedSpirit(spirit);
              setViewMode('diary');
            }}
            externalSpirits={spirits}
          />
        </div>
      ) : (
        /* VIEW 2: VINTAGE DIARY FIELD JOURNAL */
        <div className="rounded-2xl border border-red-950/70 bg-[#090909] p-4 sm:p-6 shadow-2xl relative overflow-hidden animate-in fade-in duration-200">
          {/* Subtle red corner markers */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-red-700/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-red-700/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-red-700/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-red-700/50 pointer-events-none" />

          {/* Filter & Search Ribbon */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-5 border-b border-zinc-900">
            {/* Segmented Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black border border-zinc-900 text-xs w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-mono text-[11px] ${
                  filterStatus === 'all'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Spirits ({spirits.length})
              </button>
              <button
                onClick={() => setFilterStatus('ghost_recovered')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-mono text-[11px] ${
                  filterStatus === 'ghost_recovered'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Ghost Recoveries
              </button>
              <button
                onClick={() => setFilterStatus('manifested')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-mono text-[11px] ${
                  filterStatus === 'manifested'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Manifested
              </button>
              <button
                onClick={() => setFilterStatus('reclaimed_soul')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-mono text-[11px] ${
                  filterStatus === 'reclaimed_soul'
                    ? 'bg-red-950 text-red-200 font-bold border border-red-900'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Reclaimed Clients
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spirits or notes..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black border border-zinc-900 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-900 transition-colors font-mono"
              />
            </div>
          </div>

          {/* 2-Column Ledger Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-start">
            {/* Left Column: Spirit Index */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold flex items-center justify-between pb-1">
                <span>Spirits Index</span>
                <span>shepdesign ledger</span>
              </div>

              <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                {filteredSpirits.length === 0 ? (
                  <div className="p-8 text-center text-xs text-zinc-600 font-editorial text-base">
                    No wandering spirits match this search.
                  </div>
                ) : (
                  filteredSpirits.map((spirit) => {
                    const isSelected = selectedSpirit.id === spirit.id;
                    return (
                      <div
                        key={spirit.id}
                        onClick={() => setSelectedSpirit(spirit)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? 'bg-red-950/40 border-red-900 shadow-lg shadow-black'
                            : 'bg-[#060606] border-zinc-900 hover:border-zinc-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[10px] font-mono font-bold text-red-400">{spirit.spiritNumber}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase">
                            {spirit.spiritStatus.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="font-bold text-white text-sm mt-1 font-cinema tracking-wide">
                          {spirit.codename}
                        </div>

                        <div className="text-[11px] text-zinc-400 font-mono truncate mt-0.5">
                          {spirit.emailWhisper}
                        </div>

                        <div className="mt-2 pt-2 border-t border-zinc-900/80 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                          <span className="truncate max-w-[160px]">{spirit.riteRequested}</span>
                          <span className="text-red-400 tabular-nums">{spirit.dwellDuration}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: The Vintage Diary Entry Sheet */}
            <div className="lg:col-span-7 rounded-xl bg-[#0e0c0c] border border-red-950/80 p-5 sm:p-7 shadow-2xl relative">
              <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-red-500 font-bold">
                    Séance Entry &middot; {selectedSpirit.spiritNumber}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinema tracking-wide text-white mt-1">
                    {selectedSpirit.codename}
                  </h3>
                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                    Identity: {selectedSpirit.humanName} ({selectedSpirit.emailWhisper})
                  </div>
                </div>

                {/* Red Wax Seal */}
                <div className="red-seal shrink-0 shadow-lg">
                  <span className="text-[9px] font-cinema font-bold text-center leading-tight">
                    SHEP<br />SEAL
                  </span>
                </div>
              </div>

              {/* Inscribed Observation Body */}
              <div className="py-5 space-y-4">
                <div className="text-[11px] uppercase font-mono tracking-widest text-zinc-400 font-bold">
                  Field Observation Notes:
                </div>

                <div className="font-typewriter text-xs sm:text-sm leading-relaxed text-zinc-200 p-4 rounded-xl bg-[#050505] border border-zinc-900/90 shadow-inner">
                  "{selectedSpirit.inkNote}"
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-900 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Requested Rites:</span>
                    <span className="font-semibold text-white">{selectedSpirit.riteRequested}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Estimated Offering:</span>
                    <span className="font-mono font-bold text-red-400">{selectedSpirit.offeringTier}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Haunted Route:</span>
                    <span className="font-mono text-zinc-300">{selectedSpirit.pageHaunted}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">Recorded:</span>
                    <span className="text-zinc-300">{selectedSpirit.dateRecovered}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setViewMode('radar')}
                  className="px-3 py-1.5 rounded-lg border border-red-950 bg-black text-red-400 hover:text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer hover:border-red-800 transition-all"
                >
                  <Radio className="w-3.5 h-3.5 text-red-500" />
                  <span>Locate on Spirit Radar</span>
                </button>

                <button
                  onClick={handleDispatchReply}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-950 hover:bg-red-900 border border-red-900 transition-colors flex items-center gap-2 shadow-lg shadow-black cursor-pointer font-cinema tracking-wider"
                >
                  <Feather className="w-3.5 h-3.5 text-red-400" />
                  <span>Summon &amp; Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inscribe Entry Modal */}
      {isNewEntryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c0c0c] border border-red-950 p-6 shadow-2xl space-y-4 text-zinc-300">
            <div className="flex items-start justify-between border-b border-zinc-900 pb-3">
              <div>
                <h3 className="text-lg font-bold font-cinema text-white">Inscribe a New Spirit</h3>
                <p className="text-xs text-zinc-400">Record a wandering inquiry directly into the shepdesign ledger</p>
              </div>
              <button
                onClick={() => setIsNewEntryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualSpirit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-mono text-[11px] text-zinc-300 uppercase">Patron / Spirit Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-900 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] text-zinc-300 uppercase">Email Coordinates *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="marcus@vance.co"
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-sm text-white focus:outline-none focus:border-red-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-zinc-300 uppercase">Requested Craft</label>
                  <select
                    value={newRite}
                    onChange={(e) => setNewRite(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-900 font-mono"
                  >
                    <option value="High-Conversion Web Systems & Jamstack">Web Systems & Jamstack</option>
                    <option value="Installable PWA & Cross-Platform Apps">Installable PWA</option>
                    <option value="Ghost Lead Rescue & UX Telemetry">Ghost Lead Rescue</option>
                    <option value="Custom WordPress Plugins">Custom WordPress Plugins</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[11px] text-zinc-300 uppercase">Offering Budget</label>
                  <select
                    value={newOffering}
                    onChange={(e) => setNewOffering(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-900 font-mono"
                  >
                    <option value="$3,500 – $5,000">$3,500 – $5,000</option>
                    <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[11px] text-zinc-300 uppercase">Ledger Note</label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record what the visitor sought before vanishing..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-900 font-typewriter"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewEntryModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-950 hover:bg-red-900 border border-red-900 text-white font-bold cursor-pointer shadow-lg shadow-black font-cinema"
                >
                  Seal into Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
