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
  // 1. Scroll Progress Bar & Magnetic Hover Effects & Blur Reveals
  useEffect(() => {
    // A. Native high-performance Scroll Progress listener
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    // B. Performance & Low Power Check for micro-interactions
    const isMobile = /mobi|android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    if (!isMobile && !prefersReducedMotion) {
      // Dynamic selector for magnetic items
      const magneticItems = document.querySelectorAll('.magnetic-item, .magnetic-btn');

      magneticItems.forEach((item) => {
        const el = item as HTMLElement;
        
        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(el, {
            x: x * 0.32,
            y: y * 0.32,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        };

        const onMouseLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto'
          });
        };

        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);

        cleanups.push(() => {
          el.removeEventListener('mousemove', onMouseMove);
          el.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    }

    // C. Scroll-driven Entry reveals (Blur Reveal + Fade + Slide Up)
    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => {
      if (section.id === 'accueil') return; // Skip Hero (pinned canvas)

      gsap.fromTo(section,
        { 
          opacity: 0, 
          y: 50,
          filter: 'blur(8px)'
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 88%',       // Triggers when the top of the section enters the bottom 88% of the screen
            toggleActions: 'play none none reverse', // Play on enter, stay on screen, reverse when scrolling up past bottom
            invalidateOnRefresh: true,
          }
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cleanups.forEach(cb => cb());
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-brand-text antialiased selection:bg-brand-sky selection:text-brand-text">
      {/* Scroll Progress Bar at the top of the screen */}
      <div id="scroll-progress" className="scroll-progress-bar" />
      
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
