---
title: "Blended ROAS vs. platformový ROAS: prečo čísla v platforme klamú"
description: "Google aj Meta si pripisujú tie isté konverzie. Po sčítaní vyjde viac tržieb, než firma reálne má. Tu je vysvetlenie aj riešenie."
pubDate: 2026-06-24
tags: ["dáta", "reporting"]
---

Google Ads ukazuje ROAS 6, Meta ROAS 4. Po sčítaní tržieb z oboch platforiem však vyjde viac, než je reálne na účte. Kde je rozdiel?

## Každá platforma si pripisuje zásluhy

Zákazník dnes klikne na reklamu na Meta, o dva dni vyhľadá značku v Google a nakúpi. **Obe platformy** si tú istú objednávku pripíšu. Sčítaním platformových čísel sa preto tie isté tržby počítajú dvakrát, niekedy aj viackrát.

## Riešenie: blended pohľad

Blended ROAS = **reálne tržby / všetky náklady na reklamu**. Jedno číslo, ktoré sa nedá nafúknuť, pretože vychádza z reálne dosiahnutých tržieb.

| Pohľad | Čo hovorí | Riziko |
| --- | --- | --- |
| Platformový | Výkon kanála *podľa platformy* | Nadhodnotený, prekrýva sa |
| Blended | Skutočná návratnosť celého marketingu | Neukáže, ktorý kanál za to môže |

Najlepšie funguje **kombinácia oboch** — blended ako kontrola reality a platformový (s rozumom) na riadenie jednotlivých kampaní.

## Kde sa to počíta

Práve preto sa dáta spájajú do BigQuery. Reklamné náklady z Google a Meta API, tržby z e-shopu a CRM na jednom mieste — a nad nimi blended metriky, ktoré sa aktualizujú automaticky. Bez ručného spájania CSV v Exceli.

Viac o tom, ako to celé funguje, nájdete na stránke [Dáta &amp; BigQuery](/data).
