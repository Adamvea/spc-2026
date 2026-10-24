import Link from "next/link";
import RevealSection from "@/components/ui/RevealSection";

const pillars = [
  { label: "Entrepreneurship" },
  { label: "Technology" },
  { label: "AI & Innovation" },
  { label: "Business" },
  { label: "Startups" },
  { label: "Product Building" },
];

export default function Club() {
  return (
    <section id="club" className="py-24 sm:py-32 bg-[#070b18] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-accent-600/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <RevealSection>
              <div className="section-label mb-4">The Organizer</div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
                Built by Students.{" "}
                <span className="text-accent-400">For Students.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                The Entrepreneurship Club at SABIS Sharjah brings together students who
                are interested in entrepreneurship, technology, AI, business and innovation.
              </p>
              <p className="text-slate-400 leading-relaxed mb-4">
                Our goal is to make entrepreneurship practical. We want students to move
                beyond simply talking about ideas and start researching, building, testing
                and presenting them.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Through activities, workshops and competitions, we&apos;re creating
                opportunities for students to develop useful skills and gain real-world
                experience.
              </p>
            </RevealSection>

            <RevealSection delay={1}>
              <div className="mt-8 flex flex-wrap gap-2">
                {pillars.map((p) => (
                  <span
                    key={p.label}
                    className="px-3 py-1.5 rounded-full border border-white/7 bg-white/3 text-xs text-slate-400 font-medium"
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </RevealSection>

            <RevealSection delay={2}>
              <div className="mt-8 rounded-xl border border-accent-600/20 bg-accent-600/5 p-5">
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-white">Open to all students. </span>
                  The Startup Pitch Competition is open to all eligible students at SABIS Sharjah
                  in Grades 7–12, including students who are not members of the Entrepreneurship Club.
                </p>
              </div>
            </RevealSection>
          </div>

          {/* Right: stats/metrics */}
          <RevealSection delay={1}>
            <div className="grid grid-cols-2 gap-4">
              <Metric number="5" label="Competition stages" />
              <Metric number="6" label="Proposed award categories" />
              <Metric number="7–12" label="Grades eligible" />
              <Metric number="3" label="Max team size" />
            </div>

            <div className="mt-4 rounded-2xl border border-white/7 bg-[#0c1221] p-6">
              <h4 className="text-sm font-bold text-white mb-3">What you&apos;ll develop</h4>
              <ul className="space-y-2.5">
                {[
                  "Startup ideation and problem-solving",
                  "Research and customer discovery",
                  "Prototyping and product development",
                  "Public speaking and pitch delivery",
                  "Receiving and applying feedback",
                ].map((skill) => (
                  <li key={skill} className="flex items-start gap-3">
                    <svg className="shrink-0 mt-0.5 text-accent-500" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-slate-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/register"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm uppercase tracking-wider"
              >
                Join the Competition
              </Link>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function Metric({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0c1221] p-5 text-center">
      <div className="text-4xl font-black text-white mb-1">{number}</div>
      <div className="text-xs text-slate-500 font-medium leading-snug">{label}</div>
    </div>
  );
}
