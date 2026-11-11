import SideNav from "@/components/board/SideNav";
import BoardFooter from "@/components/board/BoardFooter";
import { TechIconProvider } from "@/components/ui/TechIcon";
import { getIconOverrides, getProfile } from "@/lib/content";

/** The public site's sheet: side nav, main column and footer. */
export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  return (
    <TechIconProvider icons={getIconOverrides()}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-ink focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="min-h-screen lg:p-6">
        <div className="mx-auto flex min-h-screen max-w-[1560px] flex-col bg-frame shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] lg:min-h-[calc(100vh-3rem)] lg:flex-row lg:rounded-[28px]">
          <SideNav name={profile.name} />
          <div className="flex min-w-0 flex-1 flex-col pb-24 lg:pb-0 lg:pr-8">
            <main id="main" tabIndex={-1} className="flex-grow px-3 pb-4 outline-none max-sm:pt-3 sm:px-6 sm:pb-6 lg:px-0 lg:pb-3 lg:pt-8">
              {children}
            </main>
            <BoardFooter name={profile.name} socials={profile.socials} />
          </div>
        </div>
      </div>
    </TechIconProvider>
  );
}
