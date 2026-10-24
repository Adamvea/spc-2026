import RevealSection from "@/components/ui/RevealSection";

const tangibleExamples = [
  { icon: "◻", text: "A functioning website or web app" },
  { icon: "◻", text: "A simple app or working prototype" },
  { icon: "◻", text: "A physical product prototype" },
  { icon: "◻", text: "An interactive mockup or wireframe" },
  { icon: "◻", text: "A tested service concept" },
  { icon: "◻", text: "Customer research and an early demonstration" },
  { icon: "◻", text: "Any other measurable step toward your idea" },
];

const pitchFocus = [
  "The problem being solved",
  "Your startup idea and proposed solution",
  "The actual product, prototype or evidence of progress",
  "Research and potential customers",
  "How the idea could work as a business",
  "The clarity and confidence of the pitch",
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#070b18]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <RevealSection>
          <div className="section-label mb-4">About the Competition</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-3xl">
            Don&apos;t just pitch an idea.{" "}
            <span className="text-accent-400">Show us what you&apos;ve built.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            This is not just a PowerPoint competition. Students must come up with a startup
            or business idea and take meaningful steps toward developing it before the day.
          </p>
        </RevealSection>

        {/* Main grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: what we want */}
          <RevealSection delay={1}>
            <div className="h-full rounded-2xl border border-white/7 bg-[#0c1221] p-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-600/15 mb-5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L11.2 7.2L17 7.6L12.8 11.4L14.1 17L9 14.1L3.9 17L5.2 11.4L1 7.6L6.8 7.2L9 2Z" stroke="#60a5fa" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                The idea matters. So does what you&apos;ve done with it.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                You do not need to create a fully operational company or generate sales.
                However, competitors should bring something tangible that demonstrates
                real progress. We want to see you take action.
              </p>
              <div className="space-y-2.5">
                {tangibleExamples.map((ex, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-4 h-4 rounded border border-accent-600/30 bg-accent-600/10 shrink-0 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-sm bg-accent-500" />
                    </div>
                    <span className="text-sm text-slate-300">{ex.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Right: pitch focus */}
          <RevealSection delay={2}>
            <div className="h-full rounded-2xl border border-white/7 bg-[#0c1221] p-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-accent-600/15 mb-5">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="#60a5fa" strokeWidth="1.5"/>
                  <path d="M9 5V9.5L12 11" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">What the pitch is about</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                PowerPoint presentations are recommended but optional. Your pitch is your
                opportunity to demonstrate your thinking, your effort and what you&apos;ve built.
              </p>
              <div className="space-y-3">
                {pitchFocus.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="step-number mt-0.5 shrink-0">0{i + 1}</span>
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>

        {/* Bottom callout */}
        <RevealSection delay={3}>
          <div className="mt-8 rounded-2xl border border-accent-600/20 bg-accent-600/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-accent-600/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L9 10M9 13L9 14" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">You can register without a finished idea.</span>{" "}
              However, by competition day, you must have a concept and something tangible to demonstrate.
              A complete startup is not required — but we want to see that you&apos;ve taken steps
              toward building or testing your solution.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
