"use client";

const stats = [
  { number: "4+", label: "Years Experience" },
  { number: "2", label: "Companies" },
  { number: "25+", label: "Technologies" },
  { number: "500+", label: "Beta Users Reached" },
];

export default function AtAGlance() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100"
            >
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
