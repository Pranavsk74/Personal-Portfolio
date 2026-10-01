const fallbackProjects = [
  {
    "id": "solex",
    "title": "Sneaker Shop",
    "description": "A full-stack sneaker marketplace that unifies multiple brands into a single platform with advanced filtering, cart, wishlist, and real-time interaction.",
    "tags": ["React", "Node.js", "PostgreSQL", "REST API"],
    "image": "Projects/SoleX-Photo.jpeg",
    "githubUrl": "https://github.com/Shaurya2k06/wpl-miniproject",
    "liveUrl": "https://wpl-miniproject-swart.vercel.app/",
    "pptUrl": "https://canva.link/f55357kqfzl58sz"
  },
  {
    "id": "ticket-booking",
    "title": "Ticket Booking System",
    "description": "A comprehensive ticket booking system.",
    "tags": ["React", "Node.js", "Express", "MongoDB"],
    "image": "Projects/bustrain.jpg",
    "githubUrl": "https://github.com/Pranavsk74/Ticket-Booking-System",
    "liveUrl": "https://ticket-booking-systemnew.vercel.app/",
    "pptUrl": "https://canva.link/5sardvf6j7uksco"
  },
  {
    "id": "sentimengine",
    "title": "Sentimengine",
    "description": "Sentiment Model application for analyzing text sentiments accurately.",
    "tags": ["Python", "Machine Learning", "NLP"],
    "image": "Projects/Sentimental.jpg",
    "githubUrl": "https://github.com/Pranavsk74/Sentimengine",
    "liveUrl": "#",
    "pptUrl": "#"
  },
  {
    "id": "ocr-system",
    "title": "OCR System",
    "description": "Optical Character Recognition system for extracting text from images.",
    "tags": ["Python", "OpenCV", "Tesseract"],
    "image": "Projects/OCR.jpg",
    "githubUrl": "https://github.com/Pranavsk74/OCR",
    "liveUrl": "#",
    "pptUrl": "https://www.canva.com/design/DAHItr2E29Y/k8UwU8e_ON_1J--YGAyhKg/edit"
  },
  {
    "id": "bank-churn",
    "title": "Bank Churn Prediction",
    "description": "A machine learning project to predict bank customer churn.",
    "tags": ["Python", "Scikit-learn", "Pandas", "Flask"],
    "image": "Projects/customer churn.jpg",
    "githubUrl": "https://github.com/Pranavsk74/Bank-Churn",
    "liveUrl": "https://bank-churn-phi.vercel.app/",
    "pptUrl": "#"
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  if (!projectId) {
    document.getElementById('project-container').innerHTML = `
      <div class="container" style="padding-top: 150px; text-align: center; min-height: 70vh;">
        <h1 class="heading-md">Project Not Found</h1>
        <a href="index.html#projects" class="btn btn-primary" style="margin-top: 2rem;">Return to Portfolio</a>
      </div>
    `;
    return;
  }

  try {
    let projects = [];
    try {
      const res = await fetch('projects.json');
      if (!res.ok) throw new Error("Fetch failed");
      projects = await res.json();
    } catch (e) {
      console.warn("Falling back to local data due to CORS error on file://");
      projects = fallbackProjects;
    }
    
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      document.getElementById('project-container').innerHTML = `
        <div class="container" style="padding-top: 150px; text-align: center; min-height: 70vh;">
          <h1 class="heading-md">Project Not Found</h1>
          <a href="index.html#projects" class="btn btn-primary" style="margin-top: 2rem;">Return to Portfolio</a>
        </div>
      `;
      return;
    }

    renderProject(project);

  } catch (err) {
    console.error('Error loading project details:', err);
    document.getElementById('project-container').innerHTML = `
      <div class="container" style="padding-top: 150px; text-align: center; min-height: 70vh;">
        <h1 class="heading-md">Error Loading Project</h1>
        <a href="index.html#projects" class="btn btn-primary" style="margin-top: 2rem;">Return to Portfolio</a>
      </div>
    `;
  }
});

function renderProject(project) {
  const container = document.getElementById('project-container');
  
  const tagsHtml = project.tags.map(tag => `<span class="project-tag-large">${tag}</span>`).join('');
  
  const featuresHtml = project.features && project.features.length > 0 
    ? project.features.map(f => `<li>${f}</li>`).join('')
    : '<li>Features coming soon...</li>';

  const screenshotsHtml = project.screenshots && project.screenshots.length > 0
    ? project.screenshots.map(s => `<img src="${s}" alt="Screenshot">`).join('')
    : '';

  const linksHtml = `
    <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
      <a href="${project.githubUrl}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github" style="margin-right: 8px;"></i> View Code</a>
      <a href="${project.pptUrl}" target="_blank" class="btn"><i class="fa-solid fa-desktop" style="margin-right: 8px;"></i> Presentation</a>
    </div>
  `;

  container.innerHTML = `
    <section class="project-hero">
      <div class="container reveal active">
        <a href="index.html#projects" class="back-link"><i class="fa-solid fa-arrow-left"></i> Back to Projects</a>
        <h1 class="heading-xl">${project.title}</h1>
        <p class="text-lead" style="margin-top: 1rem;">${project.tagline}</p>
        <div class="project-tags-large">
          ${tagsHtml}
        </div>
        ${linksHtml}
        <img src="${project.image}" alt="${project.title}" class="project-hero-img" onerror="console.log('Image failed:', this.src); this.style.display='none';">
      </div>
    </section>

    <section class="section-alternate">
      <div class="container reveal active">
        <div class="project-grid">
          <div>
            <h2 class="heading-md">Overview</h2>
            <p class="text-body" style="margin-top: 1.5rem; font-size: 1.1rem; line-height: 1.8;">${project.description}</p>
            
            <h2 class="heading-md" style="margin-top: 3rem;">The Problem</h2>
            <p class="text-body" style="margin-top: 1.5rem; font-size: 1.1rem; line-height: 1.8;">${project.problem}</p>
            
            <h2 class="heading-md" style="margin-top: 3rem;">The Solution</h2>
            <p class="text-body" style="margin-top: 1.5rem; font-size: 1.1rem; line-height: 1.8;">${project.solution}</p>
          </div>
          <div>
            <div style="background: var(--bg-card); padding: 3rem; border: 1px solid var(--border-color); border-radius: 8px; position: sticky; top: 120px;">
              <h2 class="heading-sm" style="margin-bottom: 2rem;">Key Features</h2>
              <ul class="project-features">
                ${featuresHtml}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${screenshotsHtml ? `
    <section>
      <div class="container reveal active">
        <h2 class="heading-lg" style="text-align: center;">Gallery</h2>
        <div class="screenshot-grid">
          ${screenshotsHtml}
        </div>
      </div>
    </section>
    ` : ''}
  `;
}
