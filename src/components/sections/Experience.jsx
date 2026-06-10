import React from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const experiences = [
  {
    role: "System Engineer Intern",
    company: "Infosys",
    location: "Mysore",
    date: "Dec 2025 - May 2026",
    type: "Enterprise Training",
    certificate:
      "https://drive.google.com/file/d/1aLeH6dHQzZo0sbtxbiw7Z4B6qrq_IPTw/view?usp=drive_link",
    points: [
      "Completed intensive Java Generic Training covering OOP principles — inheritance, polymorphism, abstraction, encapsulation, exception handling, and collections.",
      "Acquired hands-on knowledge of DBMS and MySQL: relational design, normalization, SQL queries, joins, and database management.",
      "Completed Stream Training in the Microsoft stack: TypeScript, C#, Angular, .NET, and Entity Framework Core for enterprise-grade full-stack development.",
    ],
  },
  {
    role: "Frontend Intern",
    company: "Evaluate Health",
    location: "Vizag",
    date: "Jul 2025 - Nov 2025",
    type: "Frontend Engineering",
    certificate:
      "https://drive.google.com/file/d/1hiiyhRLeDxyIRnXKSnl4iDoFrAVErm6g/view?usp=drive_link",
    points: [
      "Developed production-level mobile applications using React Native, TypeScript, Redux, and Redux-Saga.",
      "Built reusable card components, reducing unnecessary re-renders and measurably improving rendering performance of the application.",
      "Coordinated with the backend team to integrate REST APIs for data storage and retrieval within an Agile frontend workflow.",
    ],
  },
];

export default function Experience() {
  const titleReveal = useScrollReveal({ threshold: 0.2 });
  const cardsReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden transition-colors duration-300"
      id="experience"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[160px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={titleReveal.ref}
          className={`scroll-reveal ${
            titleReveal.isVisible ? "revealed" : ""
          } mb-16 md:text-center`}
        >
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-1.5 text-sm font-medium text-text bg-surface/70 backdrop-blur-2xl rounded-full border border-border shadow-sm shimmer-badge">
              <Briefcase className="w-4 h-4 mr-2 text-primary" />
              Professional Experience
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight mb-4">
            Where I've Worked
          </h2>

          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            My internship experiences where I contributed to real-world projects
            and strengthened my engineering skills.
          </p>
        </div>

        <div
          ref={cardsReveal.ref}
          className="flex flex-col gap-8 max-w-4xl mx-auto relative timeline-connector"
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`scroll-reveal stagger-${(index + 1) * 2} ${
                cardsReveal.isVisible ? "revealed" : ""
              } timeline-dot group relative ml-8 rounded-3xl border border-border bg-surface/70 backdrop-blur-2xl p-8 overflow-hidden transition-all duration-500 hover:bg-surface/90 hover:-translate-y-2 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/10`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      {exp.type}
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface/80 text-text-secondary text-xs font-semibold border border-border">
                      Internship
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>

                  <div className="flex items-center text-xl font-semibold text-text-secondary mb-4">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    {exp.company}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary/80">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5 text-primary" />
                      {exp.location}
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5 text-primary" />
                      {exp.date}
                    </div>
                  </div>
                </div>

                {exp.certificate !== "#" ? (
                  <a
                    href={exp.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ripple inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-xl border border-primary transition-all duration-300 text-sm font-medium shrink-0 hover:scale-105 hover:shadow-glow-primary"
                  >
                    View Certificate
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                ) : (
                  <span className="inline-flex items-center px-4 py-2 bg-border text-text-secondary/50 rounded-xl border border-border text-sm font-medium shrink-0 cursor-not-allowed">
                    Certificate Pending
                  </span>
                )}
              </div>

              <div className="relative z-10 space-y-4">
                {exp.points.map((point, i) => (
                  <div
                    key={i}
                    className="flex items-start p-3 rounded-2xl hover:bg-surface/60 transition-colors duration-300"
                  >
                    <div className="shrink-0 mt-1 mr-4">
                      <CheckCircle2 className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                    </div>

                    <p className="text-base text-text-secondary leading-relaxed">
                      {point
                        .split(
                          /(Java|OOP|DBMS|MySQL|TypeScript|C#|Angular|\.NET|Entity Framework Core|React Native|Redux|Redux-Saga|REST APIs|Agile)/g
                        )
                        .map((chunk, j) => {
                          const highlights = [
                            "Java",
                            "OOP",
                            "DBMS",
                            "MySQL",
                            "TypeScript",
                            "C#",
                            "Angular",
                            ".NET",
                            "Entity Framework Core",
                            "React Native",
                            "Redux",
                            "Redux-Saga",
                            "REST APIs",
                            "Agile",
                          ];

                          if (highlights.includes(chunk)) {
                            return (
                              <span
                                key={j}
                                className="font-semibold text-text bg-primary/10 px-1.5 py-0.5 rounded border border-primary/10"
                              >
                                {chunk}
                              </span>
                            );
                          }

                          return chunk;
                        })}
                    </p>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-glow-inset" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}