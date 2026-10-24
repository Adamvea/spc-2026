"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/config/event";
import RevealSection from "@/components/ui/RevealSection";

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-white/5 last:border-0 ${index === 0 ? "border-t" : ""}`}>
      <button
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-white transition-colors leading-snug">
          {q}
        </span>
        <span
          className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center text-slate-500 transition-all duration-200 ${
            open ? "bg-accent-600/20 border-accent-600/30 text-accent-400 rotate-45" : ""
          }`}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M4.5 1V8M1 4.5H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 mb-4" : "max-h-0"
        }`}
      >
        <p className="text-sm text-slate-400 leading-relaxed pr-8">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#070b18]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left label */}
          <RevealSection>
            <div className="lg:sticky lg:top-24">
              <div className="section-label mb-4">FAQ</div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-5">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Everything you need to know about registering, competing and what to expect.
              </p>

              <div className="mt-8 rounded-xl border border-accent-600/20 bg-accent-600/5 p-5">
                <h4 className="text-sm font-semibold text-white mb-2">Still have questions?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Contact the Entrepreneurship Club through your school&apos;s
                  official communication channels. A contact email will be
                  published once school approval is confirmed.
                </p>
              </div>
            </div>
          </RevealSection>

          {/* FAQ list */}
          <RevealSection delay={1} className="lg:col-span-2">
            <div>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
