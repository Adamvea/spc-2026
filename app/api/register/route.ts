export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

function generateReference(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SPC-${ymd}-${rand}`;
}

function sanitize(val: unknown): string | null {
  if (typeof val !== "string") return null;
  const s = val.trim();
  return s.length > 0 ? s : null;
}

function sanitizeRequired(val: unknown, field: string): string {
  const s = sanitize(val);
  if (!s) throw new Error(`${field} is required.`);
  return s;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const participation_type = body.participationType;
    if (!["individual", "team_2", "team_3"].includes(participation_type)) {
      return NextResponse.json({ error: "Invalid participation type." }, { status: 400 });
    }

    const leader_name = sanitizeRequired(body.leaderName, "Full name");
    const leader_grade = sanitizeRequired(body.leaderGrade, "Grade");
    const leader_class = sanitizeRequired(body.leaderClass, "Class and section");

    if (!["7", "8", "9", "10", "11", "12"].includes(leader_grade)) {
      return NextResponse.json({ error: "Grade must be between 7 and 12." }, { status: 400 });
    }

    const leader_student_id = sanitize(body.leaderStudentId);
    const leader_email = sanitize(body.leaderEmail);
    const leader_phone = sanitize(body.leaderPhone);
    const leader_whatsapp_consent = body.leaderWhatsappConsent === true ? 1 : 0;
    const team_name = sanitize(body.teamName);

    // Validate email format if provided
    if (leader_email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(leader_email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
      }
    }

    // Member 2
    let member2_name: string | null = null;
    let member2_grade: string | null = null;
    let member2_class: string | null = null;
    let member2_student_id: string | null = null;

    if (participation_type === "team_2" || participation_type === "team_3") {
      member2_name = sanitizeRequired(body.member2Name, "Team member 2 full name");
      member2_grade = sanitizeRequired(body.member2Grade, "Team member 2 grade");
      member2_class = sanitizeRequired(body.member2Class, "Team member 2 class");
      member2_student_id = sanitize(body.member2StudentId);
    }

    // Member 3
    let member3_name: string | null = null;
    let member3_grade: string | null = null;
    let member3_class: string | null = null;
    let member3_student_id: string | null = null;

    if (participation_type === "team_3") {
      member3_name = sanitizeRequired(body.member3Name, "Team member 3 full name");
      member3_grade = sanitizeRequired(body.member3Grade, "Team member 3 grade");
      member3_class = sanitizeRequired(body.member3Class, "Team member 3 class");
      member3_student_id = sanitize(body.member3StudentId);
    }

    // Idea section
    const idea_status = sanitize(body.ideaStatus);
    if (idea_status && !["yes", "rough", "no"].includes(idea_status)) {
      return NextResponse.json({ error: "Invalid idea status." }, { status: 400 });
    }

    const idea_description = sanitize(body.ideaDescription);
    const problem_solved = sanitize(body.problemSolved);
    const progress_so_far = sanitize(body.progressSoFar);
    const demo_plan = sanitize(body.demoPlan);
    const startup_name = sanitize(body.startupName);
    const rough_direction = sanitize(body.roughDirection);
    const problem_interest = sanitize(body.problemInterest);
    const build_plan = sanitize(body.buildPlan);
    const industry_interest = sanitize(body.industryInterest);
    const hope_to_build = sanitize(body.hopeToBuild);

    if (!body.agreedToTerms) {
      return NextResponse.json({ error: "You must agree to the competition terms." }, { status: 400 });
    }

    const db = getDb();
    const now = new Date().toISOString();

    // Duplicate check — same leader name + grade + class
    const existing = db
      .prepare(
        "SELECT id FROM registrations WHERE lower(leader_name)=lower(?) AND leader_grade=? AND lower(leader_class)=lower(?)"
      )
      .get(leader_name, leader_grade, leader_class);

    if (existing) {
      return NextResponse.json(
        { error: "A registration with this name, grade and class already exists. If this is a mistake, please contact the organizers." },
        { status: 409 }
      );
    }

    const id = uuidv4();
    const reference_id = generateReference();

    db.prepare(`
      INSERT INTO registrations (
        id, reference_id, participation_type, team_name, status,
        leader_name, leader_grade, leader_class, leader_student_id,
        leader_email, leader_phone, leader_whatsapp_consent,
        member2_name, member2_grade, member2_class, member2_student_id,
        member3_name, member3_grade, member3_class, member3_student_id,
        idea_status, startup_name, idea_description, problem_solved,
        progress_so_far, demo_plan, rough_direction, problem_interest,
        build_plan, industry_interest, hope_to_build,
        agreed_to_terms, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, 'submitted',
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        1, ?, ?
      )
    `).run(
      id, reference_id, participation_type, team_name,
      leader_name, leader_grade, leader_class, leader_student_id,
      leader_email, leader_phone, leader_whatsapp_consent,
      member2_name, member2_grade, member2_class, member2_student_id,
      member3_name, member3_grade, member3_class, member3_student_id,
      idea_status, startup_name, idea_description, problem_solved,
      progress_so_far, demo_plan, rough_direction, problem_interest,
      build_plan, industry_interest, hope_to_build,
      now, now
    );

    return NextResponse.json({
      success: true,
      referenceId: reference_id,
      teamName: team_name,
      participationType: participation_type,
      leaderName: leader_name,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
