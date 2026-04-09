import React, { useState, useEffect } from 'react';
import HeroScene from './components/Hero/HeroScene';
import CustomCursor from './components/UI/CustomCursor';
import Preloader from './components/UI/Preloader';
import AudioPlayer from './components/UI/AudioPlayer';
import AboutSection from './components/About/AboutSection'; 
import ExperienceSection from './components/Experience/ExperienceSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import SkillsSection from './components/Skills/SkillsSection'; 
import EducationSection from './components/Education/EducationSection';
import AchievementsSection from './components/Achievements/AchievementsSection';
import ContactSection from './components/Contact/ContactSection';

function App() {
  const [loading, setLoading] = useState(true);

  // --- 1. SCROLL LOCK CONTROLLER ---
  // This watches the "loading" state. Locks scroll during preloader, unlocks when done.
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'auto'; // CRITICAL FIX: Unlocks the scroll!
      document.body.style.overflowX = 'hidden'; // Prevents side-scrolling glitches
    }
  }, [loading]);

  // --- 2. THE ANTI-COPY SHIELD ---
  // This runs only once when the website first opens.
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) || 
        (e.ctrlKey && ['U', 'u', 'S', 's'].includes(e.key)) || 
        (e.metaKey && e.altKey && ['I', 'i', 'J', 'j', 'U', 'u'].includes(e.key)) 
      ) {
        e.preventDefault();
      }
    };

    // THE DEVELOPER BACKDOOR
    const isLocalhost = import.meta.env.DEV;

    if (!isLocalhost) {
      // We are live on the internet! Turn the shields ON.
      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('dragstart', handleDragStart);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      console.log("🔓 Developer Mode Active: Anti-Copy Shield is OFF.");
    }

    // Cleanup listeners when the component unmounts
    return () => {
      if (!isLocalhost) {
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <CustomCursor />
      <AudioPlayer />
      
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <HeroScene />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <AchievementsSection />
      <ContactSection />
      
    </main>
  );
}

export default App;