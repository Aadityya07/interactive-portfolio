import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { category: "AI / ML", items: ["Machine Learning", "Deep Learning", "Generative AI"] },
  { category: "Programming", items: ["Python", "SQL", "C++ (Basics)"] },
  { category: "Web Development", items: ["React", "Flask", "REST APIs", "PostgreSQL", "JavaScript", "HTML", "CSS"] },
  { category: "Tools & Platforms", items: ["Git & GitHub", "Google Colab", "Jupyter Notebook", "VS Code", "Postman"] }
];

const SkillsSection = () => {
  const containerRef = useRef(null);
  const giantTextRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.skill-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4500", // Extended duration to accommodate the read time and exit animation
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // PHASE 1: Fly-Through Zoom IN
    tl.to(giantTextRef.current, {
      scale: 25, opacity: 0, duration: 2.5, ease: "power2.in", transformOrigin: "center center"
    });

    // PHASE 2: Reveal Glassmorphism Grid
    tl.fromTo(gridRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "-=0.5");
    tl.fromTo(cards,
      { autoAlpha: 0, y: 50, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, stagger: 0.2, duration: 1.5, ease: "power3.out" },
      "-=0.5"
    );

    // PHASE 3: Hold for reading, then Fly-Through Zoom OUT!
    tl.to({}, { duration: 2 }); // Pause so the user can read your skills
    tl.to(gridRef.current, {
      scale: 3, // Zooms towards the camera
      autoAlpha: 0, // Fades into darkness
      duration: 2,
      ease: "power2.in"
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', width: '100%', height: '100vh', backgroundColor: '#050505',
      overflow: 'hidden', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <img src="/assets/10.bg4.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.75)' }}></div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to top, rgba(150,0,0,0.2), transparent)' }}></div>
      </div>

      <h2 ref={giantTextRef} style={{
        position: 'absolute', zIndex: 10, fontFamily: '"Baskerville Old Face", serif',
        fontSize: 'clamp(5rem, 12vw, 15rem)', color: '#ffffff', letterSpacing: '10px', margin: 0,
        pointerEvents: 'none', textShadow: '0 0 30px rgba(237, 28, 36, 0.5)'
      }}>
        SKILLS
      </h2>

      <div ref={gridRef} style={{
        position: 'relative', zIndex: 5, width: '90%', maxWidth: '1100px', visibility: 'hidden', 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px'
      }}>
        {skillsData.map((category, index) => (
          <div key={index} className="skill-card" style={{
            background: 'rgba(20, 0, 0, 0.4)', // Dark glassmorphism
            backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(237, 28, 36, 0.5)', // Theme-aligned red border
            borderRadius: '12px', padding: '40px',
            boxShadow: '0 15px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(237, 28, 36, 0.1)', // Subtle red inner glow
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.8)'; // Brightens border on hover
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(237, 28, 36, 0.2)'; // Enhances glow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.5)'; // Reverts border
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(237, 28, 36, 0.1)'; // Reverts glow
          }}>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontFamily: '"Baskerville Old Face", serif', fontSize: '2.2rem', color: '#ffffff', margin: 0, letterSpacing: '2px' }}>
                {category.category}
              </h3>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {category.items.map((skill, i) => (
                <span key={i} style={{
                  background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#dfdfdf', padding: '8px 18px', borderRadius: '20px', fontSize: '0.95rem',
                  letterSpacing: '1px', transition: 'all 0.3s ease', cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)';
                  e.currentTarget.style.borderColor = '#ed1c24'; e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#dfdfdf';
                }}>
                  {skill}
                </span>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;