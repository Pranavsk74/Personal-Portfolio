import React from 'react';
import { RotatingText } from './RotatingText';
import { DeckCarousel } from './DeckCarousel';

export const About = () => {
  return (
    <>
      {/* Personal Deck Carousel Gallery */}
      <div className="personal-deck-container">
        <DeckCarousel />
      </div>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-editorial-wrap reveal">
            <div className="about-header">
              <span className="section-tag">BIOGRAPHY</span>
              <h2 className="heading-lg">About Me</h2>
            </div>

            <div className="about-grid-content">
              <div className="about-main-text">
                <p className="text-body-large">
                  I'm a Computer Engineering student focused on Machine Learning, AI engineering and full-stack development. I enjoy building systems that turn data, models and software into useful products.
                </p>
                <p className="text-body-muted" style={{ marginTop: '1rem', color: '#5A544F' }}>
                  Currently pursuing Computer Engineering at K J Somaiya School of Engineering, Mumbai, alongside a BS in Data Science from IIT Madras.
                </p>

                {/* Rotating Text Carousel */}
                <div className="about-carousel-container">
                  <RotatingText
                    prefix="SPECIALIZING IN"
                    words={[
                      'Machine Learning',
                      'Data Science',
                      'Deep Learning',
                      'Full Stack',
                      'AI',
                      'Data Analysis'
                    ]}
                  />
                </div>
              </div>

              {/* Resume Action Block */}
              <div className="about-resume-box">
                <span className="about-resume-label">CURRICULUM VITAE</span>
                <p className="about-resume-desc">
                  Detailed technical background, research projects, and academic achievements.
                </p>
                <a
                  href="/documents/resume/AI_Engineering_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-resume-action"
                >
                  <span className="resume-btn-text">VIEW / DOWNLOAD RESUME</span>
                  <span className="resume-btn-arrow">↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
