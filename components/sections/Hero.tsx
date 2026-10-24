"use client";

import Link from "next/link";
import { EVENT } from "@/config/event";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b18] via-transparent to-[#070b18]" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-600/8 blur-[120px] rounded-full pointer-events-none" />

      {/* Decorative year watermark */}
      <div className="absolute top-20 right-0 text-[200px] font-black text-white/[0.025] select-none leading-none pointer-events-none hidden lg:block pr-8">
        {EVENT.year}
      </div>

      {/* Decorative geometric corner */}
      <div className="absolute top-24 left-8 w-24 h-24 border border-white/5 rotate-12 hidden lg:block" />
      <div className="absolute top-28 left-12 w-24 h-24 border border-accent-600/10 rotate-45 hidden lg:block" />

      {/* Bottom-left dot accent */}
      <div className="absolute bottom-32 left-12 flex gap-3 hidden lg:flex opacity-30">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            {[...Array(6)].map((_, j) => (
              <div key={j} className="w-1 h-1 rounded-full bg-white/30" />
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-12">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="eyebrow text-accent-400 mb-6 tracking-[0.25em]">
            SABIS Sharjah · Entrepreneurship Club
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white mb-8">
            <span className="block">Your Idea.</span>
            <span className="block text-accent-400">Your Build.</span>
            <span className="block">Your Pitch.</span>
          </h1>

          {/* Sub headline */}
          <p className="text-xl sm:text-2xl font-light text-slate-300 mb-5">
            The Startup Pitch Competition is here.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Have a business idea you&apos;ve always wanted to bring to life? This is your
            opportunity to turn it into something real, demonstrate what you&apos;ve built,
            and pitch it to a panel of judges.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/register"
              className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg uppercase tracking-widest text-sm"
            >
              Register Your Team
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="#about"
              className="btn-outline inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg uppercase tracking-widest text-sm"
            >
              Explore the Competition
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Event details bar */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <EventDetail label="When">
                <span className="text-white">{EVENT.week}</span>
                <span className="text-slate-500 mx-1">·</span>
                <span className="text-white">{EVENT.dayOfWeek} after school</span>
                <span className="text-slate-500 mx-1">·</span>
                <span className="text-slate-400">{EVENT.timeProvisional}</span>
                <span className="ml-2 text-xs text-amber-500/80 font-medium">(provisional)</span>
              </EventDetail>

              <EventDetail label="Date">
                <span className="text-slate-400 italic">{EVENT.dateStatus}</span>
              </EventDetail>

              <EventDetail label="Venue">
                <span className="text-slate-400 italic">{EVENT.venueStatus}</span>
              </EventDetail>

              <EventDetail label="Eligibility">
                <span className="text-white">{EVENT.gradesLabel}</span>
              </EventDetail>

              <EventDetail label="Format">
                <span className="text-white">Solo or teams up to {EVENT.maxTeamSize}</span>
              </EventDetail>
            </div>

            <p className="mt-4 text-[11px] text-slate-600 tracking-wide">
              * Exact date and venue are subject to school confirmation. All times are provisional.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-widest uppercase text-slate-500">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}

function EventDetail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">
        {label}
      </span>
      <div className="text-sm flex items-center flex-wrap gap-1">{children}</div>
    </div>
  );
}
