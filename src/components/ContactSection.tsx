import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Clock, Mail, Feather, WifiOff, Sparkles, BookOpen } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface ContactSectionProps {
  isOnline: boolean;
}

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  timestamp: string;
  synced: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isOnline }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('High-Conversion Web Systems & Jamstack');
  const [budget, setBudget] = useState('$5,000 – $10,000');
  const [timeline, setTimeline] = useState('Within 1 month');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquirySubmission | null>(null);
  const [queuedInquiries, setQueuedInquiries] = useState<InquirySubmission[]>([]);

  // Load queued submissions on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('iswp_queued_inquiries');
      if (stored) {
        setQueuedInquiries(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
  }, []);

  // When coming back online, auto-sync queued items to Firestore
  useEffect(() => {
    if (isOnline && queuedInquiries.length > 0) {
      const unsynced = queuedInquiries.filter(item => !item.synced);
      if (unsynced.length > 0) {
        // Sync to Firestore
        unsynced.forEach(async (inq) => {
          try {
            await setDoc(doc(db, 'inquiries', inq.id), {
              name: inq.name,
              email: inq.email,
              serviceType: inq.service,
              notes: inq.message + (inq.budget ? ` [Budget: ${inq.budget}]` : '') + (inq.timeline ? ` [Timeline: ${inq.timeline}]` : ''),
              status: 'summoned',
              senderId: auth.currentUser?.uid || 'anon_offline',
              createdAt: new Date().toISOString()
            });
          } catch (err) {
            console.warn('Sync queue error:', err);
          }
        });

        const updated = queuedInquiries.map(item => ({ ...item, synced: true }));
        setQueuedInquiries(updated);
        localStorage.setItem('iswp_queued_inquiries', JSON.stringify(updated));
      }
    }
  }, [isOnline, queuedInquiries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const docId = 'inq_' + Date.now();
    let isDbSynced = false;

    if (isOnline) {
      try {
        await setDoc(doc(db, 'inquiries', docId), {
          name: name.trim(),
          email: email.trim(),
          serviceType: service,
          notes: message.trim() + (budget ? ` [Budget: ${budget}]` : '') + (timeline ? ` [Timeline: ${timeline}]` : ''),
          status: 'summoned',
          senderId: auth.currentUser?.uid || 'anon_' + Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString()
        });
        isDbSynced = true;
      } catch (err) {
        console.warn('Firestore write warning; preserving in offline queue:', err);
        // Do not crash, keep queued
      }
    }

    const submission: InquirySubmission = {
      id: docId,
      name: name.trim(),
      email: email.trim(),
      service,
      budget,
      timeline,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      synced: isDbSynced
    };

    const newQueue = [submission, ...queuedInquiries];
    setQueuedInquiries(newQueue);
    try {
      localStorage.setItem('iswp_queued_inquiries', JSON.stringify(newQueue));
    } catch {
      // Fallback
    }

    setSubmittedData(submission);
    setIsSubmitting(false);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="space-y-6">
      <div className="border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-red-500 uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5 text-red-500" />
          <span>04 &middot; Contact</span>
          <span aria-hidden="true">&middot;</span>
          <span>Initiate Collaboration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-cinema tracking-wide text-white mt-1">
          Summon shepdesign
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed font-editorial text-base">
          Ready to build something mysterious, high-performance, and human? Transmit your project brief below. All inquiries are saved to your offline cache and registered in the Séance Log &amp; Cloud Database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Contact Form Container */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0c0c0c] border border-red-950/70 p-6 sm:p-7 shadow-2xl space-y-5">
          {!submittedData ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Dr. Malcolm Crowe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Direct Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ryan@shepdesign.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Focus Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all cursor-pointer"
                  >
                    <option value="High-Conversion Web Systems & Jamstack">01. Web Systems & Architecture</option>
                    <option value="Lost Visitor Ghost-Recovery Strategy">02. Ghost Visitor Recovery</option>
                    <option value="Bespoke PWA Development & Offline-First">03. PWA Craftsmanship</option>
                    <option value="Sixth Sense Aesthetic & Brand Direction">04. Sixth Sense Aesthetic</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Estimated Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all cursor-pointer"
                  >
                    <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                    <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000+">$25,000+ (Comprehensive Transformation)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">
                  The Mystery / Problem Statement *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what visitors are slipping through your fingers in the dark..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all resize-none font-sans"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-950 hover:bg-red-900 text-white font-cinema font-bold tracking-wider text-xs sm:text-sm border border-red-700 shadow-xl shadow-black flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-red-400" />
                  <span>{isSubmitting ? 'Summoning...' : 'Transmit Brief to shepdesign'}</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                  <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-red-500' : 'bg-zinc-600'}`} />
                  <span>{isOnline ? 'Direct Cloud Sync' : 'Offline Queue Active'}</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-950/80 border border-red-700 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-cinema font-bold text-white tracking-wide">
                Brief Received into the Ledger
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{submittedData.name}</strong>. Your inquiry has been registered in the Séance Log. Ryan at shepdesign typically responds within 24 hours.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 inline-block text-left text-xs font-mono text-zinc-400 space-y-1">
                <p><span className="text-zinc-600">Reference:</span> {submittedData.id}</p>
                <p><span className="text-zinc-600">Email:</span> {submittedData.email}</p>
                <p><span className="text-zinc-600">Status:</span> {submittedData.synced ? 'Synced to Cloud Firestore' : 'Stored in Offline Ledger'}</p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedData(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-medium text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-900/60 transition-colors cursor-pointer"
                >
                  Transmit Another Inquiry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info & Queue Ledger */}
        <div className="lg:col-span-5 space-y-5">
          {/* Direct Studio Contact Card */}
          <div className="rounded-2xl bg-[#0a0a0a] border border-red-950/50 p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-cinema font-bold uppercase tracking-wider text-white">
              Studio Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono text-zinc-300">
              <p className="flex items-center gap-2">
                <span className="text-red-500 font-bold">Email:</span>
                <a href="mailto:ryan@shepdesign.com" className="text-zinc-200 hover:text-red-400 transition-colors">
                  ryan@shepdesign.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-500 font-bold">Studio:</span>
                <span>shepdesign &middot; Los Angeles &middot; Worldwide</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-red-500 font-bold">Hours:</span>
                <span>Mon–Fri: 9:00 AM – 6:00 PM PST</span>
              </p>
            </div>
          </div>

          {/* Offline/Online Sync Log */}
          <div className="rounded-2xl bg-[#0a0a0a] border border-zinc-900 p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                PWA Ledger Queue
              </h4>
              <span className="text-[11px] font-mono text-red-400 bg-red-950/40 border border-red-900/50 px-2 py-0.5 rounded-full">
                {queuedInquiries.length} {queuedInquiries.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            
            {queuedInquiries.length === 0 ? (
              <p className="text-xs text-zinc-400 font-mono py-2">
                No local submissions queued. Transmit a brief to test offline resilience.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {queuedInquiries.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-[10px] text-zinc-500 font-mono">{item.service}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${item.synced ? 'text-red-400 bg-red-950/50' : 'text-zinc-400 bg-zinc-900'}`}>
                        {item.synced ? 'Synced' : 'Queued'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
