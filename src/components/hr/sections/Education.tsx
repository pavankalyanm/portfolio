"use client";

const education = [
  {
    degree: "MS in Information Technology",
    school: "University of Texas, Dallas",
    period: "2023 – 2025",
  },
  {
    degree: "B.Tech in Computer Science",
    school: "JNTU",
    period: "2018 – 2021",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "State Board of Technical Education",
    period: "2015 – 2018",
  },
];

export default function EducationSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Education</h2>
        <p className="text-gray-400 mb-10">Academic background</p>

        <div className="grid gap-4 sm:grid-cols-3">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {edu.degree}
              </h3>
              <p className="text-sm text-purple-600 mb-1">{edu.school}</p>
              <p className="text-xs text-gray-400">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
