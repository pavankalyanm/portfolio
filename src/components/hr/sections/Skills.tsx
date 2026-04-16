"use client";

const skillGroups = [
  {
    category: "Languages",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "C#", "Golang", "C++", "SQL"],
  },
  {
    category: "Frameworks",
    color: "bg-green-50 text-green-700 border-green-200",
    skills: ["React", "Angular", "Vue.js", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Automation",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    skills: ["Selenium", "REST APIs", "TestNG", "CI/CD", "Groovy"],
  },
  {
    category: "Gen AI & ML",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    skills: ["GPT", "OpenAI API", "LLaMA", "RAG", "Fine-tuning", "Prompt Engineering"],
  },
  {
    category: "MLOps",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    skills: ["MLflow", "Model Deployment", "Hugging Face"],
  },
  {
    category: "Cloud & DevOps",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
  },
  {
    category: "Data",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    skills: ["MySQL", "PostgreSQL", "Power BI", "Databricks"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">What I Know</h2>
        <p className="text-gray-400 mb-10">Technical skills by category</p>

        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-sm rounded-lg border ${group.color} font-medium`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
