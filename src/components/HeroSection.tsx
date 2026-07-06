import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Leaf, Sparkles, Award } from 'lucide-react';
import heroFamilyImg from '../assets/hero_family.jpg'; // Family lifestyle image

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const badgeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Entry Animations
    const ctx = gsap.context(() => {
      // Fade in background ambient lights
      gsap.fromTo('.ambient-light', 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out', stagger: 0.3 }
      );

      // Left column reveal
      const tl = gsap.timeline();
      tl.fromTo('.hero-eyebrow', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
        '-=0.5'
      )
      .fromTo('.hero-desc', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
        '-=0.6'
      )
      .fromTo('.hero-badge', 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', stagger: 0.15 }, 
        '-=0.5'
      )
      .fromTo('.hero-cta', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15 }, 
        '-=0.4'
      );

      // Right column floating banner and leaf parallax
      gsap.fromTo(rightColRef.current, 
        { scale: 0.9, opacity: 0, x: 50 }, 
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 0.3 }
      );

      // Mouse parallax effect on right column elements
      const handleMouseMove = (e: MouseEvent) => {
        if (!rightColRef.current) return;
        const { clientX, clientY } = e;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Calculate offsets
        const moveX = (clientX - width / 2) / 35;
        const moveY = (clientY - height / 2) / 35;
        
        gsap.to('.parallax-item-1', { x: moveX, y: moveY, duration: 0.8, ease: 'power2.out' });
        gsap.to('.parallax-item-2', { x: -moveX * 1.5, y: -moveY * 1.5, duration: 0.8, ease: 'power2.out' });
        gsap.to('.parallax-glow', { x: moveX * 0.5, y: moveY * 0.5, duration: 1, ease: 'power2.out' });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accueil"
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-gradient-to-b from-brand-sky/20 via-brand-white to-brand-white overflow-hidden"
    >
      {/* Background ambient glowing halos */}
      <div className="ambient-light absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-sky/30 blur-[100px] pointer-events-none z-0" />
      <div className="ambient-light absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-blue/15 blur-[120px] pointer-events-none z-0" />
      <div className="ambient-light absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-brand-green/10 blur-[90px] pointer-events-none z-0" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#48C7F3_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Copywriting & CTAs */}
        <div ref={leftColRef} className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
          
          {/* Eyebrow badge */}
          <div className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-sky/40 border border-brand-blue/20 text-brand-text text-xs uppercase tracking-[0.25em] font-bold">
            <Sparkles size={12} className="text-brand-green animate-pulse" />
            CHRISTIE NATURALS
          </div>

          {/* Main Title */}
          <h1 className="hero-title font-serif text-4xl sm:text-5xl xl:text-6xl font-bold text-brand-text leading-[1.1] tracking-tight">
            Le goût de la nature,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-blue">
              dans toute sa fraîcheur
            </span>
          </h1>

          {/* Subtitle description */}
          <p className="hero-desc text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl font-normal">
            Découvrez une collection de jus authentiques et rafraîchissants, élaborés pour révéler le meilleur du baobab, de l’ananas et du bissap. Une expérience fruitée, naturelle et généreuse, pensée pour celles et ceux qui recherchent la fraîcheur, la qualité et le vrai goût.
          </p>

          {/* Trust Badges */}
          <div ref={badgeContainerRef} className="flex flex-wrap gap-3 py-2">
            {[
              { text: '100% naturel', icon: <Leaf size={14} className="text-brand-green" /> },
              { text: 'Sans conservateurs', icon: <Award size={14} className="text-brand-blue" /> },
              { text: 'Riche en vitamines', icon: <Sparkles size={14} className="text-pineapple" /> },
            ].map((badge, idx) => (
              <span
                key={idx}
                className="hero-badge inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-white border border-brand-sky/30 shadow-sm text-xs font-semibold text-brand-text/90 hover:border-brand-green/30 transition-all duration-300"
              >
                {badge.icon}
                {badge.text}
              </span>
            ))}
          </div>

          {/* Call to Actions */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <a
              href="#nos-saveurs"
              className="px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/35 hover:-translate-y-0.5 transition-all duration-300"
            >
              Découvrir nos saveurs
              <ArrowRight size={14} />
            </a>
            <a
              href="#distribution"
              className="px-8 py-4 rounded-full bg-brand-white hover:bg-brand-sky/20 text-brand-text border border-brand-sky/60 font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm hover:border-brand-blue/30 transition-all duration-300"
            >
              Devenir distributeur
            </a>
          </div>

        </div>

        {/* Right Column: Cinema Flyer Layout with Mouse Parallax */}
        <div ref={rightColRef} className="lg:col-span-6 relative flex justify-center items-center">
          
          {/* Radial Glow under the bottles */}
          <div className="parallax-glow absolute w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-brand-sky to-brand-green/30 opacity-40 blur-[80px] z-0 animate-pulse-slow pointer-events-none" />

          {/* Main Visual Frame (The Brand Banner) */}
          <div className="parallax-item-1 relative z-10 w-full max-w-[540px] aspect-[1024/763] rounded-3xl overflow-hidden shadow-2xl shadow-brand-blue/15 border border-brand-white/80 group">
            <img
              src={heroFamilyImg}
              alt="Famille dégustant les jus Christie Naturals"
              className="w-full h-full object-cover transform transition-transform duration-1000 ease-out group-hover:scale-103"
            />
            {/* Glossy Overlay frame */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-text/10 via-transparent to-brand-white/10 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-brand-white/20 rounded-3xl pointer-events-none" />
          </div>

          {/* Floating tropical leaf decorator (Parallax 2) */}
          <div className="parallax-item-2 absolute -top-8 -left-8 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none z-20 animate-float opacity-90">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-green/20 text-brand-green">
              <path d="M50,0 C65,20 80,30 90,60 C75,70 60,75 50,100 C40,75 25,70 10,60 C20,30 35,20 50,0 Z" />
            </svg>
          </div>

          {/* Secondary smaller floating blossom/leaf */}
          <div className="parallax-item-2 absolute -bottom-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none z-20 animate-float-delayed opacity-85">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-brand-sky/40 text-brand-blue">
              <path d="M50,10 C55,30 75,35 90,50 C75,65 55,70 50,90 C45,70 25,65 10,50 C25,35 45,30 50,10 Z" />
            </svg>
          </div>

          {/* Subtle floating citrus wedge indicator */}
          <div className="absolute -right-4 top-1/4 px-4 py-2 bg-brand-white/80 backdrop-blur-md border border-brand-sky/20 rounded-full shadow-lg z-20 flex items-center gap-1.5 animate-float-delayed pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-text">Fraîcheur lagon</span>
          </div>

        </div>

      </div>

      {/* Wave bottom transition separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] fill-brand-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,152.07,44.17,223.18,74.65,321.39,56.44Z" />
        </svg>
      </div>

    </section>
  );
}
