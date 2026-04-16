"use client";

const projects = [
  {
    name: "ChessIQ",
    description: "Gen AI chess coaching platform with fine-tuned GPT + LLaMA. 500+ beta users with Selenium + Python automation for E2E regression testing.",
    tech: ["Java", "Python", "React", "OpenAI API", "LLaMA", "PostgreSQL", "AWS", "Docker"],
    link: "https://github.com/pavankalyanm",
  },
  {
    name: "Drone Flight Path Optimizer",
    description: "ML model with full MLOps lifecycle — MLflow experiment tracking + monitoring. Deployed on AWS infrastructure.",
    tech: ["Python", "PyTorch", "MLflow", "AWS S3", "PostgreSQL"],
    link: "https://github.com/pavankalyanm",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What I&apos;ve Built</h2>
        <p className="text-gray-400 mb-10">Featured projects</p>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((proj) => (
            <a
              key={proj.name}
              href={proj.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all"
            >
              <div className="h-32 bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
                <span className="text-4xl font-bold text-purple-200 group-hover:text-purple-300 transition-colors">
                  {proj.name[0]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {proj.name}
                  </h3>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs bg-gray-50 text-gray-500 rounded-md border border-gray-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
