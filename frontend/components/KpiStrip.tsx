"use client";

import React from "react";
import { Building2, Calendar, Award, ClockAlert, ShieldAlert } from "lucide-react";

interface KpiStripProps {
  companiesTracked: number;
  activeInterviews: number;
  genuineOffers: number;
  followupsDue: number;
  scamsBlocked: number;
  onFilterStatus?: (status: string | null) => void;
  activeFilter?: string | null;
}

export default function KpiStrip({
  companiesTracked,
  activeInterviews,
  genuineOffers,
  followupsDue,
  scamsBlocked,
  onFilterStatus,
  activeFilter,
}: KpiStripProps) {
  const cards = [
    {
      id: "all",
      label: "Companies Tracked",
      value: companiesTracked,
      subtext: "Legitimate application threads",
      icon: Building2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      filterValue: null,
    },
    {
      id: "interview",
      label: "Active Interviews",
      value: activeInterviews,
      subtext: "Technical & System Design rounds",
      icon: Calendar,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      filterValue: "interview",
    },
    {
      id: "offer",
      label: "Genuine Offers",
      value: genuineOffers,
      subtext: "Verified employment offers",
      icon: Award,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      filterValue: "offer",
    },
    {
      id: "followup",
      label: "Follow-Ups Due",
      value: followupsDue,
      subtext: ">= 7 days without recruiter reply",
      icon: ClockAlert,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/40",
      filterValue: "followup",
      pulse: followupsDue > 0,
    },
    {
      id: "scam",
      label: "Fake Offers Blocked",
      value: scamsBlocked,
      subtext: "Quarantined forensic threats",
      icon: ShieldAlert,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/40",
      filterValue: "scam",
      alert: scamsBlocked > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected =
          (card.filterValue === null && activeFilter === null) ||
          (card.filterValue !== null && activeFilter === card.filterValue);

        return (
          <div
            key={card.id}
            onClick={() => onFilterStatus && onFilterStatus(card.filterValue)}
            className={`cursor-pointer relative overflow-hidden rounded-2xl p-4 border bg-[#111827] transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg ${
              card.borderColor
            } ${isSelected ? "ring-2 ring-amber-500/50 shadow-md" : ""} ${
              card.pulse ? "glow-amber-pulse" : ""
            } ${card.alert ? "glow-crimson" : ""}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl ${card.bgColor} ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                {card.value}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
