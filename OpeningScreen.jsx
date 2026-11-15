import { useState, useEffect } from 'react';
import Particles from './Particles';
import './OpeningScreen.css';

export default function OpeningScreen({ onReveal }) {
  const [phase, setPhase] = useState('greeting'); // greeting | subtitle | button
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('subtitle'), 2000);
    const t2 = setTimeout(() => setPhase('button'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleReveal = () => {
    setLeaving(true);
    setTimeout(onReveal, 1200);
  };

  return (
    <div className={`opening-screen ${leaving ? 'leaving' : ''}`}>
      <Particles />
      
      {/* Animated gradient orbs */}
      <div className="opening-orb orb-1" aria-hidden="true" />
      <div className="opening-orb orb-2" aria-hidden="true" />
      <div className="opening-orb orb-3" aria-hidden="true" />

      <div className="opening-content">
        <div className="opening-pretitle" aria-hidden="true">
          <span className="opening-star">✦</span>
          <span className="opening-star" style={{ animationDelay: '0.3s' }}>✦</span>
          <span className="opening-star" style={{ animationDelay: '0.6s' }}>✦</span>
        </div>

        <h1 className={`opening-title ${phase !== 'greeting' || true ? 'visible' : ''}`}>
          Hey, You! <span className="opening-heart">❤️</span>
        </h1>

        <p className={`opening-subtitle ${phase === 'subtitle' || phase === 'button' ? 'visible' : ''}`}>
          There's something I've been wanting to tell you...
        </p>

        <button
          id="open-secret-btn"
          className={`opening-cta ${phase === 'button' ? 'visible' : ''}`}
          onClick={handleReveal}
          aria-label="Open my little secret"
        >
          <span className="opening-cta-icon">💌</span>
          Open My Little Secret
          <span className="opening-cta-shimmer" aria-hidden="true" />
        </button>

        <p className={`opening-hint ${phase === 'button' ? 'visible' : ''}`}>
          (I promise it's something good ✨)
        </p>
      </div>

      {/* Decorative corner flowers */}
      <div className="corner-deco corner-tl" aria-hidden="true">❀</div>
      <div className="corner-deco corner-tr" aria-hidden="true">❀</div>
      <div className="corner-deco corner-bl" aria-hidden="true">❀</div>
      <div className="corner-deco corner-br" aria-hidden="true">❀</div>
    </div>
  );
}
