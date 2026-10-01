import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Timeline } from './components/Timeline';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Certificates } from './components/Certificates';
import { Library } from './components/Library';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  useEffect(() => {
    // Scroll reveal intersection observer targeting all reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal, .reveal-slide-left, .reveal-slide-right, .timeline-row, .timeline-card, .project-card, .achievement-card, .book-card-vertical'
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timer1 = setTimeout(observeElements, 200);
    const timer2 = setTimeout(() => {
      document.querySelectorAll('.timeline-row, .reveal-slide-left, .reveal-slide-right').forEach((el) => {
        el.classList.add('active');
      });
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <TechStack />
      <Certificates />
      <Library />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
