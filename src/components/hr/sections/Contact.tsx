"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

const fieldVariants = {
  hidden: { opacity: 0, y: 20 } as const,
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const socialVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 } as const,
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-linked "text grows into view" for heading
  const headingScale = useTransform(scrollYProgress, [0.07, 0.25], [0.8, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.07, 0.25], [0, 1]);
  // Subtitle slightly delayed
  const subtitleOpacity = useTransform(scrollYProgress, [0.12, 0.3], [0, 1]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Contact from ${form.name}`
    );
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );
    window.open(
      `mailto:kalyanmese@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#7c3aed", "#a855f7", "#06b6d4"],
    });
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-32 px-6 relative"
      style={{
        background: "linear-gradient(to bottom, #050505, #0a0a1a)",
      }}
      ref={sectionRef}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-32 -translate-x-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-lg mx-auto text-center">
        {/* Scroll-linked scale entrance */}
        <motion.h2
          className="text-5xl sm:text-6xl font-bold text-white"
          style={{
            scale: headingScale,
            opacity: headingOpacity,
          }}
        >
          Let&apos;s Talk
        </motion.h2>
        <motion.p
          className="text-[#a1a1aa] mt-4"
          style={{ opacity: subtitleOpacity }}
        >
          Interested in working together? I&apos;d love to hear from you.
        </motion.p>

        {submitted ? (
          <motion.div
            className="mt-12 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-10 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
          >
            <div className="text-4xl mb-4">&#10003;</div>
            <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Message sent! I&apos;ll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-5 text-left">
            {[
              {
                label: "Name",
                type: "text",
                key: "name" as const,
                placeholder: "Your name",
              },
              {
                label: "Email",
                type: "email",
                key: "email" as const,
                placeholder: "you@example.com",
              },
            ].map((field, i) => (
              <motion.div
                key={field.key}
                variants={fieldVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: "easeOut" as const,
                }}
              >
                <label className="block text-sm text-[#a1a1aa] font-medium mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors"
                />
              </motion.div>
            ))}
            <motion.div
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.5,
                ease: "easeOut" as const,
              }}
            >
              <label className="block text-sm text-[#a1a1aa] font-medium mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Your message..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-[#52525b] text-sm focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 resize-none transition-colors"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-sm cursor-pointer transition-shadow"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeOut" as const,
              }}
              whileHover={{
                scale: 1.01,
                boxShadow: "0 0 30px rgba(168,85,247,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </form>
        )}

        {/* Social links */}
        <div className="flex flex-wrap gap-4 justify-center mt-12">
          {[
            {
              href: "mailto:kalyanmese@gmail.com",
              label: "kalyanmese@gmail.com",
              icon: (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              ),
            },
            {
              href: "https://github.com/pavankalyanm",
              label: "GitHub",
              external: true,
              icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              ),
            },
            {
              href: "tel:+19452359893",
              label: "(945) 235-9893",
              icon: (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              ),
            },
          ].map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-full text-[#a1a1aa] hover:border-white/[0.12] transition-colors text-sm"
              variants={socialVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.1,
                type: "spring" as const,
                stiffness: 300,
                damping: 20,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              {link.label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
