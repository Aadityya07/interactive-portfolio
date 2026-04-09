import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const achievementsData = [
  {
    title: "Secretary – SAIGE",
    subtitle: "(Society of Artificial Intelligence & Generative AI)",
    items: [
      "Organized AI-focused events & workshops",
      "Led technical initiatives",
      "Coordinated AI learning programs",
      "Guided peers in ML & Generative AI"
    ]
  },
  {
    title: "Hackathon Participation",
    subtitle: "Competitive Programming & Innovation",
    items: [
      "Participated in 6+ hackathons",
      "Won 2+ hackathons (including internal Smart India Hackathon)",
      "Finalist of Rift'26 organized by Physics Wallah (PW) IOI",
      "Led teams as technical leader"
    ]
  }
];

const AchievementsSection = () => {
  const containerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const bgImageRef = useRef(null);
  const centerTextRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.achievement-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // Length of the pinned scroll
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // PHASE 1: The Sideways Split (The "Blast Doors" opening)
    tl.to(leftDoorRef.current, { xPercent: -100, duration: 2, ease: "power2.inOut" }, 0);
    tl.to(rightDoorRef.current, { xPercent: 100, duration: 2, ease: "power2.inOut" }, 0);
    
    // Fade out the center text as doors open
    tl.to(centerTextRef.current, { autoAlpha: 0, duration: 1.5, ease: "power2.out" }, 0);

    // PHASE 2: Dynamic Blur of the Background Image - REDUCED BLUR EVEN MORE
    tl.to(bgImageRef.current, { 
      filter: "blur(3px) brightness(0.8)", // Reduced blur from 6px to 3px
      duration: 2, 
      ease: "power2.out" 
    }, 1.5); // Starts right as the doors are finishing their opening

    // PHASE 3: The "Card Shuffle" Entrance
    // Cards start off-screen bottom, scaled down, and rotated like held playing cards
    tl.fromTo(cards,
      { y: 800, rotation: (i) => (i % 2 === 0 ? -15 : 15), scale: 0.8, autoAlpha: 0 },
      { 
        y: 0, 
        rotation: 0, 
        scale: 1, 
        autoAlpha: 1, 
        stagger: 0.4, // Delays the second card slightly for that "dealing" effect
        duration: 1.5, 
        ease: "back.out(1.2)" // Gives it a satisfying snap into place
      },
      2 // Starts as the blur is applying
    );

    // Hold for reading
    tl.to({}, { duration: 1.5 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#000000',
      overflow: 'hidden', 
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* 1. BACKGROUND IMAGE (Revealed when doors open) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <img 
          ref={bgImageRef} 
          src="/assets/last.png" 
          alt="Achievements Background" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(0px) brightness(1)' }} 
        />
      </div>

      {/* 2. THE SPLIT DOORS (Covering the screen initially) */}
      
      {/* LEFT DOOR */}
      <div ref={leftDoorRef} style={{
        position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
        backgroundColor: '#050505', zIndex: 10, 
        borderRight: '1px solid rgba(255,255,255,0.05)', 
        overflow: 'hidden'
      }}>
      </div>

      {/* RIGHT DOOR */}
      <div ref={rightDoorRef} style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        backgroundColor: '#050505', zIndex: 10, 
        borderLeft: '1px solid rgba(255,255,255,0.05)', 
        overflow: 'hidden'
      }}>
      </div>

      {/* CENTER TEXT - Stacked vertically with LEADERSHIP above & and ACHIEVEMENTS below */}
      <div ref={centerTextRef} style={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 11, 
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(4rem, 9vw, 9rem)', 
          color: '#ffffff',
          margin: 0,
          lineHeight: '1',
          whiteSpace: 'nowrap'
        }}>
          LEADERSHIP
        </h2>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(4rem, 9vw, 9rem)', 
          color: '#ed1c24',
          margin: '-10px 0',
          lineHeight: '1',
          textShadow: '0 0 20px rgba(237, 28, 36, 0.5)'
        }}>
          &
        </h2>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(3.5rem, 8vw, 8rem)', 
          color: '#ffffff',
          margin: 0,
          lineHeight: '1',
          whiteSpace: 'nowrap'
        }}>
          ACHIEVEMENTS
        </h2>
      </div>

      {/* 3. THE ACHIEVEMENTS CARDS CONTAINER - EQUAL SIZE CARDS */}
      <div style={{ 
        position: 'relative', zIndex: 5, width: '100%', height: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', padding: '0 5%'
      }}>
        
        {achievementsData.map((data, index) => (
          <div key={index} className="achievement-card" style={{
            width: '100%',
            maxWidth: '500px',
            minHeight: '450px', 
            height: 'auto', 
            padding: '45px 40px',
            borderRadius: '24px',
            // Unified Premium Red Glassmorphism
            background: 'rgba(20, 20, 20, 0.4)', 
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(237, 28, 36, 0.5)', // Red Border
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(237, 28, 36, 0.1)', // Red Inner Glow
            visibility: 'hidden', 
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.8)';
            e.currentTarget.style.boxShadow = '0 40px 70px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(237, 28, 36, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.5)';
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(237, 28, 36, 0.1)';
          }}>
            
            <h3 style={{ 
              fontFamily: '"Baskerville Old Face", serif', 
              fontSize: '2.5rem', 
              color: '#ffffff', 
              margin: '0 0 10px 0',
              lineHeight: '1.1'
            }}>
              {data.title}
            </h3>
            
            <h4 style={{ 
              color: '#a0a0a0', 
              fontSize: '1.1rem', 
              fontWeight: '400',
              marginBottom: '30px',
              fontStyle: 'italic'
            }}>
              {data.subtitle}
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#e0e0e0', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {data.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '15px' }}>
                  {/* Updated Bullet to Theme Red */}
                  <span style={{ color: '#ed1c24', marginRight: '15px', fontSize: '1.2rem', marginTop: '2px' }}>▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}

      </div>

    </section>
  );
};

export default AchievementsSection;