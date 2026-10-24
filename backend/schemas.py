from typing import Literal, Optional, List
from pydantic import BaseModel, Field, ConfigDict

class EmailInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    id: int
    date: str
    sender: str = Field(..., alias="from")
    subject: str
    body: str

class ClassifiedEmail(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    email_id: int
    company_name: str
    role: str
    sender: str
    date: str
    status: Literal["applied", "interview", "rejected", "offer", "scam"]
    summary: str
    scam_reasons: List[str] = Field(default_factory=list)
    scam_risk_tags: List[str] = Field(default_factory=list)
    followup_subject: Optional[str] = None
    followup_body: Optional[str] = None

class ConsolidatedApplication(BaseModel):
    company_key: str
    company_name: str
    role: str
    current_status: Literal["applied", "interview", "rejected", "offer"]
    latest_date: str
    days_since_last_email: int
    followup_due: bool
    followup_subject: Optional[str] = None
    followup_body: Optional[str] = None
    email_count: int
    timeline: List[ClassifiedEmail]

class ProcessInboxRequest(BaseModel):
    emails: List[EmailInput]
    reference_date: str = "2026-10-24"

class ProcessInboxResponse(BaseModel):
    total_emails: int
    scam_count: int
    active_interviews: int
    genuine_offers: int
    followups_due_count: int
    companies_tracked_count: int
    reference_date: str
    engine_used: str
    scam_quarantine: List[ClassifiedEmail]
    consolidated_applications: List[ConsolidatedApplication]
    all_classified: List[ClassifiedEmail]
