import { sectionTone } from "@/lib/admin-sections";
import { toneBg } from "@/lib/tones";

export default function Heading({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="wide flex items-center gap-3 text-3xl font-extrabold text-night-text sm:text-4xl">
        <span aria-hidden="true" className={`h-4 w-4 shrink-0 rounded-full sm:h-5 sm:w-5 ${toneBg(sectionTone(title))}`} />
        {title}
      </h1>
      {children && <p className="mt-2 max-w-[65ch] text-night-muted">{children}</p>}
    </div>
  );
}
