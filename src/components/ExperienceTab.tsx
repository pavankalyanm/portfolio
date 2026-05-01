"use client";

interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  color: string;
  bullets: string[];
  href?: string;
}

interface Edu {
  school: string;
  degree: string;
  period: string;
  color: string;
}

/* Newest first */
const jobs: Job[] = [
  {
    company: "KeyChainN",
    role: "Co-Founder & Chief Technology Officer",
    location: "Austin, Texas",
    period: "Aug 2025 – Present",
    color: "bg-accent",
    href: "https://keychainn.com",
    bullets: [
      "Leading engineering and product — from roadmap to commits",
      "Architecting the full stack: backend services, frontend, infra",
      "Hiring, technical strategy, and go-to-market execution",
    ],
  },
  {
    company: "Evergreen",
    role: "Software Engineer Intern",
    location: "Remote",
    period: "Jan 2025 – May 2025",
    color: "bg-blue",
    bullets: [
      "Shipped production features in a 5-month internship",
      "Cross-functional work across services, frontend, and tooling",
    ],
  },
  {
    company: "Syniti",
    role: "Software Engineer",
    location: "Hyderabad, India",
    period: "Apr 2022 – Jul 2023",
    color: "bg-blue",
    bullets: [
      "Enterprise data migration and integration at scale",
      "Hand-held legacy systems into the cloud",
      "Test automation and QA across modules",
    ],
  },
  {
    company: "Nerds & Geeks Pvt Ltd",
    role: "Software Engineer",
    location: "India",
    period: "Jan 2021 – Apr 2022",
    color: "bg-blue",
    bullets: [
      "First full-time role: built backend services and tooling",
      "Broke things politely, fixed them quickly, learned fast",
    ],
  },
];

const education: Edu[] = [
  {
    school: "The University of Texas at Dallas",
    degree: "MS in Info Technology and Management",
    period: "Aug 2023 – Jul 2025",
    color: "bg-cyan",
  },
  {
    school: "JNTUA College of Engineering, Anantapur",
    degree: "BTech in Computer Science",
    period: "2018 – 2021",
    color: "bg-yellow",
  },
  {
    school: "S.V Govt Polytechnic",
    degree: "Diploma in Computer Science",
    period: "2015 – 2018",
    color: "bg-orange",
  },
];

export default function ExperienceTab() {
  return (
    <div className="animate-fade-in space-y-8 max-w-3xl">
      <p className="text-comment text-[13px]">
        {"// experience.json — newest first"}
      </p>

      <div>
        <h3 className="text-[13px] font-mono text-text-dim mb-3 flex items-center gap-2">
          <span className="text-keyword">#</span> Work
        </h3>
        <div className="relative space-y-5 pl-6 border-l border-border">
          {jobs.map((job, i) => (
            <div key={i} className="relative">
              <div
                className={`absolute -left-[calc(1.5rem+4px)] top-1.5 w-2 h-2 rounded-full ${job.color} ring-[3px] ring-bg`}
              />
              <div className="rounded border border-border bg-surface p-5 hover:bg-surface-hover transition-colors">
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    {job.href ? (
                      <a
                        href={job.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-semibold text-text-bright font-sans hover:text-accent transition-colors underline decoration-dotted decoration-text-muted underline-offset-4"
                      >
                        {job.company}
                      </a>
                    ) : (
                      <h3 className="text-[15px] font-semibold text-text-bright font-sans">
                        {job.company}
                      </h3>
                    )}
                  </div>
                  <p className="text-accent font-mono text-[13px] ml-6 mt-0.5">{job.role}</p>
                  <div className="ml-6 mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="inline-block px-2 py-0.5 text-[11px] font-mono rounded bg-accent-glow text-accent border border-accent/20">
                      {job.period}
                    </span>
                    <span className="text-text-muted text-[11px] font-mono">
                      {job.location}
                    </span>
                  </div>
                </div>
                <ul className="space-y-1.5 ml-6">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-[13px] text-text-dim font-sans">
                      <span className="text-accent mt-0.5 shrink-0">&#8250;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-mono text-text-dim mb-3 flex items-center gap-2">
          <span className="text-keyword">#</span> Education
        </h3>
        <div className="relative space-y-4 pl-6 border-l border-border">
          {education.map((edu, i) => (
            <div key={i} className="relative">
              <div
                className={`absolute -left-[calc(1.5rem+4px)] top-1.5 w-2 h-2 rounded-full ${edu.color} ring-[3px] ring-bg`}
              />
              <div className="rounded border border-border bg-surface p-4 hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                  <h3 className="text-[14px] font-semibold text-text-bright font-sans">
                    {edu.school}
                  </h3>
                </div>
                <p className="text-accent font-mono text-[12.5px] ml-6 mt-0.5">
                  {edu.degree}
                </p>
                <div className="ml-6 mt-1.5">
                  <span className="inline-block px-2 py-0.5 text-[11px] font-mono rounded bg-accent-glow text-accent border border-accent/20">
                    {edu.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
