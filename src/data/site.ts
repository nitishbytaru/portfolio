export const RESUME_URL =
  "https://drive.google.com/file/d/1z7Y0If8Jc4Zd7apdLeXtFzNK12eQ80gi/view?usp=drive_link";

export const EMAIL = "bndnitish24@gmail.com";

export interface Internship {
  company: string;
  role: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM" */
  end: string;
}

// Newest first. Home's stack, timeline and count all come from this list.
export const INTERNSHIPS: Internship[] = [
  { company: "Infosys", role: "System Engineer Intern", start: "2025-12", end: "2026-05" },
  { company: "Evaluate Health", role: "Frontend Intern", start: "2025-07", end: "2025-11" },
];

export const INTERNSHIP_COUNT = INTERNSHIPS.length;
