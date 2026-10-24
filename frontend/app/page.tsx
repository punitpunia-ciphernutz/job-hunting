"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import CareerTracker from "../components/CareerTracker";
import FollowupQueue from "../components/FollowupQueue";
import ScamQuarantine from "../components/ScamQuarantine";
import ApplicationDrawer from "../components/ApplicationDrawer";
import SettingsModal from "../components/SettingsModal";
import { SAMPLE_EMAILS } from "../data/sampleEmails";
import { SAMPLE_INBOX_RESPONSE } from "../data/sampleResponse";
import {
  ProcessInboxResponse,
  ConsolidatedApplication,
  RawEmailInput,
} from "../types";
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Kanban,
  Clock,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  ShieldCheck
} from "lucide-react";

type WorkspaceTab = "board" | "followups" | "scams";

export default function Home() {
  const [inboxData, setInboxData] = useState<ProcessInboxResponse | null>(null);
  const [referenceDate, setReferenceDate] = useState<string>("2026-10-24");
  const [currentEmails, setCurrentEmails] = useState<RawEmailInput[]>(SAMPLE_EMAILS);
  const [apiKey, setApiKey] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("board");
  const [selectedApp, setSelectedApp] = useState<ConsolidatedApplication | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    title: string;
    message?: string;
  } | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const showToast = (title: string, message?: string) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Load saved API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem("taalitrack_gemini_key");
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("taalitrack_gemini_key", key);
    showToast(
      "Engine Preference Saved",
      key ? "Using Gemini 2.5 Flash batch triage" : "Using hybrid fallback engine"
    );
    if (currentEmails.length > 0) {
      processEmailsJson(currentEmails, referenceDate, key);
    } else {
      loadSampleInbox(referenceDate, key);
    }
  };

  // Helper to call backend with JSON emails
  const processEmailsJson = async (
    emails: RawEmailInput[],
    refDate: string,
    customKey?: string
  ) => {
    setIsProcessing(true);
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      const keyToUse = customKey !== undefined ? customKey : apiKey;
      if (keyToUse) {
        headers["X-Gemini-Key"] = keyToUse;
      }

      const res = await fetch(`${apiUrl}/api/process-inbox`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          emails,
          reference_date: refDate,
        }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data: ProcessInboxResponse = await res.json();
      setInboxData(data);

      if (selectedApp) {
        const updated = data.consolidated_applications.find(
          (a) => a.company_key === selectedApp.company_key
        );
        if (updated) setSelectedApp(updated);
      }
    } catch (err: any) {
      console.error(err);
      showToast("Triage Failed", err.message || "Failed to process inbox");
    } finally {
      setIsProcessing(false);
    }
  };

  // Initial load
  const loadSampleInbox = useCallback(
    async (refDate: string, customKey?: string) => {
      setIsProcessing(true);
      try {
        const headers: Record<string, string> = {};
        const keyToUse = customKey !== undefined ? customKey : apiKey;
        if (keyToUse) {
          headers["X-Gemini-Key"] = keyToUse;
        }

        const res = await fetch(
          `${apiUrl}/api/sample-inbox?reference_date=${encodeURIComponent(refDate)}`,
          { headers }
        );

        if (!res.ok) {
          throw new Error(`Failed to load sample inbox: ${res.statusText}`);
        }

        const data: ProcessInboxResponse = await res.json();
        setInboxData(data);
        setCurrentEmails(SAMPLE_EMAILS);
      } catch (err: any) {
        console.warn("FastAPI backend offline, loading resilient client fallback:", err);
        // Dynamic follow-up math in client fallback
        const parsedRef = new Date(refDate);
        const dynamicApps = SAMPLE_INBOX_RESPONSE.consolidated_applications.map((app) => {
          const appDate = new Date(app.latest_date);
          const diffDays = Math.max(0, Math.floor((parsedRef.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24)));
          const isOverdue = app.current_status === "applied" && diffDays >= 7;
          return {
            ...app,
            days_since_last_email: diffDays,
            followup_due: isOverdue,
          };
        });
        const dueCount = dynamicApps.filter((a) => a.followup_due).length;
        setInboxData({
          ...SAMPLE_INBOX_RESPONSE,
          reference_date: refDate,
          consolidated_applications: dynamicApps,
          followups_due_count: dueCount,
        });
        setCurrentEmails(SAMPLE_EMAILS);
      } finally {
        setIsProcessing(false);
      }
    },
    [apiUrl, apiKey]
  );

  useEffect(() => {
    loadSampleInbox(referenceDate);
  }, [loadSampleInbox, referenceDate]);

  // Handle Date Time-Travel Change
  const handleReferenceDateChange = (newDate: string) => {
    setReferenceDate(newDate);
    if (currentEmails.length > 0) {
      processEmailsJson(currentEmails, newDate);
    } else {
      loadSampleInbox(newDate);
    }
    showToast("Date Recalculated", `Evaluated follow-ups relative to ${newDate}`);
  };

  // Event A: Zentech Interview Invite
  const handleSimulateEventA = () => {
    const newEmail: RawEmailInput = {
      id: currentEmails.length + 1,
      date: "2026-10-24",
      from: "careers@zentech.in",
      subject: "Interview Invite: Backend Engineer Round 1 on 28 Oct",
      body: "Hi Aarav, Thanks for your patience! We reviewed your profile and want to invite you to Round 1 technical interview on Oct 28 at 3 PM IST. Please reply to confirm.",
    };

    const updated = [...currentEmails, newEmail];
    setCurrentEmails(updated);
    processEmailsJson(updated, referenceDate);
    setActiveTab("board");
    showToast(
      "Zentech Replied!",
      "Moved live from 'Applied' into 'Interview' via smart thread consolidation."
    );
  };

  // Event B: Incoming Hinglish Laptop-Fee Scam
  const handleSimulateEventB = () => {
    const newEmail: RawEmailInput = {
      id: currentEmails.length + 1,
      date: "2026-10-24",
      from: "wipro.hr.onboarding2026@gmail.com",
      subject: "Offer Confirmed: Dispatching MacBook - Pay Rs 3,500 Courier Deposit",
      body: "Congratulations Aarav! Your profile is selected for Backend Engineer at Wipro. Bas Rs 3,500 refundable MacBook dispatch charge pay karo and send PAN & Aadhaar photo immediately to start onboarding.",
    };

    const updated = [...currentEmails, newEmail];
    setCurrentEmails(updated);
    processEmailsJson(updated, referenceDate);
    showToast(
      "Scam Intercepted!",
      "Quarantined in Scam X-Ray. Demanded Rs 3,500 fee + PAN card."
    );
  };

  // File Upload (.json or .mbox)
  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      if (file.name.endsWith(".json")) {
        try {
          const text = await file.text();
          const parsed = JSON.parse(text);
          const rawArr = Array.isArray(parsed)
            ? parsed
            : parsed.emails && Array.isArray(parsed.emails)
            ? parsed.emails
            : [];
          if (rawArr.length > 0) {
            const mapped: RawEmailInput[] = rawArr.map((item: any, idx: number) => ({
              id: item.id || idx + 1,
              date: item.date || "2026-10-24",
              from: item.from || item.sender || "unknown",
              subject: item.subject || "No Subject",
              body: item.body || "",
            }));
            setCurrentEmails(mapped);
          }
        } catch (e) {
          console.warn("Could not pre-parse uploaded json on client", e);
        }
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("reference_date", referenceDate);

      const headers: Record<string, string> = {};
      if (apiKey) headers["X-Gemini-Key"] = apiKey;

      const res = await fetch(`${apiUrl}/api/process-inbox`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.statusText}`);
      }

      const data: ProcessInboxResponse = await res.json();
      setInboxData(data);

      showToast(
        "Inbox Uploaded",
        `Parsed & classified ${data.total_emails} emails from ${file.name}.`
      );
    } catch (err: any) {
      console.error(err);
      showToast("Upload Error", err.message || "Failed to parse inbox file");
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset Demo
  const handleResetDemo = () => {
    setReferenceDate("2026-10-24");
    loadSampleInbox("2026-10-24");
    showToast("Inbox Reset", "Restored the original 20-email Aarav job hunt dataset.");
  };

  const scamCount = inboxData?.scam_count || 0;
  const followupsCount = inboxData?.followups_due_count || 0;
  const companiesCount = inboxData?.companies_tracked_count || 0;
  const interviewCount = inboxData?.active_interviews || 0;
  const offerCount = inboxData?.genuine_offers || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-150">
          <div className="bg-slate-900 text-white rounded-xl px-4 py-3.5 text-sm shadow-xl flex items-start gap-3 max-w-sm border border-slate-800">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">{toast.title}</div>
              {toast.message && (
                <div className="text-slate-300 mt-1 text-xs leading-relaxed">
                  {toast.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Decluttered Header Bar */}
      <Navbar
        referenceDate={referenceDate}
        onReferenceDateChange={handleReferenceDateChange}
        engineUsed={inboxData?.engine_used || "Hybrid Fallback"}
        onSimulateEventA={handleSimulateEventA}
        onSimulateEventB={handleSimulateEventB}
        onResetDemo={handleResetDemo}
        onFileUpload={handleFileUpload}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isProcessing={isProcessing}
        apiUrl={apiUrl}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        {/* A. Slim Scam Shield Banner (Sapphire Security Blue Theme) */}
        {scamCount > 0 && (
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 text-sm text-slate-800 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
              <span>
                <strong className="text-slate-900">Protected:</strong> {scamCount} fake job offers
                demanding upfront fees or ID documents were intercepted and quarantined.
              </span>
            </div>
            <button
              onClick={() => setActiveTab("scams")}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0 transition"
            >
              <span>Inspect {scamCount} Threats &rarr;</span>
            </button>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800 flex items-center justify-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Classifying emails and updating company threads...</span>
          </div>
        )}

        {/* B. Segmented Workspace Tab Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          {/* Left: Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-200/60 p-1.5 rounded-xl text-sm font-medium text-slate-600 w-fit">
            {/* Tab 1: Pipeline Board */}
            <button
              onClick={() => setActiveTab("board")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === "board"
                  ? "bg-white text-blue-700 border border-blue-200 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Kanban className="w-4 h-4" />
              <span>Pipeline Board</span>
              <span
                className={`ml-1 text-xs font-mono px-2 py-0.5 rounded-full ${
                  activeTab === "board"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {companiesCount}
              </span>
            </button>

            {/* Tab 2: 7-Day Follow-Ups */}
            <button
              onClick={() => setActiveTab("followups")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === "followups"
                  ? "bg-white text-blue-700 border border-blue-200 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="w-4 h-4 text-amber-600" />
              <span>7-Day Follow-Ups</span>
              {followupsCount > 0 ? (
                <span className="ml-1 text-xs font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold">
                  {followupsCount}
                </span>
              ) : (
                <span className="ml-1 text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  0
                </span>
              )}
            </button>

            {/* Tab 3: Scam X-Ray */}
            <button
              onClick={() => setActiveTab("scams")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition ${
                activeTab === "scams"
                  ? "bg-white text-blue-700 border border-blue-200 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              <span>Scam X-Ray Quarantine</span>
              {scamCount > 0 && (
                <span
                  className={`ml-1 text-xs font-mono px-2 py-0.5 rounded-full font-semibold ${
                    activeTab === "scams"
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {scamCount}
                </span>
              )}
            </button>
          </div>

          {/* Right: Subtle Inline Metric Summary */}
          <div className="flex items-center gap-3.5 text-sm text-slate-500 font-mono">
            <span>{companiesCount} Companies</span>
            <span>•</span>
            <span className="text-blue-600 font-semibold">
              {interviewCount} Interviews
            </span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">
              {offerCount} Offers
            </span>
          </div>
        </div>

        {/* C. Tab Content Views */}
        <div className="pt-2">
          {activeTab === "board" && inboxData && (
            <CareerTracker
              applications={inboxData.consolidated_applications}
              onSelectApplication={(app) => setSelectedApp(app)}
            />
          )}

          {activeTab === "followups" && inboxData && (
            <FollowupQueue
              applications={inboxData.consolidated_applications}
              onSelectApplication={(app) => setSelectedApp(app)}
            />
          )}

          {activeTab === "scams" && inboxData && (
            <ScamQuarantine
              scams={inboxData.scam_quarantine}
              rawEmails={currentEmails}
            />
          )}
        </div>
      </main>

      {/* Slide-Over Company Inspector Drawer */}
      <ApplicationDrawer
        application={selectedApp}
        onClose={() => setSelectedApp(null)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveKey={handleSaveKey}
        currentKey={apiKey}
      />
    </div>
  );
}
