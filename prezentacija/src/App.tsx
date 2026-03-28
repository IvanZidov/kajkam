/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import kajKamLogo from '../../logo/logo.png';

const LogoMark = ({ className, alt = 'KAJ-KAM?' }: { className?: string; alt?: string }) => (
  <img src={kajKamLogo} alt={alt} className={`object-contain object-center ${className ?? ''}`} draggable={false} />
);

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-surface/80 backdrop-blur-md">
    <div className="flex items-center gap-3 md:gap-4 min-w-0">
      <LogoMark className="h-9 w-9 md:h-11 md:w-11 shrink-0" />
      <div className="text-lg md:text-2xl font-black tracking-tighter text-primary truncate">ZAGREB INNOVATE</div>
    </div>
    <nav className="hidden md:flex gap-12 items-center">
      <a className="text-primary border-b-2 border-primary pb-1 font-sans uppercase tracking-widest font-bold hover:opacity-80 transition-opacity" href="#">VISION</a>
      <a className="text-slate-500 font-medium hover:text-primary font-sans uppercase tracking-widest font-bold transition-opacity" href="#">IMPACT</a>
      <a className="text-slate-500 font-medium hover:text-primary font-sans uppercase tracking-widest font-bold transition-opacity" href="#">TEAM</a>
    </nav>
    <button className="bg-primary text-on-primary px-6 md:px-8 py-3 signature-motif font-bold tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all text-sm md:text-base">
      VOTE NOW
    </button>
  </header>
);

const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center border-t border-primary/10 bg-surface z-50">
    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
      <LogoMark className="h-8 w-8 opacity-90" alt="" />
      <span className="font-sans text-xs md:text-sm uppercase tracking-wider text-primary font-bold">© 2026 GRAD ZAGREB | HACKATHON EDITION</span>
    </div>
    <div className="flex gap-8 md:gap-12">
      <a className="font-sans text-xs md:text-sm uppercase tracking-wider text-slate-400 hover:text-secondary transition-colors" href="#">Privacy</a>
      <a className="font-sans text-xs md:text-sm uppercase tracking-wider text-slate-400 hover:text-secondary transition-colors" href="#">Technical Specs</a>
    </div>
  </footer>
);

