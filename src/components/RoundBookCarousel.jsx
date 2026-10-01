import React, { useRef, useEffect, useState, useCallback } from 'react';
import './RoundBookCarousel.css';

export const RoundBookCarousel = ({ books = [] }) => {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);

  // Animation values stored in Refs to avoid React re-render lags
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const animFrameRef = useRef(null);
  const isInViewRef = useRef(true);

  // Active book index for counter display (01 / N)
  const [activeIndex, setActiveIndex] = useState(0);

  const totalBooks = books.length;
  const stepAngle = totalBooks > 0 ? 360 / totalBooks : 0;

  // Responsive radius calculation
  const getRadius = useCallback(() => {
    if (typeof window === 'undefined') return 360;
    const width = window.innerWidth;
    if (width <= 639) return 210;
    if (width <= 992) return 290;
    return 360;
  }, []);

  // Update 3D card transforms directly in DOM
  const updateCards3D = useCallback(() => {
    if (!totalBooks) return;
    const radius = getRadius();
    const currentAngle = currentAngleRef.current;

    let maxCos = -2;
    let closestIdx = 0;

    books.forEach((_, idx) => {
      const cardEl = cardRefs.current[idx];
      if (!cardEl) return;

      const itemAngle = idx * stepAngle + currentAngle;
      const rad = (itemAngle * Math.PI) / 180;
      const cosVal = Math.cos(rad);

      if (cosVal > maxCos) {
        maxCos = cosVal;
        closestIdx = idx;
      }

      // Calculate opacity & scale based on 3D distance
      const opacity = Math.max(0.15, (0.45 + 0.55 * cosVal).toFixed(3));
      const isFront = cosVal > 0.94;
      const scale = isFront ? 1.05 : 0.95 + 0.05 * Math.max(0, cosVal);

      cardEl.style.transform = `rotateY(${itemAngle.toFixed(2)}deg) translateZ(${radius}px) scale(${scale.toFixed(3)})`;
      cardEl.style.opacity = opacity;
      cardEl.style.zIndex = Math.round((cosVal + 1) * 100);

      if (isFront) {
        cardEl.classList.add('is-active');
      } else {
        cardEl.classList.remove('is-active');
      }
    });

    // Throttled active index update for counter
    setActiveIndex((prev) => (prev !== closestIdx ? closestIdx : prev));
  }, [books, totalBooks, stepAngle, getRadius]);

  // Main requestAnimationFrame loop
  useEffect(() => {
    if (!totalBooks) return;

    const loop = () => {
      if (isInViewRef.current) {
        if (!isDraggingRef.current) {
          // Apply velocity inertia
          if (Math.abs(velocityRef.current) > 0.01) {
            currentAngleRef.current += velocityRef.current;
            velocityRef.current *= 0.93; // Friction
          } else {
            // Constant subtle auto-rotation (~0.06 deg/frame)
            currentAngleRef.current += 0.06;
          }
        }
        updateCards3D();
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [totalBooks, updateCards3D]);

  // IntersectionObserver to pause loop when offscreen
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(stageEl);
    return () => observer.disconnect();
  }, []);

  // Pointer Interaction Handlers (Mouse, Touch, Trackpad)
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    if (stageRef.current) stageRef.current.classList.add('is-dragging');
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    // Convert horizontal drag pixel delta to rotation angle
    const rotationSensitivity = 0.35;
    currentAngleRef.current += deltaX * rotationSensitivity;
    velocityRef.current = deltaX * rotationSensitivity * 0.8;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (stageRef.current) stageRef.current.classList.remove('is-dragging');
  };

  // Editorial Navigation Buttons (Next / Prev)
  const rotatePrev = () => {
    velocityRef.current = stepAngle * 0.15;
  };

  const rotateNext = () => {
    velocityRef.current = -stepAngle * 0.15;
  };

  const formatNumber = (num) => (num + 1 < 10 ? `0${num + 1}` : `${num + 1}`);

  return (
    <div className="round-carousel-container">
      <span className="round-carousel-header-tag">3D EDITORIAL COLLECTION</span>

      <div
        ref={stageRef}
        className="round-carousel-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="round-carousel-ring">
          {books.map((book, idx) => (
            <div
              key={book.id || idx}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="round-book-card"
            >
              <img
                src={book.img}
                alt={book.title}
                className="round-book-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = book.defaultImg;
                }}
              />
              <div className="round-book-info">
                <h4 className="round-book-title">{book.title}</h4>
                <p className="round-book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Navigation Row */}
      <div className="round-carousel-nav">
        <button className="round-nav-btn" onClick={rotatePrev} aria-label="Previous Book">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="round-nav-counter">
          {formatNumber(activeIndex)} / {formatNumber(totalBooks - 1)}
        </span>
        <button className="round-nav-btn" onClick={rotateNext} aria-label="Next Book">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
