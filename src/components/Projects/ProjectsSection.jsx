import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "01",
    title: "DiagnoAI",
    description: "An Agentic AI diagnostic assistant powered by Multimodal Orchestration, deterministic filtering, and local Vision-Language Models. Fuses CNN radiological scores with extracted clinical vitals.",
    image: "/assets/DiagnoAI.png",
    github: "https://github.com/Aadityya07/DiagnoAI/blob/main/README.md",
    demo: "https://www.youtube.com/watch?v=x2A74AA0UZ4"
  },
  {
    id: "02",
    title: "RIFT Engine",
    description: "Full-Stack Graph-Theoretic AML Platform for Money Mulling detection. Engineered custom Depth-Limited DFS and Benford's Law anomaly detection to identify complex smurfing rings in sub-second timeframes.",
    image: "/assets/Money_Mulling.png",
    github: "https://github.com/Aadityya07/-MONEY-MULING-DETECTION-RIFT-26",
    demo: "https://www.linkedin.com/posts/aditya1610_graphtheory-frauddetection-fintech-ugcPost-7432855944696393728-Td_T?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFE_dzEBUwvpge1W4J6oWLdaEYAjPsaNWHg"
  },
  {
    id: "03",
    title: "Insight PDF",
    description: "Retrieval-Augmented Generation (RAG) system utilizing FAISS for high-performance vector similarity search. Automatically cleans, chunks, summarizes large documents and Generate Mind - maps to get Conceptual idea's more effeciently.",
    image: "/assets/InsightPDF.png",
    github: "https://github.com/Aadityya07/PDF-SUMMARIZER",
    demo: "https://www.youtube.com/watch?v=NroQp8KmH_Y"
  },
  {
    id: "04",
    title: "Culling Games",
    description: "Full-stack multi-role competitive platform. Features dynamic game state management, strategic power systems, and JWT authentication. Reliably handled real-time progression for 200+ active teams.",
    image: "/assets/Culling_Games.png",
    github: "https://github.com/Aadityya07/Culling_Games",
    demo: null
  }
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const projectsContainerRef = useRef(null);

  useGSAP(() => {
    // Select all the project card elements
    const cards = gsap.utils.toArray('.project-card');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${projectsData.length * 1500}`, // Gives plenty of scroll distance per project
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // SMOOTH ENTRANCE ANIMATION: Entire centralized box floats up and fades in
    tl.fromTo(projectsContainerRef.current, 
      { autoAlpha: 0, y: 100 }, 
      { autoAlpha: 1, y: 0, duration: 2, ease: "power2.out" },
      0
    );

    cards.forEach((card, i) => {
      // If not the first card, animate it IN smoothly
      if (i > 0) {
        tl.fromTo(card, 
          { autoAlpha: 0, y: 40 }, 
          { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out" }
        );
      }
      
      // Hold the card on screen for the user to read
      tl.to({}, { duration: 1 });

      // If not the last card, animate it OUT smoothly
      if (i !== cards.length - 1) {
        tl.to(card, 
          { autoAlpha: 0, y: -40, duration: 1.5, ease: "power2.inOut" }
        );
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      // BG Theme: Merges deep Upside Down crimson radial gradient with CRT scanlines pattern
      background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px), radial-gradient(circle at 80% center, #4a0000 0%, #050505 70%)',
      color: '#ffffff',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* FIXED TOP-LEFT HEADER (Stays on screen) */}
      <div style={{ position: 'absolute', top: '8%', left: '8%', zIndex: 10 }}>
        <p style={{ 
          fontFamily: 'monospace', color: '#888', letterSpacing: '4px', fontSize: '0.75rem', marginBottom: '8px', textTransform: 'uppercase' 
        }}>
          ADITYA YADAV
        </p>
        <h2 style={{ 
          fontFamily: '"Baskerville Old Face", serif', 
          fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', 
          color: '#ffffff',
          margin: 0,
          lineHeight: '1',
          textShadow: '0 4px 15px rgba(0,0,0,0.8)'
        }}>
          Major <span style={{ color: '#ed1c24' }}>Projects</span>
        </h2>
        <div style={{ width: '80px', height: '2px', backgroundColor: '#ed1c24', marginTop: '15px' }}></div>
      </div>

      {/* EXPLORE TEXT TOP-RIGHT (Stays on screen) */}
      <div style={{ position: 'absolute', top: '8%', right: '8%', zIndex: 10, textAlign: 'right', opacity: 0.5 }}>
        <p style={{ fontFamily: 'monospace', letterSpacing: '3px', fontSize: '0.8rem', color: '#ed1c24' }}>EXPLORE</p>
        <p style={{ fontFamily: 'monospace', letterSpacing: '2px', fontSize: '0.7rem' }}>4 PROJECTS</p>
      </div>

      {/* DYNAMIC PROJECTS CONTAINER: This whole box floats up and is centered */}
      <div ref={projectsContainerRef} style={{ 
        position: 'absolute',
        top: '30%', // Pushed down to make room for fixed header
        left: '50%',
        transform: 'translateX(-50%)',
        width: '85%',
        maxWidth: '1200px',
        height: '60%',
        backgroundColor: 'rgba(10, 0, 0, 0.5)', // Dark, opaque background inside the box
        border: '2px solid #ed1c24', // Prominent red border matching the theme
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(237, 28, 36, 0.4), inset 0 0 20px rgba(237, 28, 36, 0.4)', // Inner and outer red glow
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 5,
        visibility: 'hidden'
      }}>
        
        {projectsData.map((project, index) => (
          <div key={index} className="project-card" style={{
            position: 'absolute',
            width: '90%', // Content is smaller than the box itself
            height: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            visibility: index === 0 ? 'visible' : 'hidden',
            opacity: index === 0 ? 1 : 0,
          }}>
            
            {/* LEFT SIDE: Text Content */}
            <div style={{ flex: 1, maxWidth: '500px' }}>
              
              {/* Red Pill Box */}
              <div style={{ 
                border: '1px solid rgba(237, 28, 36, 0.5)', 
                display: 'inline-block', 
                padding: '4px 16px', 
                borderRadius: '20px', 
                color: '#ed1c24', 
                fontSize: '0.7rem', 
                letterSpacing: '3px',
                marginBottom: '20px',
                background: 'rgba(237, 28, 36, 0.05)'
              }}>
                PROJECT {project.id}
              </div>
              
              {/* Project Title (All white serif) */}
              <h3 style={{ 
                fontFamily: '"Baskerville Old Face", serif', 
                fontSize: '3.5rem', 
                color: '#ffffff',
                marginBottom: '25px', 
                textShadow: '0 4px 15px rgba(0,0,0,0.8)',
                lineHeight: '1.1'
              }}>
                {project.title}
              </h3>
              
              {/* Italicized Description matching reference */}
              <p style={{ 
                color: '#a0a0a0', 
                fontSize: '1.1rem', 
                lineHeight: '1.8', 
                fontStyle: 'italic',
                marginBottom: '40px' 
              }}>
                {project.description}
              </p>
              
              {/* Interactive Buttons */}
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href={project.github} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff',
                  padding: '12px 28px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px',
                  textDecoration: 'none', transition: 'all 0.3s', borderRadius: '4px'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
                >
                  GITHUB
                </a>

                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    backgroundColor: 'transparent', color: '#ed1c24',
                    padding: '12px 0', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px',
                    textDecoration: 'none', transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 10px rgba(237, 28, 36, 0.8)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; }}
                  >
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: '#ed1c24', borderRadius: '50%', marginRight: '5px', boxShadow: '0 0 5px #ed1c24' }}></span>
                    DEMO
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: UNCROPPED IMAGE */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))'
                }} 
              />
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default ProjectsSection;