import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Flame, ShieldCheck, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word Text Reveal animation
      gsap.to('.reveal-word', {
        y: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.text-reveal-container',
          start: 'top 85%',
        }
      });

      // Fade in the editorial paragraphs
      gsap.fromTo('.story-desc', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.story-desc',
            start: 'top 85%',
          }
        }
      );

      // Staggered reveal for the 4 engagement cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const engagements = [
    {
      title: 'Naturalité',
      desc: 'Des recettes inspirées d’ingrédients authentiques et soigneusement sélectionnés.',
      icon: <Leaf size={24} className="text-brand-green" />,
      colorClass: 'border-brand-green/20 hover:bg-brand-green/5 shadow-brand-green/5',
      glowColor: 'bg-brand-green/20'
    },
    {
      title: 'Fraîcheur',
      desc: 'Une expérience fruitée et désaltérante pensée pour chaque moment de dégustation.',
      icon: <Flame size={24} className="text-brand-blue" />,
      colorClass: 'border-brand-blue/20 hover:bg-brand-blue/5 shadow-brand-blue/5',
      glowColor: 'bg-brand-blue/20'
    },
    {
      title: 'Qualité',
      desc: 'Une exigence constante pour proposer des jus à la hauteur d’une marque premium.',
      icon: <ShieldCheck size={24} className="text-brand-green-dark" />,
      colorClass: 'border-brand-green-dark/20 hover:bg-brand-green-dark/5 shadow-brand-green-dark/5',
      glowColor: 'bg-brand-green-dark/20'
    },
    {
      title: 'Plaisir',
      desc: 'Des saveurs généreuses, accessibles et mémorables pour vos papilles.',
      icon: <Heart size={24} className="text-hibiscus" />,
      colorClass: 'border-hibiscus/20 hover:bg-hibiscus/5 shadow-hibiscus/5',
      glowColor: 'bg-hibiscus/20'
    }
  ];

  return (
    <section
      id="la-marque"
      ref={sectionRef}
      className="py-24 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative Morphing Blobs */}
      <div className="morphing-blob-1 absolute top-[20%] left-[-5%] w-[250px] h-[250px] bg-brand-green/5 blur-3xl pointer-events-none z-0" />
      <div className="morphing-blob-2 absolute bottom-[20%] right-[-5%] w-[300px] h-[300px] bg-brand-sky/20 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green">
              Notre Philosophie
            </span>
            {/* Word-by-word Text Reveal Container */}
            <h2 className="text-reveal-container font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight">
              {"Quand la haute gastronomie rencontre la nutrition fonctionnelle".split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-1.5 py-0.5">
                  <span className="reveal-word inline-block transform translate-y-full">
                    {word}
                  </span>
                </span>
              ))}
            </h2>
            <div className="w-16 h-[3px] bg-brand-green rounded-full" />
            <p className="story-desc text-brand-muted text-base leading-relaxed">
              Chez <strong className="text-brand-text font-medium">CHRISTIE NATURALS</strong>, nous croyons qu'une boisson d'exception doit nourrir votre corps autant qu'elle émerveille vos papilles. Notre démarche scientifique et artisanale consiste à extraire le meilleur des terroirs tropicaux pour créer des jus vivants, gorgés de nutriments actifs.
            </p>
            <p className="story-desc text-brand-muted text-base leading-relaxed">
              Nous sélectionnons des super-aliments d'exception — le baobab revitalisant, l'ananas enzymatique et l'hibiscus antioxydant — pour composer des recettes bienfaisantes qui accompagnent votre quête d'un mode de vie sain, équilibré et vigoureux.
            </p>
          </div>

          {/* Right Column: 2x2 Engagement Cards Grid */}
          <div className="lg:col-span-7">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {engagements.map((eng) => (
                <div
                  key={eng.title}
                  className={`group relative p-8 rounded-3xl bg-brand-white border ${eng.colorClass} shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}
                >
                  {/* Subtle hover background glow */}
                  <div className={`absolute -right-12 -bottom-12 w-28 h-28 rounded-full ${eng.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none`} />
                  
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {eng.icon}
                  </div>

                  {/* Heading */}
                  <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                    {eng.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {eng.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
