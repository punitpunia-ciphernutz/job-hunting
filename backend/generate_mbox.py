import json
import mailbox
import os
from datetime import datetime
from email.message import EmailMessage

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
JSON_PATH = os.path.join(DATA_DIR, "sample_inbox.json")
MBOX_PATH = os.path.join(DATA_DIR, "sample_inbox.mbox")

def generate_mbox():
    os.makedirs(DATA_DIR, exist_ok=True)
    if os.path.exists(MBOX_PATH):
        os.remove(MBOX_PATH)

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        emails_data = json.load(f)

    mbox = mailbox.mbox(MBOX_PATH)
    try:
        mbox.lock()
        for item in emails_data:
            msg = EmailMessage()
            msg["From"] = item["from"]
            msg["To"] = "aarav.patel.dev@gmail.com"
            msg["Subject"] = item["subject"]
            
            # Format date to RFC 2822
            dt = datetime.strptime(item["date"], "%Y-%m-%d")
            # e.g., Sat, 10 Oct 2026 10:00:00 +0530
            msg["Date"] = dt.strftime("%a, %d %b %Y 10:00:00 +0530")
            msg["Message-ID"] = f"<email-{item['id']}@taalitrack.local>"
            msg.set_content(item["body"])
            
            mbox.add(msg)
        mbox.flush()
    finally:
        mbox.unlock()
        mbox.close()

    print(f"Successfully generated {MBOX_PATH} with {len(emails_data)} messages.")

if __name__ == "__main__":
    generate_mbox()
