import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Small reusable card component
const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white/70 dark:bg-gray-800/50 p-6 rounded-xl text-center shadow-md hover:shadow-lg hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"
  >
    <p className="text-3xl font-bold gradient-heading">{value}</p>
    <p className="text-gray-600 dark:text-gray-300 font-medium">{title}</p>
  </motion.div>
);

const GithubStats = () => {
  const username = "nitishbytaru";
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!response.ok)
          throw new Error(`GitHub API error: ${response.status}`);
        const data = await response.json();
        setGithubData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGithubData();
  }, [username]);

  if (!githubData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-portfolio-primary/30 border-t-portfolio-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">
            Loading GitHub stats...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-portfolio-secondary/10 dark:bg-portfolio-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-portfolio-primary/10 dark:bg-portfolio-primary/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-block mb-2 px-4 py-1.5 rounded-full bg-portfolio-accent/10 dark:bg-portfolio-accent/20 border border-portfolio-accent/20 dark:border-portfolio-accent/30">
          <span className="text-portfolio-primary dark:text-portfolio-accent font-medium">
            Coding Activity
          </span>
        </div>

        <h2 className="text-4xl font-bold gradient-heading mb-4">
          GitHub Stats
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A snapshot of my coding journey and open-source contributions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"
        >
          <div className="flex items-center space-x-4">
            <img
              src={githubData.avatar_url}
              alt={`${githubData.name} avatar`}
              className="w-20 h-20 rounded-full shadow-md ring-2 ring-portfolio-primary/20 dark:ring-portfolio-primary/30"
            />
            <div>
              <h3 className="text-2xl font-bold gradient-heading">
                {githubData.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                @{githubData.login}
              </p>
              {githubData.bio && (
                <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                  {githubData.bio}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-2 text-gray-700 dark:text-gray-300">
            {githubData.location && (
              <p>
                <strong>Location:</strong> {githubData.location}
              </p>
            )}
            {githubData.company && (
              <p>
                <strong>Company:</strong> {githubData.company}
              </p>
            )}
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(githubData.created_at).toLocaleDateString()}
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-gradient-to-r from-portfolio-primary to-portfolio-secondary text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-portfolio-primary/20 transition animate-gradient-x"
          >
            View Profile
          </motion.a>
        </motion.div>

        {/* Main GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30"
        >
          <div className="text-xl font-semibold mb-6 text-center gradient-heading">
            Stats Overview
          </div>
          <div className="grid grid-cols-2 gap-6">
            <StatCard title="Repositories" value={githubData.public_repos} />
            <StatCard title="Followers" value={githubData.followers} />
            <StatCard title="Following" value={githubData.following} />
            <StatCard title="Gists" value={githubData.public_gists || 0} />
          </div>
        </motion.div>
      </div>

      {/* GitHub Streak */}
      <GithubCardSection
        title="🔥 GitHub Streak"
        imgSrc={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=tokyonight`}
        imgAlt="GitHub Streak Stats"
        delay={0.4}
      />

      {/* Top Languages */}
      <GithubCardSection
        title="🛠 Top Languages"
        imgSrc={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight`}
        imgAlt="Top Languages"
        delay={0.6}
      />
    </section>
  );
};

// Small reusable section for the GitHub streak and top languages
const GithubCardSection = ({ title, imgSrc, imgAlt, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: delay }}
    className="mt-12 bg-white/80 dark:bg-gray-800/50 p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-portfolio-primary/10 transition-all backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 relative z-10"
  >
    <h3 className="text-2xl font-semibold text-center mb-8 gradient-heading">
      {title}
    </h3>
    <div className="flex justify-center overflow-hidden rounded-lg bg-white dark:bg-gray-900 p-4">
      <img src={imgSrc} alt={imgAlt} className="max-w-full" loading="lazy" />
    </div>
  </motion.div>
);

export default GithubStats;
