export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getDb, RegistrationStatus } from "@/lib/db";

const VALID_STATUSES: RegistrationStatus[] = [
  "submitted",
  "under_review",
  "shortlisted",
  "waitlisted",
  "withdrawn",
];

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const row = db.prepare("SELECT * FROM registrations WHERE id = ?").get(id);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ registration: row });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();

  const existing = db.prepare("SELECT id FROM registrations WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const body = await req.json();
  const now = new Date().toISOString();
  const updates: string[] = [];
  const values: (string | number | null)[] = [];

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    updates.push("status = ?");
    values.push(body.status);
  }

  if (body.adminNotes !== undefined) {
    updates.push("admin_notes = ?");
    values.push(typeof body.adminNotes === "string" ? body.adminNotes.trim() || null : null);
  }

  if (updates.length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  updates.push("updated_at = ?");
  values.push(now);
  values.push(id);

  db.prepare(`UPDATE registrations SET ${updates.join(", ")} WHERE id = ?`).run(...values);

  return NextResponse.json({ success: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const existing = db.prepare("SELECT id FROM registrations WHERE id = ?").get(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  db.prepare("DELETE FROM registrations WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
