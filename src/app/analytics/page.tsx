"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight, Github, GitCommitHorizontal, GitFork, Star, ExternalLink, Plus, Rocket, Compass, Code2, Zap, Eye,
  LucideIcon,
} from "lucide-react";
import Tile, { TileTone } from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import { TechIcon } from "@/components/ui/TechIcon";
import {
  fetchProfile, fetchRepos, fetchEvents, fetchContributions,
  computeAnalytics, formatEventType, timeAgo, LanguageMetric, TimelineItem, ContributionData,
} from "@/utils/githubApi";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const TileTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="wide mb-4 text-xl font-extrabold">{children}</h2>
);

const CountUp = ({ value }: { value: number }) => {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    let frame = 0;
    const startedAt = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1100);
      setShown(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{shown}</>;
};

const Stat = ({ value, label, tone }: { value: number; label: string; tone: TileTone }) => (
  <Tile tone={tone} corner className={`group flex min-h-32 grow basis-0 flex-col justify-center !rounded-none p-5 motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] lg:hover:grow-[1.5] ${tone === "violet" ? "!text-white" : ""}`}>
    <span className="wide block text-4xl font-extrabold transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 origin-left"><CountUp value={value} /></span>
    <span className="wide mt-1 block">{label}</span>
  </Tile>
);

