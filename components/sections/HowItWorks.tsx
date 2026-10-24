import RevealSection from "@/components/ui/RevealSection";

const steps = [
  {
    num: "01",
    title: "Register",
    description:
      "Sign up individually or in a team of up to three students. Registration takes a few minutes and you can sign up even if you don't have a final idea yet.",
    detail: "Fill in the registration form on this site.",
  },
  {
    num: "02",
    title: "Develop Your Idea",
    description:
      "Choose a problem you find interesting. Research who experiences it, how it currently gets solved, and whether your proposed solution makes sense.",
    detail: "The research phase is part of the judging criteria.",
  },
  {
    num: "03",
    title: "Build Something",
    description:
      "Create a prototype, website, app, mockup, physical model, or another tangible output that demonstrates your idea in action.",
    detail: "Tools like Claude, Replit and Base44 are allowed.",
  },
  {
    num: "04",
    title: "Pitch Your Startup",
    description:
      "Present your idea, your research and what you've built to a panel of judges. Slides are optional but recommended.",
    detail: "Be ready to answer judge questions.",
  },
  {
    num: "05",
    title: "Feedback & Recognition",
    description:
      "Receive practical feedback from the judging panel, develop your entrepreneurial skills and compete for proposed award categories.",
    detail: "All participants receive recognition.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#0c1221]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection>
          <div className="section-label mb-4">The Process</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 max-w-2xl">
            How the Competition Works
          </h2>
          <p className="text-lg text-slate-400 max-w-xl">
            Five stages from registration to recognition.
          </p>
        </RevealSection>

        {/* Steps */}
        <div className="mt-16 relative">
          {/* Vertical connector line on desktop */}
          <div className="hidden lg:block absolute left-[2.15rem] top-6 bottom-6 w-px bg-gradient-to-b from-accent-600/30 via-accent-600/10 to-transparent" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <RevealSection key={step.num} delay={(Math.min(i + 1, 4)) as 0 | 1 | 2 | 3 | 4}>
                <div className="group flex gap-6 lg:gap-8 p-5 sm:p-6 rounded-2xl border border-white/5 bg-[#0c1221] card-hover cursor-default">
                  {/* Number circle */}
                  <div className="shrink-0 w-[2.75rem] h-[2.75rem] rounded-full bg-[#111827] border border-white/10 flex items-center justify-center group-hover:border-accent-600/30 group-hover:bg-accent-600/10 transition-all duration-200">
                    <span className="step-number text-xs">{step.num}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-2">
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                      <span className="text-[11px] text-accent-400/70 font-medium tracking-wide">
                        {step.detail}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {/* AI tools note */}
        <RevealSection>
          <div className="mt-10 rounded-xl border border-white/5 bg-[#111827] p-5 sm:p-6 flex gap-4">
            <div className="shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="#a78bfa" strokeWidth="1.2"/>
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="#a78bfa" strokeWidth="1.2"/>
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="#a78bfa" strokeWidth="1.2"/>
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="#a78bfa" strokeWidth="1.2"/>
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">AI and no-code tools are welcome</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You may use tools such as <span className="text-slate-300">Claude, Replit, Base44</span> and other
                AI or no-code development platforms to build your prototype. You must understand your project,
                be able to answer questions about it yourself, and disclose any significant AI assistance when
                explaining how you built it.
              </p>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
