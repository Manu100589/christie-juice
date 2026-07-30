import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BannerSection from './components/BannerSection';
import BrandStorySection from './components/BrandStorySection';
import FlavorsSection from './components/FlavorsSection';
import BenefitsSection from './components/BenefitsSection';
import ExperienceSection from './components/ExperienceSection';
import LifestyleSection from './components/LifestyleSection';
import PartnersSection from './components/PartnersSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Select all sections inside main (except the Hero, which has a complex pinned animation)
    const sections = document.querySelectorAll('main > section');

    sections.forEach((section) => {
      if (section.id === 'accueil') return;

      // Create a smooth entry/exit animation for scroll and descroll
      gsap.fromTo(section,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',       // Animates when the top of the section enters the bottom 88% of viewport
            end: 'bottom 12%',     // Animates out when the bottom of the section leaves the top 12% of viewport
            toggleActions: 'play reverse play reverse', // Play on enter, reverse on leave, play on enter back, reverse on leave back
            invalidateOnRefresh: true,
          }
        }
      );
    });
  }, []);

  return (
    <div className="bg-white min-h-screen text-brand-text antialiased selection:bg-brand-sky selection:text-brand-text">
      <Header />
      <main>
        <HeroSection />
        <BannerSection />
        <BrandStorySection />
        <FlavorsSection />
        <BenefitsSection />
        <ExperienceSection />
        <LifestyleSection />
        <PartnersSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
