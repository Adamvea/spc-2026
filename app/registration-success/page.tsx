"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Suspense } from "react";

const nextSteps = [
  { num: "01", title: "Finalize your business idea", detail: "If you don't have a final idea yet, start exploring problems you find interesting." },
  { num: "02", title: "Research the problem", detail: "Understand who faces this problem, how they currently deal with it, and why your solution could work better." },
  { num: "03", title: "Build or test your first prototype", detail: "Create a website, app, mockup, physical model, or any tangible output that shows progress." },
  { num: "04", title: "Prepare a short pitch", detail: "Practice explaining your idea clearly in under 5 minutes. Focus on the problem, your solution, and what you've built." },
  { num: "05", title: "Watch for official event updates", detail: "The Entrepreneurship Club will communicate the confirmed date, venue and schedule through school-approved channels." },
];

function typeLabel(type: string): string {
  if (type === "individual") return "Individual entry";
  if (type === "team_2") return "Team of 2";
  if (type === "team_3") return "Team of 3";
  return "Registered";
}

function SuccessContent() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "—";
  const type = params.get("type") ?? "";
  const name = params.get("name") ?? "";
  const team = params.get("team");

  if (!ref || ref === "—") {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-slate-400">No registration reference found. Please register first.</p>
        <Link href="/register" className="btn-primary inline-block mt-6 px-8 py-3 rounded-xl text-sm uppercase tracking-wider">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success header */}
      <div className="text-center mb-12">
        {/* Checkmark */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L19 7" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="eyebrow text-emerald-400 mb-3 tracking-[0.2em]">
          Registration Confirmed
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
          You&apos;re Registered!
        </h1>
        <p className="text-slate-400 max-w-sm mx-auto">
          Your entry for the Startup Pitch Competition 2026 has been received.
        </p>
      </div>

      {/* Reference card */}
      <div className="rounded-2xl border border-white/7 bg-[#0c1221] p-6 sm:p-8 mb-6">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-5">
          Registration Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
              Reference Number
            </div>
            <div className="text-lg font-black text-accent-400 font-mono tracking-wide">{ref}</div>
            <p className="text-[11px] text-slate-600 mt-1">Keep this for your records</p>
          </div>

          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
              Entry Type
            </div>
            <div className="text-base font-semibold text-white">{typeLabel(type)}</div>
          </div>

          {name && (
            <div>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
                Registered As
              </div>
              <div className="text-base font-semibold text-white">{name}</div>
            </div>
          )}

          {team && (
            <div>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1">
                Team Name
              </div>
              <div className="text-base font-semibold text-white">{team}</div>
            </div>
          )}
        </div>
      </div>

      {/* Next steps */}
      <div className="rounded-2xl border border-white/7 bg-[#0c1221] p-6 sm:p-8 mb-6">
        <h2 className="text-base font-bold text-white mb-6">Your Next Steps</h2>
        <div className="space-y-5">
          {nextSteps.map((step) => (
            <div key={step.num} className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#111827] border border-white/8 flex items-center justify-center">
                <span className="step-number">{step.num}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-0.5">{step.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{step.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main message */}
      <div className="rounded-2xl border border-accent-600/20 bg-accent-600/5 p-6 text-center mb-8">
        <p className="text-accent-300 font-bold text-lg mb-1">Don&apos;t just pitch an idea.</p>
        <p className="text-slate-400 text-sm">Show us what you&apos;ve built.</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-outline flex-1 flex items-center justify-center py-3 rounded-xl text-sm uppercase tracking-wider">
          Back to Home
        </Link>
        <Link href="/#faq" className="btn-primary flex-1 flex items-center justify-center py-3 rounded-xl text-sm uppercase tracking-wider">
          Read the FAQ
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#070b18] pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <Suspense fallback={<div className="text-slate-400 text-center py-20">Loading...</div>}>
            <SuccessContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
