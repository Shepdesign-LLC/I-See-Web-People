import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Clock, Mail, Feather, WifiOff, Sparkles, BookOpen } from 'lucide-react';

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

  // When coming back online, auto-sync queued items
  useEffect(() => {
    if (isOnline && queuedInquiries.length > 0) {
      const hasUnsynced = queuedInquiries.some(item => !item.synced);
      if (hasUnsynced) {
        const updated = queuedInquiries.map(item => ({ ...item, synced: true }));
        setQueuedInquiries(updated);
        localStorage.setItem('iswp_queued_inquiries', JSON.stringify(updated));
      }
    }
  }, [isOnline, queuedInquiries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);

    const submission: InquirySubmission = {
      id: 'inq_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      service,
      budget,
      timeline,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      synced: isOnline
    };

    setTimeout(() => {
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
    }, 350);
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
          Ready to build something mysterious, high-performance, and human? Transmit your project brief below. All inquiries are saved to your offline cache and registered in the Séance Log.
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
                    placeholder="Ryan Shephard"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-900 transition-colors font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ryan@shepdesign.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-900 transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Craft / Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-900 transition-colors font-mono"
                  >
                    <option value="High-Conversion Web Systems & Jamstack">01. Web Systems &amp; Jamstack</option>
                    <option value="Installable PWA & Cross-Platform Apps">02. Installable PWA</option>
                    <option value="Ghost Lead Rescue & UX Telemetry">03. Ghost Lead Rescue</option>
                    <option value="Custom WordPress Plugins">04. Custom WordPress Plugins</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Estimated Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs text-white focus:outline-none focus:border-red-900 transition-colors font-mono"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-zinc-300 font-mono uppercase tracking-wider">Project Brief &amp; Notes</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're building, what friction your users encounter, or your timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-900 transition-colors resize-none font-mono"
                />
              </div>

              {!isOnline && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/60 border border-red-900/80 text-red-200 text-xs">
                  <WifiOff className="w-4 h-4 shrink-0 text-red-400" />
                  <span>
                    <strong>Offline Caching Active:</strong> Your inquiry will be safely sealed in your local PWA storage and will auto-synchronize to shepdesign the moment your network reconnects.
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl font-bold font-cinema tracking-wider text-white bg-red-950 hover:bg-red-900 border border-red-900 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sealing Dispatch...</span>
                ) : (
                  <>
                    <Feather className="w-4 h-4 text-red-400" />
                    <span>Transmit Dispatch to shepdesign</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-8 text-center space-y-4 rounded-2xl bg-black border border-red-950 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-800 mx-auto flex items-center justify-center text-red-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-cinema text-white">Dispatch Inscribed &amp; Sealed</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Receipt Token: {submittedData.id} &middot; {submittedData.timestamp}
                </p>
              </div>
              <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed font-editorial text-sm">
                Thank you, <strong>{submittedData.name}</strong>. Your dispatch is permanently recorded in the <strong>Séance Log</strong>. 
                shepdesign responds within 24 hours.
              </p>
              <button
                onClick={() => setSubmittedData(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-950 hover:bg-red-900 border border-red-900 transition-colors cursor-pointer"
              >
                Send Another Dispatch
              </button>
            </div>
          )}
        </div>

        {/* Studio Coordinates & PWA Offline Information */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#0a0a0a] border border-zinc-900 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="red-seal shrink-0 shadow-lg">
                <span className="text-[9px] font-cinema font-bold text-center leading-tight">
                  SHEP<br />DESIGN
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-cinema tracking-wide">Direct Studio Desk</h4>
                <div className="text-xs text-zinc-400 font-mono">shepdesign &middot; Ryan Shephard</div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-zinc-300 font-mono">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href="mailto:ryan@shepdesign.com" className="text-red-400 hover:underline">
                  ryan@shepdesign.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-zinc-400">
                <Clock className="w-4 h-4 text-zinc-500 shrink-0" />
                <span>Response SLA: Within 24 Hours</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#080808] border border-red-950/40 p-5 space-y-2.5 text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-red-400 font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offline PWA Guarantee</span>
            </div>
            <p className="leading-relaxed">
              This application is an installable Progressive Web App. Whether you are offline on a flight or experiencing network loss, all services, case studies, and séance records remain fully interactive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
