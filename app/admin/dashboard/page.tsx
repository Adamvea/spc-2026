"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

type Status = "submitted" | "under_review" | "shortlisted" | "waitlisted" | "withdrawn";
type ParticipationType = "individual" | "team_2" | "team_3";

interface Registration {
  id: string;
  reference_id: string;
  participation_type: ParticipationType;
  team_name: string | null;
  status: Status;
  leader_name: string;
  leader_grade: string;
  leader_class: string;
  leader_email: string | null;
  idea_status: string | null;
  startup_name: string | null;
  idea_description: string | null;
  problem_solved: string | null;
  progress_so_far: string | null;
  demo_plan: string | null;
  rough_direction: string | null;
  problem_interest: string | null;
  build_plan: string | null;
  industry_interest: string | null;
  hope_to_build: string | null;
  admin_notes: string | null;
  member2_name: string | null;
  member2_grade: string | null;
  member2_class: string | null;
  member3_name: string | null;
  member3_grade: string | null;
  member3_class: string | null;
  leader_whatsapp_consent: 0 | 1;
  agreed_to_terms: 0 | 1;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  teams: number;
  individuals: number;
  byStatus: { status: string; count: number }[];
}

const STATUS_LABELS: Record<Status, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  waitlisted: "Waitlisted",
  withdrawn: "Withdrawn",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`badge badge-${status}`}>{STATUS_LABELS[status]}</span>
  );
}

function TypeBadge({ type }: { type: ParticipationType }) {
  const labels = { individual: "Solo", team_2: "Team 2", team_3: "Team 3" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/5 text-slate-400 border border-white/5">
      {labels[type]}
    </span>
  );
}

