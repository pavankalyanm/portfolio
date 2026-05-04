"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./HRMode.module.css";
import { CloudOrbit, OrbitingImage } from "@/components/ui/cloud-orbit";
import { LogoCloud } from "@/components/ui/logo-cloud-2";
import { IconGrid, type IconGridItem } from "@/components/ui/icon-set";
import { Waves } from "@/components/ui/wave-background";
import { Mail, Briefcase, GraduationCap, Rocket, Bot } from "lucide-react";
import {
  Component as MorphingCardStack,
  type CardData,
} from "@/components/ui/morphing-card-stack";

const projectCards: CardData[] = [
  {
    id: "applyflow",
    title: "ApplyFlow AI",
    description:
      "GPT-4o job-app platform — resume tailoring, cover letters, and ATS keyword optimization. 70% faster per apply. Multi-agent orchestration via Semantic Kernel + MCP coordinates scraping, generation, and tracking.",
    icon: <Rocket className="h-5 w-5" />,
    href: "https://applyflowai.com",
    tags: ["GPT-4o", "Semantic Kernel", "MCP", "Agents"],
  },
  {
    id: "clueclaude",
    title: "ClueClaude",
    description:
      "Interview prep on Claude — resume + JD becomes an AI you in 60s. Per-role Interview Agents auto-build persona, 12 JD-mapped STAR stories, gap strategies, and 25 predicted questions.",
    icon: <Bot className="h-5 w-5" />,
    href: "https://github.com/pavankalyanm/clueclaude",
    tags: ["Claude Opus", "Skills", "STAR", "Agents"],
  },
];

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="h-7 w-7 text-[#1d1d1f]/75 transition-all duration-300 group-hover:scale-110 group-hover:text-[#1d1d1f]">
    {children}
  </div>
);

const LinkedInGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C#": "#178600",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  Kotlin: "#A97BFF",
};

const fallbackRepos = [
  {
    name: "portfolio-se",
    language: "TypeScript",
    description: "Interactive dev + HR portfolio built with Next.js and Tailwind.",
  },
  {
    name: "chessiq",
    language: "Python",
    description: "Gen AI chess coach — fine-tuned GPT + LLaMA with live analysis.",
  },
  {
    name: "drone-opt",
    language: "Python",
    description: "Flight-path optimizer w/ MLflow tracking + AWS deployment.",
  },
  {
    name: "gen-ai-utils",
    language: "Java",
    description: "Reusable prompt + RAG utilities across internal services.",
  },
];

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
}

const funFacts = [
  "Building @KeyChainN as Co-Founder & CTO. CTO hat by day, code reviews by night.",
  "Shipped ApplyFlow AI — 70% faster job apps via GPT-4o + Semantic Kernel + MCP.",
  "Cloned myself into ClueClaude. It interviews better than I do.",
  "AWS ML · TensorFlow · PyTorch certified. Still Google 'grep -r' every time.",
];

