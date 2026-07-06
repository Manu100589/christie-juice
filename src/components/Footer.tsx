import type { MouseEvent } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-text text-brand-white pt-16 pb-12 relative overflow-hidden border-t border-brand-white/5">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-brand-green-dark/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[250px] h-[250px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-brand-white/10 text-left">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            <a href="#accueil" className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-wider text-brand-white">
                CHRISTIE
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-green font-semibold -mt-1">
                NATURALS
              </span>
            </a>
            <p className="text-sm text-brand-muted max-w-sm font-normal">
              Le goût de la nature, dans toute sa fraîcheur. Des jus tropicaux d'exception formulés à 100% de fruits naturels, élaborés pour votre plaisir et vitalité.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-brand-white/15 bg-brand-white/5 flex items-center justify-center text-brand-white/80 hover:text-brand-white hover:border-brand-white transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-brand-white/15 bg-brand-white/5 flex items-center justify-center text-brand-white/80 hover:text-brand-white hover:border-brand-white transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-brand-white/15 bg-brand-white/5 flex items-center justify-center text-brand-white/80 hover:text-brand-white hover:border-brand-white transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 flex flex-col space-y-4 md:pl-8">
            <h4 className="text-xs uppercase tracking-widest text-brand-green font-semibold">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-2.5">
              <a href="#accueil" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Accueil
              </a>
              <a href="#la-marque" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                La Marque
              </a>
              <a href="#nos-saveurs" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Nos Saveurs
              </a>
              <a href="#pourquoi-nous-choisir" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Pourquoi Nous Choisir
              </a>
            </nav>
          </div>

          {/* Partners Col */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-brand-green font-semibold">
              Distribution & Pro
            </h4>
            <nav className="flex flex-col space-y-2.5">
              <a href="#distribution" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Devenir Partenaire
              </a>
              <a href="#faq" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Foire Aux Questions (FAQ)
              </a>
              <a href="#contact" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Nous Contacter
              </a>
              <a href="mailto:partner@christienaturals.com" className="text-sm text-brand-muted hover:text-brand-green transition-colors duration-300">
                Grille Tarifaire Pro
              </a>
            </nav>
          </div>

        </div>

        {/* Bottom footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-brand-muted">
          <div>
            &copy; {currentYear} <span className="font-semibold text-brand-white">CHRISTIE NATURALS</span>. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="#accueil" onClick={handleBackToTop} className="flex items-center gap-1.5 hover:text-brand-green transition-colors duration-300 font-semibold uppercase tracking-wider text-[10px]">
              Retour en haut
              <ArrowUp size={12} className="animate-bounce" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
