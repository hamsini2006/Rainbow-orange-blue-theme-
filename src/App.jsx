import { useState, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import MachinerySection from './components/MachinerySection';
import SpecialCuttingSection from './components/SpecialCuttingSection';
import FacilitiesSection from './components/FacilitiesSection';
import QualitySection from './components/QualitySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function scrollToContact(offset = 80) {
  const el = document.getElementById('contact');
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function scrollToMachinery(offset = 80) {
  const el = document.getElementById('machinery');
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export default function App() {
  const [preselectedCategory, setPreselectedCategory] = useState('');
  const [preselectedMachine, setPreselectedMachine] = useState('');
  const formRef = useRef(null);

  // Scroll to contact form and optionally preselect category/machine
  const handleEnquireClick = useCallback((category = '') => {
    setPreselectedCategory(category);
    setPreselectedMachine('');
    scrollToContact();
  }, []);

  const handleQuoteWithMachine = useCallback((machineId = '') => {
    setPreselectedMachine(machineId);
    setPreselectedCategory('');
    scrollToContact();
  }, []);

  const handleNavQuote = useCallback(() => {
    setPreselectedCategory('');
    setPreselectedMachine('');
    scrollToContact();
  }, []);

  return (
    <>
      <Navbar onQuoteClick={handleNavQuote} />

      <main id="main-content">
        <HeroSection
          onQuoteClick={handleNavQuote}
          onExploreClick={scrollToMachinery}
        />
        <AboutSection />
        <ServicesSection onEnquireClick={handleEnquireClick} />
        <MachinerySection onQuoteWithMachine={handleQuoteWithMachine} />
        <SpecialCuttingSection onEnquireClick={handleEnquireClick} />
        <FacilitiesSection />
        <QualitySection />
        <ContactSection
          formRef={formRef}
          preselectedCategory={preselectedCategory}
          preselectedMachine={preselectedMachine}
        />
      </main>

      <Footer />
    </>
  );
}
