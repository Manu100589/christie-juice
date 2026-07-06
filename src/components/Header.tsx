import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'La Marque', href: '#la-marque' },
    { name: 'Nos Saveurs', href: '#nos-saveurs' },
    { name: 'Pourquoi Nous Choisir', href: '#pourquoi-nous-choisir' },
    { name: 'Distribution', href: '#distribution' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 glass-panel shadow-md shadow-brand-blue/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <a href="#accueil" className="flex items-center gap-3 group">
          {/* We will render a beautifully styled text logo with the brand font to guarantee absolute clarity */}
          <div className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-wider text-brand-text group-hover:text-brand-blue transition-colors duration-300">
              CHRISTIE
            </span>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-brand-green font-semibold -mt-1">
              NATURALS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-brand-text/80 hover:text-brand-green transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:height-[2px] after:bg-brand-green after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#distribution"
            className="px-5 py-2.5 rounded-full border border-brand-green/30 text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
          >
            Devenir distributeur
            <ArrowRight size={14} />
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-brand-blue text-brand-text hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/35 transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
          >
            Nous contacter
            <MessageSquare size={14} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-brand-text hover:text-brand-blue transition-colors duration-300 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] bg-brand-white/95 backdrop-blur-md z-40 flex flex-col px-8 py-10 transition-all duration-500 ease-in-out border-t border-brand-sky/20">
          <nav className="flex flex-col gap-6 mb-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl font-serif font-semibold text-brand-text hover:text-brand-green transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <a
              href="#distribution"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-brand-green text-brand-white font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
            >
              Devenir Distributeur
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 text-center rounded-xl bg-brand-blue text-brand-text font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/20"
            >
              Nous Contacter
              <MessageSquare size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