const Slide1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-24 flex flex-col items-center justify-center relative overflow-hidden bg-surface"
    >
      {/* Subtle Watermark Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <img
          alt="Official architectural seal of Zagreb"
          className="w-full h-full object-contain scale-150 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmTWFCDUxaLl-0goo0M9MIns1z0QGSYZNfVmWZxxDcMbDpzEpKCUz_99MU2l2dDlwtrnDHQtpAx92BsIMnFzVtj07EZJ5FXl2QfxOdt9uK7atfHRRXVEUDSFE7zsEXVf3wawLqQXSX64uZh4H_g-oEZKOdYr0CFkFdRkDgdXwLOmTCBh6BCYcD0FYKd7fXXrJf2q9eGHoqezIy26lxzuzLd3Ts9SaIx4QVKBdpiLA9ngdCllwCyYwJh7UQJppYk9wP0bI62pUWW8Fw"
        />
      </div>

      {/* Content Canvas */}
      <div className="z-10 container mx-auto px-6 text-center">
        <div className="flex flex-col items-center max-w-5xl mx-auto">
          {/* Branding Label */}
          <div className="mb-8 md:mb-12 flex items-center gap-4 bg-surface-container-low px-6 py-2 signature-motif">
            <span className="material-symbols-outlined text-primary">shield</span>
            <span className="text-primary font-sans font-bold tracking-[0.2em] text-xs uppercase">HACKATHON EDITION 2026</span>
          </div>

          <div className="mb-6 md:mb-8 flex justify-center">
            <div className="rounded-2xl bg-surface-container-lowest p-4 md:p-6 signature-motif ring-1 ring-primary/15 shadow-[0_20px_40px_-12px_rgba(27,28,28,0.12)]">
              <LogoMark className="h-28 w-auto md:h-36 lg:h-44 max-w-[min(100%,280px)]" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-primary tracking-tighter leading-none font-headline uppercase mb-6 md:mb-8">
            KAJ-KAM?
          </h1>

          {/* Subtitle with Scale Jump */}
          <div className="max-w-2xl">
            <p className="text-base md:text-lg lg:text-xl text-on-surface-variant font-medium tracking-wide mb-8 md:mb-10">
              Umjetna inteligencija u službi čišćeg grada. <br />
              <span className="text-secondary font-bold">Inovacijski sprint za pametniji Zagreb.</span>
            </p>
          </div>

          <div className="w-full max-w-xl mx-auto mb-10 md:mb-12 px-4 py-5 bg-surface-container-low/80 signature-motif ring-1 ring-primary/10">
            <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
              Aplikaciju i prezentaciju izradili
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start gap-5 sm:gap-10 text-center text-sm md:text-base">
              <div>
                <p className="font-black text-on-surface tracking-tight">Ivan Židov</p>
                <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">AI developer</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-primary/15 shrink-0 self-center" aria-hidden />
              <div>
                <p className="font-black text-on-surface tracking-tight">Jurica Jurčec</p>
                <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">Sales &amp; Business Development</p>
              </div>
            </div>
          </div>

          {/* Call to Action Cluster */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="p-8 bg-surface-container-lowest signature-motif shadow-[0_24px_24px_-4px_rgba(27,28,28,0.06)] flex flex-col items-center gap-4 min-w-[280px] md:min-w-[320px]">
              <div className="w-16 h-16 bg-primary-container/10 rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
              </div>
              <h3 className="font-bold tracking-widest text-primary uppercase text-sm">Pridruži se viziji</h3>
              <p className="text-xs text-on-surface-variant uppercase tracking-tighter">Otvorene prijave do 15.11.</p>
            </div>

            <div className="p-8 bg-surface-container-low signature-motif flex flex-col items-center gap-4 min-w-[280px] md:min-w-[320px]">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-secondary text-4xl">eco</span>
              </div>
              <h3 className="font-bold tracking-widest text-on-surface uppercase text-sm">Čišći Grad</h3>
              <p className="text-xs text-on-surface-variant uppercase tracking-tighter">Održiva budućnost za sve nas</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Slide2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 pb-24 flex flex-col md:flex-row bg-surface"
    >
      {/* Left Side: PROBLEM (ZG Blue Background) */}
      <section className="flex-1 bg-primary text-on-primary p-8 md:p-12 lg:p-24 flex flex-col justify-center">
        <div className="mb-8 md:mb-12">
          <span className="text-secondary font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">URBAN CHALLENGE</span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight uppercase font-headline">PROBLEM</h1>
          <div className="h-1 w-16 md:w-24 bg-secondary mt-6"></div>
        </div>

        <div className="space-y-8 md:space-y-12 max-w-lg">
          {/* Point 1 */}
          <div className="flex items-start gap-4 md:gap-6 group">
            <div className="bg-primary-container p-3 md:p-4 signature-motif flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-2xl md:text-3xl">question_mark</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">UNKNOWN WASTE</h3>
              <p className="text-on-primary-container/80 text-base md:text-lg leading-relaxed">Citizens often lack clarity on how to sort specific household materials correctly.</p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex items-start gap-4 md:gap-6 group">
            <div className="bg-primary-container p-3 md:p-4 signature-motif flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-2xl md:text-3xl">delete_forever</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">FULL BINS</h3>
              <p className="text-on-primary-container/80 text-base md:text-lg leading-relaxed">Lack of real-time data leads to overflowing recycling points and urban clutter.</p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex items-start gap-4 md:gap-6 group">
            <div className="bg-primary-container p-3 md:p-4 signature-motif flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-2xl md:text-3xl">local_shipping</span>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-wider mb-1 md:mb-2">INEFFICIENT TRANSPORT</h3>
              <p className="text-on-primary-container/80 text-base md:text-lg leading-relaxed">Waste collection routes are static and unresponsive to actual fill levels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: RJEŠENJE (White Background) */}
      <section className="flex-1 bg-surface p-8 md:p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-bl-[128px] -mr-24 -mt-24 md:-mr-32 md:-mt-32"></div>
        
        <div className="mb-8 md:mb-12 relative z-10">
          <span className="text-primary font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">CIVIC INNOVATION</span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight uppercase text-primary font-headline">RJEŠENJE</h2>
          <div className="h-1 w-16 md:w-24 bg-primary mt-6"></div>
        </div>

        <div className="relative z-10 flex flex-col xl:flex-row gap-8 md:gap-12 items-center xl:items-start">
          {/* App Mockup Concept */}
          <div className="w-full max-w-sm shrink-0">
            <div className="bg-surface-container-lowest p-4 md:p-6 signature-motif shadow-xl ring-1 ring-outline/10">
              <div className="bg-primary p-4 signature-motif mb-6 flex justify-between items-center gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="bg-on-primary rounded-lg p-1 shrink-0 ring-1 ring-on-primary/20">
                    <LogoMark className="h-8 w-8" alt="" />
                  </div>
                  <span className="text-on-primary font-black tracking-tighter text-lg truncate">KAJ-KAM?</span>
                </div>
                <span className="material-symbols-outlined text-on-primary shrink-0">qr_code_scanner</span>
              </div>

              {/* App Content Bento Style */}
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 signature-motif">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest block mb-2">Next Collection</span>
                  <div className="flex justify-between items-end">
                    <span className="text-xl md:text-2xl font-black text-on-surface">PAPER DAY</span>
                    <span className="text-secondary font-bold text-sm md:text-base">SUTRA</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-low p-4 signature-motif border-b-2 border-primary flex flex-col items-start">
                    <span className="material-symbols-outlined text-primary mb-2">map</span>
                    <span className="text-[10px] uppercase font-bold text-on-surface block">Nearby Bins</span>
                  </div>
                  <div className="bg-surface-container-low p-4 signature-motif flex flex-col items-start">
                    <span className="material-symbols-outlined text-primary mb-2">eco</span>
                    <span className="text-[10px] uppercase font-bold text-on-surface block">Your Impact</span>
                  </div>
                </div>

                <div className="bg-primary text-on-primary p-4 signature-motif flex items-center justify-between cursor-pointer hover:bg-primary/90 transition-colors">
                  <span className="font-bold uppercase tracking-widest text-xs">Scan Waste</span>
                  <span className="material-symbols-outlined">camera_alt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="flex-1 space-y-6">
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed italic">
              "KAJ-KAM? leverages AI-driven scanning and real-time civic data to bridge the gap between citizens and sustainable city management."
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-bold uppercase text-xs md:text-sm tracking-wide">Real-time Bin Monitoring</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-bold uppercase text-xs md:text-sm tracking-wide">AI Waste Classification</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="font-bold uppercase text-xs md:text-sm tracking-wide">Optimized Logistics</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const slideMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.45 },
} as const;

