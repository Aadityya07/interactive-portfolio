import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroScene = () => {
  // Main References
  const mainContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const textIntroRef = useRef(null);
  const arrowsRef = useRef(null);
  const overlayContentRef = useRef(null);

  // Wrappers for the Scroll Animation
  const kidsWrapperRef = useRef(null);
  const leftTreeWrapperRef = useRef(null);
  const rightTreeWrapperRef = useRef(null);

  // Images for the Mouse Parallax
  const kidsRef = useRef(null);
  const leftTreesRef = useRef(null);
  const rightTreesRef = useRef(null);

  // References for your Portfolio Text
  const textContainerRef = useRef(null); // Wrapper to fade out everything on click
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const rightStatsRef = useRef(null);

  // NEW: References for the interactive scroll and next section
  const scrollIndicatorRef = useRef(null);
  const socialSectionRef = useRef(null);
  const socialLinksRef = useRef(null);

  const [images] = useState([]);
  const frameCount = 240;
  const seq = { frame: 0 };

  useGSAP(() => {
    // --- 1. CANVAS SETUP ---
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const currentFrame = (index) => {
      return `/assets/portal/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;

    function render() {
      if (!images[seq.frame] || !images[seq.frame].complete) return;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      const img = images[seq.frame];
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.drawImage(
        img, 
        0, 0, img.width, img.height, 
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }

    // --- 2. BOUNCING ARROWS ---
    gsap.to(arrowsRef.current, {
      y: 10, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 0.8
    });

    // Initialize text as hidden
    gsap.set([nameRef.current, titleRef.current, btnRef.current, rightStatsRef.current, scrollIndicatorRef.current, socialSectionRef.current], { autoAlpha: 0 });

    // --- 3. THE MASTER SCROLL TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        start: "top top",
        end: "+=10000", // Massively increased scroll length to accommodate the zoom and social links
        scrub: 1, 
        pin: true,
        anticipatePin: 1,
      },
      onUpdate: render,
    });

    // Phase 1: Portal opens (0 to 10)
    tl.to(seq, { frame: frameCount - 1, snap: "frame", ease: "none", duration: 10 }, 0);
    tl.to(textIntroRef.current, { opacity: 0, y: -30, duration: 1 }, 0);
    
    // Phase 2: Wrappers slide in (7 to 10)
    tl.to(overlayContentRef.current, { autoAlpha: 1, duration: 1 }, 7);
    tl.to(kidsWrapperRef.current, { y: 0, duration: 3, ease: "power2.out" }, 7);
    tl.to(leftTreeWrapperRef.current, { x: 0, duration: 3, ease: "power2.out" }, 7);
    tl.to(rightTreeWrapperRef.current, { x: 0, duration: 3, ease: "power2.out" }, 7);

    // Phase 3: Sequential Text Reveal (10 to 13)
    tl.fromTo(nameRef.current, { y: 40 }, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, 10);
    tl.fromTo(titleRef.current, { y: 40 }, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, 10.5);
    tl.fromTo(btnRef.current, { y: 40 }, { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" }, 11);
    tl.fromTo(rightStatsRef.current, { x: 40 }, { autoAlpha: 1, x: 0, duration: 2, ease: "power2.out" }, 11);

    // Phase 4: THE ZOOM ANIMATION (14 to 18) - Happens when user scrolls further down
    tl.to(canvasRef.current, { scale: 2.2, transformOrigin: "center center", ease: "power2.inOut", duration: 4 }, 14);
    tl.to(kidsWrapperRef.current, { scale: 1.5, y: 50, transformOrigin: "center bottom", ease: "power2.inOut", duration: 4 }, 14);
    tl.to(leftTreeWrapperRef.current, { opacity: 0, x: -200, ease: "power2.inOut", duration: 4 }, 14);
    tl.to(rightTreeWrapperRef.current, { opacity: 0, x: 200, ease: "power2.inOut", duration: 4 }, 14);
    tl.to(scrollIndicatorRef.current, { autoAlpha: 0, duration: 1 }, 14); // Hide the "Scroll" text as they zoom
    tl.to(textContainerRef.current, { autoAlpha: 0, duration: 1 }, 14); // Fallback: hides portfolio text if they didn't click the button

    // Phase 5: SOCIAL LINKS REVEAL (18 to 22)
    tl.to(socialSectionRef.current, { autoAlpha: 1, duration: 4, ease: "power2.inOut" }, 18);
    tl.fromTo(socialLinksRef.current, { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 3, ease: "power2.out" }, 19);

    // --- 4. MOUSE PARALLAX ---
    const handleMouseMove = (e) => {
      const progress = tl.progress();
      // Only allow parallax when the scene is perfectly stable (between Phase 3 and Phase 4)
      if (progress < (10/22) || progress > (13.5/22)) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 2;
      const yPos = (clientY / window.innerHeight - 0.5) * 2;

      gsap.to(kidsRef.current, { x: xPos * 15, y: yPos * 5, duration: 1.5, ease: "power2.out" });
      gsap.to(leftTreesRef.current, { x: xPos * 5, y: yPos * 2, duration: 1.5, ease: "power2.out" });
      gsap.to(rightTreesRef.current, { x: xPos * 5, y: yPos * 2, duration: 1.5, ease: "power2.out" });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };

  }, { scope: mainContainerRef });

  // --- 5. INTERACTIVE BUTTON HANDLER ---
  const handleExploreClick = () => {
    // Fades out the entire text container smoothly
    gsap.to(textContainerRef.current, { autoAlpha: 0, duration: 0.6, ease: "power2.out" });
    
    // Fades in the new "SCROLL" instruction at the bottom
    gsap.to(scrollIndicatorRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out", delay: 0.3 });
    gsap.to(scrollIndicatorRef.current, { y: 15, repeat: -1, yoyo: true, duration: 1, ease: "sine.inOut" });
  };

  return (
    <section ref={mainContainerRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: '#050505' }}>
      
      {/* Layer 1: Portal Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, display: 'block', width: '100%', height: '100%' }} />

      {/* Layer 2: Intro Text */}
      <div ref={textIntroRef} style={{
        position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, textAlign: 'center', fontFamily: '"Baskerville Old Face", serif', 
        color: '#ffffff', fontSize: '1rem', letterSpacing: '0.4em', pointerEvents: 'none'
      }}>
        SCROLL TO ENTER THE PORTAL
        <div ref={arrowsRef} style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
            <polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Layer 3: Background Overlay (Trees and Kids) */}
      <div ref={overlayContentRef} style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
        zIndex: 5, visibility: 'hidden', opacity: 0, overflow: 'hidden',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
      }}>
        <div ref={leftTreeWrapperRef} style={{ position: 'absolute', left: '-2%', bottom: '-2%', height: '105%', zIndex: 2, transform: 'translateX(-100px)' }}>
          <img ref={leftTreesRef} src="/assets/hero/trees-left.png" alt="Left Trees" style={{ height: '100%', display: 'block' }} />
        </div>
        <div ref={rightTreeWrapperRef} style={{ position: 'absolute', right: '-2%', bottom: '-2%', height: '105%', zIndex: 2, transform: 'translateX(100px)' }}>
          <img ref={rightTreesRef} src="/assets/hero/trees-right.png" alt="Right Trees" style={{ height: '100%', display: 'block' }} />
        </div>
        <div ref={kidsWrapperRef} style={{ position: 'absolute', bottom: '-15%', left: '-30vw', width: '160vw', minWidth: '1800px', zIndex: 3, transform: 'translateY(150px)' }}>
          <img ref={kidsRef} src="/assets/hero/strange-kids.png" alt="Kids on Bikes" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      {/* Layer 4: PORTFOLIO TEXT OVERLAY */}
      <div ref={textContainerRef} style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 20, pointerEvents: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 8%', boxSizing: 'border-box'
      }}>
        {/* LEFT SIDE */}
        <div style={{ pointerEvents: 'auto', maxWidth: '600px', marginTop: '-5%' }}>
          <h1 ref={nameRef} style={{ fontFamily: '"Baskerville Old Face", serif', fontSize: 'clamp(3rem, 5vw, 5rem)', color: '#ffffff', lineHeight: '1.1', marginBottom: '15px', letterSpacing: '2px', textShadow: '0px 4px 20px rgba(0,0,0,0.9)' }}>
            ADITYA YADAV
          </h1>
          <div ref={titleRef} style={{ fontFamily: 'Inter, sans-serif', color: '#ffffff', marginBottom: '35px', textShadow: '0px 2px 10px rgba(0,0,0,0.9)' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>AI & DS | FULL-STACK DEVELOPER</h2>
            <p style={{ fontSize: '1rem', opacity: 0.9, lineHeight: '1.6' }}>Building intelligent systems with AI, ML & scalable web technologies.</p>
          </div>
          <button ref={btnRef} onClick={handleExploreClick} style={{
            backgroundColor: '#ffffff', color: '#000000', border: 'none', padding: '14px 35px', fontSize: '1rem', fontWeight: 'bold',
            borderRadius: '4px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0px 4px 15px rgba(0,0,0,0.5)', transition: 'transform 0.2s'
          }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
            EXPLORE MORE
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div ref={rightStatsRef} style={{ pointerEvents: 'auto', textAlign: 'center', marginTop: '5%' }}>
          <p style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', letterSpacing: '3px', marginBottom: '15px', textShadow: '0px 2px 10px rgba(0,0,0,0.9)' }}>
            PROFILE SUMMARY
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '3.5rem', color: 'transparent', WebkitTextStroke: '2px #ed1c24', textShadow: '0 0 15px rgba(237,28,36,0.6)', lineHeight: '1' }}>04</div>
              <div style={{ color: '#ffffff', fontSize: '0.75rem', letterSpacing: '2px', marginTop: '5px' }}>PROJECTS</div>
            </div>
            <div style={{ color: '#ed1c24', fontSize: '3rem', lineHeight: '1', paddingBottom: '20px', textShadow: '0 0 10px rgba(237,28,36,0.6)' }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '3.5rem', color: 'transparent', WebkitTextStroke: '2px #ed1c24', textShadow: '0 0 15px rgba(237,28,36,0.6)', lineHeight: '1' }}>12</div>
              <div style={{ color: '#ffffff', fontSize: '0.75rem', letterSpacing: '2px', marginTop: '5px' }}>SKILLS</div>
            </div>
            <div style={{ color: '#ed1c24', fontSize: '3rem', lineHeight: '1', paddingBottom: '20px', textShadow: '0 0 10px rgba(237,28,36,0.6)' }}>:</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '3.5rem', color: 'transparent', WebkitTextStroke: '2px #ed1c24', textShadow: '0 0 15px rgba(237,28,36,0.6)', lineHeight: '1' }}>01</div>
              <div style={{ color: '#ffffff', fontSize: '0.75rem', letterSpacing: '2px', marginTop: '5px' }}>INTERNSHIP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 5: The "SCROLL" Indicator (Appears only after clicking Explore More) */}
      <div ref={scrollIndicatorRef} style={{
        position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 25, textAlign: 'center', fontFamily: 'Inter, sans-serif', fontWeight: 'bold',
        color: '#ffffff', fontSize: '0.8rem', letterSpacing: '0.3em', pointerEvents: 'none',
        textShadow: '0px 2px 10px rgba(0,0,0,0.9)'
      }}>
        SCROLL TO DESCEND
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ed1c24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8, filter: 'drop-shadow(0 0 5px #ed1c24)' }}>
            <polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Layer 6: THE ARCHITECT SECTION (Appears at the very end of the scroll) */}
      <div ref={socialSectionRef} style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 30,
        backgroundImage: 'url("/assets/Frame126115411.jpeg")', backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Dark overlay to make links pop */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(5, 5, 5, 0.75)' }}></div>
        
        <div ref={socialLinksRef} style={{ position: 'relative', zIndex: 31, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* NEW: THEMATIC PROFILE AVATAR */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            border: '2px solid rgba(237, 28, 36, 0.8)',
            boxShadow: '0 0 30px rgba(237, 28, 36, 0.4), inset 0 0 20px rgba(237, 28, 36, 0.4)',
            marginBottom: '20px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img 
              src="/assets/my-avatar.jpg" 
              alt="Aditya Yadav" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Subtle red tint overlay to blend your photo into the Upside Down theme */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(237, 28, 36, 0.15)', pointerEvents: 'none', mixBlendMode: 'color-burn' }}></div>
          </div>

          {/* UPDATED TITLE */}
          <h2 style={{ fontFamily: '"Baskerville Old Face", serif', color: '#ffffff', fontSize: '2.5rem', letterSpacing: '4px', marginBottom: '25px', textShadow: '0 0 15px rgba(237,28,36,0.5)' }}>
            THE ARCHITECT
          </h2>

          {/* THE GLASSMORPHISM EMAIL PILL */}
          <a 
            href="mailto:aditya.yadav.07.in@gmail.com"
            style={{
              display: 'inline-block',
              padding: '12px 35px',
              borderRadius: '40px',
              background: 'rgba(20, 20, 20, 0.4)', 
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
              color: '#ffffff',
              fontSize: '1.1rem',
              letterSpacing: '1px',
              textDecoration: 'none',
              marginBottom: '40px',
              transition: 'all 0.3s ease',
              pointerEvents: 'auto'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(237, 28, 36, 0.15)';
              e.currentTarget.style.borderColor = '#ed1c24';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(237, 28, 36, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.5)';
            }}
          >
            aditya.yadav.07.in@gmail.com
          </a>
          
          {/* SOCIAL ICONS CONTAINER */}
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center' }}>
            <a href="https://www.linkedin.com/in/aditya1610" target="_blank" rel="noreferrer" style={{ color: '#fff', transition: '0.3s', pointerEvents: 'auto' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ed1c24'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://github.com/Aadityya07" target="_blank" rel="noreferrer" style={{ color: '#fff', transition: '0.3s', pointerEvents: 'auto' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ed1c24'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://x.com/AdityaYadavDS" target="_blank" rel="noreferrer" style={{ color: '#fff', transition: '0.3s', pointerEvents: 'auto' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ed1c24'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            <a href="https://www.instagram.com/aadityya_06/" target="_blank" rel="noreferrer" style={{ color: '#fff', transition: '0.3s', pointerEvents: 'auto' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ed1c24'} onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroScene;