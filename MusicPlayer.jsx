import { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

// "Unnattundi Gundey" – Ninnu Kori | ఉన్నాటుండి గుండె వంద కొట్టుకుందే
// Karthik & Chinmayi | Gopi Sundar | Official 4K Video
const YOUTUBE_VIDEO_ID = '-twi5MBq1TQ';

export default function MusicPlayer({ autoPlay = false }) {
  const [playing, setPlaying]   = useState(false);
  const [ready, setReady]       = useState(false);
  const [showHint, setShowHint] = useState(true);
  const playerRef               = useRef(null);
  const iframeRef               = useRef(null);
  const autoPlayRef             = useRef(autoPlay);

  // Hide hint after 5 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => initPlayer();

    return () => { window.onYouTubeIframeAPIReady = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initPlayer() {
    if (playerRef.current) return;
    playerRef.current = new window.YT.Player(iframeRef.current, {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        controls: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        disablekb: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (e) => {
          setReady(true);
          // Auto-play if prop is set — works because user just clicked a button
          if (autoPlayRef.current) {
            e.target.setVolume(55);
            e.target.playVideo();
          }
        },
        onStateChange: (e) => {
          // 1 = playing, 2 = paused, 0 = ended
          setPlaying(e.data === 1);
        },
      },
    });
  }

  const toggle = () => {
    if (!playerRef.current || !ready) return;
    setShowHint(false);
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.setVolume(55);
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="music-player">
      {/* Hidden YouTube iframe — audio only visually */}
      <div
        style={{
          position: 'fixed',
          bottom: '-9999px',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
        }}
        aria-hidden="true"
      >
        <div ref={iframeRef} />
      </div>

      {/* Song name label */}
      <div className={`music-label-wrap ${showHint ? 'hint-visible' : ''}`}>
        <span className="music-label">
          {playing ? '♫ Unnattundi Gundey' : ready ? 'Play our song 🎶' : 'Loading song…'}
        </span>
      </div>

      {/* Floating vinyl button */}
      <button
        id="music-toggle-btn"
        className={`music-btn ${playing ? 'playing' : ''} ${!ready ? 'loading' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play Unnattundi Gundey – Ninnu Kori'}
        title={playing ? 'Pause ♫ Unnattundi Gundey' : '▶ Play – Unnattundi Gundey (Ninnu Kori)'}
        disabled={!ready}
      >
        <div className={`vinyl ${playing ? 'spinning' : ''}`}>
          <div className="vinyl-groove groove-1" />
          <div className="vinyl-groove groove-2" />
          <div className="vinyl-center" />
        </div>
        <span className="music-icon">
          {!ready ? '⏳' : playing ? '♪' : '♫'}
        </span>
        {playing && <div className="music-glow-ring" aria-hidden="true" />}
      </button>
    </div>
  );
}
