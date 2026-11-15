import { useEffect, useRef } from 'react';
import './ThingsIAdmire.css';

const cards = [
  {
    id: 'smile',
    icon: '☀️',
    title: 'Your Beautiful Smile',
    desc: `That smile of yours is something else entirely. It lights up a room, it lights up my day — and I swear, it makes everything feel just a little more okay.`,
  },
  {
    id: 'talk',
    icon: '🌸',
    title: 'The Way You Talk',
    desc: `The way you express yourself, the warmth in your words, the little things you say — every conversation with you feels like a gift I didn't expect to receive.`,
  },
  {
    id: 'personality',
    icon: '✨',
    title: 'Your Personality',
    desc: `You are genuinely one of a kind. The way you think, the way you feel, the way you care — it's something rare, and I notice it every single time.`,
  },
  {
    id: 'habits',
    icon: '🌷',
    title: 'Your Little Habits',
    desc: `The small, everyday things you do — the ones you probably don't even notice — are the ones that make you so wonderfully, completely you.`,
  },
  {
    id: 'happiness',
    icon: '💫',
    title: 'The Happiness You Bring',
    desc: `I didn't realise how much I was missing something until talking to you became a part of my day. You bring a kind of happiness that's quiet, genuine and real.`,
  },
  {
    id: 'ordinary',
    icon: '🌙',
    title: 'Making Ordinary Moments Special',
    desc: `Even the most ordinary conversation becomes something memorable when it's with you. You have this beautiful way of turning simple moments into ones I never want to forget.`,
  },
];

export default function ThingsIAdmire() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.querySelectorAll('.admire-card').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section admire-section" ref={sectionRef}>
      <div className="admire-bg-deco" aria-hidden="true" />

      <div className="container">
        <div className="admire-heading-wrap text-center">
          <span className="admire-pretag">— from my heart —</span>
          <h2 className="heading-xl admire-heading">
            Things I <em>Admire About You</em>
          </h2>
          <p className="admire-subheading body-text">
            (Click on any card to personalise it with your own words ✏️)
          </p>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-heart">❤</span>
            <div className="divider-line" />
          </div>
        </div>

        <div className="admire-grid">
          {cards.map((card, i) => (
            <div
              key={card.id}
              id={`admire-card-${card.id}`}
              className="admire-card"
              style={{ '--card-delay': `${i * 0.08}s` }}
            >
              <div className="card-glow" aria-hidden="true" />
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p
                className="card-desc"
                contentEditable
                suppressContentEditableWarning
                data-placeholder="Click to personalise this..."
                spellCheck={false}
              >
                {card.desc}
              </p>
              <div className="card-edit-hint">✏️ Click to edit</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
