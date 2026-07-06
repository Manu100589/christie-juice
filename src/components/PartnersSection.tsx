import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Building2, Send, PhoneCall } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    businessType: 'restaurant',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal left side content
      gsap.fromTo('.partners-info',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partners-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Reveal right side glass form
      gsap.fromTo('.partners-form-card',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.partners-form-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', businessType: 'restaurant', message: '' });
    }, 1500);
  };

  const benefits = [
    'Tarifs de gros et de distribution dégressifs',
    'Matériel promotionnel et supports de vente offerts',
    'Livraisons régulières et approvisionnement garanti',
    'Exclusivités territoriales pour nos partenaires de marque',
  ];

  return (
    <section
      id="distribution"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#FAFBFD] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-sky/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Partnership Details */}
          <div className="partners-info lg:col-span-6 flex flex-col space-y-6 text-left">
            <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green">
              Partenariats B2B
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text leading-tight">
              Vous souhaitez distribuer CHRISTIE NATURALS ?
            </h2>
            <div className="w-16 h-[3px] bg-brand-green rounded-full" />
            
            <p className="text-brand-muted text-base leading-relaxed">
              Nous accompagnons les revendeurs, distributeurs, commerces, hôtels, restaurants et partenaires qui souhaitent proposer une gamme de jus naturels premium, attractive et différenciante.
            </p>

            <div className="space-y-4 pt-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-brand-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-brand-text/90 font-medium">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <a
                href="mailto:partner@christienaturals.com"
                className="px-6 py-3 rounded-full border border-brand-text/20 text-brand-text hover:bg-brand-text hover:text-brand-white transition-all duration-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <PhoneCall size={14} />
                Parler à notre équipe
              </a>
            </div>
          </div>

          {/* Right Column: B2B Contact Form (Glassmorphism) */}
          <div className="partners-form-card lg:col-span-6">
            <div className="glass-panel p-8 md:p-10 rounded-[32px] shadow-xl border border-brand-white/60 relative overflow-hidden">
              
              {/* Header inside card */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                  <Building2 size={20} />
                </div>
                <div className="text-left">
                  <h3 className="font-serif text-xl font-bold text-brand-text">
                    Demande d'offre pro
                  </h3>
                  <p className="text-xs text-brand-muted">
                    Réponse sous 24h ouvrées
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-brand-text">
                    Merci pour votre intérêt !
                  </h4>
                  <p className="text-brand-muted text-sm max-w-sm mx-auto">
                    Votre demande a bien été envoyée. Un responsable commercial prendra contact avec vous rapidement pour discuter des tarifs et de la distribution.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand-green hover:text-brand-green-dark transition-colors duration-300"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="partner-name" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="partner-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  {/* Company & Email inputs side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="partner-company" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                        Établissement / Société
                      </label>
                      <input
                        type="text"
                        id="partner-company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                        placeholder="Hôtel Le Lagon"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="partner-email" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                        Adresse email pro
                      </label>
                      <input
                        type="email"
                        id="partner-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                        placeholder="jean@lagon.com"
                      />
                    </div>
                  </div>

                  {/* Business Type dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="partner-businesstype" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                      Type d'activité
                    </label>
                    <select
                      id="partner-businesstype"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                    >
                      <option value="restaurant">Restaurant / Café</option>
                      <option value="hotel">Hôtel / Resort</option>
                      <option value="distributor">Grossiste / Distributeur</option>
                      <option value="grocery">Épicerie fine / Supermarché</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  {/* Message Area */}
                  <div className="space-y-1.5">
                    <label htmlFor="partner-message" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                      Votre projet / message
                    </label>
                    <textarea
                      id="partner-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300 resize-none"
                      placeholder="Détaillez vos besoins (volumes hebdomadaires, parfums recherchés...)"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-brand-green hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20 hover:shadow-brand-green/35 transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send size={14} />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
