"use client";

import Navbar from "./Navbar";
import Hero from "./sections/Hero";
import AtAGlance from "./sections/AtAGlance";
import ExperienceSection from "./sections/Experience";
import ProjectsSection from "./sections/Projects";
import SkillsSection from "./sections/Skills";
import GitHubSection from "./sections/GitHub";
import EducationSection from "./sections/Education";
import ContactSection from "./sections/Contact";

interface HRModeProps {
  onSwitchMode: () => void;
}

export default function HRMode({ onSwitchMode }: HRModeProps) {
  return (
    <div className="min-h-full bg-white text-gray-900" style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      <Navbar onSwitchMode={onSwitchMode} />
      <main className="overflow-y-auto h-full">
        <Hero />
        <AtAGlance />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <GitHubSection />
        <EducationSection />
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Pavan K M. Built with Next.js &amp; Tailwind CSS.
          </p>
        </footer>
      </main>
    </div>
  );
}
