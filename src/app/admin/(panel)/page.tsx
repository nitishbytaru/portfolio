import Link from "next/link";
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
        <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{firstError.error}</p>
      )}

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map((tile) => (
          <li key={tile.href}>
            <Link href={tile.href} className={`block rounded-[20px] p-4 ${tile.tone}`}>
              <span className="wide block text-4xl font-extrabold leading-none">{tile.stats?.shown ?? "–"}</span>
              <span className="mt-1 block font-semibold">{tile.label}</span>
              {tile.stats && tile.stats.hidden > 0 && <span className="block text-sm">{tile.stats.hidden} hidden</span>}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/admin/resume" className="block rounded-[20px] bg-violet p-4">
            <span className="wide block text-xl font-extrabold leading-tight text-white">Resume</span>
            <span className="mt-1 block text-sm font-semibold">{activeResume ? `${activeResume.label}, added ${activeResume.addedAt}` : "–"}</span>
          </Link>
        </li>
      </ul>

      <section className="mt-6 rounded-[20px] bg-white p-4 sm:p-6">
        <h2 className="wide text-xl font-extrabold">Recent content changes</h2>
        {changes instanceof Error ? (
          <p className="mt-2 text-sm text-graphite">{changes.message}</p>
        ) : changes.length === 0 ? (
          <p className="mt-2 text-sm text-graphite">No content changes yet.</p>
        ) : (
          <ul className="mt-2 divide-y-2 divide-page">
            {changes.map((change: RecentChange) => (
              <li key={change.sha}>
                <a href={change.url} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 py-2 hover:underline">
                  <span className="font-semibold">{change.message}</span>
                  <span className="text-sm text-graphite">{new Date(change.date).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm text-graphite">To undo a change, revert its commit on GitHub. The site redeploys with the previous content.</p>
      </section>
    </>
  );
}
