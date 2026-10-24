import { ProcessInboxResponse } from "../types";

export const SAMPLE_INBOX_RESPONSE: ProcessInboxResponse = {
  "total_emails": 20,
  "scam_count": 4,
  "active_interviews": 2,
  "genuine_offers": 2,
  "followups_due_count": 4,
  "companies_tracked_count": 12,
  "reference_date": "2026-10-24",
  "engine_used": "hybrid-deterministic-fallback",
  "scam_quarantine": [
    {
      "email_id": 20,
      "company_name": "Fasthireportal99",
      "role": "Remote Python Developer",
      "sender": "global-hr-onboarding@fast-hire-portal99.xyz",
      "date": "2026-10-22",
      "status": "scam",
      "summary": "Scam attempt detected claiming Fasthireportal99. Flagged for Suspicious Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, No-Interview Offer.",
      "scam_reasons": [
        "Sender domain 'fast-hire-portal99.xyz' is an unverified disposable domain.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Passport) prematurely via insecure channels.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Suspicious Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 19,
      "company_name": "Accenture",
      "role": "Backend Engineer",
      "sender": "recruitment.accenture.india.desk@outlook.com",
      "date": "2026-10-21",
      "status": "scam",
      "summary": "Scam attempt detected claiming Accenture. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, No-Interview Offer.",
      "scam_reasons": [
        "Sender uses free email provider 'outlook.com' while claiming to represent Accenture.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, Bank Passbook) prematurely via insecure channels.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 18,
      "company_name": "TCS",
      "role": "Backend Engineer",
      "sender": "tcs.direct.joining2026@yahoo.com",
      "date": "2026-10-17",
      "status": "scam",
      "summary": "Scam attempt detected claiming TCS. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, Hinglish Urgency Trap, No-Interview Offer.",
      "scam_reasons": [
        "Sender uses free email provider 'yahoo.com' while claiming to represent Tcs.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, PAN) prematurely via insecure channels.",
        "Uses informal Hinglish pressure tactics and backdoor promises typical of employment scams.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "Hinglish Urgency Trap",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 2,
      "company_name": "Infosys",
      "role": "Software Engineer",
      "sender": "hr.infosys.jobs@gmail.com",
      "date": "2026-10-14",
      "status": "scam",
      "summary": "Scam attempt detected claiming Infosys. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting.",
      "scam_reasons": [
        "Sender uses free email provider 'gmail.com' while claiming to represent Infosys.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, PAN) prematurely via insecure channels."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting"
      ],
      "followup_subject": null,
      "followup_body": null
    }
  ],
  "consolidated_applications": [
    {
      "company_key": "devpulse",
      "company_name": "DevPulse",
      "role": "Backend Software Engineer",
      "current_status": "offer",
      "latest_date": "2026-10-22",
      "days_since_last_email": 2,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 3,
      "timeline": [
        {
          "email_id": 13,
          "company_name": "DevPulse",
          "role": "Backend Software Engineer",
          "sender": "careers@devpulse.io",
          "date": "2026-10-05",
          "status": "applied",
          "summary": "Application confirmed with DevPulse for Backend Software Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Backend Software Engineer - Aarav Patel",
          "followup_body": "Dear DevPulse Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Backend Software Engineer position submitted on 2026-10-05. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to DevPulse.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        },
        {
          "email_id": 14,
          "company_name": "DevPulse",
          "role": "Backend Engineer",
          "sender": "careers@devpulse.io",
          "date": "2026-10-14",
          "status": "interview",
          "summary": "Interview invitation from DevPulse for Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        },
        {
          "email_id": 15,
          "company_name": "DevPulse",
          "role": "Backend Software Engineer",
          "sender": "careers@devpulse.io",
          "date": "2026-10-22",
          "status": "offer",
          "summary": "Official job offer received from DevPulse for Backend Software Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "quantagrid",
      "company_name": "QuantaGrid",
      "role": "Backend Engineer",
      "current_status": "offer",
      "latest_date": "2026-10-23",
      "days_since_last_email": 1,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 1,
      "timeline": [
        {
          "email_id": 17,
          "company_name": "QuantaGrid",
          "role": "Backend Engineer",
          "sender": "hr@quantagrid.co.in",
          "date": "2026-10-23",
          "status": "offer",
          "summary": "Official job offer received from QuantaGrid for Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "finly",
      "company_name": "Finly",
      "role": "Senior Python Engineer",
      "current_status": "interview",
      "latest_date": "2026-10-18",
      "days_since_last_email": 6,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 2,
      "timeline": [
        {
          "email_id": 4,
          "company_name": "Finly",
          "role": "Senior Python Engineer",
          "sender": "talent@finly.co",
          "date": "2026-10-08",
          "status": "applied",
          "summary": "Application confirmed with Finly for Senior Python Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Senior Python Engineer - Aarav Patel",
          "followup_body": "Dear Finly Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Senior Python Engineer position submitted on 2026-10-08. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Finly.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        },
        {
          "email_id": 3,
          "company_name": "Finly",
          "role": "Backend Engineer",
          "sender": "talent@finly.co",
          "date": "2026-10-18",
          "status": "interview",
          "summary": "Interview invitation from Finly for Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "aethercloud",
      "company_name": "AetherCloud",
      "role": "Founding Backend Engineer",
      "current_status": "interview",
      "latest_date": "2026-10-20",
      "days_since_last_email": 4,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 1,
      "timeline": [
        {
          "email_id": 16,
          "company_name": "AetherCloud",
          "role": "Founding Backend Engineer",
          "sender": "founders@aethercloud.in",
          "date": "2026-10-20",
          "status": "interview",
          "summary": "Interview invitation from AetherCloud for Founding Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "zentech",
      "company_name": "Zentech",
      "role": "applying for the Backend Engineer",
      "current_status": "applied",
      "latest_date": "2026-10-10",
      "days_since_last_email": 14,
      "followup_due": true,
      "followup_subject": "Follow-Up: Application for applying for the Backend Engineer - Aarav Patel",
      "followup_body": "Dear Zentech Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the applying for the Backend Engineer position submitted on 2026-10-10. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Zentech.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210",
      "email_count": 1,
      "timeline": [
        {
          "email_id": 1,
          "company_name": "Zentech",
          "role": "applying for the Backend Engineer",
          "sender": "careers@zentech.in",
          "date": "2026-10-10",
          "status": "applied",
          "summary": "Application confirmed with Zentech for applying for the Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for applying for the Backend Engineer - Aarav Patel",
          "followup_body": "Dear Zentech Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the applying for the Backend Engineer position submitted on 2026-10-10. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Zentech.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        }
      ]
    },
    {
      "company_key": "cloudscale",
      "company_name": "CloudScale",
      "role": "Platform Engineer",
      "current_status": "applied",
      "latest_date": "2026-10-11",
      "days_since_last_email": 13,
      "followup_due": true,
      "followup_subject": "Follow-Up: Application for Platform Engineer - Aarav Patel",
      "followup_body": "Dear CloudScale Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Platform Engineer position submitted on 2026-10-11. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to CloudScale.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210",
      "email_count": 1,
      "timeline": [
        {
          "email_id": 5,
          "company_name": "CloudScale",
          "role": "Platform Engineer",
          "sender": "jobs@cloudscale.io",
          "date": "2026-10-11",
          "status": "applied",
          "summary": "Application confirmed with CloudScale for Platform Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Platform Engineer - Aarav Patel",
          "followup_body": "Dear CloudScale Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Platform Engineer position submitted on 2026-10-11. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to CloudScale.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        }
      ]
    },
    {
      "company_key": "paystackindia",
      "company_name": "Paystack India",
      "role": "Paystack India - API Engineer",
      "current_status": "applied",
      "latest_date": "2026-10-12",
      "days_since_last_email": 12,
      "followup_due": true,
      "followup_subject": "Follow-Up: Application for Paystack India - API Engineer - Aarav Patel",
      "followup_body": "Dear Paystack India Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Paystack India - API Engineer position submitted on 2026-10-12. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Paystack India.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210",
      "email_count": 1,
      "timeline": [
        {
          "email_id": 6,
          "company_name": "Paystack India",
          "role": "Paystack India - API Engineer",
          "sender": "hiring@paystackindia.com",
          "date": "2026-10-12",
          "status": "applied",
          "summary": "Application confirmed with Paystack India for Paystack India - API Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Paystack India - API Engineer - Aarav Patel",
          "followup_body": "Dear Paystack India Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Paystack India - API Engineer position submitted on 2026-10-12. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Paystack India.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        }
      ]
    },
    {
      "company_key": "novadataai",
      "company_name": "NovaData AI",
      "role": "AI Backend Engineer",
      "current_status": "applied",
      "latest_date": "2026-10-15",
      "days_since_last_email": 9,
      "followup_due": true,
      "followup_subject": "Follow-Up: Application for AI Backend Engineer - Aarav Patel",
      "followup_body": "Dear NovaData AI Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the AI Backend Engineer position submitted on 2026-10-15. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to NovaData AI.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210",
      "email_count": 1,
      "timeline": [
        {
          "email_id": 7,
          "company_name": "NovaData AI",
          "role": "AI Backend Engineer",
          "sender": "careers@novadata.ai",
          "date": "2026-10-15",
          "status": "applied",
          "summary": "Application confirmed with NovaData AI for AI Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for AI Backend Engineer - Aarav Patel",
          "followup_body": "Dear NovaData AI Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the AI Backend Engineer position submitted on 2026-10-15. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to NovaData AI.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        }
      ]
    },
    {
      "company_key": "kinetixlabs",
      "company_name": "Kinetix Labs",
      "role": "Distributed Systems Engineer",
      "current_status": "applied",
      "latest_date": "2026-10-21",
      "days_since_last_email": 3,
      "followup_due": false,
      "followup_subject": "Follow-Up: Application for Distributed Systems Engineer - Aarav Patel",
      "followup_body": "Dear Kinetix Labs Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Distributed Systems Engineer position submitted on 2026-10-21. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Kinetix Labs.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210",
      "email_count": 1,
      "timeline": [
        {
          "email_id": 8,
          "company_name": "Kinetix Labs",
          "role": "Distributed Systems Engineer",
          "sender": "careers@kinetixlabs.dev",
          "date": "2026-10-21",
          "status": "applied",
          "summary": "Application confirmed with Kinetix Labs for Distributed Systems Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Distributed Systems Engineer - Aarav Patel",
          "followup_body": "Dear Kinetix Labs Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Distributed Systems Engineer position submitted on 2026-10-21. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Kinetix Labs.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        }
      ]
    },
    {
      "company_key": "stacksphere",
      "company_name": "StackSphere",
      "role": "Software Engineer",
      "current_status": "rejected",
      "latest_date": "2026-10-13",
      "days_since_last_email": 11,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 1,
      "timeline": [
        {
          "email_id": 11,
          "company_name": "StackSphere",
          "role": "Software Engineer",
          "sender": "no-reply@stacksphere.com",
          "date": "2026-10-13",
          "status": "rejected",
          "summary": "Application closed/rejected by StackSphere for Software Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "vervepay",
      "company_name": "VervePay",
      "role": "Backend Developer",
      "current_status": "rejected",
      "latest_date": "2026-10-16",
      "days_since_last_email": 8,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 2,
      "timeline": [
        {
          "email_id": 9,
          "company_name": "VervePay",
          "role": "Backend Developer",
          "sender": "recruiting@vervepay.in",
          "date": "2026-10-06",
          "status": "applied",
          "summary": "Application confirmed with VervePay for Backend Developer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": "Follow-Up: Application for Backend Developer - Aarav Patel",
          "followup_body": "Dear VervePay Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Backend Developer position submitted on 2026-10-06. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to VervePay.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
        },
        {
          "email_id": 10,
          "company_name": "VervePay",
          "role": "Backend Engineer",
          "sender": "recruiting@vervepay.in",
          "date": "2026-10-16",
          "status": "rejected",
          "summary": "Application closed/rejected by VervePay for Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    },
    {
      "company_key": "hyperlooptech",
      "company_name": "HyperloopTech",
      "role": "Backend Engineer",
      "current_status": "rejected",
      "latest_date": "2026-10-19",
      "days_since_last_email": 5,
      "followup_due": false,
      "followup_subject": null,
      "followup_body": null,
      "email_count": 1,
      "timeline": [
        {
          "email_id": 12,
          "company_name": "HyperloopTech",
          "role": "Backend Engineer",
          "sender": "people@hyperlooptech.in",
          "date": "2026-10-19",
          "status": "rejected",
          "summary": "Application closed/rejected by HyperloopTech for Backend Engineer.",
          "scam_reasons": [],
          "scam_risk_tags": [],
          "followup_subject": null,
          "followup_body": null
        }
      ]
    }
  ],
  "all_classified": [
    {
      "email_id": 1,
      "company_name": "Zentech",
      "role": "applying for the Backend Engineer",
      "sender": "careers@zentech.in",
      "date": "2026-10-10",
      "status": "applied",
      "summary": "Application confirmed with Zentech for applying for the Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for applying for the Backend Engineer - Aarav Patel",
      "followup_body": "Dear Zentech Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the applying for the Backend Engineer position submitted on 2026-10-10. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Zentech.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 2,
      "company_name": "Infosys",
      "role": "Software Engineer",
      "sender": "hr.infosys.jobs@gmail.com",
      "date": "2026-10-14",
      "status": "scam",
      "summary": "Scam attempt detected claiming Infosys. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting.",
      "scam_reasons": [
        "Sender uses free email provider 'gmail.com' while claiming to represent Infosys.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, PAN) prematurely via insecure channels."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 3,
      "company_name": "Finly",
      "role": "Backend Engineer",
      "sender": "talent@finly.co",
      "date": "2026-10-18",
      "status": "interview",
      "summary": "Interview invitation from Finly for Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 4,
      "company_name": "Finly",
      "role": "Senior Python Engineer",
      "sender": "talent@finly.co",
      "date": "2026-10-08",
      "status": "applied",
      "summary": "Application confirmed with Finly for Senior Python Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Senior Python Engineer - Aarav Patel",
      "followup_body": "Dear Finly Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Senior Python Engineer position submitted on 2026-10-08. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Finly.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 5,
      "company_name": "CloudScale",
      "role": "Platform Engineer",
      "sender": "jobs@cloudscale.io",
      "date": "2026-10-11",
      "status": "applied",
      "summary": "Application confirmed with CloudScale for Platform Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Platform Engineer - Aarav Patel",
      "followup_body": "Dear CloudScale Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Platform Engineer position submitted on 2026-10-11. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to CloudScale.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 6,
      "company_name": "Paystack India",
      "role": "Paystack India - API Engineer",
      "sender": "hiring@paystackindia.com",
      "date": "2026-10-12",
      "status": "applied",
      "summary": "Application confirmed with Paystack India for Paystack India - API Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Paystack India - API Engineer - Aarav Patel",
      "followup_body": "Dear Paystack India Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Paystack India - API Engineer position submitted on 2026-10-12. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Paystack India.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 7,
      "company_name": "NovaData AI",
      "role": "AI Backend Engineer",
      "sender": "careers@novadata.ai",
      "date": "2026-10-15",
      "status": "applied",
      "summary": "Application confirmed with NovaData AI for AI Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for AI Backend Engineer - Aarav Patel",
      "followup_body": "Dear NovaData AI Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the AI Backend Engineer position submitted on 2026-10-15. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to NovaData AI.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 8,
      "company_name": "Kinetix Labs",
      "role": "Distributed Systems Engineer",
      "sender": "careers@kinetixlabs.dev",
      "date": "2026-10-21",
      "status": "applied",
      "summary": "Application confirmed with Kinetix Labs for Distributed Systems Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Distributed Systems Engineer - Aarav Patel",
      "followup_body": "Dear Kinetix Labs Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Distributed Systems Engineer position submitted on 2026-10-21. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to Kinetix Labs.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 9,
      "company_name": "VervePay",
      "role": "Backend Developer",
      "sender": "recruiting@vervepay.in",
      "date": "2026-10-06",
      "status": "applied",
      "summary": "Application confirmed with VervePay for Backend Developer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Backend Developer - Aarav Patel",
      "followup_body": "Dear VervePay Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Backend Developer position submitted on 2026-10-06. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to VervePay.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 10,
      "company_name": "VervePay",
      "role": "Backend Engineer",
      "sender": "recruiting@vervepay.in",
      "date": "2026-10-16",
      "status": "rejected",
      "summary": "Application closed/rejected by VervePay for Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 11,
      "company_name": "StackSphere",
      "role": "Software Engineer",
      "sender": "no-reply@stacksphere.com",
      "date": "2026-10-13",
      "status": "rejected",
      "summary": "Application closed/rejected by StackSphere for Software Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 12,
      "company_name": "HyperloopTech",
      "role": "Backend Engineer",
      "sender": "people@hyperlooptech.in",
      "date": "2026-10-19",
      "status": "rejected",
      "summary": "Application closed/rejected by HyperloopTech for Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 13,
      "company_name": "DevPulse",
      "role": "Backend Software Engineer",
      "sender": "careers@devpulse.io",
      "date": "2026-10-05",
      "status": "applied",
      "summary": "Application confirmed with DevPulse for Backend Software Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": "Follow-Up: Application for Backend Software Engineer - Aarav Patel",
      "followup_body": "Dear DevPulse Hiring Team,\n\nI hope this email finds you well. I am following up on my application for the Backend Software Engineer position submitted on 2026-10-05. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to DevPulse.\n\nCould you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience. Thank you for your time and consideration.\n\nWarm regards,\nAarav Patel\naarav.patel.dev@gmail.com | +91 98765 43210"
    },
    {
      "email_id": 14,
      "company_name": "DevPulse",
      "role": "Backend Engineer",
      "sender": "careers@devpulse.io",
      "date": "2026-10-14",
      "status": "interview",
      "summary": "Interview invitation from DevPulse for Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 15,
      "company_name": "DevPulse",
      "role": "Backend Software Engineer",
      "sender": "careers@devpulse.io",
      "date": "2026-10-22",
      "status": "offer",
      "summary": "Official job offer received from DevPulse for Backend Software Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 16,
      "company_name": "AetherCloud",
      "role": "Founding Backend Engineer",
      "sender": "founders@aethercloud.in",
      "date": "2026-10-20",
      "status": "interview",
      "summary": "Interview invitation from AetherCloud for Founding Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 17,
      "company_name": "QuantaGrid",
      "role": "Backend Engineer",
      "sender": "hr@quantagrid.co.in",
      "date": "2026-10-23",
      "status": "offer",
      "summary": "Official job offer received from QuantaGrid for Backend Engineer.",
      "scam_reasons": [],
      "scam_risk_tags": [],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 18,
      "company_name": "TCS",
      "role": "Backend Engineer",
      "sender": "tcs.direct.joining2026@yahoo.com",
      "date": "2026-10-17",
      "status": "scam",
      "summary": "Scam attempt detected claiming TCS. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, Hinglish Urgency Trap, No-Interview Offer.",
      "scam_reasons": [
        "Sender uses free email provider 'yahoo.com' while claiming to represent Tcs.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, PAN) prematurely via insecure channels.",
        "Uses informal Hinglish pressure tactics and backdoor promises typical of employment scams.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "Hinglish Urgency Trap",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 19,
      "company_name": "Accenture",
      "role": "Backend Engineer",
      "sender": "recruitment.accenture.india.desk@outlook.com",
      "date": "2026-10-21",
      "status": "scam",
      "summary": "Scam attempt detected claiming Accenture. Flagged for Free Email Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, No-Interview Offer.",
      "scam_reasons": [
        "Sender uses free email provider 'outlook.com' while claiming to represent Accenture.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Aadhaar, Bank Passbook) prematurely via insecure channels.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Free Email Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    },
    {
      "email_id": 20,
      "company_name": "Fasthireportal99",
      "role": "Remote Python Developer",
      "sender": "global-hr-onboarding@fast-hire-portal99.xyz",
      "date": "2026-10-22",
      "status": "scam",
      "summary": "Scam attempt detected claiming Fasthireportal99. Flagged for Suspicious Domain Spoof, Upfront Training/Security Fee, Sensitive ID Harvesting, No-Interview Offer.",
      "scam_reasons": [
        "Sender domain 'fast-hire-portal99.xyz' is an unverified disposable domain.",
        "Demands upfront payment (training fee, security deposit, BGV charge, or voucher) before joining.",
        "Requests unverified submission of government documents (Passport) prematurely via insecure channels.",
        "Promises guaranteed job offer without any technical evaluation or formal interview process."
      ],
      "scam_risk_tags": [
        "Suspicious Domain Spoof",
        "Upfront Training/Security Fee",
        "Sensitive ID Harvesting",
        "No-Interview Offer"
      ],
      "followup_subject": null,
      "followup_body": null
    }
  ]
};
