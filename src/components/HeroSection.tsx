import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, Sparkles, Award, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const NUM_FRAMES = 300;

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playheadRef = useRef({ frame: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // 1. Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    // Pre-calculate image URLs and load them
    for (let i = 1; i <= NUM_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/frame/ezgif-frame-${paddedIndex}.jpg`;
      
      const handleImageLoad = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / NUM_FRAMES) * 100));
        if (loadedCount === NUM_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; // Don't block loading if one frame fails
      loadedImages.push(img);
    }
    
    imagesRef.current = loadedImages;
  }, []);

  // 2. Setup Canvas Rendering & GSAP ScrollTrigger
  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper to render a specific frame
    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale and center the image ('cover' logic)
      const imgWidth = img.naturalWidth || 960;
      const imgHeight = img.naturalHeight || 540;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Initial canvas dimensions setup (full viewport)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.floor(playheadRef.current.frame));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create GSAP context for clean garbage collection
    const ctxGsap = gsap.context(() => {
      // Main timeline bound to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%', // Scroll duration (length of sequence)
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // Animating the virtual playhead frame index
      tl.to(playheadRef.current, {
        frame: NUM_FRAMES - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          renderFrame(Math.floor(playheadRef.current.frame));
        }
      }, 0);

      // --- TEXT SEQUENCING ANIMATIONS ---
      // Block 1 (Intro) starts active. It fades out.
      tl.to('.text-block-1', {
        opacity: 0,
        y: -30,
        pointerEvents: 'none',
        duration: 0.15
      }, 0.15);

      // Block 2 (Hibiscus) fades in, then fades out.
      tl.fromTo('.text-block-2',
        { opacity: 0, y: 30, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.15 },
        0.22
      );
      tl.to('.text-block-2', {
        opacity: 0,
        y: -30,
        pointerEvents: 'none',
        duration: 0.15
      }, 0.42);

      // Block 3 (Pineapple) fades in, then fades out.
      tl.fromTo('.text-block-3',
        { opacity: 0, y: 30, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.15 },
        0.49
      );
      tl.to('.text-block-3', {
        opacity: 0,
        y: -30,
        pointerEvents: 'none',
        duration: 0.15
      }, 0.69);

      // Block 4 (Baobab) fades in and stays.
      tl.fromTo('.text-block-4',
        { opacity: 0, y: 30, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.15 },
        0.76
      );

      // --- BACKGROUND COLOR TRANSITIONS MATCHING THE BOTTLES ---
      // Intro: Lagon blue (default)
      // Hibiscus (around 0.22 - 0.42): Deep Pink/Red
      tl.to('.ambient-sky', { backgroundColor: '#C93A6D', opacity: 0.25, duration: 0.2 }, 0.15);
      tl.to('.ambient-blue', { backgroundColor: '#C93A6D', opacity: 0.15, duration: 0.2 }, 0.15);
      tl.to('.ambient-green', { backgroundColor: '#88C83E', opacity: 0.1, duration: 0.2 }, 0.15);

      // Pineapple (around 0.49 - 0.69): Golden Yellow
      tl.to('.ambient-sky', { backgroundColor: '#F6C230', opacity: 0.25, duration: 0.2 }, 0.42);
      tl.to('.ambient-blue', { backgroundColor: '#F6C230', opacity: 0.15, duration: 0.2 }, 0.42);
      tl.to('.ambient-green', { backgroundColor: '#88C83E', opacity: 0.15, duration: 0.2 }, 0.42);

      // Baobab (around 0.76 - 1.0): Earthy Warm Ocre
      tl.to('.ambient-sky', { backgroundColor: '#D8B08D', opacity: 0.25, duration: 0.2 }, 0.69);
      tl.to('.ambient-blue', { backgroundColor: '#D8B08D', opacity: 0.15, duration: 0.2 }, 0.69);
      tl.to('.ambient-green', { backgroundColor: '#2F9D45', opacity: 0.1, duration: 0.2 }, 0.69);

    }, containerRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      ctxGsap.revert();
    };
  }, [isLoaded]);

  // 3. Intro entrance animation after loader disappears
  useEffect(() => {
    if (isLoaded) {
      gsap.to('.loader-overlay', {
        opacity: 0,
        display: 'none',
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          const introTl = gsap.timeline();
          introTl.fromTo('.hero-canvas-wrapper',
            { opacity: 0 },
            { opacity: 1, duration: 1.2, ease: 'power3.out' }
          );
          introTl.fromTo('.text-block-1 > *',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
            '-=0.8'
          );
        }
      });
    }
  }, [isLoaded]);

  return (
    <section
      id="accueil"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white"
    >
      {/* 1. Loading Overlay */}
      {!isLoaded && (
        <div className="loader-overlay absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky/20 via-white to-brand-green/10 blur-sm pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6 text-center">
            <div className="font-serif text-4xl font-bold tracking-wider text-brand-text mb-1 animate-pulse">
              CHRISTIE
            </div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-brand-green-dark font-semibold mb-8">
              NATURALS
            </div>
            
            {/* Elegant Custom Progress Bar */}
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden shadow-inner mb-3">
              <div 
                className="h-full bg-gradient-to-r from-brand-blue via-brand-green to-pineapple transition-all duration-150 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-brand-muted font-bold">
              Chargement des saveurs... {loadingProgress}%
            </div>
          </div>
        </div>
      )}

      {/* 2. Full Page Canvas Séquence en arrière-plan */}
      <div className="hero-canvas-wrapper opacity-0 absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none z-10" />
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </div>

      {/* 3. Ambient glowing halos (animated via GSAP) */}
      <div className="ambient-light ambient-sky absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-sky/20 blur-[120px] pointer-events-none z-1 transition-colors duration-700" />
      <div className="ambient-light ambient-blue absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[130px] pointer-events-none z-1 transition-colors duration-700" />
      <div className="ambient-light ambient-green absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none z-1 transition-colors duration-700" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#48C7F3_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none z-1" />

      {/* 4. Floating glassmorphic panel on top of background */}
      {/* On mobile, we align items to the bottom (items-end pb-24) to keep the bottle in the center/top visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full min-h-screen flex items-end lg:items-center pb-24 lg:pb-0 z-10 relative pointer-events-none">
        <div className="w-full lg:w-1/2 relative z-20 pointer-events-auto">
          <div className="glass-panel p-5 sm:p-8 lg:p-10 rounded-3xl shadow-2xl border border-brand-white/40 w-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] relative overflow-hidden flex flex-col justify-center backdrop-blur-md">
            
            {/* Slide 1: Welcome & Rosée */}
            <div className="text-block-1 absolute inset-5 sm:inset-8 lg:inset-10 flex flex-col justify-center space-y-3 sm:space-y-4 pointer-events-auto">
              <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 sm:py-1 rounded-full bg-brand-sky/40 border border-brand-blue/20 text-brand-text text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">
                <Sparkles size={10} className="text-brand-green animate-pulse" />
                Christie Naturals
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl xl:text-5xl font-bold text-brand-text leading-[1.1] tracking-tight">
                La vitalité pure<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-dark to-brand-blue">
                  du plaisir tropical
                </span>
              </h1>
              <p className="text-brand-muted text-xs sm:text-base leading-relaxed">
                Découvrez des jus premium formulés comme de véritables élixirs. Riches en antioxydants et vitamines essentielles. Zéro sucre ajouté, zéro conservateur.
              </p>
              <div className="flex gap-2 sm:gap-3 pt-1">
                <a
                  href="#nos-saveurs"
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-brand-green hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] flex items-center gap-1.5 shadow-md shadow-brand-green/15 hover:shadow-brand-green/30 transition-all duration-300 pointer-events-auto"
                >
                  Découvrir
                  <ArrowRight size={12} />
                </a>
                <a
                  href="#distribution"
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-brand-white hover:bg-brand-sky/15 text-brand-text border border-brand-sky/40 font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shadow-sm transition-all duration-300 pointer-events-auto"
                >
                  Distributeur
                </a>
              </div>
            </div>

            {/* Slide 2: Hibiscus (Bissap) */}
            <div className="text-block-2 absolute inset-5 sm:inset-8 lg:inset-10 flex flex-col justify-center space-y-3 sm:space-y-4 opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 sm:py-1 rounded-full bg-hibiscus/10 border border-hibiscus/20 text-hibiscus text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">
                <Droplets size={10} className="animate-bounce" />
                Éclat Botanique
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl xl:text-5xl font-bold text-brand-text leading-[1.1] tracking-tight">
                La passion intense<br />
                <span className="text-hibiscus">de l'Hibiscus</span>
              </h2>
              <p className="text-brand-muted text-xs sm:text-base leading-relaxed">
                Notre infusion signature de fleurs d'Hibiscus (Bissap) et grenade. Une fraîcheur acidulée et tonifiante, riche en antioxydants pour vivifier votre corps.
              </p>
              <div className="pt-1">
                <a
                  href="#nos-saveurs"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-hibiscus hover:bg-hibiscus/90 text-brand-white font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shadow-md transition-all duration-300 pointer-events-auto"
                >
                  Déguster l'Hibiscus
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Slide 3: Pineapple */}
            <div className="text-block-3 absolute inset-5 sm:inset-8 lg:inset-10 flex flex-col justify-center space-y-3 sm:space-y-4 opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 sm:py-1 rounded-full bg-pineapple/10 border border-pineapple/35 text-pineapple text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">
                <Leaf size={10} />
                Douceur Solaire
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl xl:text-5xl font-bold text-brand-text leading-[1.1] tracking-tight">
                La saveur dorée<br />
                <span className="text-pineapple">de l'Ananas</span>
              </h2>
              <p className="text-brand-muted text-xs sm:text-base leading-relaxed">
                Un jus pressé d'ananas mûris à point sous le soleil des tropiques. Naturellement riche en bromélaïne pour faciliter la digestion et faire rayonner votre tonus.
              </p>
              <div className="pt-1">
                <a
                  href="#nos-saveurs"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-pineapple hover:bg-pineapple/90 text-brand-text font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shadow-md transition-all duration-300 pointer-events-auto"
                >
                  Savourer l'Ananas
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Slide 4: Baobab */}
            <div className="text-block-4 absolute inset-5 sm:inset-8 lg:inset-10 flex flex-col justify-center space-y-3 sm:space-y-4 opacity-0 pointer-events-none">
              <div className="inline-flex items-center gap-2 self-start px-2.5 py-0.5 sm:py-1 rounded-full bg-brand-green-dark/10 border border-brand-green-dark/20 text-brand-green-dark text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold">
                <Award size={10} />
                Force Ancestrale
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl xl:text-5xl font-bold text-brand-text leading-[1.1] tracking-tight">
                L'énergie pure<br />
                <span className="text-brand-green-dark">du Baobab</span>
              </h2>
              <p className="text-brand-muted text-xs sm:text-base leading-relaxed">
                Le nectar doux et velouté du fruit du Baobab. Un super-aliment naturel exceptionnellement riche en vitamine C, calcium et fibres prébiotiques.
              </p>
              <div className="pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-brand-green hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-[9px] sm:text-[10px] shadow-md transition-all duration-300 pointer-events-auto"
                >
                  Nous Contacter
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating badge indicator (Bottom Right of screen) */}
      <div className="absolute right-4 bottom-6 sm:right-6 sm:bottom-8 lg:right-12 lg:bottom-16 px-4 py-2 bg-brand-white/80 backdrop-blur-md border border-brand-sky/20 rounded-full shadow-lg z-20 flex items-center gap-2 animate-float-delayed pointer-events-none">
        <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text">Défiler pour infuser</span>
      </div>

      {/* Wave bottom transition separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-brand-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,152.07,44.17,223.18,74.65,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
