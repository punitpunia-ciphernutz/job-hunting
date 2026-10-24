"use client";

import React from "react";
import { ConsolidatedApplication } from "../types";

interface CareerTrackerProps {
  applications: ConsolidatedApplication[];
  onSelectApplication: (app: ConsolidatedApplication) => void;
}

const COLUMNS: {
  id: "applied" | "interview" | "offer" | "rejected";
  label: string;
  badgeBg: string;
}[] = [
  {
    id: "applied",
    label: "Applied",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
  },
  {
    id: "interview",
    label: "Interview",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "offer",
    label: "Offer",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "rejected",
    label: "Rejected",
    badgeBg: "bg-slate-100 text-slate-500 border-slate-200",
  },
];

export default function CareerTracker({
  applications,
  onSelectApplication,
}: CareerTrackerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const columnApps = applications.filter(
          (app) => app.current_status === col.id
        );

        return (
          <div
            key={col.id}
            className="flex flex-col rounded-xl bg-slate-50/70 border border-slate-200/80 p-3.5 min-h-[550px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 px-1">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-800">
                {col.label}
              </span>
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${col.badgeBg}`}
              >
                {columnApps.length}
              </span>
            </div>

            {/* Column Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {columnApps.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-sm text-slate-400 italic border border-dashed border-slate-200 rounded-lg">
                  No applications
                </div>
              ) : (
                columnApps.map((app) => (
                  <div
                    key={app.company_key}
                    onClick={() => onSelectApplication(app)}
                    className="group bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-4 shadow-2xs hover:shadow-xs transition cursor-pointer"
                  >
                    {/* Top Row: Company Name & Date */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                        {app.company_name}
                      </h4>
                      <span className="text-xs font-mono text-slate-400 shrink-0">
                        {app.latest_date.slice(5)}
                      </span>
                    </div>

                    {/* Middle: Role */}
                    <p className="text-sm text-slate-600 truncate mb-3">
                      {app.role}
                    </p>

                    {/* Bottom Meta Row (Max 2 subtle pills) */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {app.email_count > 1 && (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                          ↻ {app.email_count}-email thread
                        </span>
                      )}

                      {app.followup_due && (
                        <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          ⏰ {app.days_since_last_email}d silent • Follow up
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
