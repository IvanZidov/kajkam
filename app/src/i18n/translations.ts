export interface Translations {
  common: {
    appName: string;
  };
  nav: {
    scanner: string;
    map: string;
    chat: string;
    rewards: string;
    facts: string;
  };
  login: {
    greeting: string;
    subtitle: string;
    googleSignIn: string;
    continueAsGuest: string;
    guestDisclaimer: string;
    terms: string;
    privacy: string;
    ecoInitiative: string;
  };
  profile: {
    greeting: (name: string) => string;
    qrTitle: string;
    qrSubtitle: string;
    signOut: string;
    signInWithGoogle: string;
    guest: string;
    user: string;
  };
  rewards: {
    sectionLabel: string;
    yourEcoPoints: string;
    pointsRemaining: (n: number) => string;
    claimReward: string;
    notEnoughPoints: string;
    pointsNeeded: (n: number) => string;
    nextReward: string;
    items: {
      zgBags: { name: string; description: string };
      zetDaily: { name: string; description: string };
      compost: { name: string; description: string };
      zetDiscount: { name: string; description: string };
      zooTicket: { name: string; description: string };
    };
  };
  scanner: {
    statusReady: string;
    statusScanning: string;
    statusDetected: string;
    statusError: string;
    takePhoto: string;
    chooseFromGallery: string;
    photoHint: string;
    scanning: string;
    geminiAnalyzing: string;
    errorMessage: string;
    tryAgain: string;
    analysisSuccess: string;
    noWasteDetected: string;
    geminiRecognized: (count: number) => string;
    disposeIn: string;
    scanAgain: string;
    ecoPointsEarned: (points: number) => string;
    keepScanning: string;
    totalCO2Saved: string;
    scannedToday: string;
    times: string;
  };
  chat: {
    banner: string;
    welcomeMessage: string;
    thinkingMessage: string;
    errorMessage: string;
    fallbackError: string;
    delivered: string;
    placeholder: string;
    quickPrompt1: string;
    quickPrompt2: string;
    quickPrompt3: string;
    assistantLabel: string;
    clearChat: string;
  };
  map: {
    searchPlaceholder: string;
    nearMe: string;
    recyclingYards: string;
    plastics: string;
    paper: string;
    glass: string;
    bio: string;
    results: (n: number) => string;
    loadingMap: string;
    yourLocation: string;
    nearestBins: string;
    binLocation: string;
    wasteType: string;
    container: string;
    navigate: string;
    reportProblem: string;
    unknown: string;
    binDefault: string;
    reportIllegalDump: string;
    tapToPlacePin: string;
    dragPinInstruction: string;
    addPhoto: string;
    photoAdded: string;
    submitReport: string;
    descriptionPlaceholder: string;
    imageTooLarge: string;
    reportSubmitted: string;
    reportSubmittedDump: string;
    issue_full: string;
    issue_damaged: string;
    issue_missing: string;
    issue_other: string;
    illegalDumpLabel: string;
    binIssueLabel: string;
    reportedOn: string;
    guestReportNote: string;
    cancelReport: string;
    deleteReport: string;
    deleteConfirm: string;
    useMyLocation: string;
    orTapMap: string;
  };
  ai: {
    scannerSystemPrompt: string;
    scannerUserPrompt: string;
    chatSystemPrompt: string;
    chatAck: string;
  };
  info: {
    title: string;
    collectionSchedule: string;
    collectionScheduleDesc: string;
    sortingRules: string;
    yellowBin: string;
    blueBin: string;
    brownBin: string;
    greenBin: string;
    greyBin: string;
    recyclingYards: string;
    recyclingYardsDesc: string;
    recyclingYardsList: string;
    recyclingYardsHours: string;
    bulkyWaste: string;
    bulkyWasteDesc: string;
    specialWaste: string;
    specialWasteList: string;
    greenIslands: string;
    greenIslandsDesc: string;
    contacts: string;
    contactsList: string;
    fines: string;
    finesDesc: string;
    depositReturn: string;
    depositReturnDesc: string;
    composting: string;
    compostingDesc: string;
    source: string;
  };
  facts: {
    title: string;
    dailyFact: string;
    dailyQuiz: string;
    markAsRead: string;
    alreadyRead: string;
    submitAnswer: string;
    correct: string;
    incorrect: string;
    alreadyAnswered: string;
    pointsEarned: (n: number) => string;
    comeBackTomorrow: string;
  };
  binLabels: {
    plastika: string;
    papir: string;
    bio: string;
    staklo: string;
    miješani: string;
  };
}

