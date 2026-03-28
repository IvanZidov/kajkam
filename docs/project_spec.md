### 1. LANDING PAGE (Stranica za prezentaciju žiriju/javnosti)

Jednostranična prezentacijska stranica (SPA) koja komunicira problem i rješenje. Mobile-first dizajn s fiksnom navigacijom.

**Sekcije i funkcionalnosti:**

*   **Fiksna Navigacija (Top Bar):**
    *   Logo "KAJ-KAM?" s lijeve strane.
    *   Linkovi: Problem, Kako Radi, Za Grad (anchor scroll).
    *   CTA gumb "TRY APP" s desne strane.
    *   Backdrop blur efekt pri skrolanju.

*   **Hero Sekcija (Prvi dojam):**
    *   Naslov: *"KAJ-KAM? Tvoj AI vodič"*.
    *   Podnaslov: *"Slikaj otpad, pronađi najbližu kantu i osvoji besplatne ZG vrećice koristeći Gemini AI tehnologiju."*
    *   Dva CTA gumba: *"Isprobaj aplikaciju"* (vodi u web app) i *"Kako radi?"* (skrola dolje).
    *   Feature slika s prikazom aplikacije.
    *   Naglasak na Zagreb Smart City Project inicijativu.

*   **Sekcija "Problem" (Zašto ovo radimo):**
    *   3 kartice s ikonama:
        1.  **Nepoznavanje otpada** — Građani ne znaju kamo s tetrapacima, zaprljenim papirom itd.
        2.  **Prepuni spremnici** — Kante pune danima, degradiraju izgled grada i potiču divlje odlaganje.
        3.  **Neefikasan odvoz** — Holding troši resurse prazneći poluprazne kante dok pune stoje zaboravljene.

*   **Sekcija "Kako radi?" (3 koraka s app screenshotovima):**
    1.  **Skeniraj** — Gemini AI prepoznaje otpad. Usmjeri kameru i dobij točnu informaciju o boji kante/vrećice.
    2.  **Pronađi** — Interaktivna karta vodi do najbližeg slobodnog spremnika. Filteri prikazuju samo nepune kontejnere.
    3.  **Prijavi i Profitiraj** — Prijavi pune kante ili nepropisno odloženi otpad. Skupljaj EkoBodove zamjenjive za ZG vrećice ili popuste na Holding račun.

*   **B2B / Business Value Sekcija ("Za Grad"):**
    *   3 koristi za Grad Zagreb / Holding:
        1.  **Besplatni senzori** — Crowdsourcing podataka od tisuća korisnika koji svakodnevno mapiraju stanje spremnika.
        2.  **Optimizacija ruta** — Smanjeno gorivo i vrijeme prikupljanja na temelju heatmape stvarno punih kanti.
        3.  **Čišći okoliš** — Manje kazni za neodvajanje otpada, vidljivo čišći parkovi i ulice.
    *   Slika analitičkog dashboarda.

*   **Footer:**
    *   Copyright: "© 2026 KAJ-KAM? GRAD ZAGREB CIVIC TECH PROJECT".
    *   Linkovi: Privatnost, Uvjeti, Kontakt.
    *   Kredit tima: "BY TIM IME".

---

### 2. WEB APLIKACIJA (Glavni MVP)

Mobile-first web aplikacija (max 450px kontejner, centriran na desktopu). Donji navigacijski meni s **5 tabova**. Supabase backend za podatke, autentikaciju i pohranu slika.

#### Autentikacija i Korisnici

*   **Google OAuth** putem Supabase Auth.
*   **Guest Mode** — Puni pristup svim funkcionalnostima bez registracije (localStorage flag `kajkam_guest`).
*   **Profil** — Automatski se kreira/ažurira u `profiles` tablici (display_name, avatar_url, eko_bodovi).
*   **Top Bar** — Logo, HR/EN jezični prekidač, tipka za pomoć (InfoScreen), profil dropdown s QR kodom i opcijom odjave.

#### Internacionalizacija (i18n)

*   Dva jezika: **Hrvatski (HR)** i **Engleski (EN)**.
*   Prekidač u Top Baru, stanje spremljeno u localStorage.
*   733+ prijevodnih ključeva pokriva sav UI tekst, poruke, AI promptove.

---

#### Tab 1: AI Skener — *Core Feature*

*   **Kamera / Upload:** Klik otvara nativni prozor za odabir datoteke ili slikanje na mobitelu.
*   **AI Analiza:** Google Gemini 2.0 Flash API klasificira otpad na slici.
*   **Prikaz rezultata:**
    *   Prepoznati predmet(i) — naziv, boja/ikona kante, objašnjenje.
    *   5 tipova kanti: Žuta (plastika), Plava (papir), Smeđa (bio), Zelena (staklo), Crvena (miješani).
    *   Eko savjeti za svaki predmet.
    *   Izračun ušteđenog CO₂.
*   **Gamifikacija:** +1 EkoBod po skeniranom predmetu.
*   **Statistika (3 kartice):** Ukupni CO₂ ušteđen, skeniranja danas, ukupna skeniranja.
*   **Povijest skeniranja:** Modal s timeline prikazom grupiranim po datumu, thumbnail slikama, detaljima predmeta i bodovima.
*   **Supabase integracija:** Rezultati se spremaju u `scan_history` tablicu, slike u `scan-images` bucket.

---

#### Tab 2: Karta Spremnika

