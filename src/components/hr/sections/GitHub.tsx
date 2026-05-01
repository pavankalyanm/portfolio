"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

const langColors: Record<string, string> = {
  Java: "#b07219",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  "Jupyter Notebook": "#DA5B0B",
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear}y ago`;
  if (diffMonth > 0) return `${diffMonth}mo ago`;
  if (diffDay > 0) return `${diffDay}d ago`;
  if (diffHr > 0) return `${diffHr}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return "just now";
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 } as const,
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked header animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.05, 0.25], [30, 0]);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/pavankalyanm/repos?per_page=30&sort=updated"
    )
      .then((res) => (res.ok ? res.json() : Promise.reject()))
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
    <section className="py-32 px-6 relative" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        {/* Header - scroll-linked */}
        <motion.div
          className="flex items-center gap-3 mb-2"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <h2 className="text-4xl font-bold text-white">Live from GitHub</h2>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
        </motion.div>
        <motion.p
          className="text-[#52525b] mb-12"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          Top repositories by stars
        </motion.p>

        {/* Loading skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6 animate-pulse"
              >
                <div className="h-4 bg-white/[0.06] rounded w-2/3 mb-3" />
                <div className="h-3 bg-white/[0.06] rounded w-full mb-2" />
                <div className="h-3 bg-white/[0.06] rounded w-4/5 mb-5" />
                <div className="h-3 bg-white/[0.06] rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <p className="text-[#52525b] text-center py-8">
            Could not load repos. Visit{" "}
            <a
              href="https://github.com/pavankalyanm"
              className="text-purple-400 hover:text-purple-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub profile
            </a>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: "easeOut" as const,
                }}
                whileHover={{
                  y: -2,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
              >
                {/* External link icon */}
                <motion.svg
                  className="absolute top-5 right-5 w-4 h-4 text-[#52525b] opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  whileHover={{ x: 2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                  />
                </motion.svg>

                <h4 className="text-base font-semibold text-white pr-6 truncate">
                  {repo.name}
                </h4>
                {repo.description && (
                  <p className="text-sm text-[#a1a1aa] line-clamp-2 mt-2 leading-relaxed">
                    {repo.description}
                  </p>
                )}

                {/* Metadata row */}
                <div className="flex items-center gap-4 mt-4 text-xs text-[#52525b]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor:
                            langColors[repo.language] || "#8b8b8b",
                        }}
                      />
                      <span>{repo.language}</span>
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                      {repo.stargazers_count}
                    </span>
                  )}
                  <span className="ml-auto">
                    {relativeTime(repo.updated_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
