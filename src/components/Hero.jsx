import React from 'react';

export const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-editorial-stage">
        <img
          src="/images/hero/final-hero.png"
          alt="Pranav Srikrishnan Hero Artwork"
          className="hero-photo-img"
          loading="eager"
          fetchPriority="high"
          onError={(e) => { e.currentTarget.src = '/images/hero/final-hero.png'; }}
        />
      </div>
    </section>
  );
};