*   **Leaflet karta** centrirana na Zagreb (45.815, 15.982) s 500+ lokacija spremnika iz CSV-a.
*   **Marker clustering** za performanse (max cluster radius: 60px).
*   **Dinamičke ikone** po vrsti otpada s odgovarajućim bojama.
*   **Pretraga** po nazivu, lokaciji ili vrsti spremnika.
*   **Filter chipovi (6):** "Blizu mene", Reciklažna dvorišta, Plastika, Papir, Staklo, Bio.
*   **Geolokacija:** GPS pozicioniranje korisnika, prikaz lokacije na karti, Haversine izračun udaljenosti.
*   **Google Maps navigacija:** Gumb "Navigiraj" otvara smjernice.
*   **Panel detalja:** Naziv, kvart, udaljenost, vrsta otpada, tip kontejnera.

*   **Prijava problema sa spremnikom:**
    *   Gumb "Prijavi problem" otvara formu s 4 vrste problema: Pun, Oštećen, Nedostaje, Ostalo.
    *   Fotografiranje s uređaja + opcionalni opis.
    *   +5 EkoBodova po prijavi, podaci u `bin_reports` tablici.

*   **Prijava divljeg odlaganja:**
    *   Crveni FAB gumb aktivira mod za prijavu.
    *   Klik na kartu ili "Koristi moju lokaciju" za postavljanje pina (draggable marker).
    *   Fotografija + opcionalni opis.
    *   +10 EkoBodova po prijavi (veća vrijednost).
    *   Prijave prikazane kao crvene ⚠ ikone na karti.

*   **Upravljanje prijavama:** Prikaz na karti, detalji s klikom, korisnici mogu brisati vlastite prijave.

---

#### Tab 3: ZG Eko-Asistent (AI Chat)

*   **WhatsApp-stil sučelje** s poviješću razgovora.
*   **Google Gemini 2.0 Flash API** s kontekstualnim system promptom za eko-edukaciju.
*   **Persistentna povijest:** Poruke se spremaju/učitavaju iz `chat_messages` tablice (user_id, role, timestamp).
*   **3 brza pitanja (chipovi):** Klik automatski šalje pitanje.
*   **Brisanje chata:** Briše razgovor iz baze i UI-a.
*   **Vizualni indikatori:** Bot ikona za asistenta, "DELIVERED" za korisnika, spinner za loading.

---

#### Tab 4: Nagrade (EkoBodovi sustav)

*   **Brojač EkoBodova:** Veliki prikaz trenutnog stanja s progress barom prema sljedećoj nagradi.
*   **Katalog 5 nagrada:**
    1.  ZG Vrećice (50 bodova)
    2.  ZET Dnevna karta (100 bodova)
    3.  Kompost set (150 bodova)
    4.  ZET Popust (300 bodova)
    5.  Ulaznica za Zoo (500 bodova)
*   **Kartice nagrada:** Ikona, naziv, opis, cijena u bodovima, gumb "Preuzmi nagradu" (aktivan samo ako ima dovoljno bodova).
*   **QR Kod sekcija:** Prikazuje `/kajkamqr.svg` za skeniranje na partnerskim lokacijama.

**Bodovni sustav (sažetak):**
| Akcija                | Bodovi |
|-----------------------|--------|
| Skeniranje predmeta   | +1     |
| Dnevna činjenica      | +1     |
| Točan odgovor na kviz | +2     |
| Prijava problema      | +5     |
| Prijava divljeg odlaganja | +10 |

---

#### Tab 5: Zanimljivosti (Edukacija)

*   **Dnevna činjenica:**
    *   Rotacija iz 100+ činjenica o otpadu i recikliranju (`DAILY_FACTS`).
    *   Gumb "Pročitano" — +1 EkoBod, onemogućen nakon čitanja (localStorage tracking po datumu).

*   **Dnevni kviz:**
    *   Pitanje + 4 ponuđena odgovora (A, B, C, D kartice).
    *   Vizualna povratna informacija: zeleno za točno (✓), crveno za netočno (✗), fade za neodabrane.
    *   Točan odgovor: +2 EkoBoda. Netočan: 0 bodova.
    *   Zaključan nakon odgovaranja (localStorage tracking po datumu).

*   **Poruka završetka:** Ako su oboje obavljeni — "Vrati se sutra" s ikonom.

---

#### Info Screen (Pomoć)

Modal s 10 detaljnih sekcija o upravljanju otpadom u Zagrebu:

1.  Pravila razvrstavanja (5 obojenih kartica po tipu kante)
2.  Raspored odvoza
3.  Reciklažna dvorišta (radno vrijeme, lokacije)
4.  Glomazni otpad (besplatan odvoz)
5.  Posebni otpad (elektronika, baterije)
6.  Zeleni otoci
7.  Povratna naknada (0,07 EUR)
8.  Kompostiranje
9.  Kontakti (hitni brojevi)
10. Kazne (zakonske sankcije)

---

#### Supabase Backend

**Tablice:**
*   `profiles` — Korisnički podaci (display_name, avatar_url, eko_bodovi)
*   `scan_history` — Rezultati AI skeniranja (items, co2_saved, points, image_url, user_id)
*   `chat_messages` — Povijest razgovora (user_id, role, content, timestamp)
*   `bin_reports` — Prijave problema s kantama i divljeg odlaganja (status, tip, slika, lokacija)

**Storage:**
*   `scan-images` bucket — Fotografije iz skenera i prijava
*   Gost prijave: `reports/guest/`, autenticirani: `reports/{user_id}/`

**RPC:**
*   `increment_eko_bodovi(points)` — Dodjela bodova za razne akcije
