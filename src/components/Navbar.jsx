import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [activeNav, setActiveNav] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id') || '';
        }
      });
      if (current) setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="nav" role="navigation" aria-label="Main Navigation">
      <div className="nav-brand">
        <a href="#hero" aria-label="Home">
          <img
            src="/images/logo/logo.png"
            alt="Pranav Srikrishnan Logo"
            className="nav-logo"
            onError={(e) => { e.currentTarget.src = '/images/logo/monogram-emblem.png'; }}
          />
        </a>
      </div>
      <div className="nav-links">
        <a href="#about" className={activeNav === 'about' ? 'active' : ''}>About</a>
        <a href="#timeline" className={activeNav === 'timeline' ? 'active' : ''}>Timeline</a>
        <a href="#projects" className={activeNav === 'projects' ? 'active' : ''}>Projects</a>
        <a href="#skills" className={activeNav === 'skills' ? 'active' : ''}>Tech Stack</a>
        <a href="#achievements" className={activeNav === 'achievements' ? 'active' : ''}>Certificates</a>
        <a href="#library" className={activeNav === 'library' ? 'active' : ''}>Library</a>
        <a href="#contact" className={activeNav === 'contact' ? 'active' : ''}>Contact</a>
      </div>
    </nav>
  );
};
