import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import blogBaobab from '../assets/blog_baobab.png';
import blogPineapple from '../assets/blog_pineapple.png';
import blogBissap from '../assets/blog_bissap.png';
import blogWatermelon from '../assets/blog_watermelon.png';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Les bienfaits cachés du Baobab : le super-fruit qui renforce l'immunité",
    excerpt: "Découvrez pourquoi la pulpe de fruit du baobab est le secret le mieux gardé d’Afrique pour stimuler votre système immunitaire et nourrir votre flore intestinale de fibres prébiotiques actives.",
    category: "Nutrition & Santé",
    date: "28 Juillet 2026",
    readTime: "4 min",
    image: blogBaobab,
    slug: "#baobab-immunite"
  },
  {
    title: "Infusion d'Hibiscus (Bissap) : un allié majeur pour réguler la tension artérielle",
    excerpt: "Riche en polyphénols antioxydants et anthocyanes, l'hibiscus n'est pas seulement une boisson désaltérante. C'est un puissant bouclier protecteur prouvé pour soutenir la santé cardiovasculaire.",
    category: "Santé Naturelle",
    date: "02 Août 2026",
    readTime: "5 min",
    image: blogBissap,
    slug: "#bissap-tension"
  },
  {
    title: "Pourquoi le pressage à froid préserve l’intégralité des nutriments et enzymes actifs",
    excerpt: "Contrairement aux jus pasteurisés chauffés à haute température, le pressage à froid évite l’oxydation thermique, maintenant intactes les vitamines vivantes et la bromélaïne active de l'ananas.",
    category: "Science des Jus",
    date: "04 Août 2026",
    readTime: "3 min",
    image: blogPineapple,
    slug: "#pressage-a-froid"
  },
  {
    title: "Pastèque et Gingembre : l'alliance parfaite pour l'hydratation et la détox",
    excerpt: "Explorez la synergie entre la L-citrulline de la pastèque pour la récupération musculaire et les gingéroles du gingembre pour détoxifier l'organisme et soulager l'inflammation.",
    category: "Détox & Énergie",
    date: "05 Août 2026",
    readTime: "4 min",
    image: blogWatermelon,
    slug: "#detox-pasteque-gingembre"
  }
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal animation
      gsap.fromTo('.blog-header-el',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.blog-header-el',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards staggered reveal animation
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="py-24 md:py-32 bg-transparent relative overflow-hidden flex flex-col justify-center min-h-[90vh]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <div className="lifestyle-header text-center md:text-left max-w-3xl mb-12 md:mb-20 flex flex-col items-center md:items-start">
          <span className="blog-header-el font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3 block">
            Notre Magazine Santé & Nutrition
          </span>
          <h2 className="blog-header-el font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Nos conseils et secrets de super-fruits
          </h2>
          <div className="blog-header-el w-16 h-[3px] bg-brand-green rounded-full mb-6" />
          <p className="blog-header-el text-brand-muted text-base leading-relaxed">
            Optimisez votre vitalité au quotidien grâce à nos guides rédigés par nos experts en micronutrition. Découvrez la science derrière les principes actifs de nos jus de fruits naturels pressés à froid.
          </p>
        </div>

        {/* Blog Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-[32px] bg-slate-50/40 border border-brand-sky/10 shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 text-left w-full h-full justify-between"
            >
              <div>
                {/* Image Frame with Cinematic Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Tag on top of the image */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-[9px] font-bold uppercase tracking-wider bg-white/95 text-brand-text rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Article Info Content */}
                <div className="p-6">
                  {/* Date & Read time */}
                  <div className="flex items-center gap-4 text-[10px] text-brand-muted uppercase tracking-wider mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-brand-text mb-3 leading-snug group-hover:text-brand-green transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="px-6 pb-6 pt-2 text-left">
                <a
                  href={post.slug}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-green group-hover:text-brand-green-dark transition-colors"
                >
                  Lire l'article
                  <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
