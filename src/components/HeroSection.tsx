import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Droplets, Leaf } from 'lucide-react';

import baobabImgNew from '../assets/img_baobab_new.png';
import pineappleImg from '../assets/img_pineapple_nobg.png';
import bissapImg from '../assets/img_bissap_nobg.png';
import pastequeImg from '../assets/img_pasteque_nobg.png';
import gingembreImg from '../assets/img_gingembre_nobg.png';
import passionImg from '../assets/img_passion_nobg.png';

import lushGardenBg from '../assets/lush_garden_bg.png';
import baobabSplash from '../assets/baobab_splash.jpg';

gsap.registerPlugin(ScrollTrigger);

interface Flavor {
  id: string;
  name: string;
  shortName: string;
  accentColor: string;
  accentText: string;
  accentBg: string;
  buttonBg: string;
  title: string;
  tagline: string;
  description: string;
  img: string;
}

const FLAVORS: Flavor[] = [
  {
    id: 'pineapple',
    name: 'Ananas',
    shortName: 'Ananas',
    accentColor: '#F6C230',
    accentText: 'text-[#B08300]',
    accentBg: 'bg-[#F6C230]/15 border-[#F6C230]/30 text-[#B08300]',
    buttonBg: 'bg-[#F6C230] text-[#1C2430] hover:shadow-[#F6C230]/40',
    title: 'FRESH ENERGY',
    tagline: 'Douceur Solaire',
    description: 'Une fraîcheur tropicale intensément revitalisante, pressée à froid pour libérer les vitamines et enzymes de l\'ananas.',
    img: pineappleImg,
  },
  {
    id: 'baobab',
    name: 'Baobab',
    shortName: 'Baobab',
    accentColor: '#D8B08D',
    accentText: 'text-[#8A6642]',
    accentBg: 'bg-[#D8B08D]/15 border-[#D8B08D]/30 text-[#8A6642]',
    buttonBg: 'bg-[#D8B08D] text-white hover:shadow-[#D8B08D]/40',
    title: 'FORCE NATURE',
    tagline: 'Force Ancestrale',
    description: 'Le nectar doux et velouté du super-fruit du Baobab. Naturellement riche en Vitamine C et fibres prébiotiques.',
    img: baobabImgNew,
  },
  {
    id: 'bissap',
    name: 'Bissap',
    shortName: 'Bissap',
    accentColor: '#C93A6D',
    accentText: 'text-[#961C4C]',
    accentBg: 'bg-[#C93A6D]/15 border-[#C93A6D]/30 text-[#961C4C]',
    buttonBg: 'bg-[#C93A6D] text-white hover:shadow-[#C93A6D]/40',
    title: 'ECLAT SHINE',
    tagline: 'Éclat Botanique',
    description: 'Une infusion florale vibrante de fleurs d\'Hibiscus et de grenade, gorgée de polyphénols antioxydants.',
    img: bissapImg,
  },
  {
    id: 'pasteque',
    name: 'Pastèque',
    shortName: 'Pastèque',
    accentColor: '#E84351',
    accentText: 'text-[#C52030]',
    accentBg: 'bg-[#E84351]/15 border-[#E84351]/30 text-[#C52030]',
    buttonBg: 'bg-[#E84351] text-white hover:shadow-[#E84351]/40',
    title: 'FRESH CHILL',
    tagline: 'Hydratation Maximale',
    description: 'La fraîcheur absolue d\'une pastèque juteuse, idéale pour s\'hydrater en profondeur et se désaltérer sous le soleil.',
    img: pastequeImg,
  },
  {
    id: 'gingembre',
    name: 'Gingembre',
    shortName: 'Gingembre',
    accentColor: '#DFB76C',
    accentText: 'text-[#9A732D]',
    accentBg: 'bg-[#DFB76C]/15 border-[#DFB76C]/30 text-[#9A732D]',
    buttonBg: 'bg-[#DFB76C] text-[#1C2430] hover:shadow-[#DFB76C]/40',
    title: 'SPICY TONIC',
    tagline: 'Booster d\'Énergie',
    description: 'Un jus piquant et énergisant de gingembre frais, conçu pour réveiller vos sens et renforcer votre vitalité naturelle.',
    img: gingembreImg,
  },
  {
    id: 'passion',
    name: 'Passion',
    shortName: 'Passion',
    accentColor: '#E28743',
    accentText: 'text-[#A04F18]',
    accentBg: 'bg-[#E28743]/15 border-[#E28743]/30 text-[#A04F18]',
    buttonBg: 'bg-[#E28743] text-white hover:shadow-[#E28743]/40',
    title: 'EXOTIC VIBES',
    tagline: 'Énergie Exotique',
    description: 'La saveur acidulée et intense du fruit de la passion. Un cocktail d\'antioxydants pour rayonner au quotidien.',
    img: passionImg,
  }
];

