import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Shield, Award, Sparkles, Sun, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.benefits-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.benefits-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Staggered grid cards animation
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
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

  const benefits = [
    {
      title: 'Défenses immunitaires',
      desc: 'Une teneur exceptionnelle en Vitamine C naturelle issue du Baobab et de l’Ananas pour stimuler activement vos défenses.',
      icon: <Shield size={22} className="text-brand-green" />,
      bg: 'bg-brand-green/5'
    },
    {
      title: 'Confort digestif',
      desc: 'Des fibres solubles douces de baobab et de la bromélaïne active pour apaiser l’estomac et nourrir votre flore intestinale.',
      icon: <Leaf size={22} className="text-brand-blue" />,
      bg: 'bg-brand-blue/5'
    },
    {
      title: 'Santé cardiovasculaire',
      desc: 'Les anthocyanes et polyphénols du Bissap aident à protéger les vaisseaux et soutenir une bonne circulation sanguine.',
      icon: <Heart size={22} className="text-hibiscus" />,
      bg: 'bg-hibiscus/5'
    },
    {
      title: 'Zéro sucre ajouté',
      desc: 'Uniquement les sucres naturels du fruit pour garantir une libération d’énergie stable, sans pic d’insuline.',
      icon: <Award size={22} className="text-pineapple" />,
      bg: 'bg-pineapple/5'
    },
    {
      title: 'Pouvoir détoxifiant',
      desc: 'Des propriétés diurétiques et drainantes naturelles qui soutiennent le travail d’élimination du foie et des reins.',
      icon: <Sun size={22} className="text-brand-green-dark" />,
      bg: 'bg-brand-green-dark/5'
    },
    {
      title: 'Hydratation active',
      desc: 'Des boissons naturellement riches en électrolytes (potassium, calcium) pour une régénération profonde.',
      icon: <Sparkles size={22} className="text-brand-text" />,
      bg: 'bg-brand-text/5'
    }
  ];

  return (
    <section
      id="pourquoi-nous-choisir"
      ref={sectionRef}
      className="py-24 bg-transparent relative overflow-hidden"
    >
      {/* Decorative vector background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-sky/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="benefits-header text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Engagement & Rigueur
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Une exigence de qualité à chaque gorgée
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-3xl border border-brand-sky/20 bg-brand-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col items-start text-left"
            >
              {/* Icon Holder */}
              <div className={`w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-bold text-brand-text mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-brand-muted leading-relaxed font-normal">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
