"use client";

import { useState } from "react";
import AboutTab from "@/components/AboutTab";
import ProjectsTab from "@/components/ProjectsTab";
import ExperienceTab from "@/components/ExperienceTab";
import SkillsTab from "@/components/SkillsTab";
import ContactTab from "@/components/ContactTab";
import Terminal from "@/components/Terminal";

type TabId = "about" | "projects" | "experience" | "skills" | "contact";

interface Tab {
  id: TabId;
  label: string;
  ext: string;
  icon: React.ReactNode;
}

const mdIcon = (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="2" width="14" height="12" rx="1" stroke="#569cd6" strokeWidth="1.2" />
    <path d="M3.5 10V6l2 2.5L7.5 6v4M9.5 6v4l1.5-2 1.5 2V6" stroke="#569cd6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const tsIcon = (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#3178c6" />
    <text x="8" y="12" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="monospace">TS</text>
  </svg>
);
const jsonIcon = (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#f5c518" opacity="0.15" />
    <text x="8" y="12" textAnchor="middle" fill="#f5c518" fontSize="7" fontWeight="bold" fontFamily="monospace">{"{}"}</text>
  </svg>
);
const shIcon = (
  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="14" rx="2" fill="#4ec9b0" opacity="0.15" />
    <text x="8" y="12" textAnchor="middle" fill="#4ec9b0" fontSize="7" fontWeight="bold" fontFamily="monospace">$_</text>
  </svg>
);

const tabs: Tab[] = [
  { id: "about", label: "about", ext: ".md", icon: mdIcon },
  { id: "projects", label: "projects", ext: ".ts", icon: tsIcon },
  { id: "experience", label: "experience", ext: ".json", icon: jsonIcon },
  { id: "skills", label: "skills", ext: ".md", icon: mdIcon },
  { id: "contact", label: "contact", ext: ".sh", icon: shIcon },
];

const sidebarFiles: { name: string; tab: TabId; icon: React.ReactNode }[] = [
  { name: "about.md", tab: "about", icon: mdIcon },
  { name: "projects.ts", tab: "projects", icon: tsIcon },
  { name: "experience.json", tab: "experience", icon: jsonIcon },
  { name: "skills.md", tab: "skills", icon: mdIcon },
  { name: "contact.sh", tab: "contact", icon: shIcon },
];

const tabContent: Record<TabId, React.ReactNode> = {
  about: <AboutTab />,
  projects: <ProjectsTab />,
  experience: <ExperienceTab />,
  skills: <SkillsTab />,
  contact: <ContactTab />,
};

const breadcrumbMap: Record<TabId, string[]> = {
  about: ["portfolio", "src", "about.md"],
  projects: ["portfolio", "src", "projects.ts"],
  experience: ["portfolio", "src", "experience.json"],
  skills: ["portfolio", "src", "skills.md"],
  contact: ["portfolio", "src", "contact.sh"],
};

const timelineEntries = [
  { label: "KeyChainN", sub: "Chief Technology Officer", period: "2025–Present", color: "bg-accent", type: "job" },
  { label: "Evergreen", sub: "Software Engineer Intern", period: "Jan–May 2025", color: "bg-blue", type: "job" },
  { label: "UT Dallas", sub: "MS in Info Technology and Management", period: "2023–2025", color: "bg-cyan", type: "edu" },
  { label: "Syniti", sub: "Software Engineer", period: "2022–2023", color: "bg-blue", type: "job" },
  { label: "Nerds & Geeks", sub: "Software Engineer", period: "2021–2022", color: "bg-blue", type: "job" },
  { label: "JNTUA College of Engineering", sub: "BTech in Computer Science", period: "2018–2021", color: "bg-yellow", type: "edu" },
  { label: "S.V Govt Polytechnic", sub: "Diploma in Computer Science", period: "2015–2018", color: "bg-orange", type: "edu" },
];

interface DevModeProps {
  onSwitchMode: () => void;
}

