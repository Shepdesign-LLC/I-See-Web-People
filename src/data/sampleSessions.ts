import { VisitorSession, ManagedSite } from '../types';

export const INITIAL_MANAGED_SITES: ManagedSite[] = [
  {
    id: 'site-1',
    name: 'Shepdesign Studio',
    domain: 'shepdesign.com',
    platform: 'WordPress',
    activeVisitors: 4,
    healthStatus: 'healthy',
    ghostFormsSavedToday: 3
  },
  {
    id: 'site-2',
    name: 'Apex Precision Equipment',
    domain: 'apex-equip.io',
    platform: 'Next.js',
    activeVisitors: 7,
    healthStatus: 'attention_needed',
    lastRageClick: '2m ago on [data-checkout-submit]',
    ghostFormsSavedToday: 5
  },
  {
    id: 'site-3',
    name: 'Velvet Roast Coffee Co.',
    domain: 'velvetroast.shop',
    platform: 'Shopify',
    activeVisitors: 12,
    healthStatus: 'high_traffic',
    ghostFormsSavedToday: 8
  },
  {
    id: 'site-4',
    name: 'Solace Wealth Advisors',
    domain: 'solacewealth.com',
    platform: 'Webflow',
    activeVisitors: 2,
    healthStatus: 'healthy',
    ghostFormsSavedToday: 1
  }
];

export const INITIAL_VISITOR_SESSIONS: VisitorSession[] = [
  {
    id: 'sess-101',
    siteId: 'site-1',
    siteName: 'Shepdesign Studio',
    visitorLabel: 'Enterprise Lead (Techstars IP)',
    city: 'Seattle, WA',
    country: 'United States',
    flag: '🇺🇸',
    device: 'desktop',
    browser: 'Chrome 122',
    currentPath: '/work/brand-identity-system',
    durationSeconds: 214,
    status: 'active',
    lastAction: 'Scrolled to case study deliverables breakdown',
    timeAgo: 'Now'
  },
  {
    id: 'sess-102',
    siteId: 'site-1',
    siteName: 'Shepdesign Studio',
    visitorLabel: 'Ghost Lead: Abandoned Form',
    city: 'Chicago, IL',
    country: 'United States',
    flag: '🇺🇸',
    device: 'desktop',
    browser: 'Safari 17.4',
    currentPath: '/contact',
    durationSeconds: 380,
    status: 'ghost_form',
    ghostField: 'email',
    ghostValuePreview: 'marcus.vance@vancemedia.co',
    lastAction: 'Typed contact email then switched tabs',
    timeAgo: '42s ago'
  },
  {
    id: 'sess-103',
    siteId: 'site-2',
    siteName: 'Apex Precision Equipment',
    visitorLabel: 'Frustrated Buyer (Rage Clicks)',
    city: 'Munich',
    country: 'Germany',
    flag: '🇩🇪',
    device: 'mobile',
    browser: 'Mobile Safari',
    currentPath: '/cart/rfq-request',
    durationSeconds: 95,
    status: 'rage_clicking',
    rageClicksCount: 5,
    cartValue: 4800,
    lastAction: 'Rapidly clicked non-responsive "Submit RFQ" button',
    timeAgo: '2m ago'
  },
  {
    id: 'sess-104',
    siteId: 'site-3',
    siteName: 'Velvet Roast Coffee Co.',
    visitorLabel: 'VIP High-Value Cart ($142.50)',
    city: 'Austin, TX',
    country: 'United States',
    flag: '🇺🇸',
    device: 'desktop',
    browser: 'Chrome 122',
    currentPath: '/checkout',
    durationSeconds: 160,
    status: 'active',
    cartValue: 142.5,
    lastAction: 'Hovering over shipping rate calculation',
    timeAgo: '15s ago'
  },
  {
    id: 'sess-105',
    siteId: 'site-3',
    siteName: 'Velvet Roast Coffee Co.',
    visitorLabel: 'First-time Organic Visitor',
    city: 'Toronto, ON',
    country: 'Canada',
    flag: '🇨🇦',
    device: 'mobile',
    browser: 'Chrome Mobile',
    currentPath: '/products/ethiopia-yirgacheffe',
    durationSeconds: 45,
    status: 'active',
    lastAction: 'Viewing single-origin roasting notes',
    timeAgo: '30s ago'
  },
  {
    id: 'sess-106',
    siteId: 'site-4',
    siteName: 'Solace Wealth Advisors',
    visitorLabel: 'Converted Client Inquiry',
    city: 'New York, NY',
    country: 'United States',
    flag: '🇺🇸',
    device: 'desktop',
    browser: 'Edge 121',
    currentPath: '/thank-you',
    durationSeconds: 512,
    status: 'converted',
    lastAction: 'Submitted consultation booking form',
    timeAgo: '5m ago'
  }
];
