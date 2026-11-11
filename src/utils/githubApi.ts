import { GITHUB_USERNAME as USERNAME } from "@/lib/github-username";
const API_BASE = "https://api.github.com";
const CACHE_PREFIX = "gh_analytics_";
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

interface CacheItem<T> {
  data: T;
  ts: number;
}

const isExpired = (ts: number) => Date.now() - ts > CACHE_TTL;

// Deletes every expired or unreadable entry, not only the one being read.
function removeExpired(): void {
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith(CACHE_PREFIX)) continue;
    try {
      const { ts } = JSON.parse(localStorage.getItem(key) ?? "") as CacheItem<unknown>;
      if (isExpired(ts)) localStorage.removeItem(key);
    } catch {
      localStorage.removeItem(key);
    }
  }
}

function getCached<T>(key: string): T | null {
  try {
    removeExpired();
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    return (JSON.parse(raw) as CacheItem<T>).data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {
    // Storage full or blocked: the page still works, just uncached.
  }
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function fetchProfile(): Promise<any> {
  const cached = getCached<any>("profile");
  if (cached) return cached;
  const data = await fetchJSON<any>(`${API_BASE}/users/${USERNAME}`);
  setCache("profile", data);
  return data;
}

export async function fetchRepos(): Promise<any[]> {
  const cached = getCached<any[]>("repos");
  if (cached) return cached;
  const data = await fetchJSON<any[]>(
    `${API_BASE}/users/${USERNAME}/repos?per_page=100&sort=updated`
  );
  setCache("repos", data);
  return data;
}

export async function fetchEvents(): Promise<any[]> {
  const cached = getCached<any[]>("events");
  if (cached) return cached;
  const data = await fetchJSON<any[]>(
    `${API_BASE}/users/${USERNAME}/events?per_page=30`
  );
  setCache("events", data);
  return data;
}

export interface ContributionDay {
  date: string;
  level: number;
  count: number;
}

export interface ContributionData {
  weeks: ContributionDay[][];
  totalContributions: number;
}

export async function fetchContributions(): Promise<ContributionData> {
  const cached = getCached<ContributionData>("contributions");
  if (cached) return cached;

  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
    );
    if (!res.ok) throw new Error("Contributions fetch failed");
    const json: {
      total: { lastYear: number };
      contributions: ContributionDay[];
    } = await res.json();

    // The API returns a flat list of days; the calendar draws Sunday-first weeks.
    const firstSunday = json.contributions.findIndex(
      (day) => new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0
    );
    const days = json.contributions.slice(Math.max(firstSunday, 0));
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    const totalContributions = json.total.lastYear;

    const data: ContributionData = { weeks, totalContributions };
    setCache("contributions", data);
    return data;
  } catch (err) {
    console.warn("Contribution data unavailable:", err);
    return { weeks: [], totalContributions: 0 };
  }
}

export interface YearTotals {
  currentYear: number;
  current: number;
  previousYear: number;
  previous: number;
}

export async function fetchYearTotals(): Promise<YearTotals | null> {
  const cached = getCached<YearTotals>("year_totals");
  if (cached) return cached;

  try {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${previousYear}&y=${currentYear}`
    );
    if (!res.ok) throw new Error("Year totals fetch failed");
    const json: { total: Record<string, number> } = await res.json();
    const data: YearTotals = {
      currentYear,
      current: json.total[currentYear] ?? 0,
      previousYear,
      previous: json.total[previousYear] ?? 0,
    };
    setCache("year_totals", data);
    return data;
  } catch (err) {
    console.warn("Yearly contribution totals unavailable:", err);
    return null;
  }
}

export interface LanguageMetric {
  name: string;
  count: number;
  percentage: string;
  color: string;
}

export interface TimelineItem {
  year: number;
  count: number;
}

// Validated for color-vision separation. Assigned by rank, never cycled.
const LANGUAGE_COLORS = ["#5459AE", "#E8921A", "#0E9F97", "#C25BD6", "#4238B8", "#B3701A", "#E0669A"];
const OTHER_LANGUAGE_COLOR = "#8A8A93";

export function computeAnalytics(profile: any, repos: any[]) {
  const now = new Date();
  const created = new Date(profile.created_at);
  const accountAgeDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  const accountAgeYears = (accountAgeDays / 365).toFixed(1);

  const ownRepos = repos.filter((r) => !r.fork);
  const forkedRepos = repos.filter((r) => r.fork);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const totalWatchers = repos.reduce((s, r) => s + r.watchers_count, 0);
  const totalOpenIssues = repos.reduce((s, r) => s + r.open_issues_count, 0);
  const totalSize = repos.reduce((s, r) => s + r.size, 0); // in KB

  const mostStarred = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];

  const mostForked = [...repos].sort(
    (a, b) => b.forks_count - a.forks_count
  )[0];

  const largest = [...repos].sort((a, b) => b.size - a.size)[0];

  const mostActive = [...repos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  )[0];

  const deployedRepos = repos.filter((r) => r.homepage);

  const langCount: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });
  const languages: LanguageMetric[] = Object.entries(langCount)
    .map(([name, count]) => ({
      name,
      count,
      percentage: ((count / repos.length) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count)
    .map((language, i) => ({
      ...language,
      color: LANGUAGE_COLORS[i] ?? OTHER_LANGUAGE_COLOR,
    }));

  const reposByYear: Record<string, number> = {};
  repos.forEach((r) => {
    const year = new Date(r.created_at).getFullYear();
    reposByYear[year] = (reposByYear[year] || 0) + 1;
  });
  const timeline: TimelineItem[] = Object.entries(reposByYear)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);

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

export function formatEventType(type: string): string {
  const map: Record<string, string> = {
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

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
}
