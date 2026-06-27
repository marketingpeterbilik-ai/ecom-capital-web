// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// IMPORTANT: zmeň na svoju reálnu doménu, keď ju budeš mať.
// Cloudflare Pages ti dá adresu typu https://ecom-capital-web.pages.dev
export default defineConfig({
  site: 'https://ecom-capital-web.pages.dev',
  integrations: [sitemap()],
});
