import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background color shift transition linked to scroll progress
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      })
      .to(bgRef.current, {
        backgroundColor: '#E6F9FF', // Light Blue Lagon
        duration: 1
      })
      .to(bgRef.current, {
        backgroundColor: '#FFFDEB', // Light Solaire Yellow (Pineapple)
        duration: 1
      })
      .to(bgRef.current, {
        backgroundColor: '#FFF0F5', // Light Hibiscus Pink (Bissap)
        duration: 1
      });

      // Story text reveal with scroll trigger
      gsap.fromTo('.story-header-el',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect on the background float elements
      gsap.to('.float-element-1', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to('.float-element-2', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center py-28 overflow-hidden transition-colors duration-1000"
    >
      {/* Scroll-animated background wrapper */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[#E6F9FF] transition-colors duration-1000 z-0" 
      />

      {/* Decorative ambient textures */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4)_0%,transparent_60%)] z-1 pointer-events-none" />
      
      {/* Floating abstract organic shape 1 (Parallax) */}
      <div className="float-element-1 absolute top-20 left-10 md:left-24 w-28 h-28 md:w-36 md:h-36 rounded-full bg-brand-sky/20 border border-brand-white/40 blur-[2px] z-1 flex items-center justify-center pointer-events-none">
        <Droplets size={40} className="text-brand-blue/30 animate-pulse" />
      </div>

      {/* Floating abstract organic shape 2 (Parallax) */}
      <div className="float-element-2 absolute bottom-24 right-10 md:right-28 w-24 h-24 md:w-32 md:h-32 rounded-full bg-pineapple/10 border border-brand-white/30 blur-[1px] z-1 flex items-center justify-center pointer-events-none">
        <Sparkles size={36} className="text-pineapple/30 animate-float" />
      </div>

      {/* Main Content Area */}
      <div 
        ref={textRef}
        className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8"
      >
        <span className="story-header-el font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green-dark inline-block">
          Une Immersion Sensorielle
        </span>
        
        <h2 className="story-header-el font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-brand-text leading-tight max-w-4xl mx-auto">
          Prendre soin de soi n'a jamais eu aussi bon goût
        </h2>
        
        <div className="story-header-el w-20 h-[3px] bg-brand-green-dark mx-auto rounded-full" />
        
        <p className="story-header-el text-brand-text/80 text-lg sm:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto font-serif italic">
          "Nous avons réconcilié la recherche de la santé et l'exigence du plaisir. Chaque bouteille CHRISTIE NATURALS est une promesse d'équilibre : une hydratation vivante, des nutriments hautement assimilables, et une sensation immédiate de bien-être physique et mental."
        </p>

        <div className="story-header-el pt-8">
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-brand-text hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-xs shadow-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            Partager l'expérience
            <Droplets size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
