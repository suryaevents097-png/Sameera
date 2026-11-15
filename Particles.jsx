import { useEffect, useRef } from 'react';
import './Particles.css';

const PARTICLE_COUNT = 35;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function Particles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const types = ['heart', 'star', 'petal', 'dot'];
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement('div');
      const type = types[Math.floor(Math.random() * types.length)];
      el.className = `particle particle-${type}`;

      const size = randomBetween(8, 22);
      const left = randomBetween(0, 100);
      const delay = randomBetween(0, 18);
      const duration = randomBetween(14, 28);
      const opacity = randomBetween(0.25, 0.65);

      el.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        opacity: ${opacity};
      `;

      if (type === 'heart') {
        const hues = ['#f0a0c0', '#e06090', '#d8c8f0', '#b8a0d8', '#ff8fab'];
        el.style.color = hues[Math.floor(Math.random() * hues.length)];
        el.innerHTML = '♥';
      } else if (type === 'star') {
        const hues = ['#f0d070', '#d8c8f0', '#fce8d8', '#f8c8d8'];
        el.style.color = hues[Math.floor(Math.random() * hues.length)];
        el.innerHTML = '✦';
      } else if (type === 'petal') {
        const hues = ['#f8c8d8', '#fce8d8', '#d8c8f0', '#fff'];
        el.style.background = hues[Math.floor(Math.random() * hues.length)];
      }

      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return <div ref={containerRef} className="particles-container" aria-hidden="true" />;
}
