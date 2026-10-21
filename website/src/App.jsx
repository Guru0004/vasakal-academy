import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { NotificationProvider } from "./context/NotificationContext";
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
import { AIBot } from "./components/AIBot";
import { PopupNotifications } from "./components/PopupNotifications";
import { NotificationCenter } from "./components/NotificationCenter";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
        
          <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-400">
            <Navbar />
            
            <main className="flex-1">
              <HeroSection />
              <MissionSection />
              <FacultySection />
              <ProgramsSection />
              <Super30Section />
              <AspirationsSection />
              <ChallengesVsSolutionSection />
              <FoundationSection />
              <ApproachCapabilitiesSection />
              <HostelSection />
              <GallerySection />
              <ContactSection />
            </main>

            <Footer />
            <ScrollToTop />
            <AIBot />
            <PopupNotifications />
            <NotificationCenter />
            <MobileBottomCTA />
          </div>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
