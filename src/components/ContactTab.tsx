"use client";

import { useState, FormEvent } from "react";

export default function ContactTab() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.open(
      `mailto:kalyanmese@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("kalyanmese@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-4 max-w-6xl">
      <p className="text-comment text-[13px]">{"// contact.sh"}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] lg:items-start">
      {/* Terminal-style form */}
      <div className="rounded border border-border bg-[#1b1b1b] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border-b border-border">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-[11px] text-text-dim px-2 py-0.5 bg-[#1e1e1e] rounded-sm border-b border-accent">
            contact.sh
          </span>
        </div>
        <form onSubmit={handleSubmit} className="p-4 font-mono text-[13px] space-y-3">
          <div>
            <label className="text-green text-[11px]">
              <span className="text-text-dim">$ </span>echo $NAME
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="mt-1 w-full bg-[#1e1e1e] border border-border rounded px-3 py-1.5 text-text text-[13px] placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-green text-[11px]">
              <span className="text-text-dim">$ </span>echo $EMAIL
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="mt-1 w-full bg-[#1e1e1e] border border-border rounded px-3 py-1.5 text-text text-[13px] placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-green text-[11px]">
              <span className="text-text-dim">$ </span>cat message.txt
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message..."
              className="mt-1 w-full bg-[#1e1e1e] border border-border rounded px-3 py-1.5 text-text text-[13px] placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 rounded bg-accent hover:bg-accent-dim text-white text-[12px] font-mono transition-colors cursor-pointer"
          >
            {submitted ? "✓ Opening mail client..." : "$ send_message"}
          </button>
        </form>
      </div>

      {/* Vertical divider — merge-editor style */}
      <div className="hidden lg:block h-full w-px bg-border" aria-hidden />

      {/* Social links */}
      <div className="space-y-2">
        <p className="text-comment text-[13px]">{"// links"}</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <button
            onClick={copyEmail}
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors text-left cursor-pointer"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">
                {copied ? "Copied!" : "kalyanmese@gmail.com"}
              </p>
              <p className="text-text-muted text-[10px]">Click to copy</p>
            </div>
          </button>
          <a
            href="https://github.com/pavankalyanm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">github.com/pavankalyanm</p>
              <p className="text-text-muted text-[10px]">GitHub Profile</p>
            </div>
          </a>
          <a
            href="tel:+19455276194"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">+1 (945) 527-6194</p>
              <p className="text-text-muted text-[10px]">Phone</p>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/pavankalyan-meesala/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">in/pavankalyan-meesala</p>
              <p className="text-text-muted text-[10px]">LinkedIn</p>
            </div>
          </a>
          <a
            href="https://discord.com/users/pavankalyanm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">pavankalyanm</p>
              <p className="text-text-muted text-[10px]">Discord</p>
            </div>
          </a>
          <a
            href="https://instagram.com/pavankalyan.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">@pavankalyan.me</p>
              <p className="text-text-muted text-[10px]">Instagram</p>
            </div>
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}
