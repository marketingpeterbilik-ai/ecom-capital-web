// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Produkčná doména. Z tejto hodnoty tečie canonical, og:url, sitemap
// aj všetky @id v JSON-LD grafe — meniť ju len spolu s robots.txt.
const SITE_URL = 'https://ecomcapital.eu';

// Priorita a frekvencia podľa sekcie. Google priority ignoruje, Bing a časť
// AI crawlerov nie — a lastmod berie vážne každý.
const BUILD_DATE = new Date();

// Reálny dátum revízie článkov do sitemapy. Keby všetky URL hlásili dátum
// posledného buildu, lastmod prestane niesť informáciu — a vyhľadávače ho
// pri zjavne nepravdivých hodnotách začnú ignorovať.
const BLOG_DIR = new URL('./src/content/blog', import.meta.url).pathname;

/** @type {Map<string, string>} */
const postDates = new Map();
for (const file of fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR) : []) {
  if (!file.endsWith('.md')) continue;
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8').slice(0, 1200);
  const updated = raw.match(/^updatedDate:\s*['"]?([0-9-]{10})/m);
  const published = raw.match(/^pubDate:\s*['"]?([0-9-]{10})/m);
  const date = updated?.[1] ?? published?.[1];
  if (date) postDates.set(`/blog/${file.replace(/\.md$/, '')}`, new Date(date).toISOString());
}

/** @param {string} url */
function sectionMeta(url) {
  const path = new URL(url).pathname;
  if (path === '/') return { priority: 1.0, changefreq: /** @type {const} */ ('weekly') };
  if (path.startsWith('/blog/')) return { priority: 0.7, changefreq: /** @type {const} */ ('monthly') };
  if (path === '/blog') return { priority: 0.8, changefreq: /** @type {const} */ ('weekly') };
  if (path.startsWith('/sluzby') || path === '/data' || path === '/cookie-consent')
    return { priority: 0.9, changefreq: /** @type {const} */ ('monthly') };
  if (path === '/kontakt' || path === '/o-mne' || path === '/kalkulacka')
    return { priority: 0.8, changefreq: /** @type {const} */ ('monthly') };
  if (path === '/cookies' || path === '/ochrana-osobnych-udajov')
    return { priority: 0.3, changefreq: /** @type {const} */ ('yearly') };
  return { priority: 0.6, changefreq: /** @type {const} */ ('monthly') };
}

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      // 404 ani presmerovanie do sitemapy nepatria; launch LP a /cookie-consent tam
      // zostávajú zámerne.
      filter: (page) => !page.includes('/404') && !page.includes('/sluzby/feedy'),
      serialize(item) {
        // Sitemap musí uvádzať presne tie URL, ktoré sú v canonical — inak si
        // vyhľadávač vyberá medzi dvoma tvarmi tej istej adresy. Astro generuje
        // adresáre s koncovou lomkou, Cloudflare Pages ich servuje bez nej.
        const url = new URL(item.url);
        url.pathname = url.pathname.replace(/\/+$/, '') || '/';
        const { priority, changefreq } = sectionMeta(url.href);
        return {
          ...item,
          url: url.href,
          priority,
          changefreq: /** @type {import('sitemap').EnumChangefreq} */ (changefreq),
          lastmod: postDates.get(url.pathname) ?? item.lastmod ?? BUILD_DATE.toISOString(),
        };
      },
    }),
  ],
  redirects: {
    '/sluzby/feedy': '/sluzby/ppc',
  },
});
