"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Github, Star, GitFork, Code2, Calendar,
  Activity, TrendingUp, Award, ExternalLink,
  Zap, BarChart3, Globe, FolderGit2, Rocket, Trophy, Layers,
  LucideIcon,
} from "lucide-react";
import { useScrollReveal, useCountUp, useTilt } from "../../hooks/useScrollReveal";
import SectionShell from "../ui/SectionShell";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import Pill from "../ui/Pill";
import {
  fetchProfile, fetchRepos, fetchEvents, fetchContributions,
  computeAnalytics, formatEventType, timeAgo, LanguageMetric, TimelineItem, ContributionData
} from "../../utils/githubApi";

/* ── Animated Counter ──────────────────────────────── */
interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  isVisible: boolean;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, suffix = "", label, icon: Icon, isVisible }) => {
  const count = useCountUp(value ?? 0, 1400, isVisible);
  const tilt = useTilt(4);
  return (
    <GlassCard
      ref={tilt.ref}
      style={tilt.style}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      padding="p-5"
      className="text-center"
      interactive={true}
    >
      <div className="mb-3 mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="font-mono text-3xl font-bold text-text mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</div>
    </GlassCard>
  );
};

/* ── Language Donut Chart ────────────────────────── */
interface LanguageDonutChartProps {
  languages: LanguageMetric[];
  isVisible: boolean;
}

