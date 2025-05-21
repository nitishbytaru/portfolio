import React, { useEffect, useState } from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900 p-2 text-center rounded-xl border border-gray-800 hover:border-blue-500/50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10">
    <p className="text-4xl font-bold text-amber-400 mb-2 font-mono group-hover:text-blue-300 transition-colors">
      {value}
    </p>
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
      {title}
    </p>
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500/0 group-hover:bg-blue-500 transition-all duration-500"></div>
  </div>
);

const GithubCardSection = ({ title, imgSrc, imgAlt }) => (
  <div className="bg-black p-6 rounded-xl border border-gray-800 hover:border-amber-500/50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/10">
    <h3 className="text-lg font-medium text-white mb-4 flex items-center">
      <span className="group-hover:text-amber-400 transition-colors">
        {title}
      </span>
    </h3>
    <div className="overflow-hidden rounded-md">
      <img
        src={imgSrc}
        alt={imgAlt}
        loading="lazy"
        className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  </div>
);

const GithubProfileInfo = ({ data }) => (
  <div className="bg-black p-2 lg:p-8 rounded-xl border border-gray-800 hover:border-amber-500/50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10">
    <div className="flex items-center mb-6">
      <div className="relative mr-4">
        <img
          src={data.avatar_url}
          alt={`${data.name} avatar`}
          className="w-20 h-20 rounded-full mr-6 border-2 border-amber-500 group-hover:border-blue-400 transition-all duration-300"
        />
        <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-1 group-hover:bg-blue-400 transition-all duration-300">
          <svg
            className="w-4 h-4 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {data.name}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
          @{data.login}
        </p>
        {data.bio && (
          <p className="text-gray-500 mt-2 group-hover:text-gray-400 transition-colors">
            {data.bio}
          </p>
        )}
      </div>
    </div>

    <div className="space-y-3 text-gray-400 mb-8 group-hover:text-gray-300 transition-colors">
      {data.location && (
        <InfoItem icon="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z">
          {data.location}
        </InfoItem>
      )}
      {data.company && (
        <InfoItem icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
          {data.company}
        </InfoItem>
      )}
      <InfoItem icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
        Joined: {new Date(data.created_at).toLocaleDateString()}
      </InfoItem>
    </div>

    <a
      href={data.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-900/20"
    >
      View Profile
      <svg
        className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  </div>
);

const InfoItem = ({ icon, children }) => (
  <p className="flex items-center">
    <svg
      className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-400 transition-colors"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d={icon}
      />
    </svg>
    <span>{children}</span>
  </p>
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchGithubData();
  }, [username]);

  if (!githubData) {
    return (
      <div className="py-16 text-center bg-black">
        <div className="inline-block p-4 rounded-full bg-gray-900/50">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading GitHub stats...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-amber-400 bg-amber-900/30 rounded-full border border-amber-800/50">
            Coding Activity
          </span>
          <h2 className="text-4xl font-bold text-blue-400 mt-4 mb-3">
            GitHub <span className="text-amber-400">Stats</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A snapshot of my open-source contributions and coding journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <GithubProfileInfo data={githubData} />

          <div className="bg-black p-4 rounded-xl border border-gray-900 hover:border-amber-500/50 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-900/10">
            <div className="text-xl font-semibold text-white mb-6 group-hover:text-amber-400 transition-colors">
              Stats Overview
            </div>
            <div className="grid grid-cols-2 gap-5">
              <StatCard title="Repositories" value={githubData.public_repos} />
              <StatCard title="Followers" value={githubData.followers} />
              <StatCard title="Following" value={githubData.following} />
              <StatCard title="Gists" value={githubData.public_gists || 0} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 ">
          <GithubCardSection
            title="🔥 GitHub Streak"
            imgSrc={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&background=000000&border=1F2937&stroke=1F2937&ring=3B82F6&fire=3B82F6&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=3B82F6&sideLabels=9CA3AF&dates=6B7280`}
            imgAlt="GitHub Streak Stats"
          />
          <GithubCardSection
            title="🛠 Top Languages"
            imgSrc={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&bg_color=000000&title_color=3B82F6&text_color=FFFFFF&border_color=1F2937`}
            imgAlt="Top Languages"
          />
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
