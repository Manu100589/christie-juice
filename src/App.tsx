import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BannerSection from './components/BannerSection';
import BrandStorySection from './components/BrandStorySection';
import BenefitsSection from './components/BenefitsSection';
import ExperienceSection from './components/ExperienceSection';
import LifestyleSection from './components/LifestyleSection';
import PartnersSection from './components/PartnersSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeFlavor, setActiveFlavor] = useState<string>('pineapple');

  useEffect(() => {
    const isMobile = /mobi|android|iphone|ipad|ipod/i.test(navigator.userAgent);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups: (() => void)[] = [];

    // 1. High-Performance Scroll Progress Indicator
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', handleScroll));

    // 2. Custom Cursor with Inertia & Hover States (Desktop Only)
    if (!isMobile && !prefersReducedMotion) {
      const dot = document.getElementById('custom-cursor-dot');
      const ring = document.getElementById('custom-cursor-ring');

      // Mouse movements
      const onMouseMove = (e: MouseEvent) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.08, overwrite: 'auto' });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.28, overwrite: 'auto' });
      };

      window.addEventListener('mousemove', onMouseMove);
      cleanups.push(() => window.removeEventListener('mousemove', onMouseMove));

      // Cursor expansion/color morphing on hover
      const hoverEnter = () => {
        gsap.to(ring, { 
          scale: 1.6, 
          borderColor: '#2F9D45', 
          backgroundColor: 'rgba(47, 157, 69, 0.06)',
          duration: 0.3 
        });
      };
      
      const hoverLeave = () => {
        gsap.to(ring, { 
          scale: 1, 
          borderColor: 'rgba(72, 199, 243, 0.45)', 
          backgroundColor: 'transparent',
          duration: 0.3 
        });
      };

      // Query luxury hover targets
      const hoverables = document.querySelectorAll('a, button, .magnetic-item, .flavor-card, .group');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', hoverEnter);
        el.addEventListener('mouseleave', hoverLeave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', hoverEnter);
          el.removeEventListener('mouseleave', hoverLeave);
        });
      });
    }

    // 3. Magnetic Hover Attraction Script
    if (!isMobile && !prefersReducedMotion) {
      const magneticItems = document.querySelectorAll('.magnetic-item, .magnetic-btn');

      magneticItems.forEach((item) => {
        const el = item as HTMLElement;
        
        const onMagneticMove = (e: MouseEvent) => {
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

        const onMagneticLeave = () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.1, 0.4)',
            overwrite: 'auto'
          });
        };

        el.addEventListener('mousemove', onMagneticMove);
        el.addEventListener('mouseleave', onMagneticLeave);

        cleanups.push(() => {
          el.removeEventListener('mousemove', onMagneticMove);
          el.removeEventListener('mouseleave', onMagneticLeave);
        });
      });
    }

    // 4. Scroll-driven Entry reveals (Blur Reveal + Fade + Slide Up)
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
            start: 'top 88%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          }
        }
      );
    });

    return () => {
      cleanups.forEach(cb => cb());
    };
  }, []);

  return (
    <div className="bg-white min-h-screen text-brand-text antialiased selection:bg-brand-sky selection:text-brand-text">
      {/* Scroll Progress Bar at the top of the screen */}
      <div id="scroll-progress" className="scroll-progress-bar" />
      
      {/* Custom Cursor elements (hidden on mobile via CSS hidden lg:block) */}
      <div id="custom-cursor-dot" className="hidden lg:block" />
      <div id="custom-cursor-ring" className="hidden lg:block" />

      <GlobalBackground activeFlavor={activeFlavor} />
      <Header />
      <main>
        <HeroSection activeFlavor={activeFlavor} setActiveFlavor={setActiveFlavor} />
        <BannerSection />
        <BrandStorySection />
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
