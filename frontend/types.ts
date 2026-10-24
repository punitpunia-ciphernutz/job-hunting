export type ApplicationStatus = "applied" | "interview" | "rejected" | "offer" | "scam";

export interface ClassifiedEmail {
  email_id: number;
  company_name: string;
  role: string;
  sender: string;
  date: string;
  status: ApplicationStatus;
  summary: string;
  scam_reasons: string[];
  scam_risk_tags: string[];
  followup_subject: string | null;
  followup_body: string | null;
}

export interface ConsolidatedApplication {
  company_key: string;
  company_name: string;
  role: string;
  current_status: "applied" | "interview" | "rejected" | "offer";
  latest_date: string;
  days_since_last_email: number;
  followup_due: boolean;
  followup_subject: string | null;
  followup_body: string | null;
  email_count: number;
  timeline: ClassifiedEmail[];
}

export interface ProcessInboxResponse {
  total_emails: number;
  scam_count: number;
  active_interviews: number;
  genuine_offers: number;
  followups_due_count: number;
  companies_tracked_count: number;
  reference_date: string;
  engine_used: string;
  scam_quarantine: ClassifiedEmail[];
  consolidated_applications: ConsolidatedApplication[];
  all_classified: ClassifiedEmail[];
}

export interface RawEmailInput {
  id: number;
  date: string;
  from: string;
  subject: string;
  body: string;
}
