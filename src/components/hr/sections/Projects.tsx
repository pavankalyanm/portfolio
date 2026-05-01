"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  name: string;
  description: string;
  boldPhrases: string[];
  tech: string[];
  link: string;
}

const projects: Project[] = [
  {
    name: "ChessIQ",
    description:
      "Gen AI chess coaching platform with fine-tuned GPT + LLaMA. 500+ beta users with automated E2E regression testing.",
    boldPhrases: ["500+ beta users"],
    tech: ["Java", "Python", "React", "OpenAI API", "LLaMA", "PostgreSQL", "AWS", "Docker"],
    link: "https://github.com/pavankalyanm",
  },
  {
    name: "Drone Flight Path Optimizer",
    description:
      "ML model with full MLOps lifecycle — MLflow experiment tracking + monitoring. Deployed on AWS infrastructure.",
    boldPhrases: [],
    tech: ["Python", "PyTorch", "MLflow", "AWS S3", "PostgreSQL"],
    link: "https://github.com/pavankalyanm",
  },
];

function renderDescription(desc: string, boldPhrases: string[]) {
  if (boldPhrases.length === 0) return desc;

  const regex = new RegExp(
    `(${boldPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g"
  );
  const parts = desc.split(regex);

  return parts.map((part, i) =>
    boldPhrases.includes(part) ? (
      <span key={i} className="text-white font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden max-w-3xl w-full">
      {/* Gradient banner */}
      <div className="h-40 relative overflow-hidden bg-gradient-to-br from-purple-900/30 to-transparent flex items-center justify-center">
        <span className="text-8xl font-black text-white/[0.06] select-none">
          {project.name[0]}
        </span>
      </div>

      {/* Content */}
      <div className="p-10">
        <h3 className="text-3xl font-bold text-white">{project.name}</h3>
        <p className="text-[#a1a1aa] text-lg leading-relaxed mt-4">
          {renderDescription(project.description, project.boldPhrases)}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-xs rounded-lg bg-white/[0.03] text-[#a1a1aa] border border-white/[0.06] backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* View Project link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-8 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
        >
          View Project &rarr;
        </a>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] as const,
  });

  // Header animations
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  // ChessIQ card: fade in 0.08-0.15, visible until 0.4, fade out 0.4-0.55
  const card1Opacity = useTransform(scrollYProgress, [0.08, 0.15, 0.4, 0.55], [0, 1, 1, 0]);
  const card1Scale = useTransform(scrollYProgress, [0.08, 0.15, 0.4, 0.55], [0.95, 1, 1, 0.95]);

  // Drone card: fade in 0.4-0.55, visible until 0.85, fade out 0.85-1.0
  const card2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 1.0], [0, 1, 1, 0]);
  const card2Scale = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 1.0], [0.95, 1, 1, 0.95]);

  // Slide indicator dot opacity based on which card is active
  const dot1Opacity = useTransform(scrollYProgress, [0.08, 0.15, 0.4, 0.55], [0.3, 1, 1, 0.3]);
  const dot2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.85, 1.0], [0.3, 1, 1, 0.3]);

  // Overall section fade out
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1.0], [1, 0]);

  return (
    <section id="projects" ref={containerRef} className="min-h-[300vh] relative">
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6"
      >
        {/* Header */}
        <motion.div style={{ opacity: headerOpacity, y: headerY }} className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#52525b] mb-4">
            Projects
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            What I&apos;ve Built
          </h2>
        </motion.div>

        {/* Stacked cards */}
        <div className="relative w-full flex items-center justify-center">
          {/* Card 1 — ChessIQ */}
          <motion.div
            style={{ opacity: card1Opacity, scale: card1Scale }}
            className="absolute"
          >
            <ProjectCard project={projects[0]} />
          </motion.div>

          {/* Card 2 — Drone */}
          <motion.div
            style={{ opacity: card2Opacity, scale: card2Scale }}
            className="absolute"
          >
            <ProjectCard project={projects[1]} />
          </motion.div>

          {/* Invisible spacer to maintain layout height */}
          <div className="invisible max-w-3xl w-full">
            <ProjectCard project={projects[0]} />
          </div>
        </div>

        {/* Slide indicator dots */}
        <div className="flex gap-2 mt-8">
          <motion.div
            style={{ opacity: dot1Opacity }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
          <motion.div
            style={{ opacity: dot2Opacity }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
        </div>
      </motion.div>
    </section>
  );
}
