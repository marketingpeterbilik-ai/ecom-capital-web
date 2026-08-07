# Audit webu — priestor na vylepšenie

Dátum: 7. 8. 2026 · Rozsah: celý web (32 vygenerovaných stránok, 12 článkov, 8 launch LP)

GEO vrstvu rieši [GEO-AUDIT.md](GEO-AUDIT.md) — tá je väčšinovo hotová. Tento audit je
o zvyšku: dôveryhodnosť, konverzia, meranie, právne texty, výkon, prístupnosť.

Technický základ je dobrý: 956 kB celý build, žiadny JS framework, čistý SSG,
schema graf drží pokope, obsah je celý v HTML. Čo chýba, nie je kód — sú to
**dôkazy, meranie vlastného webu a dokončené právne texty.**

---

## P0 — beží to naostro a nemalo by

### 1. Doména je stále placeholder

`astro.config.mjs:9` → `site: 'https://ecom-capital-web.pages.dev'`

Z toho tečie canonical, `og:url`, celý sitemap aj všetky `@id` v JSON-LD grafe.
V pätičke a v schema je pritom `peter@ecomcapital.sk`. Zatiaľ existuješ pre Google
aj pre AI modely ako dve polovičné entity.

Toto blokuje všetko ostatné — kým to nie je opravené, nemá zmysel riešiť ani indexáciu,
ani odkazy, ani OG obrázky.

```js
// astro.config.mjs
site: 'https://ecomcapital.sk',
```

A `public/robots.txt` posledný riadok → `Sitemap: https://ecomcapital.sk/sitemap-index.xml`.

> Poznámka: `ecomcapital.sk` sa mi odtiaľto nepodarilo rozresolvovať. Over, či doména
> reálne smeruje na Cloudflare Pages, kým prepneš `site`.

### 2. Právne stránky majú naživo `[DOPLNIŤ: …]`

`/ochrana-osobnych-udajov` — sídlo, IČO, DIČ, IČ DPH, oddiel a vložka v ORSR,
sprostredkovatelia (e-mail, účtovník), retenčná doba. Osem placeholderov.
`/cookies` — dátum účinnosti, názov consent cookie, odkaz na „Nastavenia cookies".

IČO pritom v pätičke aj v `src/data/site.ts` je (53419952) — na privacy stránke stojí
`[DOPLNIŤ]`. Návštevník, ktorý sa tam preklikne, vidí nedokončený web.

**Pre niekoho, kto predáva GDPR consent a cookie lišty, je práve toto tá najhoršia
stránka, ktorú nechať rozrobenú.** Je to prvá vec, na ktorú sa pozrie opatrný klient.

### 3. Cookie stránka popisuje meranie, ktoré na webe nie je

`/cookies` tvrdí: *„Pri prvej návšteve sa zobrazí cookie lišta"* a vymenúva
`_ga`, `_ga_*`, `_gcl_au`, `_fbp` s Consent Mode v2.

Na webe nie je žiadny GTM, žiadne GA4, žiadny Meta Pixel a žiadna cookie lišta.
Preveril som celý `src/` — jediné výskyty sú v textoch článkov a služieb.

Sú to **nepravdivé tvrdenia o spracúvaní údajov**. Dve cesty:

- **(a)** nasadiť meranie a lištu (odporúčam, viď bod 4) — text potom začne sedieť,
- **(b)** stránku prepísať na to, čo platí dnes: web nepoužíva žiadne analytické ani
  marketingové cookies, jediné externé spracovanie je Cal.com pri rezervácii termínu.

Ktorúkoľvek zvolíš, treba to spraviť naraz s bodom 2.

---

## P1 — meranie vlastného webu

### 4. Web performance & data štúdia nemeria nič

Žiadne GA4, žiadny GTM, žiadny server-side tracking. Nevieš:

- ktorá stránka privádza hovory,
- koľko ľudí doklikne kalkulačku a odíde,
- ktorý článok konvertuje,
- či sticky CTA vôbec niekto klikne.

Dve roviny, prečo to opraviť. Praktická: bez dát riadiš web podľa pocitu — presne to,
proti čomu je postavený celý web. Obchodná: **vlastný web je najlacnejšie demo služby
`/cookie-consent` a `/sluzby/meranie`.** Klient, ktorý si otvorí devtools, dnes nevidí nič.

Minimálny setup na jeden večer:

- GTM + GA4 + Consent Mode v2 s default `denied`,
- vlastná cookie lišta (máš k nej stránku aj službu),
- eventy: `booking_success` (Cal.com posiela postMessage — dá sa chytiť do dataLayer),
  `click_mailto`, `calculator_used`, `sticky_cta_click`, `scroll_to_book`.

Cal.com embed API vie:

```js
Cal('on', { action: 'bookingSuccessful', callback: (e) => {
  window.dataLayer?.push({ event: 'booking_success', detail: e.detail });
}});
```

