# GEO audit — ecomcapital.sk

Dátum: 31. 7. 2026 · Rozsah: celý web (Astro, 15 stránok + 7 článkov)

GEO = optimalizácia pre generatívne vyhľadávače (ChatGPT Search, Perplexity, Google AI
Overviews, Claude). Tie nehodnotia backlinky ani keyword density. Hodnotia:
**či ťa vedia identifikovať ako entitu**, **či majú čo doslova odcitovať** a
**či je za obsahom doložiteľný človek**.

Celkovo: technický základ je nadpriemerný (JSON-LD, canonical, sitemap, SSR obsah,
FAQ schema na blogu). Slabina je entita a citovateľnosť.

---

## P0 — spraviť ako prvé

### 1. Doména je stále placeholder

`astro.config.mjs:9` → `site: 'https://ecom-capital-web.pages.dev'`

Z toho vyplýva všetko ostatné: canonical, `og:url`, `Organization.url`, `WebSite.url`,
sitemap aj `mainEntityOfPage` v článkoch ukazujú na pages.dev. Ak beží aj
`ecomcapital.sk`, existuješ pre AI modely ako dve polovičné entity a ani jedna nemá
brand signál. E-mail v pätičke je pritom `peter@ecomcapital.sk` — nesúlad.

```js
// astro.config.mjs
site: 'https://ecomcapital.sk',
```

A v `public/robots.txt` prepísať sitemap URL.

### 2. Nikde nie je človek

Web nespomína Petra Bílika ani raz mimo e-mailovej adresy. Články majú
`author: { '@type': 'Organization' }`. Stránka `/o-mne` je redirect na `/`.

Toto je najväčší GEO deficit. Generatívne vyhľadávače pri odbornej téme
uprednostňujú zdroj s identifikovateľným autorom a doložiteľnou praxou. „Ecom
Capital s.r.o." bez človeka je pre model neoveriteľná firma.

Čo doplniť:

- stránku `/o-mne` (zrušiť redirect) s `Person` schema: meno, `jobTitle`,
  `worksFor`, `knowsAbout` (Google Ads, Meta Ads, GA4, server-side tracking,
  BigQuery), `alumniOf`, `sameAs` → LinkedIn,
- konkrétnu prax v texte, nie v číslach bez kontextu: multi-market e-commerce,
  8+ CEE trhov, roky praxe, typy účtov,
- `author: { '@type': 'Person', name: 'Peter Bílik', url: '/o-mne' }` vo všetkých
  článkoch (`src/pages/blog/[...slug].astro:35`),
- podpis autora vizuálne pod článkom, nielen v schema.

### 3. Organization schema je takmer prázdna

`src/layouts/Base.astro:29–41` má len name, legalName, url, logo, description,
areaServed. Chýbajú presne tie polia, z ktorých sa stavia knowledge graph:

```js
const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': siteUrl + '#organization',
  name: 'Ecom Capital',
  legalName: 'Ecom Capital s.r.o.',
  url: siteUrl,
  logo: new URL('/og.png', Astro.site).href,
  image: new URL('/og.png', Astro.site).href,
  email: 'peter@ecomcapital.sk',
  description: '…',
  identifier: [{ '@type': 'PropertyValue', name: 'IČO', value: '53419952' }],
  vatID: 'SK…',            // ak si platca
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bratislava',
    addressCountry: 'SK',
  },
  founder: { '@type': 'Person', name: 'Peter Bílik', url: siteUrl + 'o-mne' },
  foundingDate: '2021',     // podľa reálneho zápisu
  areaServed: [{ '@type': 'Country', name: 'Slovensko' }, { '@type': 'Place', name: 'Európska únia' }],
  knowsAbout: [
    'Google Ads', 'Meta Ads', 'Performance Max', 'Google Analytics 4',
    'server-side tracking', 'Google Tag Manager', 'BigQuery',
    'Looker Studio', 'Consent Mode v2', 'produktové feedy',
  ],
  sameAs: ['https://www.linkedin.com/in/…', 'https://www.finstat.sk/53419952'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'peter@ecomcapital.sk',
    availableLanguage: ['sk', 'en'],
  },
};
```

`sameAs` na LinkedIn + Finstat/ORSR je najlacnejší spôsob, ako firmu previazať
s overiteľnými zdrojmi — modely to používajú na potvrdenie existencie subjektu.

Pozor na nesúlad: `areaServed: 'SK'`, ale homepage tvrdí „10+ EU trhov".

### 4. Cena nie je v HTML

`/kalkulacka` počíta všetko v klientskom JS. V zdrojovom HTML je `<div class="price">…</div>`
a text „vyberte aspoň jednu platformu". Sadzba 30 €/h a floor 150 € sú len v skripte.

Query typu „koľko stojí správa PPC na Slovensku" je jedna z najčastejších, na ktoré
AI odpovedá — a z tvojho webu nemá čo zobrať.

