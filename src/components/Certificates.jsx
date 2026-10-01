import React, { useState } from 'react';
import { certificates } from '../data/certificates';

export const Certificates = () => {
  const [activeFilter, setActiveFilter] = useState('tech');

  const getFilterClass = (category) => {
    if (category === 'Music') return 'music';
    if (category === 'Sports' || category === 'Achievements') return 'achievements';
    if (category === 'Tech Certificates' || category === 'Tech') return 'tech';
    return 'all';
  };

  const filteredCerts = certificates.filter((cert) => {
    if (activeFilter === 'all') return true;
    return getFilterClass(cert.category) === activeFilter;
  });

  return (
    <section id="achievements" className="section-alternate">
      <div className="container">
        <div className="reveal">
          <h2 className="heading-lg">Certificates & Achievements</h2>
        </div>

        <div className="achievements-filter reveal">
          <button
            className={`filter-btn ${activeFilter === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tech')}
          >
            Tech Certificates
          </button>
          <button
            className={`filter-btn ${activeFilter === 'music' ? 'active' : ''}`}
            onClick={() => setActiveFilter('music')}
          >
            Music
          </button>
          <button
            className={`filter-btn ${activeFilter === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveFilter('achievements')}
          >
            Achievements & Sports
          </button>
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
        </div>

        <div className="achievements-grid" id="achievements-grid">
          {filteredCerts.map((ach, idx) => (
            <div key={ach.id || idx} className="achievement-card reveal" style={{ transitionDelay: `${(idx % 6) * 0.1}s` }}>
              <div className="ach-img-wrapper">
                {ach.img ? (
                  <img src={ach.img} alt={ach.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : ach.pdf ? (
                  <embed src={`${ach.pdf}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" style={{ width: '100%', height: '100%' }} />
                ) : (
                  <i className="fa-solid fa-award" style={{ fontSize: '3rem', color: 'var(--accent)', opacity: 0.5 }}></i>
                )}
              </div>
              <div className="ach-content">
                <span className="achievement-cat">{ach.category || 'Achievement'}</span>
                <h3 className="achievement-title">{ach.title}</h3>
                <div className="achievement-issuer">{ach.issuer || ''}</div>
                {ach.pdf && (
                  <a href={ach.pdf} target="_blank" rel="noopener noreferrer" className="ach-pdf-link">
                    <i className="fa-solid fa-file-pdf"></i> View Certificate
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
