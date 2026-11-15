import { useState } from 'react';
import OpeningScreen from './components/OpeningScreen';
import HerIntro from './components/HerIntro';
import WhatYouDo from './components/WhatYouDo';
import ThingsIAdmire from './components/ThingsIAdmire';
import HeartLetter from './components/HeartLetter';
import FinalConfession from './components/FinalConfession';
import MusicPlayer from './components/MusicPlayer';
import Particles from './components/Particles';
import './App.css';

export default function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {/* Opening splash — always mounted, hidden after reveal */}
      {!revealed && <OpeningScreen onReveal={() => setRevealed(true)} />}

      {/* Main content — fades in after reveal */}
      <div className={`main-content ${revealed ? 'visible' : ''}`}>
        {/* Global ambient particles */}
        <Particles />

        {/* Section 1 – Her Introduction */}
        <HerIntro />

        {/* Section divider */}
        <div className="section-transition" aria-hidden="true">
          <div className="st-line" />
          <span className="st-icon">❀</span>
          <div className="st-line" />
        </div>

        {/* Section 2 – What You Do To My Heart */}
        <WhatYouDo />

        {/* Section divider */}
        <div className="section-transition section-transition-light" aria-hidden="true">
          <div className="st-line st-line-light" />
          <span className="st-icon" style={{ color: 'rgba(240,160,192,0.5)' }}>❀</span>
          <div className="st-line st-line-light" />
        </div>

        {/* Section 3 – Things I Admire */}
        <ThingsIAdmire />

        {/* Section divider */}
        <div className="section-transition" aria-hidden="true">
          <div className="st-line" />
          <span className="st-icon">❀</span>
          <div className="st-line" />
        </div>

        {/* Section 4 – Heart Letter */}
        <HeartLetter />

        {/* Section divider */}
        <div className="section-transition" aria-hidden="true">
          <div className="st-line" />
          <span className="st-icon">❤</span>
          <div className="st-line" />
        </div>

        {/* Section 5 – Final Confession */}
        <FinalConfession />

        {/* Footer */}
        <footer className="site-footer">
          <p className="footer-text">Made with ❤️ just for you.</p>
          <p className="footer-sub">Every word here is real. Every feeling here is true.</p>
        </footer>
      </div>

      {/* Music player – always accessible */}
      {revealed && <MusicPlayer autoPlay />}
    </>
  );
}
