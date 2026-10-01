import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static portfolio datasets for Express endpoints
const projectsData = [
  {
    id: 'bgy-rover',
    title: 'Bhoomi Gat Yaan (BGY)',
    tech: 'Python · PyTorch · Transformers',
    image: '/images/projects/bgy-rover.jpg',
    githubUrl: '#',
    liveUrl: 'https://frontend-snowy-two-42.vercel.app/'
  },
  {
    id: 'meredian',
    title: 'Meredian',
    tech: 'Full Stack · Gemini API · MCP',
    image: '/images/projects/meredian.jpg',
    githubUrl: '#',
    liveUrl: 'https://meredianump.vercel.app/'
  },
  {
    id: 'mushroom-classification',
    title: 'Mushroom Classification',
    tech: 'Python · Scikit-learn · CatBoost',
    image: '/images/projects/mushroom.jpg',
    githubUrl: '#',
    liveUrl: 'https://msclassifier.vercel.app/'
  },
  {
    id: 'flight-price-prediction',
    title: 'Flight Price Prediction',
    tech: 'Python · Scikit-learn · Stacking',
    image: '/images/projects/flight-price.jpg',
    githubUrl: '#',
    liveUrl: 'https://flight-price-prediction-site.vercel.app/'
  },
  {
    id: 'solex',
    title: 'SoleX — Sneaker Shop',
    tech: 'React · Node.js · PostgreSQL',
    image: '/images/projects/solex.jpg',
    githubUrl: 'https://github.com/Shaurya2k06/wpl-miniproject',
    liveUrl: 'https://wpl-miniproject-swart.vercel.app/'
  },
  {
    id: 'ticket-booking',
    title: 'Ticket Booking System',
    tech: 'React · Node.js · MongoDB',
    image: '/images/projects/ticket-booking.jpg',
    githubUrl: 'https://github.com/Pranavsk74/Ticket-Booking-System',
    liveUrl: 'https://ticket-booking-systemnew.vercel.app/'
  },
  {
    id: 'sentimengine',
    title: 'Sentimengine',
    tech: 'Python · Machine Learning · NLP',
    image: '/images/projects/sentimengine.jpg',
    githubUrl: 'https://github.com/Pranavsk74/Sentimengine',
    liveUrl: '#'
  },
  {
    id: 'ocr-system',
    title: 'OCR System',
    tech: 'Python · OpenCV · Tesseract',
    image: '/images/projects/ocr-system.jpg',
    githubUrl: 'https://github.com/Pranavsk74/OCR',
    liveUrl: '#'
  }
];

