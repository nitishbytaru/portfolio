// src/utils/githubApi.js
const USERNAME = "nitishbytaru";
const API_BASE = "https://api.github.com";
const CACHE_PREFIX = "gh_analytics_";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

/* ── Cache helpers ─────────────────────────────────── */

function getCached(key) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      sessionStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function setCache(key, data) {
  try {
    sessionStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {
    // Storage full — silently ignore
  }
}

/* ── Fetchers ──────────────────────────────────────── */

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function fetchProfile() {
  const cached = getCached("profile");
  if (cached) return cached;
  const data = await fetchJSON(`${API_BASE}/users/${USERNAME}`);
  setCache("profile", data);
  return data;
}

export async function fetchRepos() {
  const cached = getCached("repos");
  if (cached) return cached;
  const data = await fetchJSON(
    `${API_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`
  );
  setCache("repos", data);
  return data;
}

export async function fetchEvents() {
  const cached = getCached("events");
  if (cached) return cached;
  const data = await fetchJSON(
    `${API_BASE}/users/${USERNAME}/events?per_page=30`
  );
  setCache("events", data);
  return data;
}

export async function fetchRepoLanguages(repoName) {
  const key = `langs_${repoName}`;
  const cached = getCached(key);
  if (cached) return cached;
  const data = await fetchJSON(
    `${API_BASE}/repos/${USERNAME}/${repoName}/languages`
  );
  setCache(key, data);
  return data;
}

/* ── Contribution Calendar (CORS-enabled API) ──────── */

export async function fetchContributions() {
  const cached = getCached("contributions");
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://github-contributions-api.deno.dev/${USERNAME}.json`
    );
    if (!res.ok) throw new Error("Contributions fetch failed");
    const json = await res.json();
    
    const levelMap = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const weeks = json.contributions.map((week) =>
      week.map((day) => ({
        date: day.date,
        level: levelMap[day.contributionLevel] ?? 0,
        count: day.contributionCount,
      }))
    );

    const totalContributions = json.contributions.reduce(
      (sum, week) => sum + week.reduce((wSum, d) => wSum + d.contributionCount, 0),
      0
    );

    const data = { weeks, totalContributions };
    setCache("contributions", data);
    return data;
  } catch (err) {
    console.error("fetchContributions error:", err);
    return { weeks: [], totalContributions: 0 };
  }
}

/* ── Analytics Computation ─────────────────────────── */

// Predefined colors for popular languages
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  PHP: "#4F5D95",
  EJS: "#a91e50",
  Blade: "#f7523f",
  Shell: "#89e051",
  "C#": "#178600",
  "C++": "#f34b7d",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
};

export function computeAnalytics(profile, repos) {
  const now = new Date();
  const created = new Date(profile.created_at);
  const accountAgeDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  const accountAgeYears = (accountAgeDays / 365).toFixed(1);

  // Filter out forks
  const ownRepos = repos.filter((r) => !r.fork);
  const forkedRepos = repos.filter((r) => r.fork);

  // Aggregate stats
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const totalWatchers = repos.reduce((s, r) => s + r.watchers_count, 0);
  const totalOpenIssues = repos.reduce((s, r) => s + r.open_issues_count, 0);
  const totalSize = repos.reduce((s, r) => s + r.size, 0); // in KB

  // Most starred
  const mostStarred = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  // Most forked
  const mostForked = [...repos].sort(
    (a, b) => b.forks_count - a.forks_count
  )[0];

  // Largest repo
  const largest = [...repos].sort((a, b) => b.size - a.size)[0];

  // Most recently pushed
  const mostActive = [...repos].sort(
    (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)
  )[0];

  // Repos with homepage (deployed)
  const deployedRepos = repos.filter((r) => r.homepage);

  // Language distribution from repo primary language
  const langCount = {};
  repos.forEach((r) => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });
  const languages = Object.entries(langCount)
    .map(([name, count]) => ({
      name,
      count,
      percentage: ((count / repos.length) * 100).toFixed(1),
      color: LANGUAGE_COLORS[name] || "#6e7681",
    }))
    .sort((a, b) => b.count - a.count);

  // Repos created per year
  const reposByYear = {};
  repos.forEach((r) => {
    const year = new Date(r.created_at).getFullYear();
    reposByYear[year] = (reposByYear[year] || 0) + 1;
  });
  const timeline = Object.entries(reposByYear)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);

  // Top repos (by stars, then by size, then by recency)
  const topRepos = [...repos]
    .sort((a, b) => {
      const scoreA = a.stargazers_count * 10 + a.forks_count * 5 + a.size / 100;
      const scoreB = b.stargazers_count * 10 + b.forks_count * 5 + b.size / 100;
      return scoreB - scoreA;
    })
    .slice(0, 6);

  return {
    profile: {
      ...profile,
      accountAgeDays,
      accountAgeYears,
      joinedDate: created.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    },
    stats: {
      totalRepos: repos.length,
      ownRepos: ownRepos.length,
      forkedRepos: forkedRepos.length,
      totalStars,
      totalForks,
      totalWatchers,
      totalOpenIssues,
      totalSizeKB: totalSize,
      totalSizeMB: (totalSize / 1024).toFixed(1),
      deployedCount: deployedRepos.length,
      avgSizeKB: repos.length ? Math.round(totalSize / repos.length) : 0,
    },
    highlights: { mostStarred, mostForked, largest, mostActive },
    languages,
    timeline,
    topRepos,
  };
}

/* ── Event helpers ─────────────────────────────────── */

export function formatEventType(type) {
  const map = {
    PushEvent: "Pushed to",
    CreateEvent: "Created",
    DeleteEvent: "Deleted",
    WatchEvent: "Starred",
    ForkEvent: "Forked",
    IssuesEvent: "Issue",
    IssueCommentEvent: "Commented on",
    PullRequestEvent: "Pull Request",
    PullRequestReviewEvent: "Reviewed PR",
    ReleaseEvent: "Released",
    PublicEvent: "Open Sourced",
  };
  return map[type] || type.replace("Event", "");
}

export function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
}
