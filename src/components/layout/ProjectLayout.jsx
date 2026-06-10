import { useEffect } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  EffectFade,
} from "swiper/modules";
import {
  ArrowRight,
  Github,
  CheckCircle2,
  Layers,
  Server,
  Globe,
  Database,
  MonitorSmartphone,
  Cpu,
  Info,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const BentoCard = ({
  title,
  children,
  className = "",
  isVisible = true,
  stagger = "",
}) => (
  <div
    className={`scroll-reveal ${stagger} ${
      isVisible ? "revealed" : ""
    } group relative bg-surface/70 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:bg-surface/90 hover:-translate-y-2 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10 flex flex-col ${className}`}
    style={{ animationFillMode: "both" }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
    <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-transform duration-500 origin-left group-hover:scale-x-100 scale-x-0 w-full z-20" />

    {title && (
      <h2 className="relative z-10 text-xl sm:text-2xl font-bold text-text mb-6 border-b border-border pb-4 flex items-center shrink-0">
        <span className="w-7 h-1 bg-primary rounded-full mr-3" />
        {title}
      </h2>
    )}

    <div className="relative z-10 flex-grow flex flex-col justify-start">
      {children}
    </div>

    <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow-inset" />
  </div>
);

const ProjectLayout = ({ project, onLiveLinkClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const titleReveal = useScrollReveal({ threshold: 0.1 });
  const contentReveal = useScrollReveal({ threshold: 0.05 });
  const sidebarReveal = useScrollReveal({ threshold: 0.05 });

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleReveal.ref}
          className={`scroll-reveal ${
            titleReveal.isVisible ? "revealed" : ""
          } text-center mb-12 max-w-4xl mx-auto`}
        >
          <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-text bg-surface/70 backdrop-blur-2xl rounded-full border border-border shadow-sm shimmer-badge mb-5">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Project Case Study
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-text tracking-tight mb-4">
            <span className="gradient-text">{project.title}</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div ref={contentReveal.ref} className="flex flex-col gap-6 lg:w-[70%]">
            <div
              className={`scroll-reveal ${
                contentReveal.isVisible ? "revealed" : ""
              } relative group rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/10 bg-surface/70 backdrop-blur-2xl p-2`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-30" />

              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                loop
                modules={[Navigation, Pagination, Autoplay, Keyboard, EffectFade]}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                keyboard={{ enabled: true }}
                className="rounded-2xl overflow-hidden relative h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
              >
                {project.images?.map((src, i) => (
                  <SwiperSlide key={i} className="h-full bg-background/70">
                    <img
                      src={src}
                      alt={`${project.title} Screenshot ${i + 1}`}
                      className="w-full h-full object-contain transform transition-transform duration-1000 group-hover:scale-[1.01]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BentoCard
                title="About Project"
                className="h-full"
                isVisible={contentReveal.isVisible}
                stagger="stagger-2"
              >
                <div className="space-y-4">
                  {project.detailedDescription?.intro?.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {project.detailedDescription?.note && (
                    <div className="bg-background/70 backdrop-blur-xl border border-border p-4 sm:p-5 rounded-2xl border-l-4 border-l-primary mt-4 transition-all duration-300 hover:bg-surface/70 flex items-start gap-4">
                      <div className="bg-surface/80 p-2 rounded-xl shrink-0 mt-0.5 border border-border">
                        <Info className="w-4 h-4 text-primary" />
                      </div>

                      <p className="text-sm text-text-secondary leading-relaxed">
                        {project.detailedDescription.note}
                      </p>
                    </div>
                  )}
                </div>
              </BentoCard>

              <BentoCard
                title="Key Features"
                className="h-full"
                isVisible={contentReveal.isVisible}
                stagger="stagger-4"
              >
                <div className="flex flex-col gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start bg-background/70 backdrop-blur-xl p-4 rounded-2xl border border-border hover:bg-surface/80 hover:border-primary/40 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" />
                      <span className="text-sm text-text-secondary leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </BentoCard>
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <BentoCard
                title="Core Stack"
                isVisible={contentReveal.isVisible}
                stagger="stagger-6"
              >
                <div className="flex flex-wrap gap-2 content-start">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl text-sm font-medium bg-background/70 backdrop-blur-xl text-text border border-border shadow-sm hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-300 cursor-default hover:-translate-y-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </BentoCard>
            )}
          </div>

          <div ref={sidebarReveal.ref} className="flex flex-col gap-6 lg:w-[30%]">
            <BentoCard isVisible={sidebarReveal.isVisible} stagger="stagger-1">
              <div className="flex flex-col gap-4">
                <button
                  onClick={onLiveLinkClick}
                  className="w-full group relative px-6 py-4 bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all duration-300 font-bold shadow-lg overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary hover:scale-[1.02] hover:shadow-glow-primary"
                >
                  <span className="relative z-10 flex items-center text-sm sm:text-base">
                    View Live Demo
                    <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:-rotate-45" />
                  </span>
                </button>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group flex items-center justify-center px-6 py-4 bg-background/70 backdrop-blur-xl text-text border border-border rounded-2xl hover:bg-surface/90 hover:border-primary/50 transition-all duration-300 font-bold shadow-md hover:shadow-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <span>Source Code</span>
                  <Github className="w-5 h-5 ml-2 text-text-secondary group-hover:text-primary transition-colors" />
                </a>

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group flex items-center justify-center px-6 py-4 bg-background/70 backdrop-blur-xl text-text border border-border rounded-2xl hover:bg-surface/90 hover:border-primary/50 transition-all duration-300 font-bold shadow-md hover:shadow-xl text-sm sm:text-base"
                  >
                    <span>Open Link</span>
                    <ExternalLink className="w-5 h-5 ml-2 text-text-secondary group-hover:text-primary transition-colors" />
                  </a>
                )}
              </div>
            </BentoCard>

            {project.technologiesUsed &&
              Object.keys(project.technologiesUsed).length > 0 && (
                <BentoCard
                  title="Architecture"
                  isVisible={sidebarReveal.isVisible}
                  stagger="stagger-3"
                >
                  <div className="flex flex-col gap-3">
                    {Object.entries(project.technologiesUsed).map(([key, value]) => {
                      let Icon = Layers;
                      if (key.toLowerCase().includes("frontend"))
                        Icon = MonitorSmartphone;
                      else if (key.toLowerCase().includes("backend")) Icon = Server;
                      else if (key.toLowerCase().includes("database"))
                        Icon = Database;
                      else if (key.toLowerCase().includes("machine")) Icon = Cpu;

                      return (
                        <div
                          key={key}
                          className="group flex items-center bg-background/70 backdrop-blur-xl p-4 rounded-2xl border border-border hover:bg-surface/80 hover:border-primary/40 transition-all duration-300"
                        >
                          <div className="p-3 bg-surface/80 rounded-xl mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border text-primary">
                            <Icon className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-xs font-bold text-text-secondary/60 uppercase tracking-wider mb-1">
                              {key.replace(/_/g, " ")}
                            </h3>

                            <p className="text-sm font-medium text-text truncate">
                              {value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </BentoCard>
              )}

            {project.deployment && Object.keys(project.deployment).length > 0 && (
              <BentoCard
                title="Infrastructure"
                isVisible={sidebarReveal.isVisible}
                stagger="stagger-5"
              >
                <div className="flex flex-col gap-3">
                  {Object.entries(project.deployment).map(([key, value]) => {
                    let Icon = Globe;
                    if (key.toLowerCase().includes("backend")) Icon = Server;
                    else if (key.toLowerCase().includes("database")) Icon = Database;

                    return (
                      <div
                        key={key}
                        className="group flex items-center bg-background/70 backdrop-blur-xl p-4 rounded-2xl border border-border hover:bg-surface/80 hover:border-primary/40 transition-all duration-300"
                      >
                        <div className="p-3 bg-surface/80 rounded-xl mr-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0 border border-border text-primary">
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-xs font-bold text-text-secondary/60 uppercase tracking-wider mb-1">
                            {key.replace(/_/g, " ")}
                          </h3>

                          <p className="text-sm font-medium text-text truncate">
                            {value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </BentoCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;