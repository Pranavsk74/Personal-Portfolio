document.addEventListener('DOMContentLoaded', () => {
  // Image Loading Effect Listener
  document.addEventListener('load', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.classList.add('img-loaded');
    }
  }, true);

  // Mark already loaded images (if any)
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) img.classList.add('img-loaded');
  });

  // Call initScrollAnimations AFTER loading data to ensure elements exist!
  initScrollAnimations();
  initActiveNav();
  
  // Show Skeletons
  showSkeletons('projects-grid', `<div class="project-card skeleton" style="height: 500px; grid-column: 1 / -1;"></div>` + `<div class="project-card skeleton" style="height: 450px;"></div>`.repeat(4));
  showSkeletons('achievements-grid', `<div class="achievement-card skeleton" style="height: 350px;"></div>`.repeat(6));
  showSkeletons('skills-container', `
    <div class="skills-category">
      <div class="skeleton" style="width: 200px; height: 40px; border-radius: 4px;"></div>
      <div class="skills-grid">
        ${`<div class="skill-item skeleton" style="height: 140px;"></div>`.repeat(5)}
      </div>
    </div>
  `.repeat(3));
  
  showSkeletons('library-track', `<div class="book-card-vertical skeleton" style="height: 360px;"></div>`.repeat(5));
  
  loadProjects().then(() => {
    initScrollAnimations();
    initProjectFocusZoom();
  });
  
  loadAchievements().then(() => {
    initScrollAnimations();
  });
  
  loadSkills().then(() => {
    initScrollAnimations();
  });
  
  loadLibrary().then(() => {
    initScrollAnimations();
    initLibraryScroll();
  });

  loadTrophies().then(() => {
    initScrollAnimations();
  });

  // Filter achievements
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      
      const cards = document.querySelectorAll('.achievement-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          // Small animation delay for reflow
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Click default active filter button (tech)
  const activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) activeBtn.click();

  // Simple hide/show nav on scroll
  let lastScrollY = window.scrollY;
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScrollY = window.scrollY;
  });

  initParticles();
});

function showSkeletons(containerId, html) {
  const container = document.getElementById(containerId);
  if (container) container.innerHTML = html;
}

function initActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active');
      }
    });
  });
}

function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal:not(.observed), .reveal-slide-left:not(.observed), .reveal-slide-right:not(.observed)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => {
    observer.observe(reveal);
    reveal.classList.add('observed');
  });
}

function initProjectFocusZoom() {
  const projectCards = document.querySelectorAll('.project-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If at least 40% of the card is visible, focus it
      if (entry.isIntersecting) {
        entry.target.classList.add('focused-card');
      } else {
        entry.target.classList.remove('focused-card');
      }
    });
  }, {
    rootMargin: "-20% 0px -20% 0px", // Trigger when card enters the middle 60% of viewport
    threshold: 0
  });

  projectCards.forEach(card => {
    observer.observe(card);
  });
}

