import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import promoBaobab from '../assets/promo_baobab.jpg';
import promoPineapple from '../assets/promo_pineapple.jpg';
import promoBissap from '../assets/promo_bissap.jpg';
import promoGingembre from '../assets/promo_gingembre.jpg';
import promoPassion from '../assets/promo_passion.jpg';
import promoPasteque from '../assets/promo_pasteque.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = /mobi|android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const row = gridRef.current;
      if (!row) return;

      // Calculate total width of horizontal elements relative to window width
      const getScrollWidth = () => {
        return row.scrollWidth - window.innerWidth + 96; // 96px padding
      };

      gsap.to(row, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${row.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      src: promoBaobab,
      title: 'Jus de Baobab',
      vibe: 'Douceur & Vitalité',
      desc: 'Partagez un moment d’authenticité et de douceur naturelle, riche en fibres et minéraux essentiels.',
      accentColor: 'border-baobab/20',
      glow: 'shadow-baobab/10'
    },
    {
      src: promoPineapple,
      title: 'Jus d’Ananas',
      vibe: 'Énergie & Soleil',
      desc: 'Célébrez la vivacité tropicale et faites le plein d’énergie et de vitamine C sous le soleil.',
      accentColor: 'border-pineapple/20',
      glow: 'shadow-pineapple/10'
    },
    {
      src: promoBissap,
      title: 'Jus de Bissap',
      vibe: 'Caractère & Élégance',
      desc: 'Succombez au raffinement d’une infusion florale intense, rafraîchissante et profondément désaltérante.',
      accentColor: 'border-bissap/20',
      glow: 'shadow-bissap/10'
    },
    {
      src: promoPasteque,
      title: 'Jus de Pastèque',
      vibe: 'Hydratation & Légèreté',
      desc: 'La fraîcheur désaltérante d’une pastèque mûre et gorgée de jus pour hydrater votre corps avec délice.',
      accentColor: 'border-pasteque/20',
      glow: 'shadow-pasteque/10'
    },
    {
      src: promoGingembre,
      title: 'Jus de Gingembre',
      vibe: 'Piquant & Force',
      desc: 'Une formule tonique et revigorante de gingembre pressé qui réveille vos sens et booste votre énergie.',
      accentColor: 'border-gingembre/20',
      glow: 'shadow-gingembre/10'
    },
    {
      src: promoPassion,
      title: 'Jus de Fruits Passion',
      vibe: 'Exotisme & Intensité',
      desc: 'Une expérience gustative intense et acidulée, riche en antioxydants pour une pause pleine de saveurs.',
      accentColor: 'border-passion/20',
      glow: 'shadow-passion/10'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="py-24 md:py-32 bg-transparent relative overflow-hidden flex flex-col justify-center min-h-[80vh]"
    >
      {/* Decorative Blur Halo */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-sky/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Section Header */}
        <div className="lifestyle-header text-center md:text-left max-w-3xl mb-12 md:mb-20 flex flex-col items-center md:items-start">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Moments Christie Naturals
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Partagez la fraîcheur au quotidien
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full" />
        </div>
      </div>

      {/* Horizontal scrolling block container */}
      {/* On desktop, the gridRef wrapper shifts horizontally. On mobile, it allows swipe horizontal scrolling. */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 overflow-x-auto md:overflow-x-visible scrollbar-hide">
        <div
          ref={gridRef}
          className="flex flex-row gap-6 md:gap-8 lg:gap-12 flex-nowrap w-max relative z-10"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col rounded-[32px] bg-slate-50/50 border ${item.accentColor} shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left w-[280px] sm:w-[360px] lg:w-[420px] shrink-0`}
            >
              {/* Premium Image Frame with Cinematic Zoom */}
              <div className="premium-img-container relative aspect-[5/4] w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="premium-img w-full h-full object-cover"
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
