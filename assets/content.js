window.PORTFOLIO_DATA = {
  profile: {
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
    intro: 'I design and ship end-to-end AI products: architecture, interfaces, APIs, data pipelines, evaluation, automated tests and deployment.',
    position: 'Application engineer with a research mindset and a bias toward systems that stay reliable when the demo ends.',
    availability: 'Available for full-time SDE, AI engineering and applied ML opportunities.'
  },
  proof: [
    { value: '13', label: 'stage document pipeline' },
    { value: '64', label: 'deterministic offline tests' },
    { value: '3×', label: 'faster workflow execution' },
    { value: '0.94+', label: 'mIoU on unseen samples' }
  ],
  projects: [
    {
      id: 'signalboard',
      episode: '01',
      title: 'Signalboard',
      subtitle: 'Feedback intelligence that can be traced, corrected and trusted.',
      category: 'AI PRODUCT / FASTAPI / POSTGRESQL',
      year: '2026',
      accent: '#7cf3d4',
      accentRgb: '124,243,212',
      poster: 'THE HUMAN REVIEW CUT',
      summary: 'Evidence-grounded product-feedback synthesis where AI proposes, deterministic code proves and humans decide.',
      metrics: [
        { value: '20', label: 'passing tests' },
        { value: '83%+', label: 'coverage' },
        { value: '100%', label: 'evidence coverage' }
      ],
      tags: ['FastAPI', 'PostgreSQL', 'Human review', 'Playwright', 'Docker'],
      details: [
        'Turns uploaded feedback into reviewable themes while preserving source evidence and explicit reviewer control.',
        'Separates model-generated synthesis from deterministic counts, distributions, duplicate warnings and frequency analysis.',
        'Ships as one Docker service with provider adapters, browser QA, immutable reports and a Render blueprint.'
      ],
      repo: 'https://github.com/CyberXshaurya/Signalboard-feedback-intelligence',
      live: 'https://signalboard-feedback-intelligence.onrender.com/'
    },
    {
      id: 'jobsignal',
      episode: '02',
      title: 'JobSignal 2.0',
      subtitle: 'A command centre for finding the right opportunity before everyone else.',
      category: 'FULL-STACK AI / NODE / GEMINI',
      year: '2026',
      accent: '#d7ff63',
      accentRgb: '215,255,99',
      poster: 'THE HIRING SIGNAL CUT',
      summary: 'Detects companies likely to hire, ranks opportunities, finds decision-makers and builds job-specific application material.',
      metrics: [
        { value: 'OTP', label: 'email auth' },
        { value: '7d', label: 'secure session' },
        { value: 'FIT', label: 'job-specific lab' }
      ],
      tags: ['Node.js', 'Express', 'Gemini', 'Tavily', 'SQLite', 'JWT'],
      details: [
        'Combines company signals, live openings, user profile context and targeted outreach in one authenticated workflow.',
        'Includes resume upload and parsing, persistent profiles, email OTP and httpOnly-cookie sessions.',
        'Fit Lab returns an honest fit score, evidence-based resume bullets, proof-of-work ideas and ATS keywords without inventing metrics.'
      ],
      repo: 'https://github.com/CyberXshaurya/Jobsignal-2.0'
    },
    {
      id: 'document-intelligence',
      episode: '03',
      title: 'Document Intelligence',
      subtitle: 'Eleven file formats enter. One tested retrieval system comes out.',
      category: 'AI SYSTEMS / RETRIEVAL / EVALUATION',
      year: '2026',
      accent: '#82a7ff',
      accentRgb: '130,167,255',
      poster: 'THE RELIABILITY CUT',
      summary: 'A production-minded ingestion-to-evaluation platform across text, spreadsheets, Office documents, PDFs and images.',
      metrics: [
        { value: '13', label: 'pipeline stages' },
        { value: '11', label: 'file types' },
        { value: '64', label: 'offline tests' }
      ],
      tags: ['Python', 'ChromaDB', 'BM25', 'RRF', 'Cross-encoder', 'Pytest'],
      details: [
        'Built OCR and vision fallbacks, token-aware chunking, persistent indexing, summarisation, retrieval and evaluation in one pipeline.',
        'Combined ChromaDB, BM25, reciprocal-rank fusion and cross-encoder reranking behind interchangeable provider adapters.',
        'Added corruption, password and zip-bomb checks, bounded retries, stale-index cleanup, persistent memory and prompt-injection detection.'
      ]
    },
    {
      id: 'meteorite',
      episode: '04',
      title: 'Meteorite Classifier',
      subtitle: 'A compact computer-vision product built from model to interface.',
      category: 'APPLIED ML / REACT / FLASK',
      year: '2025',
      accent: '#b48cff',
      accentRgb: '180,140,255',
      poster: 'THE MATERIAL ANALYSIS CUT',
      summary: 'A React and Flask application that classifies meteorite textures as metal-rich or silicate-rich.',
      metrics: [
        { value: '224', label: 'pixel input' },
        { value: '2', label: 'material classes' },
        { value: 'API', label: 'prediction flow' }
      ],
      tags: ['React', 'Vite', 'Flask', 'TensorFlow', 'Keras', 'Computer Vision'],
      details: [
        'Uses a TensorFlow/Keras model behind a Flask endpoint and a responsive React/Vite interface.',
        'Processes uploaded imagery, returns a material verdict and reports estimated composition percentages.',
        'Packages model inference, file validation and frontend feedback into a complete application flow.'
      ],
      repo: 'https://github.com/CyberXshaurya/meteorite-classifier-app'
    },
    {
      id: 'third-eye',
      episode: '05',
      title: 'Third Eye',
      subtitle: 'Procurement automation rebuilt around stable orchestration.',
      category: 'WORKFLOW AUTOMATION / LANGCHAIN',
      year: '2025',
      accent: '#ffba6b',
      accentRgb: '255,186,107',
      poster: 'THE PROCUREMENT CUT',
      summary: 'Tender discovery, document parsing, relevance validation and tailored proposal generation in one business workflow.',
      metrics: [
        { value: '3×', label: 'faster execution' },
        { value: '0', label: 'observed crashes' },
        { value: 'ASYNC', label: 'scraping flow' }
      ],
      tags: ['LangChain', 'Llama 3', 'Streamlit', 'Serper', 'Groq', 'SQLite'],
      details: [
        'Integrated a Streamlit interface, LangChain orchestration, search and model APIs, web scraping and SQLite persistence.',
        'Replaced unstable orchestration with sequential chains, improving execution speed threefold and eliminating observed crashes.',
        'Added deterministic domain validation before proposal generation to reject irrelevant signals and reduce unusable output.'
      ]
    },
    {
      id: 'grain-segmentation',
      episode: '06',
      title: 'Grain Segmentation',
      subtitle: 'Scientific imaging pushed from research benchmark to memory-safe inference.',
      category: 'ML RESEARCH / PYTORCH / IIT ROORKEE',
      year: '2025–26',
      accent: '#ff79cf',
      accentRgb: '255,121,207',
      poster: 'THE MICROSTRUCTURE CUT',
      summary: 'M.Tech research fusing BSE microscopy with five EDS elemental maps for grain-scale segmentation.',
      metrics: [
        { value: '0.94+', label: 'mIoU' },
        { value: '95%+', label: 'pixel accuracy' },
        { value: '18,996', label: 'grains' }
      ],
      tags: ['PyTorch', 'U-Net++', 'ResNet34', 'Mask R-CNN', 'Sliding Window'],
      details: [
        'Built a six-channel segmentation pipeline and reached F1 above 0.90 across six classes on unseen cross-sample data.',
        'Benchmarked Mask R-CNN against U-Net++ and selected a ResNet34-backed U-Net++, improving mIoU by more than six points over a prior benchmark.',
        'Developed memory-safe high-resolution sliding-window inference on 16 GB VRAM without boundary artefacts or out-of-memory failures.'
      ]
    }
  ],
  principles: [
    {
      number: '01',
      title: 'Model output is not product truth.',
      body: 'Probabilistic intelligence stays behind evidence checks, deterministic analytics, validation and human control.'
    },
    {
      number: '02',
      title: 'Reliability is part of the interface.',
      body: 'A polished screen is incomplete without failure handling, tests, observability and recoverable state.'
    },
    {
      number: '03',
      title: 'Own the whole workflow.',
      body: 'Requirements, architecture, frontend, APIs, data, integrations, deployment and maintenance belong to one product story.'
    }
  ],
  stack: [
    { label: 'Core', items: ['Python', 'C++', 'SQL', 'JavaScript', 'DSA', 'OOP', 'Git'] },
    { label: 'Backend & data', items: ['FastAPI', 'Flask', 'Express', 'PostgreSQL', 'SQLite', 'ChromaDB', 'Pandas', 'NumPy'] },
    { label: 'AI & retrieval', items: ['PyTorch', 'TensorFlow', 'LangChain', 'BM25', 'Vector Search', 'RAG', 'Cross-encoders', 'RAGAS'] },
    { label: 'Delivery', items: ['Pytest', 'Playwright', 'Docker', 'Render', 'Documentation', 'Debugging', 'Deployment'] },
    { label: 'Model APIs', items: ['Azure AI Foundry', 'GitHub Models', 'Gemini', 'Groq', 'Tavily', 'Serper', 'Ollama'] }
  ],
  timeline: [
    {
      years: '2024 — 2026',
      title: 'M.Tech, Space Science & Technology',
      place: 'Indian Institute of Technology Roorkee',
      note: 'CGPA 8.80 / 10. Thesis in multi-channel grain segmentation.'
    },
    {
      years: '2024 — 2026',
      title: 'Placement Coordinator',
      place: 'Indian Institute of Technology Roorkee',
      note: 'Coordinated placement drives with 50+ companies and managed recruiter, schedule and student communication.'
    },
    {
      years: '2022 — 2024',
      title: 'M.Sc, Applied Geology & Geoinformatics',
      place: 'National Institute of Technology Durgapur',
      note: 'CGPA 8.14 / 10.'
    },
    {
      years: '2018 — 2021',
      title: 'B.Sc (Hons), Geology',
      place: 'Banaras Hindu University',
      note: 'CGPA 8.30 / 10.'
    }
  ],
  recognition: [
    { value: '1610', title: 'Codeforces Expert', body: 'Top 14% of active competitive programmers; best global contest rank 797.' },
    { value: '50+', title: 'Company drives coordinated', body: 'Recruiter, schedule and student coordination across institutional placement activity.' },
    { value: '6+', title: 'mIoU point improvement', body: 'Research model improvement over a prior published domain benchmark.' }
  ]
};