const contactIcons: IconGridItem[] = [
  {
    id: "email",
    name: "Email",
    href: "mailto:kalyanmese@gmail.com",
    copyValue: "kalyanmese@gmail.com",
    icon: (
      <IconWrapper>
        <Mail className="h-full w-full" />
      </IconWrapper>
    ),
  },
  {
    id: "discord",
    name: "Discord",
    href: "https://discord.com/users/pavankalyanm",
    copyValue: "pavankalyanm",
    icon: (
      <IconWrapper>
        <DiscordGlyph />
      </IconWrapper>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/pavankalyan-meesala/",
    copyValue: "https://www.linkedin.com/in/pavankalyan-meesala/",
    icon: (
      <IconWrapper>
        <LinkedInGlyph />
      </IconWrapper>
    ),
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://instagram.com/pavankalyan.me",
    copyValue: "@pavankalyan.me",
    icon: (
      <IconWrapper>
        <InstagramGlyph />
      </IconWrapper>
    ),
  },
];

const memojiImages = [
  { name: "Pavan Memoji", url: "/memoji.png" },
];

const orbitingImagesData = [
  {
    speed: 20,
    radius: 60,
    size: 27,
    startAt: 0.15625,
    images: [
      { name: "React", url: "https://svgl.app/library/react_dark.svg" },
      { name: "JavaScript", url: "https://svgl.app/library/javascript.svg" },
    ],
  },
  {
    speed: 20,
    radius: 59,
    size: 43,
    startAt: 0.25,
    images: [
      { name: "Docker", url: "https://svgl.app/library/docker.svg" },
      { name: "Kubernetes", url: "https://svgl.app/library/kubernetes.svg" },
    ],
  },
  {
    speed: 20,
    radius: 65,
    size: 37,
    startAt: 0.4375,
    images: [
      { name: "AWS", url: "https://svgl.app/library/aws_light.svg" },
      { name: "Azure", url: "https://svgl.app/library/azure.svg" },
    ],
  },
  {
    speed: 20,
    radius: 60,
    size: 25,
    startAt: 0.61,
    images: [
      { name: "MongoDB", url: "https://svgl.app/library/mongodb-icon-dark.svg" },
      { name: "Kafka", url: "https://svgl.app/library/apache-kafka-light.svg" },
    ],
  },
  {
    speed: 20,
    radius: 68,
    size: 20,
    startAt: 0.65625,
    images: [
      { name: "Claude", url: "https://svgl.app/library/claude-ai-icon.svg" },
      { name: "Node.js", url: "https://svgl.app/library/nodejs.svg" },
    ],
  },
  {
    speed: 20,
    radius: 56,
    size: 44,
    startAt: 0.75,
    images: [
      { name: "GitHub", url: "https://svgl.app/library/github_light.svg" },
      { name: "Notion", url: "https://svgl.app/library/notion.svg" },
    ],
  },
  {
    speed: 20,
    radius: 62,
    size: 37,
    startAt: 0.9375,
    images: [
      { name: "Java", url: "https://svgl.app/library/java.svg" },
      { name: "HTML5", url: "https://svgl.app/library/html5.svg" },
    ],
  },
];

interface HRModeProps {
  onSwitchMode: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const cardHover = {
  y: -3,
  boxShadow:
    "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.06), 0 24px 48px rgba(16,24,40,0.05)",
  transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] },
};

const cardBase =
  "hr-card bg-white rounded-[22px] p-6 overflow-hidden relative";
const cardShadow = {
  boxShadow:
    "0 1px 2px rgba(16,24,40,0.04), 0 2px 8px rgba(16,24,40,0.03), 0 12px 28px rgba(16,24,40,0.025)",
};

// Eyebrow label — consistent across every card
function Label({ children }: { children: React.ReactNode }) {
  return <p className="hr-label">{children}</p>;
}

