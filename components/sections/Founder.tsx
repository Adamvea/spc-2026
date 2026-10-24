import RevealSection from "@/components/ui/RevealSection";

export default function Founder() {
  return (
    <section id="founder" className="py-24 sm:py-32 bg-[#0c1221]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection>
          <div className="section-label mb-4">The Organizer</div>
        </RevealSection>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <RevealSection delay={1}>
            <div className="rounded-2xl border border-white/7 bg-[#111827] p-6 flex flex-col items-center text-center">
              {/* Photo placeholder */}
              <div className="w-24 h-24 rounded-full border-2 border-white/10 bg-[#0c1221] mb-5 flex items-center justify-center relative overflow-hidden">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-slate-600">
                  <circle cx="18" cy="14" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M4 34C4 26.27 10.27 20 18 20C25.73 20 32 26.27 32 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#111827] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white">Adam Vea Sulaye</h3>
              <p className="text-sm text-accent-400 font-medium mt-0.5">Founder, Entrepreneurship Club</p>
              <p className="text-xs text-slate-500 mt-0.5">Grade 11 · SABIS Sharjah</p>

              <div className="mt-5 w-full border-t border-white/5 pt-5 space-y-2">
                {["Finance", "AI & Technology", "Startups", "Entrepreneurship"].map((tag) => (
                  <div key={tag} className="inline-block px-3 py-1 rounded-full bg-white/4 border border-white/5 text-xs text-slate-400 mx-0.5">
                    {tag}
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[10px] text-slate-600 italic">
                Profile photo placeholder — replace with actual photo.
              </p>
            </div>
          </RevealSection>

          {/* Bio */}
          <RevealSection delay={2} className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-white/7 bg-[#111827] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Quote mark */}
                <div className="text-6xl font-black text-accent-600/30 leading-none mb-2 select-none">&ldquo;</div>

                <p className="text-slate-300 leading-relaxed mb-5">
                  I&apos;m a Grade 11 student interested in finance, AI, startups and entrepreneurship.
                  I&apos;ve participated in hackathons, worked on business and technology projects, and
                  had opportunities to present startup ideas to people in the industry.
                </p>

                <p className="text-slate-300 leading-relaxed mb-5">
                  I started the Entrepreneurship Club because I wanted students to have a place where
                  they could explore their ideas, meet people with similar interests and actually build
                  something. Too many great ideas stay as conversations. I wanted to change that.
                </p>

                <p className="text-slate-300 leading-relaxed">
                  I organized this competition to give other students the opportunity to experience
                  pitching, receive meaningful feedback and develop their ideas beyond the classroom.
                  Whether you win an award or not, going through the process of building and pitching
                  something is genuinely valuable.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div>
                  <div className="text-sm font-semibold text-white">Adam Vea Sulaye</div>
                  <div className="text-xs text-slate-500">Founder, Entrepreneurship Club at SABIS Sharjah</div>
                </div>
                <div className="sm:ml-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Organizing · 2026
                  </span>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
