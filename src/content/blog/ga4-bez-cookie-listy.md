---
title: "GA4 bez cookie lišty: aké riziká to prináša a ako ich odstrániť"
description: "Mnoho webov meria návštevníkov cez GA4 a reklamné pixely bez platného súhlasu. Prehľad toho, čo hrozí — a ako vyzerá náprava, ktorá nezničí meranie."
pubDate: 2026-07-02
tags: ["consent", "gdpr", "tracking"]
---

Pri auditoch webov sa pravidelne opakuje rovnaký nález: GA4, Google Ads a Meta Pixel sa načítavajú okamžite pri príchode na web — bez cookie lišty, alebo s lištou, ktorá reálne nič neblokuje. Tento stav má tri samostatné dôsledky a každý z nich stojí za pozornosť.

## 1. Právne riziko

Ukladanie cookies a spracúvanie identifikátorov návštevníka vyžaduje **preukázateľný súhlas** — vyplýva to z GDPR aj zo zákona o elektronických komunikáciách. Súhlas musí byť slobodný a informovaný a odmietnutie musí byť rovnako jednoduché ako prijatie.

GDPR umožňuje pokuty do **20 mil. € alebo 4 % celosvetového obratu**. Dôležitejšie pre bežnú prax však je, že podnet na dozorný úrad môže podať ktorýkoľvek návštevník webu — konkurenciu nevynímajúc.

## 2. Podmienky Googlu (od marca 2024)

Od marca 2024 Google vyžaduje od inzerentov v EÚ **Consent Mode v2** — teda posielanie signálov o súhlase návštevníka. Bez nich Google obmedzuje:

- remarketingové publiká,
- personalizované reklamy,
- časť meracích funkcií.

V praxi to znamená, že kampane strácajú výkon bez ohľadu na rozpočet a kvalitu správy — a inzerent často netuší prečo.

## 3. Dáta, o ktoré sa nedá oprieť

Dáta zozbierané bez súhlasu predstavujú právne riziko a **spätne sa legalizovať nedajú**. Rozhodovať sa podľa nich znamená stavať na základoch, ktoré môže bolo nutné kedykoľvek prestať používať.

## Ako vyzerá náprava

Obava, že cookie lišta „zničí meranie“, je pochopiteľná — ale pri správnom nasadení neplatí. Postup:

1. **Audit skriptov a cookies** — čo presne sa načítava pred súhlasom.
2. **Nasadenie CMP** (consent management platformy) certifikovanej Googlom, prispôsobenej dizajnu webu.
3. **Consent Mode v2** — prepojenie súhlasu na GA4, Google Ads a Meta cez GTM alebo server-side.
4. **Modelované konverzie** — Google dopočítava konverzie návštevníkov, ktorí súhlas odmietli, takže obraz o výkone zostáva použiteľný.
5. **Test oboch scenárov** — prijatie aj odmietnutie, vrátane opakovanej návštevy.

Celé nasadenie je zvyčajne otázkou dní, nie mesiacov.

## Rýchla samokontrola

Stačia štyri otázky: Zobrazuje web lištu pred spustením skriptov? Dá sa súhlas odmietnuť rovnako ľahko ako prijať? Je nasadený Consent Mode v2? Platí voľba aj pri ďalšej návšteve?

Ak je odpoveď čo i len raz „nie“ alebo „neviem“, odporúčame [bezplatnú kontrolu webu](/cookie-consent) — výstup do 48 hodín, nezáväzne.