Doplniť pod kalkulačku statickú tabuľku pásiem (rozpočet → orientačná mesačná cena
→ jednorazové nastavenie) v HTML, plus `Offer` / `PriceSpecification` v schema.
Nemusí to byť záväzné, stačí rozpätie s poznámkou.

---

## P1 — vysoký dopad, malá práca

### 5. Service stránky nemajú žiadnu schema

Šesť stránok služieb (`/sluzby/ppc`, `/sluzby/meranie`, `/data`,
`/sluzby/automatizacia`, `/sluzby/audit`, `/cookie-consent`) posiela do `Base` len
title a description. `Service.astro` má `jsonLd` prop pripravený a nikto ho nepoužíva.

Pre každú:

```js
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': new URL('/sluzby/ppc', Astro.site).href + '#service',
  name: 'Správa PPC kampaní',
  serviceType: 'Správa Google Ads a Meta Ads',
  description: '…',
  provider: { '@id': new URL('/', Astro.site).href + '#organization' },
  areaServed: { '@type': 'Country', name: 'Slovensko' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Čo správa zahŕňa',
    itemListElement: items.map((i) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: i.t, description: i.d },
    })),
  },
};
```

`items` už v každej stránke existujú — dá sa to vygenerovať priamo v `Service.astro`
z propov, bez ručného písania na šiestich miestach.

### 6. Žiadny BreadcrumbList

Drobčeky sú vizuálne (`Služby / PPC` v `Service.astro:82`), ale bez schema.
Pridať `BreadcrumbList` do `Service.astro` — jeden zásah pokryje 6 stránok.

### 7. FAQ len na blogu, na službách chýba

`FAQPage` schema beží iba v článkoch. Pritom práve service stránky majú odpovedať
na komerčné otázky, ktoré ľudia píšu do ChatGPT:

- Koľko stojí správa PPC pre e-shop?
- Je meranie v cene správy, alebo sa platí zvlášť?
- Ako dlho trvá, kým sa prejavia výsledky?
- Musím podpisovať viazanosť?
- Kto vlastní účty a dáta po skončení spolupráce?
- Oplatí sa server-side tracking pri malom e-shope?

`Service.astro` má pridať prop `faq` (rovnaký tvar ako v blogu: `{q, a}`) a
vyrenderovať ho aj do HTML, aj do `FAQPage`. Odpovede písať ako samostatne stojace
vety — model ich vyberá po jednej, bez kontextu okolo.

### 8. Chýba `/llms.txt`

Nový, ale už rešpektovaný štandard: jeden markdown súbor, z ktorého si model
vytiahne, kto si, čo robíš a kam ísť pre detail. Nízka cena, priamy efekt.

`public/llms.txt`:

```
# Ecom Capital

> Slovenské performance & data štúdio (Bratislava). Správa PPC kampaní
> v Google a Meta Ads spojená s meraním: GA4, server-side tracking, BigQuery.
> Zakladateľ: Peter Bílik. IČO 53419952.

Meranie je súčasťou ceny správy, spolupráca je bez viazanosti,
účty a dáta zostávajú klientovi.

## Služby
- [Správa PPC kampaní](https://ecomcapital.sk/sluzby/ppc): Google + Meta Ads, feedy, týždenná optimalizácia
- [Meranie & tracking](https://ecomcapital.sk/sluzby/meranie): GA4, sGTM, Meta CAPI, Consent Mode v2
…

## Články
- [Tri typy marže a prečo neoptimalizovať podľa PNO](…)
…

## Kontakt
peter@ecomcapital.sk
```

### 9. robots.txt nerieši AI crawlerov explicitne

`Allow: /` ich technicky pustí, ale menovité povolenie je jasný signál a poistka
proti neskorším default-deny pravidlám:

```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://ecomcapital.sk/sitemap-index.xml
```

(`Google-Extended` riadi použitie obsahu v Gemini a AI Overviews — ak ho nepovolíš
explicitne, časť Googlu obsah do generatívnych odpovedí nepustí.)

---

## P2 — obsahová vrstva

### 10. Čísla na homepage nemajú krytie

