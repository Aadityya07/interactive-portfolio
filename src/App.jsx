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
import ContactSection from './components/Contact/ContactSection'; // NEW IMPORT

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Prevent standard scrolling during load (Keep this for your Preloader)
    document.body.style.overflow = 'hidden'; 

    // --- THE ANTI-COPY SHIELD ---
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

    // 2. THE DEVELOPER BACKDOOR
    // import.meta.env.DEV is true when you run `npm run dev`. 
    // It is false when you deploy to Vercel/Netlify/GitHub Pages.
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
      
      {/* 8. The Grand Finale */}
      <ContactSection />
      
    </main>
  );
}

export default App;