import { motion } from "framer-motion";

export const projectsData = [
  {
    id: 1,
    title: "AgroGuide",
    shortDescription:
      "A full-stack agricultural assistant platform with ML models",
    thumbnail: "../../public/agroguide/thumbnail/home.png",
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
    detailedDescription: (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-800 dark:text-gray-200"
        >
          <div className="relative">
            <div className="absolute -left-4 top-0 h-full w-1 bg-portfolio-primary rounded-full"></div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent dark:from-portfolio-primary/90 dark:to-portfolio-secondary/90 pl-3 mb-4">
              AgroGuide
            </h3>
          </div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            An intelligent agricultural assistance platform that leverages
            machine learning to help farmers make{" "}
            <span className="font-semibold text-portfolio-primary dark:text-portfolio-accent">
              data-driven decisions
            </span>
            .
          </p>

          <motion.ul
            className="list-none pl-0 space-y-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {[
              {
                icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
                text: "Real-time crop disease detection through image classification",
              },
              {
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                text: "Personalized crop recommendations based on soil and climate data",
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                text: "Accurate yield predictions using advanced regression models",
              },
              {
                icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
                text: "Comprehensive agricultural market information",
              },
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex items-start p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span className="flex-shrink-0 p-2 mr-3 bg-portfolio-primary/10 dark:bg-portfolio-primary/20 rounded-full text-portfolio-primary dark:text-portfolio-accent">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {item.text}
                </span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 bg-gradient-to-r from-portfolio-primary/10 to-portfolio-secondary/10 dark:from-portfolio-primary/20 dark:to-portfolio-secondary/20 rounded-xl border border-portfolio-primary/20 dark:border-portfolio-primary/30"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 rounded-lg bg-portfolio-primary/10 dark:bg-portfolio-primary/20 text-portfolio-primary dark:text-portfolio-accent">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-portfolio-primary dark:text-portfolio-accent">
                  The platform supports multiple languages and is accessible to
                  farmers across different regions.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </>
    ),
    technologiesUsed: {
      Frontend: "React.js, Vite, Tailwind CSS",
      Backend: "Flask, Python, REST API",
      "Machine Learning":
        "TensorFlow Lite (InceptionV3, ResNet152V2), Random Forest, Scikit-learn",
      Database: "MongoDB (for user data), Firebase (for image storage)",
    },
    deployment: {
      Frontend: "Vercel (Static Hosting)",
      Backend: "Render (Cloud Service)",
      "ML Models": "Integrated within Flask backend",
    },
    machineLearningModels: [
      {
        name: "Crop Prediction Model",
        description:
          "Predicts optimal crops based on soil parameters and climate data",
        accuracy: "92%",
        technique: "Random Forest Classifier",
      },
      {
        name: "Yield Prediction Model",
        description:
          "Estimates crop yield using historical and environmental factors",
        accuracy: "88%",
        technique: "Random Forest Regressor",
      },
      {
        name: "Disease Detection Model",
        description: "Identifies plant diseases from leaf images",
        accuracy: "94%",
        technique: "CNN (InceptionV3)",
      },
    ],
    images: [
      "/agroguide/thumbnail/home.png",
      "/agroguide/aiengine.png",
      "/agroguide/aiout.png",
      "/agroguide/cropin.png",
      "/agroguide/cropout.png",
      "/agroguide/homehi.png",
      "/agroguide/homeod.png",
      "/agroguide/homete.png",
      "/agroguide/market.png",
      "/agroguide/cropout.png",
      "/agroguide/yieldout.png",
      "/agroguide/yielsin.png",
    ],
  },
  {
    id: 2,
    title: "EchoRealm",
    shortDescription:
      "A dynamic social web app connecting people through real-time messaging, community chats, and anonymous interactions.",
    thumbnail: "/echorealm/thumbnail/3.jpeg", // updated thumbnail
    liveLink: "https://echorealm24.vercel.app/",
    githubLink: "https://github.com/nitishbytaru/EchoRealm",
    techStack: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
    features: [
      "Real-time direct and group messaging (EchoLink)",
      "Community discussions (Shout)",
      "Random message sharing (Mumble)",
      "Anonymous mode for privacy",
      "Real-time notifications for chats, mumbles, and friend requests",
      "Privacy controls like blocking users",
      "User profile with friends and likes statistics",
    ],
    detailedDescription: (
      <>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-800 dark:text-gray-200 leading-relaxed"
        >
          <p className="text-lg md:text-xl font-medium mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent dark:from-portfolio-primary/90 dark:to-portfolio-secondary/90">
            EchoRealm is a cutting-edge social web application that connects
            users through direct messaging, group interactions, and dynamic
            community discussions.
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="list-none pl-0 mt-6 space-y-3"
          >
            {[
              "Real-time one-on-one and group chats with friends (EchoLink)",
              "Community chatroom for larger discussions (Shout)",
              "Send quick messages to random users with Mumbles",
              "Anonymous interaction mode for enhanced privacy",
              "Instant real-time notifications for messages, requests, and activities",
              "Block users and manage your privacy settings easily",
              "Profile showcasing friends list and total Mumble likes",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 h-6 w-6 mr-3 mt-0.5">
                  <svg
                    className="h-full w-full text-portfolio-primary dark:text-portfolio-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 rounded-lg bg-portfolio-primary/10 dark:bg-portfolio-primary/20 text-portfolio-primary dark:text-portfolio-accent">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Built With
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  React, Redux, TailwindCSS, Node.js, Express.js, MongoDB, and
                  Socket.io.
                  <span className="block mt-1">
                    Deployed on Vercel for seamless cross-device access.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </>
    ),
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
    machineLearningModels: [], // No ML models
    images: [
      "/echorealm/thumbnail/4.jpeg",
      "/echorealm/1.jpeg",
      "/echorealm/2.jpeg",
      "/echorealm/3.jpeg",
      "/echorealm/5.jpeg",
      "/echorealm/6.jpeg",
      "/echorealm/7.jpeg",
      "/echorealm/8.jpeg",
      "/echorealm/9.jpeg",
      "/echorealm/10.jpeg",
      "/echorealm/11.jpeg",
      "/echorealm/13.jpeg",
      "/echorealm/12.jpeg",
    ],
  },
  {
    id: 3,
    title: "Expense Tracker",
    shortDescription:
      "A full-stack expense tracking web app with authentication, budget goals, and receipt uploads, built for seamless personal finance management.",
    thumbnail: "/expensetracker/thumbnail/4.jpeg", // update with your thumbnail path
    liveLink: "https://expense-nd-trackers.netlify.app",
    githubLink: "https://lnkd.in/gM_AGjvj",
    techStack: [
      "React.js",
      "Context API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Vite",
      "Axios",
      "Netlify",
      "Render",
    ],
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
    detailedDescription: (
      <>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-800 dark:text-gray-200 leading-relaxed"
        >
          <p className="text-lg md:text-xl font-medium mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent dark:from-portfolio-primary/90 dark:to-portfolio-secondary/90">
            I'm excited to share the completion of my latest project: an Expense
            Tracker web application! 🎉
          </p>

          <p className="text-gray-700 dark:text-gray-300 mt-2">
            This is my first ever full-stack project. I learned a lot from
            building this, and I'm looking forward to improving it further with
            more experience.
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="list-none pl-0 mt-4 space-y-2"
          >
            {[
              "Secure user authentication and JWT-based session management",
              "Track expenses and income easily with categorized entries",
              "Set budget goals and track them in real-time",
              "Manage file uploads for receipts securely using Cloudinary",
              "Fully responsive design for both desktop and mobile users",
              "Comprehensive user profile management, including account deletion",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 h-5 w-5 mr-3 mt-0.5">
                  <svg
                    className="h-full w-full text-portfolio-primary dark:text-portfolio-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
            <p className="text-gray-700 dark:text-gray-300">
              Built with React.js (Context API) and Vite on the frontend,
              Node.js, Express.js, and MongoDB on the backend, and deployed
              using Netlify and Render.
            </p>
            <p className="mt-2 text-sm text-portfolio-primary dark:text-portfolio-accent">
              <strong>Note:</strong> This is my first full-stack project. You
              may face a few issues — if you do, please let me know so I can
              improve the app! 🚀
            </p>
          </div>
        </motion.div>
      </>
    ),
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
      "/expensetracker/thumbnail/4.jpeg",
      "/expensetracker/1.jpeg",
      "/expensetracker/2.jpeg",
      "/expensetracker/3.jpeg",
      "/expensetracker/5.jpeg",
      "/expensetracker/6.jpeg",
      "/expensetracker/7.jpeg",
      "/expensetracker/8.jpeg",
      "/expensetracker/9.jpeg",
      "/expensetracker/10.jpeg",
      "/expensetracker/11.jpeg",
      "/expensetracker/13.jpeg",
      "/expensetracker/12.jpeg",
    ],
  },
  {
    id: 4,
    title: "Recipe Sharing Platform",
    shortDescription:
      "A dynamic recipe-sharing web app where users can create, manage, and discover recipes with a vibrant food-loving community.",
    thumbnail: "/recipeheaven/thumbnail/1.jpeg", // corrected path
    liveLink: "https://nitish24.pythonanywhere.com/",
    githubLink: "https://lnkd.in/grUX3dYs",
    techStack: ["HTML", "CSS", "Bootstrap", "Django", "Python", "SQLite"],
    features: [
      "Secure user login and registration using Django's authentication system",
      "Create, edit, delete, and browse recipes",
      "Search and filter recipes by names and categories",
      "Users can rate and review recipes",
      "Manage user profiles: update username, email, and password",
      "Responsive design for both desktop and mobile devices",
    ],
    detailedDescription: (
      <>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-gray-800 dark:text-gray-200 leading-relaxed"
        >
          <p className="text-lg md:text-xl font-medium mb-4 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary bg-clip-text text-transparent dark:from-portfolio-primary/90 dark:to-portfolio-secondary/90">
            I've been working on a dynamic recipe-sharing platform that allows
            users to create and share recipes with a thriving community of food
            enthusiasts.
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="list-none pl-0 mt-4 space-y-2"
          >
            {[
              "Secure user authentication and account management",
              "Create, edit, and delete personalized recipes",
              "Browse, search, and filter recipes by names and categories",
              "Review and rate recipes shared by other users",
              "Update personal details like username, email, and password easily",
              "Responsive web design optimized for both desktop and mobile users",
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <span className="flex-shrink-0 h-5 w-5 mr-3 mt-0.5">
                  <svg
                    className="h-full w-full text-portfolio-primary dark:text-portfolio-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/30">
            <p className="text-gray-700 dark:text-gray-300">
              Built using Django for the backend and Bootstrap for a clean,
              responsive frontend. Data management is handled with SQLite.
            </p>

            <div className="mt-4 space-y-2">
              <p className="flex items-center">
                <span className="mr-2">🎯</span>
                <span>Check out the live project here: </span>
                <a
                  href="https://lnkd.in/g-Wa78Fp"
                  className="text-portfolio-primary dark:text-portfolio-accent hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live
                </a>
              </p>

              <p className="flex items-center">
                <span className="mr-2">💡</span>
                <span>GitHub Repository: </span>
                <a
                  href="https://lnkd.in/grUX3dYs"
                  className="text-portfolio-primary dark:text-portfolio-accent hover:underline ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code
                </a>
              </p>
            </div>

            <p className="mt-4 text-sm text-portfolio-primary dark:text-portfolio-accent">
              I would love your feedback so I can improve this website! 🙌
            </p>
          </div>
        </motion.div>
      </>
    ),
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
    folderStructure: {
      Server:
        "Django structure: settings.py, urls.py, models.py, views.py, templates, static",
    },
    machineLearningModels: [], // No ML models
    images: [
      "/recipeheaven/thumbnail/1.jpeg",
      "/recipeheaven/5.jpeg",
      "/recipeheaven/2.jpeg",
      "/recipeheaven/3.jpeg",
      "/recipeheaven/4.jpeg",
      "/recipeheaven/6.jpeg",
      "/recipeheaven/7.jpeg",
    ],
  },
];
