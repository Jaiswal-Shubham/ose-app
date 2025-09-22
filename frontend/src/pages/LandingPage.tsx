import React from 'react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../features/landing/HeroSection';
import CaseStudySection from '../features/landing/CaseStudySection';
import ProtectionSection from '../features/landing/ProtectionSection';
import ContactSection from '../features/landing/ContactSection';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <main>
        <HeroSection />
        <CaseStudySection />
        <ProtectionSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;