function ideaLabel(status: string | null): string {
  if (status === "yes") return "Has idea";
  if (status === "rough") return "Rough idea";
  if (status === "no") return "No idea yet";
  return "—";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<Status>("submitted");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterStatus) params.set("status", filterStatus);
    if (filterType) params.set("type", filterType);

    const res = await fetch(`/api/admin/registrations?${params}`);
    if (res.status === 401) {
      router.push("/admin");
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setRegistrations(data.registrations ?? []);
      setStats(data.stats ?? null);
    }
    setLoading(false);
  }, [filterStatus, filterType, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = registrations.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return [r.leader_name, r.team_name, r.startup_name, r.reference_id, r.member2_name, r.member3_name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(s);
  });

  const openDetail = (r: Registration) => {
    setSelected(r);
    setEditNotes(r.admin_notes ?? "");
    setEditStatus(r.status);
    setSaveMsg("");
  };

  const saveChanges = async () => {
    if (!selected) return;
    setSaving(true);
    const res = await fetch(`/api/admin/registrations/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: editStatus, adminNotes: editNotes }),
    });
    if (res.ok) {
      setSaveMsg("Saved.");
      setRegistrations((prev) =>
        prev.map((r) => r.id === selected.id ? { ...r, status: editStatus, admin_notes: editNotes || null } : r)
      );
      setSelected((prev) => prev ? { ...prev, status: editStatus, admin_notes: editNotes || null } : prev);
    } else {
      setSaveMsg("Error saving.");
    }
    setSaving(false);
  };

  const deleteRegistration = async (id: string) => {
    const res = await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      setDeleteConfirm(null);
      if (selected?.id === id) setSelected(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#040812] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-accent-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"/>
          </svg>
          <span className="text-slate-500 text-sm">Loading registrations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040812] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#040812]/90 backdrop-blur-lg px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-accent-600 flex items-center justify-center shrink-0">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L8 3L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 9.5H11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-white">Registrations</span>
              <span className="ml-2 text-xs text-slate-500">SPC 2026</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              download
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3 text-xs text-slate-300 hover:bg-white/6 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V8M6 8L3.5 5.5M6 8L8.5 5.5M1 10H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Export CSV
            </a>
            <button
              onClick={handleLogout}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Registrations" value={stats.total} />
            <StatCard label="Individual" value={stats.individuals} />
            <StatCard label="Team Entries" value={stats.teams} />
            <StatCard
              label="Shortlisted"
              value={stats.byStatus.find((s) => s.status === "shortlisted")?.count ?? 0}
              accent
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="Search name, team, idea, reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 transition-all"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm text-white border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 transition-all"
          >
            <option value="">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm text-white border border-white/8 bg-[#0c1221] focus:outline-none focus:border-accent-500/50 transition-all"
          >
            <option value="">All types</option>
            <option value="individual">Individual</option>
            <option value="team_2">Team of 2</option>
            <option value="team_3">Team of 3</option>
          </select>
        </div>

        {/* Count */}
        <div className="text-xs text-slate-600 mb-3">
          {filtered.length === registrations.length
            ? `${filtered.length} registration${filtered.length !== 1 ? "s" : ""}`
            : `${filtered.length} of ${registrations.length} registrations`}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-[#0c1221] p-12 text-center">
            <p className="text-slate-500 text-sm">
              {registrations.length === 0 ? "No registrations yet." : "No registrations match your search."}
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/5 bg-[#0c1221] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Reference", "Name", "Grade", "Type", "Team / Startup", "Idea", "Status", "Registered", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-slate-600 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-white/3 hover:bg-white/2 cursor-pointer transition-colors ${i % 2 === 1 ? "bg-white/1" : ""}`}
                      onClick={() => openDetail(r)}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-accent-400 whitespace-nowrap">{r.reference_id}</td>
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{r.leader_name}</td>
                      <td className="px-4 py-3 text-slate-400">{r.leader_grade}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><TypeBadge type={r.participation_type} /></td>
                      <td className="px-4 py-3 text-slate-400 max-w-[160px] truncate">
                        {r.team_name || r.startup_name || <span className="text-slate-600">—</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{ideaLabel(r.idea_status)}</td>
                      <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={r.status} /></td>
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                        {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-xs text-slate-500 hover:text-slate-300 transition-colors px-2 py-1 rounded hover:bg-white/5"
                          onClick={(e) => { e.stopPropagation(); openDetail(r); }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full sm:w-[480px] bg-[#0c1221] border-l border-white/7 overflow-y-auto">
            <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0c1221] z-10">
              <div>
                <div className="text-xs text-slate-500 mb-0.5 font-mono">{selected.reference_id}</div>
                <h2 className="text-base font-bold text-white">{selected.leader_name}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-7 h-7 rounded-lg border border-white/8 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Basics */}
              <DetailSection title="Participant Details">
                <DetailRow label="Grade" value={selected.leader_grade} />
                <DetailRow label="Class" value={selected.leader_class} />
                <DetailRow label="Type" value={<TypeBadge type={selected.participation_type} />} />
                {selected.team_name && <DetailRow label="Team Name" value={selected.team_name} />}
                {selected.leader_email && <DetailRow label="Email" value={selected.leader_email} />}
                <DetailRow label="WhatsApp" value={selected.leader_whatsapp_consent ? "Consented" : "Not consented"} />
                <DetailRow label="Registered" value={new Date(selected.created_at).toLocaleString("en-GB")} />
              </DetailSection>

              {/* Team members */}
              {selected.member2_name && (
                <DetailSection title="Team Member 2">
                  <DetailRow label="Name" value={selected.member2_name} />
                  <DetailRow label="Grade" value={selected.member2_grade ?? "—"} />
                  <DetailRow label="Class" value={selected.member2_class ?? "—"} />
                </DetailSection>
              )}

              {selected.member3_name && (
                <DetailSection title="Team Member 3">
                  <DetailRow label="Name" value={selected.member3_name} />
                  <DetailRow label="Grade" value={selected.member3_grade ?? "—"} />
                  <DetailRow label="Class" value={selected.member3_class ?? "—"} />
                </DetailSection>
              )}

              {/* Idea */}
              <DetailSection title="Startup Idea">
                <DetailRow label="Status" value={ideaLabel(selected.idea_status)} />
                {selected.startup_name && <DetailRow label="Name" value={selected.startup_name} />}
                {selected.idea_description && <DetailLong label="Description" value={selected.idea_description} />}
                {selected.problem_solved && <DetailLong label="Problem Solved" value={selected.problem_solved} />}
                {selected.progress_so_far && <DetailLong label="Progress So Far" value={selected.progress_so_far} />}
                {selected.demo_plan && <DetailLong label="Demo Plan" value={selected.demo_plan} />}
                {selected.rough_direction && <DetailLong label="Direction" value={selected.rough_direction} />}
                {selected.problem_interest && <DetailLong label="Problem Interest" value={selected.problem_interest} />}
                {selected.build_plan && <DetailLong label="Build Plan" value={selected.build_plan} />}
                {selected.industry_interest && <DetailLong label="Industry Interest" value={selected.industry_interest} />}
                {selected.hope_to_build && <DetailLong label="Hope to Build" value={selected.hope_to_build} />}
              </DetailSection>

              {/* Admin controls */}
              <DetailSection title="Organizer Controls">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1.5">
                      Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as Status)}
                      className="w-full px-3 py-2 rounded-lg text-sm text-white border border-white/8 bg-[#111827] focus:outline-none focus:border-accent-500/50 transition-all"
                    >
                      {Object.entries(STATUS_LABELS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-1.5">
                      Organizer Notes
                    </label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-slate-600 border border-white/8 bg-[#111827] focus:outline-none focus:border-accent-500/50 transition-all resize-none"
                      placeholder="Private notes..."
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={saveChanges}
                      disabled={saving}
                      className="btn-primary flex-1 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    {saveMsg && (
                      <span className="text-xs text-emerald-400">{saveMsg}</span>
                    )}
                  </div>
                </div>
              </DetailSection>

              {/* Danger zone */}
              <div className="rounded-xl border border-red-500/15 bg-red-500/5 p-4">
                <h4 className="text-xs font-semibold text-red-400 mb-3">Danger Zone</h4>
                {deleteConfirm === selected.id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteRegistration(selected.id)}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="flex-1 py-2 rounded-lg border border-white/10 text-slate-400 text-xs uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(selected.id)}
                    className="w-full py-2 rounded-lg border border-red-500/30 text-red-400 text-xs uppercase tracking-wider hover:bg-red-500/10 transition-colors"
                  >
                    Delete Registration
                  </button>
                )}
                <p className="mt-2 text-[10px] text-slate-600">
                  Use only to fulfil a data deletion request. This cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#0c1221] p-4">
      <div className={`text-3xl font-black mb-0.5 ${accent ? "text-accent-400" : "text-white"}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 mb-3">{title}</h3>
      <div className="rounded-xl border border-white/5 bg-[#111827] p-4 space-y-2.5">
        {children}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-slate-600 shrink-0 mt-0.5">{label}</span>
      <span className="text-xs text-slate-300 text-right">{value || "—"}</span>
    </div>
  );
}

function DetailLong({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-600 mb-1">{label}</div>
      <div className="text-xs text-slate-300 leading-relaxed">{value}</div>
    </div>
  );
}
