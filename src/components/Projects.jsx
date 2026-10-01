import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const Projects = () => {
  return (
    <section id="projects" className="section-alternate">
      <div className="container">
        <div className="reveal">
          <h2 className="heading-lg">Featured Projects</h2>
        </div>
        <div className="projects-grid" id="projects-grid">
          {projects.map((proj, idx) => (
            <ProjectCard key={proj.id || idx} project={proj} delay={(idx % 6) * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};
