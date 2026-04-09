import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=2500", // Pinned duration
        scrub: 1, 
        pin: true, 
        anticipatePin: 1,
      }
    });

    // 1. Fade and slide down the section title
    tl.fromTo(titleRef.current, 
      { autoAlpha: 0, y: -30 }, 
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // 2. The Glassmorphism card floats up
    tl.fromTo(cardRef.current,
      { autoAlpha: 0, y: 100, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      // Deep atmospheric red gradient matching the Stranger Things sky
      background: 'radial-gradient(circle at 50% 120%, #5a0000 0%, #050505 70%)',
      color: '#ffffff',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* SECTION TITLE */}
      <h2 ref={titleRef} style={{ 
        fontFamily: '"Baskerville Old Face", serif', 
        fontSize: 'clamp(3.5rem, 7vw, 7rem)', 
        color: '#ffffff',
        letterSpacing: '6px',
        marginBottom: '50px',
        textShadow: '0px 5px 15px rgba(0,0,0,0.8)',
        zIndex: 10,
        visibility: 'hidden',
        position: 'relative'
      }}>
        EXPERIENCE
        <span style={{
          position: 'absolute',
          bottom: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #ed1c24, transparent)'
        }}></span>
      </h2>

      {/* GLASSMORPHISM INTERNSHIP CARD */}
      <div ref={cardRef} style={{
        position: 'relative',
        width: '90%',
        maxWidth: '850px',
        padding: '45px 50px',
        borderRadius: '20px',
        // Premium Glassmorphism
        background: 'rgba(20, 0, 0, 0.35)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(237, 28, 36, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(237, 28, 36, 0.05), inset 0 1px 0 rgba(255,255,255,0.03)',
        zIndex: 10,
        visibility: 'hidden',
      }}>
        
        {/* Glass reflection effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          opacity: 0.5
        }}></div>

        {/* Subtle corner accents */}
        <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '35px', height: '35px', borderTop: '2px solid rgba(237,28,36,0.35)', borderLeft: '2px solid rgba(237,28,36,0.35)', borderRadius: '20px 0 0 0' }}></div>
        <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '35px', height: '35px', borderBottom: '2px solid rgba(237,28,36,0.35)', borderRight: '2px solid rgba(237,28,36,0.35)', borderRadius: '0 0 20px 0' }}></div>

        {/* Glow behind the text inside the card */}
        <div style={{ 
          position: 'absolute', 
          top: '-10%', 
          right: '-10%', 
          width: '250px', 
          height: '250px', 
          background: 'radial-gradient(circle, rgba(237,28,36,0.12) 0%, transparent 70%)', 
          filter: 'blur(30px)', 
          zIndex: -1 
        }}></div>

        {/* Company Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          flexWrap: 'wrap', 
          gap: '20px', 
          borderBottom: '1px solid rgba(255,255,255,0.08)', 
          paddingBottom: '25px', 
          marginBottom: '25px' 
        }}>
          <div>
            <h3 style={{ 
              fontSize: '2rem', 
              color: '#ffffff', 
              marginBottom: '8px', 
              fontWeight: '600',
              letterSpacing: '-0.5px'
            }}>Nexonica Systems Pvt. Ltd.</h3>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#ed1c24', 
              fontWeight: '500', 
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>Full Stack Developer Intern</p>
          </div>
          <div style={{ 
            background: 'rgba(237,28,36,0.1)', 
            padding: '10px 20px', 
            borderRadius: '30px', 
            border: '1px solid rgba(237,28,36,0.25)', 
            fontSize: '0.9rem', 
            letterSpacing: '1.5px',
            color: '#e0e0e0',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)'
          }}>
            Jan 2026 – Feb 2026
          </div>
        </div>

        {/* Section Label */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '3px',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase'
          }}>Responsibilities & Work</span>
          <div style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(90deg, rgba(237,28,36,0.3), transparent)'
          }}></div>
        </div>
        
        {/* Responsibilities List - Clean bullet points */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px 30px'
        }}>
          {[
            "Built and optimized backend systems using Flask",
            "Designed REST APIs for scalable architecture",
            "Worked with PostgreSQL database integration",
            "Developed AI-powered applications using Python",
            "Implemented text-processing pipelines",
            "Worked on real-world full-stack deployment",
            "Improved database efficiency and backend structure",
            "Built production-ready AI + Web Dev projects"
          ].map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '12px',
              color: '#c8c8c8',
              fontSize: '0.95rem',
              lineHeight: '1.5'
            }}>
              <span style={{ 
                color: '#ed1c24', 
                fontSize: '1.2rem',
                opacity: 0.8,
                marginTop: '2px'
              }}>▹</span>
              <span style={{ flex: 1 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ExperienceSection;