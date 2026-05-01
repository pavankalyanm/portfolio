"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";

const stats = [
  { end: 4, suffix: "+", label: "Years Experience" },
  { end: 2, suffix: "", label: "Companies" },
  { end: 25, suffix: "+", label: "Technologies" },
  { end: 500, suffix: "+", label: "Beta Users" },
];

export default function AtAGlance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Trigger CountUp once the section scrolls into meaningful view
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.15 && !hasEntered) {
        setHasEntered(true);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, hasEntered]);

  // Section label fade-in
  const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // Card staggered fade-in and scale
  const opacity1 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const scale1 = useTransform(scrollYProgress, [0.05, 0.2], [0.9, 1]);
  const cardY1 = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const scale2 = useTransform(scrollYProgress, [0.1, 0.25], [0.9, 1]);
  const cardY2 = useTransform(scrollYProgress, [0.1, 0.25], [30, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const scale3 = useTransform(scrollYProgress, [0.15, 0.3], [0.9, 1]);
  const cardY3 = useTransform(scrollYProgress, [0.15, 0.3], [30, 0]);

  const opacity4 = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const scale4 = useTransform(scrollYProgress, [0.2, 0.35], [0.9, 1]);
  const cardY4 = useTransform(scrollYProgress, [0.2, 0.35], [30, 0]);

  const cardStyles = [
    { opacity: opacity1, scale: scale1, y: cardY1 },
    { opacity: opacity2, scale: scale2, y: cardY2 },
    { opacity: opacity3, scale: scale3, y: cardY3 },
    { opacity: opacity4, scale: scale4, y: cardY4 },
  ];

  // Fade out everything together
  const fadeOut = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh]">
      {/* Sticky inner viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center px-6">
        <motion.div style={{ opacity: fadeOut }} className="w-full">
          {/* Section label */}
          <motion.p
            style={{ opacity: labelOpacity }}
            className="text-sm uppercase tracking-[0.3em] text-[#52525b] font-medium text-center mb-16"
          >
            At a Glance
          </motion.p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                style={cardStyles[i]}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(255,255,255,0.12)",
                }}
                className="relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 text-center overflow-hidden group cursor-default"
              >
                {/* Subtle radial glow behind number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 bg-purple-600/[0.03] rounded-full blur-2xl group-hover:bg-purple-600/[0.06] transition-colors duration-500" />
                </div>

                <div className="relative z-10">
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {hasEntered ? (
                      <CountUp
                        end={stat.end}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </p>
                  <p className="text-sm text-[#a1a1aa] mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
