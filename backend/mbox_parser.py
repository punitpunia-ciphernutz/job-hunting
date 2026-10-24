import mailbox
import os
import tempfile
import email.utils
from datetime import datetime
from typing import List
from backend.schemas import EmailInput

def parse_mbox_bytes(content: bytes) -> List[EmailInput]:
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mbox")
    try:
        temp_file.write(content)
        temp_file.close()

        mbox = mailbox.mbox(temp_file.name)
        emails: List[EmailInput] = []
        
        for idx, msg in enumerate(mbox, start=1):
            sender = msg.get("From", "unknown@sender.com")
            subject = msg.get("Subject", "No Subject")
            
            # Date extraction
            date_str = "2026-10-24"
            date_header = msg.get("Date")
            if date_header:
                try:
                    dt = email.utils.parsedate_to_datetime(date_header)
                    date_str = dt.strftime("%Y-%m-%d")
                except Exception:
                    pass
            
            # Body extraction
            body_parts = []
            if msg.is_multipart():
                for part in msg.walk():
                    content_type = part.get_content_type()
                    content_disp = str(part.get("Content-Disposition"))
                    if content_type == "text/plain" and "attachment" not in content_disp:
                        try:
                            payload = part.get_payload(decode=True)
                            if payload:
                                charset = part.get_content_charset() or "utf-8"
                                body_parts.append(payload.decode(charset, errors="replace"))
                        except Exception:
                            pass
            else:
                try:
                    payload = msg.get_payload(decode=True)
                    if payload:
                        charset = msg.get_content_charset() or "utf-8"
                        body_parts.append(payload.decode(charset, errors="replace"))
                except Exception:
                    pass
                    
            body = "\n".join(body_parts).strip()
            if not body:
                body = str(msg.get_payload())

            emails.append(EmailInput(
                id=idx,
                date=date_str,
                sender=sender,
                subject=subject,
                body=body
            ))
            
        mbox.close()
        return emails
    finally:
        if os.path.exists(temp_file.name):
            try:
                os.remove(temp_file.name)
            except Exception:
                pass
