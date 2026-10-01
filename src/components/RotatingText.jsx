import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const DEFAULT_WORDS = [
  'Machine Learning',
  'Generative AI',
  'Computer Vision',
  'Full-Stack Products',
  'Data-Driven Systems'
];

export const RotatingText = ({ words = DEFAULT_WORDS, prefix = 'I WORK WITH' }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('.rotating-char');
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: '60%', rotateX: -40 },
          {
            opacity: 1,
            y: '0%',
            rotateX: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: 'power2.out',
          }
        );
      }
    }, containerRef);

    const interval = setInterval(() => {
      const chars = containerRef.current?.querySelectorAll('.rotating-char');
      if (chars && chars.length > 0) {
        gsap.to(chars, {
          opacity: 0,
          y: '-60%',
          rotateX: 40,
          duration: 0.3,
          stagger: 0.02,
          ease: 'power2.in',
          onComplete: () => {
            setIndex((prev) => (prev + 1) % words.length);
          },
        });
      } else {
        setIndex((prev) => (prev + 1) % words.length);
      }
    }, 2800);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, [index, words]);

  const currentWord = words[index];

  return (
    <div className="rotating-text-wrapper" ref={containerRef}>
      <span className="rotating-prefix">{prefix}</span>
      <div className="rotating-word-box">
        {currentWord.split('').map((char, i) => (
          <span
            key={`${index}-${i}`}
            className="rotating-char"
            style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};
