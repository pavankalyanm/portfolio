"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const roles = ["Software Engineer", "·", "Gen AI", "·", "Full-Stack"];

const orbVariants = {
  animate: (i: number) => ({
    x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20 * (i % 2 === 0 ? -1 : 1), 0],
    y: [0, -25 * (i % 2 === 0 ? -1 : 1), 20 * (i % 2 === 0 ? 1 : -1), 0],
    transition: {
      duration: 20 + i * 5,
      repeat: Infinity,
      ease: "linear" as const,
    },
  }),
};

const orbs = [
  { color: "bg-purple-600", size: "w-[600px] h-[600px]", pos: "top-[-10%] left-[-10%]", opacity: "opacity-[0.07]" },
  { color: "bg-cyan-500", size: "w-[500px] h-[500px]", pos: "top-[20%] right-[-5%]", opacity: "opacity-[0.06]" },
  { color: "bg-pink-500", size: "w-[450px] h-[450px]", pos: "bottom-[5%] left-[20%]", opacity: "opacity-[0.06]" },
  { color: "bg-violet-600", size: "w-[350px] h-[350px]", pos: "bottom-[20%] right-[15%]", opacity: "opacity-[0.08]" },
];

export default function Hero() {
  const [showRoles, setShowRoles] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll-linked transforms
  const nameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rolesOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);
  const badgeOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Orb parallax (different rates per orb)
  const orbY0 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const orbYValues = [orbY0, orbY1, orbY2, orbY3];

  useEffect(() => {
    const rolesTimer = setTimeout(() => setShowRoles(true), 800);
    const ctaTimer = setTimeout(() => setShowCTA(true), 1800);
    return () => {
      clearTimeout(rolesTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      {/* Sticky inner viewport */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Floating gradient orbs with scroll parallax */}
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={orbVariants}
            animate="animate"
            style={{ y: orbYValues[i] }}
            className={`absolute ${orb.size} ${orb.pos} ${orb.color} ${orb.opacity} rounded-full blur-[120px] pointer-events-none`}
          />
        ))}

        {/* Content with parallax shift */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Open to opportunities badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ opacity: badgeOpacity }}
            className="mb-12 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm text-[#a1a1aa]">Open to new opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 20, duration: 1 }}
            style={{ opacity: nameOpacity, scale: nameScale }}
            className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Pavan K M
          </motion.h1>

          {/* Roles - word by word */}
          <motion.div
            style={{ opacity: rolesOpacity }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-12 min-h-[2rem]"
          >
            <AnimatePresence>
              {showRoles &&
                roles.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.3 }}
                    className="text-xl text-[#a1a1aa]"
                  >
                    {word}
                  </motion.span>
                ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA Buttons */}
          <AnimatePresence>
            {showCTA && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                style={{ opacity: ctaOpacity }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                {/* Download Resume */}
                <motion.a
                  href="/Pavan_Kalyan_Meesala_Resume.pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium text-sm shadow-lg shadow-purple-600/20 hover:shadow-purple-600/40 transition-shadow"
                >
                  Download Resume
                </motion.a>

                {/* Get in Touch */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] text-white font-medium text-sm hover:border-white/[0.12] transition-colors"
                >
                  Get in Touch
                </motion.a>

                {/* GitHub */}
                <motion.a
                  href="https://github.com/pavan-kalyan-m"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] text-white font-medium text-sm hover:border-white/[0.12] transition-colors inline-flex items-center gap-2"
                >
                  GitHub
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-xs text-[#52525b] tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ height: [16, 32, 16] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
              className="w-[1px] bg-gradient-to-b from-[#52525b] to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