const skillsData = {
  "AI & Generative AI": [
    { name: "Generative AI", icon: "fa-solid fa-brain" },
    { name: "Gemini API", icon: "fa-solid fa-bolt" },
    { name: "Prompt Engineering", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "Search Grounding", icon: "fa-solid fa-magnifying-glass" },
    { name: "Structured Output", icon: "fa-solid fa-code" },
    { name: "MCP Integration", icon: "fa-solid fa-plug" }
  ],
  "Machine Learning & Deep Learning": [
    { name: "PyTorch", icon: "devicon-pytorch-original" },
    { name: "Scikit-learn", icon: "fa-solid fa-chart-line" },
    { name: "Transformers", icon: "fa-solid fa-diagram-project" },
    { name: "Deep Learning", icon: "fa-solid fa-network-wired" },
    { name: "Computer Vision", icon: "fa-solid fa-eye" },
    { name: "OCR", icon: "fa-solid fa-file-invoice" },
    { name: "Time-Series Modeling", icon: "fa-solid fa-chart-area" },
    { name: "Feature Engineering", icon: "fa-solid fa-gears" },
    { name: "Hyperparameter Tuning", icon: "fa-solid fa-sliders" },
    { name: "Model Evaluation", icon: "fa-solid fa-chart-line" },
    { name: "Data Preprocessing", icon: "fa-solid fa-filter" }
  ],
  "Programming Languages": [
    { name: "Python", icon: "devicon-python-plain" },
    { name: "C", icon: "devicon-c-plain" },
    { name: "C++", icon: "devicon-cplusplus-plain" },
    { name: "Java", icon: "devicon-java-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" }
  ],
  "Full-Stack Development": [
    { name: "React", icon: "devicon-react-original" },
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Express", icon: "devicon-express-original" },
    { name: "Flask", icon: "devicon-flask-original" },
    { name: "REST APIs", icon: "fa-solid fa-network-wired" }
  ],
  "Data Analysis & Visualization": [
    { name: "Pandas", icon: "devicon-pandas-original" },
    { name: "NumPy", icon: "devicon-numpy-original" },
    { name: "EDA", icon: "fa-solid fa-chart-pie" },
    { name: "Tableau", icon: "fa-solid fa-chart-bar" },
    { name: "Power BI", icon: "fa-solid fa-chart-line" }
  ],
  "Databases & Tools": [
    { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
    { name: "MySQL", icon: "devicon-mysql-plain" },
    { name: "SQLite", icon: "devicon-sqlite-plain" },
    { name: "Git", icon: "devicon-git-plain" },
    { name: "GitHub", icon: "devicon-github-original" },
    { name: "Figma", icon: "fa-solid fa-pen-nib" },
    { name: "Vercel", icon: "fa-solid fa-cloud-arrow-up" }
  ]
};

const certificatesData = [
  {
    id: 'ey-risk',
    title: 'EY Technology Risk Simulation',
    category: 'Tech Certificates',
    issuer: 'Ernst & Young (EY)',
    pdf: '/documents/certificates/Certificates forage/EY certificate.pdf'
  },
  {
    id: 'deloitte-tech',
    title: 'Deloitte Technology Simulation',
    category: 'Tech Certificates',
    issuer: 'Deloitte',
    pdf: '/documents/certificates/Certificates forage/Delloite Certificate.pdf'
  },
  {
    id: 'goldman-sachs',
    title: 'Goldman Sachs Engineering',
    category: 'Tech Certificates',
    issuer: 'Goldman Sachs',
    pdf: '/documents/certificates/Certificates forage/Goldman Sachs.pdf'
  },
  {
    id: 'pwc-analytics',
    title: 'PwC Power BI & Analytics',
    category: 'Tech Certificates',
    issuer: 'PwC',
    pdf: '/documents/certificates/Certificates forage/PWc Certificate.pdf'
  },
  {
    id: 'iitm-foundation',
    title: 'IITM Foundation Level',
    category: 'Tech Certificates',
    issuer: 'IIT Madras',
    pdf: '/documents/certificates/Tech Certificates/IITM_Foundation.pdf'
  },
  {
    id: 'computational-finance',
    title: 'Computational Finance',
    category: 'Tech Certificates',
    issuer: 'NPTEL / IIT',
    pdf: '/documents/certificates/Tech Certificates/Computational_Finance.pdf'
  },
  {
    id: 'hands-on-ml',
    title: 'Hands on Machine Learning',
    category: 'Tech Certificates',
    issuer: 'Coursera / DeepLearning.AI',
    pdf: '/documents/certificates/Tech Certificates/Hands_on_Machine_learning.pdf'
  },
  {
    id: 'scikit-learn',
    title: 'Scikit Learn Certification',
    category: 'Tech Certificates',
    issuer: 'Inria',
    pdf: '/documents/certificates/Tech Certificates/Scikit_learn.pdf'
  },
  {
    id: 'music-abs',
    title: 'Akhil Bharatiya Gandharva Mahavidyalaya',
    category: 'Music',
    issuer: 'Indian Classical Music',
    pdf: '/documents/certificates/Extra-Curricular Certificates/Akhil_Bharatiya_Sangh.pdf'
  },
  {
    id: 'music-ghs',
    title: 'Grand Highstreet Mall Concert',
    category: 'Music',
    issuer: 'Music Performance',
    pdf: '/documents/certificates/Extra-Curricular Certificates/GHS_Mall_Certificate.pdf'
  },
  {
    id: 'aiu-sports',
    title: 'AIU Table Tennis Participation',
    category: 'Achievements',
    issuer: 'Association of Indian Universities',
    pdf: '/documents/certificates/Extra-Curricular Certificates/AIU_Certificate.pdf'
  },
  {
    id: 'skream',
    title: 'SKREAM Sports Festival',
    category: 'Achievements',
    issuer: 'KJSCE',
    pdf: '/documents/certificates/Extra-Curricular Certificates/SKREAM_Certificate.pdf'
  },
  {
    id: 'house-cup',
    title: 'House Cup Champion',
    category: 'Achievements',
    issuer: 'DAV Pune',
    pdf: '/documents/certificates/Extra-Curricular Certificates/House_Cup_Certificate.pdf'
  },
  {
    id: 'loa-iqac',
    title: 'Letter of Appreciation – IQAC',
    category: 'Achievements',
    issuer: 'IQAC',
    pdf: '/documents/certificates/Extra-Curricular Certificates/LOA_IQAC.pdf'
  },
  {
    id: 'mun',
    title: 'Model United Nations',
    category: 'Achievements',
    issuer: 'EIS Pune',
    pdf: '/documents/certificates/Extra-Curricular Certificates/MUN_Certificate.pdf'
  }
];

const booksData = [
  {
    id: "sense-and-sensibility",
    title: "Sense and Sensibility",
    author: "Jane Austen",
    img: "/images/projects/sense-and-sensibility.jpg",
    defaultImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "metamorphosis",
    title: "Metamorphosis",
    author: "Franz Kafka",
    img: "/images/books/Metamorphisis.jpg",
    defaultImg: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "beyond-good-and-evil",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    img: "/images/books/Beyond good and Evil.jpg",
    defaultImg: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    img: "/images/books/Crime and Punishment.jpg",
    defaultImg: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "thus-spoke-zarathustra",
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    img: "/images/books/Thus Spoke Zarusthra.jpg",
    defaultImg: "https://images.unsplash.com/photo-1455309036818-600020f4c549?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    img: "/images/books/1984.jpg",
    defaultImg: "https://images.unsplash.com/photo-1524578971871-ca74f51e0691?q=80&w=400&h=600&auto=format&fit=crop"
  },
  {
    id: "animal-farm",
    title: "Animal Farm",
    author: "George Orwell",
    img: "/images/books/Animal Farm.jpg",
    defaultImg: "https://images.unsplash.com/photo-1589998059171-9899ea86200c?q=80&w=400&h=600&auto=format&fit=crop"
  }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/projects', (req, res) => {
  res.json(projectsData);
});

app.get('/api/skills', (req, res) => {
  res.json(skillsData);
});

app.get('/api/certificates', (req, res) => {
  res.json(certificatesData);
});

app.get('/api/books', (req, res) => {
  res.json(booksData);
});

app.listen(PORT, () => {
  console.log(`Portfolio Express Server running on http://localhost:${PORT}`);
});
