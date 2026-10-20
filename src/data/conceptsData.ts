import { PlatformConcept } from '../types';

export const BRAND_STORY = {
  name: "I See Web People",
  subtitle: "Victorian Gothic Mystery & Modern Human Telemetry",
  publisher: "Shepdesign",
  originStory: "Inspired by the classic cinematic line 'I see dead people', I See Web People by Shepdesign turns cold, lifeless analytics into living human presence. Where ordinary software shows dry bounce charts and anonymous numbers, our mystic spirit radar unveils the real souls navigating, hesitating, and converting across your web properties.",
  coreValues: [
    { title: "Living Souls Over Cold Rows", desc: "Every click is an intentional human gesture in the dark, not a lifeless telemetry ping." },
    { title: "Zero Ghosting", desc: "Catch hesitation, rage clicks, and abandoned form entries before the user vanishes into the ether." },
    { title: "Victorian Rigor, Modern Glass", desc: "Antique craftsmanship, engraved talismanic aesthetics, and sub-second PWA engineering." }
  ]
};

export const PLATFORM_CONCEPTS: Record<'wordpress' | 'pwa' | 'native', PlatformConcept> = {
  wordpress: {
    id: 'wordpress',
    title: 'WordPress Plugin: "I See Web People (WP)"',
    tagline: 'Spirit Radar, Ghost Form Recovery & Admin Bar Eye for WordPress',
    verdictBadge: 'Fastest Route to Market & Massive Distribution (43% of Web)',
    speedToMarket: '2 - 3 Weeks (MVP)',
    distributionChannel: 'WordPress.org Plugin Repository (Free) + Freemius for Pro Upsell',
    monetizationModel: 'Freemium: Free tier in WP Repo (up to 3,000 monthly sessions) + $49/yr Single Site Pro / $149/yr Agency Unlimited',
    primaryAudience: 'WordPress freelancers, Shepdesign clients, WooCommerce shop owners, and high-touch B2B portals.',
    pros: [
      'Immediate access to 43%+ of the entire CMS market with zero App Store review hurdles.',
      'Native integration with WP-Admin Bar (admins see live humans without leaving their site).',
      'Direct hook into WooCommerce carts & Gravity/Fluent/WPForms for immediate ghost lead recovery.',
      'Can be 100% self-hosted on client SQLite/MySQL with zero external SaaS server overhead.'
    ],
    cons: [
      'Limited to WordPress ecosystems (misses Shopify, Webflow, custom Jamstack sites).',
      'PHP hosting variations (shared hosting CPU throttles) require careful telemetry caching.'
    ],
    coreTechStack: [
      'PHP 8.1+ with WordPress Plugin API',
      'Preact / Alpine.js for lightweight front-end tracking & admin bar ticker',
      'WordPress REST API endpoints for non-blocking beacons',
      'Local transient caching & Transients API to preserve server performance'
    ],
    killerFeatures: [
      {
        title: 'WP-Admin Bar Mystic Eye Radar',
        description: 'Persistent top admin bar widget showing "3 Web People Active Now". Clicking it slides down an antique HUD of active pages.',
        impact: 'High Daily Engagement'
      },
      {
        title: 'Ghost Form Recovery',
        description: 'Captures email addresses or phone numbers as visitors type them into checkout or contact forms, saving them if the user abandons before clicking Submit.',
        impact: '+22% Recovered Inbound Leads'
      },
      {
        title: 'Rage-Click & Broken Link Alerter',
        description: 'Detects when a visitor taps the same button 3+ times in 2 seconds or hits a dead JavaScript link, logging the exact selector and viewport size.',
        impact: 'Zero Blind UX Bugs'
      },
      {
        title: 'WooCommerce High-Value Cart Watcher',
        description: 'Triggers subtle sound or browser desktop notification when a cart with value > $100 is hesitating for more than 45 seconds on checkout.',
        impact: 'Immediate Sales Retention'
      }
    ],
    architectureSummary: 'Single-file or lightweight folder structure (`/i-see-web-people/`) with standard WordPress hooks (`wp_enqueue_scripts`, `admin_bar_menu`, `rest_api_init`). Front-end script is ultra-light (< 4KB gzipped) and uses `navigator.sendBeacon` to eliminate layout latency.'
  },

  pwa: {
    id: 'pwa',
    title: 'Progressive Web App: "I See Web People Studio"',
    tagline: 'Multi-Tenant Spirit Radar & Client UX Health Suite by Shepdesign',
    verdictBadge: 'Best Scalability & Universal Compatibility Across All Tech Stacks',
    speedToMarket: '4 - 6 Weeks',
    distributionChannel: 'Direct web link (app.iseewebpeople.com), installable to Mac, Windows, ChromeOS, iOS & Android via browser prompt.',
    monetizationModel: 'B2B SaaS: $29/mo Starter (5 sites), $79/mo Agency (25 sites + client white-label portals), $199/mo Enterprise.',
    primaryAudience: 'Design & Development Agencies (like Shepdesign), marketing consultants, multi-site e-commerce operators.',
    pros: [
      'Universal: Works across WordPress, Shopify, Webflow, Squarespace, and custom React/Next.js via one universal JS snippet.',
      'Zero App Store gatekeeping: 0% Apple/Google tax, instantaneous over-the-air updates, zero approval wait times.',
      'Multi-site agency cockpit: Switch between all 30 of your clients in a single tab or dedicated desktop window.',
      'Offline-capable client presentation: Cache UX audit recordings and present them to clients on flights or offline meetings.'
    ],
    cons: [
      'iOS Web Push requires iOS 16.4+ and user adding to Home Screen first.',
      'Requires managing cloud infrastructure (e.g. Firebase, Cloudflare Workers, or Supabase).'
    ],
    coreTechStack: [
      'React 19 + TypeScript + Vite + Tailwind CSS',
      'Web Workers + IndexedDB for offline session caching',
      'WebSockets (PartyKit or Firebase Realtime / Supabase Realtime) for sub-second presence',
      'Web App Manifest + Service Worker with stale-while-revalidate caching'
    ],
    killerFeatures: [
      {
        title: 'Multi-Client Spirit Radar',
        description: 'A single high-density grid showing all client websites simultaneously with live human heartbeat dots and traffic temperature indicators.',
        impact: 'Massive Agency Retainer Value'
      },
      {
        title: 'Visitor Séance (Live Replay)',
        description: 'Watch simulated anonymous cursor trails and scroll depth in real time, showing where human friction occurs as it happens.',
        impact: 'Instant Client Buy-in'
      },
      {
        title: 'Flashlight Friction Lens',
        description: 'Interactive beam mode casting antique illumination over cold interfaces to reveal hidden friction, rage clicks, and dropped form fields.',
        impact: 'Unmatched Diagnostic Clarity'
      },
      {
        title: 'One-Click Client UX Audit Generator',
        description: 'Auto-compiles monthly or weekly "Human Experience Audits" with rage-click breakdowns and lost form revenue to send to agency clients.',
        impact: 'Retainer Justification'
      }
    ],
    architectureSummary: 'Single Page App delivered over CDN with Service Worker registration. Employs a tiny embed tag (`<script src="https://cdn.iseewebpeople.com/tracker.min.js" data-site="SITE_ID">`) placed on any website platform.'
  },

  native: {
    id: 'native',
    title: 'Native Mobile App: "Web People Radar Mobile"',
    tagline: 'Real-Time VIP Visitor Push Alerts, Whale Lead Triage & Lock Screen Widgets',
    verdictBadge: 'Peak Real-Time Urgency & Executive High-Touch Triage',
    speedToMarket: '8 - 12 Weeks (or 4 weeks via Capacitor / React Native)',
    distributionChannel: 'Apple App Store (iOS/macOS) & Google Play Store (Android)',
    monetizationModel: 'Add-on companion to SaaS subscription (Free for Agency plan users), or $9.99/mo solo subscription via In-App Purchase.',
    primaryAudience: 'Founders, high-ticket sales closers, VIP customer success leads, and solo agency operators on the road.',
    pros: [
      'Unmatched notification deliverability: Native push notifications ring with custom sound when a 5-figure lead is on site.',
      'iOS Dynamic Island & Live Activity: See live visitor count updating on your lock screen while working or commuting.',
      'Haptic feedback & FaceID biometric security for private customer contact details.',
      'One-tap direct outreach: Call, WhatsApp, or Slack the visitor while they are still looking at your pricing page.'
    ],
    cons: [
      '30% Apple / Google App Store revenue cut on initial tier in-app subscriptions.',
      'App Store review delays (2-5 days for critical updates).',
      'Higher maintenance cost (two native platforms or cross-platform bridge).'
    ],
    coreTechStack: [
      'React Native / Expo or Capacitor wrapping Vite SPA',
      'APNs (Apple Push Notification service) & FCM (Firebase Cloud Messaging)',
      'iOS ActivityKit for Dynamic Island & Lock Screen Live Activities',
      'Native Haptics & Keychain Secure Storage'
    ],
    killerFeatures: [
      {
        title: 'VIP Whale Visitor Alert',
        description: 'Custom acoustic chime when an enterprise IP or a visitor browsing a >$5,000 package lingers for more than 2 minutes.',
        impact: '5x Faster Sales Response Time'
      },
      {
        title: 'Dynamic Island Live Activity',
        description: 'Shows active visitor count and current high-priority page directly in the iPhone Dynamic Island.',
        impact: 'Glanceable Ambient Awareness'
      },
      {
        title: '1-Tap Intervene & Push Action',
        description: 'From the push notification, swipe to trigger a personalized coupon toast or initiate a live chat invitation on the visitor’s screen.',
        impact: 'Direct Human Conversion'
      },
      {
        title: 'Rage-Click Emergency Notification',
        description: 'Instant notification when 3 or more visitors experience broken checkout buttons, allowing immediate server reboot or rollback.',
        impact: 'Saves Crashing Campaigns'
      }
    ],
    architectureSummary: 'Mobile wrapper or React Native client connecting to the I See Web People backend via APNs / FCM push pipes with end-to-end encrypted notification payloads.'
  }
};

