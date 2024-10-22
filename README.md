# BiciKlik
> U suvremenom okruženju biciklisti često traže načine za povezivanje s drugima, sudjelovanje
u događanjima i pronalaženje dobrih ruta za vožnju. Mnoge već popularne aplikacije ne nude
platformu za interakciju i dijeljenje iskustava. Biciklisti tako mogu propustiti prilike za
sudjelovanje u zajednici, što može utjecati na njihovo zadovoljstvo sportom i motivaciju za
daljnju vožnju.
>* Naša aplikacija ima potencijal i želju ispuniti tu prazninu te unaprijediti biciklističko iskustvo.

# Funkcijski zahtjevi
>### Korisničke uloge
> Korisnici će moći odabrati između tri uloge (User, Organizator,
Admin) prilikom registracije. Ove uloge dozvoljavaju pristup različitim funkcijama
aplikacije; organizatorima omogućuju da kreiraju događaje, userima da se na njih
prijavljuju i traže nove rute za vožnju, dok administratori imaju pristup alatima za
upravljanje korisnicima i sadržajem.

>### Newsfeed
> Aplikacija će imati dinamički newsfeed koji prikazuje nadolazeće
biciklističke događaje, te će tako korisnicima dati jednostavan pristup informacijama i
opcijama za prijavu.

>### Alat za izradu ruta
> Korisnik će moći kreirati svoju rutu koristeći početnu i finalnu
točku ili „punktove“ kroz koje želi proći.

>### Komunikacija među korisnicima
> Chat funkcionalnost omogućit će korisnicima da
međusobno komuniciraju, razmjenjuju savjete i organiziraju zajedničke vožnje.

>### Ocjenjivanje ruta
> Korisnici će moći ocjenjivati rute koristeći lajkove i dislajkove te
ih "pinnati" za buduću upotrebu, čime će se poticati dijeljenje kvalitetnih informacija.

>### Leaderboard
> Sustav rangiranja korisnika na temelju vremena ostvarenih na
događanjima, uz mogućnost arhiviranja rezultata ostvarit će, nadamo se, natjecateljski
duh među korisnicima. Sam unos vremena biti će proizvoljan, User može unijeti
vrijeme koje je ostvario bez provjere točnosti.


# Tehnologije
>* Sustav će imati vlastitu domenu koristeći Azure Cloud sustav
>* Sustav će biti implementiran koristeći NodeJS, ExpressJS, React u jeziku TypeScript
>* Sustav će koristiti bazu podataka MongoDB
>* Za implementaciju kreiranja ruta, sustav će koristiti Google Maps API
>* Korisničke rute će se spremati na serveru u .gpx formatu, te će njihove putanje biti
spremljene u bazi podataka zajedno sa unikatnim identifikatorom i imenom rute koje
zadaje korisnik
>* Aplikacija će biti isključivo web-aplikacija te će biti kompatibilna sa Google Chrome,
Chromium, Microsoft Edge i Firefox web browserima

# Članovi tima 
>* Matija Fauković
>* Andrej Filipčić
>* Egon Hajpek
>* Ante Ivančić
>* Oliver Kreitmeyer
>* Marin Prusac
>* Petra Turković


# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg
