import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import promoBaobab from '../assets/promo_baobab.jpg';
import promoPineapple from '../assets/promo_pineapple.jpg';
import promoBissap from '../assets/promo_bissap.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.lifestyle-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.lifestyle-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Staggered grid cards fade-up
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      src: promoBaobab,
      title: 'Jus de Baobab',
      vibe: 'Douceur & Vitalité',
      desc: 'Partagez un moment d’authenticité et de douceur naturelle, riche en fibres et minéraux essentiels.',
      accentColor: 'border-baobab/20'
    },
    {
      src: promoPineapple,
      title: 'Jus d’Ananas',
      vibe: 'Énergie & Soleil',
      desc: 'Célébrez la vivacité tropicale et faites le plein d’énergie et de vitamine C sous le soleil.',
      accentColor: 'border-pineapple/20'
    },
    {
      src: promoBissap,
      title: 'Jus de Bissap',
      vibe: 'Caractère & Élégance',
      desc: 'Succombez au raffinement d’une infusion florale intense, rafraîchissante et profondément désaltérante.',
      accentColor: 'border-hibiscus/20'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-sky/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="lifestyle-header text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Moments Christie Naturals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Partagez la fraîcheur au quotidien
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full" />
        </div>

        {/* Promo Images Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col rounded-[32px] bg-slate-50/50 border ${item.accentColor} shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left`}
            >
              {/* Image Frame */}
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card info */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green-dark">
                    {item.vibe}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-text mt-1.5 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
