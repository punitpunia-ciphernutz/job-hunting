"use client";

import React, { useState } from "react";
import { Copy, Check, X, Mail, Sparkles } from "lucide-react";
import { ConsolidatedApplication } from "../types";

interface FollowupModalProps {
  application: ConsolidatedApplication | null;
  onClose: () => void;
}

export default function FollowupModal({ application, onClose }: FollowupModalProps) {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!application) return null;

  const subject = application.followup_subject || `Follow-Up: Application for ${application.role} - Aarav Patel`;
  const body = application.followup_body || (
    `Dear ${application.company_name} Hiring Team,\n\n` +
    `I hope this email finds you well. I am writing to politely follow up on my application for the ${application.role} position submitted on ${application.latest_date}. I remain very eager to bring my backend engineering and distributed systems expertise to ${application.company_name}.\n\n` +
    `Could you please let me know if any updates are available regarding the hiring process timeline? I have attached my updated resume and GitHub portfolio for your reference.\n\n` +
    `Thank you for your continued consideration.\n\n` +
    `Best regards,\n` +
    `Aarav Patel\n` +
    `aarav.patel.dev@gmail.com | +91 98765 43210`
  );

  const copyToClipboard = (text: string, type: "subject" | "body" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "subject") {
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } else if (type === "body") {
      setCopiedBody(false);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } else {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111827] border border-amber-500/40 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl shadow-amber-500/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#161F30]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                1-Click Follow-Up Draft
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                  {application.days_since_last_email}d Waiting
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Personalized professional reach-out for <span className="text-white font-medium">{application.company_name}</span> ({application.role})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Subject Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Email Subject
              </label>
              <button
                onClick={() => copyToClipboard(subject, "subject")}
                className="text-xs flex items-center gap-1 text-amber-400 hover:text-amber-300 transition"
              >
                {copiedSubject ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Subject</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#090D16] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-gray-200 font-mono select-all">
              {subject}
            </div>
          </div>

          {/* Body Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Email Body
              </label>
              <button
                onClick={() => copyToClipboard(body, "body")}
                className="text-xs flex items-center gap-1 text-amber-400 hover:text-amber-300 transition"
              >
                {copiedBody ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Body</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#090D16] border border-gray-800 rounded-xl p-4 text-sm text-gray-300 font-sans leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto select-all">
              {body}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#0E1524]">
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Polite tone adhering to Indian tech hiring etiquette
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-xl text-gray-300 hover:bg-gray-800 transition"
            >
              Close
            </button>
            <button
              onClick={() => copyToClipboard(`Subject: ${subject}\n\n${body}`, "all")}
              className="px-5 py-2 text-xs font-medium rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied Entire Email!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Entire Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
