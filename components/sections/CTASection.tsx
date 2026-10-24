import Link from "next/link";
import { EVENT } from "@/config/event";
import RevealSection from "@/components/ui/RevealSection";

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-[#0c1221] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-600/8 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <RevealSection>
          <div className="eyebrow text-accent-400 mb-6 tracking-[0.2em]">
            {EVENT.week} · {EVENT.dayOfWeek} after school
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
            Ready to Pitch Your Startup?
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Don&apos;t just talk about your idea. Register, build something and show us
            what you&apos;ve created. {EVENT.gradesLabel} students, solo or in teams of
            up to {EVENT.maxTeamSize}.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/register"
              className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl uppercase tracking-widest text-sm font-bold"
            >
              Register Now
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="#faq"
              className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl uppercase tracking-widest text-sm"
            >
              Read the FAQ
            </a>
          </div>

          {/* Event details strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 6H13M4.5 1V4M9.5 1V4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>Date: <span className="text-slate-400">{EVENT.dateStatus}</span></span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M7 3.5V7.5L9.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>~<span className="text-slate-400">{EVENT.timeProvisional}</span> (provisional)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.24 1 2 3.24 2 6.5C2 10.5 7 13 7 13C7 13 12 10.5 12 6.5C12 3.24 9.76 1 7 1Z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              <span>{EVENT.venueStatus}</span>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
