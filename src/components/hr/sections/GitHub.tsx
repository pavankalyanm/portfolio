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
}

const langColors: Record<string, string> = {
  Java: "#b07219",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
};

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/pavankalyanm/repos?per_page=30&sort=updated")
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then((data: GitHubRepo[]) => {
        setRepos(
          data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">GitHub Activity</h2>
        <p className="text-gray-400 mb-10">Live from GitHub API</p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            Could not load repos. Visit{" "}
            <a href="https://github.com/pavankalyanm" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">
              GitHub profile
            </a>
            .
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-purple-200 transition-all"
              >
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 truncate">
                  {repo.name}
                </h4>
                {repo.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: langColors[repo.language] || "#8b8b8b" }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
