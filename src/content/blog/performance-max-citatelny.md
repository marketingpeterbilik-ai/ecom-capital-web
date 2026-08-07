---
title: "Performance Max ako čitateľná kampaň: čo v nej vidieť a čo si vynútiť"
description: "PMax dáva jedno číslo za šesť kanálov naraz. Návod, ako z neho dostať rozpad podľa kanálov, oddeliť brandový dopyt a rozhodnúť sa podľa dát namiesto viery v algoritmus."
pubDate: 2026-07-31
draft: false
tags: ["ppc", "google ads", "performance max", "meranie"]
faq:
  - q: "Prečo Performance Max neukazuje výkon podľa kanálov?"
    a: "Google zámerne reportuje PMax ako jednu kampaň naprieč Search, Shopping, YouTube, Display, Discover a Gmail. Rozpad podľa kanálov nie je v štandardnom rozhraní, dá sa však priblížiť cez report asset groups, cez Insights a cez skripty, ktoré ťahajú dáta z API."
  - q: "Kanibalizuje Performance Max brandový dopyt?"
    a: "Áno, ak mu to dovolíte. PMax bez vylúčenia značky bude zbierať vyhľadávania na vaše meno, pretože majú najvyššiu konverznosť. Výsledkom je dobré ROAS kampane a žiadne tržby navyše. Riešením je vylúčenie brandu na úrovni účtu alebo cez zoznam značiek."
  - q: "Koľko asset groups má mať jedna PMax kampaň?"
    a: "Toľko, koľko viete naplniť odlišným obsahom a odlišným publikom. Rozdelenie podľa kategórie alebo marže dáva zmysel; delenie na desiatky skupín s rovnakými textami len rozdrobí dáta a spomalí učenie."
  - q: "Ako sa dá PMax porovnať so Shopping kampaňou?"
    a: "Férovo len testom v čase alebo rozdelením sortimentu. Súbežný beh oboch kampaní na ten istý feed nie je test — PMax má prioritu a zoberie si najlepší dopyt, takže Shopping vyjde umelo horšie."
---

Performance Max je dnes vo väčšine e-shopových účtov kampaň s najväčším rozpočtom a zároveň tá, o ktorej vieme najmenej. Vráti jedno ROAS za šesť kanálov naraz a otázku „kde presne sa tie peniaze minuli" odbaví grafom s tromi bublinami.

To nie je dôvod ju nepoužívať. Je to dôvod vynútiť si z nej dáta, ktoré sama od seba nedá.

## Prvý krok: vylúčte brand, inak meriate vlastnú značku

PMax hľadá najlacnejšie konverzie. Najlacnejšie konverzie sú ľudia, ktorí už hľadajú vaše meno. Bez vylúčenia teda kampaň prirodzene zamieri na brandový dopyt — a jej ROAS 12 nehovorí o výkone, ale o tom, že vás zákazníci poznajú.

Prakticky:

- Požiadajte o **brand exclusion list** na úrovni kampane (zoznam značiek, ktoré má PMax ignorovať vo vyhľadávaní).
- Nechajte brandový dopyt v samostatnej Search kampani, kde ho viete vyhodnotiť.
- Až potom porovnávajte čísla.

Bez tohto kroku je akákoľvek ďalšia analýza PMax bezpredmetná. Prečo brandová kampaň sama osebe potrebuje iný meter, rozoberá článok [Brandové kampane](/blog/brandove-kampane-oplatia-sa).

## Ako z PMax dostať rozpad podľa kanálov

Google rozpad nedáva v rozhraní, ale existujú tri cesty, ktoré sa dopĺňajú:

**1. Asset groups ako náhradná štruktúra.** Každá asset group má vlastný report. Ak ich rozdelíte podľa kategórie alebo maržových pásiem, dostanete aspoň hrubý pohľad, kam idú peniaze.

**2. Skript na channel report.** Cez Google Ads API sa dá vytiahnuť rozdelenie nákladov a konverzií na Shopping vs. ostatné plochy. Je to najbližšie k pravde, čo sa dá dostať bez support tiketu.

**3. Report vyhľadávacích kategórií.** Nie sú to presné search terms, ale ukážu, aké typy dopytu kampaň zbiera. Ak sa tam objavuje váš názov, vylúčenie brandu nefunguje.

