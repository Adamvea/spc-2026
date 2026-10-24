export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb, Registration } from "@/lib/db";

function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM registrations ORDER BY created_at DESC")
      .all() as Registration[];

    const headers = [
      "Reference",
      "Status",
      "Participation Type",
      "Team Name",
      "Leader Name",
      "Leader Grade",
      "Leader Class",
      "Leader Email",
      "Whatsapp Consent",
      "Member 2 Name",
      "Member 2 Grade",
      "Member 2 Class",
      "Member 3 Name",
      "Member 3 Grade",
      "Member 3 Class",
      "Idea Status",
      "Startup Name",
      "Idea Description",
      "Problem Solved",
      "Progress So Far",
      "Demo Plan",
      "Rough Direction",
      "Problem Interest",
      "Build Plan",
      "Industry Interest",
      "Hope To Build",
      "Registered At",
    ];

    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.reference_id,
          r.status,
          r.participation_type,
          r.team_name,
          r.leader_name,
          r.leader_grade,
          r.leader_class,
          r.leader_email,
          r.leader_whatsapp_consent ? "Yes" : "No",
          r.member2_name,
          r.member2_grade,
          r.member2_class,
          r.member3_name,
          r.member3_grade,
          r.member3_class,
          r.idea_status,
          r.startup_name,
          r.idea_description,
          r.problem_solved,
          r.progress_so_far,
          r.demo_plan,
          r.rough_direction,
          r.problem_interest,
          r.build_plan,
          r.industry_interest,
          r.hope_to_build,
          r.created_at,
        ]
          .map(escapeCSV)
          .join(",")
      ),
    ];

    const csv = csvRows.join("\n");
    const timestamp = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="spc-registrations-${timestamp}.csv"`,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Export failed." }, { status: 500 });
  }
}
