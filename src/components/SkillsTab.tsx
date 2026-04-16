"use client";

const skillGroups = [
  {
    category: "Languages",
    color: "text-blue border-blue/25 bg-blue/8",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C#", ".NET", "Golang", "C++", "Groovy", "Ruby", "HTML", "SQL", "Bash"],
  },
  {
    category: "Frameworks & Frontend",
    color: "text-green border-green/25 bg-green/8",
    skills: ["React", "Angular", "Vue.js", "Next.js", "Tailwind CSS", "a11y"],
  },
  {
    category: "Automation & Testing",
    color: "text-yellow border-yellow/25 bg-yellow/8",
    skills: ["Selenium", "REST", "Groovy", "TestNG", "Maven", "Gradle", "CI/CD", "Unit Testing", "Integration Testing", "Regression Testing"],
  },
  {
    category: "Gen AI & LLMs",
    color: "text-accent border-accent/25 bg-accent/8",
    skills: ["GPT", "OpenAI API", "GitHub Copilot", "Gemini", "LLaMA", "Fine-tuning", "RAG Pipelines", "Prompt Engineering"],
  },
  {
    category: "MLOps",
    color: "text-pink border-pink/25 bg-pink/8",
    skills: ["MLflow", "Model Deployment", "Experiment Tracking", "Hugging Face"],
  },
  {
    category: "Cloud & Data",
    color: "text-cyan border-cyan/25 bg-cyan/8",
    skills: ["AWS EC2", "AWS S3", "AWS Lambda", "MySQL", "PostgreSQL", "Power BI", "Databricks", "Docker", "Kubernetes", "Terraform"],
  },
  {
    category: "Practices",
    color: "text-orange border-orange/25 bg-orange/8",
    skills: ["Git", "Agile/Scrum", "SDLC", "Technical Documentation", "Defect Tracking", "Root Cause Analysis"],
  },
];

export default function SkillsTab() {
  return (
    <div className="animate-fade-in space-y-5 max-w-3xl">
      <p className="text-comment text-[13px]">{"// skills.md"}</p>

      {skillGroups.map((group) => (
        <div key={group.category}>
          <h3 className="text-[13px] font-mono text-text-dim mb-2 flex items-center gap-2">
            <span className="text-keyword">#</span> {group.category}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all hover:brightness-125 ${group.color}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
