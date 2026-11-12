// All the words and links on the site live here. Edit this file to change content.

export const PROFILE = {
  brand: 'TOTA.DEV',
  name: 'Monojit Nath',
  nickname: 'Tota',
  role: 'MERN Stack Developer',
  tagline: 'Turning ideas into code, one adventure at a time.',
  location: 'Kolkata, West Bengal, India',
  email: 'kolkatatota5@gmail.com',
  phone: '+91 7439829428',
  github: 'https://github.com/monojit5',
  linkedin: 'https://linkedin.com/in/monojit-nath-650535234',
  summary:
    'MERN Stack Developer skilled in React.js, Next.js, Node.js, Express.js and MongoDB, with working knowledge of Docker and Redis. I build and deploy AI-integrated web apps with the Google Gemini API, LangChain, LangGraph, the Chroma vector database and Retrieval-Augmented Generation (RAG).',
  endToEnd: ['Schema design', 'REST API development', 'JWT authentication', 'Responsive UI', 'Shipped live on Vercel and Render'],
}

// Sections in scroll order. `len` = how many screens of scrolling the section takes.
export const SECTIONS = [
  { id: 'home', label: 'Home', len: 1, side: 'left' },
  { id: 'about', label: 'About', len: 1, side: 'right' },
  { id: 'projects', label: 'Projects', len: 1, side: 'left' },
  { id: 'skills', label: 'Skills', len: 1, side: 'right' },
  { id: 'journey', label: 'Journey', len: 2.6, side: 'left' },
  { id: 'contact', label: 'Contact', len: 1, side: 'right' },
]

export const HELLO = ['Hello!', 'Welcome to my world!', 'Scroll down to explore', 'Hire me, I ship!']

