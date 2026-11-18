"use client";

import React, { useState, useRef, useEffect } from "react";

interface TerminalEntry {
  id: string;
  type: "system" | "command";
  command?: string;
  output?: string;
}

const COMMAND_DATA: Record<string, string> = {
  help: `Available commands:

  whoami           Personal & academic info
  skills           Languages, frameworks, domains
  experience       Internships & roles
  projects         Selected builds
  certifications   Professional credentials
  contact          Reach out
  clear            Clear terminal
  help             Show this list`,

  whoami: `ALLAN K. J (ID: URK25CS6018)
B.Tech CSE (Cybersecurity) @ Karunya Institute of Technology and Sciences
Coimbatore, India | Expected May 2029 | CGPA: 7.06 / 10`,

  skills: `Languages : Python, C, Java, TypeScript, HTML, CSS, JavaScript
Tools/APIs: ElevenLabs API, Groq API, Antigravity, Docker, Git, VS Code
Domains   : Cybersecurity, System Design, IoT, Linux System Administration`,

  experience: `1. ZF Group — IT Security & Networking Intern (Jun 2 – Jul 3, 2026 | Coimbatore)
2. Conesta Forge — 5-Day AI Build Sprint, #33 Leaderboard / Score 1,391 (Jun 21 – 26, 2026)
3. Qaroo — Software Intern, Full-Stack & API Integration (Jun 1 – 20, 2026)`,

  projects: `1. SIH 2026 (PS 26160)   -> https://sih-2026-frontend-eight.vercel.app
2. 3D Interactive Site   -> https://allan-portfolioo.vercel.app
3. Student LMS Platform  -> https://student-lms-vds8.onrender.com/
4. GHOST Voice Assistant -> Desktop AI assistant for WhatsApp & browser automation
5. 3D Education Website  -> Interactive book-geometry learning platform`,

  certifications: `- Red Hat System Administration I (RH124 v10)
- Oracle Java Foundations (1Z0-811)
- Cisco Intro to IoT & Digital Transformation
- EC-Council Cybersecurity Workshop (1 CPE)
- AIORI-3 Internet Measurements Workshop (MeitY / NIXI & APNIC)
- NPTEL Privacy & Security in Online Social Media (67%)`,

  contact: `Email   : allan22kj@gmail.com
Phone   : +91 93614 09760
GitHub  : github.com/ALLAN-KJ
LinkedIn: linkedin.com/in/allan-k-j-21389838a`,
};

export default function HeroTerminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "initial-welcome",
      type: "system",
      output: "Welcome to allan@portfolio\nType `help` to see available commands.",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number | null>(null);
  const draftRef = useRef("");

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever entries update
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [entries]);

  const handleTerminalClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName.toLowerCase() !== "a") {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = inputVal;
      const trimmed = raw.trim();

      if (trimmed === "") {
        setEntries((prev) => [
          ...prev,
          {
            id: `empty-${Date.now()}-${Math.random()}`,
            type: "command",
            command: "",
            output: "",
          },
        ]);
        setInputVal("");
        setHistoryPointer(null);
        return;
      }

      // Add to command history
      setCmdHistory((prev) => [...prev, raw]);
      setHistoryPointer(null);

      if (trimmed.toLowerCase() === "clear") {
        setEntries([]);
        setInputVal("");
        return;
      }

      const match = COMMAND_DATA[trimmed.toLowerCase()];
      const output =
        match !== undefined
          ? match
          : `bash: ${trimmed}: command not found. Type 'help' for available commands.`;

      setEntries((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}-${Math.random()}`,
          type: "command",
          command: raw,
          output,
        },
      ]);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;

      if (historyPointer === null) {
        draftRef.current = inputVal;
        const newIdx = cmdHistory.length - 1;
        setHistoryPointer(newIdx);
        setInputVal(cmdHistory[newIdx]);
      } else if (historyPointer > 0) {
        const newIdx = historyPointer - 1;
        setHistoryPointer(newIdx);
        setInputVal(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === null) return;

      if (historyPointer < cmdHistory.length - 1) {
        const newIdx = historyPointer + 1;
        setHistoryPointer(newIdx);
        setInputVal(cmdHistory[newIdx]);
      } else {
        setHistoryPointer(null);
        setInputVal(draftRef.current);
      }
    }
  };

  const renderTextWithLinks = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const parts = line.split(urlRegex);

      return (
        <div key={i} className="min-h-[1.4em] whitespace-pre-wrap text-left">
          {parts.map((part, j) => {
            if (part.match(urlRegex)) {
              return (
                <a
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#60A5FA] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
        </div>
      );
    });
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full max-w-[540px] h-[420px] bg-[#0D1017] border border-[#1E232E] rounded-xl shadow-2xl flex flex-col overflow-hidden font-mono text-[12px] sm:text-[13.5px] leading-relaxed text-left cursor-text"
    >
      {/* Top Title Bar */}
      <div className="bg-[#161922] border-b border-[#1E232E] px-4 py-2.5 flex items-center justify-between select-none">
        {/* Left: Traffic light dots */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
        </div>
        {/* Right: Window title */}
        <div className="text-[11px] sm:text-xs text-[#6B7280] tracking-tight truncate pl-2">
          allan@portfolio — bash — 80×24
        </div>
      </div>

      {/* Body & Output Area */}
      <div
        ref={terminalBodyRef}
        data-lenis-prevent
        className="flex-1 p-4 sm:p-5 overflow-y-auto text-[#E5E7EB] space-y-3 text-left"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1 text-left">
            {entry.type === "command" && (
              <div className="flex items-center gap-2 text-left">
                <span className="text-[#3B82F6] select-none font-bold">➜</span>
                <span className="text-[#60A5FA]">
                  ~{entry.command ? ` ${entry.command}` : ""}
                </span>
              </div>
            )}
            {entry.output && (
              <div className="whitespace-pre-wrap font-mono text-left">
                {renderTextWithLinks(entry.output)}
              </div>
            )}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 pt-1 text-left">
          <span className="text-[#22C55E] select-none font-bold">➜</span>
          <span className="text-[#60A5FA] select-none">~</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-[#E5E7EB] caret-[#E5E7EB] outline-none bg-transparent flex-1 font-mono text-[12px] sm:text-[13.5px] p-0 m-0 border-none shadow-none ring-0 focus:ring-0 text-left"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
