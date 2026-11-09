"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight, FolderGit2, Github, GitCommitHorizontal, GitFork, Star, ExternalLink, Plus, Rocket, Compass, Code2, Zap, Eye,
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
      <div className="ribbon-in flex h-24 origin-left gap-1" aria-hidden="true">
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
      <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        {children}
        {weeks.length > 0 && (
          <div className="relative h-72 lg:h-auto lg:min-h-[280px]">
            <p className="pointer-events-none absolute left-0 top-0 z-10">
              <span className="wide block text-6xl font-extrabold leading-none tabular-nums md:text-7xl">
                {shown ? shown.total : <CountUp value={contributions?.totalContributions ?? 0} />}
              </span>
              <span className="mt-2 block font-semibold">
                {shown ? `${shown.total === 1 ? "contribution" : "contributions"}, week of ${shown.start}` : "contributions in the last year"}
              </span>
            </p>
            <div
              onPointerLeave={() => setHovered(null)}
              role="img"
              aria-label={`${contributions?.totalContributions} contributions over the last ${weeks.length} weeks`}
              className="group/sky absolute inset-0 flex items-end gap-[3px] sm:gap-1"
            >
              {weeks.map((week, index) => (
                <span key={week.start || index} onPointerEnter={() => setHovered(index)} className="flex h-full min-w-0 flex-1 cursor-pointer items-end">
                  <span
                    className={`bar-rise block w-full origin-bottom rounded-t-[3px] motion-safe:transition-[background-color,opacity] motion-safe:duration-200 ${
                      hovered === index ? "bg-amber" : week.total === 0 ? "bg-indigo-soft group-hover/sky:opacity-50" : "bg-periwinkle group-hover/sky:opacity-50"
                    }`}
                    style={{ height: `${Math.max(4, (week.total / tallest) * 100)}%`, animationDelay: `${index * 12}ms` }}
                  />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Tile>
  );
};

const TimelineChart = ({ timeline }: { timeline: TimelineItem[] }) => {
  const max = Math.max(...timeline.map((t) => t.count), 1);
  return (
    <div className="flex items-end gap-4" role="img" aria-label={timeline.map((t) => `${t.year}: ${plural(t.count, "repo")}`).join(", ")}>
      {timeline.map((item, column) => (
        <div key={item.year} className="group/col min-w-0 flex-1 text-center">
          <p className="wide mb-2 text-2xl font-extrabold">{item.count}</p>
          <div className="flex h-48 flex-col-reverse gap-1">
            {Array.from({ length: item.count }, (_, brick) => (
              <span
                key={brick}
                className="cal-in block rounded bg-violet motion-safe:transition-[transform,background-color] motion-safe:duration-300 group-hover/col:-translate-y-1 group-hover/col:bg-indigo"
                style={{
                  height: `calc((100% - ${(max - 1) * 4}px) / ${max})`,
                  animationDelay: `${column * 120 + brick * 45}ms`,
                  transitionDelay: `${brick * 22}ms`,
                }}
              />
            ))}
          </div>
          <p className="wide mt-2 text-sm font-semibold">{item.year}</p>
        </div>
      ))}
    </div>
  );
};

// Light to dark, on a white tile, so each level reads as one step darker.
const LEVEL_COLORS = ["#E1E1E1", "#A7D8D6", "#7D82D0", "#595959", "#000000"];

const monthOf = (date?: string) =>
  date ? new Date(`${date}T00:00:00Z`).toLocaleString("en", { month: "short", timeZone: "UTC" }) : "";

const monthLabel = (weeks: ContributionData["weeks"], index: number) => {
  const month = monthOf(weeks[index][0]?.date);
  return index === 0 || month !== monthOf(weeks[index - 1][0]?.date) ? month : "";
};

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
        other.style.transform = distance < 4 ? `scale(${1 + 0.4 * (1 - distance / 4)})` : "";
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
  const shownWeeks = contributions.weeks.slice(-52);
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
          <div className="min-w-[720px]">
            <div aria-hidden="true" className="mb-1.5 flex gap-1 text-xs font-semibold">
              {shownWeeks.map((week, wi) => (
                <span key={wi} className="min-w-0 flex-1 overflow-visible whitespace-nowrap">{monthLabel(shownWeeks, wi)}</span>
              ))}
            </div>
            <div className="flex gap-1">
              {shownWeeks.map((week, wi) => (
                <div key={wi} className="flex min-w-0 flex-1 flex-col gap-1">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      data-week={wi}
                      data-day={di}
                      data-date={day.date}
                      data-count={plural(day.count, "contribution")}
                      className="cal-in aspect-square w-full rounded-[4px] motion-safe:transition-transform motion-safe:duration-150"
                      style={{ backgroundColor: LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0], animationDelay: `${wi * 14}ms` }}
                    />
                  ))}
                </div>
              ))}
            </div>
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

