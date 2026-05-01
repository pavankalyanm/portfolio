"use client";

import { useState, useEffect } from "react";
import { motion, LayoutGroup } from "framer-motion";
import EntryGate from "@/components/EntryGate";
import DevMode from "@/components/dev/DevMode";
import HRMode from "@/components/hr/HRMode";

type Mode = "dev" | "hr" | null;

export default function Home() {
  const [mode, setMode] = useState<Mode>(null);
  const [showGate, setShowGate] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolioMode") as Mode;
    if (saved === "dev" || saved === "hr") {
      setMode(saved);
    } else {
      setShowGate(true);
    }
    setReady(true);
  }, []);

  const selectMode = (m: "dev" | "hr") => {
    localStorage.setItem("portfolioMode", m);
    setMode(m);
    setShowGate(false);
  };

  const switchMode = () => {
    const next = mode === "dev" ? "hr" : "dev";
    localStorage.setItem("portfolioMode", next);
    setMode(next);
  };

  const resetGate = () => {
    setShowGate(true);
  };

  // Don't render until we've checked localStorage to avoid flash
  if (!ready) return null;

  return (
    <>
      {showGate && <EntryGate onSelect={selectMode} />}
      {mode && (
        <div className={`relative h-full transition-opacity duration-300 ${showGate ? "opacity-0" : "opacity-100"}`}>
          {mode === "dev" ? (
            <DevMode onSwitchMode={switchMode} />
          ) : (
            <HRMode onSwitchMode={resetGate} />
          )}
          {!showGate && (
            <motion.div
              className="fixed z-50"
              initial={false}
              animate={
                mode === "dev"
                  ? { top: 4, right: 12, y: 0 }
                  : { top: "50%", right: 8, y: "-50%" }
              }
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <ModeSwitcher
                mode={mode}
                orientation={mode === "dev" ? "horizontal" : "vertical"}
                onSelect={(m) => m !== mode && switchMode()}
              />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

function ModeSwitcher({
  mode,
  orientation,
  onSelect,
}: {
  mode: "dev" | "hr";
  orientation: "horizontal" | "vertical";
  onSelect: (m: "dev" | "hr") => void;
}) {
  const tabs: { id: "dev" | "hr"; label: string }[] = [
    { id: "dev", label: "Dev" },
    { id: "hr", label: "HR" },
  ];
  const isVertical = orientation === "vertical";
  return (
    <LayoutGroup id="mode-switcher">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className={`flex ${
          isVertical ? "flex-col items-stretch" : "flex-row items-center"
        } gap-0.5 rounded-md p-0.5 ${
          mode === "dev"
            ? "bg-[#252526] border border-[#3c3c3c] shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            : "rounded-full bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_4px_12px_rgba(16,24,40,0.05)]"
        }`}
      >
        {tabs.map((t) => {
          const active = t.id === mode;
          return (
            <motion.button
              layout
              key={t.id}
              onClick={() => onSelect(t.id)}
              aria-pressed={active}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className={`relative font-mono text-[11px] tracking-[-0.005em] transition-colors duration-200 ${
                mode === "dev"
                  ? `px-2.5 py-0.5 rounded-sm ${
                      active
                        ? "bg-[#0e639c] text-white"
                        : "text-[#cccccc] hover:bg-[#2a2d2e] hover:text-white"
                    }`
                  : `px-3 py-1.5 rounded-full font-semibold ${
                      active
                        ? "bg-[#1d1d1f] text-white shadow-[0_1px_2px_rgba(16,24,40,0.12)]"
                        : "text-[#6e6e73] hover:text-[#1d1d1f]"
                    }`
              }`}
            >
              {t.label}
            </motion.button>
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