const libraryBooks = [
  { img: "Books/Metamorphisis.jpg", title: "Metamorphosis", author: "Franz Kafka", defaultImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/Beyond good and Evil.jpg", title: "Beyond Good and Evil", author: "Friedrich Nietzsche", defaultImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/Crime and Punishment.jpg", title: "Crime and Punishment", author: "Fyodor Dostoevsky", defaultImg: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/Thus Spoke Zarusthra.jpg", title: "Thus Spoke Zarathustra", author: "Friedrich Nietzsche", defaultImg: "https://images.unsplash.com/photo-1455309036818-600020f4c549?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/1984.jpg", title: "1984", author: "George Orwell", defaultImg: "https://images.unsplash.com/photo-1524578971871-ca74f51e0691?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/Animal Farm.jpg", title: "Animal Farm", author: "George Orwell", defaultImg: "https://images.unsplash.com/photo-1589998059171-9899ea86200c?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/Pride and Prejudice.jpg", title: "Pride and Prejudice", author: "Jane Austen", defaultImg: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/The Republic.jpg", title: "The Republic", author: "Plato", defaultImg: "https://images.unsplash.com/photo-1511108690759-009324a90311?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/White Nights.jpg", title: "White Nights", author: "Fyodor Dostoevsky", defaultImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=600&auto=format&fit=crop" },
  { img: "Books/The Trial.jpg", title: "The Trial", author: "Franz Kafka", defaultImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=600&auto=format&fit=crop" }
];

async function loadLibrary() {
  const track = document.getElementById('library-track');
  if (!track) return;
  
  // Simulate tiny fetch delay for skeletons to be visible initially
  await new Promise(r => setTimeout(r, 100));
  
  let html = '';
  // Generate twice for infinite scroll
  [...libraryBooks, ...libraryBooks].forEach((book, idx) => {
    const delay = (idx % libraryBooks.length) * 0.1;
    html += `
      <div class="book-card-vertical reveal" style="transition-delay: ${delay}s;">
        <img src="${book.img}" alt="${book.title}" class="book-cover-img" onerror="this.src='${book.defaultImg}';">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-author">${book.author}</p>
      </div>
    `;
  });
  
  track.innerHTML = html;
}

function initLibraryScroll() {
  const wrapper = document.querySelector('.library-scroller-wrap');
  const scroller = document.querySelector('.library-scroller');
  if (!wrapper || !scroller) return;

  // Let CSS handle auto-rotate
  scroller.classList.add('auto-rotate-books');

  let isDown = false;
  let startX;
  let scrollLeft;

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    wrapper.style.cursor = 'grabbing';
    // Pause animation when dragging manually
    scroller.style.animationPlayState = 'paused';
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
    scroller.style.animationPlayState = '';
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.style.cursor = 'grab';
    scroller.style.animationPlayState = '';
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    wrapper.scrollLeft = scrollLeft - walk;
  });
}

// EXACTLY 5 Projects Fallback
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

const fallbackSkills = {
  "Languages": [
    { "name": "Python", "icon": "devicon-python-plain" },
    { "name": "C", "icon": "devicon-c-plain" },
    { "name": "C++", "icon": "devicon-cplusplus-plain" },
    { "name": "Java", "icon": "devicon-java-plain" },
    { "name": "TypeScript", "icon": "devicon-typescript-plain" }
  ],
  "Frameworks": [
    { "name": "React", "icon": "devicon-react-original" },
    { "name": "Node.js", "icon": "devicon-nodejs-plain" },
    { "name": "Flask", "icon": "devicon-flask-original" }
  ],
  "Databases": [
    { "name": "MySQL", "icon": "devicon-mysql-plain" },
    { "name": "PostgreSQL", "icon": "devicon-postgresql-plain" },
    { "name": "MongoDB", "icon": "devicon-mongodb-plain" }
  ],
  "ML Libraries": [
    { "name": "PyTorch", "icon": "devicon-pytorch-original" },
    { "name": "TensorFlow", "icon": "devicon-tensorflow-original" },
    { "name": "Keras", "icon": "assets/icons/keras.png" },
    { "name": "XGBoost", "icon": "fa-solid fa-code-branch" },
    { "name": "Pandas", "icon": "devicon-pandas-original" },
    { "name": "NumPy", "icon": "devicon-numpy-original" },
    { "name": "Scikit-learn", "icon": "scikit-learn.png" },
    { "name": "Seaborn", "icon": "fa-solid fa-chart-line" },
    { "name": "Matplotlib", "icon": "fa-solid fa-chart-pie" },
    { "name": "Tkinter", "icon": "fa-brands fa-python" }
  ],
  "Tools": [
    { "name": "Git", "icon": "devicon-git-plain" },
    { "name": "GitHub", "icon": "devicon-github-original" },
    { "name": "VS Code", "icon": "devicon-vscode-plain" },
    { "name": "REST APIs", "icon": "fa-solid fa-network-wired" },
    { "name": "Power BI", "icon": "fa-solid fa-chart-pie" },
    { "name": "Blender", "icon": "devicon-blender-original" },
    { "name": "Figma", "icon": "Figma logo.webp" }
  ]
};

