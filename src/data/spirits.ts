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
    inkNote: 'Lost midway through an agonizing multi-step checkout form with no local cache. Recovered via service worker prefetching and streamlined payment sheet.',
    pageHaunted: '/services/offline-first-pwa',
    dwellDuration: '2m 45s'
  }
];
