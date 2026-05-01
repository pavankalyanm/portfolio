"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const education = [
  {
    degree: "MS in Information Technology",
    school: "University of Texas, Dallas",
    period: "2023 – 2025",
    parallaxOffset: -10,
  },
  {
    degree: "B.Tech in Computer Science",
    school: "VIT University",
    period: "2017 – 2021",
    parallaxOffset: -20,
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "Government Polytechnic",
    period: "2014 – 2017",
    parallaxOffset: -15,
  },
];

function EducationCard({
  edu,
  index,
  scrollYProgress,
}: {
  edu: (typeof education)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Scroll-linked parallax offset per card
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, edu.parallaxOffset]
  );

  return (
    <motion.div
      className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] border-l-2 border-l-purple-500/50 rounded-2xl p-8 transition-colors duration-300"
      style={{ y: cardY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.12,
        type: "spring" as const,
        bounce: 0.3,
        duration: 0.8,
      }}
      whileHover={{ y: -2, borderColor: "rgba(255,255,255,0.12)" }}
    >
      {/* Graduation cap icon */}
      <svg
        className="w-8 h-8 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
        />
      </svg>
      <h3 className="text-lg font-semibold text-white mt-4">{edu.degree}</h3>
      <p className="text-sm text-purple-400 mt-1">{edu.school}</p>
      <p className="text-sm text-[#52525b] mt-2">{edu.period}</p>
    </motion.div>
  );
}

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked header parallax
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.22], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.02, 0.22], [30, 0]);

  return (
    <section className="py-32 px-6 bg-white/[0.01] relative" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          className="text-xs uppercase tracking-[0.3em] text-[#52525b] text-center mb-4"
          style={{ opacity: labelOpacity, y: labelY }}
        >
          EDUCATION
        </motion.p>
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-white text-center mb-16"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          Academic Background
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {education.map((edu, index) => (
            <EducationCard
              key={edu.degree}
              edu={edu}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
