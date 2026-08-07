---
title: "Feed v Merchant Center je najlacnejšia optimalizácia, akú máte"
description: "V Shoppingu a Performance Max je produktový feed jediné cielenie, ktoré reálne ovládate. Čo z neho Google skutočne číta, ako sa skladá názov produktu, na čo slúži product_type a custom_label a šesť chýb, ktoré ticho vypnú polovicu katalógu."
pubDate: 2026-08-07
tags: ["ppc", "google ads", "feed", "e-commerce"]
faq:
  - q: "Ktorý atribút vo feede má najväčší vplyv na výkon?"
    a: "Názov produktu. Rozhoduje o tom, na aké vyhľadávania sa produkt vôbec zobrazí, a zároveň je to prvé, čo človek v inzeráte prečíta. Druhý najdôležitejší je typ produktu, lebo z neho sa stavia štruktúra kampaní."
  - q: "Ako sa má správne skladať názov produktu vo feede?"
    a: "Značka, typ produktu, model a kľúčový parameter, ktorý ľudia hľadajú, v tomto poradí. Limit je 150 znakov, ale v inzeráte je vidieť približne prvých sedemdesiat, takže to podstatné musí byť na začiatku."
  - q: "Aký je rozdiel medzi google_product_category a product_type?"
    a: "Google_product_category je pevná taxonómia Googlu a slúži na zaradenie produktu do systému. Product_type je vaša vlastná hierarchia, ktorú si určujete sami a podľa ktorej sa dajú deliť kampane a skupiny produktov."
  - q: "Na čo slúžia custom labels?"
    a: "Je to päť voľných polí, do ktorých si viete zapísať vlastnú logiku, ktorú Google nepozná. Najužitočnejšie sú pásmo marže, vratkovosť, sezónnosť, stav skladu a označenie bestsellerov. Podľa nich sa potom dajú kampane riadiť rôznymi cieľmi."
  - q: "Koľko produktov má zmysel prepisovať?"
    a: "Nie celý katalóg naraz. Vezmite produkty, ktoré tvoria zhruba osemdesiat percent tržieb, a začnite s nimi. Prepis dvadsiatich najsilnejších názvov má väčší dopad než plošná úprava celého katalógu."
---

V Shoppingu ani v Performance Max si nevyberáte kľúčové slová. Nevyberáte si ani publiká, ktoré rozhodnú. To, čo naozaj určuje, na aké dopyty sa produkt zobrazí a s akou cenou, je **feed**.

Je to zároveň jediná časť účtu, ktorú si viete zmeniť bez toho, aby ste minuli euro navyše. Väčšina e-shopov ho pritom má presne v takom stave, v akom ho vygeneroval e-shopový plugin pri inštalácii.

## Čo z feedu Google naozaj číta

Atribútov je vyše päťdesiat. Reálny dopad na výkon má hŕstka.

| Atribút | Na čo vplýva |
| --- | --- |
| `title` | Na aké dopyty sa produkt zobrazí. Najsilnejší atribút. |
| `description` | Doplnkový zdroj kontextu, hlavne pri dlhších dopytoch. |
| `product_type` | Vaša vlastná hierarchia — základ pre štruktúru kampaní. |
| `google_product_category` | Zaradenie do taxonómie Googlu, vplýva na formáty a porovnávanie. |
| `gtin`, `brand`, `mpn` | Párovanie s katalógom Googlu a s konkurenciou. Bez GTIN strácate porovnanie cien. |
| `image_link` | Rozhoduje o preklikovosti viac než text. |
| `price`, `sale_price` | Musí sedieť s cenou na stránke, inak schválenie padá. |
| `availability` | Nesúlad = zamietnutie a stratený rozpočet. |
| `custom_label_0–4` | Vaša vlastná logika, ktorú Google nepozná. |

Zvyšok atribútov rieši špecifiká kategórií (veľkosti, materiál, energetický štítok). Dôležité sú, ale poradie priorít je toto.

## Anatómia názvu produktu

Názov je zoznam signálov, nie veta. Google z neho zisťuje, čo produkt je; človek z neho zisťuje, či je to to, čo hľadal.

> **Značka + typ produktu + model + kľúčový parameter + variant**

Limit je 150 znakov, ale v inzeráte je vidieť približne prvých 70. Všetko podstatné teda patrí dopredu.

| Zle | Dobre |
| --- | --- |
| `Kávovar DeLonghi` | `DeLonghi Magnifica S ECAM 22.110 automatický kávovar 15 barov, zásobník 1,8 l` |
| `Nike topánky` | `Nike Pegasus 41 pánske bežecké topánky, čierne, veľkosť 44` |
| `Vŕtačka 18V` | `Bosch GSR 18V-55 aku vŕtačka 18 V, 2× 2,0 Ah batéria, kufor` |
| `AKCIA!! Set uterákov 3 ks` | `Bavlnené uteráky 50×100 cm, sada 3 ks, 500 g/m², sivé` |

Čo do názvu **nepatrí**: výkričníky, „akcia", „doprava zadarmo", „najlepšia cena", názov vášho e-shopu, interné kódy. Časť z toho vedie priamo k zamietnutiu, zvyšok len míňa znaky, ktoré mali niesť parameter, podľa ktorého ľudia hľadajú.

Poradie sa líši podľa kategórie. Pri elektronike ľudia hľadajú model, takže patrí čo najskôr. Pri móde hľadajú typ a farbu, model nikoho nezaujíma. Pri spotrebnom tovare hľadajú parameter — rozmer, objem, gramáž.