const fallbackAchievements = [
  {
    "id": "iitm-foundation",
    "title": "IITM Foundation Level",
    "category": "Tech Certificates",
    "issuer": "IIT Madras",
    "pdf": "Certificates/Tech Certificates/IITM_Foundation.pdf"
  },
  {
    "id": "computational-finance",
    "title": "Computational Finance",
    "category": "Tech Certificates",
    "issuer": "NPTEL / IIT",
    "pdf": "Certificates/Tech Certificates/Computational_Finance.pdf"
  },
  {
    "id": "hands-on-ml",
    "title": "Hands on Machine Learning",
    "category": "Tech Certificates",
    "issuer": "Coursera / DeepLearning.AI",
    "pdf": "Certificates/Tech Certificates/Hands_on_Machine_learning.pdf"
  },
  {
    "id": "scikit-learn",
    "title": "Scikit Learn Certification",
    "category": "Tech Certificates",
    "issuer": "Inria",
    "pdf": "Certificates/Tech Certificates/Scikit_learn.pdf"
  },
  {
    "id": "mun",
    "title": "Model United Nations",
    "category": "Achievements",
    "issuer": "EIS",
    "pdf": "Certificates/Extra-Curricular Certificates/MUN_Certificate.pdf"
  },
  {
    "id": "aiu-sports",
    "title": "AIU Table Tennis Participation",
    "category": "Sports",
    "issuer": "Association of Indian Universities",
    "pdf": "Certificates/Extra-Curricular Certificates/AIU_Certificate.pdf"
  },
  {
    "id": "skream",
    "title": "SKREAM Sports Festival",
    "category": "Sports",
    "issuer": "KJSCE",
    "pdf": "Certificates/Extra-Curricular Certificates/SKREAM_Certificate.pdf"
  },
  {
    "id": "house-cup",
    "title": "House Cup Winner",
    "category": "Sports",
    "issuer": "DAV",
    "pdf": "Certificates/Extra-Curricular Certificates/House_Cup_Certificate.pdf"
  },
  {
    "id": "music-abs",
    "category": "Music",
    "title": "Akhil Bharatiya Sangh",
    "issuer": "Music Certification",
    "pdf": "Certificates/Extra-Curricular Certificates/Akhil_Bharatiya_Sangh.pdf"
  },
  {
    "id": "music-ghs",
    "category": "Music",
    "title": "Grand Highstreet Mall",
    "issuer": "Performance Certificate",
    "pdf": "Certificates/Extra-Curricular Certificates/GHS_Mall_Certificate.pdf"
  },
  {
    "id": "loa-iqac",
    "title": "Letter of Appreciation – IQAC",
    "category": "achievements",
    "issuer": "IQAC",
    "pdf": "Certificates/LOA_IQAC.pdf"
  }
];

