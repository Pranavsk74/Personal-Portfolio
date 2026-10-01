import React from 'react';
import { timelineData } from '../data/timeline';

export const Timeline = () => {
  return (
    <section id="timeline" className="section-alternate">
      <div className="container">
        <div className="reveal">
          <h2 className="heading-lg">Timeline & Experience</h2>
        </div>

        <div className="timeline-branching">
          {timelineData.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const revealClass = isLeft ? 'reveal-slide-left' : 'reveal-slide-right';
            return (
              <div key={item.id || idx} className={`timeline-row reveal ${revealClass}`}>
                <div className="timeline-card">
                  <div className="timeline-date">{item.date}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <p className="text-body" style={{ marginTop: '0.5rem' }}>
                    {item.desc}
                  </p>
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-link"
                      style={{ display: 'inline-block', marginTop: '0.75rem', color: 'var(--accent)', fontWeight: 500, fontSize: '0.9rem' }}
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
                    </a>
                  )}
                  {item.pdfUrl && (
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-link"
                      style={{ display: 'inline-block', marginTop: '0.75rem', color: 'var(--accent)', fontWeight: 500, fontSize: '0.9rem' }}
                    >
                      <i className="fa-solid fa-file-pdf"></i> View Certificate
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
