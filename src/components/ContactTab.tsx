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
    <div className="animate-fade-in space-y-6 max-w-2xl">
      <p className="text-comment text-[13px]">{"// contact.sh"}</p>

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

      {/* Social links */}
      <div className="space-y-2">
        <p className="text-comment text-[13px]">{"// links"}</p>
        <div className="grid gap-2 sm:grid-cols-2">
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
            href="tel:+17374291092"
            className="flex items-center gap-3 p-3 rounded border border-border bg-surface hover:bg-surface-hover transition-colors"
          >
            <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <div>
              <p className="text-text text-[12px] font-mono">(737) 429-1092</p>
              <p className="text-text-muted text-[10px]">Phone</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
