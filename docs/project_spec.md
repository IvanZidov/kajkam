### 🌐 1. LANDING PAGE (Stranica za prezentaciju žiriju/javnosti)
Ovo je prva stranica koju žiri vidi kad otvori vaš link. Treba biti moderna, responzivna i jasno komunicirati *problem* i *rješenje*.

**Sekcije i funkcionalnosti:**
*   **Hero Sekcija (Prvi dojam):**
    *   Veliki, upečatljiv naslov (npr. *"KAJ-KAM? - Tvoj AI vodič za čisti Zagreb"*).
    *   Kratki podnaslov: *"Slikaj otpad, pronađi najbližu kantu i osvoji besplatne ZG vrećice."*
    *   **Call-to-Action (CTA) gumbi:** Glavni gumb *"Isprobaj aplikaciju"* (vodi direktno u Web App) i sekundarni gumb *"Kako radi?"* (skrola dolje).
*   **Sekcija "Problem" (Zašto ovo radimo):**
    *   3 kratke točke s ikonama: 
        1. Ljudi ne znaju kamo ide koji otpad. 
        2. Kante su često prepune. 
        3. Holding troši resurse na prazne vožnje.
*   **Sekcija "Kako radi?" (Features Overview):**
    *   Vizualni prikaz u 3 koraka (možete staviti screenshotove ili mockupove vašeg web appa):
        1. **Skeniraj:** Umjetna inteligencija prepoznaje otpad.
        2. **Pronađi:** Interaktivna karta spremnika.
        3. **Prijavi i Profitiraj:** Prijavi pune kante i skupljaj EkoBodove.
*   **B2B / Business Value Sekcija (OVO OSVAJA HACKATHON):**
    *   Napišite zašto se ovo isplati Gradu Zagrebu. 
    *   *Tekst:* "Zagrebački Holding dobiva 'besplatne senzore' kroz *crowdsourcing* građana. Optimizacija ruta odvoza smeća na temelju heatmape punih kanti. Smanjenje kazni za neodvajanje otpada."
*   **Footer:**
    *   Imena vas dvoje, ime tima i napomena "Napravljeno za [Ime Hackathona] 2024/2025".

---

### 📱 2. WEB APLIKACIJA (Glavni MVP)
Kada korisnik klikne "Isprobaj aplikaciju", ulazi u samo sučelje. **Važno:** Iako je na webu, dizajnirajte ju *Mobile-First* (neka sadržaj bude centriran u stupcu širine mobitela, max 450px), jer tako moderne web aplikacije izgledaju najbolje.

Aplikacija treba imati donji navigacijski meni (Bottom Navigation Bar) s 4 taba:

#### Tab 1: AI Skener (Kamera / Upload) - *Core Feature*
*   **Upload/Kamera gumb:** Budući da ste na webu, klik na gumb otvara nativni prozor preglednika za odabir datoteke (ili slikanje ako su na mobitelu).
*   **Loading indikator:** Dok Gemini analizira sliku, prikažite zabavnu poruku (npr. *"Zagrebački AI kopa po smeću..."*).
*   **Prikaz rezultata (JSON Parsiranje):** 
    *   Naslov: Prepoznati predmet (npr. "Aluminijska limenka").
    *   Ikona/Boja kante: (npr. Veliki žuti kvadrat s tekstom "Plastika i Metal").
    *   Kratko objašnjenje zašto ide tamo.
*   **Gamification Pop-up:** Animacija koja kaže "+1 EkoBod za uspješno razdvajanje!".

#### Tab 2: Karta spremnika (ZG Mape)
*   **Google Maps / Leaflet integracija:** Prikaz karte Zagreba.
*   **Učitavanje podataka:** Mapiranje vašeg `CSV/JSON` fajla. Prikaz pinova na lokacijama (`Latitude` i `Longitude`).
*   **Boje markera po vrsti (`Bin_Type`):** 
    *   Npr. Plavi marker za papir, žuti za plastiku, smeđi za biootpad.
*   **Klik na marker (Bottom Sheet):** Kad korisnik klikne na pin, otvori se prozorčić s podacima (`Name`, `Location`, `District`).
*   **Gumb "Prijavi punu kantu":** 
    *   Klikom na ovaj gumb marker mijenja boju u **Crvenu** (ili dobiva ikonu uskličnika).
    *   Poruka: *"Hvala na prijavi! Holding je obaviješten. +5 EkoBodova!"*.

#### Tab 3: ZG Eko-Asistent (AI Chat)
*   **Sučelje slično WhatsAppu:** Polje za unos teksta i prikaz povijesti razgovora.
*   **Gemini Integracija:** LLM model kojemu je u pozadini zadan prompt: *"Ti si asistent Čistoće Zagreb. Odgovaraš na pitanja građana o otpadu."*
*   **Brza pitanja (Čipovi):** Iznad polja za unos stavite 3 gotova pitanja da žiri/korisnik ne mora tipkati (npr. *"Kamo idu baterije?"*, *"Što je glomazni otpad?"*, *"Treba li prati čašice od jogurta?"*). Klikom na čip, pitanje se automatski šalje.

#### Tab 4: Moj Profil (Gamifikacija i Zadržavanje korisnika)
*   **Frictionless Login:** Za hackathon nemojte raditi pravu registraciju. Spremite bodove u preglednikov `LocalStorage` (tako da svatko tko otvori app odmah ima svoj "profil" i 0 bodova).
*   **Brojač EkoBodova:** Veliki broj koji pokazuje trenutno stanje (npr. 15 / 100 bodova).
*   **Progress Bar nagrada:** Vizualna traka koja pokazuje koliko nedostaje do nagrade (npr. paketa ZG vrećica).
*   **Generiranje koda:** Ako korisnik skupi dovoljno bodova, gumb "Preuzmi nagradu" postaje aktivan i generira lažni QR kod ili barkod (za demo svrhu).