interface HeroSectionProps {
  activeFlavor: string;
  setActiveFlavor: (flavor: string) => void;
}

export default function HeroSection({ activeFlavor, setActiveFlavor }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for each bottle element
  const bottlePineappleRef = useRef<HTMLDivElement>(null);
  const bottleBaobabRef = useRef<HTMLDivElement>(null);
  const bottleBissapRef = useRef<HTMLDivElement>(null);
  const bottlePastequeRef = useRef<HTMLDivElement>(null);
  const bottleGingembreRef = useRef<HTMLDivElement>(null);
  const bottlePassionRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Timeline pinned for 500vh (comfortable scrolling for 6 stages)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=500%', 
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          // Split timeline progress into 6 stages (approx 16% each)
          if (prog < 0.16) {
            setActiveFlavor('pineapple');
          } else if (prog < 0.33) {
            setActiveFlavor('baobab');
          } else if (prog < 0.50) {
            setActiveFlavor('bissap');
          } else if (prog < 0.66) {
            setActiveFlavor('pasteque');
          } else if (prog < 0.83) {
            setActiveFlavor('gingembre');
          } else {
            setActiveFlavor('passion');
          }
        }
      }
    });

    // --- TRANSITION 1: ANANAS -> BAOBAB (0.10 to 0.25) ---
    tl.to('.hero-text-pineapple', { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.35 }, 0.1);
    tl.to(bottlePineappleRef.current, { opacity: 0, scale: 0.6, y: -120, rotation: 35, duration: 0.4 }, 0.08);
    tl.to('.hero-bg-title-pineapple', { opacity: 0, scale: 1.05, duration: 0.35 }, 0.1);

    tl.to('.hero-text-baobab', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.22);
    tl.fromTo(bottleBaobabRef.current, 
      { opacity: 0, scale: 0.6, y: 120, rotation: -15 },
      { opacity: 1, scale: 1.1, y: 0, rotation: 12, duration: 0.4 }, 
      0.18
    );
    tl.to('.hero-baobab-splash-bg', { opacity: 0.4, duration: 0.4 }, 0.15);
    tl.to('.hero-bg-title-baobab', { opacity: 0.06, scale: 1, duration: 0.35 }, 0.22);
    tl.to(container, { backgroundColor: '#FAF6F2', duration: 0.4 }, 0.15);

    // --- TRANSITION 2: BAOBAB -> BISSAP (0.30 to 0.45) ---
    tl.to('.hero-text-baobab', { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.35 }, 0.3);
    tl.to(bottleBaobabRef.current, { opacity: 0, scale: 0.6, y: -120, rotation: 35, duration: 0.4 }, 0.28);
    tl.to('.hero-baobab-splash-bg', { opacity: 0, duration: 0.3 }, 0.28);
    tl.to('.hero-bg-title-baobab', { opacity: 0, scale: 1.05, duration: 0.35 }, 0.3);

    tl.to('.hero-text-bissap', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.42);
    tl.fromTo(bottleBissapRef.current,
      { opacity: 0, scale: 0.6, y: 120, rotation: -15 },
      { opacity: 1, scale: 1.1, y: 0, rotation: 12, duration: 0.4 },
      0.38
    );
    tl.to('.hero-bg-title-bissap', { opacity: 0.06, scale: 1, duration: 0.35 }, 0.42);
    tl.to(container, { backgroundColor: '#FFF0F5', duration: 0.4 }, 0.35);

    // --- TRANSITION 3: BISSAP -> PASTEQUE (0.50 to 0.65) ---
    tl.to('.hero-text-bissap', { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.35 }, 0.5);
    tl.to(bottleBissapRef.current, { opacity: 0, scale: 0.6, y: -120, rotation: 35, duration: 0.4 }, 0.48);
    tl.to('.hero-bg-title-bissap', { opacity: 0, scale: 1.05, duration: 0.35 }, 0.5);

    tl.to('.hero-text-pasteque', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.62);
    tl.fromTo(bottlePastequeRef.current,
      { opacity: 0, scale: 0.6, y: 120, rotation: -15 },
      { opacity: 1, scale: 1.1, y: 0, rotation: 12, duration: 0.4 },
      0.58
    );
    tl.to('.hero-bg-title-pasteque', { opacity: 0.06, scale: 1, duration: 0.35 }, 0.62);
    tl.to(container, { backgroundColor: '#FFF0F1', duration: 0.4 }, 0.55);

    // --- TRANSITION 4: PASTEQUE -> GINGEMBRE (0.70 to 0.85) ---
    tl.to('.hero-text-pasteque', { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.35 }, 0.7);
    tl.to(bottlePastequeRef.current, { opacity: 0, scale: 0.6, y: -120, rotation: 35, duration: 0.4 }, 0.68);
    tl.to('.hero-bg-title-pasteque', { opacity: 0, scale: 1.05, duration: 0.35 }, 0.7);

    tl.to('.hero-text-gingembre', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.82);
    tl.fromTo(bottleGingembreRef.current,
      { opacity: 0, scale: 0.6, y: 120, rotation: -15 },
      { opacity: 1, scale: 1.1, y: 0, rotation: 12, duration: 0.4 },
      0.78
    );
    tl.to('.hero-bg-title-gingembre', { opacity: 0.06, scale: 1, duration: 0.35 }, 0.82);
    tl.to(container, { backgroundColor: '#FCF8EE', duration: 0.4 }, 0.75);

    // --- TRANSITION 5: GINGEMBRE -> PASSION (0.90 to 1.0) ---
    tl.to('.hero-text-gingembre', { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.35 }, 0.9);
    tl.to(bottleGingembreRef.current, { opacity: 0, scale: 0.6, y: -120, rotation: 35, duration: 0.4 }, 0.88);
    tl.to('.hero-bg-title-gingembre', { opacity: 0, scale: 1.05, duration: 0.35 }, 0.9);

    tl.to('.hero-text-passion', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.35 }, 0.98);
    tl.fromTo(bottlePassionRef.current,
      { opacity: 0, scale: 0.6, y: 120, rotation: -15 },
      { opacity: 1, scale: 1.1, y: 0, rotation: 12, duration: 0.4 },
      0.94
    );
    tl.to('.hero-bg-title-passion', { opacity: 0.06, scale: 1, duration: 0.35 }, 0.98);
    tl.to(container, { backgroundColor: '#FFF7ED', duration: 0.4 }, 0.95);

    // Page load animations
    const introTl = gsap.timeline();
    introTl.fromTo('.hero-pill-item',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
    );
    introTl.fromTo('.hero-bottom-marquee',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      introTl.kill();
    };
  }, []);

  const handlePillClick = (flavorId: string) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    
    let targetY = containerTop;
    if (flavorId === 'pineapple') {
      targetY = containerTop;
    } else if (flavorId === 'baobab') {
      targetY = containerTop + window.innerHeight;
    } else if (flavorId === 'bissap') {
      targetY = containerTop + 2 * window.innerHeight;
    } else if (flavorId === 'pasteque') {
      targetY = containerTop + 3 * window.innerHeight;
    } else if (flavorId === 'gingembre') {
      targetY = containerTop + 4 * window.innerHeight;
    } else if (flavorId === 'passion') {
      targetY = containerTop + 5 * window.innerHeight;
    }
    
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="accueil"
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-between overflow-hidden transition-colors duration-1000 bg-transparent"
    >
      {/* Background Liquid Splash Image (fades in for Baobab stage) */}
      <div 
        className="hero-baobab-splash-bg absolute inset-0 w-full h-full pointer-events-none select-none opacity-0 z-0 bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${baobabSplash})` }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c2430_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none z-1" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-between pt-32 pb-6 relative z-10">
        
        {/* Selector Pills Row */}
        <div className="flex flex-wrap gap-2.5 mb-2 relative z-30">
          {FLAVORS.map((flavor) => {
            const isSelected = flavor.id === activeFlavor;
            return (
              <button
                key={flavor.id}
                onClick={() => handlePillClick(flavor.id)}
                className={`hero-pill-item px-6 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 pointer-events-auto shadow-sm ${
                  isSelected
                    ? 'bg-brand-text text-white border-brand-text scale-105'
                    : 'bg-white/40 border-brand-text/10 text-brand-text hover:bg-white/80'
                }`}
              >
                {flavor.shortName}
              </button>
            );
          })}
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-12 gap-4 items-center flex-grow">
          
          {/* LEFT COLUMN: Stacked absolute text panels */}
          <div className="col-span-5 relative h-[240px] sm:h-[320px] flex flex-col justify-center z-20 text-left order-1">
            
            {/* 1. Ananas Panel */}
            <div className="hero-text-pineapple absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#F6C230]/15 border-[#F6C230]/30 text-[#B08300]">
                <Sparkles size={9} className="animate-pulse" />
                Douceur Solaire
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Ananas
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                Une fraîcheur tropicale intensément revitalisante, pressée à froid pour libérer les vitamines et enzymes de l'ananas.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#F6C230] text-[#1C2430] hover:shadow-[#F6C230]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

            {/* 2. Baobab Panel */}
            <div className="hero-text-baobab absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6 opacity-0 pointer-events-none translate-y-[30px]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#D8B08D]/15 border-[#D8B08D]/30 text-[#8A6642]">
                <Sparkles size={9} className="animate-pulse" />
                Force Ancestrale
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Baobab
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                Le nectar doux et velouté du super-fruit du Baobab. Naturellement riche en Vitamine C et fibres prébiotiques.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#D8B08D] text-white hover:shadow-[#D8B08D]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

            {/* 3. Bissap Panel */}
            <div className="hero-text-bissap absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6 opacity-0 pointer-events-none translate-y-[30px]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#C93A6D]/15 border-[#C93A6D]/30 text-[#961C4C]">
                <Sparkles size={9} className="animate-pulse" />
                Éclat Botanique
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Bissap
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                Une infusion florale vibrante de fleurs d'Hibiscus et de grenade, gorgée de polyphénols antioxydants.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#C93A6D] text-white hover:shadow-[#C93A6D]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

            {/* 4. Pasteque Panel */}
            <div className="hero-text-pasteque absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6 opacity-0 pointer-events-none translate-y-[30px]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#E84351]/15 border-[#E84351]/30 text-[#C52030]">
                <Sparkles size={9} className="animate-pulse" />
                Hydratation Maximale
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Pastèque
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                La fraîcheur absolue d'une pastèque juteuse, idéale pour s'hydrater en profondeur et se désaltérer sous le soleil.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#E84351] text-white hover:shadow-[#E84351]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

            {/* 5. Gingembre Panel */}
            <div className="hero-text-gingembre absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6 opacity-0 pointer-events-none translate-y-[30px]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#DFB76C]/15 border-[#DFB76C]/30 text-[#9A732D]">
                <Sparkles size={9} className="animate-pulse" />
                Booster d'Énergie
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Gingembre
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                Un jus piquant et énergisant de gingembre frais, conçu pour réveiller vos sens et renforcer votre vitalité naturelle.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#DFB76C] text-[#1C2430] hover:shadow-[#DFB76C]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

            {/* 6. Passion Panel */}
            <div className="hero-text-passion absolute inset-0 flex flex-col items-start justify-center space-y-3 sm:space-y-6 opacity-0 pointer-events-none translate-y-[30px]">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-[0.18em] border bg-[#E28743]/15 border-[#E28743]/30 text-[#A04F18]">
                <Sparkles size={9} className="animate-pulse" />
                Énergie Exotique
              </div>
              <h1 className="font-serif text-xl sm:text-4xl lg:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
                Christie <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted" style={{ WebkitTextFillColor: 'currentColor' }}>
                  Passion
                </span>
              </h1>
              <p className="text-brand-muted text-[10px] sm:text-sm md:text-base leading-relaxed max-w-sm">
                La saveur acidulée et intense du fruit de la passion. Un cocktail d'antioxydants pour rayonner au quotidien.
              </p>
              <a
                href="#nos-saveurs"
                className="group px-3 py-1.5 sm:px-7 sm:py-4 rounded-full font-bold uppercase tracking-wider text-[8px] sm:text-xs flex items-center gap-1.5 sm:gap-3 shadow-lg hover:scale-105 transition-all duration-300 pointer-events-auto bg-[#E28743] text-white hover:shadow-[#E28743]/40"
              >
                Découvrir
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={10} />
                </div>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Large Background Word & floating cans */}
          <div className="col-span-7 h-[240px] sm:h-[350px] md:h-[450px] lg:h-full relative flex items-center justify-center order-2">
            
            {/* Stacked background title words */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <h2 className="hero-bg-title-pineapple font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute transition-all duration-1000">
                FRESH ENERGY
              </h2>
              <h2 className="hero-bg-title-baobab font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute opacity-0 scale-95 transition-all duration-1000">
                FORCE NATURE
              </h2>
              <h2 className="hero-bg-title-bissap font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute opacity-0 scale-95 transition-all duration-1000">
                ECLAT SHINE
              </h2>
              <h2 className="hero-bg-title-pasteque font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute opacity-0 scale-95 transition-all duration-1000">
                FRESH CHILL
              </h2>
              <h2 className="hero-bg-title-gingembre font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute opacity-0 scale-95 transition-all duration-1000">
                SPICY TONIC
              </h2>
              <h2 className="hero-bg-title-passion font-sans text-[15vw] lg:text-[9vw] font-black uppercase text-brand-text/[0.06] tracking-tighter leading-none select-none text-center absolute opacity-0 scale-95 transition-all duration-1000">
                EXOTIC VIBES
              </h2>
            </div>

            {/* Overlapping bottle wraps */}
            <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none select-none">
              
              {/* Bottle 1: Ananas */}
              <div 
                ref={bottlePineappleRef}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <img
                  src={pineappleImg}
                  alt="Jus d'Ananas"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

              {/* Bottle 2: Baobab */}
              <div 
                ref={bottleBaobabRef}
                className="absolute w-full h-full flex items-center justify-center opacity-0 pointer-events-none"
              >
                <img
                  src={baobabImgNew}
                  alt="Jus de Baobab"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

              {/* Bottle 3: Bissap */}
              <div 
                ref={bottleBissapRef}
                className="absolute w-full h-full flex items-center justify-center opacity-0 pointer-events-none"
              >
                <img
                  src={bissapImg}
                  alt="Jus de Bissap"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

              {/* Bottle 4: Pasteque */}
              <div 
                ref={bottlePastequeRef}
                className="absolute w-full h-full flex items-center justify-center opacity-0 pointer-events-none"
              >
                <img
                  src={pastequeImg}
                  alt="Jus de Pastèque"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

              {/* Bottle 5: Gingembre */}
              <div 
                ref={bottleGingembreRef}
                className="absolute w-full h-full flex items-center justify-center opacity-0 pointer-events-none"
              >
                <img
                  src={gingembreImg}
                  alt="Jus de Gingembre"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

              {/* Bottle 6: Passion */}
              <div 
                ref={bottlePassionRef}
                className="absolute w-full h-full flex items-center justify-center opacity-0 pointer-events-none"
              >
                <img
                  src={passionImg}
                  alt="Jus de Fruits Passion"
                  className="max-h-[220px] sm:max-h-[360px] md:max-h-[460px] lg:max-h-[580px] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] animate-bottle-float mix-blend-multiply"
                />
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Bottom Lush Blurred Background Garden Layer */}
      <div className="absolute bottom-0 left-0 w-full h-[28%] pointer-events-none select-none z-0 overflow-hidden">
        <img
          src={lushGardenBg}
          alt="Lush Garden Background"
          className="w-full h-full object-cover object-top blur-[4px] opacity-80"
        />
        {/* Soft linear fade from base page background into the lush image */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-current transition-colors duration-1000"
          style={{ color: activeFlavor === 'pineapple' ? '#FFFDEB' : activeFlavor === 'baobab' ? '#FAF6F2' : activeFlavor === 'bissap' ? '#FFF0F5' : activeFlavor === 'pasteque' ? '#FFF0F1' : activeFlavor === 'gingembre' ? '#FCF8EE' : '#FFF7ED' }}
        />
      </div>

      {/* Infinite Seamless Ticker Marquee */}
      <div className="hero-bottom-marquee w-full max-w-7xl mx-auto px-6 md:px-12 relative z-20 mb-6">
        <div className="w-full bg-white/80 backdrop-blur-md border border-brand-sky/20 rounded-full py-3 px-6 overflow-hidden shadow-md flex items-center">
          <div className="animate-marquee flex items-center gap-12 text-brand-text font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em] whitespace-nowrap">
            <span className="flex items-center gap-2">
              <Leaf size={14} className="text-brand-green" />
              100% Pur jus frais
            </span>
            <span className="flex items-center gap-2">
              <Droplets size={14} className="text-[#48C7F3]" />
              Zéro sucre ajouté
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#F6C230]" />
              Riche en vitamines
            </span>
            <span className="flex items-center gap-2">
              <Leaf size={14} className="text-brand-green" />
              Production locale & éthique
            </span>
            {/* Duplicate */}
            <span className="flex items-center gap-2">
              <Leaf size={14} className="text-brand-green" />
              100% Pur jus frais
            </span>
            <span className="flex items-center gap-2">
              <Droplets size={14} className="text-[#48C7F3]" />
              Zéro sucre ajouté
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#F6C230]" />
              Riche en vitamines
            </span>
            <span className="flex items-center gap-2">
              <Leaf size={14} className="text-brand-green" />
              Production locale & éthique
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes custom-float {
          0%, 100% { transform: translateY(0px) rotate(12deg) scale(1); }
          50% { transform: translateY(-12px) rotate(14deg) scale(1.02); }
        }
        .animate-bottle-float {
          animation: custom-float 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
