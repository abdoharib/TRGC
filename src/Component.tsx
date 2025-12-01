/**
 * AlThabetLanding - Main Component
 * Refactored from monolithic 1008-line file to modular component architecture
 */

import React from 'react';
import { Navbar, Footer } from './components/layout';
import {
  HeroSection,
  AboutSection,
  GRCSection,
  GoalsSection,
  ServicesSection,
  PortfolioSection,
} from './components/sections';

/**
 * Main landing page component
 * Orchestrates all sections in proper order
 */
export function AlThabetLanding() {
  return (
    <div className="font-sans bg-white min-h-screen selection:bg-secondary selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <GRCSection />
        <GoalsSection />
        <ServicesSection />
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  );
}

export default AlThabetLanding;