„€5M+ spravovaného spendu", „50+ úspešných spoluprác", „10+ EU trhov" —
bez zdroja, bez mien klientov, bez jediného prípadu. Generatívne modely nedoložené
tvrdenia buď ignorujú, alebo ich uvedú s hedgingom („podľa vlastných údajov").

Najsilnejší citovateľný formát, ktorý na webe úplne chýba, sú **case studies**:
východisko → zásah → výsledok s číslom a obdobím. Aj dve anonymizované
(„slovenský e-shop s nábytkom, 40 tis. € mesačný spend") sú výrazne lepšie ako nič,
a dajú sa oštítkovať `CaseStudy` / `Article` schema.

### 11. Definičný obsah chýba

Generatívne odpovede sa najčastejšie stavajú z definícií. Máš 7 článkov, všetky
dobré a s FAQ — ale žiadnu definičnú vrstvu. Slovník na `/slovnik` s krátkymi
heslami (PNO, blended ROAS, príspevková marža, sGTM, Consent Mode v2, CAC, LTV,
Performance Max, custom labels) je pre GEO neúmerne účinný k prácnosti: každé heslo
je 60–100 slov, `DefinedTerm` + `DefinedTermSet` schema, a interne linkuje na službu.

### 12. Text na service stránkach je fragmentovaný

Karty typu „Google Ads — Search, Shopping a Performance Max. Štruktúra účtu, bidding
stratégie a rozpočtový pacing." sú marketingovo dobré, ale citovateľne zlé — nie sú
to celé vety s podmetom a prísudkom. Model potrebuje úsek, ktorý po vytrhnutí
z kontextu stále dáva zmysel.

Riešenie nie je prepísať karty, ale pridať na každú service stránku jeden
súvislý odstavcový blok (150–250 slov), ktorý vysvetlí službu vetami:
„Správa PPC kampaní v Ecom Capital znamená, že… Meranie je súčasťou ceny, pretože…"

### 13. Drobnosti

- **Články nemajú vlastný OG obrázok** — všetko ide na `/og.png`. Aspoň
  `width`/`height` v `ImageObject` a ideálne per-článok obrázok.
- **Statické stránky nemajú `WebPage` schema s `dateModified`** — čerstvosť je
  pri AI odpovediach rankingový signál. Doplniť do `Base.astro` cez prop.
- **`/kontakt` nemá `ContactPage` ani `ContactPoint`**, chýba telefón.
- **Blog nemá kontextové interné odkazy na služby** — len CTA band na konci.
  Odkaz z odseku o server-side trackingu na `/sluzby/meranie` pomáha modelu spojiť
  tému so službou.
- **`WebSite` schema nemá `publisher`** — doplniť referenciu na `#organization`,
  aby graf držal pokope.
- **Overiť indexáciu** — pri pages.dev doméne je pravdepodobné, že web zatiaľ
  nie je poriadne zaindexovaný ani v Google, nieto v AI indexoch.

---

## Čo je v poriadku

- Obsah je server-rendered, `reveal` animácie sú gatované cez `html.js` — bez JS
  je všetko viditeľné. Crawlerom nič neuniká.
- Canonical, OG, twitter card, `inLanguage: sk-SK`, sitemap integrácia — sedí.
- `BlogPosting` + `FAQPage` na článkoch vrátane `dateModified` — presne to, čo GEO chce.
- Články sú vecné, dlhé, s vlastným názorom a číslami. To je práve typ obsahu, ktorý
  modely radi citujú. Problém nie je kvalita, ale objem (7 kusov) a chýbajúci autor.
- Nadpisová štruktúra je čistá, jeden H1 na stránku.

---

## Stav implementácie (31. 7. 2026)

| # | Zásah | Stav |
|---|---|---|
| 1 | Reálna doména v `astro.config.mjs` + robots.txt | ⛔ čaká na potvrdenie domény |
| 2 | Rozšírená `Organization` schema (`src/data/site.ts`) | ✅ hotové |
| 3 | `/llms.txt` (generuje sa z obsahu, `src/pages/llms.txt.ts`) | ✅ hotové |
| 4 | AI crawlery v robots.txt | ✅ hotové |
| 5 | `Service` + `BreadcrumbList` schema v `Service.astro` | ✅ hotové |
| 6 | Stránka `/o-mne` s `Person` schema + autor v článkoch | ✅ hotové |
| 7 | FAQ blok + `FAQPage` na 6 service stránok | ✅ hotové |
| 8 | Cenové pásma staticky v HTML na `/kalkulacka` + `Offer` | ✅ hotové |
| 9 | Súvislý odsekový text na service stránkach (`summary`) | ✅ hotové |
| 10 | Slovník pojmov `/slovnik` s `DefinedTermSet` (18 hesiel) | ✅ hotové |
| 11 | `ContactPage` + `ContactPoint` na `/kontakt` | ✅ hotové |
| 12 | Dve case studies | ⛔ potrebuje reálne čísla od klientov |
| 13 | Čísla na homepage doložiť alebo zmierniť | ⛔ rozhodnutie Petra |

### Čo ešte treba doplniť ručne

- **`astro.config.mjs`** — `site` na reálnu doménu, potom aj sitemap URL v `public/robots.txt`.
- **`src/data/site.ts`** — `SITE.sameAs` (LinkedIn firmy) a `personLd().sameAs` (osobný
  LinkedIn). Bez nich má entita len jeden externý dôkaz existencie (Finstat).
- **`src/data/site.ts`** — `foundingDate` firmy, ak ho chceš uviesť.
- **`/o-mne`** — text je napísaný len z overiteľných tvrdení, bez mien zamestnávateľov
  a bez konkrétnych čísel praxe. Doplň, čo považuješ za vhodné zverejniť (roky praxe,
  referencie, certifikácie) — práve tie zvyšujú váhu v AI odpovediach najviac.
