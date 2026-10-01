import React, { useEffect, useRef, useState } from 'react';
import { personalPhotos } from '../data/personalPhotos';

export const DeckCarousel = ({ photos = personalPhotos }) => {
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const [isDealt, setIsDealt] = useState(false);

  // Trigger initial deck stack -> deal entrance sequence
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => {
              setIsDealt(true);
            }, 400);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Autonomous 5-second continuous linear revolving loop
  useEffect(() => {
    if (!isDealt) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animId;
    let lastTime = performance.now();

    const loop = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (scrollTrackRef.current) {
        const track = scrollTrackRef.current;
        const halfWidth = track.scrollWidth / 2;

        if (halfWidth > 0) {
          // Exactly 1 complete 360° revolution every 10.0 seconds (reduced by 50%)
          const speedPixelsPerSec = halfWidth / 10.0;
          track.scrollLeft += speedPixelsPerSec * delta;

          // Seamless infinite wrap at half width boundary
          if (track.scrollLeft >= halfWidth) {
            track.scrollLeft -= halfWidth;
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDealt]);

  // Rotation angles for initial stacked deck phase
  const deckRotations = [-8, 6, -4, 7, -5, 3, -6];

  // Duplicate photos for infinite seamless wrap
  const displayPhotos = [...photos, ...photos];

  return (
    <div className="deck-carousel-section" ref={containerRef}>
      <div className="deck-scroll-wrapper" ref={scrollTrackRef}>
        <div className={`deck-track ${isDealt ? 'dealt-carousel' : 'stacked-deck'}`}>
          {displayPhotos.map((photo, idx) => {
            const rot = deckRotations[idx % deckRotations.length];
            const dealDelay = `${(idx % photos.length) * 0.08}s`;
            const zIndex = displayPhotos.length - idx;

            return (
              <div
                key={idx}
                className="deck-card-item"
                style={{
                  '--stack-rot': `${rot}deg`,
                  '--deal-delay': dealDelay,
                  zIndex: isDealt ? 'auto' : zIndex,
                }}
              >
                <div className="deck-card-inner">
                  <img
                    src={photo.img}
                    alt={photo.alt || `Personal photo ${idx + 1}`}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
