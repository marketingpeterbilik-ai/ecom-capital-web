// Jediný zdroj pravdy pre entity webu (Organization + Person) a ich schema.org podobu.
// Používa Base.astro, blog aj stránky služieb, aby všetky odkazy v grafe sedeli na
// rovnaké @id — z toho si vyhľadávače aj jazykové modely skladajú knowledge graph.

export const SITE = {
  name: 'Ecom Capital',
  legalName: 'Ecom Capital s.r.o.',
  email: 'info@ecomcapital.eu',
  ico: '53419952',
  city: 'Bratislava',
  country: 'SK',
  // Doplň reálne profily — sameAs je najsilnejší signál, že entita existuje aj mimo webu.
  sameAs: ['https://www.finstat.sk/53419952'] as string[],
} as const;

/**
 * Overovacie kódy webmaster nástrojov. Vlož iba obsah atribútu `content`
 * z meta tagu, ktorý ti nástroj ponúkne — prázdna hodnota sa nevykreslí.
 * Google Search Console: Nastavenia → Overenie vlastníctva → Značka HTML.
 */
export const VERIFICATION = {
  google: '', // napr. 'AbC123...' z <meta name="google-site-verification" content="…">
  bing: '', // Bing Webmaster Tools → <meta name="msvalidate.01" content="…">
} as const;

/** OG obrázok webu. Rozmery patria do meta tagov aj do schema ImageObject. */
export const OG_IMAGE = { path: '/og.png', width: 1200, height: 630 } as const;

export const AUTHOR = {
  name: 'Peter Bílik',
  jobTitle: 'Performance & data konzultant',
  path: '/o-mne',
} as const;

/** Stabilné @id entít — na ne sa odkazuje zvyšok grafu. */
export const ID = {
  org: (site: URL | undefined) => new URL('/', site).href + '#organization',
  person: (site: URL | undefined) => new URL(AUTHOR.path, site).href + '#person',
  website: (site: URL | undefined) => new URL('/', site).href + '#website',
};

export const KNOWS_ABOUT = [
  'Google Ads',
  'Meta Ads',
  'Performance Max',
  'Google Shopping',
  'Google Analytics 4',
  'server-side tracking',
  'Google Tag Manager',
  'Meta Conversions API',
  'Consent Mode v2',
  'BigQuery',
  'Looker Studio',
  'produktové feedy',
  'Merchant Center',
  'e-commerce analytika',
];

/** Hlavná entita firmy. ProfessionalService je podtyp Organization aj LocalBusiness. */
export function organizationLd(site: URL | undefined) {
  return {
    '@type': 'ProfessionalService',
    '@id': ID.org(site),
    name: SITE.name,
    legalName: SITE.legalName,
    url: new URL('/', site).href,
    logo: {
      '@type': 'ImageObject',
      url: new URL('/brand/logo-primary.svg', site).href,
      caption: SITE.name,
    },
    image: new URL('/og.png', site).href,
    email: SITE.email,
    description:
      'Performance & data štúdio z Bratislavy. Správa PPC kampaní v Google a Meta Ads spojená s meraním: GA4, server-side tracking, BigQuery a reporting v Looker Studio.',
    identifier: [{ '@type': 'PropertyValue', name: 'IČO', value: SITE.ico }],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'Slovensko' },
      { '@type': 'Place', name: 'Európska únia' },
    ],
    knowsLanguage: ['sk', 'cs', 'en'],
    knowsAbout: KNOWS_ABOUT,
    founder: { '@id': ID.person(site) },
    employee: { '@id': ID.person(site) },
    sameAs: SITE.sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE.email,
      areaServed: 'SK',
      availableLanguage: ['sk', 'en'],
    },
  };
}

/** Autor obsahu. Bez identifikovateľného človeka nemá odborný obsah v AI odpovediach váhu. */
export function personLd(site: URL | undefined) {
  return {
    '@type': 'Person',
    '@id': ID.person(site),
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: new URL(AUTHOR.path, site).href,
    email: SITE.email,
    worksFor: { '@id': ID.org(site) },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ['sk', 'cs', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressCountry: SITE.country,
    },
    sameAs: [] as string[], // doplň LinkedIn
  };
}

/** Drobčeky ako štruktúrované dáta — položky sú dvojice [label, href]. */
export function breadcrumbLd(site: URL | undefined, trail: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: new URL(t.href, site).href,
    })),
  };
}

/** Q&A blok. Generatívne vyhľadávače preberajú odpovede po jednej, mimo kontextu. */
export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
