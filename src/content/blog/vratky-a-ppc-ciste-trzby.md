---
title: "Vratky v PPC: ako platíte za objednávky, ktoré sa vrátia späť"
description: "Pri 20 % vratkách je každá piata objednávka v reporte fikcia — reklama za ňu je zaplatená, tovar je späť. Ako dostať vratky do reklamných platforiem a čo to urobí s cieľmi kampaní."
pubDate: 2026-07-31
draft: false
tags: ["financie", "ppc", "meranie", "e-commerce"]
faq:
  - q: "Ako vratky ovplyvňujú ROAS kampaní?"
    a: "Platformy počítajú konverziu v momente objednávky, takže vrátený tovar ostáva v čísle navždy. Pri 20 % vratkách je reálne ROAS o pätinu nižšie, než ukazuje platforma, a pri produktoch s nadpriemernou vratkovosťou ešte výraznejšie."
  - q: "Dá sa vratka poslať späť do Google Ads?"
    a: "Áno, cez úpravu konverzií (conversion adjustments) sa dá hodnota objednávky znížiť alebo konverzia stiahnuť. Podmienkou je posielať s konverziou jedinečný identifikátor objednávky, aby sa dala neskôr spárovať."
  - q: "Aké je bežné percento vratiek v e-shope?"
    a: "Závisí od sortimentu. Elektronika a domáce potreby sa bežne pohybujú v jednotkách percent, móda a obuv aj v desiatkach percent. Dôležitejšie než priemer je poznať vlastné číslo podľa kategórie a podľa kanála."
  - q: "Majú sa vratky riešiť v kampaniach alebo na produktovej stránke?"
    a: "Oboje, ale poradie je jasné. Najprv sa odstránia príčiny na strane produktu — presné veľkostné tabuľky, reálne fotky, popis materiálu. Až potom má zmysel prispôsobovať cieľové ROAS podľa vratkovosti."
---

Report kampane ukazuje 100 objednávok a tržbu 12 000 €. O tri týždne je z nich 82 objednávok a 9 600 €. Rozdiel je vrátený tovar — a reklama za neho je zaplatená v plnej výške.

Vo väčšine účtov sa tento rozdiel nikde neobjaví. Platformy počítajú konverziu v momente nákupu a späť sa už nepozerajú.

## Prečo to nie je len účtovný detail

Tri dôsledky, každý inde:

**1. Reálne ROAS je nižšie.** Pri 20 % vratkovosti je platformové ROAS 5 v skutočnosti ROAS 4. Ak sa cieľ nastavuje podľa marže, počíta sa s číslom, ktoré neexistuje.

**2. Vratka stojí viac než stratenú maržu.** Doprava tam, doprava späť, spracovanie na sklade, prípadné zníženie ceny pri opätovnom predaji. Vrátená objednávka za 120 € nie je nulový obchod, je to strata.

**3. Algoritmus sa učí zle.** Ak sa vratky sústreďujú v konkrétnej kategórii alebo pri konkrétnom publiku, smart bidding tam bude tlačiť viac peňazí — pretože podľa jeho dát ide o najlepšie konvertujúci segment.

## Ako dostať vratky do platformy

Technicky to nie je zložité, len sa to takmer nerobí.

**Predpoklad:** s každou konverziou sa posiela **identifikátor objednávky** (`transaction_id` alebo `order_id`). Bez neho sa vratka nedá spárovať a všetko ostatné padá.

**Postup:**

1. Z e-shopu sa raz denne alebo raz týždenne vyexportuje zoznam vratiek za obdobie — identifikátor objednávky, dátum, vrátená suma.
2. Do Google Ads sa nahrajú **conversion adjustments**: pri čiastočnej vratke `RESTATE` s novou hodnotou, pri úplnej `RETRACT`.
3. V Meta sa použije udalosť refund cez Conversions API s rovnakým identifikátorom.
4. Kontrola po týždni: hodnota konverzií v platforme má klesnúť približne o objem vratiek.

Okno na úpravu je obmedzené (v Google Ads rádovo mesiace), takže dávkovanie raz za štvrťrok nefunguje. Týždenný cyklus je rozumné minimum.

## Keď to technicky nejde

Nie každý e-shop vie dodať export a nie každé riešenie má napojenie. Vtedy sa dá pracovať s **korekciou na úrovni cieľa**.

Postup je jednoduchý: zistite vratkovosť za posledných 6–12 mesiacov podľa kategórie a upravte cieľové ROAS smerom nahor.

> **Upravené cieľové ROAS = pôvodný cieľ / (1 − vratkovosť)**

Pri cieli ROAS 5 a vratkovosti 20 % teda potrebujete v platforme ROAS 6,25, aby ste reálne dosiahli päťku.

Je to hrubšie riešenie než úprava konverzií, ale stále nekonečne lepšie než predstierať, že vratky neexistujú. A dá sa nasadiť za jedno popoludnie.

## Vratkovosť patrí do segmentácie katalógu

Ak už delíte katalóg podľa marže — a to by ste mali, viď [tri typy marže](/blog/tri-typy-marze-namiesto-pno) — vratkovosť je druhá os. Produkt s maržou 50 % a vratkovosťou 35 % môže byť horší biznis než produkt s maržou 35 % a vratkovosťou 3 %.

Prakticky:

- Doplňte do feedu **custom label s pásmom vratkovosti** — ako na to, rozoberá článok o [optimalizácii feedu v Merchant Center](/blog/merchant-center-feed-optimalizacia).
- Produkty s vysokou vratkovosťou dajte do samostatnej kampane s prísnejším cieľom.
- Sledujte vratkovosť **podľa kanála**, nie len celkovo. Rozdiely medzi Google, Meta a newsletterom bývajú prekvapivé.

## Najprv príčina, potom kampaň

Nastavenie cieľov je náplasť. Väčšina vratiek má konkrétnu a odstrániteľnú príčinu:

- **Nesedí veľkosť.** Veľkostná tabuľka pre konkrétny model, nie generická.
- **Produkt vyzerá inak.** Fotky pri dennom svetle, detail materiálu, video.
- **Chýba informácia.** Rozmery, hmotnosť, kompatibilita, obsah balenia.
- **Reklama sľubuje viac než produkt.** Sem patrí aj kreatíva, ktorá zveličuje.

Posledný bod je jediný, ktorý je priamo v rukách marketingu — a zároveň ten, na ktorý sa najmenej myslí. Reklama, ktorá vyrába vratky, nemá dobrý výkon, len rýchlejší obeh vlastného tovaru.

Ak chcete zistiť, koľko z vašich reportovaných tržieb reálne ostane vo firme, pozrite si [audit](/sluzby/audit) alebo si [rezervujte hovor](/kontakt).
