"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Calendar,
  Send,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Building2,
  Mail
} from "lucide-react";
import { ConsolidatedApplication, ApplicationStatus } from "../types";

interface ApplicationDrawerProps {
  application: ConsolidatedApplication | null;
  onClose: () => void;
}

export default function ApplicationDrawer({
  application,
  onClose,
}: ApplicationDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [expandedEmailId, setExpandedEmailId] = useState<number | null>(null);

  if (!application) return null;

  const subject =
    application.followup_subject ||
    `Follow-Up: Application for ${application.role} - Aarav Patel`;

  const body =
    application.followup_body ||
    `Dear ${application.company_name} Hiring Team,\n\n` +
    `I hope this email finds you well. I am following up on my application for the ${application.role} position submitted on ${application.latest_date}. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to ${application.company_name}.\n\n` +
    `Could you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience.\n\n` +
    `Thank you for your time and consideration.\n\n` +
    `Warm regards,\n` +
    `Aarav Patel\n` +
    `aarav.patel.dev@gmail.com | +91 98765 43210`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusBadge = (st: ApplicationStatus) => {
    switch (st) {
      case "offer":
        return "badge-offer";
      case "interview":
        return "badge-interview";
      case "scam":
        return "badge-scam";
      case "applied":
        return "badge-neutral";
      case "rejected":
        return "badge-neutral text-slate-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-label="Close backdrop"
      />

      <div className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {application.company_name}
              </h2>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${statusBadge(
                  application.current_status
                )}`}
              >
                {application.current_status}
              </span>
            </div>
            <p className="text-base text-slate-700 font-medium">
              {application.role}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2.5 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                Latest: {application.latest_date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {application.days_since_last_email === 0
                  ? "Contacted today"
                  : `${application.days_since_last_email}d without contact`}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Embedded Follow-Up Box if due or applied */}
          {application.current_status === "applied" && (
            <div
              className={`rounded-xl border p-4.5 ${
                application.followup_due
                  ? "bg-amber-50/70 border-amber-200"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Send
                    className={`w-4 h-4 ${
                      application.followup_due ? "text-amber-700" : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      application.followup_due ? "text-amber-900" : "text-slate-800"
                    }`}
                  >
                    {application.followup_due
                      ? "Follow-Up Overdue (>= 7 Days)"
                      : "Follow-Up Draft Ready"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${encodeURIComponent(application.timeline[application.timeline.length - 1]?.sender || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs transition"
                    title="Open in your default email client"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 shadow-2xs transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500 font-semibold">Subject: </span>
                  <span className="font-mono text-slate-900 font-medium">{subject}</span>
                </div>
                <div className="bg-white/90 border border-slate-200/90 rounded-lg p-3.5 text-slate-800 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-sans text-xs">
                  {body}
                </div>
              </div>
            </div>
          )}

          {/* Visual Thread Stepper */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email History ({application.timeline.length}{" "}
                {application.timeline.length === 1 ? "email" : "emails"})
              </h3>
              {application.email_count > 1 && (
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                  Self-Updated Thread
                </span>
              )}
            </div>

            <div className="relative border-l-2 border-slate-200 ml-3 space-y-4 pl-4.5 py-1">
              {application.timeline.map((email, idx) => {
                const isExpanded = expandedEmailId === email.email_id;

                return (
                  <div key={email.email_id || idx} className="relative group">
                    {/* Stepper Dot */}
                    <div className="absolute -left-[25px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-blue-500 shadow-2xs" />

                    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 transition hover:bg-slate-50">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ${statusBadge(
                            email.status
                          )}`}
                        >
                          {email.status}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {email.date}
                        </span>
                      </div>

                      <div className="text-sm font-bold text-slate-900 mt-1">
                        {email.summary || "Application status update"}
                      </div>

                      <div className="text-xs text-slate-600 font-mono mt-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{email.sender}</span>
                      </div>

                      {/* Expand snippet toggle */}
                      <button
                        onClick={() =>
                          setExpandedEmailId(isExpanded ? null : email.email_id)
                        }
                        className="mt-2.5 text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 transition"
                      >
                        <span>{isExpanded ? "Hide Message" : "View Message"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-2.5 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                          {email.summary}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500">
          <span>Candidate: Aarav Patel</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-800 transition shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
