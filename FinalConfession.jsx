import { useState, useRef, useCallback, useEffect } from 'react';
import './FinalConfession.css';

// ─── EmailJS Config ──────────────────────────────────────────────
// YOUR EMAIL: nikeshvarmakodali@gmail.com
// Follow setup_guide.md to get these 3 values from emailjs.com
// Set the "To Email" in your EmailJS template to: nikeshvarmakodali@gmail.com
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // Replace after EmailJS setup
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // Replace after EmailJS setup
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // Replace after EmailJS setup
// ─────────────────────────────────────────────────────────────────

const RESPONSE_YES = {
  emoji: '🌸',
  title: 'My heart is smiling right now.',
  message: `Honestly, I didn't know what you'd say. I still can't believe you said this.
Thank you for not making me feel silly for feeling this way.
Whatever this is, I'm really glad we're here. 💕`,
};

const RESPONSE_NO = {
  emoji: '🌷',
  title: `That's completely okay.`,
  message: `No pressure at all. Genuinely.
My feelings for you are real, and they don't come with any expectations.
You being in my life — in whatever way — already makes me happy.
Thank you for being honest. 🌸`,
};

export default function FinalConfession() {
  const [noCount, setNoCount]     = useState(0);
  const [response, setResponse]   = useState(null); // null | 'yes' | 'no'
  const [noPos, setNoPos]         = useState({ x: null, y: null });
  const [emailSent, setEmailSent] = useState(false);
  const noBtnRef = useRef(null);
  const noCountRef = useRef(0);
  const sectionRef = useRef(null);
  const heartRef   = useRef(null);

  // Load EmailJS SDK lazily
  useEffect(() => {
    if (window.emailjs) return;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      }
    };
    document.head.appendChild(script);
  }, []);

  // Scroll-triggered heart pulse
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          heartRef.current?.classList.add('beating');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Send email via EmailJS ──────────────────────────────────────
  const sendEmail = useCallback((templateParams) => {
    if (!window.emailjs) return;
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.log('[EmailJS] Not configured yet. Params:', templateParams);
      return;
    }
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => console.log('[EmailJS] Email sent!'))
      .catch(err => console.error('[EmailJS] Error:', err));
  }, []);

  // ── YES handler ─────────────────────────────────────────────────
  const handleYes = useCallback(() => {
    setResponse('yes');
    sendEmail({
      reply: '✅ SHE SAID YES! She clicked "Maybe I do ❤️"',
      no_count: noCountRef.current,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    });
    setEmailSent(true);
  }, [sendEmail]);

  // ── NO button — escape on hover / near approach ─────────────────
  const moveNoButton = useCallback((e) => {
    const btn = noBtnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const btnCX = rect.left + rect.width / 2;
    const btnCY = rect.top  + rect.height / 2;
    const cursorX = e.clientX;
    const cursorY = e.clientY;
    const dx = cursorX - btnCX;
    const dy = cursorY - btnCY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const TRIGGER = 90; // px — how close before it escapes

    if (dist < TRIGGER) {
      // Push away in the opposite direction
      const angle = Math.atan2(dy, dx);
      const push  = TRIGGER + 60;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let newX = (noPos.x ?? btnCX) - Math.cos(angle) * push;
      let newY = (noPos.y ?? btnCY) - Math.sin(angle) * push;

      // Clamp to viewport
      newX = Math.min(Math.max(newX, 60), vw - 60);
      newY = Math.min(Math.max(newY, 60), vh - 60);

      setNoPos({ x: newX, y: newY });
    }
  }, [noPos]);

  // ── NO click handler (if they somehow click it) ──────────────────
  const handleNo = useCallback(() => {
    const newCount = noCountRef.current + 1;
    noCountRef.current = newCount;
    setNoCount(newCount);

    // Show final NO response after 3 actual clicks
    if (newCount >= 3) {
      setResponse('no');
      sendEmail({
        reply: `💔 She clicked NO ${newCount} times and finally accepted.`,
        no_count: newCount,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });
      return;
    }

    // Secretly send no-attempt count every click
    sendEmail({
      reply: `🌸 She tried to click "Let me think about it" (attempt #${newCount})`,
      no_count: newCount,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    });

    // Jump button to random position
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setNoPos({
      x: Math.random() * (vw - 160) + 60,
      y: Math.random() * (vh - 100) + 50,
    });
  }, [sendEmail]);

  const noStyle = noPos.x !== null
    ? { position: 'fixed', left: noPos.x, top: noPos.y, transform: 'translate(-50%,-50%)', zIndex: 9999 }
    : {};

  return (
    <section className="section confession-section" ref={sectionRef} onMouseMove={moveNoButton}>
      {/* Background */}
      <div className="confession-bg" aria-hidden="true" />
      <div className="confession-orb c-orb-1" aria-hidden="true" />
      <div className="confession-orb c-orb-2" aria-hidden="true" />

      <div className="container">
        {/* Preamble */}
        <div className="confession-preamble text-center">
          <span className="confession-pretag">— one last thing —</span>
          <p className="confession-so">So... there's one little thing I want to tell you.</p>
        </div>

        {/* Big glowing heart */}
        <div className="confession-heart-wrap text-center">
          <div className="heart-rings" aria-hidden="true">
            <div className="heart-ring ring-1" />
            <div className="heart-ring ring-2" />
            <div className="heart-ring ring-3" />
          </div>
          <div className="confession-heart" ref={heartRef} aria-hidden="true">
            <svg viewBox="0 0 100 92" xmlns="http://www.w3.org/2000/svg" className="heart-svg">
              <defs>
                <radialGradient id="hgrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#ff8fab"/>
                  <stop offset="50%" stopColor="#e06090"/>
                  <stop offset="100%" stopColor="#9b3a7a"/>
                </radialGradient>
                <filter id="hglow">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
              </defs>
              <path
                d="M50 85 C50 85 10 58 10 32 C10 18 20 8 34 8 C42 8 50 15 50 15 C50 15 58 8 66 8 C80 8 90 18 90 32 C90 58 50 85 50 85Z"
                fill="url(#hgrad)"
                filter="url(#hglow)"
              />
            </svg>
          </div>
        </div>

        {/* Main confession text */}
        <div className="confession-text text-center">
          <h2 className="confession-like">
            I <span className="like-word">LIKE YOU.</span> A LOT. <span className="like-heart">❤️</span>
          </h2>
          <p className="confession-reason body-text">
            Not because I expect anything from you,<br />
            but because that's genuinely how <em>you make me feel.</em>
          </p>
        </div>

        {/* Question */}
        {!response && (
          <div className="confession-question text-center">
            <p className="question-text">Would you let me know if you feel the same way?</p>
            <div className="confession-buttons">
              <button
                id="yes-btn"
                className="confession-btn btn-yes"
                onClick={handleYes}
              >
                <span className="btn-icon">❤️</span>
                Maybe I do
                <span className="btn-shimmer" aria-hidden="true" />
              </button>

              <button
                id="no-btn"
                ref={noBtnRef}
                className="confession-btn btn-no"
                onClick={handleNo}
                style={noStyle}
                aria-label="Let me think about it"
              >
                <span className="btn-icon">🌸</span>
                Let me think about it
              </button>
            </div>
            {noCount > 0 && (
              <p className="no-hint" aria-live="polite">
                {noCount === 1 && "It's okay, take your time... 🌸"}
                {noCount === 2 && "No rush at all... I'll be here 💕"}
              </p>
            )}
          </div>
        )}

        {/* Response overlay */}
        {response && (
          <div className="response-reveal">
            <div className="response-card">
              <div className="response-emoji">{response === 'yes' ? RESPONSE_YES.emoji : RESPONSE_NO.emoji}</div>
              <h3 className="response-title">{response === 'yes' ? RESPONSE_YES.title : RESPONSE_NO.title}</h3>
              <p className="response-message">{response === 'yes' ? RESPONSE_YES.message : RESPONSE_NO.message}</p>
              <div className="response-flowers" aria-hidden="true">❀ ❤ ❀</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
