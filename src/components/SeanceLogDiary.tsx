import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Feather, CheckCircle, Ghost, Eye, Calendar, ArrowRight, X, Plus, Sparkles, Radio, Cloud, ShieldCheck, LogIn, TrendingUp, Activity } from 'lucide-react';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType, signInWithGoogle } from '../lib/firebase';
import { SpiritRadar } from './SpiritRadar';
import { SpiritRecoveryTrends } from './SpiritRecoveryTrends';
import { SeanceSpiritEntry, INITIAL_SPIRITS } from '../data/spirits';

export type { SeanceSpiritEntry };
export { INITIAL_SPIRITS };

export const SeanceLogDiary: React.FC = () => {
  const [spirits, setSpirits] = useState<SeanceSpiritEntry[]>(INITIAL_SPIRITS);
  const [selectedSpirit, setSelectedSpirit] = useState<SeanceSpiritEntry>(INITIAL_SPIRITS[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'radar' | 'trends' | 'diary'>('radar');
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState<boolean>(false);
  const [dispatchSuccessMessage, setDispatchSuccessMessage] = useState<string | null>(null);
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);

  // New spirit form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRite, setNewRite] = useState('High-Conversion Web Systems & Jamstack');
  const [newOffering, setNewOffering] = useState('$5,000 – $10,000');
  const [newNote, setNewNote] = useState('');

  // Real-time Firestore sync for seance_entries
  useEffect(() => {
    const pathForOnSnapshot = 'seance_entries';
    try {
      const unsubscribe = onSnapshot(
        collection(db, pathForOnSnapshot),
        (snapshot) => {
          setIsCloudSynced(true);
          if (!snapshot.empty) {
            const firestoreEntries: SeanceSpiritEntry[] = snapshot.docs.map((docSnap) => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                spiritNumber: d.spiritNumber || `SP-${docSnap.id.slice(-4)}`,
                codename: d.title || 'Manifested Presence',
                humanName: d.clientAlias || 'Living Patron',
                emailWhisper: 'registered@spirit.cloud',
                dateRecovered: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recorded Today',
                riteRequested: d.recoveryMethod || 'Web Architecture',
                offeringTier: '$5,000 – $10,000',
                spiritStatus: d.status === 'recovered' ? 'ghost_recovered' : d.status === 'dissolved' ? 'reclaimed_soul' : 'manifested',
                inkNote: d.notes || d.visitorLossPattern || 'Record observed in cloud ledger.',
                pageHaunted: '/services',
                dwellDuration: '3m 15s'
              };
            });

            setSpirits((prev) => {
              const fsIds = new Set(firestoreEntries.map((f) => f.id));
              const localUnique = prev.filter((p) => !fsIds.has(p.id));
              return [...firestoreEntries, ...localUnique];
            });
          }
        },
        (error) => {
          console.warn('Firestore onSnapshot notice:', error);
          // Only trigger handleFirestoreError on terminal permission violations
          if (error.message.includes('Missing or insufficient permissions')) {
            handleFirestoreError(error, OperationType.GET, pathForOnSnapshot);
          }
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Failed to attach Firestore snapshot listener:', err);
    }
  }, []);

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

  const handleAddManualSpirit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const docId = 'spirit_' + Date.now();
    const spiritNum = `SP-${Math.floor(Math.random() * 8000 + 1000)}`;

    const newSpirit: SeanceSpiritEntry = {
      id: docId,
      spiritNumber: `No. ${spiritNum.replace('SP-', '')}`,
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

    // If authenticated, also commit to Firestore
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'seance_entries', docId), {
          spiritNumber: spiritNum,
          title: `The Newly Summoned (${newName})`,
          clientAlias: newName.trim(),
          status: 'in_dialogue',
          authorId: auth.currentUser.uid,
          notes: newNote.trim() || 'A living patron seeks counsel on digital presence and visitor telemetry.',
          recoveryMethod: newRite,
          visitorLossPattern: 'Disappeared at high friction navigation threshold',
          lostInTheDarkReason: 'Uncached client routing and slow response latency',
          coordX: Math.floor(Math.random() * 60 + 20),
          coordY: Math.floor(Math.random() * 60 + 20),
          spectralIntensity: 0.85,
          createdAt: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Firestore write warning:', err);
      }
    }

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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-zinc-900 pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            <span>03 &middot; Field Ledger</span>
            <span aria-hidden="true">&middot;</span>
            <span>Sixth Sense Archives</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-cinema tracking-wide text-white mt-1">
            The Séance Log
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-editorial text-base">
            Handwritten inquiries and recovered spirit signals cataloged before they dissolved in the dark.
          </p>
        </div>

        {/* View Mode Switcher: Radar Grid vs Recovery Trends vs Diary Grimoire */}
        <div className="flex items-center gap-1.5 bg-zinc-950/90 border border-zinc-800 p-1 rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setViewMode('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'radar'
                ? 'bg-red-950 text-red-200 border border-red-800 shadow-md shadow-red-950/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-red-400" />
            <span>Spirit Radar</span>
          </button>

          <button
            onClick={() => setViewMode('trends')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'trends'
                ? 'bg-red-950 text-red-200 border border-red-800 shadow-md shadow-red-950/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            <span>Recovery Trends</span>
          </button>

          <button
            onClick={() => setViewMode('diary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
              viewMode === 'diary'
                ? 'bg-red-950 text-red-200 border border-red-800 shadow-md shadow-red-950/50'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-red-400" />
            <span>Diary Ledger</span>
          </button>
        </div>
      </div>

      {/* Cloud & Keeper Status Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 bg-[#090909] border border-red-950/50 px-4 py-2.5 rounded-xl">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isCloudSynced ? 'bg-red-500 animate-pulse' : 'bg-zinc-600'}`} />
          <span>Firestore Cloud Database: {isCloudSynced ? 'Connected & Synchronized' : 'Offline Cache Ready'}</span>
        </div>

        {auth.currentUser ? (
          <div className="flex items-center gap-1.5 text-red-300">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Authenticated Keeper: {auth.currentUser.displayName || auth.currentUser.email}</span>
          </div>
        ) : (
          <button
            onClick={() => signInWithGoogle()}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-red-500" />
            <span>Sign In to Unlock Cloud Keeper Mode</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
      {dispatchSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/90 border border-red-600 text-xs sm:text-sm text-red-100 flex items-center gap-2 shadow-xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{dispatchSuccessMessage}</span>
        </div>
      )}

      {/* View Mode 1: Spirit Radar */}
      {viewMode === 'radar' && (
        <SpiritRadar
          externalSpirits={spirits}
          onSelectSpirit={(spirit) => {
            handleRadarSelectSpirit(spirit);
            setViewMode('diary');
          }}
        />
      )}

      {/* View Mode 2: Spirit Recovery Trends (Recharts) */}
      {viewMode === 'trends' && (
        <SpiritRecoveryTrends spirits={spirits} />
      )}

      {/* View Mode 3: Diary Ledger */}
      {viewMode === 'diary' && (
        <div className="space-y-6">
          {/* Quick Telemetry Banner linking to Trends */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-red-950/50 text-xs font-mono gap-2">
            <div className="flex items-center gap-2 text-zinc-400">
              <Activity className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
              <span>30-Day Recovery Influx Telemetry active &middot; 420+ total spirits reclaimed across cycles.</span>
            </div>
            <button
              onClick={() => setViewMode('trends')}
              className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-colors"
            >
              <span>View Trend Line Graph</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search field records or patron names..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 font-mono"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter records by status"
                className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-red-600 font-mono cursor-pointer"
              >
                <option value="all">All States</option>
                <option value="manifested">Manifested</option>
                <option value="ghost_recovered">Recovered</option>
                <option value="reclaimed_soul">Reclaimed</option>
              </select>
            </div>

            <button
              onClick={() => setIsNewEntryModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold font-cinema tracking-wider text-white bg-red-950 hover:bg-red-900 border border-red-800 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-black cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-red-400" />
              <span>Inscribe New Spirit</span>
            </button>
          </div>

          {/* Grimoire Viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Ledger Index */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0a0a0a] border border-red-950/60 p-4 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
                <span className="text-[11px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  Registry Index ({filteredSpirits.length})
                </span>
                <span className="text-[10px] font-mono text-red-500">
                  Vol. I &middot; shepdesign
                </span>
              </div>

              <div className="space-y-2 max-h-[540px] overflow-y-auto pr-1">
                {filteredSpirits.map((spirit) => {
                  const isSelected = selectedSpirit.id === spirit.id;
                  return (
                    <button
                      key={spirit.id}
                      onClick={() => setSelectedSpirit(spirit)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-950/40 border-red-700 shadow-md shadow-red-950/40'
                          : 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-950'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span className={isSelected ? 'text-red-400 font-bold' : ''}>{spirit.spiritNumber}</span>
                        <span>{spirit.dateRecovered.split('·')[0]}</span>
                      </div>
                      <h4 className="text-sm font-bold font-cinema tracking-wide text-white mt-1">
                        {spirit.codename}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 truncate">
                        {spirit.humanName} &middot; <span className="text-zinc-500">{spirit.emailWhisper}</span>
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-900/60 text-[10px] font-mono">
                        <span className="text-red-400/90">{spirit.riteRequested}</span>
                        <span className="text-zinc-500 uppercase">{spirit.spiritStatus.replace('_', ' ')}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Grimoire Entry */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0d0d0d] border border-red-900/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
              {/* Antique Red Wax Seal */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 via-red-900 to-red-950 border-2 border-red-500 shadow-xl shadow-red-950/80 flex items-center justify-center rotate-6 ring-2 ring-red-900/40">
                  <span className="text-[10px] font-cinema font-extrabold text-white tracking-widest uppercase">
                    SHEP
                  </span>
                </div>
                <span className="text-[9px] font-mono text-red-500 mt-1 uppercase tracking-widest">
                  Verified Seal
                </span>
              </div>

              {/* Entry Header */}
              <div className="border-b border-zinc-800/80 pb-4 pr-16">
                <span className="text-xs font-mono text-red-500 tracking-wider uppercase font-semibold">
                  Field Dossier &middot; {selectedSpirit.spiritNumber}
                </span>
                <h3 className="text-2xl font-cinema font-bold text-white tracking-wide mt-1">
                  {selectedSpirit.codename}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Patron: <strong className="text-zinc-200">{selectedSpirit.humanName}</strong> &middot; {selectedSpirit.emailWhisper}
                </p>
              </div>

              {/* Investigation Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-black/60 border border-zinc-900 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Dossier Date</span>
                  <span className="text-white font-medium">{selectedSpirit.dateRecovered}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Offering Tier</span>
                  <span className="text-red-400 font-semibold">{selectedSpirit.offeringTier}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Threshold Dwell</span>
                  <span className="text-white font-medium">{selectedSpirit.dwellDuration}</span>
                </div>
              </div>

              {/* Handwritten Typewriter Field Notes */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <Feather className="w-3.5 h-3.5 text-red-500" />
                  <span>Keeper Field Notes (Typewritten Transcript)</span>
                </div>
                <div className="p-4 sm:p-5 rounded-xl bg-[#070707] border border-red-950/80 text-zinc-300 font-editorial text-base sm:text-lg leading-relaxed shadow-inner">
                  "{selectedSpirit.inkNote}"
                </div>
              </div>

              {/* Architectural Prescription */}
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1">
                <h5 className="text-xs font-cinema font-bold uppercase tracking-wider text-red-300">
                  Recommended Architectural Rite
                </h5>
                <p className="text-xs font-mono text-zinc-300">
                  {selectedSpirit.riteRequested} — Deploy responsive offline service worker, eliminate layout shift, and establish immediate real-time caching.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDispatchReply}
                  className="px-5 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-white font-cinema font-bold tracking-wider text-xs border border-red-700 shadow-lg shadow-black flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Feather className="w-3.5 h-3.5 text-red-400" />
                  <span>Dispatch Formal Response</span>
                </button>

                <button
                  onClick={() => setViewMode('radar')}
                  className="px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-mono text-xs border border-zinc-800 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Radio className="w-3.5 h-3.5 text-red-400" />
                  <span>Locate on Spirit Radar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inscribe Spirit Modal */}
      {isNewEntryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0c0c0c] border border-red-900/70 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest">
                <Feather className="w-4 h-4 text-red-500" />
                <span>Inscribe Dossier into the Ledger</span>
              </div>
              <button
                onClick={() => setIsNewEntryModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddManualSpirit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Patron / Entity Name *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Cole Sear"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Contact Frequency (Email) *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="cole@sixth-sense.com"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Requested Rite</label>
                  <select
                    value={newRite}
                    onChange={(e) => setNewRite(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-red-600 font-mono cursor-pointer"
                  >
                    <option value="High-Conversion Web Systems & Jamstack">Web Architecture</option>
                    <option value="Ghost Lead Recovery & Web App">Ghost Recovery</option>
                    <option value="Installable PWA & Offline Monograph">PWA Engineering</option>
                    <option value="Sixth Sense Aesthetic & Brand Direction">Sixth Sense Brand</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-zinc-400 uppercase">Offering Tier</label>
                  <select
                    value={newOffering}
                    onChange={(e) => setNewOffering(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 focus:outline-none focus:border-red-600 font-mono cursor-pointer"
                  >
                    <option value="$3,000 – $5,000">$3k – $5k</option>
                    <option value="$5,000 – $10,000">$5k – $10k</option>
                    <option value="$10,000 – $25,000">$10k – $25k</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-zinc-400 uppercase">Observation Notes</label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record what friction or spectral behavior was detected..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-600 font-editorial text-base resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  {auth.currentUser ? 'Syncing to Firestore' : 'Saving to local ledger'}
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-red-950 hover:bg-red-900 text-white font-cinema font-bold text-xs tracking-wider border border-red-700 shadow-lg cursor-pointer transition-all"
                >
                  Seal &amp; Inscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