const LanguageDonutChart: React.FC<LanguageDonutChartProps> = ({ languages, isVisible }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const radius = 50;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  const validLangs = useMemo(() => {
    return languages.filter(lang => parseFloat(lang.percentage) > 0);
  }, [languages]);

  const computedSlices = useMemo(() => {
    let accumulatedPercent = 0;
    return validLangs.map((lang, index) => {
      const percent = parseFloat(lang.percentage);
      const sliceSize = (percent / 100) * circumference;
      const rotationAngle = (accumulatedPercent / 100) * 360 - 90;
      accumulatedPercent += percent;
      return {
        ...lang,
        sliceSize,
        rotationAngle,
        index,
      };
    });
  }, [validLangs, circumference]);

  const activeLang = hoveredIndex !== null ? computedSlices[hoveredIndex] : computedSlices[0];

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 py-2">
      <div className="relative w-48 h-48 flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="transparent"
            stroke="var(--border)"
            strokeWidth={strokeWidth - 4}
            className="opacity-20"
          />
          {computedSlices.map((slice) => {
            const isHovered = hoveredIndex === slice.index;
            const currentStrokeWidth = isHovered ? strokeWidth + 3 : strokeWidth;
            return (
              <circle
                key={slice.name}
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={currentStrokeWidth}
                strokeDasharray={`${isVisible ? slice.sliceSize : 0} ${circumference}`}
                transform={`rotate(${slice.rotationAngle} 60 60)`}
                className="transition-all duration-500 ease-out cursor-pointer"
                style={{
                  filter: isHovered
                    ? `drop-shadow(0 0 6px ${slice.color}80)`
                    : "none",
                }}
                onMouseEnter={() => setHoveredIndex(slice.index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {activeLang && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-2xl font-bold font-mono text-text">
              {activeLang.percentage}%
            </span>
            <span
              className="text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 max-w-[110px] truncate"
              style={{ color: activeLang.color }}
            >
              {activeLang.name}
            </span>
            <span className="text-[10px] text-text-muted mt-0.5">
              {activeLang.count} {activeLang.count === 1 ? "repo" : "repos"}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 w-full space-y-3">
        {computedSlices.map((slice) => {
          const isHovered = hoveredIndex === slice.index;
          return (
            <div
              key={slice.name}
              className={`flex items-center gap-4 p-2.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                isHovered
                  ? "bg-surface-elevated border-primary/30 scale-[1.02] shadow-sm"
                  : "bg-transparent border-transparent hover:bg-surface/30"
              }`}
              onMouseEnter={() => setHoveredIndex(slice.index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className="h-3.5 w-3.5 rounded-full shrink-0 shadow-inner transition-transform duration-300"
                style={{
                  backgroundColor: slice.color,
                  transform: isHovered ? "scale(1.2)" : "scale(1)",
                  boxShadow: isHovered ? `0 0 8px ${slice.color}` : "none",
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-text truncate">
                    {slice.name}
                  </span>
                  <span className="font-mono font-bold text-text">
                    {slice.percentage}%
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-border/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${slice.percentage}%` : "0%",
                      backgroundColor: slice.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Timeline Bar Chart (SVG) ─────────────────────── */
interface TimelineChartProps {
  timeline: TimelineItem[];
  isVisible: boolean;
}

const TimelineChart: React.FC<TimelineChartProps> = ({ timeline, isVisible }) => {
  const maxCount = Math.max(...timeline.map((t) => t.count), 1);
  const wUnit = timeline.length ? 400 / timeline.length : 0;
  return (
    <div className="relative h-40 w-full">
      <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
        {timeline.map((item, i) => {
          const barH = (item.count / maxCount) * 120;
          const x = i * wUnit + 10;
          const w = wUnit - 20;
          return (
            <g key={item.year}>
              <rect
                x={x} y={140 - (isVisible ? barH : 0)} width={w > 0 ? w : 0} rx="6"
                height={isVisible ? (barH > 0 ? barH : 0) : 0}
                fill="var(--primary)" opacity="0.7"
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${i * 150}ms` }}
              />
              <text x={x + (w > 0 ? w : 0) / 2} y="156" textAnchor="middle" fontSize="11"
                fill="var(--text-secondary)" fontFamily="Inter">
                {item.year}
              </text>
              {isVisible && (
                <text x={x + (w > 0 ? w : 0) / 2} y={135 - barH} textAnchor="middle" fontSize="12"
                  fill="var(--text)" fontWeight="bold" fontFamily="Inter">
                  {item.count}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Availability Bento Card ────────────────────────── */
interface AvailabilityCardProps {
  profile: any;
  languages: LanguageMetric[];
  isVisible: boolean;
  tilt: any;
  delay: string;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ profile, languages, isVisible, tilt, delay }) => {
  const topLanguages = useMemo(() => {
    return languages.slice(0, 3).map(l => l.name);
  }, [languages]);

  return (
    <GlassCard
      ref={tilt.ref}
      style={{
        ...tilt.style,
        transitionDelay: delay
      }}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      padding="p-6"
      className={`col-span-2 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      interactive={true}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Opportunities</span>
          </div>
          <span className="text-xs text-text-secondary font-medium">{profile.location || "Remote / India"}</span>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-1">Current Focus</h4>
          <p className="text-text font-medium text-sm">
            Developing premium full-stack web applications and interactive client experiences.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Preferred Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {topLanguages.map((lang) => (
              <span
                key={lang}
                className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-semibold"
              >
                {lang}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-secondary text-xs font-medium">React</span>
            <span className="px-2 py-0.5 rounded bg-surface-elevated border border-border text-text-secondary text-xs font-medium">Tailwind</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

/* ── GitHub Achievements Bento Card ───────────────────── */
interface AchievementsCardProps {
  stats: any;
  languages: LanguageMetric[];
  events: any[];
  isVisible: boolean;
  tilt: any;
  delay: string;
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ stats, languages, events, isVisible, tilt, delay }) => {
  const achievements = useMemo(() => {
    const list = [];
    if (stats.totalStars > 0) {
      list.push({
        id: "star_collector",
        title: "Star Collector",
        desc: `${stats.totalStars} stars earned`,
        color: "from-amber-400 to-orange-500",
        icon: "⭐",
      });
    } else {
      list.push({
        id: "explorer",
        title: "Explorer",
        desc: "Beginning the journey",
        color: "from-blue-400 to-indigo-500",
        icon: "🧭",
      });
    }

    if (stats.deployedCount > 0) {
      list.push({
        id: "deployer",
        title: "Live Deployer",
        desc: `${stats.deployedCount} active links`,
        color: "from-emerald-400 to-teal-500",
        icon: "🚀",
      });
    }

    if (languages.length > 2) {
      list.push({
        id: "polyglot",
        title: "Polyglot",
        desc: `${languages.length} languages used`,
        color: "from-purple-400 to-pink-500",
        icon: "💻",
      });
    }

    const commitEventsCount = events.filter(e => e.type === "PushEvent").length;
    if (commitEventsCount > 0) {
      list.push({
        id: "pr_creator",
        title: "Active Pusher",
        desc: `${commitEventsCount} push events recently`,
        color: "from-cyan-400 to-blue-500",
        icon: "⚡",
      });
    } else {
      list.push({
        id: "observer",
        title: "Watchtower",
        desc: "Monitoring events",
        color: "from-gray-400 to-slate-500",
        icon: "👁️",
      });
    }
    return list.slice(0, 4);
  }, [stats, languages, events]);

  return (
    <GlassCard
      ref={tilt.ref}
      style={{
        ...tilt.style,
        transitionDelay: delay
      }}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      padding="p-6"
      className={`col-span-2 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      interactive={true}
    >
      <div className="flex flex-col h-full justify-between space-y-4">
        <div className="flex items-center gap-2 pl-1">
          <Trophy className="h-4.5 w-4.5 text-primary animate-pulse" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">GitHub Achievements</h4>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="group/badge flex items-center gap-2.5 p-2 rounded-xl bg-surface-elevated/40 border border-border/40 hover:border-primary/20 hover:bg-surface-elevated/80 transition-all duration-300"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ach.color} text-lg shadow-md group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-transform duration-300`}
              >
                {ach.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-text truncate">{ach.title}</div>
                <div className="text-[10px] text-text-secondary truncate">{ach.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

/* ── Contribution Calendar ─────────────────────────── */
interface ContributionCalendarProps {
  contributions: ContributionData | null;
  isVisible: boolean;
}

const ContributionCalendar: React.FC<ContributionCalendarProps> = ({ contributions, isVisible }) => {
  if (!contributions?.weeks?.length) {
    return (
      <div className="text-center py-10 text-text-secondary">
        <Calendar className="w-8 h-8 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Contribution data unavailable</p>
      </div>
    );
  }
  const levelColors = [
    "color-mix(in srgb, var(--border) 30%, transparent)",
    "color-mix(in srgb, var(--primary) 20%, transparent)",
    "color-mix(in srgb, var(--primary) 40%, transparent)",
    "color-mix(in srgb, var(--primary) 60%, transparent)",
    "color-mix(in srgb, var(--primary) 90%, transparent)",
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-text-secondary">
          {contributions.totalContributions} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div key={i} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px] min-w-[720px]">
          {contributions.weeks.slice(-52).map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="h-3 w-3 rounded-sm"
                  style={{
                    backgroundColor: levelColors[day.level] || levelColors[0]
                  }}
                  title={`${day.date}: Level ${day.level} (${day.count} contributions)`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Repo Card ─────────────────────────────────────── */
interface RepoCardProps {
  repo: any;
  index: number;
  isVisible: boolean;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo, index, isVisible }) => (
  <GlassCard
    as="a" href={repo.html_url} target="_blank" rel="noopener noreferrer"
    padding="p-5"
    className={`scroll-reveal stagger-${Math.min(index + 1, 10)} ${isVisible ? "revealed" : ""}`}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <FolderGit2 className="h-5 w-5 text-primary" />
        <h4 className="font-bold text-text group-hover:text-primary transition-colors truncate max-w-[180px]">
          {repo.name}
        </h4>
      </div>
      <ExternalLink className="h-4 w-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </div>
    {repo.description && (
      <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed">
        {repo.description}
      </p>
    )}
    <div className="mt-auto flex items-center gap-4 text-xs text-text-secondary">
      {repo.language && (
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{
            backgroundColor: (({
              JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
              HTML: "#e34c26", PHP: "#4F5D95", EJS: "#a91e50", Blade: "#f7523f",
            } as Record<string, string>)[repo.language]) || "#6e7681"
          }} />
          {repo.language}
        </span>
      )}
      <span className="flex items-center gap-1"><Star className="h-3 w-3" />{repo.stargazers_count}</span>
      <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{repo.forks_count}</span>
    </div>
  </GlassCard>
);

/* ── Activity Event ────────────────────────────────── */
const ActivityItem: React.FC<{ event: any }> = ({ event }) => {
  const repoName = event.repo?.name?.split("/")[1] || event.repo?.name;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Activity className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-text truncate">
          <span className="font-semibold">{formatEventType(event.type)}</span>{" "}
          <span className="text-primary">{repoName}</span>
        </p>
        <p className="text-xs text-text-secondary mt-0.5">{timeAgo(event.created_at)}</p>
      </div>
    </div>
  );
};

/* ── Skeleton Loader ───────────────────────────────── */
const SkeletonCard: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`rounded-3xl border border-border bg-surface/50 p-6 ${className}`}>
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-1/3 rounded-full bg-border/50" />
      <div className="h-8 w-1/2 rounded-full bg-border/50" />
      <div className="h-3 w-2/3 rounded-full bg-border/50" />
    </div>
  </div>
);

/* ── Main Section ──────────────────────────────────── */
export default function GitHubAnalytics() {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statsReveal = useScrollReveal({ threshold: 0.1 });
  const langReveal = useScrollReveal({ threshold: 0.1 });
  const timelineReveal = useScrollReveal({ threshold: 0.1 });
  const calendarReveal = useScrollReveal({ threshold: 0.05 });
  const reposReveal = useScrollReveal({ threshold: 0.1 });
  const activityReveal = useScrollReveal({ threshold: 0.1 });

  const profileTilt = useTilt(3);
  const availabilityTilt = useTilt(3);
  const achievementsTilt = useTilt(3);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [profile, repos, evts, contribs] = await Promise.all([
          fetchProfile(), fetchRepos(), fetchEvents(), fetchContributions(),
        ]);
        if (cancelled) return;
        setAnalytics(computeAnalytics(profile, repos));
        setEvents(evts.slice(0, 10));
        setContributions(contribs);
      } catch (err: any) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <SectionShell id="analytics">
        <SectionHeader eyebrow="Live from GitHub" eyebrowIcon={Github}
          title="Developer Analytics" lead="Loading live GitHub data..." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <SkeletonCard className="md:col-span-2 h-48" />
        </div>
      </SectionShell>
    );
  }

  if (error) {
    return (
      <SectionShell id="analytics">
        <SectionHeader eyebrow="Live from GitHub" eyebrowIcon={Github}
          title="Developer Analytics" lead="Real-time insights from my GitHub profile." />
        <GlassCard padding="p-10" className="text-center max-w-lg mx-auto">
          <Github className="w-12 h-12 mx-auto mb-4 text-text-secondary opacity-50" />
          <h3 className="text-xl font-bold text-text mb-2">Data Unavailable</h3>
          <p className="text-text-secondary mb-6 text-sm">{error}</p>
          <button onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition-colors">
            Retry
          </button>
        </GlassCard>
      </SectionShell>
    );
  }

  const { profile, stats, highlights, languages, timeline, topRepos } = analytics;

  return (
    <SectionShell id="analytics">
      <SectionHeader eyebrow="Live from GitHub" eyebrowIcon={Github}
        title="Developer Analytics"
        lead="Real-time insights, repository metrics, and contribution analytics pulled live from my GitHub profile."
        aside={<Pill icon={Activity} tone="solid">{stats.totalRepos} Repositories</Pill>}
      />

      <div ref={statsReveal.ref} className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <GlassCard
          ref={profileTilt.ref}
          style={{
            ...profileTilt.style,
            transitionDelay: "0ms"
          }}
          onMouseMove={profileTilt.handleMouseMove}
          onMouseLeave={profileTilt.handleMouseLeave}
          padding="p-6"
          className={`col-span-2 lg:row-span-2 transition-all duration-700 ease-out ${
            statsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-5 mb-5">
            <img src={profile.avatar_url} alt={profile.name}
              className="h-20 w-20 rounded-2xl border-2 border-border object-cover shadow-lg" />
            <div>
              <h3 className="text-xl font-bold text-text">{profile.name}</h3>
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1">
                @{profile.login} <ExternalLink className="h-3 w-3" />
              </a>
              {profile.bio && <p className="text-xs text-text-secondary mt-1">{profile.bio}</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
              <div className="text-lg font-bold text-text">{profile.followers}</div>
              <div className="text-[10px] uppercase tracking-wider text-text-secondary">Followers</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
              <div className="text-lg font-bold text-text">{profile.following}</div>
              <div className="text-[10px] uppercase tracking-wider text-text-secondary">Following</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-background/50 border border-border/50">
              <div className="text-lg font-bold text-text">{profile.accountAgeYears}y</div>
              <div className="text-[10px] uppercase tracking-wider text-text-secondary">On GitHub</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
            <Calendar className="h-3.5 w-3.5" />
            <span>Member since {profile.joinedDate}</span>
          </div>
        </GlassCard>

        <div className={`transition-all duration-700 ease-out`} style={{ transitionDelay: "100ms" }}>
          <AnimatedStat value={stats.totalRepos} label="Repositories" icon={FolderGit2} isVisible={statsReveal.isVisible} />
        </div>

        <div className={`transition-all duration-700 ease-out`} style={{ transitionDelay: "200ms" }}>
          <AnimatedStat value={stats.totalStars} label="Stars Earned" icon={Star} isVisible={statsReveal.isVisible} />
        </div>

        <div className={`transition-all duration-700 ease-out`} style={{ transitionDelay: "300ms" }}>
          <AnimatedStat value={stats.deployedCount} label="Deployed" icon={Rocket} isVisible={statsReveal.isVisible} />
        </div>

        <div className={`transition-all duration-700 ease-out`} style={{ transitionDelay: "400ms" }}>
          <AnimatedStat value={languages.length} label="Languages" icon={Globe} isVisible={statsReveal.isVisible} />
        </div>

        <AvailabilityCard
          profile={profile}
          languages={languages}
          isVisible={statsReveal.isVisible}
          tilt={availabilityTilt}
          delay="500ms"
        />

        <AchievementsCard
          stats={stats}
          languages={languages}
          events={events}
          isVisible={statsReveal.isVisible}
          tilt={achievementsTilt}
          delay="600ms"
        />
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-5 mb-6">
        <GlassCard ref={langReveal.ref} padding="p-6" className="md:col-span-3" interactive={false}>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Language Distribution</h3>
          </div>
          <LanguageDonutChart languages={languages} isVisible={langReveal.isVisible} />
        </GlassCard>

        <GlassCard padding="p-6" className="md:col-span-2" interactive={false}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Repository Insights</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Most Starred", value: highlights.mostStarred?.name, sub: `⭐ ${highlights.mostStarred?.stargazers_count}` },
              { label: "Most Forked", value: highlights.mostForked?.name, sub: `🍴 ${highlights.mostForked?.forks_count}` },
              { label: "Most Active", value: highlights.mostActive?.name, sub: timeAgo(highlights.mostActive?.pushed_at) },
              { label: "Original Projects", value: `${stats.ownRepos} / ${stats.totalRepos}`, sub: "repos" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold text-text truncate max-w-[120px] inline-block align-middle">{item.value}</span>
                  <span className="text-xs text-text-secondary ml-2">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 mb-6">
        <GlassCard ref={timelineReveal.ref} padding="p-6" interactive={false}>
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Coding Timeline</h3>
            <span className="text-xs text-text-secondary ml-auto">Repos created per year</span>
          </div>
          <TimelineChart timeline={timeline} isVisible={timelineReveal.isVisible} />
        </GlassCard>

        <GlassCard ref={activityReveal.ref} padding="p-6" interactive={false}>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Recent Activity</h3>
          </div>
          <div className="max-h-72 overflow-y-auto pr-1 custom-scrollbar">
            {events.length > 0 ? (
              events.map((evt, i) => <ActivityItem key={i} event={evt} />)
            ) : (
              <p className="text-sm text-text-secondary text-center py-6">No recent activity</p>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard ref={calendarReveal.ref} padding="p-6" className="mb-6" interactive={false}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-text">Contribution Calendar</h3>
        </div>
        <ContributionCalendar contributions={contributions} isVisible={calendarReveal.isVisible} />
      </GlassCard>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4 pl-1">
            <FolderGit2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Top Repositories</h3>
          </div>
          <div ref={reposReveal.ref} className="grid gap-4 sm:grid-cols-2">
            {topRepos.slice(0, 6).map((repo: any, i: number) => (
              <RepoCard key={repo.id} repo={repo} index={i} isVisible={reposReveal.isVisible} />
            ))}
          </div>
        </div>

        <GlassCard padding="p-6" interactive={false}>
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-bold text-text">Milestones</h3>
          </div>
          <div className="space-y-4">
            {[
              { icon: Award, label: `${profile.accountAgeYears}+ Years on GitHub`, desc: `Since ${new Date(profile.created_at).getFullYear()}` },
              { icon: FolderGit2, label: `${stats.totalRepos} Repositories`, desc: `${stats.ownRepos} original projects` },
              { icon: Rocket, label: `${stats.deployedCount} Deployed Projects`, desc: "Live on the web" },
              { icon: Globe, label: `${languages.length} Languages Used`, desc: languages[0]?.name ? `Top: ${languages[0].name}` : "" },
              { icon: Star, label: `${stats.totalStars} Stars Earned`, desc: highlights.mostStarred?.name || "" },
            ].map((m) => (
              <div key={m.label} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{m.label}</p>
                  <p className="text-xs text-text-secondary truncate max-w-[160px]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="text-center mt-8">
        <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer"
          className="btn-ripple inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-border bg-surface/90 text-text font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:bg-surface-elevated">
          <Github className="h-5 w-5" />
          View Full Profile on GitHub
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </SectionShell>
  );
}
