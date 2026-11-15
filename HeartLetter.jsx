import { useEffect, useRef, useState } from 'react';
import './HeartLetter.css';

const letterLines = [
  "Hey,",
  "",
  "I don't really know how to put all these feelings into words, but I'll try.",
  "",
  "I just want you to know that talking to you has become one of my favourite parts of the day.",
  "",
  "It's strange how someone can make you forget all your worries just through a simple conversation.",
  "",
  "Whenever I talk to you, I feel happy. Sometimes I don't even realise that I'm smiling.",
  "",
  "I never expected you to become this special to me, but somehow, without even realising it,",
  "you stole a little piece of my heart.",
  "",
  "I don't know what you think about me, and I don't want to make you feel pressured to say anything.",
  "",
  "I just wanted you to know how genuinely special you are to me.",
  "",
  "Maybe you are just being yourself, but that version of you makes my world a little brighter.",
  "",
  "And honestly, I'm really glad I got to know you.",
  "",
  "With lots of affection ❤️",
];

export default function HeartLetter() {
  const sectionRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          letterLines.forEach((_, i) => {
            setTimeout(() => {
              setVisibleLines(v => Math.max(v, i + 1));
            }, i * 220);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="section letter-section" ref={sectionRef}>
      <div className="letter-bg-deco" aria-hidden="true" />

      <div className="container">
        <div className="letter-heading-wrap text-center">
          <span className="letter-pretag">— written just for you —</span>
          <h2 className="heading-xl letter-heading">
            A Letter <em>From My Heart</em>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-heart">❤</span>
            <div className="divider-line" />
          </div>
        </div>

        <div className="letter-paper">
          {/* Paper lines decoration */}
          <div className="paper-lines" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="paper-line" style={{ top: `${80 + i * 44}px` }} />
            ))}
          </div>

          {/* Wax seal */}
          <div className="wax-seal" aria-hidden="true">
            <span className="wax-heart">❤</span>
          </div>

          {/* Letter content */}
          <div className="letter-body">
            {letterLines.map((line, i) => (
              <p
                key={i}
                className={`letter-line ${visibleLines > i ? 'visible' : ''} ${line === '' ? 'letter-spacer' : ''}`}
                style={{ '--line-delay': `${i * 0.03}s` }}
              >
                {line || '\u00A0'}
              </p>
            ))}

            {/* Writing cursor */}
            {started && visibleLines < letterLines.length && (
              <span className="writing-cursor" aria-hidden="true">|</span>
            )}
          </div>

          {/* Decorative flower corners */}
          <div className="letter-corner letter-corner-tl" aria-hidden="true">❀</div>
          <div className="letter-corner letter-corner-tr" aria-hidden="true">❀</div>
          <div className="letter-corner letter-corner-bl" aria-hidden="true">❀</div>
          <div className="letter-corner letter-corner-br" aria-hidden="true">❀</div>
        </div>
      </div>
    </section>
  );
}
