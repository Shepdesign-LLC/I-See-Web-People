export interface StudioService {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  deliverables: string[];
  timeline: string;
  priceModel: string;
  description: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  summary: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  challenge: string;
  solution: string;
  technologies: string[];
}

export const STUDIO_SERVICES: StudioService[] = [
  {
    id: 'service-web-presence',
    number: '01',
    category: 'Full-Stack Architecture & Gothic Glass',
    title: 'High-Conversion Web Systems & Jamstack',
    tagline: 'Crafted for living human souls, not cold automated crawlers.',
    timeline: '3 - 6 Weeks',
    priceModel: 'From $8,500',
    description: 'Bespoke web applications designed by Shepdesign using React, Vite, Next.js, and headless WordPress. Fused with antique typographic discipline, zero-slop spatial math, sub-second TTFB, and dark glassmorphic beauty.',
    deliverables: [
      'Custom Design System with Victorian Gothic Touches',
      'High-performance Jamstack or Headless architecture',
      'WCAG AA accessible contrast & semantic layout',
      'Sub-second page transitions & fluid micro-interactions'
    ]
  },
  {
    id: 'service-human-telemetry',
    number: '02',
    category: 'UX Telemetry & Spirit Radar',
    title: 'Live Spirit Radar & Ghost Lead Rescue',
    tagline: 'Stop staring at dead statistics. Reveal living visitors in real time.',
    timeline: '1 - 2 Weeks',
    priceModel: 'From $3,500 + Retainer',
    description: 'We embed privacy-first telemetry into your client portals. Detect hesitation hotspots, rage clicks, and abandoned form inputs before visitors vanish into the digital ether. Turn ghost traffic into tangible pipeline revenue.',
    deliverables: [
      'I See Web People Spirit Radar script implementation',
      'Ghost form lead capture engine (GDPR & CCPA compliant)',
      'Flashlight lens diagnostic tooling for UX auditing',
      'Monthly executive UX health audits with actionable fixes'
    ]
  },
  {
    id: 'service-pwa-mobile',
    number: '03',
    category: 'Progressive Web Apps & Touch Ergonomics',
    title: 'Installable PWA & Cross-Platform Web Apps',
    tagline: 'Bypass the 30% App Store toll. Deliver native app power on the open web.',
    timeline: '4 - 8 Weeks',
    priceModel: 'From $12,000',
    description: 'Deliver desktop and mobile apps installable with a single tap directly from your browser. Full offline caching, background data sync, push notification pipelines, and zero App Store gatekeeping.',
    deliverables: [
      'Custom Web App Manifest & Service Worker caching strategies',
      'Offline-first IndexedDB local storage architecture',
      'Push notification pipelines (Web Push & APNs)',
      'Single-tap home screen install flows with iOS guidance'
    ]
  },
  {
    id: 'service-wordpress-custom',
    number: '04',
    category: 'Enterprise WordPress Engineering',
    title: 'Custom WordPress Plugins & Headless Core',
    tagline: 'Supercharge the 43% of the web that runs on WordPress.',
    timeline: '2 - 4 Weeks',
    priceModel: 'From $5,000',
    description: 'Custom bespoke plugins, custom post types, WooCommerce performance tuning, and WP-Admin bar integrations tailored to your company operations without plugin bloat.',
    deliverables: [
      'Tailored single-file or modular WordPress plugins',
      'WooCommerce checkout flow acceleration & cart recovery',
      'WP REST API endpoints with transient caching',
      'Custom WP-Admin HUDs and editorial dashboards'
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-nexus-finance',
    title: 'Nexus Capital: Private Equity Client Portal & Live Asset Radar',
    client: 'Nexus Capital Partners',
    industry: 'Fintech & Private Wealth',
    year: '2026',
    summary: 'Transformed an opaque investor reporting workflow into an ultra-fast, installable PWA investor dashboard with real-time fund telemetry.',
    image: '/src/assets/images/case_study_fintech_1792494972788.jpg',
    metrics: [
      { label: 'Time to First Interaction', value: '0.4s' },
      { label: 'Investor Mobile Engagement', value: '+184%' },
      { label: 'Lighthouse Performance Score', value: '99/100' }
    ],
    challenge: 'High-net-worth investors frequently accessed quarterly statements on mobile devices during travel, but the legacy desktop portal took 8 seconds to load and broke on erratic cellular networks.',
    solution: 'Designed and deployed an offline-ready PWA using React, IndexedDB caching, and biometric TouchID authentication. Statements load instantaneously even mid-flight.',
    technologies: ['React 19', 'PWA / Service Workers', 'Tailwind CSS', 'IndexedDB', 'Web Crypto API']
  },
  {
    id: 'case-equinox-coffee',
    title: 'Equinox Roasters: Direct-to-Consumer E-Commerce & Ghost Cart Rescue',
    client: 'Equinox Coffee Roasters',
    industry: 'Artisanal Food & Beverage',
    year: '2025',
    summary: 'Redesigned brand storefront and deployed I See Web People Ghost Cart telemetry, rescuing thousands in abandoned checkout revenue.',
    image: '/src/assets/images/case_study_coffee_1792494972450.jpg',
    metrics: [
      { label: 'Abandoned Cart Recovery', value: '+26.4%' },
      { label: 'Checkout Checkout Speed', value: '-62%' },
      { label: 'Monthly Recurring Subscribers', value: '+310' }
    ],
    challenge: 'Visitors browsing specialty single-origin roasts were hesitating at the grind selection step, leading to a 44% cart abandonment rate without capturing email leads.',
    solution: 'Re-architected the WooCommerce checkout into a frictionless 2-step flow with inline grind education and active Ghost Form recovery for abandoned emails.',
    technologies: ['WordPress / WooCommerce', 'I See Web People Ghost Radar', 'Tailwind CSS', 'Alpine.js']
  },
  {
    id: 'case-mesa-architects',
    title: 'Mesa Architectural Pavilion: Spatial Monograph & Client Inquiry Engine',
    client: 'Mesa Architecture Atelier',
    industry: 'Architecture & Spatial Design',
    year: '2025',
    summary: 'High-aesthetic spatial portfolio with zero-latency image caching and rage-click auditing on complex drawing viewer modals.',
    image: '/src/assets/images/case_study_architecture_1792494971928.jpg',
    metrics: [
      { label: 'Inquiry Form Completion', value: '+41%' },
      { label: 'Average Session Dwell', value: '4m 12s' },
      { label: 'Zero Broken Link Incidents', value: '100%' }
    ],
    challenge: 'Mesa needed to showcase ultra-high-resolution architectural drawings without causing layout shift or frustrating visitors on tablet touchscreens.',
    solution: 'Engineered an installable PWA featuring responsive progressive image meshes, fluid touch pans, and live rage-click alerts on architectural floorplan viewers.',
    technologies: ['TypeScript', 'Vite', 'Service Worker Asset Precaching', 'Tailwind CSS', 'WebP Meshes']
  }
];
