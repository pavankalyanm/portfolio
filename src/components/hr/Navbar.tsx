"use client";

import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onSwitchMode: () => void;
}

export default function Navbar({ onSwitchMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div>
          <span className="text-lg font-bold text-gray-900">Pavan K M</span>
          <span className="hidden sm:inline text-sm text-gray-400 ml-2">Software Engineer</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onSwitchMode}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-1 cursor-pointer"
            title="Switch to Dev Mode"
          >
            <span className="font-mono">&lt;/&gt;</span> Dev
          </button>
          <a
            href="/resume.pdf"
            download="Pavan_KM_Resume.pdf"
            className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-600 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-gray-600 hover:text-gray-900 py-1"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onSwitchMode(); setMenuOpen(false); }}
            className="block text-sm text-gray-400 hover:text-gray-900 py-1 cursor-pointer"
          >
            <span className="font-mono">&lt;/&gt;</span> Dev Mode
          </button>
          <a
            href="/resume.pdf"
            download="Pavan_KM_Resume.pdf"
            className="inline-block px-4 py-2 bg-purple-600 text-white text-sm rounded-lg"
          >
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