export default function HRMode({ onSwitchMode }: HRModeProps) {
  const [repos, setRepos] = useState<
    {
      name: string;
      language: string | null;
      description: string | null;
      url?: string;
    }[]
  >(fallbackRepos);
  const [reposLoading, setReposLoading] = useState(true);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.github.com/users/pavankalyanm/repos?per_page=30&sort=updated"
    )
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: GitHubRepo[]) => {
        if (cancelled) return;
        const sorted = data
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime()
          )
          .slice(0, 4)
          .map((r) => ({
            name: r.name,
            language: r.language,
            description: r.description,
            url: r.html_url,
          }));
        if (sorted.length) setRepos(sorted);
        setReposLoading(false);
      })
      .catch(() => {
        if (!cancelled) setReposLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFactIndex((i) => (i + 1) % funFacts.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative min-h-screen w-screen flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden"
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      {/* Animated waves backdrop — desktop only (perf + pointer-relevant) */}
      <div className="absolute inset-0 -z-10 pointer-events-none hidden md:block">
        <Waves
          backgroundColor="#f5f5f7"
          strokeColor="rgba(123, 97, 255, 0.18)"
          pointerSize={0.4}
        />
      </div>
      {/* Mobile static backdrop */}
      <div className="absolute inset-0 -z-10 md:hidden bg-[#f5f5f7]" />

      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ══════════ Bento Grid ══════════ */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`${styles.bentoGrid} relative z-10 w-full lg:w-[92%] xl:w-[88%] 2xl:w-[82%]`}
      >
        {/* ─── Name / Identity ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaName} ${cardBase} p-6 flex flex-col justify-between min-h-[300px]`}
          whileHover={cardHover}
        >
          {/* Dotted background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #c7c7cc 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              opacity: 0.35,
            }}
          />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.95),rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.95))]" />

          {/* Floating dev switch */}
          <motion.button
            onClick={onSwitchMode}
            className="hr-focus absolute top-3.5 right-3.5 z-20 text-[#86868b] hover:text-[#1d1d1f] transition-colors cursor-pointer h-8 w-8 flex items-center justify-center rounded-[10px] border border-transparent hover:border-black/[0.06] hover:bg-black/[0.03]"
            title="Switch to Dev Mode"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
          >
            <span className="font-mono text-[12px] tracking-tight">&lt;/&gt;</span>
          </motion.button>

          {/* Memoji + orbiting tech */}
          <div className="relative z-10 flex-1 flex items-center justify-center min-h-[200px]">
            <div className="relative w-[220px] h-[220px]">
              <span className="hr-orbit-halo" aria-hidden />
              <CloudOrbit
                duration={3}
                size={80}
                images={memojiImages}
              >
                {orbitingImagesData.map((orbit, index) => (
                  <OrbitingImage
                    key={index}
                    speed={orbit.speed}
                    radius={orbit.radius}
                    size={orbit.size}
                    startAt={orbit.startAt}
                    images={orbit.images}
                    duration={3}
                  />
                ))}
              </CloudOrbit>
            </div>
          </div>

          {/* Name */}
          <div className="relative z-10 text-center">
            <h1 className="text-[26px] lg:text-[30px] font-semibold tracking-[-0.022em] text-[#1d1d1f] leading-[1.02]">
              Pavan K M
            </h1>
            <p className="text-[11.5px] text-[#6e6e73] mt-1.5 leading-snug tracking-[0.01em]">
              Software Engineer
              <br />
              <span className="text-[#1d1d1f]/80">Gen AI</span>
              <span className="mx-1.5 text-[#d2d2d7]">·</span>
              <span className="text-[#1d1d1f]/80">Full Stack</span>
            </p>
          </div>
        </motion.div>

        {/* ─── Contact ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaContact} ${cardBase} min-h-[240px] flex flex-col`}
          whileHover={cardHover}
        >
          <div className="flex items-center justify-between">
            <Label>Contact</Label>
            <span className="text-[9px] tracking-[0.12em] uppercase text-[#a1a1a6] font-medium hr-num">04</span>
          </div>
          <div className="mt-4 flex-1 flex items-center justify-center">
            <IconGrid
              items={contactIcons}
              className="!grid-cols-2 sm:!grid-cols-2 md:!grid-cols-2 lg:!grid-cols-2 gap-3"
            />
          </div>
        </motion.div>

        {/* ─── Fav Quote (thin horizontal strip) ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaQuote} ${cardBase} flex flex-col sm:flex-row sm:items-center py-4 gap-2 sm:gap-0`}
          whileHover={cardHover}
        >
          <div className="flex items-center">
            <Label>Quote</Label>
            <span className="hidden sm:inline-block ml-3 mr-3 h-3 w-px bg-[#e5e5ea]" aria-hidden />
          </div>
          <div className="flex-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 min-w-0">
            <p className="text-[12.5px] lg:text-[13.5px] italic font-light text-[#1d1d1f] tracking-[-0.005em] leading-snug lg:whitespace-nowrap">
              &ldquo;The hardest choices require the strongest wills.&rdquo;
            </p>
            <span className="text-[10px] text-[#a1a1a6] whitespace-nowrap tracking-[0.02em]">
              — Thanos
            </span>
          </div>
        </motion.div>

        {/* ─── Fun Fact Carousel (small) ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaFunfact} ${cardBase} min-h-[140px] flex flex-col`}
          whileHover={cardHover}
        >
          <div className="flex items-center justify-between">
            <Label>Fun Fact</Label>
            <span className="text-[9px] font-mono text-[#c7c7cc] tabular-nums hr-num">
              {String(factIndex + 1).padStart(2, "0")}
              <span className="mx-0.5 text-[#e5e5ea]">/</span>
              {String(funFacts.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-3 flex-1 flex items-start">
            <motion.p
              key={factIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="text-[12.5px] text-[#1d1d1f] leading-[1.45] tracking-[-0.005em]"
            >
              {funFacts[factIndex]}
            </motion.p>
          </div>
          <div className="flex gap-1.5 mt-3">
            {funFacts.map((_, i) => (
              <button
                key={i}
                onClick={() => setFactIndex(i)}
                aria-label={`Show fun fact ${i + 1}`}
                className={`hr-focus h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  i === factIndex
                    ? "w-5 bg-[#1d1d1f]"
                    : "w-1 bg-[#d2d2d7] hover:bg-[#a1a1a6]"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ─── Right side stack: Git Repos top + Featured Projects below (col 3) ─── */}
        <div className={`${styles.areaRightside} flex flex-col gap-2.5 min-h-0`}>

          {/* Git Repos */}
          <motion.div
            variants={item}
            style={cardShadow}
            className={`${cardBase} flex flex-col shrink-0`}
            whileHover={cardHover}
          >
            <div className="flex items-center justify-between">
              <Label>Git Repos</Label>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/pavankalyanm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hr-focus inline-flex items-center gap-1 text-[9.5px] font-medium tracking-[0.04em] text-[#1d1d1f] hover:text-[#0e639c] transition-colors"
                  title="github.com/pavankalyanm"
                >
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.74 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.16 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.48 3.16-1.17 3.16-1.17.62 1.58.23 2.74.11 3.03.74.8 1.18 1.82 1.18 3.07 0 4.39-2.69 5.36-5.25 5.64.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
                  </svg>
                  pavankalyanm
                </a>
                <span className="flex items-center gap-1.5 text-[9.5px] font-medium tracking-[0.08em] uppercase text-[#0e7d4f]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-500 opacity-60" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  {reposLoading ? "Syncing" : "Shipping"}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {repos.slice(0, 4).map((repo) => {
                  const color = repo.language
                    ? langColors[repo.language] ?? "#86868b"
                    : "#86868b";
                  const content = (
                    <div className="rounded-[10px] border border-[#ececef] bg-[#fafafa]/70 p-2.5 transition-all duration-300 hover:bg-white hover:border-[#d2d2d7] hover:shadow-[0_1px_2px_rgba(16,24,40,0.04),0_4px_12px_rgba(16,24,40,0.04)] hover:-translate-y-px">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 ring-2 ring-white"
                          style={{
                            background: color,
                            boxShadow: `0 0 0 1px ${color}20`,
                          }}
                        />
                        <p className="text-[12.5px] font-semibold text-[#1d1d1f] truncate tracking-[-0.005em]">
                          {repo.name}
                        </p>
                      </div>
                      <p className="mt-0.5 ml-[14px] text-[10px] text-[#86868b] font-medium tracking-[0.02em]">
                        {repo.language ?? "—"}
                      </p>
                    </div>
                  );
                  return repo.url ? (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hr-focus block rounded-[10px]"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={repo.name}>{content}</div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Featured Projects — fills remaining height below Git Repos */}
          <motion.div
            variants={item}
            style={cardShadow}
            className={`${cardBase} flex flex-col flex-1 min-h-0`}
            whileHover={cardHover}
          >
            <div className="flex items-center justify-between mb-3 shrink-0">
              <Label>Featured Projects</Label>
              <span className="text-[9px] text-[#a1a1a6] hr-num tracking-[0.04em]">
                {projectCards.length} shipped
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-0">
              <MorphingCardStack
                cards={projectCards}
                defaultLayout="stack"
              />
            </div>
          </motion.div>
        </div>

        {/* ─── Latest News — col 4 full height ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaExperience} ${cardBase} flex flex-col overflow-y-auto`}
          whileHover={cardHover}
        >
          <div className="flex items-center justify-between">
            <Label>Latest News</Label>
            <span className="hr-chip hr-chip-live">Live</span>
          </div>
          <div className="mt-5 space-y-4">
            {[
              {
                date: "Latest · LinkedIn",
                title: "Job searching in 2026 is completely broken",
                body: "Why the funnel is busted, what AI agents change, and how I'd fix it.",
                href: "https://www.linkedin.com/posts/pavankalyan-meesala_job-searching-in-2026-is-completely-broken-share-7443399829965340672-3_7c",
              },
              {
                date: "Recent · LinkedIn",
                title: "KeyChainN is ready, so am I",
                body: "Launching KeyChainN as Co-Founder & CTO — the build is live.",
                href: "https://www.linkedin.com/posts/pavankalyan-meesala_keychainn-is-ready-so-am-i-share-7435439643401060352-I5qw",
              },
              {
                date: "Recent · Substack",
                title: "JustApplied — note",
                body: "Notes from the trenches of building, applying, and shipping in public.",
                href: "https://substack.com/@justapplied/note/p-193207619",
              },
              {
                date: "Earlier · LinkedIn",
                title: "Founder journey — Startup Grind",
                body: "On startup mania, Startup Grind, and the long arc of founder life.",
                href: "https://www.linkedin.com/posts/pavankalyan-meesala_startupmania-startupgrind-founderjourney-share-7425327573901127680-piWK",
              },
            ].map((news, i, arr) => (
              <a
                key={news.title}
                href={news.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hr-focus block group ${i < arr.length - 1 ? "pb-4 border-b border-[#f0f0f2]" : ""}`}
              >
                <p className="text-[9.5px] uppercase tracking-[0.16em] text-[#a1a1a6] font-semibold hr-num">
                  {news.date}
                </p>
                <p className="text-[13px] font-semibold text-[#1d1d1f] mt-1.5 leading-[1.25] tracking-[-0.01em] group-hover:text-[#0e639c] transition-colors">
                  {news.title}
                </p>
                <p className="text-[11.5px] text-[#6e6e73] mt-1 leading-[1.5]">
                  {news.body}
                </p>
              </a>
            ))}
          </div>
          <div className="mt-auto -mx-6 -mb-6 pt-5">
            <iframe
              title="Spotify playlist"
              data-testid="embed-iframe"
              src="https://open.spotify.com/embed/playlist/3RMOIziTyLVtyl0o8KkCsf?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder={0}
              allowFullScreen
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              style={{ display: "block", borderBottomLeftRadius: 22, borderBottomRightRadius: 22 }}
            />
          </div>
        </motion.div>

        {/* ─── Skills (wide) ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaSkills} ${cardBase} p-0 relative overflow-hidden min-h-[180px] lg:min-h-0`}
          whileHover={cardHover}
        >
          <div className="absolute top-3 left-4 z-20 flex items-center gap-2 rounded-full bg-white/75 backdrop-blur-md px-2.5 py-1 border border-black/[0.04] shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <span className="h-1 w-1 rounded-full bg-[#1d1d1f]/70" aria-hidden />
            <Label>Stack</Label>
          </div>
          <div className="h-full w-full overflow-hidden marquee-mask flex items-stretch">
            <div className="flex w-max h-full animate-marquee-rtl">
              <LogoCloud className="shrink-0 h-full" />
              <LogoCloud className="shrink-0 h-full" aria-hidden />
            </div>
          </div>
        </motion.div>

        {/* ─── Experience (timeline, mirrors dev) ─── */}
        <motion.div
          variants={item}
          style={cardShadow}
          className={`${styles.areaProjects} ${cardBase} flex flex-col overflow-hidden`}
          whileHover={cardHover}
        >
          <div className="flex items-center justify-between mb-4">
            <Label>Experience</Label>
            <div className="flex items-center gap-1.5">
              <a
                href="/resume.pdf"
                download="Pavan_KM_Resume.pdf"
                className="hr-focus inline-flex items-center gap-1 rounded-full border border-[#e5e5ea] bg-white px-2 py-[3px] text-[9.5px] font-semibold tracking-[0.04em] uppercase text-[#1d1d1f] hover:border-[#c7c7cc] hover:shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all"
                title="Download Resume"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Resume
              </a>
              <span className="hr-chip hr-num">4 yrs</span>
            </div>
          </div>

          {/* Timeline — icons, multi-line quips, bordered job cards, bottom-up reveal */}
          <motion.div
            className="relative flex-1 min-h-0 flex flex-col justify-between py-1"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.09, staggerDirection: -1 },
              },
            }}
          >
            {/* Vertical line — fades at both ends, sits behind icons */}
            <div
              className="absolute left-[11px] top-3 bottom-3 w-px"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #e5e5ea 10%, #e5e5ea 90%, transparent 100%)",
              }}
            />

            {(
              [
                {
                  place: "KeyChainN",
                  role: "Chief Technology Officer",
                  href: "https://keychainn.com",
                  period: "2025 – Present",
                  type: "job" as const,
                  current: true,
                  quip: "Leading engineering and product — from roadmap to commits, and everything between.",
                },
                {
                  place: "Evergreen",
                  role: "Software Engineer Intern",
                  period: "Jan – May 2025",
                  type: "job" as const,
                  quip: "Intern badge, real commits. Five months, one production ship.",
                },
                {
                  place: "UT Dallas",
                  role: "MS in Info Technology and Management",
                  period: "2023 – 2025",
                  type: "edu" as const,
                  quip: "Learned MLOps, LLaMs, and how to survive Texas summers.",
                },
                {
                  place: "Syniti",
                  role: "Software Engineer",
                  period: "2022 – 2023",
                  type: "job" as const,
                  quip: "Data migrations at enterprise scale. Hand-held legacy into the cloud.",
                },
                {
                  place: "Nerds & Geeks",
                  role: "Software Engineer",
                  period: "2021 – 2022",
                  type: "job" as const,
                  quip: "First full-time gig. Broke things politely, fixed them quickly.",
                },
                {
                  place: "JNTUA",
                  role: "BTech in Computer Science",
                  period: "2018 – 2021",
                  type: "edu" as const,
                  quip: "First ML in Python, pointer jokes in C++, 4am submissions as tradition.",
                },
                {
                  place: "S.V Govt Polytechnic",
                  role: "Diploma in Computer Science",
                  period: "2015 – 2018",
                  type: "edu" as const,
                  quip: "Where the bug bit me. C/C++, Linux, and a turtle.",
                },
              ]
            ).map((node, i) => {
              const isJob = node.type === "job";
              const isCurrent = "current" in node && node.current;
              const Icon = isJob ? Briefcase : GraduationCap;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                  className="group relative pl-9"
                >
                  {/* Icon chip — job (filled dark) vs edu (outlined) */}
                  <span
                    className={`absolute left-0 top-[1px] z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full transition-all duration-300 ${
                      isJob
                        ? isCurrent
                          ? "bg-[#1d1d1f] text-white shadow-[0_0_0_3px_rgba(29,29,31,0.08)]"
                          : "bg-[#1d1d1f] text-white"
                        : "bg-white text-[#1d1d1f] border-[1.5px] border-[#c7c7cc] group-hover:border-[#1d1d1f]"
                    }`}
                  >
                    <Icon className="h-3 w-3" strokeWidth={isJob ? 2 : 1.75} />
                  </span>

                  {/* Content — jobs are enclosed in a subtle border card */}
                  <div
                    className={
                      isJob
                        ? "rounded-lg border border-[#e5e5ea] bg-[#fafafa]/60 px-2.5 py-1.5 transition-all duration-200 group-hover:bg-white group-hover:border-[#c7c7cc] group-hover:shadow-[0_1px_3px_rgba(16,24,40,0.04)]"
                        : ""
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10.5px] font-semibold text-[#1d1d1f] leading-tight truncate tracking-[-0.005em]">
                          {(() => {
                            const href = "href" in node ? node.href : undefined;
                            return href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hr-focus decoration-[#c7c7cc] decoration-dotted underline-offset-[3px] hover:underline hover:decoration-[#1d1d1f]"
                              >
                                {node.place}
                              </a>
                            ) : (
                              node.place
                            );
                          })()}
                        </p>
                        <p className="text-[9px] text-[#1d1d1f] leading-tight tracking-[-0.005em] mt-[2px] truncate">
                          {node.role}
                        </p>
                      </div>
                      <span className="text-[8.5px] font-mono tabular-nums text-[#a1a1a6] whitespace-nowrap shrink-0 tracking-[-0.02em] hr-num mt-[1px]">
                        {node.period}
                      </span>
                    </div>
                    <p className="text-[9.5px] italic text-[#86868b] leading-snug tracking-[-0.005em] mt-[3px]">
                      {node.quip}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
