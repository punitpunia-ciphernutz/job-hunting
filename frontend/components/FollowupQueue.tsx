"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Send,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { ConsolidatedApplication } from "../types";

interface FollowupQueueProps {
  applications: ConsolidatedApplication[];
  onSelectApplication: (app: ConsolidatedApplication) => void;
}

export default function FollowupQueue({
  applications,
  onSelectApplication,
}: FollowupQueueProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // Filter only applied companies
  const appliedApps = applications.filter((app) => app.current_status === "applied");

  // Overdue (>= 7 days), sorted by longest wait first
  const overdueApps = appliedApps
    .filter((app) => app.followup_due)
    .sort((a, b) => b.days_since_last_email - a.days_since_last_email);

  // Up to date (< 7 days)
  const upToDateApps = appliedApps
    .filter((app) => !app.followup_due)
    .sort((a, b) => b.days_since_last_email - a.days_since_last_email);

  const handleCopy = (app: ConsolidatedApplication, e: React.MouseEvent) => {
    e.stopPropagation();
    const subject =
      app.followup_subject ||
      `Follow-Up: Application for ${app.role} - Aarav Patel`;

    const body =
      app.followup_body ||
      `Dear ${app.company_name} Hiring Team,\n\n` +
      `I hope this email finds you well. I am following up on my application for the ${app.role} position submitted on ${app.latest_date}. I remain very enthusiastic about the opportunity to contribute my backend engineering and automation skills to ${app.company_name}.\n\n` +
      `Could you please provide an update regarding the status of my application or any upcoming steps in your hiring process? I have attached my updated portfolio and resume for convenience.\n\n` +
      `Thank you for your time and consideration.\n\n` +
      `Warm regards,\n` +
      `Aarav Patel\n` +
      `aarav.patel.dev@gmail.com | +91 98765 43210`;

    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopiedKey(app.company_key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Overdue Queue Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              Action Required: 7-Day Follow-Up Queue
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {overdueApps.length} Overdue
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Polite follow-ups scheduled for applications awaiting recruiter response for 7 or more days.
            </p>
          </div>
        </div>

        {overdueApps.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm flex flex-col items-center justify-center gap-2">
            <CheckCircle2 className="w-9 h-9 text-emerald-500" />
            <span className="text-slate-900 font-semibold text-base">All caught up!</span>
            <span>No applications have been waiting 7+ days without a reply.</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {overdueApps.map((app) => {
              const isExpanded = expandedKey === app.company_key;
              const isCopied = copiedKey === app.company_key;

              return (
                <div
                  key={app.company_key}
                  className="py-4.5 first:pt-0 last:pb-0 transition hover:bg-slate-50/50 rounded-xl px-3 -mx-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: Company & Role */}
                    <div
                      className="cursor-pointer"
                      onClick={() => onSelectApplication(app)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base font-bold text-slate-900 hover:text-blue-600 transition">
                          {app.company_name}
                        </span>
                        <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {app.days_since_last_email} days silent
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {app.role} • Applied on {app.latest_date}
                      </p>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        onClick={() =>
                          setExpandedKey(isExpanded ? null : app.company_key)
                        }
                        className="px-3.5 py-2 text-sm text-slate-700 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium transition flex items-center gap-1.5"
                      >
                        <span>{isExpanded ? "Hide Draft" : "Preview Draft"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <a
                        href={`mailto:${encodeURIComponent(app.emails[app.emails.length - 1]?.from || "")}?subject=${encodeURIComponent(app.followup_subject || `Follow-Up: Application for ${app.role} - Aarav Patel`)}&body=${encodeURIComponent(app.followup_body || "")}`}
                        className="px-3.5 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs transition flex items-center gap-1.5"
                        title="Open in your default email client (Gmail, Outlook, Apple Mail)"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Email</span>
                      </a>

                      <button
                        onClick={(e) => handleCopy(app, e)}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-2xs transition flex items-center gap-1.5"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Copied ✓</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Draft Preview */}
                  {isExpanded && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2.5 animate-in fade-in duration-100">
                      <div>
                        <span className="text-slate-500 font-semibold">Subject: </span>
                        <span className="font-mono text-slate-900 font-medium">
                          {app.followup_subject ||
                            `Follow-Up: Application for ${app.role} - Aarav Patel`}
                        </span>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-lg p-4 text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-sm">
                        {app.followup_body}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Up To Date Section (< 7 Days) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Up to date (&lt; 7 days waiting)
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {upToDateApps.length} {upToDateApps.length === 1 ? "Role" : "Roles"}
          </span>
        </div>

        {upToDateApps.length === 0 ? (
          <div className="py-4 text-sm text-slate-400 italic text-center">
            No recent applications under 7 days.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upToDateApps.map((app) => (
              <div
                key={app.company_key}
                onClick={() => onSelectApplication(app)}
                className="py-3 flex items-center justify-between text-sm text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <div>
                  <span className="font-semibold text-slate-900">{app.company_name}</span>
                  <span className="text-slate-500 ml-2 font-normal">{app.role}</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500 font-mono text-xs">
                  <span>Applied {app.days_since_last_email}d ago</span>
                  <span>•</span>
                  <span className="text-slate-600 font-medium">
                    Follow-up reminder triggers in {7 - app.days_since_last_email}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
