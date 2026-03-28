import { useState } from 'react';
import { HelpCircle, Trash2, Truck, Radio, LineChart, Leaf, Globe, BookOpen, MessageCircle, Gift, Camera, ArrowRight, AlertTriangle, Linkedin, Code, Sparkles, Server, Database, MapPin, LogIn, Rocket, Building2, Palette, Bot, PenTool, ExternalLink } from 'lucide-react';

const translations = {
  hr: {
    // Nav
    navProblem: 'PROBLEM',
    navHowItWorks: 'KAKO RADI?',
    navFeatures: 'MOGUĆNOSTI',
    navForCity: 'ZA GRAD',
    navCta: 'ISPROBAJ',

    // Hero
    heroTag: 'ZAGREB SMART CITY PROJECT',
    heroHeading2: 'Tvoj AI vodič',
    heroDesc: 'Slikaj otpad, pronađi najbližu kantu i osvoji popuste uz pomoć AI tehnologije. Dostupno na hrvatskom i engleskom.',
    heroCta: 'Isprobaj aplikaciju',
    heroSecondary: 'Kako radi?',

    // About Us
    aboutLabel: 'O NAMA',
    aboutHeading: 'Tim iza KAJ-KAM?',
    aboutDesc: 'Spajamo iskustvo iz eko industrije s AI tehnologijom kako bismo pomogli Zagrebu da bolje sortira otpad.',
    aboutJuricaName: 'Jurica Jurčec',
    aboutJuricaRole: 'Sales & Business Manager',
    aboutJuricaDesc: 'Radio je u eko industriji na proizvodnji postrojenja za recikliranje otpada. Iz prve ruke zna koliko pravilno sortiranje utječe na kvalitetu recikliranih proizvoda.',
    aboutIvanName: 'Ivan Židov',
    aboutIvanRole: 'AI Developer',
    aboutIvanDesc: 'Razvija AI sustave koji građanima olakšavaju svakodnevne odluke — od prepoznavanja otpada do pametnih preporuka za sortiranje.',

    // Problem
    problemLabel: 'IZAZOVI',
    problemHeading: 'Zašto ovo radimo?',
    problemCard1Title: 'Nepoznavanje otpada',
    problemCard1Desc: 'Mnogi građani su u nedoumici kamo odložiti specifične materijale poput tetrapaka ili onečišćenog papira.',
    problemCard2Title: 'Prepuni spremnici',
    problemCard2Desc: 'Kante su često prepune danima, što narušava vizuru grada i potiče nelegalno odlaganje pokraj spremnika.',
    problemCard3Title: 'Neefikasan odvoz',
    problemCard3Desc: 'Holding troši dragocjene resurse na pražnjenje polupraznih kanti dok one pune ostaju zaboravljene.',

    // How it works
    howLabel: 'KAKO RADI?',
    howHeading: 'AI prepoznavanje u 3 koraka',
    howDesc: 'Slikaj, saznaj i skupljaj bodove. Jednostavno, brzo i nagrađivano.',
    howStep1: 'Slikaj otpad',
    howStep2: 'AI prepoznaje',
    howStep3: 'Skupljaj bodove',

    // Gamification
    gamLabel: 'NAGRADE',
    gamHeading: 'Recikliraj i uštedi',
    gamDesc: 'Svaki sken, prijava i kviz donose EkoBodove. Zamijeni ih za besplatne ZG vrećice, popuste na ZET karte, ulaznice za Zoo ili popust na Holding račune.',
    gamScan: 'za svaki sken otpada',
    gamQuiz: 'za točan odgovor na kvizu',
    gamReport: 'za prijavu pune kante',
    gamRewardsLabel: 'Popusti',
    gamRewardsDesc: 'na ZET, Zoo, Holding račune i ZG vrećice',
    gamPoints1: '+1 bod',
    gamPoints2: '+2 boda',
    gamPoints5: '+5 bodova',

    // Features
    featLabel: 'MOGUĆNOSTI',
    featHeading: 'Sve što trebate',
    featDesc: 'Od interaktivne karte do AI asistenta — sve na jednom mjestu.',
    featMapTitle: 'Interaktivna karta',
    featMapDesc: 'Pronađite najbliži spremnik među 2.500+ lokacija u Zagrebu. Filtrirajte po vrsti otpada, prijavite punu kantu i navigirajte do nje jednim klikom.',
    featReportTitle: 'Prijavi problem',
    featReportDesc: 'Uočili ste punu kantu ili nelegalno odložen otpad? Slikajte, odaberite vrstu problema i pošaljite prijavu. Za svaku potvrđenu prijavu osvajate EkoBodove — do +10 za prijavu divljeg odlagališta.',
    featChatTitle: 'AI Eko-Asistent',
    featChatDesc: 'Ne znate kamo s otpadom? Pitajte našeg AI chatbota. ZG Eko-Asistent odgovara na sva pitanja o recikliranju, sortiranju i odlaganju otpada u Zagrebu.',
    featEduTitle: 'Edukacija i višejezičnost',
    featEduDesc: 'Dnevne zanimljivosti o otpadu, kvizovi za dodatne bodove i kompletni vodič za sortiranje. Aplikacija je dostupna na hrvatskom i engleskom jeziku.',
    featEduTag1: 'HR / EN',
    featEduTag2: 'Dnevni kviz',
    featEduTag3: '100+ činjenica',

    // Impact
    impactLabel: 'ZA GRAD',
    impactHeading: 'Svaki sken pomaže Zagrebu',
    impactDesc: 'Kad građani koriste KAJ-KAM?, grad dobiva podatke u realnom vremenu — pune kante se brže prazne, rute odvoza se optimiziraju i okoliš postaje čišći.',
    impactCard1Title: 'Građani kao senzori',
    impactCard1Desc: 'Svaka prijava pune kante stvara mapu stanja u gradu — tisuće korisnika umjesto skupih IoT senzora.',
    impactCard2Title: 'Pametniji odvoz',
    impactCard2Desc: 'Podaci o punim kantama omogućuju optimizaciju ruta — manje goriva, brži odvoz, manje prepunih spremnika.',
    impactCard3Title: 'Čišći kvartovi',
    impactCard3Desc: 'Educirani građani bolje sortiraju, manje otpada završava na krivom mjestu, a parkovi i ulice ostaju čišći.',

    // Tech
    techLabel: 'TEHNOLOGIJE',
    techHeading: 'Izgrađeno sa',
    techDesc: 'Alati i tehnologije koje pokreću KAJ-KAM?',
    techGroupDev: 'Razvoj & Dizajn',
    techGroupAI: 'AI & Inteligencija',
    techGroupInfra: 'Infrastruktura',
    techGroupData: 'Podaci',

    // Footer
    footerCopy: '© 2026 KAJ-KAM? GRAD ZAGREB CIVIC TECH PROJECT. ALL RIGHTS RESERVED.',
    footerTeam: 'BY IVAN & JURICA',
  },
  en: {
    // Nav
    navProblem: 'PROBLEM',
    navHowItWorks: 'HOW IT WORKS',
    navFeatures: 'FEATURES',
    navForCity: 'FOR THE CITY',
    navCta: 'TRY IT',

    // Hero
    heroTag: 'ZAGREB SMART CITY PROJECT',
    heroHeading2: 'Your AI guide',
    heroDesc: 'Snap a photo of your waste, find the nearest bin, and earn discounts with AI technology. Available in Croatian and English.',
    heroCta: 'Try the app',
    heroSecondary: 'How it works',

    // About Us
    aboutLabel: 'ABOUT US',
    aboutHeading: 'The team behind KAJ-KAM?',
    aboutDesc: 'We combine eco industry experience with AI technology to help Zagreb sort waste better.',
    aboutJuricaName: 'Jurica Jurčec',
    aboutJuricaRole: 'Sales & Business Manager',
    aboutJuricaDesc: 'Worked in the eco industry manufacturing waste recycling facilities. He knows firsthand how proper sorting impacts the quality of recycled products.',
    aboutIvanName: 'Ivan Židov',
    aboutIvanRole: 'AI Developer',
    aboutIvanDesc: 'Builds AI systems that help citizens make everyday decisions easier — from waste recognition to smart sorting recommendations.',

    // Problem
    problemLabel: 'CHALLENGES',
    problemHeading: 'Why we built this',
    problemCard1Title: 'Sorting confusion',
    problemCard1Desc: 'Many citizens are unsure where to dispose of specific materials like tetra paks or contaminated paper.',
    problemCard2Title: 'Overflowing bins',
    problemCard2Desc: 'Bins are often full for days, degrading the city\'s appearance and encouraging illegal dumping nearby.',
    problemCard3Title: 'Inefficient collection',
    problemCard3Desc: 'The city utility wastes resources emptying half-empty bins while full ones are left unattended.',

    // How it works
    howLabel: 'HOW IT WORKS',
    howHeading: 'AI recognition in 3 steps',
    howDesc: 'Snap, learn, and collect points. Simple, fast, and rewarding.',
    howStep1: 'Snap your waste',
    howStep2: 'AI recognizes it',
    howStep3: 'Collect points',

    // Gamification
    gamLabel: 'REWARDS',
    gamHeading: 'Recycle and save',
    gamDesc: 'Every scan, report, and quiz earns you EcoPoints. Redeem them for free waste bags, public transit discounts, Zoo tickets, or utility bill discounts.',
    gamScan: 'for each waste scan',
    gamQuiz: 'for a correct quiz answer',
    gamReport: 'for reporting a full bin',
    gamRewardsLabel: 'Discounts',
    gamRewardsDesc: 'on transit, Zoo, utility bills & waste bags',
    gamPoints1: '+1 point',
    gamPoints2: '+2 points',
    gamPoints5: '+5 points',

    // Features
    featLabel: 'FEATURES',
    featHeading: 'Everything you need',
    featDesc: 'From an interactive map to an AI assistant — all in one place.',
    featMapTitle: 'Interactive map',
    featMapDesc: 'Find the nearest bin among 2,500+ locations in Zagreb. Filter by waste type, report a full bin, and navigate to it with one tap.',
    featReportTitle: 'Report a problem',
    featReportDesc: 'Spotted a full bin or illegal dumping? Take a photo, select the issue type, and submit a report. Earn EcoPoints for every confirmed report — up to +10 for illegal dump sites.',
    featChatTitle: 'AI Eco-Assistant',
    featChatDesc: 'Not sure where your waste goes? Ask our AI chatbot. The ZG Eco-Assistant answers all your questions about recycling, sorting, and waste disposal in Zagreb.',
    featEduTitle: 'Education & multilingual',
    featEduDesc: 'Daily waste facts, quizzes for bonus points, and a complete sorting guide. The app is available in Croatian and English.',
    featEduTag1: 'HR / EN',
    featEduTag2: 'Daily quiz',
    featEduTag3: '100+ facts',

    // Impact
    impactLabel: 'FOR THE CITY',
    impactHeading: 'Every scan helps Zagreb',
    impactDesc: 'When citizens use KAJ-KAM?, the city gets real-time data — full bins are emptied faster, collection routes are optimized, and the environment stays cleaner.',
    impactCard1Title: 'Citizens as sensors',
    impactCard1Desc: 'Every full-bin report builds a city-wide status map — thousands of users instead of expensive IoT sensors.',
    impactCard2Title: 'Smarter collection',
    impactCard2Desc: 'Data on full bins enables route optimization — less fuel, faster collection, fewer overflowing containers.',
    impactCard3Title: 'Cleaner neighborhoods',
    impactCard3Desc: 'Educated citizens sort better, less waste ends up in the wrong place, and parks and streets stay cleaner.',

    // Tech
    techLabel: 'TECHNOLOGY',
    techHeading: 'Built with',
    techDesc: 'Tools and technologies powering KAJ-KAM?',
    techGroupDev: 'Development & Design',
    techGroupAI: 'AI & Intelligence',
    techGroupInfra: 'Infrastructure',
    techGroupData: 'Data Sources',

    // Footer
    footerCopy: '© 2026 KAJ-KAM? CITY OF ZAGREB CIVIC TECH PROJECT. ALL RIGHTS RESERVED.',
    footerTeam: 'BY IVAN & JURICA',
  },
} as const;

