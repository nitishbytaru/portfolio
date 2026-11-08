import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, Mail, Hexagon } from "lucide-react";
import Tile from "@/components/board/Tile";
import Wordmark from "@/components/board/Wordmark";
import SpinBadge from "@/components/board/SpinBadge";
import { projectsData } from "@/data/ProjectData";
import { EMAIL, INTERNSHIP_COUNT } from "@/data/site";

const echoRealm = projectsData.find((p) => p.slug === "echorealm")!;
const agroGuide = projectsData.find((p) => p.slug === "agroguide")!;

const Count = ({ value, label, numberClass }: { value: number; label: string; numberClass?: string }) => (
  <>
    <span className={`wide block text-4xl font-extrabold ${numberClass ?? ""}`}>{value}</span>
    <span className="wide mt-1 block text-base">{label}</span>
  </>
);

export default function Home() {
  return (
    <div className="grid gap-4 lg:h-[calc(100vh-10.5rem)] lg:min-h-[620px] lg:grid-cols-[minmax(340px,31%)_1fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-5">
      <Wordmark as="p" className="lg:col-start-2 lg:row-start-1 lg:justify-self-start lg:!text-[min(11.5vw,11rem)]">
        Portfolio
      </Wordmark>

      {/* About card */}
      <Tile
        as="section"
        tone="periwinkle"
        aria-labelledby="about-name"
        className="flex flex-col !rounded-tl-none p-6 lg:col-start-1 lg:row-span-2 lg:row-start-1"
      >
        <svg aria-hidden="true" viewBox="0 0 170 68" className="absolute -left-px -top-px h-[68px] w-[170px] fill-frame">
          <path d="M0 0H170C154 0 146 6 138 14L116 36C108 44 100 48 88 48H20C8 48 0 56 0 68Z" />
        </svg>
        <div className="absolute left-1 top-0 flex h-12 items-center gap-2 text-sm font-semibold text-ink">
          <Hexagon className="h-4 w-4" aria-hidden="true" />
          About Me
        </div>

        <div className="relative mx-auto mt-8 aspect-[1/1.16] w-[min(74%,270px)] shrink-0 lg:my-auto lg:w-[min(88%,36vh)]">
          <div className="absolute bottom-0 left-0 aspect-square w-full">
            <div className="absolute -inset-2.5 rounded-full border-[5px] border-white" />
            <div className="absolute inset-0 rounded-full bg-pink" />
          </div>
          <div className="absolute inset-0 overflow-hidden rounded-b-[999px]">
            <Image
              src="/NitishCutout.png"
              alt="Portrait of Nitish Durga Bytaru"
              fill
              priority
              sizes="(min-width: 1024px) 340px, 280px"
              className="object-cover object-top"
            />
          </div>
          <SpinBadge className="absolute -bottom-3 -right-8 h-[84px] w-[84px]" />
        </div>

        <div className="pt-5">
          <p className="wide text-3xl font-extralight leading-none text-white">I&apos;m,</p>
          <h1 id="about-name" className="wide mt-1 text-[2rem] font-semibold leading-[1.04] text-white">
            Nitish Durga Bytaru
          </h1>
          <p className="mt-3 text-[15px] leading-snug text-ink">
            I build full stack web apps, from real-time messaging with Socket.io to machine learning tools
            that help farmers make data-driven decisions.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-1 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink underline decoration-dashed underline-offset-4"
          >
            {EMAIL}
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </Tile>

      {/* Work tiles */}
      <div className="grid grid-cols-2 gap-4 lg:col-start-2 lg:row-start-2 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-5">
        <Tile
          as={Link}
          href={`/projects/${echoRealm.slug}`}
          interactive
          corner
          tone="black"
          className="group col-span-2 aspect-[16/10] lg:col-span-9 lg:aspect-auto"
        >
          <img
            src={echoRealm.thumbnail}
            alt={`${echoRealm.title} app screen`}
            className="absolute -top-[11%] left-0 h-[124%] w-full max-w-none object-cover object-left-top"
          />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110">
            <ArrowRight className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink">
            Open {echoRealm.title}
          </span>
        </Tile>

        <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-[20px] lg:col-span-3 lg:grid-cols-1 lg:grid-rows-2">
          <Tile as={Link} href="/projects" tone="mint" corner className="flex flex-col justify-center !rounded-none p-5 transition-[filter] duration-300 hover:brightness-95">
            <Count value={projectsData.length} label="Projects" />
          </Tile>
          <Tile as={Link} href="/experience" tone="violet" corner className="flex flex-col justify-center !rounded-none p-5 transition-[filter] duration-300 hover:brightness-95">
            <Count value={INTERNSHIP_COUNT} label="Internships" numberClass="text-white" />
          </Tile>
        </div>

        <Tile
          as={Link}
          href="/skills"
          tone="graphite"
          interactive
          corner
          className="col-span-2 flex min-h-36 flex-col items-center justify-center gap-3 lg:col-span-4 lg:min-h-0"
        >
          <Code2 className="h-11 w-11" aria-hidden="true" />
          <span className="wide text-xl">Skills</span>
        </Tile>

        <div className="col-span-2 grid grid-cols-2 overflow-hidden rounded-[20px] lg:col-span-8">
          <Link href={`/projects/${agroGuide.slug}`} className="relative block min-h-36 bg-ink transition-[filter] duration-300 hover:brightness-95">
            <img
              src={agroGuide.thumbnail}
              alt={`${agroGuide.title} home screen`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink">
              {agroGuide.title}
            </span>
          </Link>
          <Tile as={Link} href="/experience" tone="amber" corner className="flex flex-col justify-center !rounded-none p-5 lg:p-7 transition-[filter] duration-300 hover:brightness-95">
            <span className="wide block text-xl font-extrabold leading-tight lg:text-2xl">Infosys + Evaluate Health</span>
            <span className="wide mt-2 block text-sm">Internship experience</span>
          </Tile>
        </div>
      </div>
    </div>
  );
}
