/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ChevronLeft, ChevronRight, Cpu, Mail } from 'lucide-react';
import kajKamoLogo from '../../logo/logo.png';

const LogoMark = ({ className, alt = 'Kaj-Kam' }: { className?: string; alt?: string }) => (
  <img src={kajKamoLogo} alt={alt} className={`object-contain object-center ${className ?? ''}`} draggable={false} />
);

/** Fills flex main; vertical scroll inside slide when content is taller than viewport. */
const slideFrame =
  'slide-scroll h-full min-h-0 w-full scroll-pb-32 overflow-y-auto overflow-x-hidden overscroll-y-contain pt-16 pb-[8.5rem] sm:pt-20 sm:pb-36 md:pb-40 max-[380px]:pt-14 max-[380px]:pb-[7.5rem]';

const pressAsset = (file: string) => `${import.meta.env.BASE_URL}press/${file}`;

const pressScreenshots: { file: string; alt: string }[] = [
  { file: 'press-01.png', alt: 'News: Zagreb waste plan to 2029 and heated political debate' },
  { file: 'press-03.png', alt: 'TV coverage: Zagreb waste struggle and overflowing recycling bins' },
  { file: 'press-04.png', alt: 'Headline on poor street waste conditions in Zagreb' },
  { file: 'press-05.png', alt: 'Article on bio-waste recycling and regulatory blockages' },
  { file: 'press-06.png', alt: 'Report: landfill transition and criticism of the waste plan' },
  { file: 'press-07.png', alt: 'Residents and new pay-as-you-throw waste charging in Zagreb' },
];

const Header = () => (
  <header className="fixed top-0 left-0 z-50 flex w-full flex-wrap items-center justify-between gap-3 bg-surface/80 px-6 py-4 backdrop-blur-md md:gap-4 md:px-12 md:py-5">
    <div className="flex min-w-0 max-w-[min(100%,28rem)] flex-1 items-center gap-3 md:gap-5">
      <LogoMark className="h-9 w-9 shrink-0 md:h-11 md:w-11" />
      <div className="min-w-0 truncate text-lg font-black tracking-tighter text-primary md:text-2xl">ZAGREB INNOVATE</div>
    </div>
    <div className="flex shrink-0 items-center gap-3 bg-surface-container-low px-4 py-2 signature-motif md:gap-4 md:px-6">
      <span className="material-symbols-outlined shrink-0 text-xl text-primary md:text-2xl">shield</span>
      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.2em] md:text-sm">
        HACKATHON EDITION 2026
      </span>
    </div>
  </header>
);

