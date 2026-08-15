# SEO checklist — ecomcapital.eu

Stav k 15. 8. 2026. Kód je hotový, zvyšok sú kroky mimo repozitára.

## Čo je v kóde hotové

| Oblasť | Stav |
|---|---|
| `site` = `https://ecomcapital.eu` (canonical, og:url, všetky `@id` v JSON-LD) | ✅ |
| Sitemap s reálnym `lastmod` článkov, prioritami a bez `/404` | ✅ |
| Canonical bez koncovej lomky, sitemap URL v rovnakom tvare | ✅ |
| `robots.txt` so sitemapou na `.eu` + menovité povolenie AI crawlerov | ✅ |
| `robots` meta: `max-snippet:-1`, `max-image-preview:large` | ✅ |
| `noindex` na `/404` | ✅ |
| OG: rozmery, `alt`, `og:locale` podľa jazyka (launch LP = `en_US`) | ✅ |
| Twitter card vrátane `title` a `description` | ✅ |
| RSS feed `/rss.xml` + `<link rel="alternate">` v hlavičke | ✅ |
| `Blog` + `ItemList` schema na `/blog`, `ItemList` na `/sluzby` | ✅ |
| `/llms.txt` pre jazykové modely | ✅ |
| Cache a bezpečnostné hlavičky (`public/_headers`) | ✅ |
| E-mail zjednotený na `info@ecomcapital.eu` naprieč webom aj schema | ✅ |
| Title tagy prepísané na 40–60 znakov s kľúčovým slovom | ✅ |

## Čo musíš spraviť ty (mimo kódu)

### 1. Google Search Console — hneď po nasadení

1. <https://search.google.com/search-console> → **Pridať vlastníctvo** → **Doména** `ecomcapital.eu`
   (doménová property pokrýva www aj http naraz, overuje sa TXT záznamom v Cloudflare DNS).
2. Ak radšej cez HTML značku: skopíruj hodnotu `content` z meta tagu a vlož ju do
   `src/data/site.ts` → `VERIFICATION.google`. Tag sa potom vykreslí na každej stránke.
3. **Sitemaps** → pridaj `sitemap-index.xml`.
4. **URL Inspection** na homepage → *Request indexing*. Zrýchli prvé zaindexovanie.

### 2. Bing Webmaster Tools

<https://www.bing.com/webmasters> — dá sa importovať priamo z Search Console.
Bing index používa aj ChatGPT Search, takže to nie je len „Bing".
Overovací kód patrí do `VERIFICATION.bing`.

### 3. Cloudflare — presmerovanie www a vynútenie HTTPS

V projekte Pages pridaj ako custom domain **aj** `www.ecomcapital.eu`, potom
v **Rules → Redirect Rules** vytvor pravidlo:
`hostname eq "www.ecomcapital.eu"` → dynamické presmerovanie 301 na
`concat("https://ecomcapital.eu", http.request.uri.path)`.
Bez toho existuje web na dvoch hostnameoch a delí si signály.
V **SSL/TLS → Edge Certificates** zapni *Always Use HTTPS*.

### 4. Doplniť `sameAs` — najlacnejší dôkaz, že entita existuje

`src/data/site.ts`:

- `SITE.sameAs` — firemný LinkedIn, prípadne profil na Clutch/Behance a ORSR výpis.
- `personLd().sameAs` — tvoj osobný LinkedIn (pole je zatiaľ prázdne).

Dnes má firma jediný externý odkaz (Finstat). Dva–tri overiteľné profily sú
najúčinnejší jednorazový zásah, aký na entite ešte môžeš spraviť.

### 5. Google Business Profile

Bratislavská adresa + kategória „Marketingová agentúra". Lokálny balík je
pri dopytoch typu „ppc špecialista Bratislava" často jediné, čo sa zobrazí nad organikou.

### 6. Nastav e-mail `info@ecomcapital.eu`

Web ju teraz uvádza na 8 miestach vrátane schema.org a `/llms.txt`.
Ak schránka nebeží, je to nefunkčný kontakt v štruktúrovaných dátach.

## Čo zostáva otvorené (audit hovorí prečo)

Z [WEB-AUDIT.md](WEB-AUDIT.md) a [GEO-AUDIT.md](GEO-AUDIT.md), zoradené podľa dopadu:

1. **Právne stránky majú naživo `[DOPLNIŤ: …]`** — `/ochrana-osobnych-udajov` a `/cookies`.
   Pre web, ktorý predáva GDPR consent, je to najhoršia možná rozrobená stránka.
2. **`/cookies` popisuje meranie, ktoré na webe nie je** — nepravdivé tvrdenie
   o spracúvaní údajov. Buď nasadiť GA4 + lištu, alebo text prepísať na realitu.
3. **Web nemeria nič** — bez GA4 nevieš, ktorá stránka privádza hovory.
4. **Nula dôkazov** — žiadne meno klienta, citát ani prípadovka. Čísla `€5M+`,
   `50+ spoluprác` nemajú krytie a AI modely nedoložené tvrdenia hedgujú.
5. **Fonty z Google CDN** — render-blocking request pred prvým vykreslením a zároveň
   prenos IP návštevníka do USA bez súhlasu. Self-hosting cez `@fontsource-variable`.
6. **Jeden OG obrázok na celý web** — zdieľaný článok vyzerá ako homepage.
7. **`dateModified` na statických stránkach** — `Base.astro` má prop pripravený,
   stačí ho pri revízii stránky vyplniť. Čerstvosť je pri AI odpovediach rankingový signál.

## Po nasadení over

```bash
curl -sI https://ecomcapital.eu/                    # 200, HTTPS
curl -s  https://ecomcapital.eu/robots.txt          # sitemap na .eu
curl -s  https://ecomcapital.eu/sitemap-index.xml   # existuje
curl -s  https://ecomcapital.eu/rss.xml | head      # validné XML
curl -s  https://ecomcapital.eu/llms.txt | head     # entita sedí
curl -sI https://www.ecomcapital.eu/                # 301 na apex
```

Štruktúrované dáta: <https://validator.schema.org> a
<https://search.google.com/test/rich-results> (skontroluj homepage, jednu službu a jeden článok).
