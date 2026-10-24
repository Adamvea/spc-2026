import { AWARDS } from "@/config/event";
import RevealSection from "@/components/ui/RevealSection";

const iconPaths: Record<string, React.ReactNode> = {
  trophy: (
    <path d="M7 15V11M7 11C4.24 11 2 8.76 2 6V3H12V6C12 8.76 9.76 11 7 11ZM4 3V1H10V3M4 15H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  lightbulb: (
    <>
      <path d="M7 1C4.24 1 2 3.24 2 6C2 7.9 3.06 9.54 4.6 10.42V12H9.4V10.42C10.94 9.54 12 7.9 12 6C12 3.24 9.76 1 7 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M5 14H9M5.5 12H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  search: (
    <>
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M12 12L9.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  wrench: (
    <path d="M10.5 1.5L8.5 3.5L10.5 5.5L12.5 3.5C12.83 4.3 12.83 5.2 12.5 6C11.97 7.3 10.67 8 9.3 8C8.5 8 7.72 7.73 7.1 7.26L2.76 11.6C2.34 12.02 1.66 12.02 1.24 11.6C0.82 11.18 0.82 10.5 1.24 10.08L5.58 5.74C5.1 5.12 4.83 4.36 4.83 3.55C4.83 2.19 5.53 0.88 6.83 0.35C7.64 0.02 8.54 0.02 9.34 0.35L7.34 2.35L10.5 1.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
  ),
  mic: (
    <>
      <rect x="4.5" y="1" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 7C2 10.31 4.69 13 8 13C11.31 13 14 10.31 14 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 13V15M6 15H10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </>
  ),
  certificate: (
    <>
      <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M4 6H10M4 8.5H7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="11" cy="11" r="2.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2"/>
    </>
  ),
};

const accentColors = [
  "from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400",
  "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400",
  "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400",
  "from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400",
  "from-pink-500/20 to-pink-600/5 border-pink-500/20 text-pink-400",
  "from-slate-500/20 to-slate-600/5 border-slate-500/20 text-slate-400",
];

export default function Awards() {
  return (
    <section id="awards" className="py-24 sm:py-32 bg-[#0c1221]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection>
          <div className="section-label mb-4">Recognition</div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4 max-w-2xl">
            Awards & Recognition
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mb-2">
            Proposed award categories for the competition.
          </p>
          <p className="text-sm text-slate-600">
            Final categories subject to confirmation by the organizers and school administration.
          </p>
        </RevealSection>

        {/* Awards grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AWARDS.map((award, i) => {
            const colors = accentColors[i % accentColors.length];
            const colorParts = colors.split(" ");
            const textColor = colorParts.find(c => c.startsWith("text-")) || "text-blue-400";
            const borderColor = colorParts.find(c => c.startsWith("border-")) || "border-blue-500/20";
            const gradFrom = colorParts.find(c => c.startsWith("from-")) || "from-blue-500/20";
            const gradTo = colorParts.find(c => c.startsWith("to-")) || "to-blue-600/5";

            return (
              <RevealSection
                key={award.title}
                delay={(Math.min((i % 4) + 1, 4)) as 0 | 1 | 2 | 3 | 4}
              >
                <div
                  className={`group h-full rounded-2xl border ${borderColor} bg-gradient-to-br ${gradFrom} ${gradTo} p-6 card-hover`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 mb-4 ${textColor}`}>
                    <svg width="16" height="16" viewBox="0 0 14 16" fill="none">
                      {iconPaths[award.icon]}
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{award.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{award.description}</p>
                </div>
              </RevealSection>
            );
          })}
        </div>

        {/* Disclaimer */}
        <RevealSection>
          <div className="mt-8 flex gap-3 p-4 rounded-xl border border-white/5 bg-white/2">
            <svg className="shrink-0 mt-0.5 text-slate-600" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M7 4V7.5M7 9.5V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <p className="text-xs text-slate-500 leading-relaxed">
              Award categories, titles and any prizes are proposed and subject to final confirmation.
              No cash prizes, investment or funding are being offered or implied. All students who
              participate will receive recognition for competing.
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