### 5. Cal.com sa načítava na každej stránke

`Booking.astro` je na homepage, `/kontakt`, `/o-mne` a všetkých 6 stránkach služieb.
Na každej z nich sa ťahá `app.cal.com/embed/embed.js` a montuje iframe — aj keď
90 % návštevníkov na tú sekciu nikdy nedoscrolluje.

Je to najväčšia jediná záťaž na webe (inak nemáš žiadny JS bundle) a zároveň
tretia strana, ktorá beží pred akýmkoľvek súhlasom.

Riešenie: načítať embed až pri priblížení k sekcii (`IntersectionObserver`)
alebo na klik („Zobraziť kalendár"). V `CalEmbed.astro` je to ~10 riadkov.

---

## P1 — konverzia

### 6. Neexistuje formulár

Jediné dve cesty ku kontaktu sú **15-minútový hovor** a **mailto odkaz**.

- Hovor je pre studeného návštevníka vysoký záväzok — vyberá si čas, dáva e-mail
  do cudzieho nástroja, blokuje si kalendár.
- `mailto:` otvára poštového klienta, ktorý veľká časť ľudí (Gmail vo webe, firemný
  Outlook bez default handlera) nemá nastavený. Klik jednoducho nespraví nič.

Chýba tretia, najnižšia priečka: **formulár so 4 poľami** (meno, e-mail, web e-shopu,
o čo ide). Na Cloudflare Pages stačí jedna Pages Function + Resend, alebo Formspree
bez backendu.

Toto je podľa mňa najväčší jediný konverzný nedostatok webu.

### 7. Nula dôkazov

Na webe nie je ani jedno meno klienta, ani jedno logo, ani jeden citát, ani jedna
prípadovka. Pritom máš Suzuki, Accace, Amawell, Evergreen Tále, Happy-Time, Readupnow, TNS.

Čísla `€5M+`, `50+ spoluprác`, `10+ EU trhov` sú na homepage **dvakrát** (hero + mission)
a nestojí za nimi nič. Zopakované nedoložené číslo nie je silnejší dôkaz, len hlasnejší.

Poradie podľa účinnosti:

1. **2 citáty od klientov** s menom a firmou — najrýchlejšie, stačí sa spýtať.
2. **2 anonymizované prípadovky** — východisko → zásah → výsledok s číslom a obdobím.
   („Slovenský e-shop s nábytkom, 40 tis. € mesačný spend" je dosť konkrétne.)
3. **Logá klientov** — až keď máš písomné OK.

### 8. Kalkulačka nezbiera nič

Návštevník naklikne rozpočet, uvidí `450 – 600 €` a odíde. CTA vedie na `/kontakt`
bez toho, aby si zobralo čokoľvek zo zadaných hodnôt.

Dva zásahy, oba lacné:

- CTA prenesie výsledok do query stringu a formulár / Cal ho predvyplní
  (bez osobných údajov — len rozpočet, platformy, trhy),
- voliteľné „Poslať odhad na e-mail" = e-mail výmenou za PDF s rozpisom.

### 9. Homepage opakuje tie isté tri štatistiky

`index.astro:41–54` (hero) a `index.astro:205–218` (mission badge) — identické čísla,
identické popisky, 150 px od seba po scrolle. Druhý výskyt nepridáva nič.

Nahradiť ho prvou prípadovkou alebo citátom klienta.

---

## P2 — obsah

### 10. Päť hotových článkov leželo ako draft — ✅ vyriešené 7. 8. 2026

`consent-mode-v2-co-realne-robi`, `hygiena-konverzii-google-ads`,
`novy-vs-vracajuci-sa-zakaznik`, `performance-max-citatelny`,
`vratky-a-ppc-ciste-trzby` sú publikované. Blog má 14 článkov, build 39 stránok.

Otvorené: všetkých päť má `pubDate: 2026-07-31`, takže na `/blog` tvoria blok
s rovnakým dátumom. Ak chceš pravidelnú kadenciu, rozlož ich do nasledujúcich týždňov.

### 11. Launch stránky sú v sitemape a nemali by tam byť

`/hr /si /bg /ee /lv /lt /lu /cy` — 8 anglických LP v sitemape slovenského webu,
bez `hreflang`, bez hlavičky, bez pätičky, bez odkazu na právne stránky a bez cesty
späť na hlavný web.

Vážnejšie sú tvrdenia. `src/data/launches.ts` má v komentári napísané, že
`launchWindow` je **odhad, nie potvrdený rollout Googlu** — ale stránka to podáva
ako fakt: *„Shopping ads open on google.hr in Q4 2026."* K tomu:

- `250K+ products managed across feeds` — doložiteľné?
- `15+ CEE comparison platforms` — doložiteľné?
- **„Not live in 10 working days and the setup is free"** — to je záväzok, ktorý
  platí, aj keď meškanie spôsobí klient (neposkytne prístupy) alebo Google
  (schvaľovanie Merchant Center trvá, ako trvá). Doplniť podmienky, alebo vypustiť.

Čo s tým: buď over rollout dátumy a nechaj ich ako čisté LP pre platený traffic
(→ `noindex`, von zo sitemapy, doplniť pätičku s právnymi odkazmi), alebo ich
z buildu vyhoď, kým nie sú aktuálne. Dnes riedia entitu — polovica sitemapy
slovenského štúdia sú anglické stránky o Chorvátsku.

### 12. Blog nemá RSS ani filtrovanie

`@astrojs/rss` je ~15 riadkov a feed si berú agregátory aj čítačky. Tagy v článkoch
už sú, len sa podľa nich nedá filtrovať.

### 13. Jeden OG obrázok na celý web

Všetko (32 stránok aj 12 článkov) zdieľa `/og.png`. Zdieľaný článok na LinkedIne
vyzerá ako homepage. Generovanie per-článok cez `astro-og-canvas` alebo satori je
jednorazová práca na hodinu.

---

## P2 — výkon a technika

### 14. Fonty z Google CDN

`Base.astro:107–110` ťahá 3 rodiny a 12 rezov z `fonts.googleapis.com`:
render-blocking `<link>`, dva extra DNS + TLS handshaky pred prvým vykreslením textu.

Podľa CSS reálne používaš `400 / 500 / 600 / 700 / 800`. Sora ako display font
potrebuje prakticky len `800`, ostatné rezy sa ťahajú zbytočne.

Dva dôvody na self-hosting:

- **výkon** — odpadne blokujúci externý request, LCP klesne merateľne,
- **konzistencia** — Google Fonts posiela IP návštevníka do USA bez súhlasu.
  Nemecké súdy to už riešili. Web, ktorý predáva cookie lišty a Consent Mode,
  by nemal mať tento problém ako prvý nález pri kontrole.

`@fontsource-variable/sora` + `@fontsource-variable/manrope`, `font-display: swap`,
`<link rel="preload">` na dva reálne použité rezy.

### 15. Nie je tu jediná fotka

`Visual.astro` je zástupná dlaždica — na homepage 4×, na blogových kartách, v mission
sekcii. Chýbajúci asset číslo jedna je **fotka Petra na `/o-mne`**.

Pomôže naraz trom veciam: konverzii (človek namiesto s.r.o.), E-E-A-T a `Person`
schema (`image` pole je dnes prázdne). Web postavený na „pracujete priamo s človekom"
toho človeka neukazuje.

### 16. `StickyCta` prepisuje pätičku globálne

`StickyCta.astro:22–26` má `<style is:global>`, ktorý pridáva `padding-bottom:110px`
na `footer.site`. Komponent siaha mimo seba — na stránkach bez sticky lišty by ten
padding zostal, ak by sa štýl niekedy dostal do spoločného bundlu. Presunúť do
`global.css` pod triedu, ktorú lišta nastaví na `<body>`.

---

## P3 — prístupnosť a drobnosti

- **Mobilné menu** (`Header.astro:82–102`) nezamyká scroll pod otvoreným menu,
  nezatvára sa klikom mimo a nedrží focus vnútri. Escape funguje. ~15 riadkov.
- **Rozbaľovacie Služby** sa otvárajú cez `:hover` / `:focus-within`. Rodičovský
  prvok je zároveň odkaz aj prepínač, bez `aria-haspopup` a `aria-expanded`.
  Na mobile je submenu vždy rozbalené → menu má 11 položiek pod sebou.
- **Karty služieb** používajú `<div class="h3">` namiesto skutočného nadpisu
  (`Service.astro:197`). Vizuálne rovnaké, pre čítačky a osnovu stránky nie.
- **`/404`** nemá `noindex` a nie je nikde meraná — po nasadení GA4 nastaviť event,
  nech vieš o mŕtvych odkazoch.
- **Kontakt nemá telefón.** Pre B2B klienta so 40 tis. € rozpočtom je „napíšte e-mail
  a odpoviem do 48 h" pomalé. Ak telefón nechceš zverejniť, aspoň to pomenuj.

---

## Poradie, keby si mal len tri večery

**Večer 1 — dôveryhodnosť.** Doména v configu a robots (10 min) → dokončiť
`/ochrana-osobnych-udajov` a `/cookies` → zosúladiť cookie text s realitou (bod 3).

**Večer 2 — konverzia.** Formulár so 4 poľami + odoslanie e-mailom → prepnúť
5 draftov na publikované → z homepage vyhodiť duplicitné štatistiky.

**Večer 3 — meranie.** GTM + GA4 + Consent Mode v2 + vlastná lišta, eventy na
booking, mailto a kalkulačku. Web sa tým stane demom vlastnej služby.

Prvý krok do 10 minút: otvor `astro.config.mjs`, prepíš `site` na reálnu doménu,
oprav posledný riadok `public/robots.txt`, `npm run build`.
