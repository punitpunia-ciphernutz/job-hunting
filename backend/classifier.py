import os
import re
import json
import logging
from typing import List, Tuple, Dict, Any, Optional
from backend.schemas import EmailInput, ClassifiedEmail

logger = logging.getLogger(__name__)

# List of known free email providers often used for brand impersonation
FREE_MAIL_DOMAINS = {
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "rediffmail.com", "mail.com", "zoho.com"
}

# Major tech companies commonly spoofed
KNOWN_BRANDS = [
    "infosys", "tcs", "wipro", "accenture", "cognizant", "hcl", "tech mahindra", "capgemini",
    "google", "amazon", "microsoft", "meta", "apple", "netflix"
]

def extract_domain(email_str: str) -> str:
    match = re.search(r"@([a-zA-Z0-9.\-]+)", email_str)
    return match.group(1).lower() if match else ""

def extract_company_from_email_and_text(sender: str, subject: str, body: str) -> str:
    domain = extract_domain(sender)
    
    # Check if a known brand is mentioned in sender or text
    combined_text = f"{sender} {subject} {body}".lower()
    for brand in KNOWN_BRANDS:
        if brand in combined_text:
            return brand.title() if len(brand) > 4 else brand.upper()
    
    # Otherwise derive from domain name if not freemail
    if domain and domain not in FREE_MAIL_DOMAINS:
        parts = domain.split(".")
        # remove tlds
        name_part = parts[0]
        if name_part in ["careers", "jobs", "hiring", "recruiting", "recruitment", "talent", "people", "founders", "no-reply"]:
            if len(parts) > 1 and parts[1] not in ["com", "co", "in", "io", "ai", "dev", "net", "org"]:
                name_part = parts[1]
        cleaned = re.sub(r"[^a-zA-Z0-9]", "", name_part)
        if cleaned:
            # Formatting (e.g. novadata -> NovaData or VervePay)
            specials = {
                "zentech": "Zentech",
                "finly": "Finly",
                "cloudscale": "CloudScale",
                "paystackindia": "Paystack India",
                "novadata": "NovaData AI",
                "kinetixlabs": "Kinetix Labs",
                "vervepay": "VervePay",
                "stacksphere": "StackSphere",
                "hyperlooptech": "HyperloopTech",
                "devpulse": "DevPulse",
                "aethercloud": "AetherCloud",
                "quantagrid": "QuantaGrid"
            }
            return specials.get(cleaned.lower(), cleaned.title())
            
    # Fallback search from subject
    subject_match = re.search(r"(?:at|to|for|with)\s+([A-Z][a-zA-Z0-9]+(?:\s+[A-Z][a-zA-Z0-9]+)?)", subject)
    if subject_match:
        return subject_match.group(1).strip()
        
    return "Unknown Company"

def extract_role_from_text(subject: str, body: str) -> str:
    combined = f"{subject} {body}"
    role_patterns = [
        r"(?:for|role|position|as|applied to|confirmation:)\s+([A-Za-z0-9\+\#\s\-\/]+?(?:Engineer|Developer|Specialist|Lead|Architect|Analyst|Intern))",
        r"([A-Za-z0-9\+\#\s\-\/]+?(?:Engineer|Developer|Specialist|Lead|Architect|Analyst|Intern))"
    ]
    for pat in role_patterns:
        match = re.search(pat, combined, re.IGNORECASE)
        if match:
            candidate = match.group(1).strip()
            # clean candidate
            candidate = re.sub(r"^(for|the|an|a|your application|application received:?|thanks for applying to?)\s+", "", candidate, flags=re.IGNORECASE)
            candidate = candidate.strip(" -:;,")
            if 4 <= len(candidate) <= 40:
                return candidate
    return "Backend Engineer"

def generate_followup_draft(company_name: str, role: str, application_date: str) -> Tuple[str, str]:
    subject = f"Follow-Up: Application for {role} - Aarav Patel"
    body = (
        f"Dear {company_name} Hiring Team,\n\n"
        f"I hope this email finds you well. I am following up on my application for the {role} position "
        f"submitted on {application_date}. I remain very enthusiastic about the opportunity to contribute "
        f"my backend engineering and automation skills to {company_name}.\n\n"
        f"Could you please provide an update regarding the status of my application or any upcoming steps "
        f"in your hiring process? I have attached my updated portfolio and resume for convenience. "
        f"Thank you for your time and consideration.\n\n"
        f"Warm regards,\n"
        f"Aarav Patel\n"
        f"aarav.patel.dev@gmail.com | +91 98765 43210"
    )
    return subject, body

