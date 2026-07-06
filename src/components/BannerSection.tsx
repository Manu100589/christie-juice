import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bannerImg from '../assets/banner.png';

gsap.registerPlugin(ScrollTrigger);

export default function BannerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scrolling effect on the image
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[45vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden border-y border-brand-sky/20"
    >
      {/* Parallax Image container */}
      <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          ref={imageRef}
          src={bannerImg}
          alt="Christie Naturals tropical lineup banner"
          className="w-full h-full object-cover"
        />
        {/* Ambient overlay for luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-text/10 via-transparent to-brand-text/5 pointer-events-none" />
      </div>
    </section>
  );
}
