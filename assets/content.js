export const profile = {
  name: 'Shaurya Tiwari',
  initials: 'ST',
  role: 'AI/ML Systems and Full-Stack Engineer',
  location: 'Roorkee, India',
  status: 'Open to software and AI engineering roles',
  email: 'shaurya7068@gmail.com',
  phoneDisplay: '+91 70686 86959',
  phoneHref: '+917068686959',
  github: 'https://github.com/CyberXshaurya',
  linkedin: 'https://www.linkedin.com/in/shaurya-tiwari-b61510239/',
  resume: './ShauryaCV.pdf',
  intro: 'I design and ship end-to-end AI products: requirements, architecture, interfaces, APIs, data pipelines, automated tests, deployment, and operational reliability.',
  statement: 'I turn messy workflows into products that are fast, explainable, and hard to break.',
  availability: 'Available for full-time SDE, AI engineering, and applied ML opportunities.'
};

export const proofPoints = [
  { value: '13', label: 'stage document pipeline' },
  { value: '64', label: 'deterministic offline tests' },
  { value: '3x', label: 'faster workflow execution' },
  { value: '0.94+', label: 'mIoU on unseen samples' }
];

export const projects = [
  {
    id: 'signalboard',
    index: '01',
    title: 'Signalboard Feedback Intelligence',
    short: 'Evidence-grounded product-feedback synthesis with deterministic analytics and a complete human-review loop.',
    type: 'AI Product',
    source: 'Public GitHub repository',
    year: '2026',
    featured: true,
    visual: 'signalboard',
    tags: ['FastAPI', 'PostgreSQL', 'Human-in-the-loop AI', 'Playwright', 'Docker'],
    metrics: [
      { value: '20', label: 'passing tests' },
      { value: '83%+', label: 'statement coverage' },
      { value: '100%', label: 'evidence coverage' }
    ],
    details: [
      'Turns uploaded feedback into reviewable themes while preserving source evidence and explicit reviewer control.',
      'Keeps model-generated synthesis separate from deterministic counts, distributions, duplicate warnings, and frequency analysis.',
      'Ships as one Docker service with FastAPI, PostgreSQL, provider adapters, browser QA, immutable reports, and a Render blueprint.'
    ],
    repo: 'https://github.com/CyberXshaurya/Signalboard-feedback-intelligence',
    live: 'https://signalboard-feedback-intelligence.onrender.com/'
  },
  {
    id: 'jobsignal',
    index: '02',
    title: 'JobSignal 2.0',
    short: 'An AI job-search command center for hiring signals, role matching, decision-maker discovery, and tailored outreach.',
    type: 'Full-Stack AI',
    source: 'Public GitHub repository',
    year: '2026',
    featured: true,
    visual: 'jobsignal',
    tags: ['Node.js', 'Express', 'Gemini', 'Tavily', 'SQLite', 'JWT'],
    metrics: [
      { value: 'OTP', label: 'email authentication' },
      { value: '7d', label: 'secure sessions' },
      { value: 'Fit Lab', label: 'job-specific tailoring' }
    ],
    details: [
      'Detects companies likely to hire, ranks openings against a saved profile, finds relevant people, and drafts timely outreach.',
      'Adds per-user accounts, resume upload and parsing, persistent profiles, email OTP, httpOnly-cookie sessions, and authenticated AI routes.',
      'Fit Lab produces an honest fit score, evidence-based resume bullets, proof-of-work ideas, a cover note, and ATS keywords without inventing metrics.'
    ],
    repo: 'https://github.com/CyberXshaurya/Jobsignal-2.0'
  },
  {
    id: 'document-intelligence',
    index: '03',
    title: 'Multi-Format Document Intelligence',
    short: 'A production-minded ingestion-to-evaluation platform spanning text, spreadsheets, Office files, PDFs, and images.',
    type: 'AI Systems',
    source: 'CV case study',
    year: '2026',
    featured: true,
    visual: 'documents',
    tags: ['Python', 'ChromaDB', 'BM25', 'RRF', 'Cross-encoder', 'Pytest'],
    metrics: [
      { value: '13', label: 'pipeline stages' },
      { value: '11', label: 'file types' },
      { value: '64', label: 'offline tests' }
    ],
    details: [
      'Built OCR and vision fallbacks, token-aware chunking, persistent indexing, summarization, retrieval, and evaluation in one pipeline.',
      'Combined ChromaDB, BM25, reciprocal-rank fusion, and cross-encoder reranking behind interchangeable provider adapters.',
      'Added per-file isolation, corruption and zip-bomb checks, bounded retries, stale-index cleanup, persistent memory, and prompt-injection detection.'
    ]
  },
  {
    id: 'meteorite',
    index: '04',
    title: 'Meteorite Texture Classifier',
    short: 'A React and Flask application that classifies uploaded meteorite textures as metal-rich or silicate-rich.',
    type: 'Applied ML',
    source: 'Public GitHub repository',
    year: '2025',
    featured: false,
    visual: 'meteorite',
    tags: ['React', 'Vite', 'Flask', 'TensorFlow', 'Keras', 'Computer Vision'],
    metrics: [
      { value: '224', label: 'pixel model input' },
      { value: '2', label: 'composition classes' },
      { value: 'API', label: 'image prediction flow' }
    ],
    details: [
      'Uses a TensorFlow/Keras model behind a Flask prediction endpoint and a responsive React/Vite interface.',
      'Processes uploaded images, returns a metal-versus-silicate verdict, and reports estimated composition percentages.',
      'Packages the frontend and backend as a single application flow with file validation and JSON responses.'
    ],
    repo: 'https://github.com/CyberXshaurya/meteorite-classifier-app'
  },
  {
    id: 'third-eye',
    index: '05',
    title: 'Third Eye Procurement Workflow',
    short: 'Tender discovery, document parsing, relevance validation, and tailored proposal generation in one business workflow.',
    type: 'Workflow Automation',
    source: 'CV case study',
    year: '2025',
    featured: false,
    visual: 'procurement',
    tags: ['LangChain', 'Llama 3', 'Streamlit', 'Serper', 'Groq', 'SQLite'],
    metrics: [
      { value: '3x', label: 'faster execution' },
      { value: '0', label: 'observed crashes after redesign' },
      { value: 'Async', label: 'scraping workflow' }
    ],
    details: [
      'Integrated a Streamlit interface, LangChain orchestration, search and model APIs, web scraping, and SQLite persistence.',
      'Replaced unstable orchestration with sequential chains, improving execution speed threefold and eliminating observed crashes.',
      'Added deterministic domain validation before proposal generation to reject irrelevant signals and reduce unusable output.'
    ]
  },
  {
    id: 'grain-segmentation',
    index: '06',
    title: 'Six-Channel Grain Segmentation',
    short: 'M.Tech research fusing BSE microscopy with five EDS elemental maps for grain-scale segmentation.',
    type: 'ML Research',
    source: 'IIT Roorkee thesis',
    year: '2025-26',
    featured: false,
    visual: 'grains',
    tags: ['PyTorch', 'U-Net++', 'ResNet34', 'Mask R-CNN', 'Sliding Window'],
    metrics: [
      { value: '0.94+', label: 'mIoU' },
      { value: '95%+', label: 'pixel accuracy' },
      { value: '18,996', label: 'grains processed' }
    ],
    details: [
      'Built a six-channel segmentation pipeline and reached F1 above 0.90 across six classes on unseen cross-sample data.',
      'Benchmarked Mask R-CNN against U-Net++ and selected a ResNet34-backed U-Net++, improving mIoU by more than six points over a prior domain benchmark.',
      'Developed memory-safe high-resolution sliding-window inference on 16 GB VRAM with no boundary artifacts or out-of-memory failures.'
    ]
  }
];

