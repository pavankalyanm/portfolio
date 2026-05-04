"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";

const commands: Record<string, string> = {
  whoami: "Pavan K M — Software Engineer",
  help: `Available commands:
  whoami      - Who am I?
  summary     - About me
  skills      - Technical skills
  contact     - Contact info
  education   - Education background
  experience  - Work experience
  projects    - Featured projects
  github      - GitHub link
  spotify     - On Repeat playlist
  email       - Copy email to clipboard
  resume      - Download resume
  clear       - Clear terminal
  help        - Show this help`,
  summary: `Software engineer proficient in Java, Python, JavaScript, C#.
Builds automation tools (Selenium, REST, Groovy), frontend apps
(React, Angular), and Gen AI features (GPT, LLaMA, RAG).
Familiar with MLOps, AWS, MySQL, Power BI.`,
  skills: `Languages:   Java, Python, JavaScript, TypeScript, C#, Golang, C++
Frontend:    React, Angular, Vue.js, Next.js, Tailwind CSS
Automation:  Selenium, REST, Groovy, TestNG, CI/CD
Gen AI:      GPT, OpenAI API, LLaMA, RAG, Fine-tuning
MLOps:       MLflow, Model Deployment, Hugging Face
Cloud:       AWS (EC2, S3, Lambda), Docker, Kubernetes, Terraform
Data:        MySQL, PostgreSQL, Power BI, Databricks`,
  contact: `{
  "email":     "kalyanmese@gmail.com",
  "phone":     "+1 (945) 527-6194",
  "discord":   "pavankalyanm",
  "linkedin":  "in/pavankalyan-meesala",
  "instagram": "@pavankalyan.me",
  "github":    "github.com/pavankalyanm"
}`,
  education: `MS in Information Technology — UT Dallas (2023–2025)
B.Tech in Computer Science — JNTU (2018–2021)
Diploma in Computer Engineering — (2015–2018)`,
  experience: `► Uniian — Software Engineer | San Francisco (Remote) | May 2025–Present
  Automation, Gen AI, MLOps, Full-stack (Java/React)

► IBM — Software Engineer | Hyderabad, India | Aug 2021–Jun 2023
  Test automation, Angular/React, AWS infrastructure`,
  projects: `► ChessIQ — Gen AI chess coaching platform (GPT + LLaMA, 500+ users)
► Drone Flight Path Optimizer — ML model with MLOps lifecycle`,
  github: "→ https://github.com/pavankalyanm",
  spotify: `♪ On Repeat — pavan's playlist
→ https://open.spotify.com/playlist/3RMOIziTyLVtyl0o8KkCsf`,
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  pwd: "/home/pavan/portfolio",
  ls: "about.md  projects.ts  experience.json  skills.md  contact.sh  resume.pdf",
  neofetch: `        .--.         pavan@portfolio
       |o_o |        ─────────────────
       |:_/ |        OS: macOS (portfolio)
      //   \\ \\       Shell: zsh
     (|     | )      Role: Software Engineer
    /'\\_   _/\`\\      Languages: Java, Python, JS, TS
    \\___)=(___/      Editor: Cursor`,
};

interface TermLine {
  type: "input" | "output";
  text: string;
}

interface TerminalProps {
  onClose?: () => void;
}

export default function Terminal({ onClose }: TerminalProps) {
  const [lines, setLines] = useState<TermLine[]>([
    { type: "output", text: "Welcome to Pavan's portfolio terminal. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Pavan_KM_Resume.pdf";
    a.click();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TermLine[] = [...lines, { type: "input", text: cmd.trim() }];

    if (trimmed === "clear") {
      setLines([]);
      setInput("");
      setHistory((h) => [cmd.trim(), ...h]);
      setHistoryIdx(-1);
      return;
    }

    if (trimmed === "email") {
      navigator.clipboard.writeText("kalyanmese@gmail.com");
      newLines.push({ type: "output", text: "✓ Email copied to clipboard: kalyanmese@gmail.com" });
    } else if (trimmed === "resume") {
      downloadResume();
      newLines.push({ type: "output", text: "✓ Downloading resume..." });
    } else if (trimmed === "") {
      // empty
    } else if (commands[trimmed]) {
      newLines.push({ type: "output", text: commands[trimmed] });
    } else {
      newLines.push({
        type: "output",
        text: `zsh: command not found: ${cmd.trim()}\nType 'help' for available commands.`,
      });
    }

    setLines(newLines);
    if (cmd.trim()) {
      setHistory((h) => [cmd.trim(), ...h]);
    }
    setHistoryIdx(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const Prompt = () => (
    <>
      <span className="text-green">pavan@portfolio</span>
      <span className="text-text-muted">:</span>
      <span className="text-blue">~</span>
      <span className="text-text-muted">$ </span>
    </>
  );

  return (
    <div
      className="h-full flex flex-col bg-[#1b1b1b] cursor-text font-mono text-[13px] select-text"
      onClick={(e) => {
        const sel = window.getSelection?.();
        if (sel && sel.toString().length > 0) return;
        inputRef.current?.focus();
      }}
    >
      {/* Terminal tab bar */}
      <div className="flex items-center justify-between px-3 py-0 bg-[#252526] border-b border-border shrink-0 h-[30px]">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-text-bright uppercase tracking-wide cursor-pointer border-b border-accent pb-[5px]">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-text-dim px-1.5 py-0.5 bg-[#1e1e1e] rounded-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            zsh
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onClose?.(); }}
            className="text-text-muted hover:text-text p-0.5 cursor-pointer"
            title="Close Terminal"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      {/* Terminal content + Spotify side panel */}
      <div className="flex-1 flex min-h-0">
        <div
          ref={terminalRef}
          className="flex-1 p-3 overflow-y-auto space-y-0.5 min-w-0"
        >
          {lines.map((line, i) =>
            line.type === "input" ? (
              <p key={i}>
                <Prompt />
                <span className="text-text">{line.text}</span>
              </p>
            ) : (
              <pre key={i} className="text-text-dim whitespace-pre-wrap mb-0.5">
                {line.text}
              </pre>
            )
          )}
          <div className="flex items-center">
            <Prompt />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-text outline-none border-none caret-text font-mono text-[13px] p-0 m-0"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
            />
          </div>
        </div>
        {/* Spotify mini-player — pinned right, hidden on mobile */}
        <aside
          className="hidden md:flex shrink-0 w-[300px] border-l border-border bg-[#181818] p-2.5 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            title="Spotify playlist"
            data-testid="embed-iframe"
            src="https://open.spotify.com/embed/playlist/3RMOIziTyLVtyl0o8KkCsf?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder={0}
            allowFullScreen
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ borderRadius: 12, display: "block" }}
          />
        </aside>
      </div>
    </div>
  );
}