const fallbackTrophies = [
  {
    "id": "music-abs-trophy",
    "category": "music",
    "title": "Akhil Bharatiya Sangh",
    "issuer": "Music Trophy",
    "img": "Trophies/akhil.png"
  },
  {
    "id": "poona-medal",
    "title": "Poona Sangeetha Sabha",
    "category": "music",
    "issuer": "Music Medal",
    "img": "Trophies/poona.png"
  },
  {
    "id": "east-zone",
    "title": "East Zone Competition",
    "category": "achievements",
    "issuer": "Trophy",
    "img": "Trophies/east.png"
  },
  {
    "id": "international",
    "title": "International Competition",
    "category": "achievements",
    "issuer": "Trophy",
    "img": "Trophies/international.png"
  },
  {
    "id": "national",
    "title": "National Competition",
    "category": "achievements",
    "issuer": "Trophy",
    "img": "Trophies/national.png"
  },
  {
    "id": "somaiya",
    "title": "Somaiya Games",
    "category": "sports",
    "issuer": "Trophy",
    "img": "Trophies/somaiya.png"
  },
  {
    "id": "ghs-trophy",
    "title": "Grand Highstreet Mall",
    "category": "music",
    "issuer": "Trophy",
    "img": "Trophies/ghs.png"
  }
];

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  let projects = [];
  try {
    const res = await fetch('projects.json');
    if (!res.ok) throw new Error("Fetch failed");
    projects = await res.json();
  } catch (err) {
    console.warn('Falling back to local projects data due to CORS/Fetch error:', err);
    projects = fallbackProjects;
  }

  // Ensure exactly 5 projects exist
  grid.innerHTML = '';
  projects.slice(0, 5).forEach((proj, idx) => {
    const isFeatured = idx === 0;
    const delay = idx * 0.1;
    
    const tagsHtml = proj.tags ? proj.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('') : '';
    const bulletsHtml = proj.highlights ? proj.highlights.map(h => `<li>${h}</li>`).join('') : '';
    
    // Always include links, conditionally disabled if "#"
    let linksHtml = `<div class="project-links">`;
    linksHtml += `<a href="${proj.githubUrl}" target="${proj.githubUrl !== '#' ? '_blank' : '_self'}" aria-label="GitHub" onclick="event.stopPropagation()" style="${proj.githubUrl === '#' ? 'opacity:0.2; cursor:not-allowed;' : ''}"><i class="fa-brands fa-github"></i></a>`;
    linksHtml += `<a href="${proj.liveUrl}" target="${proj.liveUrl !== '#' ? '_blank' : '_self'}" aria-label="Live Site" onclick="event.stopPropagation()" style="${proj.liveUrl === '#' ? 'opacity:0.2; cursor:not-allowed;' : ''}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
    linksHtml += `<a href="${proj.pptUrl}" target="${proj.pptUrl !== '#' ? '_blank' : '_self'}" aria-label="Presentation" onclick="event.stopPropagation()" style="${proj.pptUrl === '#' ? 'opacity:0.2; cursor:not-allowed;' : ''}"><i class="fa-solid fa-file-powerpoint"></i></a>`;
    linksHtml += `</div>`;

    grid.innerHTML += `
      <div class="project-card ${isFeatured ? 'project-card-featured' : ''} reveal" style="transition-delay: ${delay}s;">
        <div class="project-image-wrapper">
          <img src="${proj.image}" alt="${proj.title}" class="project-image" loading="lazy" onerror="console.log('Image failed:', this.src); this.style.display='none';">
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          ${bulletsHtml ? `<ul class="project-bullets">${bulletsHtml}</ul>` : ''}
          <div class="project-tags">
            ${tagsHtml}
          </div>
          ${linksHtml}
        </div>
      </div>
    `;
  });
}

async function loadAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;

  let achievements = [];
  try {
    const res = await fetch('achievements.json');
    if (!res.ok) throw new Error("Fetch failed");
    achievements = await res.json();
  } catch (err) {
    console.warn('Falling back to local achievements data due to CORS/Fetch error:', err);
    achievements = fallbackAchievements;
  }

  grid.innerHTML = '';
  achievements.forEach((ach, idx) => {
    let filterClass = '';
    if (ach.category === 'Music') filterClass = 'music';
    else if (ach.category === 'Sports' || ach.category === 'Achievements') filterClass = 'achievements';
    else if (ach.category === 'Tech Certificates' || ach.category === 'Tech') filterClass = 'tech';

    const pdfLinkHtml = ach.pdf ? `<a href="${ach.pdf}" target="_blank" class="ach-pdf-link"><i class="fa-solid fa-file-pdf"></i> View Certificate</a>` : '';

    let previewContent = '';
    if (ach.img) {
      previewContent = `<img src="${ach.img}" alt="${ach.title}" loading="lazy" onerror="this.src='fallback.png';" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">`;
    } else if (ach.pdf) {
      previewContent = `<embed src="${ach.pdf}#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf">`;
    } else {
      previewContent = `<i class="fa-solid fa-award" style="font-size: 3rem; color: var(--accent); opacity: 0.5;"></i>`;
    }

    const isVisible = filterClass === 'tech';

    const delay = (idx % 10) * 0.1;
    grid.innerHTML += `
      <div class="achievement-card reveal" data-category="${filterClass}" style="transition-delay: ${delay}s; display: ${isVisible ? 'flex' : 'none'}; opacity: ${isVisible ? '1' : '0'};">
        <div class="ach-img-wrapper">
          ${previewContent}
        </div>
        <div class="ach-content">
          <span class="achievement-cat">${ach.category || 'Achievement'}</span>
          <h3 class="achievement-title">${ach.title}</h3>
          <div class="achievement-issuer">${ach.issuer || ''}</div>
          ${pdfLinkHtml}
        </div>
      </div>
    `;
  });
}