export const capabilities = [
  {
    number: '01',
    title: 'Product-minded engineering',
    body: 'I begin with the workflow and failure modes, then choose architecture, interfaces, data contracts, and deployment around the actual problem.'
  },
  {
    number: '02',
    title: 'Reliable AI systems',
    body: 'I separate probabilistic model output from deterministic validation, analytics, evidence, retries, tests, and human control.'
  },
  {
    number: '03',
    title: 'End-to-end ownership',
    body: 'From a blank repository to a deployed product: frontend, APIs, databases, integrations, observability, documentation, and maintenance.'
  }
];

export const stack = [
  {
    label: 'Languages and core',
    items: ['Python', 'C++', 'SQL', 'JavaScript', 'Data Structures', 'Algorithms', 'OOP', 'Git']
  },
  {
    label: 'Backend and data',
    items: ['FastAPI', 'Flask', 'Express', 'REST APIs', 'PostgreSQL', 'SQLite', 'ChromaDB', 'Pandas', 'NumPy', 'ETL']
  },
  {
    label: 'AI and retrieval',
    items: ['PyTorch', 'TensorFlow', 'LangChain', 'BM25', 'Vector Search', 'RAG', 'Cross-encoders', 'RAGAS', 'scikit-learn']
  },
  {
    label: 'Delivery and quality',
    items: ['Pytest', 'Playwright', 'Docker', 'Render', 'CI-ready workflows', 'Documentation', 'Debugging', 'Deployment']
  },
  {
    label: 'Cloud and model APIs',
    items: ['Azure AI Foundry', 'GitHub Models', 'Gemini', 'Groq', 'Tavily', 'Serper', 'Ollama']
  }
];

export const timeline = [
  {
    years: '2024 - 2026',
    title: 'M.Tech, Space Science and Technology',
    place: 'Indian Institute of Technology Roorkee',
    note: 'CGPA 8.80 / 10. ML thesis in multi-channel grain segmentation.'
  },
  {
    years: '2024 - 2026',
    title: 'Placement Coordinator',
    place: 'Indian Institute of Technology Roorkee',
    note: 'Coordinated placement drives with 50+ companies and managed recruiter, schedule, and student communication.'
  },
  {
    years: '2022 - 2024',
    title: 'M.Sc, Applied Geology and Geoinformatics',
    place: 'National Institute of Technology Durgapur',
    note: 'CGPA 8.14 / 10.'
  },
  {
    years: '2018 - 2021',
    title: 'B.Sc (Hons), Geology',
    place: 'Banaras Hindu University',
    note: 'CGPA 8.30 / 10.'
  }
];

export const achievements = [
  {
    value: '1610',
    title: 'Codeforces Expert',
    body: 'Top 14% of active competitive programmers, with a best global contest rank of 797.'
  },
  {
    value: '50+',
    title: 'Company drives coordinated',
    body: 'Cross-functional coordination across recruiters, students, schedules, and institutional stakeholders.'
  },
  {
    value: '6+',
    title: 'mIoU point improvement',
    body: 'Research model improvement over a prior published domain benchmark.'
  }
];
