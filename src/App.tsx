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

function App() {
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
