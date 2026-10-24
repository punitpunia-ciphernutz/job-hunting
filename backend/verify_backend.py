import json
import os
import sys

# Add project root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.schemas import EmailInput
from backend.classifier import classify_emails_pipeline
from backend.consolidator import consolidate_threads
from backend.mbox_parser import parse_mbox_bytes

def run_tests():
    data_dir = os.path.join(os.path.dirname(__file__), "data")
    json_path = os.path.join(data_dir, "sample_inbox.json")
    mbox_path = os.path.join(data_dir, "sample_inbox.mbox")

    print("[1] Loading sample_inbox.json...")
    with open(json_path, "r", encoding="utf-8") as f:
        json_data = json.load(f)
    emails = [EmailInput.model_validate(e) for e in json_data]
    assert len(emails) == 20, f"Expected 20 emails, got {len(emails)}"

    print("[2] Running single-pipeline classification...")
    classified, engine_used = classify_emails_pipeline(emails)
    print(f"Classification engine used: {engine_used}")
    assert len(classified) == 20

    print("[3] Testing scam quarantine and thread consolidation on 2026-10-24...")
    apps, scams = consolidate_threads(classified, "2026-10-24")

    print(f"Scam count: {len(scams)}")
    assert len(scams) == 4, f"Expected 4 scams, got {len(scams)}"
    scam_ids = sorted([s.email_id for s in scams])
    assert scam_ids == [2, 18, 19, 20], f"Expected scam IDs [2, 18, 19, 20], got {scam_ids}"

    print(f"Consolidated legitimate companies: {len(apps)}")
    assert len(apps) == 12, f"Expected 12 consolidated companies, got {len(apps)}"

    # Check companies with multi-email threads
    apps_by_name = {a.company_name.lower(): a for a in apps}
    
    assert "devpulse" in apps_by_name, "DevPulse not found"
    assert apps_by_name["devpulse"].email_count == 3, f"Expected 3 emails for DevPulse, got {apps_by_name['devpulse'].email_count}"
    assert apps_by_name["devpulse"].current_status == "offer", f"DevPulse status should be 'offer', got {apps_by_name['devpulse'].current_status}"

    assert "finly" in apps_by_name, "Finly not found"
    assert apps_by_name["finly"].email_count == 2, f"Expected 2 emails for Finly, got {apps_by_name['finly'].email_count}"
    assert apps_by_name["finly"].current_status == "interview", f"Finly status should be 'interview', got {apps_by_name['finly'].current_status}"

    assert "vervepay" in apps_by_name, "VervePay not found"
    assert apps_by_name["vervepay"].email_count == 2, f"Expected 2 emails for VervePay, got {apps_by_name['vervepay'].email_count}"
    assert apps_by_name["vervepay"].current_status == "rejected", f"VervePay status should be 'rejected', got {apps_by_name['vervepay'].current_status}"

    # Check followups
    overdue_apps = [a for a in apps if a.followup_due]
    overdue_names = sorted([a.company_name for a in overdue_apps])
    print(f"Overdue follow-ups count: {len(overdue_apps)} -> {overdue_names}")
    assert len(overdue_apps) == 4, f"Expected 4 overdue follow-ups, got {len(overdue_apps)}: {overdue_names}"
    
    # Check that Kinetix Labs (Oct 21 -> 3 days on Oct 24) is NOT overdue
    assert "kinetix labs" in apps_by_name
    assert not apps_by_name["kinetix labs"].followup_due, "Kinetix Labs should not be overdue on 2026-10-24"

    print("[4] Testing .mbox file parsing...")
    with open(mbox_path, "rb") as f:
        mbox_bytes = f.read()
    mbox_emails = parse_mbox_bytes(mbox_bytes)
    assert len(mbox_emails) == 20, f"Expected 20 emails from .mbox, got {len(mbox_emails)}"
    print(f"Parsed {len(mbox_emails)} emails from sample_inbox.mbox cleanly!")

    print("[5] Testing time-travel date shift to 2026-10-28...")
    apps_shifted, _ = consolidate_threads(classified, "2026-10-28")
    apps_shifted_by_name = {a.company_name.lower(): a for a in apps_shifted}
    assert apps_shifted_by_name["kinetix labs"].followup_due == True, "Kinetix Labs should be overdue on 2026-10-28 (7 days)"

    print("\nALL BACKEND TESTS PASSED WITH 100% SUCCESS!")

if __name__ == "__main__":
    run_tests()
