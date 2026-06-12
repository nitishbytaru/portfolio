export const userData = {
  profile: {
    firstName: "Nitish Durga",
    lastName: "Bytaru",
    title: "Full Stack Web Developer",
    resumeUrl: "https://drive.google.com/file/d/1z7Y0If8Jc4Zd7apdLeXtFzNK12eQ80gi/view?usp=drive_link",
  },
  hero: {
    stats: [
      { value: 4, suffix: "+", label: "Major Projects", description: "Full-stack, mobile, and ML-based applications" },
      { value: 10, suffix: "+", label: "Technologies", description: "React, RN, Node, Flask, .NET, Angular and more" },
      { value: 3, suffix: "", label: "Databases", description: "MongoDB, MySQL, and PostgreSQL exposure" },
      { display: "Full Stack", label: "Specialization", description: "Frontend, backend, APIs, and database workflows" },
    ],
    techStack: [
      "React", "React Native", "Next.js", "Node.js", "Flask", ".NET", "Angular", "MySQL", "MongoDB",
    ],
    miniCards: [
      { title: "Internship", value: "Infosys + Evaluate Health" },
      { title: "Education", value: "B.Tech CSE" },
      { title: "Focus", value: "Scalable Apps" },
    ],
    heroSkills: [
      { label: "Frontend", value: "92%" },
      { label: "Backend", value: "84%" },
      { label: "Database", value: "76%" },
    ],
    floatingTech: [
      { label: "React" },
      { label: "Node.js" },
      { label: "MongoDB" },
      { label: "TypeScript" },
    ]
  },
  experience: [
    {
      role: "System Engineer Intern",
      company: "Infosys",
      location: "Mysore",
      date: "Dec 2025 - May 2026",
      type: "Enterprise Training",
      summaryLabel: "Enterprise Stack",
      certificate: "https://drive.google.com/file/d/1aLeH6dHQzZo0sbtxbiw7Z4B6qrq_IPTw/view?usp=drive_link",
      points: [
        "Completed intensive Java Generic Training covering OOP principles — inheritance, polymorphism, abstraction, encapsulation, exception handling, and collections.",
        "Acquired hands-on knowledge of DBMS and MySQL: relational design, normalization, SQL queries, joins, and database management.",
        "Completed Stream Training in the Microsoft stack: TypeScript, C#, Angular, .NET, and Entity Framework Core for enterprise-grade full-stack development.",
      ],
      skills: ["Java", "OOP", "DBMS", "MySQL", "TypeScript", "C#", "Angular", ".NET", "Entity Framework Core"],
      metrics: [
        { label: "Focus Area", value: "Full Stack & DB" },
        { label: "Stream Track", value: "Microsoft C# / .NET" },
        { label: "Engineering Scope", value: "Enterprise Architecture" },
        { label: "Work Model", value: "Intensive Academy" },
      ]
    },
    {
      role: "Frontend Intern",
      company: "Evaluate Health",
      location: "Vizag",
      date: "Jul 2025 - Nov 2025",
      type: "Frontend Engineering",
      summaryLabel: "Mobile Frontend",
      certificate: "https://drive.google.com/file/d/1hiiyhRLeDxyIRnXKSnl4iDoFrAVErm6g/view?usp=drive_link",
      points: [
        "Developed production-level mobile applications using React Native, TypeScript, Redux, and Redux-Saga.",
        "Built reusable card components, reducing unnecessary re-renders and measurably improving rendering performance of the application.",
        "Coordinated with the backend team to integrate REST APIs for data storage and retrieval within an Agile frontend workflow.",
      ],
      skills: ["React Native", "TypeScript", "Redux", "Redux-Saga", "REST APIs", "Agile"],
      metrics: [
        { label: "Focus Area", value: "Mobile Native UI" },
        { label: "State Engine", value: "Redux & Saga" },
        { label: "API Integration", value: "RESTful Endpoints" },
        { label: "Workflow Mode", value: "Agile Scrum" },
      ]
    }
  ],
  skills: {
    core: [
      { name: "React.js", category: "Frontend", description: "Building dynamic, interactive user interfaces with modern React." },
      { name: "Next.js", category: "Frontend", description: "React framework for production-grade SSR applications." },
      { name: "Node.js", category: "Backend", description: "Scalable server-side logic and RESTful APIs." },
      { name: "React Native", category: "Mobile", description: "Framework for building cross-platform mobile apps." },
      { name: "MongoDB", category: "Database", description: "NoSQL document database for modern applications." },
      { name: "Git & GitHub", category: "Tooling", description: "Version control system and collaboration platform." }
    ],
    landscape: [
      { name: "JavaScript", category: "Language" },
      { name: "TypeScript", category: "Language" },
      { name: "Python", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Java", category: "Language" },
      { name: "Angular", category: "Frontend" },
      { name: "Express.js", category: "Backend" },
      { name: ".NET / C#", category: "Backend" },
      { name: "Entity Framework", category: "Backend" },
      { name: "Django / Flask", category: "Backend" },
      { name: "MySQL", category: "Database" },
      { name: "HTML / CSS", category: "Frontend" },
      { name: "Jupyter", category: "Tooling" }
    ]
  },
  projects: [
    {
      id: 1,
      slug: "echorealm",
      title: "EchoRealm",
      shortDescription: "A dynamic social web app connecting people through real-time messaging, community chats, and anonymous interactions.",
      thumbnail: "/echorealm/thumbnail/13.jpeg",
      liveLink: "https://echorealm24.vercel.app/",
      githubLink: "https://github.com/nitishbytaru/EchoRealm",
      techStack: ["React", "Redux", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      features: [
        "Real-time direct and group messaging (EchoLink)",
        "Community discussions (Shout)",
        "Random message sharing (Mumble)",
        "Anonymous mode for privacy",
        "Real-time notifications for chats, mumbles, and friend requests",
        "Privacy controls like blocking users",
        "User profile with friends and likes statistics",
      ],
      detailedDescription: {
        intro: [
          "EchoRealm is a cutting-edge social web application that connects users through direct messaging, group interactions, and dynamic community discussions.",
          "With multiple interactive modes (EchoLink, Shout, and Mumble) and private security controls, it offers a secure, instant communication environment.",
        ],
        note: "Built with React, Redux, TailwindCSS, Node.js, Express.js, MongoDB, and Socket.io. Deployed on Vercel.",
      },
      technologiesUsed: {
        Frontend: "React.js, Redux, Tailwind CSS, Vite.js",
        Backend: "Node.js, Express.js",
        Database: "MongoDB",
        RealTime: "Socket.io",
      },
      deployment: {
        Frontend: "Vercel",
        Backend: "Render",
        Database: "MongoDB Atlas",
      },
      images: [
        "/echorealm/thumbnail/13.jpeg", "/echorealm/1.jpeg", "/echorealm/2.jpeg", "/echorealm/3.jpeg", "/echorealm/4.jpeg", "/echorealm/5.jpeg", "/echorealm/6.jpeg", "/echorealm/7.jpeg", "/echorealm/8.jpeg", "/echorealm/9.jpeg", "/echorealm/10.jpeg", "/echorealm/11.jpeg", "/echorealm/12.jpeg",
      ],
    }, 
    {
      id: 2,
      slug: "agroguide",
      title: "AgroGuide",
      shortDescription: "A full-stack agricultural assistant platform with ML models",
      thumbnail: "/agroguide/thumbnail/home.png",
      liveLink: "http://agroguide.vercel.app/",
      githubLink: "https://github.com/nitishbytaru/AgroGuide",
      techStack: ["React", "Flask", "Python", "TensorFlow Lite", "i18next"],
      features: [
        "Disease detection via ML",
        "Crop and yield prediction",
        "Multilingual support",
        "Plant disease detection using image classification",
        "Best crop suggestion based on soil and climate",
        "Yield prediction using random forest regression",
        "Agricultural market information",
      ],
      detailedDescription: {
        intro: [
          "AgroGuide is an intelligent agricultural assistance platform that leverages machine learning to help farmers make data-driven decisions.",
          "It features real-time plant disease detection, crop recommendations based on soil parameters, and crop yield estimation.",
        ],
        note: "The platform supports multiple languages and is accessible to farmers across different regions.",
      },
      technologiesUsed: {
        Frontend: "React.js, Vite, Tailwind CSS",
        Backend: "Flask, Python, REST API",
        "Machine Learning": "TensorFlow Lite (InceptionV3, ResNet152V2), Random Forest, Scikit-learn",
        Database: "MongoDB (for user data), Firebase (for image storage)",
      },
      deployment: {
        Frontend: "Vercel (Static Hosting)",
        Backend: "Render (Cloud Service)",
        "ML Models": "Integrated within Flask backend",
      },
      images: [
        "/agroguide/thumbnail/home.png", "/agroguide/aiengine.png", "/agroguide/aiout.png", "/agroguide/cropin.png", "/agroguide/cropout.png", "/agroguide/homehi.png", "/agroguide/homeod.png", "/agroguide/homete.png", "/agroguide/market.png", "/agroguide/yieldout.png", "/agroguide/yielsin.png",
      ],
    },
    {
      id: 3,
      slug: "expensetracker",
      title: "Expense Tracker",
      shortDescription: "A full-stack expense tracking web app with authentication, budget goals, and receipt uploads, built for seamless personal finance management.",
      thumbnail: "/expensetracker/thumbnail/4.jpeg",
      liveLink: "https://expense-nd-trackers.netlify.app",
      githubLink: "https://lnkd.in/gM_AGjvj",
      techStack: ["React.js", "Context API", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Vite", "Axios", "Netlify", "Render"],
      features: [
        "Secure user registration and login with JWT-based authentication",
        "Persistent user sessions with automatic token refresh",
        "Add, update, and delete expense and income entries",
        "Categorize transactions for better tracking",
        "Set and track real-time budget goals with progress bars",
        "Upload receipts and attachments securely with Cloudinary",
        "View and update comprehensive user profiles",
        "Responsive design optimized for desktop and mobile",
        "Delete user account option",
      ],
      detailedDescription: {
        intro: [
          "Expense Tracker is a full-stack financial management application that allows users to monitor their personal income and expenditure.",
          "It includes JWT-based secure login, category-wise transaction tracking, cloud receipt uploading, and progress indicators for monthly budget targets.",
        ],
        note: "Built with React.js (Context API) and Vite on the frontend, Node.js, Express.js, and MongoDB on the backend, and deployed using Netlify and Render.",
      },
      technologiesUsed: {
        Frontend: "React.js (Context API), Vite.js, Axios",
        Backend: "Node.js, Express.js",
        Database: "MongoDB (via Mongoose)",
        Authentication: "JWT (JSON Web Tokens)",
        File_Storage: "Cloudinary",
      },
      deployment: {
        Frontend: "Netlify",
        Backend: "Render",
        Database: "MongoDB Atlas",
      },
      images: [
        "/expensetracker/thumbnail/4.jpeg", "/expensetracker/1.jpeg", "/expensetracker/2.jpeg", "/expensetracker/3.jpeg", "/expensetracker/5.jpeg", "/expensetracker/6.jpeg", "/expensetracker/7.jpeg", "/expensetracker/8.jpeg", "/expensetracker/9.jpeg", "/expensetracker/10.jpeg",
      ],
    },
    {
      id: 4,
      slug: "recipeheaven",
      title: "Recipe Sharing Platform",
      shortDescription: "A dynamic recipe-sharing web app where users can create, manage, and discover recipes with a vibrant food-loving community.",
      thumbnail: "/recipeheaven/thumbnail/1.jpeg",
      liveLink: "https://nitish24.pythonanywhere.com/",
      githubLink: "https://github.com/nitishbytaru/RecipeHaven",
      techStack: ["HTML", "CSS", "Bootstrap", "Django", "Python", "SQLite"],
      features: [
        "Secure user login and registration using Django's authentication system",
        "Create, edit, delete, and browse recipes",
        "Search and filter recipes by names and categories",
        "Users can rate and review recipes",
        "Manage user profiles: update username, email, and password",
        "Responsive design for both desktop and mobile devices",
      ],
      detailedDescription: {
        intro: [
          "Recipe Sharing Platform is a community-driven web application where users can discover and post culinary creations.",
          "It offers features like rating systems, user feedback, advanced search keywords, and full profile security controls.",
        ],
        note: "Built using Django for the backend, Bootstrap for the frontend, and SQLite for lightweight data handling.",
      },
      technologiesUsed: {
        Frontend: "HTML, CSS, Bootstrap",
        Backend: "Django, Python",
        Database: "SQLite",
      },
      deployment: {
        Frontend: "Django Templates (hosted with backend)",
        Backend: "Pythonanywhere",
        Database: "SQLite (local database)",
      },
      images: [
        "/recipeheaven/thumbnail/1.jpeg", "/recipeheaven/2.jpeg", "/recipeheaven/3.jpeg", "/recipeheaven/4.jpeg", "/recipeheaven/5.jpeg", "/recipeheaven/6.jpeg", "/recipeheaven/7.jpeg",
      ],
    },
    {
      id: 5,
      slug: "insta",
      title: "Instagram UI Clone",
      shortDescription: "A pixel-perfect Instagram UI Clone built with React Native to master mobile app development, navigation, and performance optimization.",
      thumbnail: "/insta/thumbnail/1.png",
      liveLink: "https://www.linkedin.com/posts/nitishbytaru_during-my-learning-journey-at-evaluate-health-activity-7394217921595523072-PPrk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAECYhy0BjTqW8NV_A7nTP6_KGN5tzcO2gqk",
      githubLink: "https://github.com/nitishbytaru/Instagram_UI_Clone",
      techStack: ["React Native", "Tailwind CSS"],
      features: [
        "Pixel-perfect Instagram UI Clone built entirely with React Native",
        "Fully implemented feed, stories, reels tab, and profile sections",
        "Smooth navigation using React Navigation (stack, tab, and bottom tabs)",
        "Advanced Flexbox layouts for responsive and adaptive UI",
        "Efficient image loading and caching with React Native FastImage",
        "Custom components for stories highlights, posts grid, and interactive buttons",
        "State management with React hooks for seamless user interactions",
        "Cross-platform compatibility — tested and optimized for both Android and iOS",
      ],
      detailedDescription: {
        intro: [
          "A full mobile layout replica of Instagram built using React Native to explore mobile architecture.",
          "It mimics feed rendering, story trays, scrollable posts grids, profile stats, and navigates seamlessly using React Navigation hooks.",
        ],
        note: "Built using React Native for components, Tailwind CSS (NativeWind) for styling, and mock data arrays.",
      },
      technologiesUsed: {
        Frontend: "React Native, Tailwind CSS",
      },
      deployment: {
        Frontend: "Android / iOS emulator package",
      },
      images: [
        "/insta/thumbnail/1.png", "/insta/1.png", "/insta/2.png", "/insta/3.png", "/insta/4.png", "/insta/5.png", "/insta/6.png", "/insta/7.png",
      ],
    },
  ],
  social: [
    { name: "GitHub", href: "https://github.com/nitishbytaru" },
    { name: "LinkedIn", href: "https://linkedin.com/in/nitishbytaru" },
    { name: "LeetCode", href: "https://leetcode.com/" },
    { name: "Email", href: "mailto:bndnitish24@gmail.com" },
  ],
  github: {
    info: "GitHub data is dynamically fetched from the GitHub API rather than being hardcoded. You can use the utility functions provided in the project to retrieve the latest data.",
    usagePrompt: `
      // To fetch GitHub Analytics data dynamically, use the utilities defined in src/utils/githubApi.js
      import { fetchProfile, fetchRepos, fetchEvents, fetchContributions, computeAnalytics } from "../../utils/githubApi";

      // Inside your component or data loader:
      const loadGithubData = async () => {
        const [profile, repos, evts, contribs] = await Promise.all([
          fetchProfile(),
          fetchRepos(),
          fetchEvents(),
          fetchContributions()
        ]);

        const analytics = computeAnalytics(profile, repos);
        // 'analytics' will contain: { profile, stats, highlights, languages, timeline, topRepos }
        // 'evts' will contain recent activity events
        // 'contribs' will contain the contribution calendar data
        
        return { analytics, events: evts, contributions: contribs };
      };
    `
  }
};
