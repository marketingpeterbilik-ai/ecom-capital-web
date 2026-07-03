// Per-market data for the Google Shopping launch landing pages (src/pages/[slug].astro).
// Add a new market by adding one entry here — no other file needs to change.
//
// `launchWindow` is a placeholder estimate, not a confirmed Google rollout date.
// Verify each one against the actual Google Merchant Center / Ads rollout status
// for that country before running paid traffic to the page.

export interface CountryLaunch {
  slug: string;
  countryName: string;
  adjective: string;
  googleDomain: string;
  launchWindow: string;
}

export const launches: CountryLaunch[] = [
  {
    slug: 'hr',
    countryName: 'Croatia',
    adjective: 'Croatian',
    googleDomain: 'google.hr',
    launchWindow: 'Q4 2026',
  },
  {
    slug: 'si',
    countryName: 'Slovenia',
    adjective: 'Slovenian',
    googleDomain: 'google.si',
    launchWindow: 'Q4 2026',
  },
  {
    slug: 'bg',
    countryName: 'Bulgaria',
    adjective: 'Bulgarian',
    googleDomain: 'google.bg',
    launchWindow: 'Q1 2027',
  },
  {
    slug: 'ee',
    countryName: 'Estonia',
    adjective: 'Estonian',
    googleDomain: 'google.ee',
    launchWindow: 'Q1 2027',
  },
  {
    slug: 'lv',
    countryName: 'Latvia',
    adjective: 'Latvian',
    googleDomain: 'google.lv',
    launchWindow: 'Q1 2027',
  },
  {
    slug: 'lt',
    countryName: 'Lithuania',
    adjective: 'Lithuanian',
    googleDomain: 'google.lt',
    launchWindow: 'Q4 2026',
  },
  {
    slug: 'lu',
    countryName: 'Luxembourg',
    adjective: 'Luxembourg',
    googleDomain: 'google.lu',
    launchWindow: 'Q4 2026',
  },
  {
    slug: 'cy',
    countryName: 'Cyprus',
    adjective: 'Cypriot',
    googleDomain: 'google.com.cy',
    launchWindow: 'Q1 2027',
  },
];