const LanguageRibbon = ({ languages }: { languages: LanguageMetric[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const slices = useMemo(() => languages.filter((lang) => parseFloat(lang.percentage) > 0), [languages]);
  const active = slices[hovered ?? 0];

  return (
    <div onPointerLeave={() => setHovered(null)}>
      {active && (
        <p className="mb-4 flex flex-wrap items-baseline gap-x-3">
          <span className="wide text-5xl font-extrabold">{active.percentage}%</span>
          <span className="text-lg font-bold">{active.name}</span>
          <span className="text-sm">{plural(active.count, "repo")}</span>
        </p>
      )}
      <div className="ribbon-in flex h-14 origin-left gap-1" aria-hidden="true">
        {slices.map((slice, i) => (
          <span
            key={slice.name}
            onPointerEnter={() => setHovered(i)}
            className="min-w-2.5 cursor-pointer rounded-lg motion-safe:transition-[flex-grow] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ backgroundColor: slice.color, flexGrow: parseFloat(slice.percentage) * (hovered === i ? 1.8 : 1), flexBasis: 0 }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {slices.map((slice, i) => (
          <li
            key={slice.name}
            onPointerEnter={() => setHovered(i)}
            className={`flex cursor-default items-center gap-2 text-sm motion-safe:transition-opacity motion-safe:duration-200 ${hovered !== null && hovered !== i ? "opacity-40" : ""}`}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} />
            <span className="font-semibold">{slice.name}</span>
            <span className="font-bold tabular-nums">{slice.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContributionSkyline = ({ contributions, children }: { contributions: ContributionData | null; children: React.ReactNode }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const weeks = useMemo(
    () => (contributions?.weeks ?? []).slice(-52).map((week) => ({
      total: week.reduce((sum, day) => sum + day.count, 0),
      start: week[0]?.date ?? "",
    })),
    [contributions]
  );
  const tallest = Math.max(...weeks.map((week) => week.total), 1);
  const shown = hovered !== null ? weeks[hovered] : null;

  return (
    <Tile tone="indigo" className="col-span-2 p-6 lg:col-span-4 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {children}
        {weeks.length > 0 && (
          <p className="shrink-0 md:text-right" aria-live="off">
            <span className="wide block text-6xl font-extrabold leading-none tabular-nums md:text-7xl">
              {shown ? shown.total : <CountUp value={contributions?.totalContributions ?? 0} />}
            </span>
            <span className="mt-2 block font-semibold">
              {shown ? `${shown.total === 1 ? "contribution" : "contributions"}, week of ${shown.start}` : "contributions in the last year"}
            </span>
          </p>
        )}
      </div>

      {weeks.length > 0 && (
        <div
          onPointerLeave={() => setHovered(null)}
          role="img"
          aria-label={`${contributions?.totalContributions} contributions over the last ${weeks.length} weeks`}
          className="group/sky mt-8 flex h-40 items-end gap-[3px] sm:gap-1"
        >
          {weeks.map((week, index) => (
            <span key={week.start || index} onPointerEnter={() => setHovered(index)} className="flex h-full min-w-0 flex-1 cursor-pointer items-end">
              <span
                className={`bar-rise block w-full origin-bottom rounded-t-[3px] motion-safe:transition-[background-color,opacity] motion-safe:duration-200 ${
                  hovered === index ? "bg-amber" : week.total === 0 ? "bg-indigo-soft group-hover/sky:opacity-50" : "bg-periwinkle group-hover/sky:opacity-50"
                }`}
                style={{ height: `${Math.max(5, (week.total / tallest) * 100)}%`, animationDelay: `${index * 12}ms` }}
              />
            </span>
          ))}
        </div>
      )}
    </Tile>
  );
};

const TimelineChart = ({ timeline }: { timeline: TimelineItem[] }) => {
  const max = Math.max(...timeline.map((t) => t.count), 1);
  return (
    <div className="group/chart flex h-44 items-end gap-3" role="img" aria-label={timeline.map((t) => `${t.year}: ${plural(t.count, "repo")}`).join(", ")}>
      {timeline.map((item, index) => (
        <div key={item.year} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5 motion-safe:transition-opacity motion-safe:duration-200 group-hover/chart:opacity-40 hover:!opacity-100">
          <span className="text-sm font-bold">{item.count}</span>
          <div className="bar-rise w-full origin-bottom rounded-t-lg bg-violet" style={{ height: `${(item.count / max) * 70}%`, animationDelay: `${index * 110}ms` }} />
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  const cells = () => wrapRef.current?.querySelectorAll<HTMLElement>("[data-week]") ?? [];

  const handleRipple = (event: React.PointerEvent) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>("[data-week]");
    if (!cell || !wrapRef.current || !tipRef.current) return;
    const week = Number(cell.dataset.week);
    const day = Number(cell.dataset.day);
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      cells().forEach((other) => {
        const distance = Math.hypot(Number(other.dataset.week) - week, Number(other.dataset.day) - day);
        other.style.transform = distance < 4 ? `scale(${1 + 0.85 * (1 - distance / 4)})` : "";
      });
    }
    const wrap = wrapRef.current.getBoundingClientRect();
    const box = cell.getBoundingClientRect();
    tipRef.current.textContent = `${cell.dataset.count}, ${cell.dataset.date}`;
    tipRef.current.style.opacity = "1";
    tipRef.current.style.left = `${Math.max(70, Math.min(wrap.width - 70, box.left - wrap.left + box.width / 2))}px`;
    tipRef.current.style.top = `${box.top - wrap.top - 34}px`;
  };

  const clearRipple = () => {
    cells().forEach((other) => { other.style.transform = ""; });
    if (tipRef.current) tipRef.current.style.opacity = "0";
  };

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
      <div ref={wrapRef} onPointerMove={handleRipple} onPointerLeave={clearRipple} className="relative">
        <div ref={tipRef} aria-hidden="true" className="pointer-events-none absolute z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-bold text-white opacity-0 motion-safe:transition-opacity" />
        <div ref={scrollerRef} className="overflow-x-auto py-2">
          <div className="flex min-w-[720px] gap-[3px]">
            {contributions.weeks.slice(-52).map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    data-week={wi}
                    data-day={di}
                    data-date={day.date}
                    data-count={plural(day.count, "contribution")}
                    className="cal-in h-3 w-3 rounded-sm motion-safe:transition-transform motion-safe:duration-150"
                    style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0], animationDelay: `${wi * 14}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
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

interface Milestone { when: string; title: string; detail: string }

const milestonesFor = (profile: any, timeline: TimelineItem[], highlights: any): Milestone[] => {
  const busiest = timeline.reduce<TimelineItem | null>((top, item) => (!top || item.count > top.count ? item : top), null);
  const starred = highlights.mostStarred;
  const active = highlights.mostActive;
  const list: (Milestone | null)[] = [
    { when: String(new Date(profile.created_at).getFullYear()), title: "Joined GitHub", detail: `Member since ${profile.joinedDate}` },
    busiest && { when: String(busiest.year), title: "Busiest year", detail: `${plural(busiest.count, "repo")} created` },
    starred?.stargazers_count > 0
      ? { when: String(new Date(starred.created_at).getFullYear()), title: "Most starred", detail: `${starred.name}, ${plural(starred.stargazers_count, "star")}` }
      : null,
    active && { when: "Now", title: "Latest push", detail: `${active.name}, ${timeAgo(active.pushed_at)}` },
  ];
  return list.filter((item): item is Milestone => item !== null);
};

interface ActivityGroup { repo: string; type: string; count: number; label: string; when: string }

// Consecutive events on one repo read as a single line.
const groupActivity = (events: any[]): ActivityGroup[] => {
  const groups: ActivityGroup[] = [];
  for (const event of events) {
    const repo = event.repo?.name?.split("/")[1] ?? event.repo?.name ?? "";
    const last = groups[groups.length - 1];
    if (last && last.repo === repo && last.type === event.type) {
      last.count += 1;
    } else {
      groups.push({ repo, type: event.type, count: 1, label: formatEventType(event.type), when: timeAgo(event.created_at) });
    }
  }
  return groups.slice(0, 6).map((group) =>
    group.type === "PushEvent"
      ? { ...group, label: group.count === 1 ? "1 push" : `${group.count} pushes` }
      : group
  );
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
        setEvents(evts);
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
  const achievements = achievementsFor(stats, languages, events.slice(0, 10));
  const milestones = milestonesFor(profile, timeline, highlights);
  const activity = groupActivity(events);

  return (
    <Shell>
      <div className="stats-grid grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        <ContributionSkyline contributions={contributions}>
          <div className="min-w-0">
            <div className="flex items-center gap-5">
              <img src={profile.avatar_url} alt={profile.name} className="h-20 w-20 rounded-full object-cover transition-transform duration-300 hover:rotate-3 hover:scale-110" />
              <div className="min-w-0">
                <h2 className="wide text-2xl font-extrabold">{profile.name}</h2>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
                  @{profile.login} <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            {profile.bio && <p className="mt-3 max-w-[60ch]">{profile.bio}</p>}
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              <div><dd className="wide text-xl font-extrabold">{profile.followers}</dd><dt className="text-sm">Followers</dt></div>
              <div><dd className="wide text-xl font-extrabold">{profile.following}</dd><dt className="text-sm">Following</dt></div>
              <div><dd className="wide text-xl font-extrabold">{profile.accountAgeYears}y</dd><dt className="text-sm">Since {profile.joinedDate}</dt></div>
            </dl>
          </div>
        </ContributionSkyline>

        <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-[20px] lg:col-span-4 lg:flex">
          <Stat value={stats.totalRepos} label="Repositories" tone="mint" />
          <Stat value={stats.totalStars} label="Stars Earned" tone="amber" />
          <Stat value={stats.deployedCount} label="Deployed" tone="violet" />
          <Stat value={languages.length} label="Languages" tone="pink" />
        </div>

        <Tile tone="white" className="col-span-2 p-6 lg:col-span-3">
          <TileTitle>Language Distribution</TileTitle>
          <LanguageRibbon languages={languages} />
        </Tile>

        <Tile tone="periwinkle" className="col-span-2 p-6 lg:col-span-1">
          <TileTitle>Achievements</TileTitle>
          <ul className="space-y-4">
            {achievements.map(({ title, desc, Icon }) => (
              <li key={title} className="group/ach flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover/ach:-rotate-12 group-hover/ach:scale-110"><Icon className="h-5 w-5" aria-hidden="true" /></span>
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
              <div key={item.label} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2.5 motion-safe:transition-[padding] motion-safe:duration-300 hover:px-2">
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

        <Tile as="section" tone="pink" aria-labelledby="milestones-heading" className="col-span-2 p-6 lg:col-span-4">
          <h2 id="milestones-heading" className="wide mb-6 text-xl font-extrabold">Milestones</h2>
          <ol className="grid gap-y-6 md:grid-cols-4">
            {milestones.map((item) => (
              <li key={item.title} className="group/mile relative border-l-2 border-ink pl-5 md:border-l-0 md:border-t-2 md:pl-0 md:pr-6 md:pt-5">
                <span aria-hidden="true" className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-ink transition-transform duration-300 group-hover/mile:scale-[1.8] md:-top-[7px] md:left-0" />
                <p className="wide text-3xl font-extrabold">{item.when}</p>
                <p className="mt-2 font-bold">{item.title}</p>
                <p className="break-words text-sm">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Tile>

        <Tile as="section" tone="white" aria-labelledby="repos-heading" className="col-span-2 p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 id="repos-heading" className="wide text-xl font-extrabold">Top Repositories</h2>
            <a
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-graphite"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View Full Profile on GitHub
            </a>
          </div>
          <ul className="divide-y divide-ink/10">
            {topRepos.slice(0, 6).map((repo: any) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 flex items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-frame"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-page transition-transform duration-300 group-hover:scale-110">
                    <TechIcon name={repo.language ?? ""} sizeClassName="w-5 h-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words font-bold">{repo.name}</span>
                    <span className="block text-sm">
                      {repo.language ?? "Code"}{repo.description ? `, ${repo.description}` : ""}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-sm font-medium">
                    <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Stars</span>{repo.stargazers_count}</span>
                    <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Forks</span>{repo.forks_count}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile as="section" tone="violet" aria-labelledby="activity-heading" className="col-span-2 p-6">
          <h2 id="activity-heading" className="wide mb-3 text-xl font-extrabold">Recent Activity</h2>
          {activity.length > 0 ? (
            <ol>
              {activity.map((item, i) => {
                const Icon = item.type === "PushEvent" ? GitCommitHorizontal : item.type === "CreateEvent" ? Plus : Zap;
                return (
                  <li key={`${item.repo}-${i}`} className="group/feed relative flex items-center gap-4 py-3 motion-safe:transition-transform motion-safe:duration-300 hover:translate-x-1">
                    {i < activity.length - 1 && (
                      <span aria-hidden="true" className="absolute bottom-[-14px] left-[21px] top-[58px] w-0.5 bg-ink/25" />
                    )}
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-frame transition-transform duration-300 group-hover/feed:rotate-12 group-hover/feed:scale-110">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block break-words font-bold">{item.repo}</span>
                      <span className="block text-sm">{item.label}</span>
                    </span>
                    <span className="shrink-0 text-sm font-medium">{item.when}</span>
                  </li>
                );
              })}
            </ol>
          ) : <p>No public activity in the last few weeks.</p>}
        </Tile>
      </div>
    </Shell>
  );
}
