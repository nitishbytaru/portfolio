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
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">AgroGuide</h3>
            <p className="text-lg text-gray-300">
              An intelligent agricultural assistance platform that leverages
              machine learning to help farmers make{" "}
              <strong className="text-amber-400">data-driven decisions</strong>.
            </p>
          </div>

          <ul className="space-y-4">
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
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-amber-900 bg-opacity-20 p-2 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-amber-400"
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
                <span className="text-gray-300">{item.text}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-900 bg-opacity-20 p-6 rounded-xl border-l-4 border-blue-500 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-900 bg-opacity-30 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-blue-400"
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
              <div>
                <p className="text-gray-300">
                  The platform supports multiple languages and is accessible to
                  farmers across different regions.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div className="space-y-6">
          <p className="text-lg text-gray-300">
            EchoRealm is a cutting-edge social web application that connects
            users through direct messaging, group interactions, and dynamic
            community discussions.
          </p>

          <ul className="space-y-4">
            {[
              "Real-time one-on-one and group chats with friends (EchoLink)",
              "Community chatroom for larger discussions (Shout)",
              "Send quick messages to random users with Mumbles",
              "Anonymous interaction mode for enhanced privacy",
              "Instant real-time notifications for messages, requests and activities",
              "Block users and manage your privacy settings easily",
              "Profile showcasing friends list and total Mumble likes",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-blue-900 bg-opacity-20 p-2 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-400"
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
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-amber-900 bg-opacity-20 p-6 rounded-xl border-l-4 border-amber-500 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-amber-900 bg-opacity-30 p-2 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-amber-400"
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
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Built With
                </h3>
                <p className="text-gray-300">
                  React, Redux, TailwindCSS, Node.js, Express.js, MongoDB, and
                  Socket.io.
                  <br />
                  Deployed on Vercel for seamless cross-device access.
                </p>
              </div>
            </div>
          </div>
        </div>
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
        <div className="space-y-6">
          <p className="text-lg text-gray-300">
            I'm excited to share the completion of my latest project: an Expense
            Tracker web application! <span className="text-amber-400">🎉</span>
          </p>

          <p className="text-gray-400">
            This is my first ever full-stack project. I learned a lot from
            building this, and I'm looking forward to improving it further with
            more experience.
          </p>

          <ul className="space-y-4">
            {[
              "Secure user authentication and JWT-based session management",
              "Track expenses and income easily with categorized entries",
              "Set budget goals and track them in real-time",
              "Manage file uploads for receipts securely using Cloudinary",
              "Fully responsive design for both desktop and mobile users",
              "Comprehensive user profile management, including account deletion",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-blue-900 bg-opacity-20 p-2 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-blue-400"
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
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-900 bg-opacity-20 p-6 rounded-xl mt-8">
            <p className="text-gray-300 mb-4">
              Built with React.js (Context API) and Vite on the frontend,
              Node.js, Express.js, and MongoDB on the backend, and deployed
              using Netlify and Render.
            </p>
            <p className="text-gray-300">
              <strong className="text-amber-400">Note:</strong> This is my first
              full-stack project. You may face a few issues — if you do, please
              let me know so I can improve the app!{" "}
              <span className="text-amber-400">🚀</span>
            </p>
          </div>
        </div>
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
        <div className="space-y-6">
          <p className="text-lg text-gray-300">
            I've been working on a dynamic recipe-sharing platform that allows
            users to create and share recipes with a thriving community of food
            enthusiasts.
          </p>
          <ul className="space-y-4">
            {[
              "Secure user authentication and account management",
              "Create, edit, and delete personalized recipes",
              "Browse, search, and filter recipes by names and categories",
              "Review and rate recipes shared by other users",
              "Update personal details like username, email, and password easily",
              "Responsive web design optimized for both desktop and mobile users",
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-amber-900 bg-opacity-20 p-2 rounded-full mr-4">
                  <svg
                    className="w-6 h-6 text-amber-400"
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
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <p className="text-gray-300">
              Built using Django for the backend and Bootstrap for a clean,
              responsive frontend. Data management is handled with SQLite.
            </p>
            <div className="bg-blue-900 bg-opacity-20 p-4 rounded-xl">
              <p className="flex items-center text-gray-300 mb-2">
                <span className="inline-block bg-blue-900 bg-opacity-30 text-blue-400 rounded-full p-2 mr-3">
                  🎯
                </span>
                <span>Check out the live project here: </span>
                <a
                  href="https://lnkd.in/g-Wa78Fp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                  View Live
                </a>
              </p>
              <p className="flex items-center text-gray-300">
                <span className="inline-block bg-amber-900 bg-opacity-30 text-amber-400 rounded-full p-2 mr-3">
                  💡
                </span>
                <span>GitHub Repository: </span>
                <a
                  href="https://lnkd.in/grUX3dYs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 ml-1"
                >
                  View Code
                </a>
              </p>
            </div>
            <p className="text-gray-300">
              I would love your feedback so I can improve this website!{" "}
              <span className="text-amber-400">🙌</span>
            </p>
          </div>
        </div>
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
