# Ecom Capital — brand manuál v2.0 (2026)

Zdroj pravdy: Claude Design projekt `bce86821-f6e5-40cb-8650-5ec94470acea`, súbor `Brand Manual.dc.html`.
Tento adresár je referencia. **Na web zatiaľ nie je napojený** — import prebehne cez `/design-sync`.

Značka stojí na dátach: čistá, presná, sebavedomá. Performance marketing & data.

---

## 01 Logo

Ikona (indigová zaoblená kocka s limetkovým prvkom) + wordmark **„ecom capital."** — vždy malými
písmenami, Sora ExtraBold, letter-spacing −3 %, s bodkou na konci. Ikona nesie farbu, wordmark ostáva
jednofarebný.

| Variant | Ikona | Wordmark | Súbor |
|---|---|---|---|
| Primárna (na svetlom) | indigo tile + lime inset | ink, bodka ink | `assets/logo-primary.svg` |
| Inverzná (na indigu) | lime tile + indigo inset | biely, bodka lime | `assets/logo-inverse.svg` |
| Na limetke | indigo tile + biely inset | ink | `assets/logo-on-lime.svg` |
| Samotná ikona (favicon, avatar) | indigo tile + lime inset | — | `assets/logo-icon.svg`, `assets/logo-icon-round.svg` |

- **Ochranná zóna:** min. voľný priestor okolo loga = šírka ikony na každej strane.
- **Minimálna veľkosť:** wordmark s ikonou min. výška 28 px / 8 mm. Menej → použiť samotnú ikonu.

### Zakázané použitia
- Veľké písmená („ECOM CAPITAL"), zmena fontu či rezu.
- Zmena farieb loga; gradienty, tiene, obrysy.
- Deformácia — naťahovanie, nakláňanie, rotovanie wordmarku.
- Limetkový text na bielej alebo biely na limetke (slabý kontrast).
- Umiestnenie na rušivé fotografie bez podkladovej plochy.

---

## 02 Farby

| Rola | Názov | HEX | Použitie |
|---|---|---|---|
| Primárna | Indigo | `#3826F3` | plochy, hero bloky, tlačidlá, odkazy |
| Akcent | Lime | `#C7F541` | tlačidlá, štítky, zvýraznenia, prvok v logu |
| Text | Ink | `#17171B` | text a nadpisy |
| — | Indigo deep | `#2A1CC8` | hover |
| — | Indigo tint | `#EFEDFE` | podklad |
| — | Lime deep | `#B4E82B` | hover |
| — | Lime soft | `#EAFBB4` | zvýraznenie |
| — | Slate | `#5A5B63` | sekundárny text |
| — | Emerald | `#1EBA81` | stav (striedmo) |
| — | Mist | `#F2F1FA` | pozadie sekcií |
| — | White | `#FFFFFF` | karty |

**Pomer 60 / 30 / 10**
- **60 %** svetlé pozadia (biela, mist) — vzdušný, čistý dojem.
- **30 %** indigo + ink — text, nadpisy, značkové plochy, pätičky.
- **10 %** lime — jeden akcent na kompozíciu. Nikdy celoplošne za textom.

**Povolené kombinácie:** ink na bielej ✓ · biela na indigu ✓ · ink na limetke ✓ · lime na indigu ✓
**Zakázané:** lime na bielej ✗ · biela na limetke ✗

---

## 03 Typografia

| Vrstva | Písmo | Rez | Parametre |
|---|---|---|---|
| Display / UI | **Sora** | 600–800 | letter-spacing −2 až −3 %, line-height ~1.05 |
| Text | **Manrope** | 400–600 | 14–16 px, line-height 1.6 |
| Štítky, dáta, čísla | **JetBrains Mono** | 400–500 | uppercase, letter-spacing 12–20 % |

---

## 04 Komponenty

- **Tlačidlá** — pilulky (`radius 999px`), CTA končí šípkou „→".
  - Primárne: lime pozadie + ink text
  - Tmavé: indigo pozadie + biely text
  - Sekundárne: transparentné + indigo obrys 1.5 px
  - Neaktívne: indigo tint pozadie + `#A5A6AE` text
- **Štítky** — lime alebo indigo-tint pilulka, JetBrains Mono uppercase.
- **Karty** — biele, radius 14–18 px, hairline `rgba(23,23,27,.12)`, tieň `0 10px 30px rgba(23,23,27,.07)`.
- **Značková plocha (signature)** — indigová zaoblená plocha (radius 24–28 px) s limetkovým
  zaobleným štvorcom otočeným ~12° pri rohu.
- **Rádiusy:** karty 14–18 px · plochy 24–28 px · pilulky 999 px.

---

## 05 Tón a štýl

Čistý, vzdušný, presný. Veľkorysý whitespace, dátový a sebavedomý fintech tón.
Jeden limetkový akcent na kompozíciu. Bez emoji. Fotografia sedí na indigovej alebo bielej ploche.

Prompt pre AI nástroje (anglicky): [`ai-spec.txt`](ai-spec.txt)
Tokeny pre kód: [`tokens.css`](tokens.css)