export const COMPARISON_CRITERIA = [
  {
    criterion: "Distribution Friction",
    wordpress: "Very Low (Official WP Directory search)",
    pwa: "Near Zero (Direct URL, no store approval)",
    native: "High (App Store review, account creation)"
  },
  {
    criterion: "Platform Coverage",
    wordpress: "WordPress only (43% of all websites)",
    pwa: "100% of websites (WordPress, Shopify, Custom)",
    native: "Mobile users only (iOS/Android companion)"
  },
  {
    criterion: "Real-Time Urgency & Alerts",
    wordpress: "Moderate (WP-admin bar, browser tabs)",
    pwa: "High on Desktop (Web Push, Badging API)",
    native: "Maximum (Dynamic Island, APNs, Haptics)"
  },
  {
    criterion: "Development & Maintenance Cost",
    wordpress: "Low (Single PHP codebase + small JS)",
    pwa: "Moderate (Modern React SPA + API)",
    native: "Higher (Dual OS build pipelines, store fees)"
  },
  {
    criterion: "Best Monitized Through",
    wordpress: "Freemium plugin upsell ($49 - $149/yr)",
    pwa: "Monthly Agency SaaS ($29 - $199/mo)",
    native: "Companion app included with SaaS tier"
  }
];

export const STRATEGIC_RECOMMENDATION_FLOW = {
  suggestedSequence: [
    {
      step: "Phase 1: Launch Progressive Web App (The Core Cockpit)",
      timing: "Months 1 - 2",
      why: "Build the primary brand hub for Shepdesign. Zero app-store toll, universal multi-site coverage, instant desktop/mobile installability, and rich offline client audit capabilities.",
      deliverable: "PWA Studio with Spirit Radar, Ghost Lead recovery, and Flashlight Lens."
    },
    {
      step: "Phase 2: Launch WordPress Plugin (The Distribution Wedge)",
      timing: "Months 3 - 4",
      why: "Capture the 43% of the web on WordPress with zero acquisition friction via WordPress.org. Hooks into WP-Admin bar and WooCommerce to drive organic SaaS adoption.",
      deliverable: "Free WP Plugin with Admin Bar eye ticker + Ghost Form capture."
    },
    {
      step: "Phase 3: Package as Native App (The VIP Triage Lock)",
      timing: "Months 5+",
      why: "Wrap the PWA using Capacitor into iOS and Android apps. Add native push notifications, Lock Screen widgets, and Dynamic Island for founders closing high-ticket deals on the go.",
      deliverable: "iOS / Android App Store companion app with Dynamic Island radar."
    }
  ]
};
