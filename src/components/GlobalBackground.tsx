import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlobalBackgroundProps {
  activeFlavor: string;
}

export default function GlobalBackground({ activeFlavor }: GlobalBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getHeroBgColor = (flavor: string) => {
    switch (flavor) {
      case 'pineapple': return '#FFFDEB';
      case 'baobab': return '#FAF6F2';
      case 'bissap': return '#FFF0F5';
      case 'pasteque': return '#FFF0F1';
      case 'gingembre': return '#FCF8EE';
      case 'passion': return '#FFF7ED';
      default: return '#FFFDEB';
    }
  };

  useEffect(() => {
    const isMobile = /mobi|android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // --- SECTION 1: HERO ZOOM AND SCROLL FADE ---
      gsap.fromTo('.bg-layer-hero',
        { scale: 1, opacity: 1 },
        {
          scale: 1.15,
          opacity: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#accueil',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // --- SECTION 2: BRAND STORY TROPICAL GRADIENT AND BLUR ---
      gsap.fromTo('.bg-layer-sec2',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#la-marque',
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );

      // Rotate and drift organic shapes in Section 2
      if (!isMobile && !prefersReducedMotion) {
        gsap.to('.bg-sec2-organic-1', {
          y: -100,
          rotation: 45,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#la-marque',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // --- SECTION 3: FLAVORS JUNGLE AND PARALLAX LEAVES ---
      gsap.fromTo('.bg-layer-sec3',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#pourquoi-nous-choisir',
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );

      // Parallax drifting of leaf vectors
      if (!isMobile && !prefersReducedMotion) {
        gsap.to('.bg-leaf-parallax-1', {
          yPercent: -45,
          rotation: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: '#pourquoi-nous-choisir',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('.bg-leaf-parallax-2', {
          yPercent: -25,
          rotation: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: '#pourquoi-nous-choisir',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // --- SECTION 4: BENEFITS SPLASH MORPHS & SHIFTS ---
      gsap.fromTo('.bg-layer-sec4',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );

      // Scroll-driven splash movement (simulating dynamic juice morphs)
      if (!isMobile && !prefersReducedMotion) {
        gsap.to('.bg-splash-organic-1', {
          scale: 1.3,
          rotation: 140,
          x: 40,
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.to('.bg-splash-organic-2', {
          scale: 0.9,
          rotation: -100,
          x: -50,
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: '#experience',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // --- SECTION 5: EXPERIENCE/LIFESTYLE CINEMATIC LIGHT & NOISE ---
      gsap.fromTo('.bg-layer-sec5',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#lifestyle',
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );

      // Sweep cinematic light gradient horizontally
      gsap.fromTo('.bg-light-sweep',
        { xPercent: -100 },
        {
          xPercent: 120,
          ease: 'none',
          scrollTrigger: {
            trigger: '#lifestyle',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // --- SECTION 6: FAQ, CONTACT & FOOTER WHITE CANVAS ---
      gsap.fromTo('.bg-layer-sec6',
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#faq',
            start: 'top bottom',
            end: 'top center',
            scrub: true
          }
        }
      );

      // Slowly fade out the background particles in final sections
      gsap.to('.bg-particles-container', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#faq',
          start: 'top bottom',
          end: 'top center',
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden select-none bg-white transition-colors duration-1000"
      style={{ backgroundColor: getHeroBgColor(activeFlavor) }}
    >
      {/* 1. Global cinematic noise texture (low-opacity overlay) */}
      <div className="absolute inset-0 w-full h-full opacity-[0.012] pointer-events-none z-50 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* 2. Floating light particles (Section 1 -> 5 active) */}
      <div className="bg-particles-container absolute inset-0 w-full h-full opacity-70 z-1">
        <div className="absolute w-2 h-2 rounded-full bg-brand-green/30 blur-[1px] top-[18%] left-[12%] animate-float" style={{ animationDuration: '8s' }} />
        <div className="absolute w-4 h-4 rounded-full bg-[#48C7F3]/25 blur-[2px] top-[48%] left-[78%] animate-float" style={{ animationDuration: '14s', animationDelay: '-2s' }} />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#F6C230]/40 blur-[0.5px] top-[72%] left-[18%] animate-float" style={{ animationDuration: '6s', animationDelay: '-1s' }} />
        <div className="absolute w-3 h-3 rounded-full bg-hibiscus/30 blur-[2px] top-[26%] left-[82%] animate-float" style={{ animationDuration: '11s', animationDelay: '-4s' }} />
        <div className="absolute w-5 h-5 rounded-full bg-brand-green/20 blur-[3px] top-[58%] left-[28%] animate-float" style={{ animationDuration: '16s', animationDelay: '-5s' }} />
        <div className="absolute w-2 h-2 rounded-full bg-brand-sky/40 blur-[1px] top-[82%] left-[68%] animate-float" style={{ animationDuration: '9s', animationDelay: '-3s' }} />
      </div>

      {/* ========================================================================= */}
      {/* SECTION LAYERS (Stacking sequence) */}
      {/* ========================================================================= */}

      {/* SECTION 1: HERO CONTAINER (Zooms and fades based on scrollTrigger) */}
      <div className="bg-layer-hero absolute inset-0 w-full h-full z-2 transition-colors duration-1000"
        style={{ backgroundColor: getHeroBgColor(activeFlavor) }}
      >
        {/* Soft radial ambient spotlight */}
        <div className="absolute top-[35%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-white/20 blur-[140px]" />
      </div>

      {/* SECTION 2: BRAND STORY TROPICAL GRADIENT & SHAPES */}
      <div className="bg-layer-sec2 absolute inset-0 w-full h-full z-3 bg-gradient-to-tr from-[#FFF7ED] via-[#A7EBFF]/20 to-[#2F9D45]/5 opacity-0 backdrop-blur-[6px]">
        {/* Floating Organic Vector Elements */}
        <div className="absolute inset-0 w-full h-full opacity-40 blur-[25px]">
          <div className="bg-sec2-organic-1 absolute w-[300px] h-[300px] top-[20%] left-[-8%] rounded-full bg-brand-green/15" />
          <div className="absolute w-[360px] h-[360px] bottom-[10%] right-[-10%] rounded-full bg-[#48C7F3]/15 animate-pulse-slow" />
        </div>
      </div>

      {/* SECTION 3: FLAVORS JUNGLE GREEN PARALLAX */}
      <div className="bg-layer-sec3 absolute inset-0 w-full h-full z-4 bg-gradient-to-b from-[#FAFDF6] via-[#E9F0DB] to-[#FAFDF6] opacity-0">
        {/* Parallax Tropical Leaf 1 (Large, blurred foreground) */}
        <svg className="bg-leaf-parallax-1 absolute w-60 h-60 bottom-[-5%] left-[-8%] text-brand-green/10 fill-current opacity-70 blur-[4px]" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34C5.71,20.5 8.19,19.36 11.32,20.1C18,21.7 20,10 21,3C12,4 9,5 17,8Z" />
        </svg>

        {/* Parallax Tropical Leaf 2 (Medium depth, sharp) */}
        <svg className="bg-leaf-parallax-2 absolute w-40 h-40 top-[18%] right-[-6%] text-brand-green-dark/8 fill-current opacity-60 blur-[1px]" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34C5.71,20.5 8.19,19.36 11.32,20.1C18,21.7 20,10 21,3C12,4 9,5 17,8Z" />
        </svg>
      </div>

      {/* SECTION 4: BENEFITS SPLASH LAYER */}
      <div className="bg-layer-sec4 absolute inset-0 w-full h-full z-5 bg-gradient-to-br from-[#FFFCEB] via-[#FFF1F2] to-[#FFF7EE] opacity-0">
        {/* Splashing organic fluid elements */}
        <div className="absolute inset-0 w-full h-full opacity-35 blur-[20px]">
          {/* Splash Element 1: Ananas Amber */}
          <div className="bg-splash-organic-1 absolute w-[350px] h-[350px] top-[15%] left-[10%] rounded-full bg-[#F6C230]/20" />
          {/* Splash Element 2: Bissap Pink */}
          <div className="bg-splash-organic-2 absolute w-[400px] h-[400px] bottom-[20%] right-[8%] rounded-full bg-hibiscus/15" />
        </div>
      </div>

      {/* SECTION 5: LIFESTYLE / EXPERIENCE CINEMATIC LIGHTING */}
      <div className="bg-layer-sec5 absolute inset-0 w-full h-full z-6 bg-[#161D26] opacity-0">
        {/* Soft glass reflections behind content */}
        <div className="absolute top-[35%] left-[20%] w-[380px] h-[220px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-[4px] rotate-[-8deg] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-[300px] h-[180px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-[3px] rotate-[15deg] pointer-events-none" />

        {/* Dynamic sweeping lighting gradient beam */}
        <div className="bg-light-sweep absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent blur-[120px] pointer-events-none mix-blend-screen" />
      </div>

      {/* SECTION 6: FAQ, CONTACT & FOOTER PREMIUM CLEAN WHITE */}
      <div className="bg-layer-sec6 absolute inset-0 w-full h-full z-7 bg-white opacity-0" />
    </div>
  );
}
