"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type ParticipationType = "individual" | "team_2" | "team_3";
type IdeaStatus = "yes" | "rough" | "no" | "";

interface MemberFields {
  name: string;
  grade: string;
  class: string;
  studentId: string;
}

const emptyMember = (): MemberFields => ({ name: "", grade: "", class: "", studentId: "" });

const GRADES = ["7", "8", "9", "10", "11", "12"];

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
      {children}
      {required && <span className="text-accent-500 ml-1">*</span>}
    </label>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20 transition-all ${className}`}
      {...props}
    />
  );
}

function Select({ className = "", children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full px-4 py-3 rounded-xl text-sm text-white border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20 transition-all appearance-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

function Textarea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-600 border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/20 transition-all resize-none ${className}`}
      rows={3}
      {...props}
    />
  );
}

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/7 bg-[#0c1221] p-6 sm:p-8">
      <h3 className="text-lg font-bold text-white mb-0.5">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 mb-6">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      {children}
    </div>
  );
}

function MemberForm({
  index: _index,
  values,
  onChange,
  label,
}: {
  index: number;
  values: MemberFields;
  onChange: (field: keyof MemberFields, value: string) => void;
  label: string;
}) {
  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      <div className="text-xs font-semibold tracking-widest uppercase text-accent-400 mb-4">{label}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Label required>Full Name</Label>
          <Input
            type="text"
            placeholder="Full name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            autoComplete="off"
          />
        </div>
        <div>
          <Label required>Grade</Label>
          <Select value={values.grade} onChange={(e) => onChange("grade", e.target.value)}>
            <option value="">Select grade</option>
            {GRADES.map((g) => <option key={g} value={g}>Grade {g}</option>)}
          </Select>
        </div>
        <div>
          <Label required>Class & Section</Label>
          <Input
            type="text"
            placeholder="e.g. 11A"
            value={values.class}
            onChange={(e) => onChange("class", e.target.value)}
          />
        </div>
        <div>
          <Label>Student / Computer Number</Label>
          <Input
            type="text"
            placeholder="Optional"
            value={values.studentId}
            onChange={(e) => onChange("studentId", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Participation
  const [participationType, setParticipationType] = useState<ParticipationType>("individual");
  const [teamName, setTeamName] = useState("");

  // Leader
  const [leaderName, setLeaderName] = useState("");
  const [leaderGrade, setLeaderGrade] = useState("");
  const [leaderClass, setLeaderClass] = useState("");
  const [leaderStudentId, setLeaderStudentId] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [leaderWhatsapp, setLeaderWhatsapp] = useState(false);

  // Team members
  const [member2, setMember2] = useState<MemberFields>(emptyMember());
  const [member3, setMember3] = useState<MemberFields>(emptyMember());

  // Idea
  const [ideaStatus, setIdeaStatus] = useState<IdeaStatus>("");
  const [startupName, setStartupName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [progressSoFar, setProgressSoFar] = useState("");
  const [demoPlan, setDemoPlan] = useState("");
  const [roughDirection, setRoughDirection] = useState("");
  const [problemInterest, setProblemInterest] = useState("");
  const [buildPlan, setBuildPlan] = useState("");
  const [industryInterest, setIndustryInterest] = useState("");
  const [hopeToBuild, setHopeToBuild] = useState("");

  // Terms
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [confirmAccurate, setConfirmAccurate] = useState(false);

  const updateMember2 = useCallback((field: keyof MemberFields, value: string) => {
    setMember2((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateMember3 = useCallback((field: keyof MemberFields, value: string) => {
    setMember3((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!leaderName.trim() || !leaderGrade || !leaderClass.trim()) {
      setError("Please fill in your full name, grade and class.");
      return;
    }

    if (!agreedToTerms || !confirmAccurate) {
      setError("Please confirm both checkboxes at the bottom of the form.");
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        participationType,
        teamName,
        leaderName: leaderName.trim(),
        leaderGrade,
        leaderClass: leaderClass.trim(),
        leaderStudentId,
        leaderEmail,
        leaderPhone,
        leaderWhatsappConsent: leaderWhatsapp,
        member2Name: member2.name,
        member2Grade: member2.grade,
        member2Class: member2.class,
        member2StudentId: member2.studentId,
        member3Name: member3.name,
        member3Grade: member3.grade,
        member3Class: member3.class,
        member3StudentId: member3.studentId,
        ideaStatus,
        startupName,
        ideaDescription,
        problemSolved,
        progressSoFar,
        demoPlan,
        roughDirection,
        problemInterest,
        buildPlan,
        industryInterest,
        hopeToBuild,
        agreedToTerms,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      const params = new URLSearchParams({
        ref: data.referenceId,
        type: data.participationType,
        name: data.leaderName,
        ...(data.teamName ? { team: data.teamName } : {}),
      });
      router.push(`/registration-success?${params.toString()}`);
    } catch {
      setError("A network error occurred. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#070b18] pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="mb-10">
            <div className="eyebrow text-accent-400 mb-3 tracking-[0.2em]">
              Startup Pitch Competition 2026
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Ready to Pitch Your Idea?
            </h1>
            <p className="text-lg text-slate-400">
              Complete your registration and start preparing your startup.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Step 1: Participation type */}
            <SectionCard
              title="How are you participating?"
              subtitle="Choose whether you're entering individually or as a team."
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["individual", "team_2", "team_3"] as ParticipationType[]).map((type) => {
                  const labels = {
                    individual: { title: "Individually", sub: "Just me" },
                    team_2: { title: "Team of 2", sub: "Me + 1 teammate" },
                    team_3: { title: "Team of 3", sub: "Me + 2 teammates" },
                  };
                  const active = participationType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setParticipationType(type)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        active
                          ? "border-accent-500/50 bg-accent-600/10"
                          : "border-white/7 bg-[#111827] hover:border-white/15"
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-0.5 ${active ? "text-accent-400" : "text-white"}`}>
                        {labels[type].title}
                      </div>
                      <div className="text-xs text-slate-500">{labels[type].sub}</div>
                    </button>
                  );
                })}
              </div>

              {participationType !== "individual" && (
                <div className="mt-5">
                  <Label>Team Name (optional)</Label>
                  <Input
                    type="text"
                    placeholder="Give your team a name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
              )}
            </SectionCard>

            {/* Step 2: Your info */}
            <SectionCard
              title={participationType === "individual" ? "Your Information" : "Team Leader Information"}
              subtitle="The team leader's details. If you're entering individually, this is your information."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label required>Full Name</Label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <Label required>Grade</Label>
                  <Select value={leaderGrade} onChange={(e) => setLeaderGrade(e.target.value)}>
                    <option value="">Select your grade</option>
                    {GRADES.map((g) => <option key={g} value={g}>Grade {g}</option>)}
                  </Select>
                </div>
                <div>
                  <Label required>Class & Section</Label>
                  <Input
                    type="text"
                    placeholder="e.g. 11A"
                    value={leaderClass}
                    onChange={(e) => setLeaderClass(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Student / Computer Number</Label>
                  <Input
                    type="text"
                    placeholder="Optional"
                    value={leaderStudentId}
                    onChange={(e) => setLeaderStudentId(e.target.value)}
                  />
                </div>
                <div>
                  <Label>School Email Address</Label>
                  <Input
                    type="email"
                    placeholder="If school-approved"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Contact Phone (optional)</Label>
                  <Input
                    type="tel"
                    placeholder="Subject to school approval"
                    value={leaderPhone}
                    onChange={(e) => setLeaderPhone(e.target.value)}
                    autoComplete="tel"
                  />
                  <p className="mt-1.5 text-[11px] text-slate-600 leading-relaxed">
                    Phone numbers are stored securely and only accessible to competition organizers.
                    Not displayed publicly.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <div className="rounded-xl border border-white/5 bg-[#111827] p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={leaderWhatsapp}
                        onChange={(e) => setLeaderWhatsapp(e.target.checked)}
                      />
                      <div>
                        <span className="text-sm text-slate-300 font-medium">
                          I consent to being added to an event WhatsApp group (optional)
                        </span>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                          A WhatsApp group may be set up once school approval is confirmed. Members
                          of any WhatsApp group will be able to see each other&apos;s phone numbers.
                          This is completely optional and a school-approved alternative will be
                          available for those who prefer not to use WhatsApp.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Team member 2 */}
              {(participationType === "team_2" || participationType === "team_3") && (
                <MemberForm
                  index={2}
                  values={member2}
                  onChange={updateMember2}
                  label="Team Member 2"
                />
              )}

              {/* Team member 3 */}
              {participationType === "team_3" && (
                <MemberForm
                  index={3}
                  values={member3}
                  onChange={updateMember3}
                  label="Team Member 3"
                />
              )}
            </SectionCard>

            {/* Step 3: Startup idea */}
            <SectionCard
              title="Your Startup Idea"
              subtitle="Tell us where you are with your idea right now."
            >
              {/* Notice */}
              <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-sm text-amber-200/80 leading-relaxed">
                  <span className="font-semibold text-amber-200">You can register without a finished idea.</span>{" "}
                  However, by competition day, you must have an idea and something tangible to demonstrate.
                  A complete startup is not required, but we want to see that you&apos;ve taken steps
                  toward building or testing your solution.
                </p>
              </div>

              <div>
                <Label>Do you already have a startup idea?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {([
                    { value: "yes", title: "Yes, I have an idea", sub: "I know what I want to build" },
                    { value: "rough", title: "Rough idea", sub: "Still developing it" },
                    { value: "no", title: "Not yet", sub: "I want to participate and find one" },
                  ] as { value: IdeaStatus; title: string; sub: string }[]).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setIdeaStatus(opt.value)}
                      className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                        ideaStatus === opt.value
                          ? "border-accent-500/50 bg-accent-600/10"
                          : "border-white/7 bg-[#111827] hover:border-white/15"
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-0.5 ${ideaStatus === opt.value ? "text-accent-400" : "text-white"}`}>
                        {opt.title}
                      </div>
                      <div className="text-xs text-slate-500">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional fields */}
              {ideaStatus === "yes" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label>Startup Name (optional)</Label>
                    <Input
                      type="text"
                      placeholder="What do you call it?"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Describe your idea</Label>
                    <Textarea
                      placeholder="What is your startup? What does it do?"
                      value={ideaDescription}
                      onChange={(e) => setIdeaDescription(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What problem does it solve?</Label>
                    <Textarea
                      placeholder="Who has this problem and why does it matter?"
                      value={problemSolved}
                      onChange={(e) => setProblemSolved(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What have you built, tested or researched so far?</Label>
                    <Textarea
                      placeholder="Website, prototype, mockup, research, interviews..."
                      value={progressSoFar}
                      onChange={(e) => setProgressSoFar(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What do you plan to demonstrate on competition day?</Label>
                    <Textarea
                      placeholder="What will you show to the judges?"
                      value={demoPlan}
                      onChange={(e) => setDemoPlan(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {ideaStatus === "rough" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label>Describe the direction you&apos;re considering</Label>
                    <Textarea
                      placeholder="What kind of idea or space are you exploring?"
                      value={roughDirection}
                      onChange={(e) => setRoughDirection(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What problem would you like to solve?</Label>
                    <Textarea
                      placeholder="A problem you care about or find interesting"
                      value={problemInterest}
                      onChange={(e) => setProblemInterest(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What do you plan to build before the event?</Label>
                    <Textarea
                      placeholder="Your initial plan for the next few weeks"
                      value={buildPlan}
                      onChange={(e) => setBuildPlan(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {ideaStatus === "no" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label>What kind of startup or product interests you?</Label>
                    <Textarea
                      placeholder="Tech, food, education, services — anything you find exciting"
                      value={industryInterest}
                      onChange={(e) => setIndustryInterest(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What problems or industries interest you?</Label>
                    <Textarea
                      placeholder="What issues do you care about or notice around you?"
                      value={problemInterest}
                      onChange={(e) => setProblemInterest(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>What do you hope to build before the competition?</Label>
                    <Textarea
                      placeholder="Your ambition for the coming weeks"
                      value={hopeToBuild}
                      onChange={(e) => setHopeToBuild(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </SectionCard>

            {/* Step 4: Agreement + privacy */}
            <SectionCard title="Agreements & Privacy">
              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-[#111827] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 shrink-0"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="text-sm text-slate-300">
                      I understand that I must prepare a startup concept and demonstrate meaningful
                      progress before presenting at the competition.
                    </span>
                  </label>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#111827] p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 shrink-0"
                      checked={confirmAccurate}
                      onChange={(e) => setConfirmAccurate(e.target.checked)}
                    />
                    <span className="text-sm text-slate-300">
                      I confirm that the information I&apos;ve submitted is accurate to the best of
                      my knowledge.
                    </span>
                  </label>
                </div>

                {/* Privacy notice */}
                <div className="rounded-xl border border-white/5 bg-white/2 p-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Privacy Notice
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The information you submit — including your name, grade, class and optional contact
                    details — is collected solely for the purpose of administering the Startup Pitch
                    Competition. It is accessible only to authorized competition organizers at SABIS
                    Sharjah. Your contact information is never displayed publicly. Phone numbers are
                    stored securely and shared only if you explicitly consent. To request correction
                    or removal of your data, contact the Entrepreneurship Club through your school&apos;s
                    official channels.
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
                  </svg>
                  Submitting Registration...
                </>
              ) : (
                <>
                  Submit Registration
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