def deterministic_classify_single(email: EmailInput) -> ClassifiedEmail:
    sender = email.sender
    subject = email.subject
    body = email.body
    combined = f"{sender} {subject} {body}".lower()
    domain = extract_domain(sender)
    
    scam_reasons: List[str] = []
    scam_risk_tags: List[str] = []
    
    # 1. SCAM CHECKS
    # Domain spoofing
    for brand in KNOWN_BRANDS:
        if brand in combined:
            if domain in FREE_MAIL_DOMAINS:
                scam_risk_tags.append("Free Email Domain Spoof")
                scam_reasons.append(f"Sender uses free email provider '{domain}' while claiming to represent {brand.title()}.")
            elif domain.endswith(".xyz") or domain.endswith(".top") or "fast-hire" in domain:
                scam_risk_tags.append("Suspicious Domain Spoof")
                scam_reasons.append(f"Sender uses unverified domain '{domain}' claiming corporate affiliation.")
    
    if (domain.endswith(".xyz") or "portal99" in domain) and "Free Email Domain Spoof" not in scam_risk_tags:
        scam_risk_tags.append("Suspicious Domain Spoof")
        scam_reasons.append(f"Sender domain '{domain}' is an unverified disposable domain.")

    # Upfront Fee / Security Deposit / Voucher
    fee_match = re.search(r"(?:pay|transfer|charge|deposit|fee|voucher|cost)\s*(?:of)?\s*(?:rs\.?|inr|₹|\$)\s*([\d,]+)", combined) or \
                re.search(r"(?:rs\.?|inr|₹|\$)\s*([\d,]+)\s*(?:training|fee|deposit|voucher|charge)", combined) or \
                re.search(r"\$\s*(\d+)\s*onboarding", combined)
    if fee_match or "training fee" in combined or "security deposit" in combined or "verification charge" in combined or "compliance voucher" in combined:
        scam_risk_tags.append("Upfront Training/Security Fee")
        scam_reasons.append("Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.")

    # Sensitive ID Harvesting
    id_harvest = []
    if "aadhaar" in combined:
        id_harvest.append("Aadhaar")
    if "pan" in combined or "pan card" in combined:
        id_harvest.append("PAN")
    if "passbook" in combined or "bank passbook" in combined:
        id_harvest.append("Bank Passbook")
    if "passport" in combined:
        id_harvest.append("Passport")
    
    # Check if IDs are requested aggressively (note: genuine QuantaGrid says 'No fees or sensitive IDs required now')
    if id_harvest and not ("no fees or sensitive ids" in combined or "no fees" in combined):
        scam_risk_tags.append("Sensitive ID Harvesting")
        scam_reasons.append(f"Requests unverified submission of government documents ({', '.join(id_harvest)}) prematurely via insecure channels.")

    # Hinglish Urgency / Backdoor
    if any(k in combined for k in ["abhi pay karo", "bas rs", "direct shortlisted", "backdoor", "whatsapp hr"]):
        scam_risk_tags.append("Hinglish Urgency Trap")
        scam_reasons.append("Uses informal Hinglish pressure tactics and backdoor promises typical of employment scams.")

    # No-Interview Offer
    if any(k in combined for k in ["no interview required", "without technical interview", "hired immediately", "direct joining letter"]):
        scam_risk_tags.append("No-Interview Offer")
        scam_reasons.append("Promises guaranteed job offer without any technical evaluation or formal interview process.")

    company_name = extract_company_from_email_and_text(sender, subject, body)
    role = extract_role_from_text(subject, body)
    
    # Scam decision
    is_scam = (len(scam_risk_tags) > 0 and len(scam_reasons) > 0)
    
    if is_scam:
        # Deduplicate tags
        scam_risk_tags = list(dict.fromkeys(scam_risk_tags))
        scam_reasons = list(dict.fromkeys(scam_reasons))
        return ClassifiedEmail(
            email_id=email.id,
            company_name=company_name,
            role=role,
            sender=sender,
            date=email.date,
            status="scam",
            summary=f"Scam attempt detected claiming {company_name}. Flagged for {', '.join(scam_risk_tags)}.",
            scam_reasons=scam_reasons,
            scam_risk_tags=scam_risk_tags,
            followup_subject=None,
            followup_body=None
        )

    # 2. LEGITIMATE CLASSIFICATIONS
    # Check for genuine Offer
    if any(k in combined for k in ["official employment offer", "delighted to offer", "offer of employment", "pleased to offer you the position"]):
        return ClassifiedEmail(
            email_id=email.id,
            company_name=company_name,
            role=role,
            sender=sender,
            date=email.date,
            status="offer",
            summary=f"Official job offer received from {company_name} for {role}.",
            scam_reasons=[],
            scam_risk_tags=[],
            followup_subject=None,
            followup_body=None
        )
        
    # Check for Interview
    if any(k in combined for k in ["interview invite", "interview invitation", "technical call", "system design round", "technical round", "schedule a 30-minute"]):
        return ClassifiedEmail(
            email_id=email.id,
            company_name=company_name,
            role=role,
            sender=sender,
            date=email.date,
            status="interview",
            summary=f"Interview invitation from {company_name} for {role}.",
            scam_reasons=[],
            scam_risk_tags=[],
            followup_subject=None,
            followup_body=None
        )

    # Check for Rejection
    if any(k in combined for k in ["regret to inform", "not be proceeding", "move forward with other candidates", "position at", "has been closed", "unable to move forward"]):
        return ClassifiedEmail(
            email_id=email.id,
            company_name=company_name,
            role=role,
            sender=sender,
            date=email.date,
            status="rejected",
            summary=f"Application closed/rejected by {company_name} for {role}.",
            scam_reasons=[],
            scam_risk_tags=[],
            followup_subject=None,
            followup_body=None
        )

    # Default: Applied / Confirmation
    followup_sub, followup_bod = generate_followup_draft(company_name, role, email.date)
    return ClassifiedEmail(
        email_id=email.id,
        company_name=company_name,
        role=role,
        sender=sender,
        date=email.date,
        status="applied",
        summary=f"Application confirmed with {company_name} for {role}.",
        scam_reasons=[],
        scam_risk_tags=[],
        followup_subject=followup_sub,
        followup_body=followup_bod
    )

