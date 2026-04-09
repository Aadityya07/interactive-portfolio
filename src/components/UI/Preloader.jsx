import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  
  // UI Group Refs
  const loadingGroupRef = useRef(null);
  const progressFillRef = useRef(null);
  const initTextRef = useRef(null);
  
  // Message Refs
  const message1Ref = useRef(null);
  const message2Ref = useRef(null);
  const cursorRef = useRef(null);

  const [progress, setProgress] = useState(0);

  // The text we want to typewrite
  const breachText = "BREACHING THE UPSIDE DOWN";

  useGSAP(() => {
    // 1. Flicker effect for "INITIALIZING..."
    gsap.to(initTextRef.current, { opacity: 0.3, duration: 0.1, yoyo: true, repeat: -1 });

    // 2. Blinking Cursor Effect
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.4, repeat: -1, yoyo: true, ease: "steps(1)" });

    // 3. The Master Cinematic Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the entire black screen and trigger the App to unlock scrolling
        gsap.to(containerRef.current, { 
          autoAlpha: 0, 
          duration: 0.8, 
          ease: "power2.inOut",
          onComplete: onComplete 
        });
      }
    });

    const progressObj = { value: 0 };

    // PHASE 1: The Suspenseful Load
    // Step A: 0 to 60% in 1.5 seconds
    tl.to(progressObj, {
      value: 60, duration: 1.5, ease: "power2.out", roundProps: "value",
      onUpdate: () => setProgress(progressObj.value)
    }, 0);
    tl.to(progressFillRef.current, { width: "60%", duration: 1.5, ease: "power2.out" }, 0);

    // Step B: The 0.5s Suspense Pause
    tl.to(progressObj, { value: 60, duration: 0.5 }, 1.5);
    tl.to(progressFillRef.current, { width: "60%", duration: 0.5 }, 1.5);

    // Step C: 60% to 100% surge
    tl.to(progressObj, {
      value: 100, duration: 0.8, ease: "power2.in", roundProps: "value",
      onUpdate: () => setProgress(progressObj.value)
    }, 2.0);
    tl.to(progressFillRef.current, { width: "100%", duration: 0.8, ease: "power2.in" }, 2.0);

    // PHASE 2: Hide Loading UI (Shrinks and fades out)
    tl.to(loadingGroupRef.current, {
      autoAlpha: 0, scale: 0.9, duration: 0.5, ease: "power2.inOut"
    }, 2.8);

    // PHASE 3: The Portfolio Identity Reveal (CHANGED TO FOCUS ON "PORTFOLIO")
    // Letters snap together while glowing
    tl.fromTo(message1Ref.current,
      { autoAlpha: 0, scale: 1.1, letterSpacing: "20px", filter: "blur(10px)" }, 
      { autoAlpha: 1, scale: 1, letterSpacing: "2px", filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
    );

    // Hold the message so the user can read it
    tl.to({}, { duration: 1.5 });

    // Fade it out
    tl.to(message1Ref.current, {
      autoAlpha: 0, scale: 0.9, y: -30, duration: 0.8, ease: "power2.in"
    });

    // PHASE 4: The Typewriter & Breach Transition
    // 1. Make the container visible
    tl.fromTo(message2Ref.current,
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // 2. The Typewriter Effect (Staggers the opacity of each character)
    tl.to('.type-char', {
      opacity: 1,
      stagger: 0.05, // Speed of typing (50ms per letter)
      ease: "none",
      duration: 0.05
    });

    // 3. Pause for a split second after typing finishes
    tl.to({}, { duration: 0.8 });

    // 4. The Massive Zoom
    tl.to(message2Ref.current, {
      scale: 35, // Zooms so large you fly through the letters
      opacity: 0, // Fades as it hits the camera
      duration: 1.5,
      ease: "power2.in",
      transformOrigin: "center center"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh',
      backgroundColor: '#050505', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', 
      pointerEvents: 'none'
    }}>
      
      {/* --- GROUP 1: THE LOADING UI --- */}
      <div ref={loadingGroupRef} style={{
        position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'
      }}>
        <div style={{
          fontFamily: 'monospace', fontSize: '4rem', color: '#ffffff',
          marginBottom: '20px', textShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
          letterSpacing: '5px'
        }}>
          {progress}%
        </div>

        <div style={{
          width: '300px', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)',
          marginBottom: '30px', position: 'relative', overflow: 'hidden'
        }}>
          <div ref={progressFillRef} style={{
            position: 'absolute', top: 0, left: 0, height: '100%', width: '0%',
            backgroundColor: '#ed1c24', boxShadow: '0 0 15px #ed1c24'
          }}></div>
        </div>

        <span ref={initTextRef} style={{
          color: '#ed1c24', fontFamily: 'monospace', letterSpacing: '0.4em', fontSize: '0.9rem',
          textShadow: '0 0 10px rgba(237, 28, 36, 0.5)'
        }}>
          INITIALIZING SYSTEM...
        </span>
      </div>

      {/* --- GROUP 2: MESSAGE 1 (Clear Portfolio Designation) --- */}
      <div ref={message1Ref} style={{
        position: 'absolute', textAlign: 'center', visibility: 'hidden', width: '100%', padding: '0 20px'
      }}>
        <p style={{ 
          fontFamily: 'monospace', color: '#a0a0a0', letterSpacing: '4px', fontSize: '0.9rem', 
          marginBottom: '15px', textTransform: 'uppercase' 
        }}>
          CLASSIFIED ARCHIVE LOCATED
        </p>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(2rem, 5vw, 4.5rem)', // Slightly scaled down clamp so long words don't break on mobile
          color: '#ffffff', margin: 0, lineHeight: '1.1',
          textShadow: '0 5px 20px rgba(0,0,0,0.8)'
        }}>
          INTERACTIVE PORTFOLIO
        </h2>
        <p style={{ 
          fontFamily: 'Inter, sans-serif', color: '#ed1c24', letterSpacing: '6px', fontSize: '1rem', 
          marginTop: '15px', textTransform: 'uppercase', fontWeight: 'bold'
        }}>
          ACCESS GRANTED
        </p>
      </div>

      {/* --- GROUP 3: MESSAGE 2 (The Typewriter Fly-Through) --- */}
      <div ref={message2Ref} style={{
        position: 'absolute', textAlign: 'center', visibility: 'hidden',
        width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', fontSize: 'clamp(1.5rem, 3vw, 3.5rem)', 
          color: '#ed1c24', margin: 0, letterSpacing: '4px',
          textShadow: '0 0 30px rgba(237, 28, 36, 0.8)',
          whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap' // Allows wrapping just in case on very small screens
        }}>
          {breachText.split('').map((char, index) => (
            <span key={index} className="type-char" style={{ opacity: 0 }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <span ref={cursorRef} style={{ display: 'inline-block', marginLeft: '5px', width: 'clamp(12px, 1.5vw, 20px)', height: 'clamp(25px, 3vw, 40px)', backgroundColor: '#ed1c24' }}></span>
        </h2>
      </div>

    </div>
  );
};

export default Preloader;