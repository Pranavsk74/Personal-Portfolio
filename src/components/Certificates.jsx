import React, { useState } from 'react';
import { certificates } from '../data/certificates';

export const Certificates = () => {
  const [activeFilter, setActiveFilter] = useState('tech');

  const normalizeCategory = (cat) => {
    if (!cat) return '';
    const lower = cat.toLowerCase().trim();
    if (lower.includes('tech')) return 'tech';
    if (lower.includes('sport')) return 'sports';
    if (lower.includes('music')) return 'music';
    if (lower.includes('achievement')) return 'achievements';
    return lower;
  };

  const filteredCerts = certificates.filter((cert) => {
    if (activeFilter === 'all') return true;
    const certCat = normalizeCategory(cert.category);
    return certCat === activeFilter;
  });

  return (
    <section id="achievements" className="section-alternate">
      <div className="container">
        <div className="reveal active">
          <h2 className="heading-lg">Certificates & Achievements</h2>
        </div>

        <div className="achievements-filter reveal active">
          <button
            className={`filter-btn ${activeFilter === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tech')}
          >
            Tech Certificates
          </button>
          <button
            className={`filter-btn ${activeFilter === 'sports' ? 'active' : ''}`}
            onClick={() => setActiveFilter('sports')}
          >
            Sports
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
            Achievements
          </button>
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
        </div>

        <div className="achievements-grid" id="achievements-grid">
          {filteredCerts.length === 0 ? (
            <div className="no-certificates-msg">
              <p>No certificates available in this category.</p>
            </div>
          ) : (
            filteredCerts.map((ach, idx) => (
              <div
                key={ach.id || `${activeFilter}-${idx}`}
                className="achievement-card reveal active"
                style={{ transitionDelay: `${(idx % 6) * 0.05}s` }}
              >
                <div className="ach-img-wrapper">
                  {ach.img ? (
                    <img
                      src={ach.img}
                      alt={ach.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : ach.pdf ? (
                    <iframe
                      src={`${ach.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      title={ach.title}
                      className="ach-pdf-preview"
                      scrolling="no"
                    />
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

