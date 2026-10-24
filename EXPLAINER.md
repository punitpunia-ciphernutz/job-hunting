# 📋 TaaliTrack — Project Summary & Tech Stack

> **A quick, simple guide to help you understand the project and explain it to your team in 2 minutes.**

---

## 1. What is TaaliTrack? (Simple Explanation)

**TaaliTrack** is an **AI Job Hunt Autopilot**. 

When job seekers (like our persona, Aarav) get laid off, they apply to 100+ companies. Their email inbox turns into chaos with:
- Buried interview invites and rejections
- Forgetting when to send polite follow-ups
- Fraudulent job offers asking for "registration fees" or sensitive PAN/Aadhaar documents

**What TaaliTrack does:**
1. **Reads job emails** from an exported `.json` or standard `.mbox` file (no risky Gmail login required).
2. **Classifies every email** using AI into one of 5 statuses: `Applied`, `Interview`, `Rejected`, `Offer`, or `Scam`.
3. **Consolidates email threads**: If a company sends 3 emails over a month (*Applied ➔ Interview ➔ Offer*), it merges them into a single timeline card instead of cluttering the board.
4. **Calculates 7-day follow-ups**: Finds applications waiting 7+ days with no response and auto-generates a polite 1-click follow-up draft.
5. **Quarantines scams**: Isolates fake job emails in a security tab and highlights suspicious words (e.g., `@gmail.com`, `Rs 4,999 fee`, `send PAN card`).

---

## 2. Tech Stack (What We Used & Why)

| Layer | Technology | Why We Used It |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 16 (React + TypeScript)** | App Router, modern component architecture, strict type safety, fast load times. |
| **Styling & Theme** | **Tailwind CSS v4** | Clean, distraction-free **Sapphire & Slate Blue** light theme (inspired by Stripe & Linear). High contrast and readability. |
| **Icons** | **Lucide React** | Feather-light modern SVG icons for badges, timelines, and status indicators. |
| **Backend API** | **Python (FastAPI)** | Async, high performance, automatic Pydantic v2 data validation, and built-in OpenAPI docs (`/docs`). |
| **AI Classification** | **Google Gemini 2.5 Flash** (`google-genai` SDK) | Classifies 20 emails in a single batch JSON request with structured schema enforcement. |
| **Offline Fallback** | **Rule & Regex Engine** | 100% offline fallback. If no Gemini API key is provided or offline, it classifies with zero errors using keyword/domain heuristics. |
| **Mailbox Parsing** | **Python `mailbox` + `email`** | Native parsing of standard RFC-2822 `.mbox` archives from Gmail or Thunderbird. |
| **Demo Video Engine** | **ImageIO + FFMPEG** | Converted browser demo recordings into standard H.264 `demo_video.mp4` for hackathon presentation. |

---

## 3. How the System Works (Flow Diagram)

```
       [ Upload .json or .mbox ]
                  │
                  ▼
   ┌──────────────────────────────┐
   │   Single Unified Pipeline    │
   │  (Gemini AI + Rule Fallback) │
   └──────────────┬───────────────┘
                  │
     Classifies into 1 of 5 labels:
     applied | interview | rejected | offer | scam
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
 [ Scam Flagged ]     [ Legitimate Email ]
       │                     │
       ▼                     ▼
┌──────────────┐      ┌───────────────────────────────┐
│ Scam X-Ray   │      │      Thread Consolidator      │
│  Quarantine  │      │ - Groups emails by company    │
│ (Isolated)   │      │ - Self-advances status card   │
└──────────────┘      │ - Builds interactive timeline │
                      └──────────────┬────────────────┘
                                     │
                                     ▼
                      ┌───────────────────────────────┐
                      │    7-Day Follow-Up Engine     │
                      │ Checks if days_waiting >= 7   │
                      │ ➔ Generates 1-click email draft│
                      └───────────────────────────────┘
```

---

## 4. Key Talking Points for Your Team

### 🎯 1. Strict Single Pipeline
Scam detection is **not** a separate check or extra button. Every single email goes through **one unified pipeline** and gets labeled once. If it's a scam, it goes to Quarantine; if it's legitimate, it goes to the Career Tracker.

### 🔄 2. Smart Thread Consolidation
A company like *DevPulse* sent 3 emails: Application confirmation ➔ Interview invite ➔ Job offer. TaaliTrack automatically updates the company card to **Offer** with an expandable timeline showing all 3 messages.

### ⏱️ 3. 7-Day Follow-Up & Time Travel
Shows which recruiters ghosted you for 7+ days. You can change the "Today" date in the header to see future follow-ups trigger dynamically in real time.

### 🛡️ 4. Visual Scam X-Ray
Highlights the exact scam red flags in the email text (`@gmail.com`, `Rs 4,999`, `security deposit`, `send PAN card`), protecting job seekers from employment fraud.

---

## 5. 1-Minute Pitch Script (Read this to your team)

> *"Hey team! We built **TaaliTrack** to solve email chaos for job seekers after layoffs.*
> 
> *Our tech stack is **Python FastAPI** on the backend and **Next.js with TypeScript and Tailwind CSS** on the frontend.*
> 
> *Instead of manually sorting 100 emails, you simply drop in your inbox file. Our **Gemini 2.5 Flash AI** pipeline instantly organizes your applications into a clean Kanban board, merges multi-stage interview threads, alerts you when you haven't heard back in 7 days with a 1-click follow-up draft, and locks fake job scams in a secure X-Ray quarantine.*
> 
> *Everything is running live on `http://localhost:3000`, fully tested with zero errors, and includes an offline mode and demo video."*

---

## 6. Project Quick Links
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **API Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Video Demo**: [demo_video.mp4](file:///c:/Users/punit/Desktop/Job%20Hunt%20Autopilot/demo_video.mp4) (or open [demo_player.html](file:///c:/Users/punit/Desktop/Job%20Hunt%20Autopilot/demo_player.html))
- **Detailed Tech Docs**: [DOCUMENTATION.md](file:///c:/Users/punit/Desktop/Job%20Hunt%20Autopilot/DOCUMENTATION.md)