async function loadTrophies() {
  const grid = document.getElementById('trophies-grid');
  if (!grid) return;
  
  let trophies = [];
  try {
    const res = await fetch('trophies.json');
    if (!res.ok) throw new Error("Fetch failed");
    trophies = await res.json();
  } catch (err) {
    console.warn('Falling back to local trophies data:', err);
    trophies = fallbackTrophies;
  }

  grid.innerHTML = '';
  trophies.forEach((t, idx) => {
    const delay = (idx % 10) * 0.1;
    grid.innerHTML += `
      <div class="trophy-card reveal" style="transition-delay: ${delay}s;">
        <div class="trophy-img-wrapper" style="position: relative;">
          <img src="${t.img}" alt="${t.title}" loading="lazy" onerror="this.src='fallback.png';">
        </div>
        <div class="trophy-content">
          <h3 class="trophy-title">${t.title}</h3>
        </div>
      </div>
    `;
  });
}

async function loadSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  let skillsData = {};
  try {
    const res = await fetch('skills.json');
    if (!res.ok) throw new Error("Fetch failed");
    skillsData = await res.json();
  } catch (err) {
    console.warn('Falling back to local skills data due to CORS/Fetch error:', err);
    skillsData = fallbackSkills;
  }

  container.innerHTML = '';
  let catIdx = 0;
  for (const [category, skills] of Object.entries(skillsData)) {
    let skillIdx = 0;
    const skillsHtml = skills.map(skill => {
      const delay = skillIdx * 0.1;
      skillIdx++;
      let iconHtml = '';
      if (skill.icon.includes('.png') || skill.icon.includes('.jpg') || skill.icon.includes('.webp') || skill.icon.includes('.svg')) {
        iconHtml = `<img src="${skill.icon}" alt="${skill.name}" class="skill-icon" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg'">`;
      } else {
        const iconClass = skill.icon.startsWith('devicon') || skill.icon.startsWith('fa-') ? skill.icon : skill.icon;
        iconHtml = `<i class="${iconClass} skill-icon"></i>`;
      }
      return `
        <div class="skill-item reveal" style="transition-delay: ${delay}s;">
          ${iconHtml}
          <span class="skill-name">${skill.name}</span>
        </div>
      `;
    }).join('');

    container.innerHTML += `
      <div class="skills-category reveal" style="transition-delay: ${catIdx * 0.1}s;">
        <h3 class="skills-category-title">${category}</h3>
        <div class="skills-grid">
          ${skillsHtml}
        </div>
      </div>
    `;
    catIdx++;
  }
}

// Interactive particles background
function initParticles() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  const colors = ['rgba(139, 94, 60, 0.5)', 'rgba(139, 94, 60, 0.3)', 'rgba(107, 107, 107, 0.4)'];
  
  let mouse = { x: -1000, y: -1000 };
  
  function resize() {
    const parent = canvas.parentElement;
    width = parent.offsetWidth;
    height = parent.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    initDots();
  }
  
  function initDots() {
    particles = [];
    const numParticles = Math.floor((width * height) / 12000); // subtle density
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
  }
  
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });
  
  window.addEventListener('resize', resize);
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      // Floating
      p.baseX += p.vx;
      p.baseY += p.vy;
      
      // Wrap
      if (p.baseX < -10) p.baseX = width + 10;
      if (p.baseX > width + 10) p.baseX = -10;
      if (p.baseY < -10) p.baseY = height + 10;
      if (p.baseY > height + 10) p.baseY = -10;
      
      let targetX = p.baseX;
      let targetY = p.baseY;
      
      // Mouse interaction
      const dx = mouse.x - p.baseX;
      const dy = mouse.y - p.baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 180) {
        // Move towards cursor slightly
        const force = (180 - dist) / 180;
        targetX += dx * force * 0.15;
        targetY += dy * force * 0.15;
      }
      
      p.x += (targetX - p.x) * 0.1;
      p.y += (targetY - p.y) * 0.1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  resize();
  animate();
}
