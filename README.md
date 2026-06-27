# Ecom Capital — web

Performance & data štúdio (PPC, meranie, BigQuery). Postavené na **[Astro](https://astro.build)**, hostované zadarmo na **Cloudflare Pages**.

## Čo to obsahuje

- Statické stránky: Domov, Služby, Dáta & BigQuery, Kalkulačka ceny, Proces, O mne, Kontakt
- **Blog** — články píšeš ako markdown súbory v `src/content/blog/`
- **Kalkulačka ceny** — interaktívna (vanilla JS)
- **Kontakt cez Cal.com** — návštevník si rovno rezervuje hovor
- SEO: sitemap, robots.txt, canonical + OG meta tagy

## Lokálny vývoj

```bash
npm install      # raz na začiatku
npm run dev      # spustí web na http://localhost:4321
npm run build    # vyrobí produkčnú verziu do dist/
npm run preview  # náhľad produkčného buildu
```

Potrebuješ Node 18+ (odporúčané 22, viď `.nvmrc`).

## Štruktúra

```
src/
  pages/            # každý súbor = jedna URL (index.astro = /, sluzby.astro = /sluzby ...)
    blog/           # /blog a /blog/[slug]
  layouts/Base.astro    # spoločná hlavička, päta, <head>
  components/        # Header.astro, Footer.astro
  content/blog/      # ČLÁNKY — markdown súbory
  styles/global.css  # všetky štýly
public/             # statické súbory (favicon, robots.txt) — kopírujú sa 1:1
```

## Ako pridať článok na blog

Vytvor nový `.md` súbor v `src/content/blog/`, napr. `moj-clanok.md`:

```markdown
---
title: "Názov článku"
description: "Krátky popis do prehľadu a SEO."
pubDate: 2026-07-01
tags: ["ppc", "tracking"]
draft: false
---

Tu píšeš obsah článku v **markdowne**.

## Podnadpis

Text, [odkazy](/sluzby), zoznamy...
```

Súbor commitni a pushni — Cloudflare to nasadí automaticky. URL bude `/blog/moj-clanok`.

## Nastav si Cal.com (kontakt)

1. Zaregistruj sa zadarmo na [cal.com](https://cal.com) a vytvor si event type (napr. „Konzultácia").
2. Tvoj link má tvar `pouzivatel/typ-eventu`, napr. `ecom-capital/konzultacia`.
3. V súbore `src/pages/kontakt.astro` zmeň konštantu `CAL_LINK` na svoj link.

## Pred spustením naživo zmeň

- `astro.config.mjs` → `site` na svoju reálnu doménu
- `public/robots.txt` → URL sitemapy
- `src/pages/kontakt.astro` → `CAL_LINK`
- E-mail `peter@ecomcapital.sk` a IČO v `src/components/Footer.astro` a `src/pages/kontakt.astro`

## Nasadenie na Cloudflare Pages

Pozri [DEPLOY.md](DEPLOY.md).
