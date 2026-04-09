import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: "Bachelor of Engineering",
    major: "Artificial Intelligence & Data Science",
    date: "August 2023 — June 2027",
    school: "Pune Vidhyarthi Griha's College of Engineering, Nashik, Maharashtra",
    score: "CGPA: 8.50"
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    major: "Science",
    date: "November 2020 — March 2022",
    school: "G.D. Sawant Arts, Commerce, Science & B.C.S College, Nashik, Maharashtra",
    score: "Score: 65.00%"
  },
  {
    title: "Secondary School Certificate (SSC)",
    major: "High School",
    date: "June 2010 — March 2020",
    school: "K.K. Wagh English School, Nashik, Maharashtra",
    score: "Score: 80.40%"
  }
];

const EducationSection = () => {
  const containerRef = useRef(null);
  const glassRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.edu-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2500", // Pinned scrolling duration
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. The Glass Rectangle smoothly scales and fades in from the background
    tl.fromTo(glassRef.current, 
      { autoAlpha: 0, scale: 0.9, y: 50 }, 
      { autoAlpha: 1, scale: 1, y: 0, duration: 2, ease: "power3.out" }
    );

    // 2. The Section Title fades in
    tl.fromTo(titleRef.current,
      { autoAlpha: 0, y: -20 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // 3. The Education items slide in sequentially
    tl.fromTo(items,
      { autoAlpha: 0, x: -30 },
      { autoAlpha: 1, x: 0, stagger: 0.8, duration: 1.5, ease: "power2.out" },
      "-=0.5"
    );

    // 4. Hold for reading
    tl.to({}, { duration: 1.5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#050505',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden', 
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* 1. BACKGROUND IMAGE WITH DARK OVERLAY */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <img src="/assets/09.png" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Sleek dark overlay to ensure the glassmorphism pops beautifully */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.65)' }}></div>
      </div>

      {/* 2. THE PURE GLASSMORPHISM RECTANGLE */}
      <div ref={glassRef} style={{
        position: 'relative',
        zIndex: 10,
        width: '85%',
        maxWidth: '1000px',
        // Creating the curved edge rectangle with lots of breathing room
        padding: '60px 80px',
        borderRadius: '32px',
        // Pure Glassmorphism Magic with Red Border to match Skills
        background: 'rgba(20, 20, 20, 0.4)', 
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(237, 28, 36, 0.5)', // <-- Added red border
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(237, 28, 36, 0.1)', // <-- Subtle inner red glow
        visibility: 'hidden'
      }}>
        
        {/* Title */}
        <h2 ref={titleRef} style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          color: '#ffffff',
          letterSpacing: '8px', 
          textAlign: 'center',
          marginBottom: '50px',
          textShadow: '0px 4px 15px rgba(0,0,0,0.5)',
          visibility: 'hidden'
        }}>
          EDUCATION
        </h2>

        {/* Education Content List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {educationData.map((edu, index) => (
            <div key={index} className="edu-item" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              borderBottom: index !== educationData.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              paddingBottom: index !== educationData.length - 1 ? '30px' : '0',
              visibility: 'hidden'
            }}>
              
              {/* Header Row: Degree and Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <h3 style={{ 
                  fontFamily: '"Baskerville Old Face", serif', 
                  fontSize: '1.8rem', 
                  color: '#ffffff', 
                  margin: 0,
                  lineHeight: '1.2'
                }}>
                  {edu.title}
                </h3>
                <span style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  padding: '6px 16px', 
                  borderRadius: '20px', 
                  color: '#c0c0c0', 
                  fontSize: '0.85rem', 
                  letterSpacing: '1.5px',
                  whiteSpace: 'nowrap'
                }}>
                  {edu.date}
                </span>
              </div>

              {/* Major / Focus */}
              <h4 style={{ 
                color: '#e0e0e0', 
                fontSize: '1.15rem', 
                fontWeight: '400',
                letterSpacing: '1px',
                margin: 0
              }}>
                {edu.major}
              </h4>

              {/* School and Score */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginTop: '5px' }}>
                <p style={{ color: '#909090', fontSize: '1rem', margin: 0, fontStyle: 'italic' }}>
                  {edu.school}
                </p>
                <div style={{ 
                  color: '#ffffff', 
                  fontSize: '1rem', 
                  fontWeight: '600',
                  letterSpacing: '1px'
                }}>
                  {edu.score}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default EducationSection;