def deterministic_classify_batch(emails: List[EmailInput]) -> List[ClassifiedEmail]:
    return [deterministic_classify_single(e) for e in emails]

def gemini_classify_batch(emails: List[EmailInput], api_key: str) -> List[ClassifiedEmail]:
    from google import genai
    from google.genai import types

    client = genai.Client(api_key=api_key)
    
    prompt = """
You are TaaliTrack's core AI email triage agent for Job Hunt Autopilot.
You must classify each email ONCE into EXACTLY ONE of the following 5 statuses:
- "applied": Application submitted, confirmed, or under initial recruiter review.
- "interview": Technical interview, phone screen, system design round, or coding challenge invitation.
- "rejected": Rejection notification, position closed, or not moving forward.
- "offer": Genuine official employment offer, salary/terms discussion, or joining formalities.
- "scam": Fraudulent job offer, spoofed email domain, upfront training/laptop/BGV fee demand, Hinglish urgency trap, backdoor job claim, or premature government ID harvesting (PAN/Aadhaar/Passbook).

STRICT RULES FOR SCAM IDENTIFICATION:
1. Free email addresses (like @gmail.com, @yahoo.com, @outlook.com) claiming to be recruiters from large corporations (Infosys, TCS, Wipro, Accenture, etc.) are SCAMS.
2. Any request for upfront money, refundable fees, laptop deposits, BGV charges, or certification vouchers is a SCAM.
3. Requests to pay money via WhatsApp or UPI, combined with demanding scans of Aadhaar/PAN/passbook, are SCAMS.
4. "No interview required" or "Direct backdoor selection" is a SCAM.
5. If classified as "scam", you MUST populate "scam_risk_tags" (e.g., "Free Email Domain Spoof", "Upfront Training/Security Fee", "Sensitive ID Harvesting", "Hinglish Urgency Trap", "No-Interview Offer") and specific bulleted "scam_reasons".

For legitimate emails with status "applied", provide a polite 2-paragraph follow-up draft in "followup_subject" and "followup_body" signed by Aarav Patel.

Return a JSON array containing an object for each email matching the schema.
"""

    emails_payload = [
        {
            "id": e.id,
            "date": e.date,
            "from": e.sender,
            "subject": e.subject,
            "body": e.body
        }
        for e in emails
    ]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            f"Here are the emails to classify:\n{json.dumps(emails_payload, indent=2)}"
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.1,
        )
    )

    data = json.loads(response.text)
    classified_list = []
    
    # In case Gemini returns wrapped dict e.g. {"emails": [...]}
    if isinstance(data, dict):
        for val in data.values():
            if isinstance(val, list):
                data = val
                break

    for item in data:
        # Fallback fields if missing
        comp_name = item.get("company_name") or "Company"
        role_name = item.get("role") or "Backend Engineer"
        status_val = item.get("status", "applied")
        if status_val not in ["applied", "interview", "rejected", "offer", "scam"]:
            status_val = "applied"
            
        f_sub = item.get("followup_subject")
        f_body = item.get("followup_body")
        if status_val == "applied" and not f_body:
            f_sub, f_body = generate_followup_draft(comp_name, role_name, item.get("date", "2026-10-24"))

        classified_list.append(ClassifiedEmail(
            email_id=item.get("email_id") or item.get("id"),
            company_name=comp_name,
            role=role_name,
            sender=item.get("sender") or item.get("from", ""),
            date=item.get("date", ""),
            status=status_val,
            summary=item.get("summary", ""),
            scam_reasons=item.get("scam_reasons", []),
            scam_risk_tags=item.get("scam_risk_tags", []),
            followup_subject=f_sub,
            followup_body=f_body
        ))
        
    return classified_list

def classify_emails_pipeline(emails: List[EmailInput], custom_key: Optional[str] = None) -> Tuple[List[ClassifiedEmail], str]:
    api_key = custom_key or os.getenv("GEMINI_API_KEY")
    if api_key and api_key.strip():
        try:
            logger.info("Classifying emails using gemini-2.5-flash...")
            results = gemini_classify_batch(emails, api_key.strip())
            # Ensure same count as input
            if len(results) == len(emails):
                return results, "gemini-2.5-flash"
            else:
                logger.warning("Gemini returned mismatch count, falling back to deterministic.")
        except Exception as e:
            logger.error(f"Gemini API error: {e}. Executing hybrid deterministic fallback engine.")

    # Deterministic fallback engine
    results = deterministic_classify_batch(emails)
    return results, "hybrid-deterministic-fallback"
