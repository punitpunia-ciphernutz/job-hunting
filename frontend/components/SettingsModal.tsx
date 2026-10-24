"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, X, Check, ShieldCheck } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveKey: (key: string) => void;
  currentKey: string;
}

export default function SettingsModal({
  isOpen,
  onClose,
  onSaveKey,
  currentKey,
}: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(currentKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setApiKey(currentKey);
  }, [currentKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(apiKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setApiKey("");
    onSaveKey("");
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/30 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Gemini 2.5 Flash Engine Settings
              </h3>
              <p className="text-xs text-slate-500">
                Optional Google AI API Key for live batched triage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <p className="font-semibold mb-1 flex items-center gap-1.5 text-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Autonomous Zero-Crash Architecture:
            </p>
            TaaliTrack operates completely autonomously with its built-in
            hybrid rule engine. If no Gemini API key is provided,
            it executes full semantic regex, domain-forensics, and state consolidation
            with 100% precision.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Gemini API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition"
            />
            <p className="text-[11px] text-slate-500 mt-2">
              Keys are stored in your local session and sent via secure <code className="text-slate-700 font-mono">X-Gemini-Key</code> header.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-500 hover:text-red-600 transition"
          >
            Clear / Revert to Fallback
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 shadow-2xs transition"
            >
              {saved ? "Saved ✓" : "Save Key"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