export default function DevMode({ onSwitchMode }: DevModeProps) {
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [timelineOpen, setTimelineOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [closedTabs, setClosedTabs] = useState<Set<TabId>>(new Set());
  const [rolesOpen, setRolesOpen] = useState(false);

  const visibleTabs = tabs.filter((t) => !closedTabs.has(t.id));

  const closeTab = (id: TabId, e: React.MouseEvent) => {
    e.stopPropagation();
    if (visibleTabs.length <= 1) return;
    const next = new Set(closedTabs);
    next.add(id);
    setClosedTabs(next);
    if (activeTab === id) {
      const remaining = tabs.filter((t) => !next.has(t.id));
      setActiveTab(remaining[0]?.id ?? "about");
    }
  };

  const openTab = (id: TabId) => {
    const next = new Set(closedTabs);
    next.delete(id);
    setClosedTabs(next);
    setActiveTab(id);
  };

  return (
    <div className="h-full flex flex-col bg-bg font-mono text-text select-none dev-scrollbar overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center h-9 bg-titlebar border-b border-border shrink-0 relative"
        style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
      >
        <button
          className="md:hidden ml-2 text-text-dim hover:text-text p-1 cursor-pointer z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className="hidden md:flex items-center gap-2 ml-3 z-10">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-90 transition-all" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-90 transition-all" />
        </div>
        <div className="absolute inset-0 flex items-center justify-start pl-12 md:justify-center md:pl-0 pointer-events-none">
          <span className="text-[11px] text-text-dim truncate max-w-[55%] md:max-w-none">
            {tabs.find((t) => t.id === activeTab)?.label}{tabs.find((t) => t.id === activeTab)?.ext}
            <span className="text-text-muted"> — portfolio</span>
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1 z-10 mr-[120px]">
          <a
            href="/resume.pdf"
            download="Pavan_KM_Resume.pdf"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] text-text-dim hover:text-text hover:bg-surface-hover transition-colors"
            title="Download Resume"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Activity Bar */}
        <div className="hidden md:flex flex-col items-center w-12 bg-activitybar border-r border-border shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`relative w-full flex justify-center py-3 transition-colors cursor-pointer ${sidebarOpen ? "text-text-bright" : "text-text-muted hover:text-text"}`}
            title="Explorer"
          >
            {sidebarOpen && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-text-bright" />}
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
              <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
          </button>
          <button onClick={() => openTab("skills")} className="w-full flex justify-center py-3 text-text-muted hover:text-text transition-colors cursor-pointer" title="Search">
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button onClick={() => openTab("projects")} className="w-full flex justify-center py-3 text-text-muted hover:text-text transition-colors cursor-pointer relative" title="Source Control">
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
              <circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><circle cx="6" cy="18" r="2" /><path d="M6 8v8M18 16V9a3 3 0 00-3-3H9" />
            </svg>
            <span className="absolute top-2 right-2 w-4 h-4 bg-badge text-white text-[9px] font-bold rounded-full flex items-center justify-center">5</span>
          </button>
          <button onClick={() => openTab("experience")} className="w-full flex justify-center py-3 text-text-muted hover:text-text transition-colors cursor-pointer" title="Extensions">
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
          </button>
          <div className="mt-auto flex flex-col items-center w-full">
            <a href="https://github.com/pavankalyanm" target="_blank" rel="noopener noreferrer" className="w-full flex justify-center py-3 text-text-muted hover:text-text transition-colors" title="GitHub">
              <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            </a>
            <button onClick={() => openTab("contact")} className="w-full flex justify-center py-3 text-text-muted hover:text-text transition-colors cursor-pointer" title="Settings">
              <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="hidden md:flex flex-col w-60 bg-sidebar border-r border-border shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-2">
              <span className="text-[11px] font-medium tracking-wide text-text-dim uppercase">Explorer</span>
              <button className="text-text-muted hover:text-text p-0.5 cursor-pointer" title="New File">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button onClick={() => setExplorerOpen(!explorerOpen)}
              className="flex items-center gap-1 px-3 py-[3px] text-[11px] font-bold text-text-dim hover:bg-surface-hover transition-colors w-full text-left cursor-pointer uppercase tracking-wide bg-[#ffffff06]"
            >
              <svg className={`w-3 h-3 transition-transform shrink-0 ${explorerOpen ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              portfolio
            </button>
            {explorerOpen && (
              <div className="animate-slide-in">
                <div className="flex items-center gap-1 pl-5 pr-3 py-[2px] text-[12px] text-text-dim">
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <svg className="w-4 h-4 shrink-0 text-[#dcb67a]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
                  </svg>
                  <span>src</span>
                </div>
                {sidebarFiles.map((file) => (
                  <button key={file.name} onClick={() => openTab(file.tab)}
                    className={`flex items-center gap-2 w-full pl-10 pr-3 py-[2px] text-[12px] transition-colors cursor-pointer ${
                      activeTab === file.tab ? "bg-[#37373d] text-text-bright" : "text-text-dim hover:bg-surface-hover hover:text-text"
                    }`}
                  >
                    {file.icon}
                    <span>{file.name}</span>
                  </button>
                ))}
              </div>
            )}
            <button className="flex items-center gap-1 px-3 py-[3px] mt-1 text-[11px] font-bold text-text-dim hover:bg-surface-hover transition-colors w-full text-left cursor-pointer uppercase tracking-wide bg-[#ffffff06]">
              <svg className="w-3 h-3 shrink-0 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Outline
            </button>
            <button onClick={() => setTimelineOpen(!timelineOpen)}
              className="flex items-center gap-1 px-3 py-[3px] text-[11px] font-bold text-text-dim hover:bg-surface-hover transition-colors w-full text-left cursor-pointer uppercase tracking-wide bg-[#ffffff06]"
            >
              <svg className={`w-3 h-3 shrink-0 transition-transform ${timelineOpen ? "" : "-rotate-90"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              Timeline
            </button>
            {timelineOpen && (
              <div className="animate-slide-in pl-4 pr-2 pb-2">
                <div className="relative border-l border-border ml-2 mt-1 space-y-0">
                  <div className="relative pl-4 py-1">
                    <div className="absolute -left-[4px] top-[8px] w-[7px] h-[7px] rounded-full bg-green ring-2 ring-sidebar animate-pulse" />
                    <p className="text-[10px] text-green font-mono">Now</p>
                  </div>
                  {timelineEntries.map((entry, i) => (
                    <div key={i} className="relative pl-4 py-1.5 group">
                      <div className={`absolute -left-[4px] top-[10px] w-[7px] h-[7px] rounded-full ${entry.color} ring-2 ring-sidebar`} />
                      <div className="flex items-start justify-between gap-1">
                        <div className="min-w-0">
                          <p className={`text-[11px] leading-tight truncate ${entry.type === "job" ? "text-text" : "text-text-dim"}`}>
                            {entry.type === "job" ? "💼" : "🎓"} {entry.label}
                          </p>
                          <p className="text-[10px] text-text-muted truncate">{entry.sub}</p>
                        </div>
                      </div>
                      <p className="text-[9px] text-text-muted font-mono mt-0.5">{entry.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-64 h-full bg-sidebar border-r border-border overflow-y-auto">
              <div className="px-4 py-3 text-[11px] font-medium tracking-wide text-text-dim uppercase border-b border-border">Explorer</div>
              {sidebarFiles.map((file) => (
                <button key={file.name} onClick={() => { openTab(file.tab); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-2 w-full px-4 py-2.5 text-[13px] border-b border-border/50 transition-colors cursor-pointer ${
                    activeTab === file.tab ? "bg-surface-active text-text-bright" : "text-text-dim hover:bg-surface-hover hover:text-text"
                  }`}
                >
                  {file.icon}
                  <span>{file.name}</span>
                </button>
              ))}
              <div className="px-4 py-3 border-t border-border">
                <p className="text-[10px] text-text-muted uppercase tracking-wide mb-2 font-bold">Timeline</p>
                {timelineEntries.map((entry, i) => (
                  <div key={i} className="py-1 text-[12px]">
                    <span className="text-text-dim">{entry.type === "job" ? "💼" : "🎓"} {entry.label}</span>
                    <span className="text-text-muted text-[10px] ml-1">{entry.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Editor + Terminal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-end bg-tab-inactive border-b border-border overflow-x-auto shrink-0">
            {visibleTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-1.5 h-[35px] px-3 text-[12px] whitespace-nowrap transition-colors cursor-pointer relative ${
                  activeTab === tab.id ? "bg-tab-active text-text-bright" : "bg-tab-inactive text-text-dim hover:bg-surface-hover"
                }`}
              >
                {activeTab === tab.id && <div className="absolute top-0 left-0 right-0 h-[1px] bg-accent" />}
                {tab.icon}
                <span>{tab.label}{tab.ext}</span>
                <span onClick={(e) => closeTab(tab.id, e)}
                  className={`ml-1 w-4 h-4 flex items-center justify-center rounded-sm hover:bg-[#ffffff1a] transition-colors ${
                    activeTab === tab.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-1 px-4 py-1 bg-bg text-[11px] text-text-muted border-b border-border shrink-0">
            {breadcrumbMap[activeTab].map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                <span className={i === breadcrumbMap[activeTab].length - 1 ? "text-text-dim" : ""}>{crumb}</span>
              </span>
            ))}
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex overflow-hidden" style={terminalOpen ? { flex: "1 1 55%" } : { flex: "1 1 100%" }}>
              <div className="hidden md:flex flex-col items-end pt-4 pb-4 pl-4 pr-2 text-[12px] text-line-number select-none shrink-0 bg-bg leading-[22px]">
                {Array.from({ length: 50 }, (_, i) => (
                  <div key={i} className={`h-[22px] min-w-[2ch] text-right ${i === 0 ? "text-text-dim" : ""}`}>{i + 1}</div>
                ))}
              </div>
              <div className="flex-1 p-4 md:pl-4 md:pr-8 overflow-y-auto bg-bg">
                {tabContent[activeTab]}
              </div>
              <div className="hidden lg:block w-16 bg-bg shrink-0 border-l border-border/50 relative overflow-hidden">
                <div className="absolute inset-2 opacity-20">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="h-[3px] mb-[2px] rounded-sm"
                      style={{
                        width: `${20 + Math.random() * 60}%`,
                        marginLeft: `${Math.random() * 15}%`,
                        background: i % 7 === 0 ? "#c586c0" : i % 5 === 0 ? "#569cd6" : i % 3 === 0 ? "#4ec9b0" : "#858585",
                      }}
                    />
                  ))}
                </div>
                <div className="absolute top-0 left-0 right-0 h-20 bg-[#ffffff08] border border-[#ffffff0a]" />
              </div>
            </main>
            {terminalOpen && (
              <>
                <div className="h-[1px] bg-border shrink-0 hover:bg-accent cursor-row-resize transition-colors" />
                <div className="shrink-0" style={{ height: "35%" }}>
                  <Terminal onClose={() => setTerminalOpen(false)} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center h-[22px] bg-[#181818] text-[11px] px-2 shrink-0 justify-between border-t border-border">
        <div className="flex items-center gap-0">
          <span className="flex items-center gap-1 px-2 h-full text-white bg-accent hover:brightness-110 transition-colors cursor-pointer">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
          <span className="flex items-center gap-1 px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><circle cx="6" cy="18" r="2" /><path d="M6 8v8M18 16V9a3 3 0 00-3-3H9" />
            </svg>
            main
          </span>
          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className={`hidden sm:flex items-center gap-1 px-2 hover:bg-surface-hover cursor-pointer h-full transition-colors ${terminalOpen ? "text-accent" : "text-text-dim"}`}
            title="Toggle Terminal"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            0
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            0
          </button>
        </div>
        <div className="flex items-center gap-0">
          <span className="hidden sm:flex items-center px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">Ln 1, Col 1</span>
          <span className="hidden sm:flex items-center px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">Spaces: 2</span>
          <span className="hidden sm:flex items-center px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">UTF-8</span>
          <span className="hidden md:flex items-center px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">
            {activeTab === "projects" ? "TypeScript" : activeTab === "experience" ? "JSON" : activeTab === "contact" ? "Shell Script" : "Markdown"}
          </span>
          <div className="relative">
            <button
              onClick={() => setRolesOpen(!rolesOpen)}
              className="flex items-center gap-1 px-2 text-accent hover:bg-surface-hover cursor-pointer h-[22px] transition-colors font-medium"
              title="Roles I'm open to"
            >
              Open to roles
              <svg className={`w-2.5 h-2.5 transition-transform ${rolesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            {rolesOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRolesOpen(false)} />
                <div className="absolute bottom-full right-0 mb-1 w-64 bg-[#252526] border border-border rounded-md shadow-xl z-50 py-1.5 text-[12px] font-sans">
                  <p className="px-3 py-1 text-text-muted text-[10px] uppercase tracking-wide font-mono">Roles I&apos;m looking for</p>
                  {[
                    "Software Engineer",
                    "Full-Stack Developer",
                    "Product Engineer",
                    "Product Manager",
                    "Frontend Engineer (React/Next.js)",
                    "Backend Engineer (Java/Python)",
                    "Gen AI / ML Engineer",
                    "DevOps / Cloud Engineer",
                  ].map((role) => (
                    <div key={role} className="flex items-center gap-2 px-3 py-1.5 text-text-dim hover:bg-surface-hover hover:text-text transition-colors cursor-default">
                      <span className="text-accent">&#8250;</span>
                      <span>{role}</span>
                    </div>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1.5 text-accent hover:bg-surface-hover transition-colors w-full text-left cursor-pointer"
                      onClick={() => {
                        openTab("contact");
                        setRolesOpen(false);
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      Reach out to me
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <span className="hidden sm:flex items-center gap-1 px-2 text-text-dim hover:bg-surface-hover cursor-pointer h-full transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
