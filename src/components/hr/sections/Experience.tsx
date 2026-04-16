"use client";

const jobs = [
  {
    company: "Uniian",
    role: "Software Engineer",
    location: "San Francisco (Remote)",
    period: "May 2025 – Present",
    bullets: [
      <>Built automation utilities, reduced manual QA by <span className="text-purple-600 font-semibold">50%</span></>,
      <>Full-stack features in Java, React, JavaScript</>,
      <>Integrated GPT and LLaMA via OpenAI API for Gen AI analytics</>,
      <>MLOps: MLflow tracking, model monitoring, automated retraining</>,
      <>Code reviews reduced post-release defect rate by <span className="text-purple-600 font-semibold">40%</span></>,
      <>Built Power BI dashboards for business self-serve analytics</>,
    ],
  },
  {
    company: "IBM",
    role: "Software Engineer",
    location: "Hyderabad, India",
    period: "Aug 2021 – Jun 2023",
    bullets: [
      <>Selenium + Java automation, test coverage <span className="text-purple-600 font-semibold">45% → 87%</span></>,
      <>Frontend features in Angular and React with REST API integrations</>,
      <>Applied unit, integration, regression testing; quality gates before every release</>,
      <>AWS EC2, S3, Lambda + MySQL for cloud infrastructure</>,
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Where I&apos;ve Worked</h2>
        <p className="text-gray-400 mb-10">Career timeline, newest first</p>

        <div className="space-y-8">
          {jobs.map((job) => (
            <div
              key={job.company}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
                      <p className="text-purple-600 text-sm">{job.role}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                    {job.period}
                  </span>
                  <p className="text-gray-400 text-xs mt-1">{job.location}</p>
                </div>
              </div>
              <ul className="space-y-2 ml-[52px]">
                {job.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                    <span className="text-purple-400 mt-0.5 shrink-0">&#8226;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
