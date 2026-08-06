import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Droplets, ShieldCheck, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Engagement {
  title: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  iconColor: string;
  iconHoverColor: string;
  glowColorShadow: string;
}

const ENGAGEMENTS: Engagement[] = [
  {
    title: 'Naturalité',
    desc: 'Des recettes inspirées d’ingrédients authentiques et soigneusement sélectionnés.',
    icon: <Leaf size={24} />,
    gradient: 'from-[#2F9D45] to-[#1E7A34]',
    borderColor: 'border-[#2F9D45]/15',
    iconColor: 'text-[#2F9D45]',
    iconHoverColor: 'text-[#1E7A34]',
    glowColorShadow: 'rgba(47, 157, 69, 0.25)'
  },
  {
    title: 'Fraîcheur',
    desc: 'Une expérience fruitée et désaltérante pensée pour chaque moment de dégustation.',
    icon: <Droplets size={24} />,
    gradient: 'from-[#48C7F3] to-[#2B9EC5]',
    borderColor: 'border-[#48C7F3]/15',
    iconColor: 'text-[#48C7F3]',
    iconHoverColor: 'text-[#2B9EC5]',
    glowColorShadow: 'rgba(72, 199, 243, 0.25)'
  },
  {
    title: 'Qualité',
    desc: 'Une exigence constante pour proposer des jus à la hauteur d’une marque premium.',
    icon: <ShieldCheck size={24} />,
    gradient: 'from-[#F6C230] to-[#E28743]',
    borderColor: 'border-[#F6C230]/20',
    iconColor: 'text-[#B08300]',
    iconHoverColor: 'text-[#E28743]',
    glowColorShadow: 'rgba(246, 194, 48, 0.25)'
  },
  {
    title: 'Plaisir',
    desc: 'Des saveurs généreuses, accessibles et mémorables pour vos papilles.',
    icon: <Heart size={24} />,
    gradient: 'from-[#C93A6D] to-[#961C4C]',
    borderColor: 'border-[#C93A6D]/15',
    iconColor: 'text-[#C93A6D]',
    iconHoverColor: 'text-[#961C4C]',
    glowColorShadow: 'rgba(201, 58, 109, 0.25)'
  }
];

function EngagementCard({ eng }: { eng: Engagement }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom CSS variables for cursor tracking highlight
    card.style.setProperty('--mouse-x', `${x}`);
    card.style.setProperty('--mouse-y', `${y}`);
    
    // Compute normalized rotation angle (-0.5 to 0.5)
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    // Set rot degrees (max 10 degrees)
    setTilt({ x: xc * 10, y: -yc * 10 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative p-8 rounded-[32px] bg-gradient-to-br ${eng.gradient} overflow-hidden cursor-pointer select-none transition-all text-white`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.03, 1.03, 1.03)`
          : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        boxShadow: isHovered 
          ? `0 25px 45px -10px ${eng.glowColorShadow}`
          : `0 12px 28px -10px ${eng.glowColorShadow}`,
        transition: isHovered 
          ? 'transform 0.1s ease, box-shadow 0.3s ease' 
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
      }}
    >
      {/* Radial Cursor-Tracking Glow highlight */}
      {isHovered && (
        <div 
          className="absolute w-44 h-44 rounded-full bg-white/20 blur-2xl pointer-events-none z-0"
          style={{
            left: `calc(var(--mouse-x, 0) * 1px - 88px)`,
            top: `calc(var(--mouse-y, 0) * 1px - 88px)`,
          }}
        />
      )}

      {/* Card Content (relative z-10 for text stacking) */}
      <div className="relative z-10 flex flex-col items-start">
        
        {/* Icon Container */}
        <div 
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/95 shadow-sm transition-all duration-300 ${
            isHovered ? 'scale-110 rotate-3' : ''
          }`}
        >
          <span className={`transition-colors duration-300 ${eng.iconHoverColor}`}>
            {eng.icon}
          </span>
        </div>

        {/* Heading */}
        <h3 className="font-serif text-xl font-bold mb-3 text-white">
          {eng.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-white/90">
          {eng.desc}
        </p>

      </div>
    </div>
  );
}

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

      // Staggered reveal for the engagements cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 55 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
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

  return (
    <section
      id="la-marque"
      ref={sectionRef}
      className="py-24 md:py-32 bg-transparent relative overflow-hidden"
    >
      {/* Decorative Morphing Blobs (Glowing & Animated) */}
      <div className="morphing-blob-1 absolute top-[10%] left-[-8%] w-[350px] h-[350px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="morphing-blob-2 absolute bottom-[10%] right-[-8%] w-[400px] h-[400px] bg-brand-sky/25 rounded-full blur-[110px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="morphing-blob-3 absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-hibiscus/10 rounded-full blur-[90px] pointer-events-none z-0 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-extrabold text-brand-green animate-pulse">
              Notre Philosophie
            </span>
            
            {/* Word-by-word Text Reveal Container */}
            <h2 className="text-reveal-container font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-[1.15] tracking-tight">
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
              Chez <strong className="text-brand-text font-semibold">CHRISTIE NATURALS</strong>, nous croyons qu'une boisson d'exception doit nourrir votre corps autant qu'elle émerveille vos papilles. Notre démarche scientifique et artisanale consiste à extraire le meilleur des terroirs tropicaux pour créer des jus vivants, gorgés de nutriments actifs.
            </p>
            <p className="story-desc text-brand-muted text-base leading-relaxed">
              Nous sélectionnons des super-aliments d'exception — le baobab revitalisant, l'ananas enzymatique et l'hibiscus antioxydant — pour composer des recettes bienfaisantes qui accompagnent votre quête d'un mode de vie sain, équilibré et vigoureux.
            </p>

            {/* Micro value badges list (New interactive block) */}
            <div className="story-desc flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-green/10 border border-brand-green/20 group hover:bg-brand-green hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-brand-green/15">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-green shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Leaf size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider transition-colors duration-300">100% Naturel</h4>
                  <span className="text-[10px] opacity-75 block mt-0.5">Sans aucun additif</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 group hover:bg-brand-blue hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-brand-blue/15">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Droplets size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider transition-colors duration-300">Pressé à Froid</h4>
                  <span className="text-[10px] opacity-75 block mt-0.5">Nutriments préservés</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 2x2 Interactive engagements cards */}
          <div className="lg:col-span-7">
            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {ENGAGEMENTS.map((eng) => (
                <EngagementCard key={eng.title} eng={eng} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