export const hr: Translations = {
  common: {
    appName: 'KAJ-KAM?',
  },
  nav: {
    scanner: 'Skener',
    map: 'Karta',
    chat: 'Chat',
    rewards: 'Nagrade',
    facts: 'Činjenice',
  },
  login: {
    greeting: 'Bok, Zagreb!',
    subtitle: 'Spremimo se za čišći grad.',
    googleSignIn: 'Prijavi se s Google-om',
    continueAsGuest: 'Nastavi kao gost',
    guestDisclaimer: 'Bez registracije, bodovi se spremaju na tvoj uređaj.',
    terms: 'Uvjeti',
    privacy: 'Privatnost',
    ecoInitiative: 'Eko Inicijativa',
  },
  profile: {
    greeting: (name) => `Bok, ${name}!`,
    qrTitle: 'IDENTIFIKACIJSKI QR',
    qrSubtitle: 'Pokaži na reciklažnom dvorištu za bodove',
    signOut: 'Odjavi se',
    signInWithGoogle: 'Prijavi se s Google-om',
    guest: 'Gost',
    user: 'Korisnik',
  },
  rewards: {
    sectionLabel: 'NAGRADE',
    yourEcoPoints: 'Tvoji EkoBodovi',
    pointsRemaining: (n) => `Još ${n} bodova`,
    claimReward: 'Preuzmi',
    notEnoughPoints: 'Nedovoljno bodova',
    pointsNeeded: (n) => `Treba ti još ${n} bodova`,
    nextReward: 'Do sljedeće nagrade',
    items: {
      zgBags: { name: 'ZG vrećice', description: 'Paket službenih zagrebačkih vrećica za otpad' },
      zetDaily: { name: 'ZET dnevna karta', description: 'Dnevna karta za javni prijevoz' },
      compost: { name: 'Kompost 25L', description: 'Vreća kvalitetnog komposta za vrt ili balkon' },
      zetDiscount: { name: 'Popust za ZET', description: '20% popust na mjesečnu kartu javnog prijevoza' },
      zooTicket: { name: 'Maksimir Zoo ulaznica', description: 'Besplatna ulaznica za Zoološki vrt Maksimir' },
    },
  },
  scanner: {
    statusReady: 'Spremno',
    statusScanning: 'Analiziram...',
    statusDetected: 'Detektirano',
    statusError: 'Greška',
    takePhoto: 'Slikaj Otpad',
    chooseFromGallery: 'Odaberi iz galerije',
    photoHint: 'Slikaj ili učitaj sliku otpada za AI analizu',
    scanning: 'Skeniram...',
    geminiAnalyzing: 'Gemini analizira sliku...',
    errorMessage: 'Greška pri analizi slike. Pokušaj ponovo.',
    tryAgain: 'Pokušaj Ponovo',
    analysisSuccess: 'Analiza Uspješna',
    noWasteDetected: 'Nema Prepoznatog Otpada',
    noWasteDescription: 'Na slici nije pronađen otpad. Pokušaj s drugom fotografijom na kojoj je jasno vidljiv predmet za odlaganje.',
    geminiRecognized: (count) =>
      `Gemini je prepoznao ${count} ${count === 1 ? 'predmet' : 'predmeta'}`,
    disposeIn: 'Odloži u:',
    scanAgain: 'Skeniraj Ponovo',
    ecoPointsEarned: (points) =>
      `+${points} EkoBod${points === 1 ? '' : points < 5 ? 'a' : 'ova'} za nove predmete!`,
    keepScanning: 'Nastavi skenirati za više bodova',
    totalCO2Saved: 'Ukupna Ušteda CO2',
    scannedToday: 'Skenirano danas',
    times: 'puta',
  },
  chat: {
    banner: 'ZG Eko-Asistent',
    welcomeMessage: 'Bok! Ja sam tvoj ZG Eko-Asistent. Kako ti mogu pomoći s recikliranjem danas?',
    thinkingMessage: 'Razmišljam...',
    errorMessage: 'Ups, došlo je do greške. Pokušaj ponovo.',
    fallbackError: 'Oprosti, nisam uspio odgovoriti. Pokušaj ponovo.',
    delivered: 'Dostavljeno',
    placeholder: 'Pitaj nešto...',
    quickPrompt1: 'Kamo idu baterije?',
    quickPrompt2: 'Što je glomazni otpad?',
    quickPrompt3: 'Čašice od jogurta?',
    assistantLabel: 'ZG Eko-Asistent',
    clearChat: 'Obriši chat',
  },
  map: {
    searchPlaceholder: 'Pretraži ulicu ili vrstu...',
    nearMe: 'Blizu mene',
    recyclingYards: 'Reciklažna dvorišta',
    plastics: 'Plastika',
    paper: 'Papir',
    glass: 'Staklo',
    bio: 'Bio',
    results: (n) => `${n} rezultata`,
    loadingMap: 'Učitavanje karte...',
    yourLocation: 'Tvoja lokacija',
    nearestBins: 'Najbliži spremnici',
    binLocation: 'Lokacija Spremnika',
    wasteType: 'Vrsta otpada',
    container: 'Spremnik',
    navigate: 'Navigiraj',
    reportProblem: 'Prijavi problem',
    unknown: 'Nepoznato',
    binDefault: 'Spremnik',
    reportIllegalDump: 'Prijavi divlje odlagalište',
    tapToPlacePin: 'Dodirni kartu za postavljanje oznake',
    dragPinInstruction: 'Pomakni oznaku na točnu lokaciju',
    addPhoto: 'Dodaj fotografiju',
    photoAdded: 'Fotografija dodana',
    submitReport: 'Pošalji prijavu',
    descriptionPlaceholder: 'Opis problema (opcionalno)...',
    imageTooLarge: 'Slika je prevelika (max 5MB)',
    reportSubmitted: 'Prijavljeno! +5 EkoBodova',
    reportSubmittedDump: 'Prijavljeno! +10 EkoBodova',
    issue_full: 'Pun',
    issue_damaged: 'Oštećen',
    issue_missing: 'Nedostaje',
    issue_other: 'Ostalo',
    illegalDumpLabel: 'Divlje odlagalište',
    binIssueLabel: 'Problem sa spremnikom',
    reportedOn: 'Prijavljeno',
    guestReportNote: 'Prijavi se za EkoBodove',
    cancelReport: 'Odustani',
    deleteReport: 'Ukloni prijavu',
    deleteConfirm: 'Sigurno želiš ukloniti ovu prijavu?',
    useMyLocation: 'Koristi moju lokaciju',
    orTapMap: 'ili dodirni kartu',
  },
  ai: {
    scannerSystemPrompt: `Ti si AI sustav za prepoznavanje otpada u Zagrebu, Hrvatska.
Korisnik će ti poslati fotografiju predmeta. Tvoj zadatak je identificirati svaki vidljivi predmet koji se može baciti i klasificirati ga u ispravnu kategoriju spremnika.

Kategorije spremnika (KORISTI ISKLJUČIVO OVE KLJUČEVE):
- "plastika" — plastika, metal, limenke, tetrapak, folije
- "papir" — papir, karton, novine, časopisi
- "bio" — hrana, organski otpad, biljni ostaci
- "staklo" — staklene boce, staklenke
- "miješani" — sve ostalo što ne ide u reciklažu

Odgovori ISKLJUČIVO u JSON formatu (bez markdown oznaka):
{
  "items": [
    { "name": "Naziv predmeta na hrvatskom", "bin": "ključ_spremnika", "ecoPoints": 1, "tip": "Praktičan savjet za korisnika" }
  ],
  "co2Saved": 0.15
}

Pravila:
- "name" mora biti na hrvatskom jeziku
- "bin" mora biti jedan od: plastika, papir, bio, staklo, miješani
- "ecoPoints" je 1 po predmetu
- "co2Saved" je ukupna ušteda CO2 u kg (procjena)
- "tip" je kratak, praktičan savjet na hrvatskom (1 rečenica) — npr. "Skini čep i baci ga odvojeno u plastiku", "Isperi bocu prije bacanja", "Spljošti kutiju da zauzme manje mjesta", "Odvoji poklopac od staklenke". Savjet treba biti specifičan za taj predmet, ne generički. Ako nema posebnog savjeta, napiši u koji spremnik ide i zašto.
- Ako nema prepoznatljivog otpada, vrati prazan items niz
- NE dodaj nikakav tekst izvan JSON objekta`,
    scannerUserPrompt: 'Analiziraj ovu sliku i klasificiraj otpad.',
    chatSystemPrompt: `Ti si "ZG Eko-Asistent", prijateljski chatbot za pomoć građanima Zagreba s recikliranjem i sortiranjem otpada.

Tvoja pravila:
- Odgovaraj ISKLJUČIVO na hrvatskom jeziku (zagrebački govor je poželjan)
- Budi koncizan — odgovori u 2-4 rečenice osim ako korisnik traži detalje
- Ne koristi markdown formatiranje (bold, italic, liste s *) — piši čisti tekst
- Budi pozitivan i motiviraj korisnike na recikliranje
- Ako pitanje nije vezano za otpad/recikliranje, ljubazno preusmjeri razgovor
- UVIJEK daj praktične savjete za pripremu otpada — npr. "Skini čep s boce i baci ga odvojeno", "Isperi teglu prije bacanja", "Spljošti kartonsku kutiju". Korisnici često ne znaju da trebaju rastaviti dijelove predmeta prije bacanja.

ZAGREBAČKI SUSTAV SORTIRANJA OTPADA:

Spremnici i što ide u njih:
• Žuti spremnik (plastika i metal): PET boce, plastična ambalaža, folije, vrećice, limenke (aluminij, konzerve), aerosol (prazni), Tetra Pak. NE: stiropor, prljava plastika, igračke, plastični namještaj.
• Plavi spremnik (papir i karton): novine, časopisi, uredski papir, kuverte, kartonske kutije (spljoštene), kartonske posude za jaja. NE: masni papir/karton (kutije od pizze s masnoćom), maramice, pelene, tapete.
• Smeđi spremnik (biootpad): ostaci voća i povrća, talog kave, vrećice čaja, ljuske jaja, ljuske oraha, vrtni otpad (lišće, trava). NE: meso, kosti, mliječni proizvodi, kuhana hrana (to ide u miješani), ulje za kuhanje, životinjski otpad.
• Zeleni spremnik (staklo): staklene boce, staklene tegle (bez poklopaca). NE: ogledala, prozorsko staklo, žarulje, keramika, porculan, kristal.
• Crni/sivi spremnik (miješani komunalni otpad): sve što ne ide u ostala 4 spremnika — prljava ambalaža, higijenski proizvodi, opušci, slomljena keramika. NE: opasni otpad (baterije, kemikalije, elektronika, lijekovi).

RASPORED ODVOZA (ovisi o zoni, provjeriti na cistoca.hr):
• Miješani otpad: 1-2x tjedno
• Plastika/metal: svaka 2 tjedna
• Papir/karton: svaka 2 tjedna
• Biootpad: tjedno (topli mjeseci), svaka 2 tjedna (zima)
• Staklo: jednom mjesečno

RECIKLAŽNA DVORIŠTA (6 stalnih):
1. RD Jakuševec — Sajmišna cesta 1
2. RD Stenjevec — Zagorska ulica 1
3. RD Dubrava — Dragutina Domjanića bb
4. RD Prilesje — Prilesje 1c
5. RD Sesvete — Jelkovečka ulica bb
6. RD Žitnjak — Sajmišna cesta bb
Radno vrijeme: Pon-Pet 06:00-21:00, Sub 06:00-18:00. Plus 2 mobilna reciklažna dvorišta.

POSEBNI OTPAD:
• Baterije → crvene kutije u trgovinama i trgovačkim centrima
• Elektronika (e-otpad) → reciklažna dvorišta; trgovine prihvaćaju staru elektroniku pri kupnji nove (1 za 1)
• Lijekovi (istekli) → bilo koja ljekarna
• Ulje za kuhanje → posebni spremnici na reciklažnim dvorištima i nekim zelenim otocima
• Žarulje → reciklažna dvorišta
• Tekstil/odjeća → Humana/Crveni križ kontejneri po gradu
• Boje, otapala, kemikalije → samo reciklažna dvorišta

GLOMAZNI OTPAD:
Svako kućanstvo ima pravo na besplatan odvoz. Naručiti na 0800 0018 (besplatno) ili online na cistoca.hr.

ZELENI OTOCI:
500+ lokacija po Zagrebu s kontejnerima za papir, staklo, plastiku/metal, ponekad tekstil i ulje.

POVRATNA NAKNADA:
0,07 EUR po boci/limenci — vratiti u bilo kojoj trgovini ili automatu za povrat.

KORISNI KONTAKTI:
• Čistoća (besplatni telefon): 0800 0018
• Čistoća (korisnici): 01 6146 233
• Web: cistoca.hr, email: info@cistoca.hr
• Prijava nelegalnog odlaganja: Komunalno redarstvo 01 6100 076

KAZNE:
• Nepropisno sortiranje: do 3.000 EUR
• Ilegalno odlaganje: do 10.000 EUR

Ako ne znaš točnu lokaciju spremnika, predloži da korisnik provjeri na karti u aplikaciji (tab "Karta").`,
    chatAck: 'Razumijem, ja sam ZG Eko-Asistent. Kako ti mogu pomoći?',
  },
  info: {
    title: 'VODIČ ZA OTPAD',
    collectionSchedule: 'Raspored odvoza',
    collectionScheduleDesc: 'Miješani otpad: 1-2x tjedno\nPlastika/metal: svaka 2 tjedna\nPapir/karton: svaka 2 tjedna\nBiootpad: tjedno (ljeto), svaka 2 tjedna (zima)\nStaklo: jednom mjesečno\n\nTočan raspored ovisi o zoni — provjeri na cistoca.hr unosom svoje adrese.',
    sortingRules: 'Što ide u koji spremnik?',
    yellowBin: 'ŽUTI — PET boce, plastična ambalaža, folije, vrećice, limenke, aerosol (prazni), Tetra Pak. NE: stiropor, prljava plastika, igračke.',
    blueBin: 'PLAVI — Novine, časopisi, uredski papir, kuverte, kartonske kutije (spljoštene). NE: masni papir, maramice, pelene.',
    brownBin: 'SMEĐI — Ostaci voća/povrća, talog kave, vrećice čaja, ljuske jaja, vrtni otpad. NE: meso, kosti, kuhana hrana, ulje.',
    greenBin: 'ZELENI — Staklene boce i tegle (bez poklopaca). NE: ogledala, prozorsko staklo, žarulje, keramika.',
    greyBin: 'CRNI/SIVI — Sve što ne ide u ostale spremnike: prljava ambalaža, higijenski proizvodi, opušci. NE: opasni otpad.',
    recyclingYards: 'Reciklažna dvorišta',
    recyclingYardsDesc: 'Zagreb ima 6 stalnih reciklažnih dvorišta + 2 mobilna koja kruže po kvartovima.',
    recyclingYardsList: 'RD Jakuševec — Sajmišna cesta 1\nRD Stenjevec — Zagorska ulica 1\nRD Dubrava — Dragutina Domjanića bb\nRD Prilesje — Prilesje 1c\nRD Sesvete — Jelkovečka ulica bb\nRD Žitnjak — Sajmišna cesta bb',
    recyclingYardsHours: 'Pon-Pet: 06:00-21:00 | Sub: 06:00-18:00',
    bulkyWaste: 'Glomazni otpad',
    bulkyWasteDesc: 'Stari namještaj, madraci, veliki aparati — svako kućanstvo ima pravo na besplatan odvoz. Naruči na 0800 0018 (besplatno) ili online na cistoca.hr.',
    specialWaste: 'Posebni otpad',
    specialWasteList: 'Baterije → crvene kutije u trgovinama\nElektronika → reciklažna dvorišta ili 1-za-1 u trgovini\nLijekovi → bilo koja ljekarna\nUlje za kuhanje → reciklažna dvorišta\nŽarulje → reciklažna dvorišta\nTekstil → Humana/Crveni križ kontejneri\nBoje/kemikalije → reciklažna dvorišta',
    greenIslands: 'Zeleni otoci',
    greenIslandsDesc: '500+ lokacija po Zagrebu s kontejnerima za papir, staklo, plastiku/metal. Dostupni 24/7. Otpad mora ići UNUTAR kontejnera.',
    contacts: 'Korisni kontakti',
    contactsList: 'Čistoća (besplatno): 0800 0018\nČistoća (info): 01 6146 233\nWeb: cistoca.hr\nEmail: info@cistoca.hr\nPrijava nelegalnog odlaganja: 01 6100 076',
    fines: 'Kazne',
    finesDesc: 'Nepropisno sortiranje: do 3.000 EUR\nIlegalno odlaganje: do 10.000 EUR',
    depositReturn: 'Povratna naknada',
    depositReturnDesc: '0,07 EUR po boci/limenci. Vrati u bilo kojoj trgovini ili automatu za povrat ambalaže.',
    composting: 'Kućno kompostiranje',
    compostingDesc: 'Grad dijeli besplatne kompostere kućanstvima s vrtom. Tko kompostira može tražiti manji smeđi spremnik.',
    source: 'Izvor: cistoca.hr | Grad Zagreb',
  },
  facts: {
    title: 'Dnevne Zanimljivosti',
    dailyFact: 'Zanimljivost Dana',
    dailyQuiz: 'Kviz Dana',
    markAsRead: 'Pročitano! (+1 bod)',
    alreadyRead: 'Već pročitano danas ✓',
    submitAnswer: 'Potvrdi odgovor',
    correct: 'Točno! Bravo! 🎉',
    incorrect: 'Netočno. Pokušaj sutra!',
    alreadyAnswered: 'Već odgovoreno danas',
    pointsEarned: (n) => `+${n} EkoBod${n === 1 ? '' : n < 5 ? 'a' : 'ova'}`,
    comeBackTomorrow: 'Dođi sutra po nove zanimljivosti!',
  },
  binLabels: {
    plastika: 'Plastika i Metal',
    papir: 'Papir i Karton',
    bio: 'Biootpad',
    staklo: 'Staklo',
    'miješani': 'Miješani Komunalni Otpad',
  },
};