const BADGE_COLORS = ["bg-amber", "bg-mint", "bg-pink", "bg-white"];
const FOLDER_COLORS = ["bg-mint", "bg-amber", "bg-pink"];

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
              <img src={profile.avatar_url} alt={profile.name} className="h-24 w-24 rounded-full object-cover transition-transform duration-300 hover:rotate-3 hover:scale-110" />
              <div className="min-w-0">
                <h2 className="wide text-2xl font-extrabold leading-tight">{profile.name}</h2>
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 font-semibold underline underline-offset-4">
                  @{profile.login} <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            {profile.bio && <p className="mt-3">{profile.bio}</p>}
            <dl className="mt-5 grid grid-cols-3 gap-2">
              {[
                { value: profile.followers, label: "Followers" },
                { value: profile.following, label: "Following" },
                { value: `${profile.accountAgeYears}y`, label: "On GitHub" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col-reverse rounded-xl bg-indigo-soft p-3 transition-transform duration-300 hover:-translate-y-1">
                  <dt className="text-xs font-semibold">{item.label}</dt>
                  <dd className="wide text-2xl font-extrabold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm">Member since {profile.joinedDate}</p>
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
          <ul className="grid grid-cols-2 gap-x-3 gap-y-5">
            {achievements.map(({ title, desc, Icon }, index) => (
              <li key={title} className="group/ach text-center">
                <span className="relative mx-auto block h-[72px] w-[72px] [perspective:400px]">
                  <span aria-hidden="true" className="absolute -inset-1 rounded-full border-2 border-dashed border-white/70 group-hover/ach:motion-safe:animate-[spin_5s_linear_infinite]" />
                  <span className={`absolute inset-1 flex items-center justify-center rounded-full text-ink motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out group-hover/ach:[transform:rotateY(360deg)] ${BADGE_COLORS[index % BADGE_COLORS.length]}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-2 block text-sm font-bold leading-tight">{title}</span>
                <span className="block text-xs leading-tight">{desc}</span>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile tone="amber" className="col-span-2 flex flex-col p-6">
          <TileTitle>Repository Insights</TileTitle>
          <dl className="grid flex-1 auto-rows-fr grid-cols-2 gap-3">
            {[
              { Icon: Star, metric: highlights.mostStarred?.stargazers_count ?? 0, label: "Most Starred", name: highlights.mostStarred?.name },
              { Icon: GitFork, metric: highlights.mostForked?.forks_count ?? 0, label: "Most Forked", name: highlights.mostForked?.name },
              { Icon: Zap, metric: timeAgo(highlights.mostActive?.pushed_at), label: "Most Active", name: highlights.mostActive?.name },
              { Icon: FolderGit2, metric: `${stats.ownRepos}/${stats.totalRepos}`, label: "Original", name: "repositories" },
            ].map(({ Icon, metric, label, name }) => (
              <div key={label} className="group/cell relative flex flex-col-reverse justify-end rounded-2xl bg-frame p-4 motion-safe:transition-transform motion-safe:duration-300 hover:-translate-y-1">
                <dt className="mt-1 text-sm"><span className="font-semibold">{label}</span><span className="block break-words font-bold">{name}</span></dt>
                <dd className="wide pr-10 text-3xl font-extrabold leading-none">{metric}</dd>
                <span aria-hidden="true" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white motion-safe:transition-transform motion-safe:duration-300 group-hover/cell:rotate-[20deg] group-hover/cell:scale-110">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            ))}
          </dl>
        </Tile>

        <Tile tone="mint" className="col-span-2 p-6">
          <TileTitle>Coding Timeline</TileTitle>
          <TimelineChart timeline={timeline} />
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

        <section aria-labelledby="repos-heading" className="no-lift col-span-2 flex flex-col lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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
          <ul className="grid flex-1 auto-rows-fr gap-x-4 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
            {topRepos.slice(0, 6).map((repo: any, index: number) => {
              const folder = FOLDER_COLORS[index % FOLDER_COLORS.length];
              return (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="group/folder relative block h-full pt-7">
                    <span aria-hidden="true" className={`absolute left-0 top-3 h-8 w-2/5 rounded-t-xl ${folder}`} />
                    <span aria-hidden="true" className="absolute inset-x-4 top-5 flex h-20 justify-end rounded-lg bg-white p-2 shadow motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover/folder:-translate-y-4 group-hover/folder:rotate-1">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <span className={`relative flex h-full min-h-40 flex-col justify-between rounded-2xl rounded-tl-none p-4 text-ink motion-safe:transition-transform motion-safe:duration-300 group-hover/folder:translate-y-1 ${folder}`}>
                      <span>
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-frame">
                          <TechIcon name={repo.language ?? ""} sizeClassName="w-6 h-6" />
                        </span>
                        <span className="mt-2 block break-words font-bold leading-tight">{repo.name}</span>
                        {repo.description && <span className="mt-1 block text-sm leading-snug">{repo.description}</span>}
                      </span>
                      <span className="mt-3 flex items-center gap-3 text-sm font-semibold">
                        <span>{repo.language ?? "Code"}</span>
                        <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Stars</span>{repo.stargazers_count}</span>
                        <span className="inline-flex items-center gap-1"><GitFork className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only">Forks</span>{repo.forks_count}</span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <Tile as="section" tone="indigo" aria-labelledby="activity-heading" className="col-span-2 p-6 lg:col-span-1">
          <h2 id="activity-heading" className="wide mb-3 text-xl font-extrabold">Recent Activity</h2>
          {activity.length > 0 ? (
            <ol className="space-y-1">
              {activity.map((item, i) => {
                const Icon = item.type === "PushEvent" ? GitCommitHorizontal : item.type === "CreateEvent" ? Plus : Zap;
                return (
                  <li key={`${item.repo}-${i}`} className="group/feed -mx-2 rounded-xl p-2 motion-safe:transition-colors motion-safe:duration-200 hover:bg-indigo-soft">
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-periwinkle text-ink motion-safe:transition-transform motion-safe:duration-300 group-hover/feed:rotate-12 group-hover/feed:scale-110">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-sm font-bold">{item.repo}</span>
                        <span className="text-xs">{item.when}</span>
                      </span>
                    </span>
                    {item.type === "PushEvent" ? (
                      <span role="img" aria-label={item.label} className="ml-12 mt-1 flex flex-wrap gap-1">
                        {Array.from({ length: Math.min(item.count, 12) }, (_, tick) => (
                          <span
                            key={tick}
                            className="h-2.5 w-2.5 rounded-sm bg-amber motion-safe:transition-transform motion-safe:duration-200 group-hover/feed:-translate-y-0.5"
                            style={{ transitionDelay: `${tick * 25}ms` }}
                          />
                        ))}
                      </span>
                    ) : (
                      <span className="ml-12 mt-1 block text-xs font-semibold">{item.label}</span>
                    )}
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
