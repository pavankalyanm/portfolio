"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onSwitchMode: () => void;
}

export default function Navbar({ onSwitchMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.nav
      className="fixed top-[2px] left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backgroundColor: visible ? "rgba(5,5,5,0.8)" : "transparent",
        backdropFilter: visible ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: visible ? "blur(20px) saturate(180%)" : "none",
        borderBottom: visible ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-base font-semibold text-white tracking-tight">Pavan K M</span>
          <span className="hidden sm:inline text-xs text-[#52525b] ml-2 font-medium">Software Engineer</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-[13px] text-[#a1a1aa] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.button
            onClick={onSwitchMode}
            className="text-[13px] text-[#52525b] hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.05] cursor-pointer ml-2"
            title="Switch to Dev Mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="font-mono">&lt;/&gt;</span>
          </motion.button>
          <motion.a
            href="/resume.pdf"
            download="Pavan_KM_Resume.pdf"
            className="ml-2 px-4 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Resume
          </motion.a>
        </div>

        <motion.button
          className="md:hidden text-[#a1a1aa] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden px-6 py-4 space-y-1"
            style={{
              backgroundColor: "rgba(5,5,5,0.95)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[#a1a1aa] hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { onSwitchMode(); setMenuOpen(false); }}
              className="block text-sm text-[#52525b] hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <span className="font-mono">&lt;/&gt;</span> Dev Mode
            </button>
            <a
              href="/resume.pdf"
              download="Pavan_KM_Resume.pdf"
              className="inline-block mt-2 px-4 py-2 text-sm font-medium rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
