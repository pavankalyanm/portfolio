"use client";

import { useState } from "react";

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

const funFacts = [
  "Building @KeyChainN as Co-Founder & CTO. CTO hat by day, code reviews by night.",
  "Shipped ApplyFlow AI — 70% faster job apps via GPT-4o + Semantic Kernel + MCP.",
  "Cloned myself into ClueClaude. It interviews better than I do.",
  "AWS ML · TensorFlow · PyTorch certified. Still Google 'grep -r' every time.",
];

export default function AboutTab() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("kalyanmese@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              <span className="text-light-blue">location</span>
              <span className="text-text">: </span>
              <span className="text-string">&quot;San Francisco / Dallas&quot;</span>
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

      {/* Fun facts */}
      <div className="rounded border border-border bg-surface p-5">
        <p className="text-comment text-[13px] mb-3">{"// fun.json"}</p>
        <ul className="space-y-2">
          {funFacts.map((fact, i) => (
            <li
              key={i}
              className="flex gap-2 text-[13px] text-text-dim font-sans leading-relaxed"
            >
              <span className="text-accent mt-0.5 shrink-0 font-mono">
                {String(i + 1).padStart(2, "0")}.
              </span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-surface hover:bg-surface-hover text-[12px] font-mono text-text-dim hover:text-text transition-colors cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {copied ? "Copied!" : "Copy Email"}
        </button>
        <a
          href="https://github.com/pavankalyanm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded border border-border bg-surface hover:bg-surface-hover text-[12px] font-mono text-text-dim hover:text-text transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}
