import os
import json
import logging
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, Header, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv

from backend.schemas import (
    EmailInput,
    ClassifiedEmail,
    ConsolidatedApplication,
    ProcessInboxRequest,
    ProcessInboxResponse
)
from backend.classifier import classify_emails_pipeline
from backend.consolidator import consolidate_threads
from backend.mbox_parser import parse_mbox_bytes

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("taalitrack")

app = FastAPI(
    title="TaaliTrack — Job Hunt Autopilot API",
    description="Unified email triage, smart thread consolidation, forensic scam quarantine, and follow-up engine.",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
SAMPLE_JSON_PATH = os.path.join(DATA_DIR, "sample_inbox.json")
SAMPLE_MBOX_PATH = os.path.join(DATA_DIR, "sample_inbox.mbox")

def build_process_response(
    emails: List[EmailInput],
    reference_date: str,
    custom_gemini_key: Optional[str] = None
) -> ProcessInboxResponse:
    # 1. Single classification pipeline
    classified, engine_used = classify_emails_pipeline(emails, custom_gemini_key)
    
    # 2. Smart thread consolidation & follow-up calculation
    consolidated_apps, scam_quarantine = consolidate_threads(classified, reference_date)
    
    # 3. KPI metrics
    scam_count = len(scam_quarantine)
    active_interviews = sum(1 for app in consolidated_apps if app.current_status == "interview")
    genuine_offers = sum(1 for app in consolidated_apps if app.current_status == "offer")
    followups_due_count = sum(1 for app in consolidated_apps if app.followup_due)
    companies_tracked_count = len(consolidated_apps)
    
    return ProcessInboxResponse(
        total_emails=len(emails),
        scam_count=scam_count,
        active_interviews=active_interviews,
        genuine_offers=genuine_offers,
        followups_due_count=followups_due_count,
        companies_tracked_count=companies_tracked_count,
        reference_date=reference_date,
        engine_used=engine_used,
        scam_quarantine=scam_quarantine,
        consolidated_applications=consolidated_apps,
        all_classified=classified
    )

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "app": "TaaliTrack — Job Hunt Autopilot",
        "version": "1.0.0"
    }

@app.get("/api/download-sample-mbox")
async def download_sample_mbox():
    if not os.path.exists(SAMPLE_MBOX_PATH):
        from backend.generate_mbox import generate_mbox
        generate_mbox()
    return FileResponse(
        path=SAMPLE_MBOX_PATH,
        filename="sample_inbox.mbox",
        media_type="application/mbox"
    )

@app.get("/api/sample-inbox", response_model=ProcessInboxResponse)
async def get_sample_inbox(
    reference_date: str = "2026-10-24",
    x_gemini_key: Optional[str] = Header(None, alias="X-Gemini-Key")
):
    if not os.path.exists(SAMPLE_JSON_PATH):
        raise HTTPException(status_code=404, detail="sample_inbox.json not found")
        
    with open(SAMPLE_JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    emails = [EmailInput.model_validate(item) for item in data]
    return build_process_response(emails, reference_date, x_gemini_key)

@app.post("/api/process-inbox", response_model=ProcessInboxResponse)
async def process_inbox(
    request: Request,
    x_gemini_key: Optional[str] = Header(None, alias="X-Gemini-Key")
):
    content_type = request.headers.get("content-type", "")
    
    # 1. Handle Multipart / File Upload
    if "multipart/form-data" in content_type:
        form = await request.form()
        uploaded_file = form.get("file")
        reference_date = form.get("reference_date", "2026-10-24")
        if isinstance(reference_date, bytes):
            reference_date = reference_date.decode("utf-8")
        
        if not uploaded_file:
            raise HTTPException(status_code=400, detail="No file provided in form-data")
            
        file_bytes = await uploaded_file.read()
        filename = uploaded_file.filename.lower() if uploaded_file.filename else ""
        
        emails: List[EmailInput] = []
        if filename.endswith(".mbox"):
            emails = parse_mbox_bytes(file_bytes)
        elif filename.endswith(".json") or file_bytes.strip().startswith(b"[") or file_bytes.strip().startswith(b"{"):
            try:
                parsed_json = json.loads(file_bytes.decode("utf-8"))
                if isinstance(parsed_json, dict) and "emails" in parsed_json:
                    parsed_json = parsed_json["emails"]
                if not isinstance(parsed_json, list):
                    parsed_json = [parsed_json]
                emails = [EmailInput.model_validate(item) for item in parsed_json]
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Invalid JSON format: {str(e)}")
        else:
            # Try mbox then JSON
            try:
                emails = parse_mbox_bytes(file_bytes)
            except Exception:
                parsed_json = json.loads(file_bytes.decode("utf-8"))
                emails = [EmailInput.model_validate(item) for item in parsed_json]

        if not emails:
            raise HTTPException(status_code=400, detail="No readable emails found in uploaded file")
            
        return build_process_response(emails, str(reference_date), x_gemini_key)

    # 2. Handle Application / JSON
    else:
        try:
            body = await request.json()
            payload = ProcessInboxRequest.model_validate(body)
            return build_process_response(payload.emails, payload.reference_date, x_gemini_key)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid JSON payload: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
