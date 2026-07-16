# Redesign plán — ecom capital (júl 2026)

Zdroj dizajnu: **„HR Launch — v2 Focused"** (`src/styles/launch.css` + `src/pages/[slug].astro`).
Cieľ: preniesť jeho hierarchiu a vizuál na celý hlavný web a vyriešiť, že z webu nie je jasné, čo sa reálne predáva.

## Rozhodnutia (potvrdené Petrom)

1. **Hlavná ponuka: PPC + meranie ako jeden balík.** Dáta/BigQuery sú *diferenciátor*, nie samostatná ponuka. Feedy, automatizácia, cookie lišta, audit = podporné moduly.
2. **Rozsah: celý web** (všetkých 8 stránok + Header/Footer + blog šablóny).
3. **Dôkazy:** proof strip z launch stránok sa použije aj na SK webe, ale `250K+ produktov` sa nahradí počtom úspešných spoluprác.

## Diagnóza — prečo to teraz „pôsobí čudne"

| Problém | Kde | Dôsledok |
|---|---|---|
| 7 rovnocenných kariet bez hierarchie | [sluzby.astro](src/pages/sluzby.astro) | Návštevník nevie, čo je hlavná služba a čo doplnok |
| Hero sľubuje „stack pod jednou strechou", nie výsledok | [index.astro:13](src/pages/index.astro:13) | Abstraktné; nehovorí, čo klient dostane |
| Žiadny dôkaz nad úrovňou tvrdení | index.astro stats (`30 €/h`, `1 kontakt`) | Sadzba ako hlavný „proof" tlačí na cenu, nie na hodnotu |
| Cookie-consent karta prebíja PPC | [sluzby.astro:20](src/pages/sluzby.astro:20) | Vedľajšia služba vyzerá ako hlavná |
| Light hero všade | `.hero`, `.phero` | Chýba kontrast a ťah launch stránok (`.lp-hero`) |
| Každá stránka končí rovnakým `.ctaband` | všetky | Žiadna gradácia — CTA nemá váhu |

## Fáza 1 — Design system: povýšiť launch.css na zdieľané komponenty

`launch.css` má komponenty, ktoré hlavný web nemá. Presunúť ich z `lp-` prefixu do `global.css` ako zdieľané, `launch.css` nechať len na Shopping-špecifiká (SERP mock, kalkulačka launchu).

Presunúť a premenovať:

