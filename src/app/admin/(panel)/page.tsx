import Link from "next/link";
import { ArrowRight, ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { loadForEditing } from "@/lib/server/admin-content";
import { recentContentChanges, type RecentChange } from "@/lib/server/github";
import Heading from "./heading";

const count = (items: { visible: boolean }[]) => {
  const shown = items.filter((item) => item.visible).length;
  return { shown, hidden: items.length - shown };
};

export default async function AdminHome() {
  const [experience, projects, skills, resume, changes] = await Promise.all([
    loadForEditing("experience"),
    loadForEditing("projects"),
    loadForEditing("skills"),
    loadForEditing("resume"),
    recentContentChanges().catch((error: Error) => error),
  ]);

  const tiles = [
    { href: "/admin/experience", label: "Roles", tone: "bg-amber", stats: experience.ok ? count(experience.data) : null },
    { href: "/admin/projects", label: "Projects", tone: "bg-mint", stats: projects.ok ? count(projects.data) : null },
    { href: "/admin/skills", label: "Skills", tone: "bg-pink", stats: skills.ok ? count(skills.data.flatMap((group) => group.skills)) : null },
  ];
  const activeResume = resume.ok ? resume.data.versions.find((version) => version.id === resume.data.activeId) : null;
  const firstError = [experience, projects, skills, resume].find((loaded) => !loaded.ok);

  return (
    <>
      <Heading title="Overview">Each save is a commit to GitHub. The public site updates after the redeploy, usually within a minute or two.</Heading>

      {firstError && !firstError.ok && (
        <p role="alert" className="mb-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm font-semibold text-red-200">{firstError.error}</p>
      )}

      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.href}>
            <Link href={tile.href} className={`group relative flex h-full min-h-32 flex-col justify-between rounded-2xl p-4 text-ink transition-transform duration-200 hover:-translate-y-0.5 ${tile.tone}`}>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="wide block text-4xl font-extrabold leading-none">{tile.stats?.shown ?? "–"}</span>
              <span>
                <span className="block font-semibold">{tile.label} on the site</span>
                <span className="block text-sm">{tile.stats && tile.stats.hidden > 0 ? `${tile.stats.hidden} hidden` : "None hidden"}</span>
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link href="/admin/resume" className="group relative flex h-full min-h-32 flex-col justify-between rounded-2xl bg-violet p-4 text-ink transition-transform duration-200 hover:-translate-y-0.5">
            <ArrowRight className="absolute right-4 top-4 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="wide block pr-6 text-2xl font-extrabold leading-none sm:text-3xl">Resume</span>
            <span>
              <span className="block font-semibold">{activeResume ? (activeResume.label === "Resume" ? "Active version" : activeResume.label) : "Not set"}</span>
              <span className="block text-sm">{activeResume ? `Added ${activeResume.addedAt}` : "Add a Drive link"}</span>
            </span>
          </Link>
        </li>
      </ul>

      <section className="mt-8 rounded-2xl border border-night-line bg-night-panel p-4 sm:p-6">
        <h2 className="wide text-xl font-extrabold text-night-text">Recent content changes</h2>
        {changes instanceof Error ? (
          <p className="mt-2 text-sm text-night-faint">{changes.message}</p>
        ) : changes.length === 0 ? (
          <p className="mt-2 text-sm text-night-faint">No content changes yet.</p>
        ) : (
          <ul className="-mx-2 mt-3">
            {changes.map((change: RecentChange) => (
              <li key={change.sha}>
                <a href={change.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-12 items-center gap-3 rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-white/5">
                  <GitCommitHorizontal className="h-4 w-4 shrink-0 text-night-faint" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-night-text">{change.message}</span>
                    <span className="block text-sm text-night-faint">{new Date(change.date).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })} · {change.sha}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-night-faint transition-colors group-hover:text-night-text" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-night-faint">To undo a change, revert its commit on GitHub. The site redeploys with the previous content.</p>
      </section>
    </>
  );
}
