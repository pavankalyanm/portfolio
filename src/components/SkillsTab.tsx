"use client";

const skillGroups = [
  {
    category: "Languages",
    color: "text-blue border-blue/25 bg-blue/8",
    skills: ["JavaScript", "Java", "SQL", "HTML5"],
  },
  {
    category: "Frameworks & Runtimes",
    color: "text-green border-green/25 bg-green/8",
    skills: ["React", "Node.js"],
  },
  {
    category: "Cloud",
    color: "text-cyan border-cyan/25 bg-cyan/8",
    skills: ["AWS", "GCP", "Azure"],
  },
  {
    category: "Gen AI & LLMs",
    color: "text-accent border-accent/25 bg-accent/8",
    skills: ["LLM", "Gen AI", "Claude", "Prompt Engineering"],
  },
  {
    category: "Data & Streaming",
    color: "text-pink border-pink/25 bg-pink/8",
    skills: ["Apache", "Kafka", "MongoDB"],
  },
  {
    category: "DevOps & Tools",
    color: "text-yellow border-yellow/25 bg-yellow/8",
    skills: ["Docker", "Kubernetes", "GitHub", "Notion"],
  },
  {
    category: "Practices",
    color: "text-orange border-orange/25 bg-orange/8",
    skills: ["Product Management", "System Design"],
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
