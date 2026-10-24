"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Upload,
  Download,
  RotateCcw,
  Zap,
  ChevronDown,
  MoreHorizontal,
  Settings,
  MailCheck,
  ShieldAlert,
  Cpu
} from "lucide-react";

interface NavbarProps {
  referenceDate: string;
  onReferenceDateChange: (newDate: string) => void;
  engineUsed: string;
  onSimulateEventA: () => void;
  onSimulateEventB: () => void;
  onResetDemo: () => void;
  onFileUpload: (file: File) => void;
  onOpenSettings: () => void;
  isProcessing: boolean;
  apiUrl: string;
}

export default function Navbar({
  referenceDate,
  onReferenceDateChange,
  engineUsed,
  onSimulateEventA,
  onSimulateEventB,
  onResetDemo,
  onFileUpload,
  onOpenSettings,
  isProcessing,
  apiUrl,
}: NavbarProps) {
  const [simulateOpen, setSimulateOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (simulateRef.current && !simulateRef.current.contains(event.target as Node)) {
        setSimulateOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  const isGemini = engineUsed.toLowerCase().includes("gemini");

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between gap-4">
        {/* Left: Minimal Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
            TT
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 tracking-tight text-lg">
              TaaliTrack
            </span>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
              Aarav&apos;s Job Hunt
            </span>
          </div>
        </div>

        {/* Right: Exactly 4 Clean Controls */}
        <div className="flex items-center gap-3">
          {/* 1. Compact Reference Date Picker */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.5 text-sm text-slate-700 transition">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span className="text-slate-500 font-medium hidden md:inline">Today:</span>
            <input
              type="date"
              value={referenceDate}
              onChange={(e) => onReferenceDateChange(e.target.value)}
              className="bg-transparent text-slate-900 font-mono text-sm focus:outline-none cursor-pointer w-[115px]"
              title="Time-Travel Reference Date (recalculates 7-day follow-up due status)"
            />
          </div>

          {/* 2. + Simulate Live Dropdown */}
          <div className="relative" ref={simulateRef}>
            <button
              onClick={() => setSimulateOpen(!simulateOpen)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition shadow-xs"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">+ Simulate</span>
              <span className="sm:hidden">+</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {simulateOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Simulate Incoming Email
                </div>
                <button
                  onClick={() => {
                    setSimulateOpen(false);
                    onSimulateEventA();
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-blue-50/70 transition flex items-start gap-2.5 text-sm group"
                >
                  <MailCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600">
                      Zentech Interview Reply
                    </div>
                    <div className="text-xs text-slate-500 leading-snug">
                      Upgrades from Applied (14d wait) &rarr; Interview
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setSimulateOpen(false);
                    onSimulateEventB();
                  }}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-rose-50/70 transition flex items-start gap-2.5 text-sm group"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-900 group-hover:text-rose-600">
                      Wipro Hinglish Laptop Fee Scam
                    </div>
                    <div className="text-xs text-slate-500 leading-snug">
                      Demands Rs 3,500 + PAN &rarr; Quarantined
                    </div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* 3. Primary Royal Blue Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,.mbox"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-xs disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Inbox</span>
          </button>

          {/* 4. More (⋯) Secondary Menu */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition shadow-xs"
              title="More Actions & Settings"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-sm">
                {/* Engine status indicator */}
                <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span>Engine:</span>
                  </div>
                  <span
                    className={`font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                      isGemini
                        ? "bg-blue-50 text-blue-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {isGemini ? "Gemini 2.5 Flash" : "Hybrid Fallback"}
                  </span>
                </div>

                <a
                  href={`${apiUrl}/api/download-sample-mbox`}
                  download="sample_inbox.mbox"
                  onClick={() => setMoreOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition"
                >
                  <Download className="w-4 h-4 text-slate-400" />
                  <span>Download Sample .mbox</span>
                </a>

                <button
                  onClick={() => {
                    setMoreOpen(false);
                    onResetDemo();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition text-left"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>Reset 20-Email Demo</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    setMoreOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 transition text-left"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Gemini API Key Settings</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
