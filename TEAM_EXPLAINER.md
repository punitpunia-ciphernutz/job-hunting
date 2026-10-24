# 🚀 TaaliTrack — Team Quick Explainer & Tech Stack

> **A quick, simple cheat-sheet for you and your team to understand and pitch TaaliTrack in under 2 minutes.**

---

## 💡 What is TaaliTrack? (The 30-Second Pitch)

When tech workers get laid off, they apply to 100+ jobs. Their email inbox quickly becomes chaos:
1. They lose track of who replied, who ghosted them, and when to follow up.
2. Multiple emails from the same company (Applied &rarr; Interview &rarr; Offer) create confusion.
3. Scammers send fake job offers demanding "training fees" or PAN/Aadhaar cards.

**TaaliTrack is an AI autopilot that reads an exported job-hunt inbox (`.json` or `.mbox`), classifies every email once in a single pipeline, groups multi-step threads by company, drafts polite 7-day follow-ups, and quarantines scams.**

---

## 🛠️ The Tech Stack (What We Used & Why)

| Layer | Technology | Why We Chose It |
| :--- | :--- | :--- |
| **Backend API** | **Python (FastAPI)** | Blazing fast async API, automatic data validation with Pydantic v2, and built-in interactive Swagger docs. |
| **Classification AI** | **Google Gemini 2.5 Flash** (`google-genai` SDK) | Ultra-fast multimodal LLM that reads all emails in one single batched JSON call to classify them. |
| **Offline Fallback** | **Deterministic Regex & Domain Engine** | Zero-crash safety net! If no Gemini API key is provided or the network fails, it runs 100% offline with full accuracy. |
| **Email Archive Parser** | **Python `mailbox` + `email`** | Native support for standard RFC-2822 `.mbox` archives from Gmail/Thunderbird without extra dependencies. |
| **Frontend UI** | **Next.js 16 (App Router) + TypeScript** | Modern React framework with high-speed Turbopack builds and strict type safety. |
| **Styling** | **Tailwind CSS v4** | Clean, modern Linear/Stripe-inspired **Sapphire & Slate Blue** light theme. No bloated dark-neon styling. |
| **Icons** | **Lucide React** | Clean, lightweight SVG icons. |
| **Video Engine** | **ImageIO + FFMPEG** | Auto-generates standard H.264 `demo_video.mp4` screen recordings for hackathon submission. |

---

## ⚙️ How It Works (Simple 4-Step Pipeline)

```
[ Upload .json or .mbox ]
           │
           ▼
[ Single Unified Pipeline ] ──► Classifies every email into:
                                applied | interview | rejected | offer | scam
           │
           ├──► Scam? ──────► Send to [ Scam X-Ray Quarantine ] (isolated, never merged)
           │
           └──► Legitimate? ──► [ Thread Consolidator ]
                                Merges multiple emails by company:
                                Oct 5 Applied ──► Oct 14 Interview ──► Oct 22 Offer
                                (Updates card to "Offer" with expandable timeline)
                                       │
                                       ▼
                                [ 7-Day Follow-Up Math ]
                                If latest status is "Applied" & waiting >= 7 days:
                                Flags amber badge + generates 1-click copyable email draft
```

---

## 🌟 The 4 Key Features to Show Your Team / Judges

### 1. Unified Single Pipeline (Strict Guardrail)
- Every email is classified **once** into one of 5 labels: `applied`, `interview`, `rejected`, `offer`, or `scam`.
- We **do not** have a separate scam-checker tab or endpoint; scam detection is built directly into the core classifier.

### 2. Smart Thread Consolidation (No Clutter)
- If DevPulse sends 3 emails over 3 weeks (*Applied &rarr; Interview &rarr; Offer*), TaaliTrack **does not** create 3 separate cards.
- It shows **one card** under **Offer** labeled `↻ 3-email thread`. Clicking it opens a slide-over drawer showing the full visual step-by-step story.

### 3. Dedicated 7-Day Follow-Up Queue + Time Travel
- Any job where you've waited 7+ days without a recruiter reply gets flagged.
- The **"7-Day Follow-Ups"** tab lists all overdue applications with a **1-click "Copy Email"** button containing a tailored follow-up message.
- **Time-Travel Demo:** Change the header date from `2026-10-24` to `2026-10-28` to watch recent applications (like Kinetix Labs) turn overdue in real time!

### 4. Forensic Scam X-Ray (With Word Highlighter)
- Scams impersonating Infosys or TCS asking for `Rs 4,999` fees or `Aadhaar/PAN` scans are locked in quarantine.
- The X-Ray viewer highlights suspicious fraud terms directly inside the email body (`@gmail.com`, `Rs 2,500`, `abhi pay karo`, `PAN card`) using soft rose highlight badges.

---

## 🗣️ How to Pitch It to Your Team (Word-for-Word Script)

> *"Hey team! We built **TaaliTrack** for Aarav, a backend engineer laid off on Oct 1 who sent 100+ applications. His inbox is a mess of interview invites, rejections, and fake job scams.*
>
> *TaaliTrack uses a **Python FastAPI backend** and a **Next.js frontend**. It ingests `.mbox` or `.json` inboxes and runs them through a **single classification pipeline** powered by **Gemini 2.5 Flash** (with a 100% offline fallback).*
>
> *It does three smart things:*
> *1. It merges multiple emails from the same company so the board self-updates.*
> *2. It calculates which jobs have waited 7+ days without a reply and writes 1-click follow-up emails.*
> *3. It catches scams demanding fees or PAN/Aadhaar cards and highlights the exact scam words in the Scam X-Ray viewer.*
>
> *Everything is running live on `localhost:3000` with zero Docker needed, and we also have a pre-rendered `demo_video.mp4` ready for submission."*

---

## 📁 Key Files Reference

- **Frontend App:** `/frontend` (Next.js 16 + Tailwind CSS) &rarr; `http://localhost:3000`
- **Backend API:** `/backend` (FastAPI + Pydantic v2) &rarr; `http://localhost:8000`
- **Demo Video (MP4):** `demo_video.mp4` (Root folder, 3.63 MB)
- **Video Player (HTML):** `demo_player.html` (Double-click to play in browser)
- **Full Tech Specs:** `DOCUMENTATION.md`
