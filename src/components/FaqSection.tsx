import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Open the first question by default

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo('.faq-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Accordion wrapper fade in
      gsap.fromTo('.faq-wrapper',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-wrapper',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      q: 'Quels sont les parfums actuellement disponibles ?',
      a: 'Nous proposons actuellement trois saveurs signatures tropicales d’exception : le Jus de Baobab (doux, onctueux et velouté), le Jus d’Ananas (fruité, solaire et riche en vitamine C) et le Jus de Bissap (infusion d’hibiscus vibrante au goût floral raffiné et rafraîchissant).'
    },
    {
      q: 'Les jus CHRISTIE NATURALS contiennent-ils des conservateurs ?',
      a: 'Absolument pas. Notre engagement premier est la pureté et la naturalité. Tous nos jus sont formulés à 100% à partir de fruits et d’ingrédients rigoureusement sélectionnés, sans conservateurs ajoutés, sans additifs chimiques ni colorants artificiels.'
    },
    {
      q: 'Peut-on devenir distributeur de la marque ?',
      a: 'Oui, tout à fait. Nous développons activement notre réseau et travaillons en partenariat étroit avec des épiceries fines, des supermarchés premium, des cafés, des bars de plage, ainsi que des établissements hôteliers et de restauration (Horeca). Veuillez remplir le formulaire de la section "Distribution" ou nous écrire par email pour recevoir notre grille tarifaire de gros.'
    },
    {
      q: 'Les produits sont-ils adaptés à la vente en boutique, restaurant ou hôtel ?',
      a: 'Tout à fait. Nos jus sont conditionnés dans des bouteilles en verre recyclables au design soigné et minimaliste. Ce packaging de haute qualité valorise l’image de marque de vos établissements et s’intègre parfaitement sur les tables des restaurants gastronomiques, les comptoirs de bars premium et les minibars d’hôtels de luxe.'
    },
    {
      q: 'Comment contacter CHRISTIE NATURALS pour un partenariat ?',
      a: 'Vous pouvez nous envoyer votre demande via notre formulaire de contact général ou professionnel en bas de page. Vous pouvez également écrire directement à partner@christienaturals.com ou nous joindre sur WhatsApp au +33 6 00 00 00 00 pour un échange direct avec notre équipe commerciale.'
    }
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 bg-transparent relative overflow-hidden"
    >
      <div className="absolute top-[20%] right-[-15%] w-[450px] h-[450px] rounded-full bg-brand-sky/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-green/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="faq-header text-center mb-16 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Des réponses à vos questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Questions Fréquentes
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full" />
        </div>

        {/* Accordions */}
        <div className="faq-wrapper space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-brand-sky/20 bg-brand-white shadow-sm overflow-hidden transition-all duration-300 hover:border-brand-sky/40"
              >
                {/* Accordion Trigger button */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors duration-300 hover:bg-slate-50/50"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle size={18} className={`shrink-0 ${isOpen ? 'text-brand-green' : 'text-brand-muted'}`} />
                    <span className="font-serif text-base sm:text-lg font-bold text-brand-text">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-brand-muted shrink-0 transition-transform duration-500 ${
                      isOpen ? 'transform rotate-180 text-brand-green' : ''
                    }`}
                  />
                </button>

                {/* Animated content wrapper using framer-motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-left border-t border-slate-50">
                        <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