| z launch.css | na global.css | použitie |
|---|---|---|
| `.lp-hero` + `.lp-hero-orb` | `.hero--ink` (modifikátor `.hero`) | tmavý hero pre home + service pages |
| `.lp-chip` + `.lp-chip-dot` | `.chip--live` | „NOVÉ / od 03/2024" štítky |
| `.lp-proof` / `.lp-proof-item` | `.proof` / `.proof-item` | proof strip pod hero |
| `.lp-facts` / `.lp-fact` | `.facts` / `.fact` | 3-stĺpcové tmavé fakty |
| `.lp-stack-list` / `.lp-stack-row` | `.stack-list` / `.stack-row` | „čo dostaneš" zoznam namiesto kariet |
| `.lp-proc-card` + `.lp-proc-row` | `.proc-card` / `.proc-row` | sticky timeline vedľa obsahu |
| `.lp-guarantee` | `.guarantee` | záruka („10 dní alebo setup zadarmo") |
| `.lp-sticky` | `.sticky-cta` | spodná CTA lišta (len home + sluzby) |
| `.lp-mini-stats` | `.mini-stats` | kompaktné čísla v „prečo ja" karte |

Pravidlá:
- `launch.css` po refaktore importuje `global.css` a definuje už len `.lp-serp*`, `.lp-calc*`, `.lp-nav*`, `.lp-foot*`. Existujúcich 8 launch stránok musí vyzerať **identicky ako teraz** — je to čistý refaktor, nie redizajn.
- Tokeny v `:root` zostávajú (`--lime`, `--forest`, `--canvas`…). Pridať `--coral:#FF7759` z launch.css do global.css a odstrániť ho z launch.css.
- Zachovať `html.js .reveal` vzor a `prefers-reduced-motion` bloky.

## Fáza 2 — Home page (`src/pages/index.astro`)

Nová štruktúra, sekcia po sekcii:

1. **Hero — tmavý (`.hero--ink`), jedna správa, jedno CTA.**
   - Chip: `PPC + MERANIE · BRATISLAVA`
   - H1: „Spravujem PPC na číslach, ktorým sa dá **veriť**." (lime highlight na poslednom slove, ako `.lp-hero h1 .hl`)
   - Sub: jedna veta o tom, že reklama aj meranie sedia u jedného človeka a rozhodnutia idú z BigQuery, nie z odhadu.
   - CTA: **jedno** primárne → `/kontakt` („Rezervovať bezplatnú konzultáciu"). `cta-note` monospace: `ZDARMA · NEZÁVÄZNE · ODPOVEĎ DO 48 H`.
   - Sekundárny odkaz „Spočítať cenu" ako textový link, nie druhé tlačidlo.
2. **Proof strip** (`.proof`, hneď pod hero, v tmavom):
   - `10+` EU trhov so živými kampaňami
   - `€5M+` spravovaný spend v Google & Meta
   - `50+` úspešných spoluprác (potvrdené Petrom)
   - `10 dní` od prístupov po spustenie
3. **Pipeline** (`.pipe-shell`) — **ponechať**, je to signature prvok a jediné miesto, kde je ponuka vizuálne vysvetlená. Presunúť pod proof strip ako samostatnú svetlú sekciu s nadpisom „Ako to funguje".
4. **Ponuka — hierarchia namiesto 3 rovnakých kariet:**
   - Jedna veľká karta: **Správa PPC + meranie** (hlavný balík, čo obsahuje, pre koho).
   - Pod ňou `.stack-list` s 4 riadkami doplnkov: meranie & tracking / dáta & BigQuery / feedy / cookie lišta — každý s odkazom na detail.
5. **Prečo ja** (`.lp-why` → `.why`): text vľavo, `.mini-stats` vpravo. Nahrádza súčasný `.split` s `.feat` riadkami.
6. **Cookie-consent sekcia** — ponechať (`.sec--ink`), je to funkčný lead magnet, ale skrátiť na 3 fakty v `.facts` mriežke.
7. **Booking** (`.lp-book` vzor) — checklist „čo sa stane na hovore" + `CalEmbed`. Nahrádza generický `.ctaband`.
8. **`.sticky-cta`** dole.

Zrušiť: `.stats` blok so `30 €/h` (sadzba patrí na `/kalkulacka`, nie do hero zóny).

## Fáza 3 — `/sluzby`

Prestavať zo 7 rovnocenných kariet na **1 hlavná + 4 doplnky + 2 jednorazovky**:

- `.hero--ink` + chip „Služby", H1 „Reklama a meranie z jednej ruky."
- **Hlavný balík** — veľká karta na plnú šírku: Správa PPC + meranie. Obsah: čo je v cene, ako prebieha týždeň, čo klient dostane. CTA `/kontakt`.
- **Doplnky** (`.stack-list`, nie karty): Meranie & tracking · Dáta & BigQuery · Produktové feedy · Automatizácia. Každý 1–2 vety + link na detail.
- **Jednorazové projekty** (`.grid-2`): Audit & konzultácie · Cookie lišta & Consent Mode v2. Cookie lišta ostáva, ale **prestáva byť prvá karta na stránke** — presúva sa sem.
- `.proc-card` sticky vpravo s 5-krokovým procesom (prevzatý z `/proces`) → prepojí ponuku s priebehom.
- Koniec: booking sekcia, rovnaká ako na home.

## Fáza 4 — ostatné stránky

| Stránka | Zmena |
|---|---|
| `/data` | `.phero` → `.hero--ink`. Sekcie ponechať, obsah je dobrý. Doplniť `.facts` s 3 dôvodmi „prečo BigQuery" namiesto `.split` textu. CTA zjednotiť na booking. |
| `/cookie-consent` | `.phero` → `.hero--ink` + `.chip--live` s „Požiadavka Googlu od 03/2024". Zvyšok len prevziať nové komponenty. |
| `/proces` | 5 krokov ponechať, ale pridať `.guarantee` box a `.proc-card` vizuál. Zvážiť merge do `/sluzby` — ak Fable pri exekúcii zistí, že po prestavbe `/sluzby` je stránka duplicitná, nechať ju žiť a len na ňu odkazovať. |
| `/o-mne` | `.hero--ink` + `.mini-stats` s tými istými proof číslami. |
| `/kalkulacka` | Bez štrukturálnej zmeny. Len zosúladiť `.calc-result` s `.lp-result` (majú takmer identický kód — zjednotiť). |
| `/kontakt` | `.hero--ink`, checklist „čo sa stane po odoslaní" (vzor `.lp-check-list`), CalEmbed. |
| `/blog` | Bez zmeny okrem `.hero--ink`. |
| `Header.astro` | 8 položiek v menu je veľa. Zredukovať na: Služby · Dáta · Kalkulačka · Blog · O mne. `/proces` presunúť pod Služby, `/kontakt` je už CTA tlačidlo. CTA zmeniť zo „Spočítať cenu" na „Konzultácia" (súlad s hlavným CTA webu). |
| `Footer.astro` | Doplniť odkazy na 8 Shopping launch stránok (teraz sú osirené — žiadna interná linka na ne nevedie). |

## Fáza 5 — kontrola

1. `npm run build` musí prejsť.
2. Cez preview skontrolovať: home, /sluzby, /data, /kalkulacka a **jednu launch stránku (`/hr`)** — tá musí vyzerať presne ako pred refaktorom.
3. Skontrolovať mobil (375px) — hlavne `.proof`, `.stack-list`, `.sticky-cta`.
4. Overiť, že `.sticky-cta` neprekrýva `.cal-embed` a footer.

## Odpovede Petra (júl 2026)

- **Proof strip:** `50+ úspešných spoluprác` namiesto počtu produktov.
- **Ceny:** na webe sa nekomunikujú — hlavný balík na `/sluzby` bez „od X €/mesiac", CTA vedie na konzultáciu. Kalkulačka ostáva ako nástroj.
- **Záruky:** použiť také, čo dobre znejú, ale nenesú reálne riziko — bez viazanosti (mesiac na mesiac), účty/prístupy/dáta zostávajú klientovi, odpoveď do 48 h. NIE „10 dní alebo setup zadarmo" na SK webe.
