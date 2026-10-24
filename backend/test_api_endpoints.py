import requests
import json
import os

BASE_URL = "http://localhost:8000"

def test_api():
    print("[1] Testing GET /api/health...")
    r = requests.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200, f"Health check failed: {r.status_code}"
    print("Health check OK:", r.json())

    print("\n[2] Testing GET /api/sample-inbox...")
    r = requests.get(f"{BASE_URL}/api/sample-inbox?reference_date=2026-10-24")
    assert r.status_code == 200, f"Sample inbox failed: {r.status_code}"
    data = r.json()
    assert data["total_emails"] == 20
    assert data["scam_count"] == 4
    assert data["companies_tracked_count"] == 12
    assert data["followups_due_count"] == 4
    print("Sample inbox OK: 20 emails, 4 scams, 12 companies, 4 follow-ups.")

    print("\n[3] Testing POST /api/process-inbox with multipart .mbox file upload...")
    mbox_path = os.path.join(os.path.dirname(__file__), "data", "sample_inbox.mbox")
    with open(mbox_path, "rb") as f:
        files = {"file": ("sample_inbox.mbox", f, "application/mbox")}
        r = requests.post(
            f"{BASE_URL}/api/process-inbox",
            files=files,
            data={"reference_date": "2026-10-24"}
        )
    assert r.status_code == 200, f"Mbox upload failed: {r.status_code} - {r.text}"
    mbox_data = r.json()
    assert mbox_data["total_emails"] == 20
    assert mbox_data["scam_count"] == 4
    print("Mbox file upload OK: 20 emails parsed and classified via single pipeline.")

    print("\n[4] Testing POST /api/process-inbox with multipart .json file upload...")
    json_path = os.path.join(os.path.dirname(__file__), "data", "sample_inbox.json")
    with open(json_path, "rb") as f:
        files = {"file": ("sample_inbox.json", f, "application/json")}
        r = requests.post(
            f"{BASE_URL}/api/process-inbox",
            files=files,
            data={"reference_date": "2026-10-24"}
        )
    assert r.status_code == 200, f"JSON upload failed: {r.status_code} - {r.text}"
    json_upload_data = r.json()
    assert json_upload_data["total_emails"] == 20
    print("JSON file upload OK: 20 emails parsed and classified via single pipeline.")

    print("\n[5] Testing POST /api/process-inbox with application/json body (live simulation)...")
    payload = {
        "emails": [
            {
                "id": 101,
                "date": "2026-10-24",
                "from": "careers@zentech.in",
                "subject": "Interview Invite: Backend Engineer Round 1 on 28 Oct",
                "body": "Hi Aarav, Thanks for your patience! We reviewed your profile and want to invite you to Round 1 technical interview on Oct 28 at 3 PM IST."
            }
        ],
        "reference_date": "2026-10-24"
    }
    r = requests.post(
        f"{BASE_URL}/api/process-inbox",
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload)
    )
    assert r.status_code == 200, f"JSON payload failed: {r.status_code} - {r.text}"
    sim_data = r.json()
    assert sim_data["total_emails"] == 1
    assert sim_data["active_interviews"] == 1
    print("JSON body payload OK: Zentech classified as interview.")

    print("\n[6] Testing GET /api/download-sample-mbox...")
    r = requests.get(f"{BASE_URL}/api/download-sample-mbox")
    assert r.status_code == 200
    assert len(r.content) > 1000
    print(f"Download sample mbox OK: received {len(r.content)} bytes.")

    print("\n>>> ALL API ENDPOINT TESTS PASSED WITH 100% SUCCESS! <<<")

if __name__ == "__main__":
    test_api()
