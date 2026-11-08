"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Github, Star, GitFork, ExternalLink, FolderGit2, Rocket, Globe, Compass, Code2, Zap, Eye, Award,
  LucideIcon,
} from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import {
  fetchProfile, fetchRepos, fetchEvents, fetchContributions,
  computeAnalytics, formatEventType, timeAgo, LanguageMetric, TimelineItem, ContributionData,
} from "@/utils/githubApi";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const TileTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-4 text-xl font-extrabold">{children}</h2>
);

const Stat = ({ value, label, tone }: { value: number; label: string; tone: TileTone }) => (
  <Tile tone={tone} corner className={`flex min-h-32 flex-col justify-center p-5 ${tone === "violet" ? "!text-white" : ""}`}>
    <span className="wide block text-4xl font-extrabold">{value}</span>
    <span className="wide mt-1 block">{label}</span>
  </Tile>
);

const LanguageDonut = ({ languages }: { languages: LanguageMetric[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const slices = useMemo(() => {
    let accumulated = 0;
    return languages
      .filter((lang) => parseFloat(lang.percentage) > 0)
      .map((lang) => {
        const percent = parseFloat(lang.percentage);
        const rotation = (accumulated / 100) * 360 - 90;
        accumulated += percent;
        return { ...lang, size: (percent / 100) * circumference, rotation };
      });
  }, [languages, circumference]);
  const active = slices[hovered ?? 0];

  return (
    <div className="flex flex-col items-center gap-8 md:flex-row">
      <div className="relative h-48 w-48 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
          {slices.map((slice, i) => (
            <circle
              key={slice.name}
              cx="60" cy="60" r={radius} fill="transparent"
              stroke={slice.color}
              strokeWidth={hovered === i ? 17 : 14}
              strokeDasharray={`${slice.size} ${circumference}`}
              transform={`rotate(${slice.rotation} 60 60)`}
              className="cursor-pointer transition-[stroke-width] duration-200"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        {active && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="wide text-2xl font-extrabold">{active.percentage}%</span>
            <span className="max-w-[110px] text-xs font-bold">{active.name}</span>
            <span className="text-xs">{plural(active.count, "repo")}</span>
          </div>
        )}
      </div>
      <ul className="w-full flex-1 space-y-2">
        {slices.map((slice, i) => (
          <li
            key={slice.name}
            className="flex items-center gap-3"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="flex-1 font-semibold">{slice.name}</span>
            <span className="font-bold tabular-nums">{slice.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TimelineChart = ({ timeline }: { timeline: TimelineItem[] }) => {
  const max = Math.max(...timeline.map((t) => t.count), 1);
  return (
    <div className="flex h-44 items-end gap-3" role="img" aria-label={timeline.map((t) => `${t.year}: ${plural(t.count, "repo")}`).join(", ")}>
      {timeline.map((item) => (
        <div key={item.year} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          <span className="text-sm font-bold">{item.count}</span>
          <div className="w-full rounded-t-lg bg-violet" style={{ height: `${(item.count / max) * 70}%` }} />
          <span className="text-sm">{item.year}</span>
        </div>
      ))}
    </div>
  );
};

// Light to dark, on a white tile, so each level reads as one step darker.
const LEVEL_COLORS = ["#E1E1E1", "#A7D8D6", "#7D82D0", "#595959", "#000000"];

const ContributionCalendar = ({ contributions }: { contributions: ContributionData | null }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // On narrow screens, open on the most recent weeks.
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollLeft = scrollerRef.current.scrollWidth;
  }, [contributions]);

  if (!contributions) return null;
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-medium">{contributions.totalContributions} contributions in the last year</span>
        <span className="flex items-center gap-1.5">
          Less
          {LEVEL_COLORS.map((color) => <span key={color} className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />)}
          More
        </span>
      </div>
      <div ref={scrollerRef} className="overflow-x-auto pb-2">
        <div className="flex min-w-[720px] gap-[3px]">
          {contributions.weeks.slice(-52).map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0] }}
                  title={`${day.date}: ${plural(day.count, "contribution")}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface Achievement { title: string; desc: string; Icon: LucideIcon }

const achievementsFor = (stats: any, languages: LanguageMetric[], events: any[]): Achievement[] => {
  const pushes = events.filter((e) => e.type === "PushEvent").length;
  return [
    stats.totalStars > 0
      ? { title: "Star Collector", desc: `${plural(stats.totalStars, "star")} earned`, Icon: Star }
      : { title: "Explorer", desc: "Beginning the journey", Icon: Compass },
    ...(stats.deployedCount > 0 ? [{ title: "Live Deployer", desc: plural(stats.deployedCount, "active link"), Icon: Rocket }] : []),
    ...(languages.length > 2 ? [{ title: "Polyglot", desc: `${plural(languages.length, "language")} used`, Icon: Code2 }] : []),
    pushes > 0
      ? { title: "Active Pusher", desc: `${plural(pushes, "push event")} recently`, Icon: Zap }
      : { title: "Watchtower", desc: "Monitoring events", Icon: Eye },
  ].slice(0, 4);
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Wordmark className="mb-6">GitHub Stats</Wordmark>
    {children}
  </div>
);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [contributions, setContributions] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [profile, repos, evts, contribs] = await Promise.all([
          fetchProfile(), fetchRepos(), fetchEvents(), fetchContributions(),
        ]);
        if (cancelled) return;
        setAnalytics(computeAnalytics(profile, repos));
        setEvents(evts.slice(0, 10));
        setContributions(contribs);
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <Shell>
        <p className="mb-4 text-graphite">Loading GitHub stats</p>
        <div className="grid animate-pulse grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5" aria-label="Loading GitHub stats" role="status">
          {["bg-mint", "bg-violet", "bg-amber", "bg-pink"].map((c) => <div key={c} className={`h-32 rounded-[20px] ${c}`} />)}
          <div className="col-span-2 h-56 rounded-[20px] bg-page lg:col-span-4" />
        </div>
      </Shell>
    );
  }

  if (failed || !analytics) {
    return (
      <Shell>
        <Tile tone="amber" className="max-w-xl p-8">
          <h2 className="wide text-2xl font-extrabold">GitHub stats couldn&apos;t load</h2>
          <p className="mb-6 mt-2 text-lg">GitHub may be limiting requests for a moment. Try again, or see the profile directly.</p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => window.location.reload()} className="min-h-11 rounded-full bg-ink px-6 font-semibold text-white">
              Try again
            </button>
            <a href="https://github.com/nitishbytaru" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-frame px-6 font-semibold">
              Open GitHub profile
            </a>
          </div>
        </Tile>
      </Shell>
    );
  }

  const { profile, stats, highlights, languages, timeline, topRepos } = analytics;
  const achievements = achievementsFor(stats, languages, events);

  return (
    <Shell>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        <Tile tone="periwinkle" className="col-span-2 p-6 lg:row-span-2">
          <div className="flex items-center gap-5">
            <img src={profile.avatar_url} alt={profile.name} className="h-20 w-20 rounded-full object-cover" />
            <div className="min-w-0">
              <h2 className="wide text-2xl font-extrabold">{profile.name}</h2>
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
                @{profile.login} <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          {profile.bio && <p className="mt-3 max-w-[60ch]">{profile.bio}</p>}
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/30 pt-4">
            <div><dd className="wide text-2xl font-extrabold text-white">{profile.followers}</dd><dt className="text-sm">Followers</dt></div>
            <div><dd className="wide text-2xl font-extrabold text-white">{profile.following}</dd><dt className="text-sm">Following</dt></div>
            <div><dd className="wide text-2xl font-extrabold text-white">{profile.accountAgeYears}y</dd><dt className="text-sm">On GitHub</dt></div>
          </dl>
          <p className="mt-4 text-sm">Member since {profile.joinedDate}</p>
        </Tile>

        <Stat value={stats.totalRepos} label="Repositories" tone="mint" />
        <Stat value={stats.totalStars} label="Stars Earned" tone="amber" />
        <Stat value={stats.deployedCount} label="Deployed" tone="violet" />
        <Stat value={languages.length} label="Languages" tone="pink" />

        <Tile tone="white" className="col-span-2 p-6 lg:col-span-3">
          <TileTitle>Language Distribution</TileTitle>
          <LanguageDonut languages={languages} />
        </Tile>

        <Tile tone="periwinkle" className="col-span-2 p-6 lg:col-span-1">
          <TileTitle>Achievements</TileTitle>
          <ul className="space-y-4">
            {achievements.map(({ title, desc, Icon }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <span><span className="block font-bold">{title}</span><span className="block text-sm">{desc}</span></span>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile tone="amber" className="col-span-2 p-6">
          <TileTitle>Repository Insights</TileTitle>
          <dl className="divide-y divide-ink/20">
            {[
              { label: "Most Starred", value: highlights.mostStarred?.name, sub: plural(highlights.mostStarred?.stargazers_count ?? 0, "star") },
              { label: "Most Forked", value: highlights.mostForked?.name, sub: plural(highlights.mostForked?.forks_count ?? 0, "fork") },
              { label: "Most Active", value: highlights.mostActive?.name, sub: timeAgo(highlights.mostActive?.pushed_at) },
              { label: "Original Projects", value: `${stats.ownRepos} / ${stats.totalRepos}`, sub: "repos" },
            ].map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5">
                <dt>{item.label}</dt>
                <dd className="break-all text-right"><span className="font-bold">{item.value}</span> <span className="text-sm">{item.sub}</span></dd>
              </div>
            ))}
          </dl>
        </Tile>

        <Tile tone="mint" className="col-span-2 p-6">
          <TileTitle>Coding Timeline</TileTitle>
          <TimelineChart timeline={timeline} />
          <p className="mt-2 text-sm">Repos created per year</p>
        </Tile>

        {contributions?.weeks?.length ? (
          <Tile tone="white" className="col-span-2 p-6 lg:col-span-4">
            <TileTitle>Contribution Calendar</TileTitle>
            <ContributionCalendar contributions={contributions} />
          </Tile>
        ) : null}

        <div className="col-span-2 grid gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-rows-[auto_1fr_1fr_1fr] lg:gap-5">
          <h2 className="wide text-xl font-extrabold sm:col-span-2">Top Repositories</h2>
          {topRepos.slice(0, 6).map((repo: any) => (
            <Tile key={repo.id} as="a" href={repo.html_url} target="_blank" rel="noopener noreferrer" tone="white" interactive corner className="flex flex-col p-5">
              <h3 className="break-all pr-6 font-bold"><FolderGit2 className="mr-2 inline h-5 w-5" aria-hidden="true" />{repo.name}</h3>
              {repo.description && <p className="mb-4 mt-2 text-sm leading-relaxed">{repo.description}</p>}
              <p className="mt-auto flex items-center gap-4 pt-2 text-sm">
                {repo.language && <span>{repo.language}</span>}
                <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" aria-hidden="true" />{repo.stargazers_count}</span>
                <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" aria-hidden="true" />{repo.forks_count}</span>
              </p>
            </Tile>
          ))}
        </div>

        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1 lg:gap-5">
          <Tile tone="pink" className="p-6">
            <TileTitle>Milestones</TileTitle>
            <ul className="space-y-3">
              {[
                { Icon: Award, label: `${profile.accountAgeYears}+ years on GitHub`, desc: `Since ${new Date(profile.created_at).getFullYear()}` },
                { Icon: FolderGit2, label: plural(stats.totalRepos, "repository").replace("repositorys", "repositories"), desc: `${stats.ownRepos} original` },
                { Icon: Rocket, label: `${stats.deployedCount} deployed`, desc: "Live on the web" },
                { Icon: Globe, label: plural(languages.length, "language"), desc: languages[0]?.name ? `Top: ${languages[0].name}` : "" },
              ].map(({ Icon, label, desc }) => (
                <li key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <span><span className="block font-semibold">{label}</span><span className="block text-sm">{desc}</span></span>
                </li>
              ))}
            </ul>
          </Tile>
          <Tile tone="violet" className="flex-1 p-6">
            <TileTitle>Recent Activity</TileTitle>
            {events.length > 0 ? (
              <ul className="space-y-3">
                {events.slice(0, 5).map((event, i) => (
                  <li key={i}>
                    <span className="block font-semibold">{formatEventType(event.type)} {event.repo?.name?.split("/")[1] ?? event.repo?.name}</span>
                    <span className="block text-sm">{timeAgo(event.created_at)}</span>
                  </li>
                ))}
              </ul>
            ) : <p>No recent activity</p>}
          </Tile>
        </div>

        <Tile as="a" href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" tone="black" interactive className="col-span-2 flex items-center justify-center gap-3 p-5 font-semibold lg:col-span-4">
          <Github className="h-5 w-5" aria-hidden="true" />
          View Full Profile on GitHub
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </Tile>
      </div>
    </Shell>
  );
}
