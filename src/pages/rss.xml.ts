// /rss.xml — feed článkov. Berú si ho čítačky, agregátory aj časť AI crawlerov,
// ktoré cez feed zisťujú, že pribudol nový obsah, skôr než prelezú celý web.
// Písané ručne, bez závislosti — feed je pár riadkov XML a nemá čo pribúdať.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { AUTHOR, SITE } from '../data/site';

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((p) => {
      const url = abs(`/blog/${p.id}`);
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
      <dc:creator>${esc(AUTHOR.name)}</dc:creator>
${p.data.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)} — blog</title>
    <link>${abs('/blog')}</link>
    <description>Praktické články o PPC, meraní, trackingu a dátach v BigQuery. Z reálnej praxe, po slovensky.</description>
    <language>sk-sk</language>
    <copyright>${esc(SITE.legalName)}</copyright>
    <lastBuildDate>${(posts[0]?.data.pubDate ?? new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
