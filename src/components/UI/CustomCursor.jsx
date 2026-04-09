import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    const handleMouseMove = (e) => {
      xSet(e.clientX - 4);
      ySet(e.clientY - 4);

      // FIX: If mouse is at the very edge of the browser window, hide it completely
      if (
        e.clientX <= 5 || 
        e.clientY <= 5 || 
        e.clientX >= window.innerWidth - 5 || 
        e.clientY >= window.innerHeight - 5
      ) {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
      } else {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });
      }
    };

    // Extra fallback for when leaving the document entirely
    const handleMouseLeave = () => gsap.to(cursorRef.current, { opacity: 0, duration: 0.1 });
    const handleMouseEnter = () => gsap.to(cursorRef.current, { opacity: 1, duration: 0.1 });

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '8px', height: '8px',
        backgroundColor: '#ed1c24', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        boxShadow: '0 0 8px rgba(237, 28, 36, 0.8)',
        opacity: 0 // Starts hidden until mouse moves
      }}
    />
  );
};

export default CustomCursor;