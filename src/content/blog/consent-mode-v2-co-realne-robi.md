---
title: "Consent Mode v2: čo reálne robí, čo nerobí a ako overiť, že funguje"
description: "Consent Mode nie je cookie lišta ani obchádzka súhlasu. Vysvetlenie, čo sa deje s dátami po odmietnutí, kedy Google začne modelovať konverzie a ako si nastavenie skontrolovať za desať minút."
pubDate: 2026-07-31
draft: false
tags: ["consent", "gdpr", "tracking", "meranie"]
faq:
  - q: "Čo je Consent Mode v2 a čím sa líši od v1?"
    a: "Consent Mode je mechanizmus, ktorým web odovzdáva Google tagom informáciu o udelenom súhlase. Verzia 2 pridala dva signály navyše — ad_user_data a ad_personalization — ktoré rozlišujú posielanie údajov do reklamných systémov a personalizáciu reklamy."
  - q: "Nahrádza Consent Mode cookie lištu?"
    a: "Nie. Cookie lišta zbiera súhlas od návštevníka, Consent Mode ho len odovzdáva Google tagom. Bez funkčnej lišty, ktorá tagy reálne blokuje, je Consent Mode iba deklarácia bez obsahu."
  - q: "Kedy Google začne modelovať chýbajúce konverzie?"
    a: "Modelovanie sa zapína až po splnení prahových hodnôt objemu dát — rádovo stovky konverzií za mesiac a dostatočný počet návštev bez súhlasu. Menšie účty preto po nasadení vidia len pokles nameraných konverzií bez dorovnania modelom."
  - q: "Ako sa dá overiť, či Consent Mode funguje správne?"
    a: "V náhľade Google Tag Manageru alebo v konzole prehliadača skontrolujte hodnoty consent signálov pred udelením súhlasu a po ňom. Pred súhlasom majú byť zamietnuté, po ňom udelené, a v Google Ads má byť diagnostika bez varovaní o chýbajúcom Consent Mode."
---

Consent Mode sa v praxi vysvetľuje dvoma spôsobmi a oba sú nesprávne. Prvý: „to je tá cookie lišta." Druhý: „to je vec, vďaka ktorej meriame aj tých, čo odmietli."

Ani jedno. Consent Mode je spôsob, akým web **oznamuje Google tagom, čo návštevník povolil**. Nič viac. Hodnota z neho vzniká až vtedy, keď je zvyšok nastavenia v poriadku.

## Štyri signály a čo znamenajú

| Signál | Čo povoľuje |
| --- | --- |
| `analytics_storage` | Ukladanie analytických cookies (GA4) |
| `ad_storage` | Ukladanie reklamných cookies |
| `ad_user_data` | Posielanie údajov o používateľovi do reklamných systémov |
| `ad_personalization` | Použitie dát na personalizovanú reklamu a remarketing |

Posledné dva pribudli vo verzii 2. Ich zmyslom je oddeliť „smiem tieto dáta poslať" od „smiem podľa nich cieliť". V praxi ich väčšina cookie líšt viaže na marketingovú kategóriu súhlasu spolu.

## Čo sa deje po odmietnutí

Tu vzniká najviac nedorozumení. Pri **základnom** režime sa tagy vôbec nenačítajú, kým nie je súhlas — po odmietnutí neodíde nič.

Pri **rozšírenom** režime sa tag načíta, ale bez cookies a bez identifikátorov. Odošle sa anonymný signál bez možnosti spojiť ho s konkrétnou osobou. Práve z týchto signálov Google neskôr modeluje chýbajúce konverzie.

Rozšírený režim teda nie je obchádzka súhlasu — zákazník, ktorý odmietol, nie je sledovaný. Je to len spôsob, ako si Google zachová informáciu, že sa niečo dialo.

## Modelovanie funguje až od určitého objemu

Toto je vec, ktorú predajné materiály obchádzajú. Google dopĺňa chýbajúce konverzie modelom až vtedy, keď má dosť dát na to, aby model bol štatisticky použiteľný. Prahové hodnoty sa pohybujú rádovo v stovkách konverzií mesačne.

Dôsledok pre menší e-shop: po korektnom nasadení Consent Mode uvidí **nižšie čísla než predtým** a žiadne dorovnanie. To nie je chyba nastavenia, to je realita. Meranie sa nezhoršilo — len prestalo tvrdiť, že vie viac, než smie vedieť.

Čo s tým vie pomôcť:

- **Zlepšiť mieru súhlasu.** Rozdiel medzi 45 % a 70 % súhlasu má na dáta väčší vplyv než čokoľvek iné. Rozhoduje umiestnenie, text a to, či lišta neotravuje pri každom načítaní.
- **Doplniť enhanced conversions.** Pri používateľoch, ktorí súhlas dali, zlepší priradenie.
- **Sledovať trend, nie absolútne čísla.** Po zmene merania sa medziročné porovnania robia s výhradou.

## Kontrola za desať minút

1. **Náhľad v Tag Manageri.** Otvorte web v novom okne. Pred kliknutím na lištu majú byť všetky consent signály zamietnuté.
2. **Kliknite „odmietnuť".** Skontrolujte, že GA4 ani reklamné tagy neukladajú cookies. V prehliadači nesmú pribudnúť `_ga` ani `_gcl_*`.
3. **Kliknite „prijať" v čistom okne.** Signály sa majú prepnúť na udelené a tagy sa načítať.
4. **Diagnostika v Google Ads.** V nastaveniach konverzných akcií nesmie svietiť varovanie o chýbajúcom Consent Mode.
5. **Miera súhlasu.** Ak ju cookie lišta reportuje, pozrite si číslo. Pod 50 % je priestor na zlepšenie textu a rozloženia lišty.

## Kde to najčastejšie padne

- **Lišta beží, ale nič neblokuje.** Tagy sa načítajú ešte pred rozhodnutím návštevníka. Právne najhorší variant, lebo vyzerá v poriadku.
- **Consent Mode nasadený, lišta nie je prepojená.** Signály sa nikdy nezmenia, ostávajú na predvolenej hodnote.
- **Odmietnutie je schované.** Tlačidlo „prijať" veľké a farebné, odmietnutie o dve kliknutia ďalej. Súhlas získaný takto nie je slobodný.
- **Vlastné tagy mimo režimu.** Meta Pixel, TikTok, Sklik a heatmapy Consent Mode neriešia — potrebujú vlastné blokovanie cez lištu.

Právne dôsledky nefunkčnej lišty a spôsob nápravy rozoberá podrobnejšie článok [GA4 bez cookie lišty](/blog/ga4-bez-cookie-listy).

Ak si nie ste istí, či váš web meria to, čo smie, pozrite si [meranie](/sluzby/meranie) alebo [audit](/sluzby/audit).
