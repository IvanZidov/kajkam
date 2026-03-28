import { HelpCircle, Trash2, Truck, Sparkles, Radio, LineChart, Leaf } from 'lucide-react';

export default function App() {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#FBF9F8]/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-[#004482]">
            KAJKAMO?
          </div>
          <div className="hidden md:flex gap-8 items-center font-headline font-bold tracking-[0.08em] uppercase text-sm">
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#problem">PROBLEM</a>
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#kako-radi">KAKO RADI?</a>
            <a className="text-slate-600 hover:text-[#004482] transition-colors" href="#za-grad">ZA GRAD</a>
            <button className="bg-primary text-on-primary px-6 py-2 asymmetric-shield active:scale-95 duration-200 transition-opacity hover:opacity-80">
              TRY APP
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Section 1: Hero */}
        <section className="relative min-h-[921px] flex items-center overflow-hidden bg-surface pt-12">
          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <div className="inline-block py-1 px-3 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-[0.2em] uppercase mb-6 asymmetric-shield">
                ZAGREB SMART CITY PROJECT
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-primary uppercase editorial-line-height tracking-tighter mb-6">
                KajKamo?<br />
                <span className="text-on-surface-variant">Tvoj AI vodič</span>
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                Slikaj otpad, pronađi najbližu kantu i osvoji besplatne ZG vrećice uz pomoć Gemini AI tehnologije.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-on-primary px-8 py-4 asymmetric-shield font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all active:scale-95">
                  Isprobaj aplikaciju
                </button>
                <a href="#kako-radi" className="inline-flex items-center justify-center bg-surface-container-highest text-primary px-8 py-4 asymmetric-shield font-bold uppercase tracking-widest text-sm hover:bg-surface-container-high transition-all active:scale-95">
                  Kako radi?
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="asymmetric-shield bg-gradient-to-br from-primary to-primary-container p-4 shadow-2xl overflow-hidden aspect-[4/5] flex items-center justify-center">
                <img 
                  alt="KajKamo App Preview" 
                  className="w-full h-full object-cover asymmetric-shield" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQaXnIvXyr6BvFpG_Cx4KRD_vqcc_x0CI42JZ4sYES4wM6-T6M6QVE9BWzHHnUsMSSTPsOoNATjgA-WYg0mHVeeXPpd23BAY54SOt37f54AFq0GqIqrD97sRAf4VWzjSJ78TUcMCGyKb3w9xnnpVz8IhBN4gyKZ6-JGICLzGmofGZHXbuEaOo09xuCdglmVcFD06tPqBckg9SqZZrZOVEtTZMMIYZUEk5JmTXDMEbxZnDHZgjYNTnCKPaz73zFQsSqhKMMnf3LCagk"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Problem */}
        <section className="py-32 bg-surface-container-low" id="problem">
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-20">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block mb-4">IZAZOVI</span>
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter">Zašto ovo radimo?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <HelpCircle className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Nepoznavanje otpada</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Mnogi građani su u nedoumici kamo odložiti specifične materijale poput tetrapaka ili onečišćenog papira.
                </p>
              </div>
              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <Trash2 className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Prepuni spremnici</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Kante su često prepune danima, što narušava vizuru grada i potiče nelegalno odlaganje pokraj spremnika.
                </p>
              </div>
              {/* Card 3 */}
              <div className="bg-surface-container-lowest p-10 asymmetric-shield flex flex-col items-start gap-6 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-16 h-16 bg-surface-container flex items-center justify-center asymmetric-shield">
                  <Truck className="text-primary w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Neefikasan odvoz</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Holding troši dragocjene resurse na pražnjenje polupraznih kanti dok one pune ostaju zaboravljene.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Kako radi? */}
        <section className="py-32 bg-surface" id="kako-radi">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter mb-4">Pametno recikliranje u 3 koraka</h2>
              <p className="text-on-surface-variant text-xl max-w-2xl mx-auto">Tehnologija u službi čišćeg Zagreba. Jednostavno, brzo i nagrađivano.</p>
            </div>
            <div className="space-y-40">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="text-8xl font-black text-primary/10 tracking-tighter">01</div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">Skeniraj</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Gemini AI prepoznaje vaš otpad u sekundi. Samo usmjerite kameru i aplikacija će vam reći točno u koju boju vrećice ili spremnika ide vaš predmet.
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                    <Sparkles className="w-5 h-5 fill-primary" />
                    Powered by Gemini AI
                  </div>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-72 h-[600px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img 
                        alt="AI Scanning Step" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXHFjmiKUgvcvuNMvBKVcy-Ab2yzvJvdA8830m8HmuRRWb22nqMbYnfwS1-4RY0AqCen1kG_ICGE88fLriQCnYDlUOP2QoEOx8_X1jxdGUF_evwXT33v5-4lPptxRzvz7W-FT6R0i0KnPUMh8MxhcJrVOPUkc_ECSzfsajwkL-g_-UnCh687HWz4DbLxR4SwFMk8TNVjQh_Zmq9DnkzZvT6tF0zKV6HYz-WSwLbdqsPKRPMMc68y6R7VtJwquGLPHWrEpn-Ky-5KRP"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="text-8xl font-black text-primary/10 tracking-tighter">02</div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">Pronađi</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Interaktivna karta vas vodi do najbližeg slobodnog spremnika. Filteri vam omogućuju da vidite samo one kante koje su trenutno dostupne i nisu prepune.
                  </p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-72 h-[600px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img 
                        alt="Map Location Step" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxj3ESMHEs1xMEApsm1kw1I0IH2qyFeySNjhpB9u0BApTiLX-uMVjWdwZXiTYXuVOgUVDaC7veouXwNML6rQVAASRcyrtTBEpW8mO5hiU1EoWUzDKD9e3_zn0nqFdkExjcRJNM7RpIuKXWsmrIB6oQnW2CbxTKwff9r8-ZDcfSYT8WEDu4eZqOgBkr3eavt7sLYTiD-SfNiZk1YNv6R_muDy_UT6Vl5Y0BqRw_CY2C1YNIjt1a2Sw-xHAjIHh7y4VqUAhVoeVUZ8p8"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  <div className="text-8xl font-black text-primary/10 tracking-tighter">03</div>
                  <h3 className="text-4xl font-black text-primary uppercase tracking-tight">Prijavi i Profitiraj</h3>
                  <p className="text-xl text-on-surface-variant leading-relaxed">
                    Prijavite punu kantu ili nepropisno odložen otpad. Za svaku potvrđenu prijavu skupljajte EkoBodove koje možete zamijeniti za setove ZG vrećica ili popuste na Holding račune.
                  </p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <div className="relative w-72 h-[600px] bg-on-surface rounded-[3rem] p-4 shadow-2xl">
                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                      <img 
                        alt="Rewards Step" 
                        className="w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhQgfj9e76d0MfYEc1geTPqjykFiDFwnekGud2KVJOjv4Y3i3GtNOyMhDtS1H6_dlvlSkNPjuePZtgvrVEHuXjam6d5mo8AK5e7l-1QYs1jeJCimshLVXF-eVultduoaaBJ1ZuPkNxjky2UYF9dnBLuLrxqyBexx553EP9-mlMfTjgw7DdhonAEWAmTEU4TpqUXduJAfwJPxdm3Af1MewguNUBHZqEplBBY0-gte3GmH53xUAIlkc1lKvMPIU4mzgOvOoKtfBqmFR6"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: B2B / Business Value */}
        <section className="py-32 bg-primary" id="za-grad">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-primary-container font-bold tracking-[0.3em] uppercase text-xs block mb-4">ZA PARTNERE I GRAD</span>
                <h2 className="text-5xl md:text-7xl font-black text-on-primary uppercase tracking-tighter mb-8 leading-none">Digitalna transformacija Zagreba</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex-shrink-0 flex items-center justify-center">
                      <Radio className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-on-primary font-bold uppercase text-lg mb-2">Besplatni senzori</h4>
                      <p className="text-primary-fixed/80 leading-relaxed">Zagrebački Holding dobiva precizne podatke kroz crowdsourcing tisuća građana koji svakodnevno mapiraju stanje.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex-shrink-0 flex items-center justify-center">
                      <LineChart className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-on-primary font-bold uppercase text-lg mb-2">Optimizacija ruta</h4>
                      <p className="text-primary-fixed/80 leading-relaxed">Smanjenje troškova goriva i vremena odvoza smeća na temelju heatmape stvarno punih kanti.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-on-primary-fixed-variant asymmetric-shield flex-shrink-0 flex items-center justify-center">
                      <Leaf className="text-primary-fixed w-6 h-6" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-on-primary font-bold uppercase text-lg mb-2">Čišći okoliš</h4>
                      <p className="text-primary-fixed/80 leading-relaxed">Smanjenje kazni za neodvajanje otpada i vidljivo čišći gradski parkovi i ulice za sve nas.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="asymmetric-shield bg-white/5 backdrop-blur-md p-8 border border-white/10">
                  <img 
                    alt="Data Analytics Dashboard" 
                    className="w-full h-full object-cover asymmetric-shield grayscale hover:grayscale-0 transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-kwPd7zCqVn7gxrurPPlTLUXwFkd2vXJWu-d1Mg3Q1D6QufO3irvW9pqxFJdqIPJbU6wZcICgezt_vEG3MIQBzzjrchjYZpjVr0sZGWBGUfnK6mvJJcmD167_p_kTib2M25wIfqHM012h40WEk1Vq8ANfshAYIFwpT_9_JcQxHvN9ZIEtmXdQjl-wh2zosC09Z2l1AJ21x8UFikDEpkQA21O-OqIap7tLamQjoVEs0nm85YwZJFcp5pfbQvNZ3-Y7g3DY1q05lBGE"
                    referrerPolicy="no-referrer"
                  />
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
            © 2026 KAJKAMO? GRAD ZAGREB CIVIC TECH PROJECT. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 font-headline text-xs tracking-wider uppercase opacity-70">
            <a className="text-slate-500 hover:text-[#004482] hover:underline underline-offset-4 transition-all" href="#">PRIVACY</a>
            <a className="text-slate-500 hover:text-[#004482] hover:underline underline-offset-4 transition-all" href="#">TERMS</a>
            <a className="text-slate-500 hover:text-[#004482] hover:underline underline-offset-4 transition-all" href="#">CONTACT</a>
          </div>
          <div className="font-bold text-[#004482] text-xs tracking-widest uppercase">
            BY TIM IME
          </div>
        </div>
      </footer>
    </div>
  );
}
