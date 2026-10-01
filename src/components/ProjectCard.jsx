import React from 'react';

export const ProjectCard = ({ project, delay = 0 }) => {
  const hasLive = project.liveUrl && project.liveUrl !== '#';
  const hasGithub = project.githubUrl && project.githubUrl !== '#';

  return (
    <div className="project-card reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
          }}
        />
      </div>
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-card-tech">{project.tech}</p>
        <div className="project-card-actions">
          <a
            href={hasLive ? project.liveUrl : '#'}
            target={hasLive ? '_blank' : '_self'}
            rel={hasLive ? 'noopener noreferrer' : ''}
            title="Live Demo"
            aria-label="Live Demo"
            className={`project-action-icon ${!hasLive ? 'disabled' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a
            href={hasGithub ? project.githubUrl : '#'}
            target={hasGithub ? '_blank' : '_self'}
            rel={hasGithub ? 'noopener noreferrer' : ''}
            title="GitHub"
            aria-label="GitHub"
            className={`project-action-icon ${!hasGithub ? 'disabled' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
