"use client";

import { useState, useEffect } from "react";
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
        <div className={`h-full transition-opacity duration-300 ${showGate ? "opacity-0" : "opacity-100"}`}>
          {mode === "dev" ? (
            <DevMode onSwitchMode={switchMode} />
          ) : (
            <HRMode onSwitchMode={resetGate} />
          )}
        </div>
      )}
    </>
  );
}
