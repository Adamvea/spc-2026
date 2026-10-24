"use client";

import { useEffect, useRef, useState } from "react";
import { JUDGING_CRITERIA } from "@/config/event";
import RevealSection from "@/components/ui/RevealSection";

function CriteriaBar({ label, weight, description, index }: {
  label: string; weight: number; description: string; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="group" style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className="text-sm font-semibold text-white">{label}</span>
          <span className="hidden sm:inline text-xs text-slate-500 ml-2">{description}</span>
        </div>
        <span className="text-2xl font-black text-accent-400 tabular-nums">{weight}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-600 to-accent-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: animate ? `${weight * 4}%` : "0%" }}
        />
      </div>
      <p className="sm:hidden text-xs text-slate-500 mt-1">{description}</p>
    </div>
  );
}

export default function Judges() {
  return (
    <section id="judges" className="py-24 sm:py-32 bg-[#070b18]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Judges panel */}
          <div>
            <RevealSection>
              <div className="section-label mb-4">The Judges</div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-5">
                Pitch to People Who Know the Industry.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                We&apos;re inviting professionals from entrepreneurship, technology, finance
                and the startup ecosystem to evaluate student ideas and provide practical
                feedback.
              </p>
            </RevealSection>

            {/* TBA panel */}
            <RevealSection delay={1}>
              <div className="rounded-2xl border border-white/7 bg-[#0c1221] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                    To Be Announced
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The judging panel is being assembled. Confirmed judges will be announced
                  by the Entrepreneurship Club prior to the competition date.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    "Entrepreneurship",
                    "Technology",
                    "Finance",
                    "Startups",
                    "Innovation",
                    "Business",
                  ].map((tag) => (
                    <div
                      key={tag}
                      className="rounded-lg border border-white/5 bg-white/2 px-3 py-2 text-center"
                    >
                      <span className="text-xs text-slate-500 font-medium">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Important note */}
            <RevealSection delay={2}>
              <div className="mt-4 rounded-xl border border-accent-600/15 bg-accent-600/5 p-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">A note on expectations: </span>
                  Students are assessed on their reasoning, effort and progress — not on how
                  expensive or technically advanced their projects look. A well-researched
                  concept with a basic prototype can outscore an impressive demo with little
                  understanding behind it.
                </p>
              </div>
            </RevealSection>
          </div>

          {/* Right: Judging criteria */}
          <div>
            <RevealSection>
              <div className="section-label mb-4">Judging Criteria</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                How entries are evaluated
              </h3>
              <p className="text-sm text-slate-500 mb-8">
                Proposed criteria — subject to final organizer confirmation.
              </p>
            </RevealSection>

            <div className="space-y-6">
              {JUDGING_CRITERIA.map((c, i) => (
                <RevealSection key={c.label} delay={(Math.min(i + 1, 4)) as 0 | 1 | 2 | 3 | 4}>
                  <CriteriaBar
                    label={c.label}
                    weight={c.weight}
                    description={c.description}
                    index={i}
                  />
                </RevealSection>
              ))}
            </div>

            <RevealSection delay={4}>
              <div className="mt-8 flex items-center gap-3 p-4 rounded-xl bg-white/2 border border-white/5">
                <div className="text-3xl font-black text-white">100%</div>
                <div>
                  <div className="text-xs font-semibold text-white">Total weighting</div>
                  <div className="text-xs text-slate-500">Equally balanced across all dimensions</div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