Rýchly test: zoberte päť najpredávanejších produktov a pozrite si v Google Ads, na aké **vyhľadávacie dopyty** sa zobrazujú. Ak sú to len dopyty na značku a presný model, názov nenesie žiadny generický signál a produkt vám nikdy nechytí človeka, ktorý ešte nevie, čo chce kúpiť.

## Product_type je vaša štruktúra kampaní

`google_product_category` si Google určuje sám a nemáte s ním veľa práce. `product_type` je voľné pole a je to jediný spôsob, ako do feedu dostať **vlastnú hierarchiu**:

```
Domáce spotrebiče > Kuchyňa > Kávovary > Automatické
```

Podľa nej sa potom skladajú skupiny produktov v kampaniach — a to na akejkoľvek úrovni potrebujete. Ak sa product_type kopíruje z URL alebo je pre celý katalóg rovnaký, prídete o možnosť oddeliť kategórie s inou maržou, inou konkurenciou a iným cieľom.

Odporúčanie: tri až štyri úrovne, konzistentne, bez diakritických prekvapení a bez toho, aby sa hierarchia menila pri každom preklikovaní kategórií v e-shope.

## Custom labels: sem patrí logika, ktorú Google nepozná

Päť voľných polí, ktoré sa dajú použiť na čokoľvek. Google im nerozumie, ale vy podľa nich viete kampane deliť a riadiť.

Čo sa oplatí do nich dať:

- **`custom_label_0` — pásmo marže.** Priame prepojenie na [tri typy marže](/blog/tri-typy-marze-namiesto-pno): produkt s príspevkovou maržou 55 % znesie úplne iný cieľ než produkt s 18 %. Bez tohto poľa im v kampani nastavíte rovnaký.
- **`custom_label_1` — vratkovosť.** Kategórie s vysokou vratkovosťou potrebujú prísnejší cieľ, lebo časť tržby sa vráti.
- **`custom_label_2` — stav skladu.** Pomalá obrátka do samostatnej kampane s vyšším tlakom, kritické zásoby von.
- **`custom_label_3` — sezónnosť.** Aby sa nemuselo pred sezónou prestavovať pol účtu.
- **`custom_label_4` — bestsellery.** Top produkty podľa tržieb za posledných 90 dní, prepočítavané automaticky.

Kľúčové je, aby sa labely **prepočítavali automaticky**, nie raz ročne ručne v tabuľke. Statický label je po troch mesiacoch klamstvo, podľa ktorého riadite rozpočet.

## Šesť chýb, ktoré ticho vypnú časť katalógu

Nezhodia účet. Len sa časť produktov prestane zobrazovať a v reportoch to vyzerá ako slabší mesiac.

**1. Chýbajúce GTIN.** Bez neho Google nevie produkt spárovať so svojím katalógom, prídete o porovnanie cien a časť formátov. Pri vlastnej výrobe sa nastavuje `identifier_exists: no` — ale len tam, nie plošne, aby sa obišla chyba.

**2. Availability z cache.** Feed hovorí „skladom", stránka hovorí „vypredané". Vedie to k zamietnutiu a v horšom prípade k platenej návšteve produktu, ktorý sa nedá kúpiť. Feed musí ísť aspoň raz denne, pri rýchlom obrate cez okamžitú aktualizáciu.

**3. Cena nesedí so stránkou.** Najčastejšia príčina hromadného zamietnutia. Typicky pri zľavách, ktoré e-shop zobrazuje inak, než ich posiela do feedu, alebo pri cenách s DPH a bez DPH.

**4. Obrázok s textom.** Vodoznaky, cenovky, nálepky „−30 %", rámčeky. Sú dôvodom na zamietnutie a zároveň produkt vyzerá horšie než konkurencia s čistým obrázkom na bielom pozadí.

**5. Varianty bez `item_group_id`.** Osem farieb toho istého trička ako osem nesúvisiacich produktov znamená rozdrobené dáta a horšie učenie kampane.

**6. Popis skopírovaný z CMS.** HTML tabuľky, marketingové frázy a v prvých dvoch vetách nič vecné. Popis má začínať tým, čo produkt je a pre koho, nie tým, ako veľmi si ho zamilujete.

Diagnostika v Merchant Center ukáže zamietnuté produkty. Nebezpečnejšia je ale tichá kategória — produkty schválené, ale **s nulou zobrazení**. Tie sa v žiadnom výstrahovom paneli neobjavia. Vyfiltrujte si ich v Google Ads v reporte produktov a pozrite sa na ich názvy; odpoveď býva presne tam.

## Ako na tom pracovať, aby to malo koniec

Prepis celého katalógu je projekt, ktorý sa nikdy nedokončí. Postupujte podľa peňazí:

1. Vyberte produkty, ktoré tvoria **80 % tržieb**. Býva ich prekvapivo málo.
2. Prepíšte im názvy podľa vzorca vyššie. Ručne, nie šablónou.
3. Nechajte bežať **2–4 týždne** a porovnajte zobrazenia a preklikovosť oproti rovnako dlhému predchádzajúcemu obdobiu.
4. Až keď to funguje, spravte z overeného vzorca **pravidlo vo feed nástroji** a pustite ho na zvyšok katalógu.
5. Doplňte custom labels a prestavte podľa nich štruktúru kampaní.

Body 1 až 3 sa dajú stihnúť za jedno popoludnie a nestoja nič. Práve preto je feed prvá vec, ktorú pri prevzatí účtu otváram — a takmer vždy je v ňom viac rezervy než v nastavení kampaní.

Ak si chcete nechať feed a štruktúru kampaní prejsť zvonku, pozrite si [audit](/sluzby/audit) alebo si [rezervujte hovor](/kontakt).
