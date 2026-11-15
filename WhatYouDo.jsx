import { useEffect, useRef, useState } from 'react';
import './WhatYouDo.css';

const sentences = [
  { text: "While talking to you, I forget all my tensions.", icon: "✦" },
  { text: "Without even realising it, I start smiling.", icon: "🌸" },
  { text: "Even an ordinary conversation with you becomes the happiest part of my day.", icon: "✦" },
  { text: "I don't know how you do it, but you make me feel happy in ways I can't explain.", icon: "🌷" },
  { text: "Sometimes I open our chat just to feel that little happiness again.", icon: "✦" },
  { text: "And somewhere along the way... you quietly stole my heart without even realising it.", icon: "❤️", emphasis: true },
];

export default function WhatYouDo() {
  const sectionRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          sentences.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCount(c => Math.max(c, i + 1));
            }, i * 900);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="section what-section" ref={sectionRef}>
      <div className="what-bg-pattern" aria-hidden="true" />
      <div className="what-orb what-orb-1" aria-hidden="true" />
      <div className="what-orb what-orb-2" aria-hidden="true" />

      <div className="container">
        <div className="what-heading-wrap text-center">
          <span className="what-pretag">— what you do to me —</span>
          <h2 className="heading-xl what-heading">
            What You Do <em>To My Heart</em>
          </h2>
          <div className="divider">
            <div className="divider-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(240,160,192,0.5), transparent)' }} />
            <span className="divider-heart" style={{ color: 'rgba(248,200,216,0.9)' }}>♥</span>
            <div className="divider-line" style={{ background: 'linear-gradient(90deg, transparent, rgba(240,160,192,0.5), transparent)' }} />
          </div>
        </div>

        <div className="sentences-list">
          {sentences.map((s, i) => (
            <div
              key={i}
              className={`sentence-item ${visibleCount > i ? 'visible' : ''} ${s.emphasis ? 'emphasis' : ''}`}
              style={{ '--delay': `${i * 0.05}s` }}
            >
              <span className="sentence-icon" aria-hidden="true">{s.icon}</span>
              <p className="sentence-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
