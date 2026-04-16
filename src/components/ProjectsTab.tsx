"use client";

import { useEffect, useState } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

const hardcodedProjects = [
  {
    name: "ChessIQ",
    description:
      "Gen AI chess coaching platform with fine-tuned GPT + LLaMA. Selenium + Python automation for E2E regression testing. 500+ beta users.",
    tech: ["Java", "Python", "React", "OpenAI API", "LLaMA", "PostgreSQL", "AWS", "Docker"],
    link: "https://github.com/pavankalyanm",
  },
  {
    name: "Drone Flight Path Optimizer",
    description:
      "ML model with full MLOps lifecycle — MLflow experiment tracking + monitoring. Deployed on AWS infrastructure.",
    tech: ["Python", "PyTorch", "MLflow", "AWS S3", "PostgreSQL"],
    link: "https://github.com/pavankalyanm",
  },
];

const langColors: Record<string, string> = {
  Java: "#b07219",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C#": "#178600",
  Go: "#00ADD8",
  Ruby: "#701516",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Kotlin: "#A97BFF",
};

function SkeletonCard() {
  return (
    <div className="rounded border border-border bg-surface p-4 animate-pulse">
      <div className="h-4 bg-border-light rounded w-2/3 mb-2.5" />
      <div className="h-3 bg-border-light rounded w-full mb-1.5" />
      <div className="h-3 bg-border-light rounded w-4/5 mb-3" />
      <div className="flex gap-3">
        <div className="h-3 bg-border-light rounded w-12" />
        <div className="h-3 bg-border-light rounded w-12" />
      </div>
    </div>
  );
}

export default function ProjectsTab() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/pavankalyanm/repos?per_page=30&sort=updated")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        const sorted = data
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          )
          .slice(0, 6);
        setRepos(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl">
      <p className="text-comment text-[13px]">{"// projects.ts"}</p>

      {/* Featured projects */}
      <div>
        <h3 className="text-[13px] font-mono text-text-dim mb-3 flex items-center gap-2">
          <span className="text-keyword">export</span>{" "}
          <span className="text-blue">const</span>{" "}
          <span className="text-light-blue">featuredProjects</span>{" "}
          <span className="text-text">=</span>
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {hardcodedProjects.map((proj) => (
            <a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded border border-border bg-surface p-4 hover:border-accent/40 hover:bg-surface-hover transition-all"
            >
              <div className="flex items-start justify-between mb-1.5">
                <h4 className="text-text-bright font-semibold font-sans text-[14px] group-hover:text-accent transition-colors">
                  {proj.name}
                </h4>
                <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-text-dim text-[12px] font-sans mb-2.5 leading-relaxed">
                {proj.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {proj.tech.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-accent/20 text-accent bg-accent-glow"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* GitHub repos */}
      <div>
        <h3 className="text-[13px] font-mono text-text-dim mb-3 flex items-center gap-2">
          <span className="text-keyword">export</span>{" "}
          <span className="text-blue">const</span>{" "}
          <span className="text-light-blue">githubRepos</span>{" "}
          <span className="text-text">=</span>{" "}
          <span className="text-comment">// live from API</span>
        </h3>
        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded border border-border bg-surface p-5 text-center">
            <p className="text-text-muted font-mono text-[12px]">
              Failed to load repositories. Check{" "}
              <a
                href="https://github.com/pavankalyanm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                GitHub profile
              </a>{" "}
              directly.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded border border-border bg-surface p-4 hover:border-accent/40 hover:bg-surface-hover transition-all"
              >
                <div className="flex items-start justify-between mb-1.5">
                  <h4 className="text-text font-mono text-[12px] group-hover:text-accent transition-colors truncate mr-2">
                    {repo.name}
                  </h4>
                  <svg className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                {repo.description && (
                  <p className="text-text-dim text-[11px] font-sans mb-2.5 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-[11px] text-text-muted font-mono">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: langColors[repo.language] || "#8b8b8b",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