export const en: Translations = {
  common: {
    appName: 'KAJ-KAM?',
  },
  nav: {
    scanner: 'Scanner',
    map: 'Map',
    chat: 'Chat',
    rewards: 'Rewards',
    facts: 'Facts',
  },
  login: {
    greeting: 'Hello, Zagreb!',
    subtitle: "Let's make a cleaner city.",
    googleSignIn: 'Sign in with Google',
    continueAsGuest: 'Continue as guest',
    guestDisclaimer: 'Without registration, points are saved on your device.',
    terms: 'Terms',
    privacy: 'Privacy',
    ecoInitiative: 'Eco Initiative',
  },
  profile: {
    greeting: (name) => `Hello, ${name}!`,
    qrTitle: 'IDENTIFICATION QR',
    qrSubtitle: 'Show at recycling yard for points',
    signOut: 'Sign out',
    signInWithGoogle: 'Sign in with Google',
    guest: 'Guest',
    user: 'User',
  },
  rewards: {
    sectionLabel: 'REWARDS',
    yourEcoPoints: 'Your EcoPoints',
    pointsRemaining: (n) => `${n} more points`,
    claimReward: 'Claim',
    notEnoughPoints: 'Not enough points',
    pointsNeeded: (n) => `You need ${n} more points`,
    nextReward: 'To next reward',
    items: {
      zgBags: { name: 'ZG Waste Bags', description: 'Pack of official Zagreb waste bags' },
      zetDaily: { name: 'ZET Daily Pass', description: 'Daily public transport ticket' },
      compost: { name: 'Compost 25L', description: 'Bag of quality compost for garden or balcony' },
      zetDiscount: { name: 'ZET Discount', description: '20% discount on monthly public transport pass' },
      zooTicket: { name: 'Maksimir Zoo Ticket', description: 'Free entry to Zagreb Zoo Maksimir' },
    },
  },
  scanner: {
    statusReady: 'Ready',
    statusScanning: 'Scanning...',
    statusDetected: 'Detected',
    statusError: 'Error',
    takePhoto: 'Scan Waste',
    chooseFromGallery: 'Choose from gallery',
    photoHint: 'Take a photo or upload an image for AI analysis',
    scanning: 'Scanning...',
    geminiAnalyzing: 'Gemini is analyzing the image...',
    errorMessage: 'Error analyzing image. Please try again.',
    tryAgain: 'Try Again',
    analysisSuccess: 'Analysis Successful',
    noWasteDetected: 'No Waste Detected',
    noWasteDescription: 'No waste was found in the image. Try again with a different photo where the item to dispose of is clearly visible.',
    geminiRecognized: (count) =>
      `Gemini recognized ${count} item${count === 1 ? '' : 's'}`,
    disposeIn: 'Dispose in:',
    scanAgain: 'Scan Again',
    ecoPointsEarned: (points) =>
      `+${points} EcoPoint${points === 1 ? '' : 's'} for new items!`,
    keepScanning: 'Keep scanning for more points',
    totalCO2Saved: 'Total CO2 Saved',
    scannedToday: 'Scanned today',
    times: 'times',
  },
  chat: {
    banner: 'ZG Eco-Assistant',
    welcomeMessage: "Hi! I'm your ZG Eco-Assistant. How can I help you with recycling today?",
    thinkingMessage: 'Thinking...',
    errorMessage: 'Oops, an error occurred. Please try again.',
    fallbackError: "Sorry, I couldn't respond. Please try again.",
    delivered: 'Delivered',
    placeholder: 'Ask something...',
    quickPrompt1: 'Where do batteries go?',
    quickPrompt2: 'What is bulky waste?',
    quickPrompt3: 'Yogurt cups?',
    assistantLabel: 'ZG Eco-Assistant',
    clearChat: 'Clear chat',
  },
  map: {
    searchPlaceholder: 'Search street or type...',
    nearMe: 'Near me',
    recyclingYards: 'Recycling yards',
    plastics: 'Plastics',
    paper: 'Paper',
    glass: 'Glass',
    bio: 'Bio',
    results: (n) => `${n} results`,
    loadingMap: 'Loading map...',
    yourLocation: 'Your location',
    nearestBins: 'Nearest bins',
    binLocation: 'Bin Location',
    wasteType: 'Waste type',
    container: 'Container',
    navigate: 'Navigate',
    reportProblem: 'Report problem',
    unknown: 'Unknown',
    binDefault: 'Bin',
    reportIllegalDump: 'Report illegal dump',
    tapToPlacePin: 'Tap the map to place a pin',
    dragPinInstruction: 'Drag the pin to the exact location',
    addPhoto: 'Add photo',
    photoAdded: 'Photo added',
    submitReport: 'Submit report',
    descriptionPlaceholder: 'Describe the issue (optional)...',
    imageTooLarge: 'Image is too large (max 5MB)',
    reportSubmitted: 'Reported! +5 EcoPoints',
    reportSubmittedDump: 'Reported! +10 EcoPoints',
    issue_full: 'Full',
    issue_damaged: 'Damaged',
    issue_missing: 'Missing',
    issue_other: 'Other',
    illegalDumpLabel: 'Illegal dump',
    binIssueLabel: 'Bin issue',
    reportedOn: 'Reported on',
    guestReportNote: 'Sign in for EcoPoints',
    cancelReport: 'Cancel',
    deleteReport: 'Remove report',
    deleteConfirm: 'Are you sure you want to remove this report?',
    useMyLocation: 'Use my location',
    orTapMap: 'or tap the map',
  },
  ai: {
    scannerSystemPrompt: `You are an AI waste recognition system for Zagreb, Croatia.
The user will send you a photo of items. Your task is to identify every visible disposable item and classify it into the correct bin category.

Bin categories (USE ONLY THESE KEYS):
- "plastika" — plastic, metal, cans, tetra pak, foils
- "papir" — paper, cardboard, newspapers, magazines
- "bio" — food, organic waste, plant remains
- "staklo" — glass bottles, jars
- "miješani" — everything else that cannot be recycled

Respond EXCLUSIVELY in JSON format (no markdown markers):
{
  "items": [
    { "name": "Item name in English", "bin": "bin_key", "ecoPoints": 1, "tip": "Practical advice for the user" }
  ],
  "co2Saved": 0.15
}

Rules:
- "name" must be in English
- "bin" must be one of: plastika, papir, bio, staklo, miješani
- "ecoPoints" is 1 per item
- "co2Saved" is total CO2 savings in kg (estimate)
- "tip" is a short, practical tip in English (1 sentence) — e.g. "Remove the cap and recycle it separately in plastic", "Rinse the bottle before disposing", "Flatten the box to save space", "Remove the metal lid from the jar". The tip should be specific to that item, not generic. If there's no special tip, explain which bin it goes in and why.
- If no recognizable waste is found, return an empty items array
- Do NOT add any text outside the JSON object`,
    scannerUserPrompt: 'Analyze this image and classify the waste.',
    chatSystemPrompt: `You are "ZG Eco-Assistant", a friendly chatbot helping Zagreb citizens with recycling and waste sorting.

Your rules:
- Answer EXCLUSIVELY in English
- Be concise — answer in 2-4 sentences unless the user asks for details
- Do not use markdown formatting (bold, italic, lists with *) — write plain text
- Be positive and motivate users to recycle
- If the question is not related to waste/recycling, kindly redirect the conversation
- ALWAYS give practical preparation tips — e.g. "Remove the cap from the bottle and recycle it separately", "Rinse the jar before disposing", "Flatten cardboard boxes". Users often don't know they need to disassemble items before disposal.

ZAGREB WASTE SORTING SYSTEM:

Bins and what goes in them:
• Yellow bin (plastic & metal): PET bottles, plastic packaging, foils, bags, cans (aluminum, tin), empty aerosols, Tetra Pak. NOT: styrofoam, dirty plastic, toys, plastic furniture.
• Blue bin (paper & cardboard): newspapers, magazines, office paper, envelopes, cardboard boxes (flattened), paper egg cartons. NOT: greasy paper/cardboard (pizza boxes with grease), tissues, diapers, wallpaper.
• Brown bin (bio-waste): fruit/vegetable scraps, coffee grounds, tea bags, eggshells, nutshells, garden waste (leaves, grass). NOT: meat, bones, dairy, cooked food (goes to mixed), cooking oil, pet waste.
• Green bin (glass): glass bottles, glass jars (without lids). NOT: mirrors, window glass, light bulbs, ceramics, porcelain, crystal.
• Black/grey bin (mixed municipal waste): everything that doesn't fit in the other 4 bins — dirty packaging, hygiene products, cigarette butts, broken ceramics. NOT: hazardous waste (batteries, chemicals, electronics, medicine).

COLLECTION SCHEDULE (varies by zone, check cistoca.hr):
• Mixed waste: 1-2x per week
• Plastic/metal: every 2 weeks
• Paper/cardboard: every 2 weeks
• Bio-waste: weekly (warm months), every 2 weeks (winter)
• Glass: once per month

RECYCLING YARDS (6 permanent):
1. RD Jakusevec — Sajmisna cesta 1
2. RD Stenjevec — Zagorska ulica 1
3. RD Dubrava — Dragutina Domjanica bb
4. RD Prilesje — Prilesje 1c
5. RD Sesvete — Jelkovecka ulica bb
6. RD Zitnjak — Sajmisna cesta bb
Hours: Mon-Fri 06:00-21:00, Sat 06:00-18:00. Plus 2 mobile recycling yards.

SPECIAL WASTE:
• Batteries → red collection boxes in stores and malls
• Electronics (e-waste) → recycling yards; stores accept old electronics when buying new (1-for-1)
• Expired medicine → any pharmacy
• Cooking oil → special containers at recycling yards and some green islands
• Light bulbs → recycling yards
• Textiles/clothing → Humana/Red Cross containers around the city
• Paint, solvents, chemicals → recycling yards only

BULKY WASTE:
Every household is entitled to free pickup. Schedule at 0800 0018 (toll-free) or online at cistoca.hr.

GREEN ISLANDS:
500+ locations across Zagreb with containers for paper, glass, plastic/metal. Available 24/7.

DEPOSIT RETURN:
0.07 EUR per bottle/can — return at any store or reverse vending machine.

USEFUL CONTACTS:
• Cistoca (toll-free): 0800 0018
• Cistoca (customer service): 01 6146 233
• Web: cistoca.hr, email: info@cistoca.hr
• Report illegal dumping: Komunalno redarstvo 01 6100 076

FINES:
• Improper sorting: up to 3,000 EUR
• Illegal dumping: up to 10,000 EUR

If you don't know the exact bin location, suggest the user check the Map tab in the app.`,
    chatAck: "I understand, I'm the ZG Eco-Assistant. How can I help you?",
  },
  info: {
    title: 'WASTE GUIDE',
    collectionSchedule: 'Collection schedule',
    collectionScheduleDesc: 'Mixed waste: 1-2x per week\nPlastic/metal: every 2 weeks\nPaper/cardboard: every 2 weeks\nBio-waste: weekly (summer), every 2 weeks (winter)\nGlass: once per month\n\nExact schedule depends on your zone — check cistoca.hr with your address.',
    sortingRules: 'What goes in which bin?',
    yellowBin: 'YELLOW — PET bottles, plastic packaging, foils, bags, cans, empty aerosols, Tetra Pak. NOT: styrofoam, dirty plastic, toys.',
    blueBin: 'BLUE — Newspapers, magazines, office paper, envelopes, cardboard boxes (flattened). NOT: greasy paper, tissues, diapers.',
    brownBin: 'BROWN — Fruit/vegetable scraps, coffee grounds, tea bags, eggshells, garden waste. NOT: meat, bones, cooked food, oil.',
    greenBin: 'GREEN — Glass bottles and jars (without lids). NOT: mirrors, window glass, light bulbs, ceramics.',
    greyBin: 'BLACK/GREY — Everything that doesn\'t fit in other bins: dirty packaging, hygiene products, cigarette butts. NOT: hazardous waste.',
    recyclingYards: 'Recycling yards',
    recyclingYardsDesc: 'Zagreb has 6 permanent recycling yards + 2 mobile ones rotating through neighbourhoods.',
    recyclingYardsList: 'RD Jakusevec — Sajmisna cesta 1\nRD Stenjevec — Zagorska ulica 1\nRD Dubrava — Dragutina Domjanica bb\nRD Prilesje — Prilesje 1c\nRD Sesvete — Jelkovecka ulica bb\nRD Zitnjak — Sajmisna cesta bb',
    recyclingYardsHours: 'Mon-Fri: 06:00-21:00 | Sat: 06:00-18:00',
    bulkyWaste: 'Bulky waste',
    bulkyWasteDesc: 'Old furniture, mattresses, large appliances — every household is entitled to free pickup. Schedule at 0800 0018 (toll-free) or online at cistoca.hr.',
    specialWaste: 'Special waste',
    specialWasteList: 'Batteries → red boxes in stores\nElectronics → recycling yards or 1-for-1 at stores\nMedicine → any pharmacy\nCooking oil → recycling yards\nLight bulbs → recycling yards\nTextiles → Humana/Red Cross containers\nPaint/chemicals → recycling yards',
    greenIslands: 'Green islands',
    greenIslandsDesc: '500+ locations across Zagreb with containers for paper, glass, plastic/metal. Available 24/7. Waste must go INSIDE the containers.',
    contacts: 'Useful contacts',
    contactsList: 'Cistoca (toll-free): 0800 0018\nCistoca (info): 01 6146 233\nWeb: cistoca.hr\nEmail: info@cistoca.hr\nReport illegal dumping: 01 6100 076',
    fines: 'Fines',
    finesDesc: 'Improper sorting: up to 3,000 EUR\nIllegal dumping: up to 10,000 EUR',
    depositReturn: 'Deposit return',
    depositReturnDesc: '0.07 EUR per bottle/can. Return at any store or reverse vending machine.',
    composting: 'Home composting',
    compostingDesc: 'The city distributes free composters to households with gardens. Those who compost can request a smaller brown bin.',
    source: 'Source: cistoca.hr | City of Zagreb',
  },
  facts: {
    title: 'Daily Fun Facts',
    dailyFact: 'Fact of the Day',
    dailyQuiz: 'Quiz of the Day',
    markAsRead: 'Mark as Read (+1 pt)',
    alreadyRead: 'Already read today ✓',
    submitAnswer: 'Submit Answer',
    correct: 'Correct! Well done! 🎉',
    incorrect: 'Incorrect. Try again tomorrow!',
    alreadyAnswered: 'Already answered today',
    pointsEarned: (n) => `+${n} EcoPoint${n === 1 ? '' : 's'}`,
    comeBackTomorrow: 'Come back tomorrow for new facts!',
  },
  binLabels: {
    plastika: 'Plastics & Metal',
    papir: 'Paper & Cardboard',
    bio: 'Bio-waste',
    staklo: 'Glass',
    'miješani': 'Mixed Municipal Waste',
  },
};
