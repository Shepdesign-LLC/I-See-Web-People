# I See Web People: Victorian Gothic & Modern Glassmorphism PWA

Transform the "I See Web People" Progressive Web App for **Shepdesign** into a distinctive, atmospheric digital studio experience blending **Victorian gothic mystery** with **sleek modern glassmorphism**. The application unites antique talismanic aesthetics, an engraved all-seeing mystic eye emblem, and playful yet powerful real-time visitor telemetry features (Ghost Lead Recovery, Spirit Radar Map, and an interactive Flashlight Lens).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and aesthetic choices were confirmed through Phase 1 requirements:

- **Brand Name & Publisher**: The company is **Shepdesign** (strictly one word, never separated).
- **Aesthetic Direction**: Victorian gothic mystery meets modern dark glassmorphism (deep obsidian `#030712`, smoky velvet slate, spectral bioluminescent cyan `#22d3ee`, muted talismanic gold `#d97706`, and subtle parchment grain). No gory horror—clean, sophisticated, enigmatic, and playful.
- **Logo Identity & Emblems**: An engraved, all-seeing mystic eye with ethereal concentric radar rings, celestial compass marks, and an antique talismanic lockup suited for app icons, favicon, and home-screen launchers.
- **Key Spooky PWA Features**:
  1. **Flashlight Lens**: An interactive dark-mode beam toggle that illuminates hidden visitor session friction, rage clicks, and dropped form fields as if using an antique lantern on a dark web page.
  2. **Spirit Radar Map**: Real-time celestial/radar visualizer mapping active human souls across client web properties.
  3. **Ghost Lead Recovery**: Telemetry engine that captures abandoned inquiries before they vanish into thin air, backed by local offline persistence.

---

## 1. Overview & Core Concept

- **What It Does**: A complete Progressive Web App for **Shepdesign** under the marquee **"I See Web People"**. It showcases high-conversion web engineering and human telemetry services, interactive case studies with verified ROI, real-time client presence tracking, and an offline-resilient project inquiry portal.
- **Target Audience**: High-growth founders, digital agencies, and e-commerce operators seeking to understand real human intent on their websites rather than sterile bounce statistics.
- **Key Value**: Turns invisible, lost website visitors ("ghosts") into tangible leads and client relationships through playful, memorable, and high-converting frontend mechanics.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Atmospheric Arrival & Brand Hero**:
   - Visitors land on a brooding, mysterious parlor aesthetic: deep obsidian glass, faint celestial gridlines, and the vintage engraved talisman logo of *I See Web People*.
   - A single-click **"Flashlight Lens"** toggle in the header allows visitors to sweep their cursor like an antique lantern, revealing invisible visitor footprints and interaction heatmaps across the page.
2. **Services Showcase (The Grimoire of Capabilities)**:
   - Editorial, numbered service modules (`01. Bespoke Web Systems`, `02. Spirit Radar & Telemetry`, `03. Installable PWA Architecture`, `04. Custom WordPress Plugins`).
   - Detailed expanders revealing deliverables, timelines, and pricing models with crisp gothic numerals.
3. **Case Studies (The Séance Archives)**:
   - Real-world case studies for Nexus Capital, Equinox Roasters, and Mesa Architects presented with rich editorial photography, dark glass card surrounds, and concrete metrics (`+184% mobile engagement`, `+26.4% cart recovery`).
   - Modal deep dives exploring the client challenge, engineering remedy, and tech stack.
4. **Interactive Spirit Radar (The Live Cockpit)**:
   - Switch between client properties (Shepdesign, Apex Equipment, Velvet Roast, Solace Wealth) to witness live human sessions, hesitation alerts, rage clicks, and ghost cart inputs in real time.
5. **Direct Contact & Séance Inquiry (Offline-Ready)**:
   - Project brief inquiry form allowing visitors to select service scope, budget, and timeline.
   - Fully resilient: if connectivity drops, inquiries are stored in an offline queue with clear sync feedback upon reconnection.
6. **In-App PWA Installation**:
   - Header install button offering 1-click installation on Chromium/Android/desktop and iOS Safari "Add to Home Screen" instructions.

### Visual Identity & Theme

```
Dominant Canvas:      #030712 (Deep Victorian Obsidian / Nocturne Black)
Structural Surfaces:  #0f172a (Smoky Slate Glass with 1px border #1e293b)
Spectral Accent:      #06b6d4 / #22d3ee (Bioluminescent Cyan / Spirit Ectoplasm)
Antique Gilding:      #d97706 / #f59e0b (Talisman Gold / Wax Seal Accents)
Muted Parchment:      #94a3b8 / #e2e8f0 (Engraved Line Typography & Silver Leaf)
```