export const PROJECTS = [
  {
    id: 'resumeiq',
    name: 'T-ResumeIQ',
    short: 'T-ResumeIQ',
    tagline: 'AI-Powered Resume Builder',
    color: '#7c5cff',
    kind: 'doc',
    points: [
      'Built an AI resume builder using Gemini, LangChain and LangGraph with React.js, Node.js and MongoDB.',
      'Added an interactive AI chatbot that guides users and gives personalized resume suggestions.',
      'Implemented JWT login with email OTP, Redis caching and resume templates. Premium payments are planned.',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB', 'Gen-ai', 'LangChain', 'LangGraph', 'Redis', 'JWT'],
    live: 'https://t-resumeqi-ai.vercel.app/',
    github: 'https://github.com/monojit5/T-resumeqi_ai',
  },
  {
    id: 'chatee',
    name: 'Chatee',
    short: 'Chatee',
    tagline: 'AI-Powered Smart Chat App',
    color: '#22b573',
    kind: 'chat',
    points: [
      'Built an AI-powered real-time chat app with Socket.IO using React.js, Node.js, Express.js and MongoDB.',
      'Built AI smart replies with LangChain that suggest 3 quick Gmail-style responses below each chat.',
      'Implemented JWT, email OTP and Google login, and used Redis caching for faster responses.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'LangChain', 'Redis', 'JWT'],
    live: 'https://chatee-blue.vercel.app',
    github: 'https://github.com/monojit5/chatee_application',
  },
  {
    id: 'pinkrise',
    name: 'Pink Rise Shopping',
    short: 'Pink Rise',
    tagline: "Women's fashion e-commerce platform",
    color: '#ff5fa2',
    kind: 'cart',
    points: [
      "Developed a full-stack women's fashion e-commerce platform with the MERN stack, product browsing and orders.",
      'Built REST APIs with Express.js and MongoDB (Mongoose) to manage products, users and orders.',
      'Designed a responsive, user-friendly shopping interface using React.js and Tailwind CSS.',
    ],
    stack: ['React.js', 'Tailwind CSS', 'Express.js', 'MongoDB', 'Mongoose'],
    live: 'https://beauty-applications-84mnh1wgt-task-manigment.vercel.app',
    github: 'https://github.com/monojit5/beauty-application',
  },
  {
    id: 'moviestar',
    name: 'MovieStar Entertainment',
    short: 'MovieStar',
    tagline: 'Movie booking platform',
    color: '#ff8a1f',
    kind: 'cinema',
    points: [
      'Built a full-stack movie booking platform using React.js, Node.js, Express.js and MongoDB with REST APIs.',
      'Added Gemini-generated movie details and live location tracking for nearby theatres.',
      'Implemented JWT role-based access, an admin panel and Razorpay payments with downloadable tickets.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini', 'Razorpay', 'JWT'],
    live: null,
    github: 'https://github.com/monojit5/Movie-booking-app',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Web App',
    short: 'E-Commerce',
    tagline: 'Full-stack online store',
    color: '#1fb5d6',
    kind: 'shop',
    points: [
      'Built a full-stack e-commerce platform with JWT authentication, products and orders on MongoDB Atlas.',
      'Integrated Cloudinary for image uploads, with Express.js REST APIs and a responsive React.js UI.',
    ],
    stack: ['React.js', 'Express.js', 'MongoDB Atlas', 'Cloudinary', 'JWT'],
    live: null,
    github: 'https://github.com/monojit5/E-comarce-Webpage',
  },
]

export const SKILLS = [
  { id: 'react', name: 'React.js', group: 'Frontend', color: '#61dafb', blurb: 'Component-based UIs with hooks and React Router. My main frontend tool.', usedIn: ['Chatee', 'T-ResumeIQ', 'Pink Rise', 'MovieStar', 'E-Commerce'] },
  { id: 'node', name: 'Node.js + Express', group: 'Backend', color: '#8bd450', blurb: 'REST API development with JWT authentication and clean route structure.', usedIn: ['Chatee', 'T-ResumeIQ', 'Pink Rise', 'MovieStar', 'E-Commerce'] },
  { id: 'mongo', name: 'MongoDB', group: 'Database', color: '#1fae6a', blurb: 'Schema design with Mongoose, hosted on MongoDB Atlas.', usedIn: ['Chatee', 'T-ResumeIQ', 'Pink Rise', 'MovieStar', 'E-Commerce'] },
  { id: 'redis', name: 'Redis', group: 'Database', color: '#ff5a4d', blurb: 'Caching for faster responses.', usedIn: ['Chatee', 'T-ResumeIQ'] },
  { id: 'socket', name: 'Socket.IO', group: 'Backend', color: '#aab4ff', blurb: 'Real-time messaging between users.', usedIn: ['Chatee'] },
  { id: 'gemini', name: 'Gemini API', group: 'Generative AI', color: '#a679ff', blurb: 'Google Gemini for generated content and smart features inside apps.', usedIn: ['T-ResumeIQ', 'MovieStar'] },
  { id: 'langchain', name: 'LangChain', group: 'Generative AI', color: '#2fe0c5', blurb: 'Chains that power AI features, like three Gmail-style smart replies.', usedIn: ['Chatee', 'T-ResumeIQ'] },
  { id: 'langgraph', name: 'LangGraph', group: 'Generative AI', color: '#ffb84d', blurb: 'Graph-based AI workflows, including the resume guidance chatbot.', usedIn: ['T-ResumeIQ'] },
  { id: 'rag', name: 'RAG + Chroma', group: 'Generative AI', color: '#ff7ac8', blurb: 'Retrieval-Augmented Generation with embeddings and the Chroma vector database.', usedIn: ['AI-integrated apps'] },
  { id: 'tailwind', name: 'Tailwind + Bootstrap', group: 'Frontend', color: '#38bdf8', blurb: 'Fast, responsive styling that looks good on every screen.', usedIn: ['Pink Rise', 'Neo Coderz internship'] },
  { id: 'tools', name: 'Git, Docker, Vercel', group: 'Tools', color: '#ffd84a', blurb: 'Git and GitHub, Docker, Postman, VS Code, and deployment on Vercel and Render.', usedIn: ['Every project'] },
]

export const JOURNEY = [
  { id: 'education', label: 'Education', title: "Bachelor's Degree", meta: '2022 – 2026', place: 'Netaji Subhas Open University, Kolkata', text: 'Graduated in 2026 and now looking for a Full Stack / MERN developer role.' },
  { id: 'training', label: 'Training', title: 'Certifications', meta: 'Bootcamps and academies', place: 'Weavers Web Academy · Apna College · PHP Academy', text: 'Full Stack Development with Generative AI (MERN & AI), Software Development Bootcamp, and Software Development (PHP & WordPress).' },
  { id: 'experience', label: 'Experience', title: 'Website Development Intern', meta: 'Sep 2023 – Dec 2023', place: 'Neo Coderz Technology, Dum Dum, Kolkata', text: 'Built responsive websites with HTML, CSS, Bootstrap and JavaScript, worked with WordPress, PHP and MySQL, and improved UI across multiple pages.' },
  { id: 'growth', label: 'Growth', title: 'Shipping AI-integrated apps', meta: 'Now', place: 'Chatee · T-ResumeIQ · MovieStar', text: 'Owning projects end to end, from schema design and REST APIs to JWT auth, responsive UI and live deployment. Next stop: your team.' },
]
