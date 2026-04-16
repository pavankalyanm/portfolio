"use client";

import { useState } from "react";

interface EntryGateProps {
  onSelect: (mode: "dev" | "hr") => void;
}

export default function EntryGate({ onSelect }: EntryGateProps) {
  const [hovering, setHovering] = useState<"hr" | "dev" | null>(null);
  const [selected, setSelected] = useState<"hr" | "dev" | null>(null);

  const handleSelect = (mode: "dev" | "hr") => {
    setSelected(mode);
    setTimeout(() => onSelect(mode), 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0f0f0f] transition-opacity duration-500 ${
        selected ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[spin_20s_linear_infinite] opacity-[0.03]"
          style={{
            background: "conic-gradient(from 0deg, #7b61ff, #4fc1ff, #4ec9b0, #c586c0, #7b61ff)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl w-full">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Pavan K M
        </h1>
        <p className="text-[#888] text-base sm:text-lg mb-12" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          Software Engineer &middot; Gen AI &middot; Full-Stack
        </p>

        <p className="text-[#666] text-sm mb-8 uppercase tracking-widest" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
          How would you like to explore?
        </p>

        {/* Mode cards */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-stretch">
          {/* HR Card */}
          <button
            onClick={() => handleSelect("hr")}
            onMouseEnter={() => setHovering("hr")}
            onMouseLeave={() => setHovering(null)}
            className={`group flex-1 max-w-xs mx-auto sm:mx-0 rounded-xl border p-8 text-left transition-all duration-300 cursor-pointer ${
              hovering === "hr"
                ? "border-[#7b61ff] bg-[#7b61ff08] shadow-[0_0_30px_rgba(123,97,255,0.1)] -translate-y-1"
                : "border-[#222] bg-[#141414] hover:border-[#333]"
            }`}
          >
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              I&apos;m a Recruiter / HR
            </h3>
            <p className="text-[#666] text-sm leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Clean, visual, professional. Highlights impact &amp; experience.
            </p>
          </button>

          {/* Dev Card */}
          <button
            onClick={() => handleSelect("dev")}
            onMouseEnter={() => setHovering("dev")}
            onMouseLeave={() => setHovering(null)}
            className={`group flex-1 max-w-xs mx-auto sm:mx-0 rounded-xl border p-8 text-left transition-all duration-300 cursor-pointer ${
              hovering === "dev"
                ? "border-[#4ec9b0] bg-[#4ec9b008] shadow-[0_0_30px_rgba(78,201,176,0.1)] -translate-y-1"
                : "border-[#222] bg-[#141414] hover:border-[#333]"
            }`}
          >
            <div className="text-3xl mb-4 font-mono">&lt;/&gt;</div>
            <h3 className="text-white text-lg font-semibold mb-1" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              I&apos;m a Developer
            </h3>
            <p className="text-[#666] text-sm leading-relaxed" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Code-native, terminal UI. Full Cursor-style IDE layout.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
