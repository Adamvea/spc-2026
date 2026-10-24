import Link from "next/link";
import { EVENT } from "@/config/event";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#040812] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L8 3L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 9.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Entrepreneurship Club</div>
                <div className="text-xs text-slate-500">{EVENT.schoolShort}</div>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Helping students move from ideas to action. Through competitions, workshops and
              hands-on projects.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">
              Competition
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", href: "/#about" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Judges", href: "/#judges" },
                { label: "Awards", href: "/#awards" },
                { label: "FAQ", href: "/#faq" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Register */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-slate-600 mb-4">
              Participate
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/register" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-600">
                  Grades {EVENT.gradesMin}–{EVENT.gradesMax}
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600">
                  Teams up to {EVENT.maxTeamSize}
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 italic">
                  {EVENT.dateStatus}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-slate-600">
            © {year} Entrepreneurship Club, {EVENT.schoolShort}. Organized by Adam Vea Sulaye.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-slate-700">
              All event details subject to school confirmation.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
