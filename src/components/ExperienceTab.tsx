"use client";

interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  color: string;
  bullets: string[];
}

/* Newest first */
const jobs: Job[] = [
  {
    company: "Uniian",
    role: "Software Engineer",
    location: "San Francisco (Remote)",
    period: "May 2025 – Present",
    color: "bg-accent",
    bullets: [
      "Built Selenium + Python + REST automation utilities, reduced manual QA 50%",
      "Full-stack features in Java, React, JavaScript",
      "Integrated/fine-tuned GPT and LLaMA via OpenAI API for Gen AI analytics",
      "MLOps: MLflow experiment tracking, model monitoring, automated retraining",
      "Led root cause analysis, defect tracking, stakeholder communication",
      "Code reviews reduced post-release defect rate 40%",
      "Built Power BI dashboards over MySQL for business self-serve analytics",
    ],
  },
  {
    company: "IBM",
    role: "Software Engineer",
    location: "Hyderabad, India",
    period: "Aug 2021 – Jun 2023",
    color: "bg-blue",
    bullets: [
      "Selenium + Groovy + Java automation, test coverage 45% → 87%",
      "Frontend features in Angular and React with REST API integrations",
      "Applied unit, integration, regression testing; quality gates before every release",
      "Root cause analysis on production defects",
      "AWS EC2, S3, Lambda + MySQL for cloud infrastructure",
    ],
  },
];

export default function ExperienceTab() {
  return (
    <div className="animate-fade-in space-y-6 max-w-3xl">
      <p className="text-comment text-[13px]">
        {"// experience.json — newest first"}
      </p>

      <div className="relative space-y-5 pl-6 border-l border-border">
        {jobs.map((job, i) => (
          <div key={i} className="relative">
            <div
              className={`absolute -left-[calc(1.5rem+4px)] top-1.5 w-2 h-2 rounded-full ${job.color} ring-[3px] ring-bg`}
            />
            <div className="rounded border border-border bg-surface p-5 hover:bg-surface-hover transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 className="text-[15px] font-semibold text-text-bright font-sans">
                      {job.company}
                    </h3>
                  </div>
                  <p className="text-accent font-mono text-[13px] ml-6">{job.role}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 text-[11px] font-mono rounded bg-accent-glow text-accent border border-accent/20">
                    {job.period}
                  </span>
                  <p className="text-text-muted text-[11px] mt-1 font-mono">
                    {job.location}
                  </p>
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
  );
}
