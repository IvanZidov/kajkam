/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-surface/80 backdrop-blur-md">
    <div className="text-xl md:text-2xl font-black tracking-tighter text-primary">ZAGREB INNOVATE</div>
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
    <div className="flex items-center gap-8 mb-4 md:mb-0">
      <span className="font-sans text-xs md:text-sm uppercase tracking-wider text-primary font-bold">© 2024 GRAD ZAGREB | HACKATHON EDITION</span>
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
            <span className="text-primary font-sans font-bold tracking-[0.2em] text-xs uppercase">HACKATHON EDITION 2024</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-primary tracking-tighter leading-none font-headline uppercase mb-6 md:mb-8">
            KAJKAMO?
          </h1>

          {/* Subtitle with Scale Jump */}
          <div className="max-w-2xl">
            <p className="text-base md:text-lg lg:text-xl text-on-surface-variant font-medium tracking-wide mb-10 md:mb-12">
              Umjetna inteligencija u službi čišćeg grada. <br />
              <span className="text-secondary font-bold">Inovacijski sprint za pametniji Zagreb.</span>
            </p>
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
              <div className="bg-primary p-4 signature-motif mb-6 flex justify-between items-center">
                <span className="text-on-primary font-black tracking-tighter text-lg">KAJKAMO?</span>
                <span className="material-symbols-outlined text-on-primary">qr_code_scanner</span>
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
              "KajKamo? leverages AI-driven scanning and real-time civic data to bridge the gap between citizens and sustainable city management."
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

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [Slide1, Slide2];

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

  return (
    <div className="bg-surface text-on-surface font-sans min-h-screen flex flex-col overflow-hidden selection:bg-primary selection:text-on-primary">
      <Header />
      
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
