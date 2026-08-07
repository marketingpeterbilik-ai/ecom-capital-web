---
title: "Hygiena konverzií: prečo účet reportuje viac objednávok, než e-shop má"
description: "Duplicitné konverzie, sekundárne akcie počítané ako predaj a chýbajúce hodnoty. Kontrolný postup, ako zistiť, či čísla v Google Ads sedia s realitou, a ako ich opraviť bez straty histórie."
pubDate: 2026-07-31
draft: false
tags: ["tracking", "meranie", "google ads", "konverzie"]
faq:
  - q: "Prečo Google Ads reportuje viac konverzií než e-shop objednávok?"
    a: "Najčastejšie preto, že do primárnych konverzií je zaradených viac akcií naraz (napríklad nákup z GA4 aj nákup z Google tagu), alebo sa udalosť spúšťa opakovane pri obnovení stránky poďakovania. Obe príčiny nafukujú počty aj hodnotu."
  - q: "Aký je rozdiel medzi primárnou a sekundárnou konverziou?"
    a: "Primárne konverzie sa počítajú do stĺpca Konverzie a riadi sa podľa nich automatický bidding. Sekundárne sa len sledujú pre prehľad a bidding ich ignoruje. Do primárnych patrí len to, čo má reálnu hodnotu pre firmu."
  - q: "Má sa merať pridanie do košíka ako konverzia?"
    a: "Merať áno, počítať ako primárnu konverziu nie. Ak sa optimalizuje na pridanie do košíka, algoritmus hľadá ľudí, ktorí radi klikajú, nie tých, ktorí nakupujú. Výnimkou je rozbeh účtu s veľmi nízkym počtom objednávok, a aj to len dočasne."
  - q: "Ako sa dá overiť, či konverzie sedia s objednávkami v e-shope?"
    a: "Porovnaním počtu a hodnoty objednávok za mesiac medzi e-shopom a reklamnou platformou pri rovnakom modeli priradenia času konverzie. Rozdiel do približne 10 % je bežný, väčší rozdiel znamená chybu v meraní alebo dvojité počítanie."
---

Pri auditoch sa opakuje jedna situácia. Účet ukazuje 412 konverzií, e-shop má za rovnaké obdobie 260 objednávok. Nikto to nekontroluje, lebo číslo v platforme vyzerá dobre — a čím vyššie je, tým menej otázok vyvoláva.

Problém je, že podľa tohto čísla sa riadi automatický bidding. Ak je nafúknuté, algoritmus nakupuje presne ten typ návštevnosti, ktorý ho nafukuje.

## Tri najčastejšie príčiny nafúknutých čísel

### 1. Tá istá objednávka meraná dvakrát

Klasika: nákup sa importuje z GA4 **a zároveň** beží samostatná konverzná akcia cez Google tag alebo cez plugin e-shopu. Obe sú v primárnych konverziách. Každá objednávka sa počíta dvakrát, tržba tiež.

Overenie trvá dve minúty: v sekcii konverzií zoraďte akcie podľa počtu a pozrite, či dve z nich nemajú podozrivo podobné čísla.

### 2. Sekundárne akcie zaradené ako primárne

Pridanie do košíka, začatie objednávky, zobrazenie kontaktov, klik na telefón. Užitočné na diagnostiku, katastrofa v bidding signáli. Ak je medzi primárnymi konverziami čokoľvek, čo nie je predaj alebo kvalifikovaný dopyt, algoritmus optimalizuje na aktivitu, nie na tržby.

### 3. Opakované spustenie udalosti

Stránka poďakovania sa dá obnoviť, poslať odkazom, alebo sa na ňu dá vrátiť tlačidlom späť. Bez ochrany proti duplicite sa udalosť spustí zakaždým. Riešením je posielať s objednávkou **jej identifikátor** (`transaction_id`) — platforma potom duplicitu zahodí sama.

## Kontrolný postup na dvadsať minút

Prejdite tieto body v poradí. Väčšina účtov spadne už na prvých troch.

1. **Zoznam primárnych konverzií.** Má tam byť jedna akcia na predaj. Nie tri.
2. **Porovnanie s e-shopom.** Počet a hodnota objednávok za posledný celý mesiac. Rozdiel nad ~10 % chce vysvetlenie.
3. **Kontrola duplicity.** Posiela sa `transaction_id`? Ak nie, doplniť.
4. **Hodnota konverzie.** Posiela sa reálna hodnota objednávky, alebo všade svieti rovnaké číslo? Fixná hodnota znamená, že algoritmus nevie rozlíšiť objednávku za 30 € od objednávky za 900 €.
5. **Hodnota s DPH alebo bez?** Ak sa posiela s DPH, cieľové ROAS je automaticky posunuté o sadzbu dane. Treba si vybrať jednu možnosť a držať ju.
6. **Doprava v hodnote objednávky.** Rovnaká otázka. Doprava nie je vaša tržba, do hodnoty konverzie nepatrí. To isté platí pre uplatnené [zľavové kódy](/blog/zlavy-a-vouchery-cena-marze) a pre [vrátený tovar](/blog/vratky-a-ppc-ciste-trzby) — oboje znižuje sumu, ktorá vo firme reálne ostane.
7. **Okno konverzie.** Predvolených 30 dní pri produkte, ktorý sa kupuje do dvoch dní, len rozmazáva priradenie.
8. **Započítavanie: každá vs. jedna.** Pri e-shope každá, pri dopytovom formulári jedna. Opačné nastavenie sa vyskytuje prekvapivo často.

## Čo robiť s históriou, keď sa nastavenie mení

Najväčšia obava klientov: „keď to opravíme, čísla klesnú a bude to vyzerať zle." Áno, klesnú. A áno, bolo by lepšie mať ich správne od začiatku.

Postup, ktorý minimalizuje škodu:

- **Nemazať staré konverzné akcie.** Presunúť ich na sekundárne. História ostane, bidding ich prestane používať.
- **Zmenu spraviť naraz**, nie po kúskoch. Postupné zmeny znamenajú, že sa algoritmus učí na miešaných dátach.
- **Rátať s 1–2 týždňami rozkolísania.** Smart bidding potrebuje čas na prepočítanie.
- **Zaznamenať dátum zmeny** a od neho porovnávať. Porovnávanie mesiaca pred a po oprave bez tejto poznámky vedie k nesprávnym záverom.

## Ako vyzerá zdravý stav

Jedna primárna konverzia na predaj. Dynamická hodnota bez DPH a bez dopravy. Jedinečný identifikátor objednávky. Okno konverzie podľa reálneho nákupného cyklu. Všetko ostatné sekundárne, na pozeranie.

Vtedy má číslo v platforme aspoň šancu zodpovedať skutočnosti — a rozdiel oproti e-shopu je len o priradení, nie o chybe merania. Prečo tento krok patrí pred plánovanie rozpočtov, rozoberá článok [Prečo meranie predchádza rozpočtu](/blog/preco-merat-pred-rozpoctom).

Ak chcete mať istotu, že vaše čísla sedia, pozrite si [audit](/sluzby/audit) alebo [meranie](/sluzby/meranie).
