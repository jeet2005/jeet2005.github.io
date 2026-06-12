export const JEET = {
  name: "Jeet Patel",
  handle: "jeet2005",
  title: "AI & Flutter Developer",
  subtitle: "Building scalable apps, intelligent systems, and modern tech solutions",
  location: "Ahmedabad, Gujarat, India",
  orcid: "0009-0008-8210-8280",
  links: {
    github: "https://github.com/jeet2005",
    linkedin: "https://www.linkedin.com/in/jeet-patel-903772257",
    instagram: "https://www.instagram.com/sjeet1908",
  },
  org: "Softwisp-Atlas",
}

export const PROJECTS = [
  {
    id: "nexora",
    title: "Nexora",
    classification: "FLAGSHIP PROJECT",
    status: "DEPLOYED + OPEN SOURCE",
    tagline: "Autonomous AI Predictive Analytics Platform",
    description: "Profiles datasets, builds optimized preprocessing pipelines, trains 256+ ML models, runs batch predictions, monitors feature drift, and provides grounded AI educational chat — all from a single CSV upload.",
    stack: ["FastAPI", "React 18", "TypeScript", "MongoDB Atlas", "XGBoost", "CatBoost", "LightGBM", "Scikit-learn", "Tailwind CSS", "Ollama/Phi-3"],
    links: {
      live: "https://nexoraprediction.netlify.app/",
      github: "https://github.com/jeet2005/Nexora",
      api: "https://nexora-360r.onrender.com/docs",
    },
    stars: 0,
    forks: 6,
    color: "#1A2B4A",
    icon: "/nexora.svg",
    iconClass: "w-32 h-10",
  },
  {
    id: "eyex",
    title: "Eye-X",
    classification: "DISTRIBUTED SYSTEM",
    status: "ACTIVE",
    tagline: "Edge-Based Smart Attendance System",
    description: "Distributed attendance and behavioral analytics system reducing server load by 95% via edge-first architecture. Uses WebRTC and deterministic AI head pose estimation.",
    stack: ["Python", "FastAPI", "MongoDB", "WebRTC", "YuNet"],
    links: { github: "https://github.com/jeet2005/eyeX" },
    stars: 0,
    forks: 0,
    color: "#1A4A2B",
    icon: "/eyex.svg",
    iconClass: "w-14 h-14",
  },
  {
    id: "trekverse",
    title: "Trekverse",
    classification: "MOBILE APPLICATION",
    status: "COMPLETED",
    tagline: "Trekking Suggestion App",
    description: "A modern trekking suggestion app featuring a wishlist system, user ratings, an admin panel for brands, and a clean themeable UI.",
    stack: ["Flutter", "Dart", "Firebase", "Provider"],
    links: { github: "https://github.com/jeet2005/Trekverse" },
    stars: 0,
    forks: 0,
    color: "#2D5A1B",
  },
  {
    id: "virtual-hand-controller",
    title: "Virtual Hand Controller",
    classification: "CV / HCI EXPERIMENT",
    status: "OPEN SOURCE",
    tagline: "Webcam → Gesture-Based Virtual Mouse",
    description: "Turns your webcam into a gesture-based virtual mouse and keyboard using MediaPipe for real-time hand landmark detection, OpenCV for video processing, and PyAutoGUI for system control.",
    stack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI"],
    links: { github: "https://github.com/jeet2005/Virtual-Hand-Controller" },
    stars: 0,
    forks: 0,
    color: "#4A1A2B",
  },
  {
    id: "softwisp-atlas",
    title: "Softwisp Atlas",
    classification: "ORGANIZATION",
    status: "LIVE",
    tagline: "Web App Design & Development Studio",
    description: "Co-founded Softwisp-Atlas, building scalable web applications and design systems. Working on TypeScript-first codebases with modern frontend architecture.",
    stack: ["TypeScript", "React", "Tailwind CSS"],
    links: { live: "https://softwispatlas.in" },
    stars: 0,
    forks: 0,
    color: "#2B1A4A",
    icon: "/softwisp.svg",
    iconClass: "w-8 h-8",
  },
]

