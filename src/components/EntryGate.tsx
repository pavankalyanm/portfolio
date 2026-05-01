"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EntryGateProps {
  onSelect: (mode: "dev" | "hr") => void;
}

export default function EntryGate({ onSelect }: EntryGateProps) {
  const [selected, setSelected] = useState<"hr" | "dev" | null>(null);

  const handleSelect = (mode: "dev" | "hr") => {
    setSelected(mode);
    setTimeout(() => onSelect(mode), 600);
  };

  return (
    <AnimatePresence>
      {!selected && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-[0.04]"
              style={{
                background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #4ec9b0, #c586c0, #7c3aed)",
                animation: "spin 25s linear infinite",
              }}
            />
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-500/20"
              initial={{ x: `${20 + i * 15}%`, y: "110%" }}
              animate={{
                y: "-10%",
                x: `${20 + i * 15 + Math.sin(i) * 10}%`,
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 text-center px-6 max-w-3xl w-full">
            <motion.h1
              className="text-5xl sm:text-6xl font-bold text-white mb-3 tracking-tight"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Pavan K M
            </motion.h1>
            <motion.p
              className="text-gray-500 text-lg sm:text-xl mb-14"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Software Engineer &middot; Gen AI &middot; Full-Stack
            </motion.p>

            <motion.p
              className="text-gray-600 text-sm mb-10 uppercase tracking-[0.25em]"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              How would you like to explore?
            </motion.p>

            {/* Mode cards */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch">
              {/* HR Card */}
              <motion.button
                onClick={() => handleSelect("hr")}
                className="group flex-1 max-w-xs mx-auto sm:mx-0 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 text-left cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, type: "spring", bounce: 0.3 }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(124, 58, 237, 0.4)",
                  boxShadow: "0 20px 60px rgba(124, 58, 237, 0.15)",
                  backgroundColor: "rgba(124, 58, 237, 0.05)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-3xl mb-4">&#128100;</div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  I&apos;m a Recruiter / HR
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Clean, visual, professional. Highlights impact &amp; experience.
                </p>
              </motion.button>

              {/* Dev Card */}
              <motion.button
                onClick={() => handleSelect("dev")}
                className="group flex-1 max-w-xs mx-auto sm:mx-0 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 text-left cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, type: "spring", bounce: 0.3 }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(78, 201, 176, 0.4)",
                  boxShadow: "0 20px 60px rgba(78, 201, 176, 0.15)",
                  backgroundColor: "rgba(78, 201, 176, 0.05)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="text-3xl mb-4 font-mono text-gray-400">&lt;/&gt;</div>
                <h3
                  className="text-white text-lg font-semibold mb-2"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  I&apos;m a Developer
                </h3>
                <p
                  className="text-gray-500 text-sm leading-relaxed"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Code-native, terminal UI. Full Cursor-style IDE layout.
                </p>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
