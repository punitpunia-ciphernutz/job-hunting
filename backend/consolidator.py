import re
from datetime import datetime
from typing import List, Dict, Tuple
from backend.schemas import ClassifiedEmail, ConsolidatedApplication

# Status priority for ordering if same date, or chronological progression
STATUS_PROGRESSION = {
    "applied": 1,
    "interview": 2,
    "rejected": 3,
    "offer": 4
}

def normalize_company_key(company_name: str) -> str:
    cleaned = re.sub(r"[^a-zA-Z0-9]", "", company_name).lower()
    # Normalize common suffixes
    for suffix in ["india", "ai", "labs", "tech", "io", "co", "dev"]:
        if cleaned.endswith(suffix) and len(cleaned) > len(suffix) + 3:
            pass  # keep distinguishing Paystack India or NovaData AI if appropriate
    return cleaned

def parse_date(date_str: str) -> datetime:
    try:
        return datetime.strptime(date_str.strip(), "%Y-%m-%d")
    except Exception:
        try:
            return datetime.fromisoformat(date_str.strip())
        except Exception:
            return datetime(2026, 10, 24)

def consolidate_threads(
    classified_emails: List[ClassifiedEmail],
    reference_date_str: str = "2026-10-24"
) -> Tuple[List[ConsolidatedApplication], List[ClassifiedEmail]]:
    """
    Groups legitimate classified emails ("applied", "interview", "rejected", "offer")
    by normalized company key into consolidated applications.
    Quarantines "scam" emails separately.
    Calculates 7-day follow-up logic relative to reference_date_str.
    """
    ref_dt = parse_date(reference_date_str)
    
    scam_quarantine: List[ClassifiedEmail] = []
    company_groups: Dict[str, List[ClassifiedEmail]] = {}
    
    for email in classified_emails:
        if email.status == "scam":
            scam_quarantine.append(email)
            continue
            
        key = normalize_company_key(email.company_name)
        if key not in company_groups:
            company_groups[key] = []
        company_groups[key].append(email)

    consolidated_apps: List[ConsolidatedApplication] = []

    for comp_key, emails in company_groups.items():
        # Sort timeline chronologically (oldest to newest)
        emails.sort(key=lambda x: (parse_date(x.date), x.email_id))
        
        # Latest email determines the current state
        latest_email = emails[-1]
        latest_dt = parse_date(latest_email.date)
        
        days_waiting = (ref_dt - latest_dt).days
        if days_waiting < 0:
            days_waiting = 0
            
        followup_due = (latest_email.status == "applied" and days_waiting >= 7)
        
        # Use latest role or best known role
        role = latest_email.role or "Backend Engineer"
        for e in reversed(emails):
            if e.role and e.role != "Backend Engineer":
                role = e.role
                break

        consolidated_apps.append(ConsolidatedApplication(
            company_key=comp_key,
            company_name=latest_email.company_name,
            role=role,
            current_status=latest_email.status,  # latest stage ("applied" | "interview" | "rejected" | "offer")
            latest_date=latest_email.date,
            days_since_last_email=days_waiting,
            followup_due=followup_due,
            followup_subject=latest_email.followup_subject,
            followup_body=latest_email.followup_body,
            email_count=len(emails),
            timeline=emails
        ))

    # Sort applications: offers first, then interviews, then applied (overdue first), then rejected
    def sort_order(app: ConsolidatedApplication):
        status_rank = {
            "offer": 0,
            "interview": 1,
            "applied": 2,
            "rejected": 3
        }.get(app.current_status, 4)
        overdue_rank = 0 if app.followup_due else 1
        return (status_rank, overdue_rank, -app.days_since_last_email, app.company_name)

    consolidated_apps.sort(key=sort_order)
    # Sort scams: latest first
    scam_quarantine.sort(key=lambda x: parse_date(x.date), reverse=True)

    return consolidated_apps, scam_quarantine
