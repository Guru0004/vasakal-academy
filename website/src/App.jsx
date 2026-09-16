import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { MissionSection } from "./components/sections/MissionSection";
import { Super30Section } from "./components/sections/Super30Section";
import { AspirationsSection } from "./components/sections/AspirationsSection";
import { ChallengesVsSolutionSection } from "./components/sections/ChallengesVsSolutionSection";
import { FoundationSection } from "./components/sections/FoundationSection";
import { ProgramsSection } from "./components/sections/ProgramsSection";
import { HostelSection } from "./components/sections/HostelSection";
import { ApproachCapabilitiesSection } from "./components/sections/ApproachCapabilitiesSection";
import { FacultySection } from "./components/sections/FacultySection";
import { GallerySection } from "./components/sections/GallerySection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { MobileBottomCTA } from "./components/MobileBottomCTA";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      
      <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400">
        <Navbar />
        
        <main className="flex-1">
          <HeroSection />
          <MissionSection />
          <Super30Section />
          <AspirationsSection />
          <ChallengesVsSolutionSection />
          <FoundationSection />
          <ProgramsSection />
          <HostelSection />
          <ApproachCapabilitiesSection />
          <FacultySection />
          <GallerySection />
          <ContactSection />
        </main>

        <Footer />
        <ScrollToTop />
        <MobileBottomCTA />
      </div>
    </ThemeProvider>
  );
}

export default App;
