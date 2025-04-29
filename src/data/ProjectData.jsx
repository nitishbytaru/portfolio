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
          AgroGuide is an intelligent agricultural assistance platform that
          leverages machine learning to help farmers make data-driven decisions.
          The system provides:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Real-time crop disease detection through image classification</li>
            <li>
              Personalized crop recommendations based on soil and climate data
            </li>
            <li>Accurate yield predictions using advanced regression models</li>
            <li>Comprehensive agricultural market information</li>
          </ul>
          <p className="mt-4">
            The platform supports multiple languages and is accessible to farmers
            across different regions.
          </p>
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
      liveLink: "https://lnkd.in/g2JjnjBY",
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
          EchoRealm is a cutting-edge social web application that connects users
          through direct messaging, group interactions, and dynamic community
          discussions.
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Real-time one-on-one and group chats with friends (EchoLink)</li>
            <li>Community chatroom for larger discussions (Shout)</li>
            <li>Send quick messages to random users with Mumbles</li>
            <li>Anonymous interaction mode for enhanced privacy</li>
            <li>
              Instant real-time notifications for messages, requests, and
              activities
            </li>
            <li>Block users and manage your privacy settings easily</li>
            <li>Profile showcasing friends list and total Mumble likes</li>
          </ul>
          <p className="mt-4">
            Built with React, Redux, TailwindCSS, Node.js, Express.js, MongoDB,
            and real-time capabilities via Socket.io. Deployed on Vercel for
            seamless access across devices.
          </p>
          <p className="mt-2">
            Sample Login Credentials: <br />
            <strong>Username:</strong> Kevin <br />
            <strong>Password:</strong> 1234
          </p>
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
        Backend: "Vercel",
        Database: "MongoDB Atlas",
      },
      folderStructure: {
        Client: {
          /* omitted for now */
        },
        Server: {
          /* omitted for now */
        },
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
      liveLink: "https://lnkd.in/g-5EhFpz",
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
          I'm excited to share the completion of my latest project: an Expense
          Tracker web application! 🎉
          <p className="mt-2">
            This is my first ever full-stack project. I learned a lot from
            building this, and I’m looking forward to improving it further with
            more experience.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Secure user authentication and JWT-based session management</li>
            <li>Track expenses and income easily with categorized entries</li>
            <li>Set budget goals and track them in real-time</li>
            <li>Manage file uploads for receipts securely using Cloudinary</li>
            <li>Fully responsive design for both desktop and mobile users</li>
            <li>
              Comprehensive user profile management, including account deletion
            </li>
          </ul>
          <p className="mt-4">
            Built with React.js (Context API) and Vite on the frontend, Node.js,
            Express.js, and MongoDB on the backend, and deployed using Netlify and
            Render.
          </p>
          <p className="mt-2">
            <strong>Note:</strong> This is my first full-stack project. You may
            face a few issues — if you do, please let me know so I can improve the
            app! 🚀
          </p>
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
      folderStructure: {
        Client: {
          /* You can fill this later */
        },
        Server: {
          /* You can fill this later */
        },
      },
      machineLearningModels: [], // No ML models
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
      liveLink: "https://lnkd.in/g-Wa78Fp",
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
          🚀 I’ve been working on a dynamic recipe-sharing platform that allows
          users to create and share recipes with a thriving community of food
          enthusiasts. 🍳
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Secure user authentication and account management</li>
            <li>Create, edit, and delete personalized recipes</li>
            <li>Browse, search, and filter recipes by names and categories</li>
            <li>Review and rate recipes shared by other users</li>
            <li>
              Update personal details like username, email, and password easily
            </li>
            <li>
              Responsive web design optimized for both desktop and mobile users
            </li>
          </ul>
          <p className="mt-4">
            Built using Django for the backend and Bootstrap for a clean,
            responsive frontend. Data management is handled with SQLite.
          </p>
          <p className="mt-2">
            🎯 Check out the live project here:{" "}
            <a
              href="https://lnkd.in/g-Wa78Fp"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Live
            </a>
          </p>
          <p className="mt-2">
            💡 GitHub Repository:{" "}
            <a
              href="https://lnkd.in/grUX3dYs"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Code
            </a>
          </p>
          <p className="mt-2">
            I would love your feedback so I can improve this website! 🙌
          </p>
        </>
      ),
      technologiesUsed: {
        Frontend: "HTML, CSS, Bootstrap",
        Backend: "Django, Python",
        Database: "SQLite",
      },
      deployment: {
        Frontend: "Django Templates (hosted with backend)",
        Backend: "Deployed via Render (or similar)",
        Database: "SQLite (local database)",
      },
      folderStructure: {
        Client: null, // no separate client folder
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
  