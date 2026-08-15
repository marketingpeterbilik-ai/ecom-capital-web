# Nasadenie zadarmo — GitHub + Cloudflare Pages

Postup má dve fázy: (1) dostať kód na GitHub, (2) napojiť GitHub na Cloudflare Pages. Potom sa každá zmena, ktorú pushneš, nasadí automaticky.

---

## Fáza 1 — GitHub

### A) Cez webové rozhranie (najjednoduchšie)

1. Choď na <https://github.com/new> a vytvor **nový prázdny repozitár**, napr. `ecom-capital-web`.
   - **NEZaškrtávaj** „Add a README" ani .gitignore (už ich máme).
2. GitHub ti ukáže príkazy. My už máme commit hotový, takže stačí pripojiť remote a pushnúť:

```bash
cd ~/ecom-capital-agency/Website-main
git remote add origin https://github.com/<TVOJE-MENO>/ecom-capital-web.git
git branch -M main
git push -u origin main
```

Pri prvom pushe ťa GitHub vyzve prihlásiť sa (otvorí prehliadač alebo vypýta token).

### B) Cez GitHub CLI (ak máš `gh`)

```bash
brew install gh        # ak ho ešte nemáš
gh auth login          # prihlásenie
cd ~/ecom-capital-agency/Website-main
gh repo create ecom-capital-web --public --source=. --remote=origin --push
```

---

> **Aktuálny stav (15. 8. 2026):** web už nasadený nie je ako Pages projekt, ale ako
> **Worker so statickými assetmi** — konfigurácia je vo `wrangler.jsonc`, meno workera
> `ecom-capital-web`. Postup nižšie popisuje pôvodné nastavenie cez Pages a je platný
> pre nový projekt; pri existujúcom hľadaj nastavenia v **Workers & Pages →
> ecom-capital-web → Settings**. Deploy naďalej beží automaticky z vetvy `main`.

## Fáza 2 — Cloudflare Pages

1. Zaregistruj sa zadarmo na <https://dash.cloudflare.com> (ak ešte nemáš účet).
2. V ľavom menu: **Workers & Pages → Create → Pages → Connect to Git**.
3. Autorizuj GitHub a vyber repozitár `ecom-capital-web`.
4. Nastav **build**:

   | Pole | Hodnota |
   | --- | --- |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | `22` (Environment variables → `NODE_VERSION = 22`) |

5. Klikni **Save and Deploy**. Za pár minút dostaneš adresu typu
   `https://ecom-capital-web.pages.dev`.

Odteraz: **každý `git push` do `main` = automatický deploy.** Žiadne ručné nahrávanie.

---

## Vlastná doména

Produkčná doména je **ecomcapital.eu** a `astro.config.mjs` už na ňu ukazuje.

V projekte na Cloudflare Pages: **Custom domains → Set up a domain** → `ecomcapital.eu`,
a rovnakým spôsobom pridaj aj `www.ecomcapital.eu`. Pre www potom vytvor 301 presmerovanie
na apex (postup je v [SEO-CHECKLIST.md](SEO-CHECKLIST.md)) — bez neho beží web na dvoch
hostnameoch a delí si SEO signály.

Ak by si doménu niekedy menil, prepíš `site` v `astro.config.mjs` **aj** posledný
riadok `public/robots.txt`.

---

## Časté problémy

- **Build padne na Node verzii** → pridaj env premennú `NODE_VERSION=22`.
- **Cal.com kalendár ukazuje „user not found"** → ešte si nenastavil `CAL_LINK` v `src/pages/kontakt.astro`.
- **Zmena sa neprejavila** → over, či si commitol a pushol do vetvy `main`.