export default function App() {
  const [lang, setLang] = useState<'hr' | 'en'>('hr');
  const t = translations[lang];
  const screenshots = `/screenshots-${lang}`;

  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#FBF9F8]/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="KAJ-KAM?" className="h-12" />
            <span className="text-2xl font-black tracking-tighter text-[#004482]">KAJ-KAM?</span>
          </div>
          <div className="hidden md:flex gap-8 items-center font-headline font-bold tracking-[0.08em] uppercase text-sm">
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#problem">{t.navProblem}</a>
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#kako-radi">{t.navHowItWorks}</a>
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#mogucnosti">{t.navFeatures}</a>
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#za-grad">{t.navForCity}</a>
            <button
              onClick={() => setLang(lang === 'hr' ? 'en' : 'hr')}
              className="flex items-center gap-1.5 text-slate-600 hover:text-[#004482] transition-colors"
            >
              <Globe className="w-4 h-4" strokeWidth={2} />
              {lang.toUpperCase()}
            </button>
            <a href="https://app.kajkam.net/" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary px-6 py-2 asymmetric-shield active:scale-95 duration-200 transition-opacity hover:opacity-80">
              {t.navCta}
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Section 1: Hero */}
        <section className="relative min-h-[921px] flex items-center bg-surface pt-12 pb-20 lg:pb-24 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <div className="inline-block py-1 px-3 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-[0.2em] uppercase mb-6 asymmetric-shield">
                {t.heroTag}
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-primary uppercase editorial-line-height tracking-tighter mb-6">
                KAJ-KAM?<br />
                <span className="text-on-surface-variant">{t.heroHeading2}</span>
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="https://app.kajkam.net/" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary px-8 py-4 asymmetric-shield font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all active:scale-95">
                  {t.heroCta}
                </a>
                <a href="#kako-radi" className="inline-flex items-center justify-center bg-surface-container-highest text-primary px-8 py-4 asymmetric-shield font-bold uppercase tracking-widest text-sm hover:bg-surface-container-high transition-all active:scale-95">
                  {t.heroSecondary}
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-10 lg:gap-12 shrink-0">
              <div className="relative w-64 h-[540px] bg-on-surface rounded-[3rem] p-4 shadow-2xl shrink-0">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <img
                    alt="KAJ-KAM? App Preview"
                    className="w-full h-full object-cover"
                    src={`${screenshots}/scan2.png`}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 text-center shrink-0 w-full sm:w-auto sm:min-w-[11rem]">
                <a
                  href="https://app.kajkam.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-surface-container-lowest p-4 shadow-lg ring-1 ring-black/[0.06] asymmetric-shield leading-none transition-shadow hover:shadow-xl"
                >
                  <img src="/kajkamqr.svg" alt="QR code - try KAJ-KAM? app" className="size-40 sm:size-44 md:size-48 block" />
                </a>
                <span className="text-sm font-bold uppercase tracking-wide text-primary max-w-[14rem]">
                  {lang === 'hr' ? 'Skeniraj QR i isprobaj aplikaciju' : 'Scan QR to try the app'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: About Us */}
        <section className="py-32 bg-surface" id="o-nama">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.aboutLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4">{t.aboutHeading}</h2>
              <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">{t.aboutDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Jurica */}
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-center text-center gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
                  <img src="/jurica.jpg" alt={t.aboutJuricaName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.aboutJuricaName}</h3>
                  <p className="text-secondary font-bold uppercase tracking-wide text-sm mt-1">{t.aboutJuricaRole}</p>
                </div>
                <p className="text-on-surface-variant leading-relaxed">{t.aboutJuricaDesc}</p>
                <a href="https://www.linkedin.com/in/jurica-jur%C4%8Dec-0768981b7/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-[#005BAB] transition-colors font-bold text-sm uppercase tracking-wide">
                  <Linkedin className="w-5 h-5" strokeWidth={2} /> LinkedIn
                </a>
              </div>
              {/* Ivan */}
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-center text-center gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
                  <img src="/ivan.jpg" alt={t.aboutIvanName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.aboutIvanName}</h3>
                  <p className="text-secondary font-bold uppercase tracking-wide text-sm mt-1">{t.aboutIvanRole}</p>
                </div>
                <p className="text-on-surface-variant leading-relaxed">{t.aboutIvanDesc}</p>
                <a href="https://www.linkedin.com/in/ivan-zidov/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-[#005BAB] transition-colors font-bold text-sm uppercase tracking-wide">
                  <Linkedin className="w-5 h-5" strokeWidth={2} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Problem */}
        <section className="py-32 bg-surface-container-low" id="problem">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.problemLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter">{t.problemHeading}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <HelpCircle className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.problemCard1Title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t.problemCard1Desc}</p>
              </div>
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <Trash2 className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.problemCard2Title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t.problemCard2Desc}</p>
              </div>
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <Truck className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.problemCard3Title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{t.problemCard3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Kako radi? - AI Scanner Flow */}
        <section className="py-32 bg-surface" id="kako-radi">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.howLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4">{t.howHeading}</h2>
              <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">{t.howDesc}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-12 mb-16">
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <img alt="Scan - start" className="w-full h-full object-cover" src={`${screenshots}/scan.png`} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-black text-sm">1</div>
                  <span className="font-bold text-primary uppercase tracking-wide text-sm">{t.howStep1}</span>
                </div>
              </div>

              <ArrowRight className="hidden md:block text-primary/30 w-8 h-8 flex-shrink-0" strokeWidth={2} />

              <div className="flex flex-col items-center gap-4">
                <div className="relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <img alt="Scan - AI results" className="w-full h-full object-cover" src={`${screenshots}/scan2.png`} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-black text-sm">2</div>
                  <span className="font-bold text-primary uppercase tracking-wide text-sm">{t.howStep2}</span>
                </div>
              </div>

              <ArrowRight className="hidden md:block text-primary/30 w-8 h-8 flex-shrink-0" strokeWidth={2} />

              <div className="flex flex-col items-center gap-4">
                <div className="relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <img alt="Scan - points earned" className="w-full h-full object-cover" src={`${screenshots}/scan3.png`} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center font-black text-sm">3</div>
                  <span className="font-bold text-primary uppercase tracking-wide text-sm">{t.howStep3}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gamification & Rewards */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block">{t.gamLabel}</span>
                <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter">{t.gamHeading}</h2>
                <p className="text-xl text-on-surface-variant leading-relaxed max-w-lg">{t.gamDesc}</p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <Camera className="text-primary w-5 h-5" strokeWidth={2} />
                    <span className="text-on-surface-variant"><strong className="text-on-surface">{t.gamPoints1}</strong> {t.gamScan}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="text-primary w-5 h-5" strokeWidth={2} />
                    <span className="text-on-surface-variant"><strong className="text-on-surface">{t.gamPoints2}</strong> {t.gamQuiz}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Trash2 className="text-primary w-5 h-5" strokeWidth={2} />
                    <span className="text-on-surface-variant"><strong className="text-on-surface">{t.gamPoints5}</strong> {t.gamReport}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gift className="text-primary w-5 h-5" strokeWidth={2} />
                    <span className="text-on-surface-variant"><strong className="text-on-surface">{t.gamRewardsLabel}</strong> {t.gamRewardsDesc}</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full flex justify-center gap-6">
                <div className="relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl -rotate-2">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <img alt="EkoBodovi and QR" className="w-full h-full object-cover" src={`${screenshots}/rewards.png`} loading="lazy" />
                  </div>
                </div>
                <div className="hidden lg:block relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl rotate-2 mt-8">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <img alt="Rewards catalog" className="w-full h-full object-cover" src={`${screenshots}/rewards2.png`} loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Features - Map, Education, Chat, Multilingual */}
        <section className="py-32 bg-surface" id="mogucnosti">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.featLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4">{t.featHeading}</h2>
              <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">{t.featDesc}</p>
            </div>

            <div className="space-y-32">
              {/* Feature 1: Map */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <LineChart className="text-primary w-8 h-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">{t.featMapTitle}</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">{t.featMapDesc}</p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-64 h-[540px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img alt="Interactive map" className="w-full h-full object-cover" src={`${screenshots}/map.png`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Report Problems */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <AlertTriangle className="text-primary w-8 h-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">{t.featReportTitle}</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">{t.featReportDesc}</p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-64 h-[540px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img alt="Report bin problems" className="w-full h-full object-cover" src={`${screenshots}/prijava.png`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3: AI Chatbot */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <MessageCircle className="text-primary w-8 h-8" strokeWidth={2} />
                  </div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">{t.featChatTitle}</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">{t.featChatDesc}</p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-64 h-[540px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img alt="AI Eco-Assistant chatbot" className="w-full h-full object-cover" src={`${screenshots}/chat.png`} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4: Education & Multilingual */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                      <BookOpen className="text-primary w-8 h-8" strokeWidth={2} />
                    </div>
                    <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                      <Globe className="text-primary w-8 h-8" strokeWidth={2} />
                    </div>
                  </div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">{t.featEduTitle}</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">{t.featEduDesc}</p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <span className="inline-flex items-center gap-2 py-2 px-4 bg-surface-container-high asymmetric-shield text-sm font-bold text-primary uppercase tracking-wide">
                      <Globe className="w-4 h-4" strokeWidth={2} /> {t.featEduTag1}
                    </span>
                    <span className="inline-flex items-center gap-2 py-2 px-4 bg-surface-container-high asymmetric-shield text-sm font-bold text-primary uppercase tracking-wide">
                      {t.featEduTag2}
                    </span>
                    <span className="inline-flex items-center gap-2 py-2 px-4 bg-surface-container-high asymmetric-shield text-sm font-bold text-primary uppercase tracking-wide">
                      {t.featEduTag3}
                    </span>
                  </div>
                </div>
                <div className="flex-1 w-full flex justify-center gap-6">
                  <div className="relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl -rotate-2">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img alt="Education and facts" className="w-full h-full object-cover" src={`${screenshots}/facts.png`} loading="lazy" />
                    </div>
                  </div>
                  {lang === 'hr' && (
                    <div className="hidden lg:block relative w-56 h-[480px] bg-on-surface rounded-[3rem] p-3 shadow-2xl rotate-2 mt-8">
                      <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                        <img alt="Waste sorting guide" className="w-full h-full object-cover" src="/screenshots-hr/info.png" loading="lazy" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Impact / Za grad */}
        <section className="py-32 bg-primary" id="za-grad">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <span className="text-primary-container font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.impactLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-on-primary uppercase tracking-tighter mb-6">{t.impactHeading}</h2>
              <p className="text-primary-fixed/80 text-xl max-w-2xl mx-auto leading-relaxed">{t.impactDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 asymmetric-shield border border-white/10">
                <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex items-center justify-center mb-6">
                  <Radio className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                </div>
                <h4 className="text-on-primary font-bold uppercase text-lg mb-3">{t.impactCard1Title}</h4>
                <p className="text-primary-fixed/80 leading-relaxed">{t.impactCard1Desc}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 asymmetric-shield border border-white/10">
                <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex items-center justify-center mb-6">
                  <LineChart className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                </div>
                <h4 className="text-on-primary font-bold uppercase text-lg mb-3">{t.impactCard2Title}</h4>
                <p className="text-primary-fixed/80 leading-relaxed">{t.impactCard2Desc}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 asymmetric-shield border border-white/10">
                <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex items-center justify-center mb-6">
                  <Leaf className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                </div>
                <h4 className="text-on-primary font-bold uppercase text-lg mb-3">{t.impactCard3Title}</h4>
                <p className="text-primary-fixed/80 leading-relaxed">{t.impactCard3Desc}</p>
              </div>
            </div>
          </div>
        </section>
        {/* Section 7: Technology Used */}
        <section className="py-32 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">{t.techLabel}</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4">{t.techHeading}</h2>
              <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">{t.techDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Development & Design */}
              <div className="bg-surface-container-lowest p-8 asymmetric-shield">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <Code className="text-primary w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">{t.techGroupDev}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Rocket className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Cursor</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'AI IDE za razvoj' : 'AI IDE for development'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Palette className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Google Stitch</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'UI dizajn' : 'UI design'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PenTool className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Google Nano Banana</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'Dizajn logotipa' : 'Logo design'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI & Intelligence */}
              <div className="bg-surface-container-lowest p-8 asymmetric-shield">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <Sparkles className="text-primary w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">{t.techGroupAI}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Bot className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Google Gemini</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'AI prepoznavanje i chat' : 'AI recognition & chat'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Google Maps API</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'Interaktivne karte' : 'Interactive maps'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="bg-surface-container-lowest p-8 asymmetric-shield">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <Server className="text-primary w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">{t.techGroupInfra}</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <LogIn className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Google Login</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'Autentifikacija' : 'Authentication'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Supabase</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'Baza podataka' : 'Database'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Vercel</span>
                      <span className="text-on-surface-variant text-sm ml-2">Deployment & hosting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Sources */}
              <div className="bg-surface-container-lowest p-8 asymmetric-shield">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-surface-container flex items-center justify-center asymmetric-shield">
                    <Building2 className="text-primary w-5 h-5" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">{t.techGroupData}</h3>
                </div>
                <div className="space-y-4">
                  <a href="https://experience.arcgis.com/experience/f2b7df9552ea4525b64ceb78ba39876c/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <MapPin className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{lang === 'hr' ? 'Grad Zagreb' : 'City of Zagreb'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary transition-colors" strokeWidth={2} />
                      <span className="text-on-surface-variant text-sm ml-0.5">{lang === 'hr' ? 'Javni dataset spremnika' : 'Public bins dataset'}</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <Trash2 className="text-primary/60 w-5 h-5 shrink-0" strokeWidth={2} />
                    <div>
                      <span className="font-bold text-on-surface">Čistoća Zagreb</span>
                      <span className="text-on-surface-variant text-sm ml-2">{lang === 'hr' ? 'Podaci o otpadu' : 'Waste data'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#004482]/15 bg-[#FBF9F8]">
        <div className="flex flex-col md:flex-row justify-between items-center py-12 px-8 max-w-7xl mx-auto gap-4">
          <div className="font-headline text-xs tracking-wider uppercase opacity-70 text-[#004482]">
            {t.footerCopy}
          </div>
          <div className="flex gap-6 items-center">
            <a href="https://www.linkedin.com/in/ivan-zidov/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#004482] transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={2} />
            </a>
            <a href="https://www.linkedin.com/in/jurica-jur%C4%8Dec-0768981b7/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#004482] transition-colors">
              <Linkedin className="w-5 h-5" strokeWidth={2} />
            </a>
          </div>
          <div className="font-bold text-[#004482] text-xs tracking-widest uppercase">
            {t.footerTeam}
          </div>
        </div>
      </footer>
    </div>
  );
}