const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center border-t border-primary/10 bg-surface z-50">
    <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-0">
      <LogoMark className="h-8 w-8 opacity-90" alt="" />
      <span className="font-sans text-xs md:text-sm uppercase tracking-wider text-primary font-bold">© 2026 CITY OF ZAGREB | HACKATHON EDITION</span>
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
      className={`${slideFrame} relative flex flex-col items-center justify-start bg-surface`}
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
      <div className="z-10 container mx-auto w-full min-w-0 px-4 py-2 text-center sm:px-6 sm:py-4">
        <div className="mx-auto flex w-full min-w-0 max-w-5xl flex-col items-center">
          <div className="mb-3 flex justify-center sm:mb-6 md:mb-8">
            <div className="rounded-2xl bg-surface-container-lowest p-3 signature-motif ring-1 ring-primary/15 shadow-[0_20px_40px_-12px_rgba(27,28,28,0.12)] sm:p-4 md:p-6">
              <LogoMark className="h-16 w-auto max-w-[min(100%,240px)] sm:h-24 md:h-36 md:max-w-[min(100%,280px)] lg:h-44" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="mb-3 font-headline text-[clamp(2.75rem,14vw,10rem)] font-black uppercase leading-none tracking-tighter text-primary sm:mb-6 md:mb-8">
            KAJ-KAM?
          </h1>

          {/* Subtitle with Scale Jump */}
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-medium tracking-wide text-on-surface-variant sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:text-xl">
              AI in service of a cleaner city. <br />
              <span className="text-secondary font-bold">An innovation sprint for a smarter Zagreb.</span>
            </p>
          </div>

          <div className="mx-auto mb-0 w-full max-w-2xl">
            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-surface via-surface-container-low/40 to-primary/[0.07] p-4 shadow-[0_16px_48px_-12px_rgba(0,52,102,0.12)] backdrop-blur-sm sm:rounded-[2rem] sm:p-6 md:p-8">
              <div className="mb-4 flex flex-col items-center gap-2 text-center sm:mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  Team
                </span>
                <p className="max-w-md text-sm font-medium leading-snug text-on-surface-variant md:text-base">
                  App &amp; presentation by
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="group flex flex-col items-center rounded-2xl border border-white/60 bg-surface/80 p-5 text-center shadow-sm ring-1 ring-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/15 md:p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-lg font-black tracking-tight text-on-primary shadow-inner">
                    IŽ
                  </div>
                  <p className="font-headline text-lg font-black tracking-tight text-primary md:text-xl">Ivan Židov</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-on-surface-variant">
                    <Cpu className="h-3.5 w-3.5 shrink-0 text-secondary" strokeWidth={2.25} />
                    AI developer
                  </div>
                  <a
                    href="mailto:ivan@textvalue.ai"
                    className="mt-4 inline-flex max-w-full items-center gap-1.5 break-all text-xs font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-secondary hover:decoration-secondary"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    ivan@textvalue.ai
                  </a>
                </div>
                <div className="group flex flex-col items-center rounded-2xl border border-white/60 bg-surface/80 p-5 text-center shadow-sm ring-1 ring-primary/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/15 md:p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/90 to-secondary text-lg font-black tracking-tight text-white shadow-inner">
                    JJ
                  </div>
                  <p className="font-headline text-lg font-black tracking-tight text-primary md:text-xl">Jurica Jurčec</p>
                  <div className="mt-3 inline-flex max-w-[240px] flex-wrap items-center justify-center gap-x-1 gap-y-0.5 rounded-full bg-surface-container-high px-3 py-1.5 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide text-on-surface-variant sm:max-w-none sm:text-[11px]">
                    <Briefcase className="h-3.5 w-3.5 shrink-0 text-secondary" strokeWidth={2.25} />
                    Sales &amp; Business Development
                  </div>
                  <a
                    href="mailto:jurica.jurcec@itboost.hr"
                    className="mt-4 inline-flex max-w-full items-center gap-1.5 break-all text-xs font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-secondary hover:decoration-secondary"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    jurica.jurcec@itboost.hr
                  </a>
                </div>
              </div>
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
      className={`${slideFrame} flex min-h-0 flex-col lg:flex-row lg:items-stretch bg-surface`}
    >
      {/* PROBLEM — evidence first, then framing */}
      <section className="flex min-h-0 flex-1 flex-col justify-start overflow-y-auto bg-primary p-6 text-on-primary lg:min-w-0 lg:max-w-[min(100%,52%)] lg:p-8 xl:p-10">
        <div className="mb-4 shrink-0 lg:mb-5">
          <span className="text-secondary mb-2 block text-xs font-bold uppercase tracking-[0.2em] md:text-sm">SPARKED BY REAL HEADLINES</span>
          <h1 className="font-headline text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">PROBLEM</h1>
          <div className="mt-3 h-1 w-16 bg-secondary md:mt-4 md:w-20"></div>
        </div>

        <p className="mb-4 max-w-xl text-sm leading-relaxed text-on-primary-container/90 md:mb-5 md:text-[0.95rem]">
          The same story in Croatian press and TV: contested plans, strained streets, and residents left guessing when rules and fees shift — why we started Kaj-Kam.
        </p>

        <div className="mb-5 rounded-2xl bg-on-primary/[0.06] p-3 ring-1 ring-on-primary/15 md:p-4">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container/75 md:text-[11px]">
            Press &amp; TV — headline screenshots
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
            {pressScreenshots.map((shot) => (
              <figure
                key={shot.file}
                className="group min-w-0 overflow-hidden rounded-lg bg-on-primary/10 ring-1 ring-on-primary/30 shadow-md transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:ring-on-primary/50 hover:shadow-lg"
              >
                <img
                  src={pressAsset(shot.file)}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] h-auto w-full object-cover object-top"
                />
              </figure>
            ))}
          </div>
          <p className="mt-2.5 text-[9px] leading-snug text-on-primary-container/55 md:text-[10px]">
            Editorial screenshots — sources belong to respective publishers.
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-3 md:gap-3.5">
          {[
            {
              icon: 'newspaper' as const,
              title: 'Plans under fire',
              body: 'Waste plan to 2029, landfill transition, and infrastructure split opinion; critics call strategies incomplete while deadlines and costs mount.',
            },
            {
              icon: 'delete_forever' as const,
              title: "The street doesn't lie",
              body: 'Press photos and TV show overflowing bins and damaged containers. When the mess is routine, people tune out — but the waste stays.',
            },
            {
              icon: 'quiz' as const,
              title: 'Rules vs. clarity',
              body: 'Pay-as-you-throw and separation confuse many; coverage flags uneven enforcement — without a simple guide at the doorstep.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-xl bg-primary-container/35 p-4 signature-motif ring-1 ring-on-primary/10"
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container signature-motif">
                <span className="material-symbols-outlined text-on-primary text-2xl">{item.icon}</span>
              </div>
              <h3 className="mb-1.5 font-headline text-sm font-black uppercase tracking-wide text-on-primary md:text-base">{item.title}</h3>
              <p className="text-[13px] leading-snug text-on-primary-container/82 md:text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative flex min-h-0 flex-1 flex-col justify-start overflow-y-auto border-t border-primary/10 bg-surface p-6 lg:border-l lg:border-t-0 lg:p-8 xl:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-bl-[128px] bg-primary/5 md:-right-28 md:h-56 md:w-56"></div>

        <div className="relative z-10 mb-4 shrink-0 lg:mb-6">
          <span className="text-primary mb-2 block text-xs font-bold uppercase tracking-[0.2em] md:text-sm">CIVIC INNOVATION</span>
          <h2 className="font-headline text-3xl font-black uppercase leading-tight tracking-tight text-primary sm:text-4xl md:text-5xl">SOLUTION</h2>
          <div className="mt-3 h-1 w-16 bg-primary md:mt-4 md:w-20"></div>
        </div>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-6 pb-2 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
          <div className="mx-auto w-full max-w-[min(100%,20rem)] shrink-0 lg:mx-0 lg:max-w-[min(100%,18rem)] xl:max-w-xs">
            <div className="bg-surface-container-lowest p-4 shadow-xl ring-1 ring-outline/10 signature-motif md:p-5">
              <div className="mb-5 flex items-center justify-between gap-3 bg-primary p-3 signature-motif md:p-4">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="shrink-0 rounded-lg bg-on-primary p-1 ring-1 ring-on-primary/20">
                    <LogoMark className="h-8 w-8" alt="" />
                  </div>
                  <span className="truncate font-black tracking-tighter text-on-primary text-base">KAJ-KAM?</span>
                </div>
                <span className="material-symbols-outlined shrink-0 text-on-primary">qr_code_scanner</span>
              </div>

              <div className="space-y-3.5">
                <div className="bg-surface-container-low p-3.5 signature-motif md:p-4">
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-primary">Next Collection</span>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-lg font-black text-on-surface md:text-xl">PAPER DAY</span>
                    <span className="text-sm font-bold text-secondary md:text-base">TOMORROW</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-start border-b-2 border-primary bg-surface-container-low p-3.5 signature-motif">
                    <span className="material-symbols-outlined mb-1.5 text-primary">map</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface">Nearby Bins</span>
                  </div>
                  <div className="flex flex-col items-start bg-surface-container-low p-3.5 signature-motif">
                    <span className="material-symbols-outlined mb-1.5 text-primary">eco</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface">Your Impact</span>
                  </div>
                </div>

                <div className="flex cursor-pointer items-center justify-between bg-primary p-3.5 text-on-primary transition-colors signature-motif hover:bg-primary/90">
                  <span className="text-xs font-bold uppercase tracking-widest">Scan Waste</span>
                  <span className="material-symbols-outlined">camera_alt</span>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-5 lg:pt-1">
            <p className="max-w-prose text-base italic leading-relaxed text-on-surface-variant md:text-lg">
              &ldquo;Kaj-Kam? leverages AI-driven scanning and real-time civic data to bridge the gap between citizens and sustainable city management.&rdquo;
            </p>
            <ul className="space-y-3 md:space-y-3.5">
              {['Real-time Bin Monitoring', 'AI Waste Classification', 'Optimized Logistics'].map((label) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="material-symbols-outlined shrink-0 text-primary">check_circle</span>
                  <span className="text-xs font-bold uppercase tracking-wide text-primary md:text-sm">{label}</span>
                </li>
              ))}
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
    className={`${slideFrame} flex flex-col items-center justify-center px-6 bg-surface relative`}
  >
    <div className="absolute top-24 right-0 -z-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
    <div className="z-10 mx-auto mb-8 max-w-5xl text-center md:mb-12">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">STEPS</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary tracking-tight uppercase font-headline">How it works</h2>
      <p className="mt-4 text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
        Three simple steps from a photo to a smarter city.
      </p>
    </div>
    <div className="z-10 grid md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
      {[
        { step: '01', icon: 'photo_camera', title: 'Scan', desc: 'AI recognises waste in the photo and tells you which bin it belongs in.' },
        { step: '02', icon: 'map', title: 'Find', desc: 'Interactive bin map of Zagreb with colour-coded marker types.' },
        { step: '03', icon: 'volunteer_activism', title: 'Report & earn', desc: 'Report a full bin and earn EcoPoints towards rewards.' },
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
    className={`${slideFrame} flex min-h-0 flex-col lg:flex-row bg-surface`}
  >
    <section className="flex-1 p-8 md:p-16 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-primary/10">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">PRODUCT ENTRY</span>
      <h2 className="text-4xl md:text-5xl font-black text-primary uppercase font-headline tracking-tight mb-6">Landing page</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
        First impression for the jury and the public: clear problem, solution, and call to action — “Try the app” and “How it works”.
      </p>
      <ul className="space-y-3">
        {['Hero with headline and CTAs', 'Problem section (3 points)', 'Feature overview & B2B value'].map((t) => (
          <li key={t} className="flex items-center gap-3 text-sm md:text-base font-medium">
            <span className="material-symbols-outlined text-primary text-xl">chevron_right</span>
            {t}
          </li>
        ))}
      </ul>
    </section>
    <section className="flex-1 bg-primary text-on-primary p-8 md:p-16 lg:p-20 flex flex-col justify-center">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">MVP</span>
      <h2 className="text-4xl md:text-5xl font-black uppercase font-headline tracking-tight mb-6">Web app</h2>
      <p className="text-on-primary-container/90 text-lg leading-relaxed mb-8">
        Mobile-first UI (~450px max width), bottom navigation with four tabs — all in one browser experience.
      </p>
      <div className="flex flex-wrap gap-2">
        {['AI Scanner', 'Map', 'Eco Assistant', 'Profile'].map((t) => (
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
    className={`${slideFrame} flex min-h-0 flex-col md:flex-row items-stretch bg-surface`}
  >
    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 1 — CORE</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight mb-6">AI Scanner</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
        Upload or camera: Gemini analyses the image and returns the item name, bin type, and a short explanation. On success — EcoPoints and a motivational pop-up.
      </p>
      <div className="space-y-4">
        <div className="flex gap-4 items-start">
          <span className="material-symbols-outlined text-secondary text-2xl shrink-0">hourglass_empty</span>
          <div>
            <p className="font-bold uppercase text-sm tracking-wide text-primary">Loading</p>
            <p className="text-on-surface-variant text-sm">Playful message e.g. “Zagreb AI is digging through the waste…”</p>
          </div>
        </div>
        <div className="flex gap-4 items-start">
          <span className="material-symbols-outlined text-secondary text-2xl shrink-0">recycling</span>
          <div>
            <p className="font-bold uppercase text-sm tracking-wide text-primary">Result</p>
            <p className="text-on-surface-variant text-sm">JSON → readable UI: bin, colour/icon, why it goes there.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-surface-container-low p-8 md:p-14 flex items-center justify-center signature-motif m-4 md:m-8 ring-1 ring-outline/10">
      <div className="w-full max-w-sm bg-surface-container-lowest p-6 signature-motif shadow-xl">
        <div className="aspect-[4/5] bg-surface-container-low rounded-lg flex flex-col items-center justify-center gap-4 mb-4 border-2 border-dashed border-primary/30">
          <span className="material-symbols-outlined text-primary text-5xl">add_a_photo</span>
          <span className="text-xs uppercase font-bold text-on-surface-variant tracking-widest">Choose photo</span>
        </div>
        <div className="bg-primary text-on-primary p-4 signature-motif flex justify-between items-center">
          <span className="font-bold text-sm uppercase tracking-wider">Aluminium can</span>
          <span className="material-symbols-outlined">check_circle</span>
        </div>
        <p className="text-center text-secondary font-bold text-sm mt-3 uppercase tracking-wide">+1 EcoPoint</p>
      </div>
    </div>
  </motion.div>
);

const Slide6 = () => (
  <motion.div
    {...slideMotion}
    className={`${slideFrame} flex min-h-0 flex-col bg-primary text-on-primary lg:flex-row`}
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
        <p className="text-sm text-on-primary-container/85">Name, location, district — “Report full bin” turns the marker red / alert + points.</p>
      </div>
    </div>
    <div className="flex-1 p-8 md:p-14 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
      <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 2</span>
      <h2 className="text-4xl md:text-6xl font-black uppercase font-headline tracking-tight mb-6">Bin map</h2>
      <p className="text-on-primary-container/90 text-lg leading-relaxed mb-6">
        Map of Zagreb with pins from CSV/JSON. Marker colours by <strong className="text-on-primary">Bin_Type</strong> — paper, plastic, bio, and more at a glance.
      </p>
      <p className="mb-8 max-w-xl rounded-xl border border-on-primary/20 bg-on-primary/5 p-4 text-sm leading-relaxed text-on-primary-container/90">
        <span className="mb-2 block font-bold uppercase tracking-wide text-secondary">Data source</span>
        Database of green islands and waste containers (City of Zagreb):{' '}
        <a
          href="https://experience.arcgis.com/experience/f2b7df9552ea4525b64ceb78ba39876c/"
          target="_blank"
          rel="noopener noreferrer"
          className="break-all font-medium text-secondary underline decoration-secondary/60 underline-offset-2 transition-colors hover:text-on-primary hover:decoration-on-primary"
        >
          https://experience.arcgis.com/experience/f2b7df9552ea4525b64ceb78ba39876c/
        </a>
      </p>
      <ul className="space-y-3 text-on-primary-container/90">
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">touch_app</span>
          Tap a marker to open bin details.
        </li>
        <li className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">campaign</span>
          Crowdsourced full bins for the municipal company.
        </li>
      </ul>
    </div>
  </motion.div>
);

const Slide7 = () => (
  <motion.div
    {...slideMotion}
    className={`${slideFrame} flex flex-col items-center justify-center px-6 bg-surface`}
  >
    <div className="max-w-3xl w-full text-center mb-10">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block mb-4">TAB 3</span>
      <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight mb-4">ZG Eco Assistant</h2>
      <p className="text-on-surface-variant text-lg">
        Chat UI with Gemini as a city cleanliness assistant: waste rules, tips, and answers for residents.
      </p>
    </div>
    <div className="w-full max-w-lg bg-surface-container-lowest signature-motif p-6 ring-1 ring-outline/10 shadow-xl">
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {['Where do batteries go?', 'What is bulky waste?', 'Rinse yogurt cups?'].map((q) => (
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
          Where do batteries go?
        </div>
        <div className="bg-primary/10 p-3 rounded-2xl rounded-br-md text-sm text-on-surface ml-auto max-w-[90%]">
          Batteries and accumulators belong in dedicated bins or a recycling drop-off — not in household waste.
        </div>
      </div>
      <div className="mt-6 flex gap-2 border-t border-outline/20 pt-4">
        <span className="material-symbols-outlined text-on-surface-variant">chat</span>
        <span className="text-xs text-on-surface-variant uppercase tracking-widest flex items-center">Quick prompts = zero friction for the jury</span>
      </div>
    </div>
  </motion.div>
);

const Slide8 = () => (
  <motion.div
    {...slideMotion}
    className={`${slideFrame} flex min-h-0 flex-col md:flex-row bg-surface-container-low`}
  >
    <div className="flex-1 p-8 md:p-16 flex flex-col justify-center">
      <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4">TAB 4 — RETENTION</span>
      <h2 className="text-4xl md:text-5xl font-black text-primary uppercase font-headline tracking-tight mb-6">My profile</h2>
      <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
        No full sign-up for the hackathon: EcoPoints in <code className="text-primary font-mono text-sm bg-surface px-2 py-0.5 rounded">localStorage</code> — instant “your” profile and progress.
      </p>
      <ul className="space-y-2 text-on-surface-variant">
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">stars</span> Large points counter (e.g. 15 / 100)</li>
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">linear_scale</span> Progress bar to reward (ZG bags)</li>
        <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-xl">qr_code_2</span> Demo QR/barcode when threshold is met</li>
      </ul>
    </div>
    <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
      <div className="w-full max-w-xs bg-surface signature-motif p-8 shadow-xl ring-1 ring-outline/10 text-center">
        <p className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-2">EcoPoints</p>
        <p className="text-6xl font-black text-primary font-headline mb-4">15</p>
        <div className="h-3 bg-surface-container-high rounded-full overflow-hidden mb-2">
          <div className="h-full w-[15%] bg-secondary rounded-full" />
        </div>
        <p className="text-xs text-on-surface-variant mb-6">85 more to the bag reward</p>
        <button type="button" className="w-full py-3 bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase tracking-widest signature-motif cursor-default">
          Claim reward (locked)
        </button>
      </div>
    </div>
  </motion.div>
);

const SlideZGInspiracija = () => (
  <motion.div
    {...slideMotion}
    className={`${slideFrame} flex min-h-0 flex-col bg-surface px-4 sm:px-6`}
  >
    <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:gap-10 xl:gap-14">
      <div className="shrink-0 lg:max-w-[min(100%,28rem)]">
        <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-secondary">Module</span>
        <div className="mb-3 flex flex-wrap items-center gap-2 md:mb-4 md:gap-3">
          <span className="material-symbols-outlined text-3xl text-primary md:text-5xl">local_fire_department</span>
          <h2 className="font-headline text-2xl font-black uppercase tracking-tight text-primary sm:text-3xl md:text-5xl">ZG Inspiration</h2>
        </div>
        <p className="mb-4 text-lg font-semibold text-primary">
          Small change, big difference. <span aria-hidden>💚</span>
        </p>
        <p className="text-on-surface-variant text-base leading-relaxed">
          Short daily facts about waste — no lectures. Users learn unconsciously how much they matter in the{' '}
          <strong className="text-primary">sorting chain</strong>: from a can to a green island; every choice ties to outcomes
          and EcoPoints rewards.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-on-surface-variant sm:mt-6 sm:space-y-3 sm:text-sm">
          <li className="flex gap-2">
            <span className="material-symbols-outlined shrink-0 text-secondary text-lg sm:text-xl">psychology</span>
            Micro-learning in the app — one fact takes seconds to read.
          </li>
          <li className="flex gap-2">
            <span className="material-symbols-outlined shrink-0 text-secondary text-lg sm:text-xl">gaming</span>
            “I’ve read it” / “Reflect” confirmations earn points and link education to the profile.
          </li>
        </ul>
      </div>

      <div className="min-h-0 min-w-0 flex-1 space-y-2 sm:space-y-3 lg:space-y-4">
        {[
          {
            featured: true,
            icon: 'public',
            title: 'Today in Zagreb',
            body: 'One plastic bottle can last 450 years. You decide where it ends up.',
            action: 'Reflect',
            pts: '+1',
          },
          {
            icon: 'inventory_2',
            title: 'A can’s journey',
            body: 'In the yellow bin — back in ~60 days. In nature — it can linger for 200 years.',
            action: 'Read',
            pts: '+2',
          },
          {
            icon: 'soap',
            title: 'Rinse packaging?',
            body: 'A quick rinse helps avoid contaminating other waste in the yellow bin.',
            action: 'Read',
            pts: '+1',
          },
          {
            icon: 'location_city',
            title: 'ZG & waste',
            body: 'Zagreb generates hundreds of thousands of tonnes of waste yearly — individual choices still matter.',
            action: 'Read',
            pts: '+2',
          },
          {
            icon: 'compost',
            title: 'Banana peel',
            body: 'In bio waste it becomes compost; in mixed waste it becomes a processing problem.',
            action: 'Read',
            pts: '+1',
          },
        ].map((card) => (
          <div
            key={card.title}
            className={`flex flex-col gap-2 rounded-xl border p-3 sm:gap-3 sm:rounded-2xl sm:p-4 md:flex-row md:items-center md:justify-between md:gap-6 md:p-5 ${
              card.featured
                ? 'border-primary/25 bg-primary/[0.06] ring-1 ring-primary/10'
                : 'border-outline/20 bg-surface-container-lowest ring-1 ring-outline/10'
            }`}
          >
            <div className="flex min-w-0 gap-3 sm:gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl ${
                  card.featured ? 'bg-primary/15 text-primary' : 'bg-surface-container-high text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">{card.icon}</span>
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-primary sm:text-[10px] md:text-xs">{card.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-on-surface-variant sm:mt-1 sm:text-sm">{card.body}</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 self-start rounded-lg bg-primary px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-on-primary sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-xs md:self-center"
            >
              {card.action} ({card.pts})
            </button>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const Slide9 = () => (
  <motion.div
    {...slideMotion}
    className={`${slideFrame} flex flex-col items-center justify-center px-6 bg-surface relative`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10 pointer-events-none" />
    <div className="z-10 w-full min-w-0 max-w-4xl">
      <div className="mb-8 text-center md:mb-12">
        <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase block mb-4">FOR THE CITY OF ZAGREB</span>
        <h2 className="text-4xl md:text-6xl font-black text-primary uppercase font-headline tracking-tight">Business value</h2>
        <p className="mt-4 text-on-surface-variant text-lg max-w-2xl mx-auto">
          Why this pays off for the utility and residents — not just a “nice app”.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3 md:gap-6">
        {[
          { icon: 'sensors', title: 'Crowdsourcing', desc: 'Residents as “sensors” — full-bin signals without expensive hardware.' },
          { icon: 'route', title: 'Collection routes', desc: 'Heatmaps and signals to optimise runs instead of static routes.' },
          { icon: 'gavel', title: 'Lower risk', desc: 'Better sorting reduces fines pressure and illegal dumping.' },
        ].map((c) => (
          <div key={c.title} className="bg-surface-container-lowest p-5 signature-motif ring-1 ring-outline/10 md:p-8">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">{c.icon}</span>
            <h3 className="text-lg font-black uppercase tracking-wide text-primary mb-3">{c.title}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-4 md:mt-12 md:gap-5">
        <div className="rounded-2xl bg-surface-container-low p-3 ring-1 ring-primary/10 md:p-4">
          <LogoMark className="h-12 w-auto md:h-20" />
        </div>
        <p className="text-primary font-bold uppercase tracking-[0.15em] text-sm text-center">
          Kaj-Kam? — thank you, jury
        </p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, SlideZGInspiracija, Slide9];

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
  const showDeckWatermark = currentSlide >= 1 && currentSlide <= 8;

  return (
    <div className="flex h-full min-h-0 max-h-dvh flex-col overflow-hidden bg-surface font-sans text-on-surface selection:bg-primary selection:text-on-primary">
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
      
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <CurrentSlideComponent key={currentSlide} />
          </AnimatePresence>
        </div>
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
