import { useEffect, useRef } from 'react';
import './HerIntro.css';

const photos = [
  { id: 1, file: '/photos/photo1.jpg', caption: 'That smile among the flowers... unforgettable 🌸', rot: '-3deg' },
  { id: 2, file: '/photos/photo2.jpg', caption: 'Glowing brighter than all those fairy lights ✨', rot: '2deg' },
  { id: 3, file: '/photos/photo3.jpg', caption: 'Graceful, elegant and simply you 💜', rot: '-1.5deg' },
  { id: 4, file: '/photos/photo4.jpg', caption: 'The one who makes my world colourful 🌷', rot: '3.5deg' },
];

export default function HerIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.polaroid').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 180);
            });
            entry.target.querySelector('.intro-text-block')?.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section her-intro-section" ref={sectionRef}>
      {/* Background decoration */}
      <div className="her-intro-bg-deco" aria-hidden="true" />

      <div className="container">
        <div className="intro-heading-wrap text-center">
          <span className="intro-pretag">— someone special —</span>
          <h2 className="heading-xl intro-heading">
            Someone Who Makes My<br />
            <em>Ordinary Days Feel Special.</em>
          </h2>
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-heart">❤</span>
            <div className="divider-line" />
          </div>
        </div>

        {/* Polaroid Gallery */}
        <div className="polaroid-grid">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="polaroid"
              style={{ '--rot': photo.rot, '--delay': `${i * 0.15}s` }}
            >
              <div className="polaroid-img-wrap">
                <img
                  src={photo.file}
                  alt={`Photo ${photo.id}`}
                  className="polaroid-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="polaroid-placeholder" style={{ display: 'none' }}>
                  <div className="placeholder-icon">📷</div>
                  <span>Add photo {photo.id}</span>
                  <small>Place photo{photo.id}.jpg in<br />public/photos/</small>
                </div>
              </div>
              <p className="polaroid-caption">{photo.caption}</p>
            </div>
          ))}
        </div>

        {/* Intro text */}
        <div className="intro-text-block">
          <blockquote className="intro-quote body-text text-center">
            "I don't know if you realise this, but there's something about you that makes
            everything feel a little more beautiful. Your smile, your way of talking,
            your little moments...&nbsp;
            <em>they have a special place in my heart.</em>"
          </blockquote>
        </div>
      </div>
    </section>
  );
}
