"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  UserX,
  Calendar,
  Lock,
  Mail,
  CheckCircle,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import { ClassifiedEmail, RawEmailInput } from "../types";

interface ScamQuarantineProps {
  scams: ClassifiedEmail[];
  rawEmails?: RawEmailInput[];
}

const SUSPICIOUS_PATTERNS = [
  /@gmail\.com/gi,
  /@yahoo\.com/gi,
  /@outlook\.com/gi,
  /\.xyz/gi,
  /Rs\.?\s*4,999/gi,
  /Rs\.?\s*2,500/gi,
  /Rs\.?\s*3,200/gi,
  /Rs\.?\s*3,500/gi,
  /\$49/gi,
  /training fee/gi,
  /security deposit/gi,
  /BGV document verification charge/gi,
  /verification charge/gi,
  /BGV/gi,
  /compliance voucher/gi,
  /dispatch charge/gi,
  /voucher/gi,
  /abhi pay karo/gi,
  /bas Rs/gi,
  /direct shortlisted/gi,
  /backdoor drive/gi,
  /backdoor/gi,
  /no interview required/gi,
  /without technical interview/gi,
  /direct joining letter/gi,
  /hired immediately/gi,
  /Aadhaar/gi,
  /PAN card/gi,
  /PAN copies/gi,
  /PAN/gi,
  /bank passbook/gi,
  /passbook/gi,
  /passport/gi,
];

// Lightweight highlighter helper that wraps suspicious tokens in soft rose <mark>
function HighlightedScamText({ text }: { text: string }) {
  if (!text) return null;

  const combinedRegex = new RegExp(
    `(${SUSPICIOUS_PATTERNS.map((p) => p.source).join("|")})`,
    "gi"
  );

  const parts = text.split(combinedRegex);

  return (
    <>
      {parts.map((part, index) => {
        const isSuspicious = SUSPICIOUS_PATTERNS.some((pat) => {
          pat.lastIndex = 0;
          return pat.test(part);
        });

        if (isSuspicious) {
          return (
            <mark
              key={index}
              className="bg-rose-100/90 text-rose-900 font-semibold px-1 py-0.5 rounded border border-rose-200/90"
              title="Forensic Trigger Detected"
            >
              {part}
            </mark>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export default function ScamQuarantine({ scams, rawEmails }: ScamQuarantineProps) {
  const [selectedId, setSelectedId] = useState<number>(
    scams.length > 0 ? scams[0].email_id : 0
  );

  if (!scams || scams.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-xs">
        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900">
          No Scams Detected
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Your inbox is clean of phishing traps, fee demands, and credential harvesting.
        </p>
      </div>
    );
  }

  // Active email in X-Ray viewer
  const activeScam =
    scams.find((s) => s.email_id === selectedId) || scams[0];

  // Lookup raw email subject and body for real inline text highlighting
  const activeRaw = rawEmails?.find((e) => e.id === activeScam.email_id);
  const displaySubject = activeRaw?.subject || activeScam.summary;
  const displayBody = activeRaw?.body || activeScam.summary;

  return (
    <div className="space-y-5">
      {/* Top Banner: Calm Sapphire Security Blue */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
            <ShieldAlert className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
              Scam X-Ray Quarantine
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {scams.length} Threats Neutralized
              </span>
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              These messages were flagged by the unified pipeline and quarantined immediately. They are never merged into legitimate company threads.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-blue-700 font-mono bg-white px-3 py-1.5 rounded-lg border border-blue-200 shrink-0 font-medium">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>Zero PII Exposed</span>
        </div>
      </div>

      {/* Two-Column Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Clean Threat List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Quarantined Threats ({scams.length})
          </div>
          <div className="space-y-2.5">
            {scams.map((scam) => {
              const isSelected = scam.email_id === activeScam.email_id;

              return (
                <div
                  key={scam.email_id}
                  onClick={() => setSelectedId(scam.email_id)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/40 border-blue-500 shadow-xs ring-1 ring-blue-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span className="text-base font-bold text-slate-900">
                      {scam.company_name}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {scam.date}
                    </span>
                  </div>

                  <div className="text-sm text-slate-600 font-mono truncate mb-2.5 flex items-center gap-1.5">
                    <UserX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{scam.sender}</span>
                  </div>

                  {/* Subtle Rose Risk Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {scam.scam_risk_tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {scam.scam_risk_tags.length > 2 && (
                      <span className="text-xs text-slate-500 font-mono px-1 py-0.5">
                        +{scam.scam_risk_tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Forensic Email X-Ray Viewer */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
          {/* Top of X-Ray: Verdict & Risk Pills */}
          <div>
            <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-slate-100 mb-3.5">
              <div className="flex items-center gap-2.5">
                <SearchCheck className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Forensic Analysis: {activeScam.company_name}
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Threat ID #{activeScam.email_id}
              </span>
            </div>

            {/* Subtle Rose Risk Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeScam.scam_risk_tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200/80"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Bulleted Forensic Reasons */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Detection Evidence:
              </span>
              <ul className="list-disc list-inside space-y-1.5 text-slate-800">
                {activeScam.scam_reasons.map((reason, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom of X-Ray: Real Email Payload with Inline Forensic Highlighting */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Email Payload with Forensic Highlighting
              </span>
              <span className="text-xs text-rose-700 font-semibold bg-rose-50 px-2.5 py-0.5 rounded border border-rose-100">
                Highlighted tokens = detected fraud patterns
              </span>
            </div>

            <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 text-sm font-mono space-y-3.5">
              <div className="pb-3 border-b border-slate-200/80 space-y-1.5">
                <div>
                  <span className="text-slate-400 font-medium">From: </span>
                  <HighlightedScamText text={activeScam.sender} />
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Date: </span>
                  <span className="text-slate-700">{activeScam.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Subject: </span>
                  <span className="text-slate-900 font-bold font-sans">
                    <HighlightedScamText text={displaySubject} />
                  </span>
                </div>
              </div>

              {/* Real raw Email Body with live highlighting */}
              <div className="text-slate-900 leading-relaxed font-sans text-sm whitespace-pre-wrap pt-1">
                <HighlightedScamText text={displayBody} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