export const SKILLS = [
  // Core
  { name: "Python", icon: "cylinder", color: "#3572A5", level: 90 },
  { name: "Flutter / Dart", icon: "box", color: "#54C5F8", level: 85 },
  { name: "TypeScript", icon: "cube", color: "#3178C6", level: 80 },
  { name: "JavaScript", icon: "sphere", color: "#F7DF1E", level: 82 },
  // Frameworks
  { name: "FastAPI", icon: "cone", color: "#009688", level: 85 },
  { name: "React", icon: "torus", color: "#61DAFB", level: 80 },
  { name: "Tailwind CSS", icon: "octahedron", color: "#06B6D4", level: 88 },
  // AI/ML
  { name: "Scikit-learn", icon: "icosahedron", color: "#F89939", level: 85 },
  { name: "TensorFlow", icon: "tetrahedron", color: "#FF6F00", level: 75 },
  { name: "OpenCV", icon: "dodecahedron", color: "#5C3EE8", level: 80 },
  { name: "MediaPipe", icon: "ring", color: "#00BCD4", level: 75 },
  // Tools
  { name: "MongoDB", icon: "sphere-small", color: "#4DB33D", level: 78 },
  { name: "Three.js", icon: "tetrahedron-small", color: "#049EF4", level: 70 },
  { name: "GSAP", icon: "octahedron-small", color: "#88CE02", level: 72 },
]

export const CERTIFICATES = [
  {
    id: "oci-devops-2025",
    title: "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
    issuer: "Oracle",
    date: "Sep 2025",
    credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=74F82ABD276DDF5559A10C4E0F669F44977E0AF211F44ADF7FFAB5703F9113EA",
    logo: "/certs/oracle.svg",
  },
  {
    id: "nasa-space-apps-2025",
    title: "NASA International Space Apps Challenge 2025 — Galactic Problem Solver",
    issuer: "NASA Space Apps",
    date: "Oct 2025",
    credentialUrl: "", 
    logo: "/certs/nasa.svg",
  },
  {
    id: "deloitte-forage-2025",
    title: "Deloitte Australia – Technology Job Simulation",
    issuer: "Forage",
    date: "Aug 2025",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_urNyNfcW2XA5ysEh9_1755681480357_completion_certificate.pdf",
    logo: "/certs/forage.svg",
  },
  {
    id: "ibm-llm-intro-2025",
    title: "Introduction to Large Language Models (MDL-568)",
    issuer: "IBM",
    date: "Apr 2025",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/3eb720ee5bewogICJsZWFybmVyQ05VTSIgOiAiNDU3MTQwNlJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIk1ETC01NjgiCn0eb6e322419-10",
    logo: "/certs/ibm.svg",
  },
  {
    id: "cisco-python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Apr 2025",
    credentialUrl: "https://www.linkedin.com/in/jeetpatel1908/details/certifications/", 
    logo: "/certs/cisco.svg",
  },
];

export const RESEARCH_POSTERS = [
  {
    id: "explainable-mri",
    title: "Explainable MRI Disease Prediction : WHY Did AI Say This?",
    description: "Deep learning has shown strong performance in medical image classification, yet clinical adoption remains constrained by a lack of interpretability — clinicians cannot verify why a model reached a given diagnosis. This study presents an explainable AI pipeline for brain tumor classification from MRI scans, combining a custom CNN with Grad-CAM [1] to bridge the gap between prediction accuracy and clinical trust. Grad-CAM heatmaps overlay directly on each MRI scan, highlighting the spatial regions that drove the model's decision. This work demonstrates that accuracy and interpretability are not mutually exclusive [5, 6].",
    fileUrl: "/posters/explainable_mri_poster.pdf",
    previewImage: "/posters/explainable_mri_preview.png", // placeholder if they don't have one
    year: "2026",
  },
  {
    id: "inference-compute",
    title: "Inference-Time Compute Scaling: Predicting When Longer Thinking Actually Helps",
    description: "Large language models increasingly support variable inference-time compute budgets, yet practitioners lack a principled method to predict whether a larger budget will improve output quality for a given input. We present an empirical investigation of inference-time compute scaling behaviour across five task categories on GPT-4o and Claude 3.5 Sonnet (300× primary range), with cross-model validation on Gemini 1.5 Pro and Mistral Large 2. Task type is a strong predictor: reasoning tasks scale log-linearly while retrieval and creative tasks plateau sharply. Our Task Complexity Score (TCS) predicts which inputs benefit from extended compute at 87% balanced accuracy, enabling a routing strategy that cuts token spend ~58% at a 0.2 pp accuracy cost.",
    fileUrl: "/posters/inference_compute_poster.pdf",
    previewImage: "/posters/inference_compute_preview.png", // placeholder
    year: "2026",
  }
];
