import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = () => {
  // We set the initial state to true so the UI reflects that it SHOULD be playing
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Attempt to play the audio immediately as soon as the site loads
    const playAttempt = audioRef.current.play();

    if (playAttempt !== undefined) {
      playAttempt.catch((error) => {
        // If the browser blocks autoplay (because the user hasn't clicked anything yet),
        // we update the UI to show it's muted, and wait for their first interaction.
        console.warn("Browser blocked autoplay. Waiting for user interaction...");
        setIsPlaying(false);

        const startOnFirstClick = () => {
          audioRef.current.play();
          setIsPlaying(true);
          document.removeEventListener('click', startOnFirstClick);
        };
        
        document.addEventListener('click', startOnFirstClick);
        
        // Cleanup the listener if the component unmounts early
        return () => document.removeEventListener('click', startOnFirstClick);
      });
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/assets/stranger_things.mp3" loop />

      <button 
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 99999, 
          background: 'transparent',
          border: '1px solid rgba(237, 28, 36, 0.5)',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#ed1c24',
          transition: 'all 0.3s ease',
          boxShadow: isPlaying ? '0 0 15px rgba(237, 28, 36, 0.4)' : 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(237, 28, 36, 0.1)';
          e.currentTarget.style.borderColor = '#ed1c24';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(237, 28, 36, 0.5)';
        }}
      >
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
    </>
  );
};

export default AudioPlayer;