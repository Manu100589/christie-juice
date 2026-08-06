import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in left column contact options
      gsap.fromTo('.contact-channels',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-channels',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Fade in right column form card
      gsap.fromTo('.contact-form-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form-box',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-transparent relative overflow-hidden"
    >
      {/* Decorative halos */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-sky/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-green/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] font-bold text-brand-green mb-3">
            Prendre contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-text mb-6">
            Envie de découvrir CHRISTIE NATURALS ?
          </h2>
          <div className="w-16 h-[3px] bg-brand-green rounded-full mb-6" />
          <p className="text-brand-muted text-base sm:text-lg">
            Contactez-nous pour en savoir plus sur nos produits, nos opportunités de distribution ou toute collaboration autour de la marque.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info Channels */}
          <div className="contact-channels lg:col-span-5 flex flex-col space-y-6 text-left">
            <h3 className="font-serif text-2xl font-bold text-brand-text">
              Nos coordonnées
            </h3>
            <p className="text-brand-muted text-sm leading-relaxed mb-6 font-normal">
              Vous avez des questions sur nos saveurs tropicales ou vous souhaitez planifier un rendez-vous commercial ? Choisissez le canal de votre choix.
            </p>

            <div className="space-y-4">
              
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/33600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-brand-green/20 bg-brand-green/5 hover:bg-brand-green hover:text-white transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green group-hover:bg-brand-white/20 group-hover:text-brand-white flex items-center justify-center transition-all duration-300">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text group-hover:text-white">
                    WhatsApp Direct
                  </h4>
                  <p className="text-sm font-medium text-brand-green group-hover:text-brand-white/80">
                    +33 6 00 00 00 00
                  </p>
                </div>
              </a>

              {/* Email address */}
              <a
                href="mailto:contact@christienaturals.com"
                className="flex items-center gap-4 p-5 rounded-2xl border border-brand-blue/20 bg-brand-blue/5 hover:bg-brand-blue hover:text-brand-text transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue group-hover:bg-brand-white/20 group-hover:text-brand-text flex items-center justify-center transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text">
                    Email de contact
                  </h4>
                  <p className="text-sm font-medium text-brand-blue group-hover:text-brand-text/80">
                    contact@christienaturals.com
                  </p>
                </div>
              </a>

              {/* Phone call */}
              <a
                href="tel:+3310000000"
                className="flex items-center gap-4 p-5 rounded-2xl border border-brand-sky/30 bg-slate-50 hover:bg-brand-sky/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-sky/20 text-brand-text flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text">
                    Téléphone Direct
                  </h4>
                  <p className="text-sm font-medium text-brand-muted">
                    +33 1 00 00 00 00
                  </p>
                </div>
              </a>

            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-brand-sky/10 flex items-center gap-3">
              <Award size={18} className="text-brand-green" />
              <span className="text-xs font-medium text-brand-muted">
                Service client et support commercial ouverts du lundi au vendredi de 9h à 18h.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Consumer Form Card */}
          <div className="contact-form-box lg:col-span-7">
            <div className="p-8 md:p-10 rounded-[32px] bg-brand-white border border-brand-sky/25 shadow-xl relative overflow-hidden">
              
              {isSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-brand-text">
                    Message transmis avec succès !
                  </h4>
                  <p className="text-brand-muted text-sm max-w-sm mx-auto">
                    Nous vous remercions de votre message. Notre service client vous répondra par email dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="magnetic-btn premium-btn premium-btn-green mt-6 px-5 py-2.5 rounded-full border border-brand-green/30 text-xs font-semibold uppercase tracking-wider text-brand-green hover:text-brand-green-dark hover:bg-brand-green/5"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  
                  {/* Name and Email side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                        placeholder="Sophie Martin"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                        placeholder="sophie@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                      Sujet du message
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300"
                      placeholder="Demande d'information produit, distribution..."
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-wider text-brand-text">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-brand-sky/35 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent text-sm transition-all duration-300 resize-none"
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magnetic-btn premium-btn premium-btn-dark w-full py-4 rounded-xl bg-brand-text hover:bg-brand-green-dark text-brand-white font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
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
