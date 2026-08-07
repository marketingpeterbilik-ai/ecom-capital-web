// /llms.txt — stručný, strojovo čitateľný prehľad entity pre jazykové modely.
// Generuje sa z rovnakých dát ako web, takže sa nemôže rozísť s obsahom.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, AUTHOR } from '../data/site';

const services: { path: string; name: string; note: string }[] = [
  {
    path: '/sluzby/ppc',
    name: 'Správa PPC kampaní',
    note: 'Google Ads (Search, Shopping, Performance Max) a Meta Ads vrátane produktových feedov. Meranie je súčasťou ceny, optimalizuje sa podľa marže, nie podľa ROAS vykázaného platformou.',
  },
  {
    path: '/sluzby/meranie',
    name: 'Meranie & tracking',
    note: 'GA4, server-side tracking cez sGTM, Meta CAPI, enhanced conversions a Consent Mode v2.',
  },
  {
    path: '/data',
    name: 'Dáta & BigQuery',
    note: 'Dátový sklad v BigQuery, blended ROAS, CAC, LTV a marža naprieč kanálmi, dashboardy v Looker Studio.',
  },
  {
    path: '/sluzby/automatizacia',
    name: 'AI automatizácia',
    note: 'Automatizácia firemných procesov, prepojenie CRM, e-shopu a skladu.',
  },
  {
    path: '/sluzby/audit',
    name: 'Audit & konzultácie',
    note: 'Nezávislé posúdenie reklamných účtov, merania a stratégie s akčným plánom podľa dopadu.',
  },
  {
    path: '/cookie-consent',
    name: 'Cookie lišta & Consent Mode v2',
    note: 'Nasadenie CMP certifikovanej Googlom vrátane testov oboch scenárov súhlasu.',
  },
];

export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const body = `# ${SITE.name}

> Slovenské performance & data štúdio so sídlom v Bratislave (${SITE.legalName}, IČO ${SITE.ico}).
> Spravuje PPC kampane v Google a Meta Ads a stavia meranie, na ktorom kampane stoja:
> GA4, server-side tracking, BigQuery a reporting v Looker Studio.
> Za štúdiom stojí ${AUTHOR.name}, ${AUTHOR.jobTitle.toLowerCase()}.

Ako to funguje: meranie je súčasťou ceny správy, nie príplatok. Kampane sa
optimalizujú podľa príspevkovej marže, nie podľa ROAS vykázaného platformou.
Spolupráca je bez viazanosti a beží z mesiaca na mesiac. Reklamné účty, prístupy
aj dáta zostávajú klientovi aj po skončení spolupráce.

Klienti sú prevažne e-shopy na Slovensku a v strednej Európe. Komunikácia
prebieha v slovenčine, češtine a angličtine.

## Služby
${services.map((s) => `- [${s.name}](${abs(s.path)}): ${s.note}`).join('\n')}

## O štúdiu
- [O mne](${abs(AUTHOR.path)}): kto za prácou stojí a s čím má prax
- [Prehľad služieb](${abs('/sluzby')}): všetkých šesť služieb na jednom mieste
- [Proces](${abs('/proces')}): päť krokov od prvého hovoru po pravidelný rast
- [Kalkulačka ceny](${abs('/kalkulacka')}): orientačné cenové pásma správy PPC
- [Slovník pojmov](${abs('/slovnik')}): definície PNO, blended ROAS, sGTM, CAC a ďalších
- [Kontakt](${abs('/kontakt')}): rezervácia nezáväznej 15-minútovej konzultácie

## Články
${posts.map((p) => `- [${p.data.title}](${abs(`/blog/${p.id}`)}): ${p.data.description}`).join('\n')}

## Kontakt
- E-mail: ${SITE.email}
- Lokalita: ${SITE.city}, Slovensko
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
