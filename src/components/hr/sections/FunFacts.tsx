"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const funFacts = [
  { emoji: "🤖", text: "Built my first automation script to avoid repetitive homework" },
  { emoji: "♟️", text: "Chess enthusiast — hence ChessIQ was born" },
  { emoji: "☁️", text: "Certified in AWS Cloud solutions" },
  { emoji: "🧪", text: "Wrote 200+ automated test cases at IBM" },
  { emoji: "🎓", text: "MS from UT Dallas, B.Tech from VIT" },
  { emoji: "🚀", text: "From QA roots to full-stack + Gen AI" },
  { emoji: "🌍", text: "Worked across US & India time zones" },
  { emoji: "📊", text: "Power BI dashboards that actually get used" },
];

// Small parallax offsets per card for subtle individual motion
const parallaxOffsets: [number, number][] = [
  [0.1, 0.9],
  [0.12, 0.88],
  [0.08, 0.92],
  [0.11, 0.89],
  [0.09, 0.91],
  [0.13, 0.87],
  [0.1, 0.9],
  [0.12, 0.88],
];

const parallaxShifts = [0, -10, 5, -8, 12, -5, 8, -12];

export default function FunFacts() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] as const,
  });

  // Header fade in
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  // Horizontal scroll: vertical scroll maps to horizontal translateX
  const rowX = useTransform(scrollYProgress, [0.1, 0.9], ["5%", "-60%"]);

  // Section fade out
  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1.0], [1, 0]);

  // Individual card parallax transforms
  const cardTransforms = parallaxOffsets.map(([start, end], i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [start, end], [0, parallaxShifts[i]])
  );

  useEffect(() => {
    if (typeof document !== "undefined") {
      const id = "caveat-font-link";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

  return (
    <section ref={containerRef} className="min-h-[200vh] relative">
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="sticky top-0 h-screen overflow-hidden flex items-center"
      >
        <div className="w-full px-6">
          {/* Header */}
          <motion.h2
            style={{
              opacity: headerOpacity,
              y: headerY,
              fontFamily: "'Caveat', cursive",
            }}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            A few things about me
          </motion.h2>

          {/* Horizontally scrolling card row */}
          <motion.div
            style={{ x: rowX }}
            className="flex gap-4"
          >
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                style={{ y: cardTransforms[i] }}
                className="flex-shrink-0 min-w-[280px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl px-8 py-6"
              >
                <span className="text-2xl block">{fact.emoji}</span>
                <p className="text-sm text-[#a1a1aa] mt-2 leading-relaxed">
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
