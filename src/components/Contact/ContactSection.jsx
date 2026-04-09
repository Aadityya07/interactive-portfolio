import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const formRef = useRef(null);

  const [focusedInput, setFocusedInput] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    const icons = gsap.utils.toArray('.social-icon');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000", 
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.fromTo(bgImageRef.current, 
      { autoAlpha: 0, scale: 1.15 }, 
      { autoAlpha: 1, scale: 1, duration: 2, ease: "power2.out" },
      0
    );

    tl.fromTo(contentRef.current, 
      { autoAlpha: 0 }, 
      { autoAlpha: 1, duration: 1.5, ease: "power3.out" },
      1 
    );

    tl.fromTo(titleRef.current,
      { autoAlpha: 0, y: -30 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
      1.2
    );

    tl.fromTo(emailRef.current, 
      { autoAlpha: 0, scale: 0.9 }, 
      { autoAlpha: 1, scale: 1, duration: 1, ease: "back.out(1.5)" },
      1.5
    );

    tl.fromTo(formRef.current,
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" },
      1.7
    );

    tl.fromTo(icons, 
      { autoAlpha: 0, y: 30 }, 
      { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1, ease: "back.out(1.5)" },
      2
    );

  }, { scope: containerRef });

  // FORMSPREE INTEGRATION VIA FETCH (Keeps user on the page!)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const data = new FormData(form);
    
    try {
      // REPLACE "YOUR_FORMSPREE_ID" WITH YOUR ACTUAL FORMSPREE ENDPOINT ID
      const response = await fetch("https://formspree.io/f/xaqlkqrq", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert("Transmission successful! Your message has been sent.");
        form.reset(); // Clears the form after sending
      } else {
        alert("Error sending transmission. Please check your connection and try again.");
      }
    } catch (error) {
      alert("Error sending transmission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyle = {
    width: '100%',
    padding: '14px 20px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '8px',
    color: '#ffffff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  };

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden', 
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* THE CSS HACK TO FIX BROWSER AUTOFILL WHITE BACKGROUND */}
      <style>
        {`
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-text-fill-color: #ffffff;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>

      {/* 1. CINEMATIC BACKGROUND */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <img 
          ref={bgImageRef} 
          src="/assets/contact_me.png" 
          alt="Contact Background" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'radial-gradient(circle at center, rgba(5,5,5,0.4) 0%, rgba(0,0,0,0.9) 100%)' 
        }}></div>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div ref={contentRef} style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        maxWidth: '600px',
        padding: '0 20px',
        visibility: 'hidden'
      }}>
        
        {/* Title */}
        <h2 ref={titleRef} style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          color: '#ffffff',
          margin: '0 0 30px 0',
          lineHeight: '1',
          textShadow: '0 5px 20px rgba(0,0,0,0.8)',
          letterSpacing: '2px'
        }}>
          CONTACT ME
        </h2>

        {/* Email Glassmorphism Pill */}
        <a 
          ref={emailRef}
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

        {/* The Glassmorphism Contact Form (Now with Formspree Name Attributes) */}
        <form 
          ref={formRef} 
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            background: 'rgba(20, 20, 20, 0.3)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '40px',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            marginBottom: '40px'
          }}
        >
          <div style={{ display: 'flex', gap: '15px' }}>
            <input 
              type="text" 
              name="name" // REQUIRED FOR FORMSPREE
              placeholder="Your Name" 
              required
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...inputBaseStyle,
                borderColor: focusedInput === 'name' ? '#ed1c24' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: focusedInput === 'name' ? '0 0 10px rgba(237, 28, 36, 0.2)' : 'none'
              }} 
            />
            <input 
              type="email" 
              name="email" // REQUIRED FOR FORMSPREE
              placeholder="Your Email" 
              required
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              style={{
                ...inputBaseStyle,
                borderColor: focusedInput === 'email' ? '#ed1c24' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: focusedInput === 'email' ? '0 0 10px rgba(237, 28, 36, 0.2)' : 'none'
              }} 
            />
          </div>
          
          <textarea 
            name="message" // REQUIRED FOR FORMSPREE
            placeholder="Your Message..." 
            rows="4"
            required
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
            style={{
              ...inputBaseStyle,
              resize: 'none',
              borderColor: focusedInput === 'message' ? '#ed1c24' : 'rgba(255, 255, 255, 0.15)',
              boxShadow: focusedInput === 'message' ? '0 0 10px rgba(237, 28, 36, 0.2)' : 'none'
            }} 
          />

          <button 
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              marginTop: '5px',
              backgroundColor: isSubmitting ? '#a0a0a0' : '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#ed1c24';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(237, 28, 36, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
          </button>
        </form>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center' }}>
          <a href="https://www.linkedin.com/in/aditya1610" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#ffffff', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ed1c24'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://github.com/Aadityya07" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#ffffff', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ed1c24'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="https://x.com/AdityaYadavDS" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#ffffff', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ed1c24'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
          </a>
          <a href="https://www.instagram.com/aadityya_06/" target="_blank" rel="noreferrer" className="social-icon" style={{ color: '#ffffff', transition: '0.3s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#ed1c24'; e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.transform = 'scale(1)'; }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>

      </div>

      <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', zIndex: 10, opacity: 0.5 }}>
        <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#ffffff', letterSpacing: '2px' }}>
          DESIGNED & BUILT BY ADITYA YADAV //2026
        </p>
      </div>

    </section>
  );
};

export default ContactSection;