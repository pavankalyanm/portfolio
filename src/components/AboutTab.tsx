"use client";

import { useState, type ReactNode } from "react";

interface Contact {
  key: string;
  label: string;
  value: string;
  copyValue: string;
  href?: string;
  icon: ReactNode;
}

const MailGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="M3 6l9 7 9-7" />
  </svg>
);
const PhoneGlyph = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);
const DiscordGlyph = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.42 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);
const LinkedInGlyph = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramGlyph = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const GitHubGlyph = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const contacts: Contact[] = [
  { key: "email",     label: "Email",     value: "kalyanmese@gmail.com",       copyValue: "kalyanmese@gmail.com",                              href: "mailto:kalyanmese@gmail.com",                       icon: MailGlyph },
  { key: "phone",     label: "Phone",     value: "+1 (945) 527-6194",          copyValue: "+19455276194",                                      href: "tel:+19455276194",                                  icon: PhoneGlyph },
  { key: "discord",   label: "Discord",   value: "pavankalyanm",               copyValue: "pavankalyanm",                                      href: "https://discord.com/users/pavankalyanm",            icon: DiscordGlyph },
  { key: "linkedin",  label: "LinkedIn",  value: "in/pavankalyan-meesala",     copyValue: "https://www.linkedin.com/in/pavankalyan-meesala/",  href: "https://www.linkedin.com/in/pavankalyan-meesala/",  icon: LinkedInGlyph },
  { key: "instagram", label: "Instagram", value: "@pavankalyan.me",            copyValue: "@pavankalyan.me",                                   href: "https://instagram.com/pavankalyan.me",              icon: InstagramGlyph },
  { key: "github",    label: "GitHub",    value: "pavankalyanm",               copyValue: "https://github.com/pavankalyanm",                   href: "https://github.com/pavankalyanm",                   icon: GitHubGlyph },
];

const tags = [
  "Gen AI",
  "Claude",
  "GPT-4o",
  "Multi-Agent",
  "React",
  "Node.js",
  "AWS",
  "MCP",
];

export default function AboutTab() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyValue = (key: string, value: string) => {
    const write = (txt: string) => {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(txt).catch(() => fallback(txt));
      } else {
        fallback(txt);
      }
    };
    const fallback = (txt: string) => {
      try {
        const ta = document.createElement("textarea");
        ta.value = txt;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        /* swallow */
      }
    };
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
    write(value);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-3xl leading-[22px]">
      {/* Hero — styled like a code block */}
      <div className="relative rounded border border-border bg-[#1e1e1e] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(123,97,255,0.06),transparent_60%)]" />
        <div className="relative p-6">
          <p className="text-comment text-[13px]">
            {"// welcome to my portfolio"}
          </p>
          <div className="mt-3">
            <span className="text-keyword text-[13px]">const </span>
            <span className="text-light-blue text-[13px]">developer</span>
            <span className="text-text text-[13px]"> = {"{"}</span>
          </div>
          <div className="ml-6 mt-1 space-y-0.5">
            <p className="text-[13px]">
              <span className="text-light-blue">name</span>
              <span className="text-text">: </span>
              <span className="text-string">&quot;Pavan K M&quot;</span>
              <span className="text-text">,</span>
            </p>
            <p className="text-[13px]">
              <span className="text-light-blue">role</span>
              <span className="text-text">: </span>
              <span className="text-string">&quot;Software Engineer&quot;</span>
              <span className="text-text">,</span>
            </p>
            <p className="text-[13px]">
              <span className="text-light-blue">stack</span>
              <span className="text-text">: </span>
              <span className="text-string">&quot;Full Stack&quot;</span>
              <span className="text-text">,</span>
            </p>
          </div>
          <p className="text-text text-[13px] mt-0.5">{"};"}</p>

          <h1 className="text-[32px] font-bold text-text-bright mt-5 mb-1 font-sans tracking-tight">
            Pavan K M
          </h1>
          <h2 className="text-lg text-accent font-mono mb-3">
            Software Engineer
          </h2>
          <p className="text-text-dim leading-relaxed font-sans text-[14px] max-w-xl">
            Software engineer building Gen AI products end-to-end. Currently
            Co-Founder & CTO @ KeyChainN. Shipped ApplyFlow AI (GPT-4o,
            Semantic Kernel, MCP) and ClueClaude (Claude Opus + Skills).
            Comfortable across React, Node.js, Java, multi-agent
            orchestration, and AWS / GCP / Azure.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] font-mono rounded border border-border-light text-accent bg-accent-glow hover:bg-accent/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact — icon grid */}
      <div className="rounded border border-border bg-surface p-5">
        <p className="text-comment text-[13px] mb-4">{"// links"}</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {contacts.map((c) => {
            const isCopied = copiedKey === c.key;
            const isExternal = !!c.href && c.href.startsWith("http");
            const tile = (
              <div className="flex h-20 w-full items-center justify-center rounded border border-border bg-bg p-4 text-text-dim transition-all duration-300 ease-in-out group-hover:border-border-light group-hover:text-text-bright group-hover:bg-surface-hover">
                <div className="h-7 w-7 transition-transform duration-300 group-hover:scale-110">
                  {c.icon}
                </div>
              </div>
            );
            return (
              <div
                key={c.key}
                className="group relative transition-transform duration-300 ease-in-out hover:-translate-y-0.5"
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={c.label}
                  >
                    {tile}
                  </a>
                ) : (
                  tile
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copyValue(c.key, c.copyValue);
                  }}
                  aria-label={isCopied ? "Copied" : `Copy ${c.label}`}
                  title={isCopied ? "Copied!" : `Copy ${c.label}`}
                  className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-surface text-text-muted shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-150 hover:bg-surface-hover hover:text-text-bright hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
                >
                  {isCopied ? (
                    <svg className="w-2.5 h-2.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.25}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
