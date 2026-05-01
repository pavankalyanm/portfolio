"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface SkillCategory {
  name: string;
  skills: string[];
  colSpan: string;
  glow: string;
}

const categories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C#", "Golang", "C++", "SQL"],
    colSpan: "col-span-2",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)",
  },
  {
    name: "Frameworks",
    skills: ["React", "Angular", "Vue.js", "Next.js", "Tailwind CSS"],
    colSpan: "col-span-1",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 70%)",
  },
  {
    name: "Gen AI & ML",
    skills: ["GPT", "OpenAI API", "LLaMA", "RAG", "Fine-tuning", "Prompt Engineering"],
    colSpan: "col-span-1",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 70%)",
  },
  {
    name: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    colSpan: "col-span-2",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 70%)",
  },
  {
    name: "Automation",
    skills: ["Selenium", "REST APIs", "TestNG", "CI/CD", "Groovy"],
    colSpan: "col-span-1",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)",
  },
  {
    name: "MLOps",
    skills: ["MLflow", "Model Deployment", "Hugging Face"],
    colSpan: "col-span-1",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(236,72,153,0.08) 0%, transparent 70%)",
  },
  {
    name: "Data",
    skills: ["MySQL", "PostgreSQL", "Power BI", "Databricks"],
    colSpan: "col-span-1",
    glow: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)",
  },
];

const headingWords = "Technologies I Work With".split(" ");

function WordReveal({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.35em]">
      {word}
    </motion.span>
  );
}

function CategoryCard({
  category,
  progress,
  start,
  end,
}: {
  category: SkillCategory;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`${category.colSpan} relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 overflow-hidden`}
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: category.glow }}
      />

      <p className="relative text-xs uppercase tracking-wider text-[#52525b] font-medium mb-4">
        {category.name}
      </p>

      <div className="relative flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm rounded-lg bg-white/[0.05] text-[#a1a1aa] border border-white/[0.04]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: "SKILLS" label fades in (0 - 0.1)
  const labelOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Phase 4: Everything fades out (0.8 - 1.0)
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.8, 1.0],
    [0, 1, 1, 0]
  );

  return (
    <section ref={containerRef} id="skills" className="min-h-[200vh] relative">
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-6"
      >
        {/* Spotlight glow behind heading */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(124,58,237,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              style={{ opacity: labelOpacity }}
              className="text-sm uppercase tracking-[0.3em] text-[#52525b] mb-4"
            >
              Skills
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              {headingWords.map((word, i) => {
                // Each word maps to a slice of scrollYProgress
                const wordStart = 0.05 + i * 0.03;
                const wordEnd = wordStart + 0.05;
                return (
                  <WordReveal
                    key={i}
                    word={word}
                    progress={scrollYProgress}
                    start={wordStart}
                    end={wordEnd}
                  />
                );
              })}
            </h2>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat, i) => {
              // Each category gets a staggered slice starting at 0.15
              const catStart = 0.15 + i * 0.05;
              const catEnd = catStart + 0.1;
              return (
                <CategoryCard
                  key={cat.name}
                  category={cat}
                  progress={scrollYProgress}
                  start={catStart}
                  end={catEnd}
                />
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
