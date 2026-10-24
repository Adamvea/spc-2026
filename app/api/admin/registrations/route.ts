export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getDb, Registration } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() ?? "";
    const status = searchParams.get("status") ?? "";
    const type = searchParams.get("type") ?? "";

    let query = "SELECT * FROM registrations WHERE 1=1";
    const params: (string | number)[] = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (type) {
      query += " AND participation_type = ?";
      params.push(type);
    }

    query += " ORDER BY created_at DESC";

    let rows = db.prepare(query).all(...params) as Registration[];

    if (search) {
      rows = rows.filter((r) => {
        const searchable = [
          r.leader_name,
          r.team_name,
          r.startup_name,
          r.leader_grade,
          r.reference_id,
          r.member2_name,
          r.member3_name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(search);
      });
    }

    // Remove sensitive fields from list view
    const sanitized = rows.map(({ leader_phone, leader_student_id, member2_student_id, member3_student_id, ...rest }) => rest);

    const total = db.prepare("SELECT COUNT(*) as count FROM registrations").get() as { count: number };
    const teams = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE participation_type != 'individual'").get() as { count: number };
    const byStatus = db.prepare("SELECT status, COUNT(*) as count FROM registrations GROUP BY status").all() as { status: string; count: number }[];

    return NextResponse.json({
      registrations: sanitized,
      stats: {
        total: total.count,
        teams: teams.count,
        individuals: total.count - teams.count,
        byStatus,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch registrations." }, { status: 500 });
  }
}
