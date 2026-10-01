import React from 'react';
import { skillsData } from '../data/skills';

export const TechStack = () => {
  return (
    <section id="skills">
      <div className="container">
        <div className="reveal">
          <h2 className="heading-lg">Tech Stack & Expertise</h2>
        </div>
        <div className="skills-container" id="skills-container">
          {Object.entries(skillsData).map(([category, items]) => (
            <div key={category} className="skills-category reveal">
              <h3 className="skills-category-title">{category}</h3>
              <div className="skills-grid">
                {items.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-icon">
                      <i className={skill.icon}></i>
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
