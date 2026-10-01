import React, { useEffect, useRef, useState } from 'react';

export const ScrollSplitCard = ({
  title = "LET'S CONNECT",
  subtitle = "Currently open for new opportunities. Feel free to reach out to collaborate or say hi.",
  phone = "+91 9579773239",
  image = "/images/personal/Pranav_Photo_Formal.jpeg",
  cards = [
    {
      id: "linkedin",
      title: "LinkedIn",
      desc: "Connect with me professionally.",
      icon: "fa-brands fa-linkedin-in",
      url: "https://www.linkedin.com/in/pranav-srikrishnan-a6b670306/?isSelfProfile=true",
      bg: "#F4F1ED",
      color: "#2B2623",
    },
    {
      id: "github",
      title: "GitHub",
      desc: "Explore my projects and code.",
      icon: "fa-brands fa-github",
      url: "https://github.com/Pranavsk74",
      bg: "#E9E1D8",
      color: "#2B2623",
    },
    {
      id: "instagram",
      title: "Instagram",
      desc: "A little more beyond the code.",
      icon: "fa-brands fa-instagram",
      url: "https://www.instagram.com/pranav_skn/",
      bg: "#A8693A",
      color: "#F4F1ED",
    },
    {
      id: "email",
      title: "Email",
      desc: "srikrishnanpranav@gmail.com",
      icon: "fa-solid fa-envelope",
      url: "mailto:srikrishnanpranav@gmail.com",
      bg: "#2B2623",
      color: "#F4F1ED",
    },
    {
      id: "resume",
      title: "Resume",
      desc: "View my latest resume.",
      icon: "fa-solid fa-file-pdf",
      url: "/documents/resume/AI_Engineering_resume.pdf",
      bg: "#D8C7B7",
      color: "#2B2623",
    },
  ],
}) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="scroll-split-section">
      <div className="scroll-split-sticky">
        <div className="scroll-split-header">
          <h2 className="scroll-split-main-title">{title}</h2>
          <p className="scroll-split-subtitle">{subtitle}</p>
          <div className="scroll-split-phone">
            <a href={`tel:${phone.replace(/\s+/g, '')}`}>
              <i className="fa-solid fa-phone" style={{ marginRight: '0.5rem', color: 'var(--accent)' }}></i>
              {phone}
            </a>
          </div>
        </div>

        <div className="scroll-split-content-grid">
          {/* Left Split Cards */}
          <div className="scroll-split-column scroll-split-left">
            {cards.slice(0, 3).map((card, idx) => {
              const offsetX = (1 - scrollProgress) * (-40 * (3 - idx));
              const opacity = Math.min(0.3 + scrollProgress * 0.7, 1);

              return (
                <a
                  key={card.id}
                  href={card.url}
                  target={card.url.startsWith('http') || card.url.endsWith('.pdf') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="split-card-item"
                  style={{
                    backgroundColor: card.bg,
                    color: card.color,
                    transform: `translateX(${offsetX}px)`,
                    opacity,
                  }}
                >
                  <div className="split-card-icon-wrap">
                    <i className={card.icon}></i>
                  </div>
                  <div className="split-card-info">
                    <h3 className="split-card-title-text">{card.title}</h3>
                    <p className="split-card-desc" style={{ color: card.color, opacity: 0.85 }}>
                      {card.desc}
                    </p>
                  </div>
                  <span className="split-card-arrow">↗</span>
                </a>
              );
            })}
          </div>

          {/* Central Visual Image */}
          <div className="scroll-split-center-visual">
            <div className="split-visual-frame">
              <img
                src={image}
                alt="Pranav Srikrishnan Formal Photo"
                className="split-visual-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/images/personal/Dakshin Utsav Photo.jpeg';
                }}
              />
            </div>
          </div>

          {/* Right Split Cards */}
          <div className="scroll-split-column scroll-split-right">
            {cards.slice(3).map((card, idx) => {
              const offsetX = (1 - scrollProgress) * (40 * (idx + 1));
              const opacity = Math.min(0.3 + scrollProgress * 0.7, 1);

              return (
                <a
                  key={card.id}
                  href={card.url}
                  target={card.url.startsWith('http') || card.url.endsWith('.pdf') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="split-card-item"
                  style={{
                    backgroundColor: card.bg,
                    color: card.color,
                    transform: `translateX(${offsetX}px)`,
                    opacity,
                  }}
                >
                  <div className="split-card-icon-wrap">
                    <i className={card.icon}></i>
                  </div>
                  <div className="split-card-info">
                    <h3 className="split-card-title-text">{card.title}</h3>
                    <p className="split-card-desc" style={{ color: card.color, opacity: 0.85 }}>
                      {card.desc}
                    </p>
                  </div>
                  <span className="split-card-arrow">↗</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
