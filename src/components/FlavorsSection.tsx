import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import baobabImg from '../assets/img_baobab_nobg.png'; // Baobab bottle asset (Image 1 - White Bg)
import pineappleImg from '../assets/img_pineapple_nobg.png'; // Pineapple bottle asset (Image 2 - White Bg)
import bissapImg from '../assets/img_bissap_nobg.png'; // Bissap bottle asset (Image 3 - White Bg)

gsap.registerPlugin(ScrollTrigger);

export default function FlavorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up section headers
      gsap.fromTo('.flavors-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.flavors-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Staggered slide and reveal for flavor cards
      gsap.fromTo('.flavor-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.flavors-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const flavors = [
    {
      id: 'baobab',
      name: 'Jus de Baobab',
      shortName: 'Baobab',
      desc: 'Une texture douce et veloutée d’un super-aliment légendaire. Le baobab est naturellement gorgé de Vitamine C (6 fois plus qu\'une orange) pour stimuler vos défenses immunitaires et de fibres solubles prébiotiques pour nourrir votre microbiote intestinal.',
      tags: ['Immunité', 'Prébiotique', 'Anti-fatigue'],
      img: baobabImg,
      color: '#D8B08D', // Sable Baobab
      gradient: 'from-[#FAF6F2] to-[#EADBC8]',
      textColor: 'text-[#8A6642]',
      tagBg: 'bg-[#D8B08D]/20 text-[#8A6642]',
      glowColor: 'shadow-[#D8B08D]/30',
      radialGlow: 'rgba(216, 176, 141, 0.25)',
      footerText: 'Super-fruit Protecteur'
    },
    {
      id: 'pineapple',
      name: 'Jus d’Ananas',
      shortName: 'Ananas',
      desc: 'Une fraîcheur solaire intensément revitalisante. Pressé à froid, notre jus d\'ananas préserve la bromélaïne, une enzyme naturelle aux propriétés anti-inflammatoires et digestives qui aide à l\'assimilation des protéines.',
      tags: ['Digestion', 'Anti-inflammatoire', 'Manganèse'],
      img: pineappleImg,
      color: '#F6C230', // Pineapple Gold
      gradient: 'from-[#FFFDEB] to-[#FDF0A6]',
      textColor: 'text-[#B08300]',
      tagBg: 'bg-[#F6C230]/20 text-[#B08300]',
      glowColor: 'shadow-[#F6C230]/30',
      radialGlow: 'rgba(246, 194, 48, 0.25)',
      footerText: 'Bromélaïne Active'
    },
    {
      id: 'bissap',
      name: 'Jus de Bissap',
      shortName: 'Bissap',
      desc: 'Une infusion florale vibrante aux vertus millénaires. Notre bissap est riche en anthocyanes et polyphénols, des antioxydants puissants reconnus pour aider à réguler la tension artérielle et purifier l\'organisme.',
      tags: ['Antioxydant', 'Tension Protect', 'Détox'],
      img: bissapImg,
      color: '#C93A6D', // Hibiscus Pink
      gradient: 'from-[#FFF0F5] to-[#FCD5E4]',
      textColor: 'text-[#961C4C]',
      tagBg: 'bg-[#C93A6D]/20 text-[#961C4C]',
      glowColor: 'shadow-[#C93A6D]/30',
      radialGlow: 'rgba(201, 58, 109, 0.25)',
      footerText: 'Bouclier Antioxydant'
    }
  ];

  return (
    <section
      id="nos-saveurs"
      ref={sectionRef}
      className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-brand-white relative overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-sky/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-brand-green/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <div className="flavors-header text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Collection Signature
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Nos saveurs d'exception
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full mb-6" />
          <p className="text-brand-muted text-base sm:text-lg">
            Trois élixirs de vitalité formulés à partir des plus puissants super-aliments tropicaux pour régénérer votre corps au quotidien.
          </p>
        </div>

        {/* Flavors Grid */}
        <div className="flavors-grid grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              className="flavor-card group relative rounded-[36px] p-6 lg:p-8 bg-white border border-brand-sky/20 transition-all duration-700 hover:shadow-2xl flex flex-col justify-between overflow-hidden shadow-xl"
              style={{
                boxShadow: `0 20px 40px -15px ${flavor.radialGlow}`
              }}
            >
              {/* Radial light halo behind the bottle */}
              <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[40px] opacity-60 group-hover:scale-125 transition-transform duration-700 pointer-events-none"
                style={{ backgroundColor: flavor.color }}
              />

              {/* Card Content Top: Tags & Name */}
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {flavor.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${flavor.tagBg}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-text mb-3">
                  {flavor.name}
                </h3>
                <p className="text-sm text-brand-text/70 leading-relaxed mb-6 font-normal">
                  {flavor.desc}
                </p>
              </div>

              {/* Card Center: Animated Product Image Frame */}
              <div className="relative h-72 lg:h-80 flex items-center justify-center mb-6 z-10">
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={flavor.img}
                    alt={flavor.name}
                    className="h-full object-contain transform group-hover:scale-110 group-hover:-translate-y-4 group-hover:rotate-3 transition-all duration-700 ease-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.12)]"
                  />
                  {/* Water splash decorator graphic or light reflection inside card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none" />
                </div>
              </div>

              {/* Card Footer: Action Button */}
              <div className="relative z-10 pt-4 border-t border-brand-text/5 flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${flavor.textColor}`}>
                  {flavor.footerText}
                </span>
                <a
                  href="#contact"
                  className={`w-10 h-10 rounded-full bg-brand-white flex items-center justify-center shadow-md shadow-brand-text/5 text-brand-text group-hover:bg-brand-text group-hover:text-brand-white transition-all duration-300`}
                >
                  <ArrowRight size={18} />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
