import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef(null);
  const welcomeRef = useRef(null);
  const aboutWordRef = useRef(null);
  const meWordRef = useRef(null);
  const imageRef = useRef(null);
  const textContentRef = useRef(null);
  const bgImageRef = useRef(null); // NEW: Ref for the actual img element

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=5000", // Extended to accommodate the join animation
        scrub: 1, 
        pin: true, 
        anticipatePin: 1,
      }
    });

    // Phase 1: The Transition (0 to 2 seconds in timeline time)
    // 1. Split the text apart and fade it out completely
    tl.to(aboutWordRef.current, { y: -200, opacity: 0, ease: "power2.inOut", duration: 2 }, 0);
    tl.to(meWordRef.current, { y: 200, opacity: 0, ease: "power2.inOut", duration: 2 }, 0);
    
    // 2. Fade out the "Welcome To" text
    tl.to(welcomeRef.current, { opacity: 0, ease: "power2.inOut", duration: 1.5 }, 0);
    
    // 3. Simultaneously fade IN the full-screen image (which replaces the black screen)
    tl.to(imageRef.current, { autoAlpha: 1, ease: "power2.inOut", duration: 2 }, 0);

    // Phase 2: Reveal the Biography Text (2 to 4 seconds)
    // Starts exactly after the background transition is fully complete
    // NEW: Blur the background image when text appears
    tl.to(bgImageRef.current, { 
      filter: "blur(8px)", 
      duration: 2.5, 
      ease: "power2.out" 
    }, 2);
    
    tl.fromTo(textContentRef.current,
      { autoAlpha: 0, y: 80, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, ease: "power3.out", duration: 2.5 },
      2 
    );

    // Phase 3: Fade out the biography text (4 to 5 seconds)
    // NEW: Remove blur from background image as text fades out
    tl.to(bgImageRef.current, { 
      filter: "blur(0px)", 
      duration: 1, 
      ease: "power2.out" 
    }, 4);
    
    tl.to(textContentRef.current,
      { autoAlpha: 0, y: -50, ease: "power2.inOut", duration: 1 },
      4
    );

    // Phase 4: Join the "ABOUT" and "ME" text back together (4 to 6 seconds)
    // Reverse the split animation
    tl.to(aboutWordRef.current, { y: 0, opacity: 1, ease: "power2.inOut", duration: 2 }, 4);
    tl.to(meWordRef.current, { y: 0, opacity: 1, ease: "power2.inOut", duration: 2 }, 4);
    
    // Fade out the image and fade in the welcome text
    tl.to(imageRef.current, { autoAlpha: 0, ease: "power2.inOut", duration: 2 }, 4);
    tl.to(welcomeRef.current, { opacity: 0.6, ease: "power2.inOut", duration: 1.5 }, 4.5);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#050505', // Initial Black Screen
      color: '#ffffff',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* FULL SCREEN BACKGROUND IMAGE (Hidden initially, fades in) */}
      <div ref={imageRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        zIndex: 1,
        visibility: 'hidden',
        opacity: 0,
      }}>
        <img 
          ref={bgImageRef} 
          src="/assets/About.png" 
          alt="Aditya Yadav" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {/* Dark overlay to ensure the bio text remains perfectly readable over the image */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(5,5,5,0.75)' }}></div>
      </div>

      {/* TOP LEFT TEXT */}
      <div ref={welcomeRef} style={{ 
        position: 'absolute', top: '40px', left: '5%', 
        fontSize: '0.8rem', letterSpacing: '0.3em', opacity: 0.6, zIndex: 2 
      }}>
        WELCOME TO
      </div>

      {/* GIANT SPLITTING TEXT */}
      <h1 style={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        fontFamily: '"Baskerville Old Face", serif', 
        fontSize: 'clamp(5rem, 15vw, 15rem)', 
        lineHeight: 0.85, 
        margin: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}>
        <span ref={aboutWordRef} style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff', display: 'block' }}>ABOUT</span>
        <span ref={meWordRef} style={{ color: '#ed1c24', display: 'block' }}>ME</span>
      </h1>

      {/* THE BIOGRAPHY TEXT OVERLAY - LARGER TEXT AND BETTER READABILITY */}
      <div ref={textContentRef} style={{
        position: 'absolute',
        zIndex: 3,
        maxWidth: '1000px',
        textAlign: 'center',
        padding: '0 30px',
        visibility: 'hidden',
        opacity: 0
      }}>
        <p style={{ fontSize: '1.6rem', lineHeight: '1.8', color: '#f0f0f0', marginBottom: '25px', fontWeight: '300' }}>
          I am an Artificial Intelligence and Data Science undergraduate passionate about building intelligent systems and scalable web applications. I specialize in <span style={{ color: '#ed1c24', fontWeight: 'bold' }}>Machine Learning, Deep Learning, Full-Stack Development, and Generative AI.</span>
        </p>
        <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#c0c0c0', marginBottom: '25px', fontWeight: '300' }}>
          I enjoy solving real-world problems using data-driven approaches and transforming ideas into impactful digital products. From developing AI-powered applications to designing full-stack systems, I focus on performance, optimization, and clean architecture.
        </p>
        <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#c0c0c0', fontWeight: '300' }}>
          Currently, I am actively working on advanced AI systems, deep learning models, and production-ready web applications while preparing for research-oriented and high-performance engineering roles.
        </p>
      </div>

    </section>
  );
};

export default AboutSection;