Cieľom nie je mikromanažment. Cieľom je vedieť odpovedať na otázku, či kampaň prináša nový dopyt, alebo prebaľuje existujúci.

## Feed je 80 % výkonu

Pri e-shope rozhoduje o PMax feed, nie kreatíva. Algoritmus si vyberá, čo bude zobrazovať, a vyberá si podľa toho, čo mu dáte.

Čo sa oplatí skontrolovať skôr, než začnete meniť rozpočty:

- **Názvy produktov** obsahujú to, čo ľudia reálne hľadajú — nie interné označenie.
- **Doplnené atribúty**: značka, GTIN, kategória, veľkosť, farba. Chýbajúce atribúty znamenajú menej dopytu.
- **Dostupnosť a ceny** sedia s webom. Nesúlad tichým spôsobom brzdí celý účet.
- **Vlastné štítky (custom labels)** podľa marže alebo obrátky. Bez nich neviete oddeliť produkty, ktoré si zaslúžia agresívnejší cieľ.

Práve custom labels podľa marže sú miesto, kde sa PMax spája s [maržovými pásmami](/blog/tri-typy-marze-namiesto-pno). Bez nich má celý katalóg jeden cieľ a to je vždy kompromis na úkor niečoho.

Celý zoznam toho, čo sa vo feede oplatí prerobiť — od názvov cez `product_type` až po chyby, ktoré ticho vypnú časť katalógu — je v samostatnom článku o [optimalizácii feedu](/blog/merchant-center-feed-optimalizacia).

## Kedy PMax rozdeliť a kedy nechať tak

Rozdelenie do viacerých kampaní má zmysel, keď:

- Máte **výrazne odlišné marže** naprieč sortimentom a chcete rôzne ciele ROAS.
- Máte **kategórie s vlastnou sezónnosťou**, ktoré si zaslúžia samostatný rozpočet.
- Potrebujete **oddeliť novinky** od zabehnutých produktov, aby ich algoritmus nezahodil.

Nemá zmysel, keď:

- Rozpočet je taký nízky, že po rozdelení má každá kampaň pár konverzií týždenne.
- Delíte podľa niečoho, čo nemá vplyv na ekonomiku objednávky.

Praktické minimum je približne 30 konverzií mesačne na kampaň. Pod touto hranicou rozdelenie skôr uškodí, než pomôže.

## Ako PMax reálne porovnať so Shoppingom

Najčastejšia chyba: nechať bežať oboje naraz a po mesiaci porovnať ROAS. To nie je test. PMax má vo Vyhľadávaní prednosť pred štandardnou Shopping kampaňou, takže si vezme najlepší dopyt a Shopping vyzerá horšie, než v skutočnosti je.

Férové možnosti sú dve:

1. **Test v čase.** Dva-tri týždne jedno, dva-tri týždne druhé, mimo sezóny a bez väčších akcií.
2. **Rozdelenie sortimentu.** Časť kategórií do PMax, časť do Shoppingu, a porovnať výkon v rámci porovnateľných skupín.

V oboch prípadoch sa pozerá na **celkové tržby a maržu účtu**, nie na ROAS jednej kampane. Kampaňové ROAS vie stúpnuť len tým, že sa kampaň presunie na lacnejší dopyt — a firma z toho nemá nič.

## Zhrnutie

Performance Max nie je čierna skrinka preto, že by sa nedala otvoriť. Je čierna skrinka preto, že väčšina účtov ju nikdy neotvorila.

Poradie krokov, ktoré funguje:

1. Vylúčiť brand a oddeliť ho do vlastnej kampane.
2. Dať do poriadku feed a doplniť custom labels podľa marže.
3. Vytiahnuť rozpad podľa kanálov (skript alebo asset groups).
4. Nastaviť cieľ podľa príspevkovej marže, nie podľa priemeru účtu.
5. Testovať zmeny v čase, nie súbežne.

Ak chcete vedieť, koľko z vášho PMax rozpočtu ide na dopyt, ktorý by prišiel aj tak, pozrite si [PPC služby](/sluzby/ppc) alebo si [rezervujte hovor](/kontakt).