- **Typography**:
  - Display / Hero / Brand: `Plus Jakarta Sans` with tightened tracking and high-contrast letterforms for a bold modern gothic feel.
  - Telemetry, Radar & Data: `JetBrains Mono` with tabular numerals (`tabular-nums`) for technical precision.
- **Component Styling & Layout**:
  - Dark glassmorphism (`backdrop-blur-md bg-slate-900/70 border border-slate-800/80`).
  - Subtle vintage filigree corner brackets on marquee cards.
  - Strict anti-slop discipline: no generic purple gradients, no pill badge sandwiches, no fake telemetry tickers.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Vintage Spooky Tone vs. Enterprise Credibility**
  - *Chosen Approach*: Sophisticated Victorian mystery and antique typography over cheesy Halloween gore or neon slime. The spooky theme reinforces the core value proposition ("seeing real human visitors before they vanish as ghosts") while remaining deeply professional for agency clients.
  - *Why*: Shepdesign builds high-end web systems; the brand must inspire confidence and delight, not look like a toy.
- **Decision 2: Flashlight Lens Interaction Model**
  - *Chosen Approach*: A lightweight CSS radial gradient overlay bound to pointer coordinates (`radial-gradient(circle at X Y, rgba(34, 211, 238, 0.12) 0%, transparent 400px)`), toggleable via header switch with `prefers-reduced-motion` compliance.
  - *Why*: Zero layout reflow, pure compositor execution, instant 60fps performance without Three.js overhead.
- **Decision 3: Single Brand Spelling Everywhere**
  - *Chosen Approach*: Unified as **Shepdesign** across all footer copy, metadata, manifest files, and email channels (`ryan@shepdesign.com`).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│               "I See Web People" Progressive Web App                  │
│                     Publisher: Shepdesign                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           │                                                 │
           ▼                                                 ▼
┌──────────────────────┐                          ┌──────────────────────┐
│  PWA Service Worker  │                          │ Flashlight & UI      │
│  & Cache Management  │                          │ Interaction Engine   │
│  - Offline precache  │                          │ - Cursor beam sync   │
│  - Web App Manifest  │                          │ - Gothic glass cards │
│  - Background sync   │                          │ - Install prompts    │
└──────────┬───────────┘                          └──────────┬───────────┘
           │                                                 │
           ▼                                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          Core View Layers                              │
│                                                                        │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────┐ │
│  │ Services Catalog │  │ Verified Case    │  │ Interactive Spirit    │ │
│  │ (Grimoire Specs) │  │ Studies (Séance) │  │ Radar (Live Telemetry)│ │
│  └──────────────────┘  └──────────────────┘  └───────────────────────┘ │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────┐ │
│  │ Offline Contact  │  │ Strategy Matrix  │  │ WP Plugin & Code      │ │
│  │ & Lead Vault     │  │ & Decision Engine│  │ Exporter (.php/JSON)  │ │
│  └──────────────────┘  └──────────────────┘  └───────────────────────┘ │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│            Local Persistence & Resilient Offline Storage               │
│         - IndexedDB / localStorage inquiry queue (auto-sync)           │
│         - Cached client session traces & audit report state            │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

- **`StudioService`**: ID, title, roman/gothic numeral, deliverables list, timeline, and pricing tier.
- **`CaseStudy`**: Client name, industry, problem diagnosis, engineering intervention, verified ROI metrics, and responsive photography.
- **`VisitorSession`**: Session hash, timestamp, page route, duration counter, status (`active`, `ghost_form`, `rage_clicking`), and ghost input preview.
- **`InquirySubmission`**: Lead contact data, service selection, budget tier, message body, and sync status flag (`synced: boolean`).
- **`FlashlightState`**: Active boolean state, mouse coordinate pair `(x, y)` updating CSS custom variables `--lantern-x` and `--lantern-y`.

---

## 5. Phased Implementation Roadmap

1. **Asset Generation & Branding**:
   - Generate the high-resolution vintage spooky logo emblem: an engraved talismanic all-seeing eye with ethereal concentric radar rings in dark gothic gold and spectral cyan.
   - Update `pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`, and `icon.svg` with the new spooky logo.
2. **Visual Overhaul & Flashlight Lens**:
   - Update `index.html` and Tailwind styles with Victorian gothic glassmorphism tokens, antique borders, and the interactive lantern beam effect.
   - Correct all occurrences of "Shep Design" to **Shepdesign**.
3. **PWA & Offline Integration**:
   - Re-verify `vite.config.ts` PWA manifest, service worker precaching, and the in-app install flow.
4. **Verification & Testing**:
   - Run `lint_applet` and `compile_applet` to confirm a pristine build without errors.