const Slide3 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col items-center justify-center px-6 bg-surface relative overflow-hidden"
  >
    <div className="absolute top-24 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-0" />
    <div className="z-10 max-w-5xl mx-auto text-center mb-12 md:mb-16">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">KORACI</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tight uppercase font-headline">Kako radi?</h2>
      <p className="mt-4 text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
        Tri jednostavna koraka od fotografije do pametnijeg grada.
      </p>
    </div>
    <div className="z-10 grid md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
      {[
        { step: '01', icon: 'photo_camera', title: 'Skeniraj', desc: 'AI prepoznaje otpad na slici i kaže u koju kantu ide.' },
        { step: '02', icon: 'map', title: 'Pronađi', desc: 'Interaktivna karta spremnika po Zagrebu s bojama po vrsti.' },
        { step: '03', icon: 'volunteer_activism', title: 'Prijavi i skupljaj', desc: 'Prijavi punu kantu i osvajaj EkoBodove prema nagradama.' },
      ].map((item) => (
        <div
          key={item.step}
          className="bg-surface-container-lowest signature-motif p-8 md:p-10 ring-1 ring-outline/10 flex flex-col items-center text-center"
        >
          <span className="text-secondary font-black text-4xl md:text-5xl font-headline mb-4">{item.step}</span>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
          </div>
          <h3 className="text-xl font-black uppercase tracking-wide text-primary mb-3">{item.title}</h3>
          <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const Slide4 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col lg:flex-row bg-surface"
  >
    <section className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-primary/10">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">ULAZ U PROIZVOD</span>
      <h2 className="text-4xl md:text-5xl font-black text-primary uppercase font-headline tracking-tight mb-6">Landing stranica</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
        Prvi dojam za žiri i javnost: jasan problem, rješenje i poziv na akciju — „Isprobaj aplikaciju“ i „Kako radi?“.
      </p>
      <ul className="space-y-3">
        {['Hero s naslovom i CTA gumbima', 'Sekcija problem (3 točke)', 'Pregled značajki i B2B vrijednost'].map((t) => (
          <li key={t} className="flex items-center gap-3 text-sm md:text-base font-medium">
            <span className="material-symbols-outlined text-primary text-xl">chevron_right</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
    <section className="flex-1 bg-primary text-on-primary p-8 md:p-16 lg:p-20 flex flex-col justify-center">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">MVP</span>
      <h2 className="text-4xl md:text-5xl font-black uppercase font-headline tracking-tight mb-6">Web aplikacija</h2>
      <p className="text-on-primary-container/90 text-lg leading-relaxed mb-8">
        Mobile-first sučelje (do ~450px), donja navigacija s četiri taba — sve na jednom mjestu u pregledniku.
      </p>
      <div className="flex flex-wrap gap-2">
        {['AI skener', 'Karta', 'Eko-asistent', 'Profil'].map((t) => (
          <span key={t} className="px-4 py-2 bg-primary-container/30 signature-motif text-xs font-bold uppercase tracking-wider">
            {t}
          </span>
        ))}
      </div>
    </section>
  </motion.div>
);

const Slide5 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col md:flex-row items-stretch bg-surface"
  >
    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 1 — JEZGRA</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight mb-6">AI skener</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
        Upload ili kamera: Gemini analizira sliku i vraća naziv predmeta, vrstu kante i kratko objašnjenje. Nakon uspjeha — EkoBod i motivacijski pop-up.
      </p>
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <span className="material-symbols-outlined text-secondary text-2xl shrink-0">hourglass_empty</span>
          <div>
            <p className="font-bold uppercase text-sm tracking-wide text-primary">Učitavanje</p>
            <p className="text-on-surface-variant text-sm">Poruka tipa „Zagrebački AI kopa po smeću…“</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="material-symbols-outlined text-secondary text-2xl shrink-0">recycling</span>
          <div>
            <p className="font-bold uppercase text-sm tracking-wide text-primary">Rezultat</p>
            <p className="text-on-surface-variant text-sm">JSON → čitljiv prikaz: kanta, boja/ikona, zašto tamo ide.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-surface-container-low p-8 md:p-14 flex items-center justify-center signature-motif m-4 md:m-8 ring-1 ring-outline/10">
      <div className="w-full max-w-sm bg-surface-container-lowest p-6 signature-motif shadow-xl">
        <div className="aspect-[4/5] bg-surface-container-low rounded-lg flex flex-col items-center justify-center gap-4 mb-4 border-2 border-dashed border-primary/30">
          <span className="material-symbols-outlined text-primary text-5xl">add_a_photo</span>
          <span className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Odaberi sliku</span>
        </div>
        <div className="bg-primary text-on-primary p-4 signature-motif flex justify-between items-center">
          <span className="font-bold text-sm uppercase tracking-wider">Aluminijska limenka</span>
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <p className="text-center text-secondary font-bold text-sm mt-3 uppercase tracking-wide">+1 EkoBod</p>
      </div>
    </div>
  </motion.div>
);

const Slide6 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 bg-primary text-on-primary flex flex-col lg:flex-row"
  >
    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center order-2 lg:order-1">
      <div className="bg-on-primary/10 signature-motif p-6 md:p-8 max-w-md mx-auto lg:mx-0 w-full ring-1 ring-on-primary/20">
        <div className="aspect-video bg-primary-container/20 rounded flex items-center justify-center mb-4 relative overflow-hidden">
          <span className="material-symbols-outlined text-on-primary/40 text-6xl">map</span>
          <span className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-blue-400" />
          <span className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-amber-400" />
          <span className="absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-amber-700" />
        </div>
        <p className="text-xs uppercase tracking-widest text-secondary font-bold mb-2">Bottom sheet</p>
        <p className="text-sm text-on-primary-container/85">Ime, lokacija, kvart — gumb „Prijavi punu kantu“ → marker crveno / upozorenje + bodovi.</p>
      </div>
    </div>
    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 2</span>
      <h2 className="text-4xl md:text-6xl font-black uppercase font-headline tracking-tight mb-6">Karta spremnika</h2>
      <p className="text-on-primary-container/90 text-lg leading-relaxed mb-8">
        Karta Zagreba s pinovima iz CSV/JSON-a. Boje markera po <strong className="text-on-primary">Bin_Type</strong> — papir, plastika, bio i ostalo na prvi pogled.
      </p>
      <ul className="space-y-3 text-on-primary-container/90">
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">touch_app</span>
          Klik na marker otvara detalje spremnika.
        </li>
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">campaign</span>
          Crowdsourcing punih kanti za Holding.
        </li>
      </ul>
    </div>
  </motion.div>
);

const Slide7 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col items-center justify-center px-6 bg-surface"
  >
    <div className="max-w-3xl w-full text-center mb-10">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">TAB 3</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight mb-4">ZG Eko-asistent</h2>
      <p className="text-on-surface-variant text-lg">
        Chat sučelje s Geminijem u ulozi asistenta Čistoće: pitanja o otpadu, pravilima i savjetima za građane.
      </p>
    </div>
    <div className="w-full max-w-lg bg-surface-container-lowest signature-motif p-6 ring-1 ring-outline/10 shadow-xl">
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {['Kamo idu baterije?', 'Što je glomazni otpad?', 'Prati li se jogurt čašica?'].map((q) => (
          <button
            key={q}
            type="button"
            className="text-xs px-3 py-2 bg-surface-container-high text-primary font-bold uppercase tracking-tight signature-motif hover:bg-primary/10 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
      <div className="space-y-3 text-left min-h-[120px]">
        <div className="bg-surface-container-low p-3 rounded-2xl rounded-bl-md text-sm text-on-surface-variant max-w-[85%]">
          Kamo idu baterije?
        </div>
        <div className="bg-primary/10 p-3 rounded-2xl rounded-br-md text-sm text-on-surface ml-auto max-w-[90%]">
          Baterije i akumulatori idu u posebne spremnike ili Zelenom točku — ne u kućni otpad.
        </div>
      </div>
      <div className="mt-6 flex gap-2 border-t border-outline/20 pt-4">
        <span className="material-symbols-outlined text-on-surface-variant">chat</span>
        <span className="text-xs text-on-surface-variant uppercase tracking-widest flex items-center">Brza pitanja = nulta trenja za žiri</span>
      </div>
    </div>
  </motion.div>
);

const Slide8 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col md:flex-row bg-surface-container-low"
  >
    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 4 — ZADRŽAVANJE</span>
      <h2 className="text-4xl md:text-5xl font-black text-primary uppercase font-headline tracking-tight mb-6">Moj profil</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
        Bez prave registracije za hackathon: EkoBodovi u <code className="text-primary font-mono text-sm bg-surface px-2 py-0.5 rounded">localStorage</code> — odmah „tvoj“ profil i napredak.
      </p>
      <ul className="space-y-2 text-on-surface-variant">
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">stars</span> Veliki brojač bodova (npr. 15 / 100)</li>
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">linear_scale</span> Progress bar do nagrade (ZG vrećice)</li>
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">qr_code_2</span> Demo QR/barkod kad se prag ispuni</li>
      </ul>
    </div>
    <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
      <div className="w-full max-w-xs bg-surface signature-motif p-8 shadow-xl ring-1 ring-outline/10 text-center">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-2">EkoBodovi</p>
        <p className="text-6xl font-black text-primary font-headline mb-4">15</p>
        <div className="h-3 bg-surface-container-high rounded-full overflow-hidden mb-2">
          <div className="h-full w-[15%] bg-secondary rounded-full" />
        </div>
        <p className="text-xs text-on-surface-variant mb-6">Još 85 do paketa vrećica</p>
        <button type="button" className="w-full py-3 bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-widest signature-motif cursor-default">
          Preuzmi nagradu (zaključano)
        </button>
      </div>
    </div>
  </motion.div>
);

const Slide9 = () => (
  <motion.div
    {...slideMotion}
    className="min-h-screen pt-24 pb-32 flex flex-col items-center justify-center px-6 bg-surface relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
    <div className="z-10 max-w-4xl w-full">
      <div className="text-center mb-12">
        <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase block mb-4">ZA GRAD ZAGREB</span>
        <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight">Poslovna vrijednost</h2>
        <p className="mt-4 text-on-surface-variant text-lg max-w-2xl mx-auto">
          Zašto se ovo isplati Holdingu i građanima — ne samo „lijepa aplikacija“.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: 'sensors', title: 'Crowdsourcing', desc: 'Građani kao „senzori“ — podaci o punim kantama bez skupe infrastrukture.' },
          { icon: 'route', title: 'Rute odvoza', desc: 'Heatmapa i signali za optimizaciju vožnji umjesto statičkih ruta.' },
          { icon: 'gavel', title: 'Manje rizika', desc: 'Bolje odvajanje smanjuje pritisak kazni i nepravilnog odlaganja.' },
        ].map((c) => (
          <div key={c.title} className="bg-surface-container-lowest p-8 signature-motif ring-1 ring-outline/10">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">{c.icon}</span>
            <h3 className="text-lg font-black uppercase tracking-wide text-primary mb-3">{c.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-12 gap-5">
        <div className="rounded-2xl bg-surface-container-low p-4 ring-1 ring-primary/10">
          <LogoMark className="h-16 w-auto md:h-20" />
        </div>
        <p className="text-primary font-bold uppercase tracking-[0.15em] text-sm text-center">
          KAJ-KAM? — hvala žiriju
        </p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlide((s) => Math.min(s + 1, slides.length - 1));
      }
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((s) => Math.max(s - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((s) => Math.min(s + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((s) => Math.max(s - 1, 0));

  const CurrentSlideComponent = slides[currentSlide];
  const showDeckWatermark = currentSlide >= 1 && currentSlide <= 7;

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col overflow-hidden selection:bg-primary selection:text-on-primary">
      <Header />

      {showDeckWatermark && (
        <div
          className="fixed top-24 right-4 md:right-10 z-40 pointer-events-none hidden sm:block"
          aria-hidden
        >
          <div className="rounded-xl bg-surface/95 backdrop-blur-sm p-2 shadow-lg ring-1 ring-primary/10">
            <LogoMark className="h-10 w-10 md:h-12 md:w-12 opacity-95" alt="" />
          </div>
        </div>
      )}
      
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <CurrentSlideComponent key={currentSlide} />
        </AnimatePresence>
      </main>

      <Footer />

      {/* Slide Navigation Controls */}
      <div className="fixed bottom-24 md:bottom-8 right-6 md:right-12 z-50 flex gap-2">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-2 bg-surface-container-high rounded-full text-primary disabled:opacity-30 hover:bg-primary/10 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-2 bg-surface-container-high rounded-full text-primary disabled:opacity-30 hover:bg-primary/10 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Slide Indicators */}
      <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
          />
        ))}
      </div>
    </div>
  );
}
