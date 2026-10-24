import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// In production, set DB_PATH env var to point to a persistent volume path.
// On Railway: set DB_PATH=/data/registrations.db and mount a volume at /data.
// Default falls back to <cwd>/data/registrations.db (fine for development).
const DB_DIR = process.env.DB_PATH
  ? path.dirname(process.env.DB_PATH)
  : path.join(process.cwd(), "data");
const DB_PATH = process.env.DB_PATH ?? path.join(DB_DIR, "registrations.db");

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

function initDb(): Database.Database {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY,
      reference_id TEXT UNIQUE NOT NULL,
      participation_type TEXT NOT NULL CHECK(participation_type IN ('individual','team_2','team_3')),
      team_name TEXT,
      status TEXT NOT NULL DEFAULT 'submitted'
        CHECK(status IN ('submitted','under_review','shortlisted','waitlisted','withdrawn')),

      -- Primary participant / team leader
      leader_name TEXT NOT NULL,
      leader_grade TEXT NOT NULL,
      leader_class TEXT NOT NULL,
      leader_student_id TEXT,
      leader_email TEXT,
      leader_phone TEXT,
      leader_whatsapp_consent INTEGER NOT NULL DEFAULT 0,

      -- Team member 2
      member2_name TEXT,
      member2_grade TEXT,
      member2_class TEXT,
      member2_student_id TEXT,

      -- Team member 3
      member3_name TEXT,
      member3_grade TEXT,
      member3_class TEXT,
      member3_student_id TEXT,

      -- Startup idea
      idea_status TEXT CHECK(idea_status IN ('yes','rough','no')),
      startup_name TEXT,
      idea_description TEXT,
      problem_solved TEXT,
      progress_so_far TEXT,
      demo_plan TEXT,
      rough_direction TEXT,
      problem_interest TEXT,
      build_plan TEXT,
      industry_interest TEXT,
      hope_to_build TEXT,

      -- Meta
      agreed_to_terms INTEGER NOT NULL DEFAULT 1,
      admin_notes TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS admin_sessions (
      token_id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
  `);

  return db;
}

export function getDb(): Database.Database {
  if (process.env.NODE_ENV === "development") {
    if (!global.__db) {
      global.__db = initDb();
    }
    return global.__db;
  }
  const db = initDb();
  return db;
}

export type RegistrationStatus =
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "waitlisted"
  | "withdrawn";

export interface Registration {
  id: string;
  reference_id: string;
  participation_type: "individual" | "team_2" | "team_3";
  team_name: string | null;
  status: RegistrationStatus;
  leader_name: string;
  leader_grade: string;
  leader_class: string;
  leader_student_id: string | null;
  leader_email: string | null;
  leader_phone: string | null;
  leader_whatsapp_consent: 0 | 1;
  member2_name: string | null;
  member2_grade: string | null;
  member2_class: string | null;
  member2_student_id: string | null;
  member3_name: string | null;
  member3_grade: string | null;
  member3_class: string | null;
  member3_student_id: string | null;
  idea_status: "yes" | "rough" | "no" | null;
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
  agreed_to_terms: 0 | 1;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}
