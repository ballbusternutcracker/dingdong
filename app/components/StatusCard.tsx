"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PixelBanana, PixelBrinjal, PixelSparkle } from "./PixelIcons";
import { sound } from "@/app/utils/sound";
import { DihhhStatusResponse } from "@/app/config/statusConfig";

interface StatusCardProps {
  initialStatus: DihhhStatusResponse;
}

export default function StatusCard({ initialStatus }: StatusCardProps) {
  const [statusData, setStatusData] = useState<DihhhStatusResponse>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [animating, setAnimating] = useState(false);

  // Editable preview states for the test bench
  const [customStates, setCustomStates] = useState<[string, string, string]>([
    initialStatus.allStates?.[0] || "",
    initialStatus.allStates?.[1] || "",
    initialStatus.allStates?.[2] || "",
  ]);
  const [useLocalCustom, setUseLocalCustom] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Sync sound state
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  // Re-roll status via Backend API
  const handleReroll = async () => {
    if (soundEnabled) {
      sound.playClick();
    }
    setLoading(true);
    setAnimating(true);

    try {
      if (useLocalCustom) {
        // Cycle custom states locally
        const nextIdx = (statusData.stateIndex % 3);
        setStatusData((prev) => ({
          ...prev,
          status: customStates[nextIdx],
          stateIndex: nextIdx + 1,
          dihhhMeter: Math.floor(Math.random() * 25) + 75,
          updatedAt: new Date().toLocaleTimeString(),
        }));
        if (soundEnabled) sound.playPowerUp();
      } else {
        // Fetch from dynamic backend route
        const res = await fetch(`/api/status?prev=${statusData.stateIndex - 1}&t=${Date.now()}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const json: DihhhStatusResponse = await res.json();
          setStatusData(json);
          if (soundEnabled) sound.playPowerUp();
        }
      }
      setRefreshCount((c) => c + 1);
    } catch (e) {
      console.error("Failed to fetch fresh status:", e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setAnimating(false);
      }, 300);
    }
  };

  const handleBrowserRefresh = () => {
    if (soundEnabled) sound.playClick();
    window.location.reload();
  };

  // 8-bit Meter Blocks calculation (out of 10)
  const meterBlocks = Math.round((statusData.dihhhMeter / 100) * 10);

  const configSnippet = `// In app/config/statusConfig.ts
export const STATE_1: string = "${customStates[0]}";
export const STATE_2: string = "${customStates[1]}";
export const STATE_3: string = "${customStates[2]}";`;

  const copyConfigSnippet = () => {
    navigator.clipboard.writeText(configSnippet);
    setCopiedCode(true);
    if (soundEnabled) sound.playBananaChime();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* CRT Scanline Overlay toggle */}
      {crtEnabled && <div className="crt-overlay fixed inset-0 z-50 pointer-events-none" />}

      {/* Top Banner / Retro Header */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center justify-center gap-3 mb-2 flex-wrap">
          <PixelBanana size={36} className="animate-retro-bounce drop-shadow-[0_4px_0_#000]" />
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#facc15] tracking-wider pixel-glow-yellow font-[family-name:var(--font-pixel)] uppercase drop-shadow-[4px_4px_0px_#4c1d95]"
            style={{ textShadow: "3px 3px 0 #3b0764, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}
          >
            Soumabho dihhhh status
          </h1>
          <PixelBrinjal size={36} className="animate-retro-bounce [animation-delay:0.3s] drop-shadow-[0_4px_0_#000]" />
        </div>
        <p className="font-[family-name:var(--font-vt)] text-lg sm:text-xl text-[#e9d5ff] tracking-widest flex items-center justify-center gap-2">
          <span>[ OFFICIAL REAL-TIME TRACKER ]</span>
          <span className="inline-block w-2 h-2 bg-green-400 rounded-none animate-pixel-blink" />
          <span className="text-green-400">ONLINE</span>
        </p>
      </div>

      {/* Arcade Chassis / Card Container */}
      <div className="w-full bg-[#200a35]/95 border-4 border-[#facc15] rounded-none shadow-[0_0_0_4px_#3b0764,8px_8px_0_4px_rgba(0,0,0,0.85)] p-5 sm:p-7 relative overflow-hidden backdrop-blur-sm">
        {/* Pixel Corner Accents */}
        <div className="absolute top-2 left-2 flex gap-1">
          <PixelSparkle size={10} color="#facc15" />
          <PixelSparkle size={10} color="#ff70a6" />
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <PixelSparkle size={10} color="#ff70a6" />
          <PixelSparkle size={10} color="#facc15" />
        </div>

        {/* Portrait Display Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            {/* Outer Retro Bezel */}
            <div className="p-2 bg-[#120420] border-4 border-[#a855f7] shadow-[4px_4px_0_0_#000] relative">
              {/* Corner badge icons */}
              <div
                onClick={() => soundEnabled && sound.playBananaChime()}
                className="absolute -top-4 -left-4 bg-[#2e1065] p-1 border-2 border-[#facc15] cursor-pointer hover:scale-110 transition-transform shadow-[2px_2px_0_0_#000]"
                title="Click for Banana Power!"
              >
                <PixelBanana size={24} />
              </div>
              <div
                onClick={() => soundEnabled && sound.playBrinjalVibe()}
                className="absolute -top-4 -right-4 bg-[#2e1065] p-1 border-2 border-[#a855f7] cursor-pointer hover:scale-110 transition-transform shadow-[2px_2px_0_0_#000]"
                title="Click for Brinjal Bass!"
              >
                <PixelBrinjal size={24} />
              </div>

              {/* The Provided Soumabho Image */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 overflow-hidden border-2 border-[#4c1d95]">
                <Image
                  src="/soumabho.jpg"
                  alt="Soumabho dihhhh pixel art portrait with bananas and brinjals"
                  fill
                  priority
                  className="object-cover pixelated"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* Subtle Screen Bezel Glare */}
              <div className="absolute inset-2 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Sub-tag below image */}
            <div className="mt-2 text-center">
              <span className="font-[family-name:var(--font-vt)] text-sm tracking-wider text-[#d8b4fe] bg-[#120420] px-3 py-1 border border-[#a855f7]/50 inline-block shadow-[2px_2px_0_0_#000]">
                LEVEL 99 ARCH-DIHHHH 🍌🍆
              </span>
            </div>
          </div>
        </div>

        {/* Current DIHHHH STATUS Box */}
        <div className="w-full bg-[#120420] border-4 border-[#a855f7] p-4 sm:p-5 shadow-[inset_0_0_12px_rgba(0,0,0,0.8),4px_4px_0_0_#000] mb-5 relative">
          {/* Header Row of the Terminal */}
          <div className="flex items-center justify-between border-b-2 border-[#4c1d95] pb-2 mb-3 font-[family-name:var(--font-pixel)] text-[10px] sm:text-xs">
            <span className="text-[#facc15] flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#facc15] animate-pixel-blink" />
              STATUS SLOT [{statusData.stateIndex} / {statusData.totalStates || 3}]
            </span>
            <span className="text-[#c084fc] font-[family-name:var(--font-vt)] text-sm">
              SYNC: {statusData.updatedAt}
            </span>
          </div>

          {/* Prompt Symbol & Status Text */}
          <div className="min-h-[70px] flex items-center">
            <div className={`w-full ${animating ? "animate-status-pop" : ""}`}>
              <div className="font-[family-name:var(--font-pixel)] text-xs text-[#a855f7] mb-1.5 flex items-center gap-1.5">
                <span>&gt;</span>
                <span className="uppercase text-[#cbd5e1]">CURRENT ACTIVE DIHHHH STATE:</span>
              </div>
              <p
                className="font-[family-name:var(--font-pixel)] text-sm sm:text-base md:text-lg text-[#ffffff] leading-relaxed break-words pixel-glow-purple bg-[#1d0633] p-3 border-2 border-[#6b21a8] shadow-[2px_2px_0_0_#000]"
                style={{ textShadow: "2px 2px 0px #000, 0 0 8px rgba(250, 204, 21, 0.5)" }}
              >
                {statusData.status}
              </p>
            </div>
          </div>

          {/* Vibe Tagline */}
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[#3b0764]">
            <span className="font-[family-name:var(--font-vt)] text-base text-[#facc15] tracking-wider">
              VIBE: {statusData.vibeText}
            </span>
            <span className="font-[family-name:var(--font-vt)] text-sm text-[#a855f7]">
              SESSION ROLLS: {refreshCount}
            </span>
          </div>
        </div>

        {/* Retro 8-Bit Energy Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-[family-name:var(--font-vt)]">
          {/* Gauge 1: Dihhh Power Meter */}
          <div className="bg-[#120420] border-2 border-[#4c1d95] p-2.5 shadow-[2px_2px_0_0_#000]">
            <div className="flex justify-between text-xs text-[#e9d5ff] mb-1">
              <span>DIHHHH OVERDRIVE</span>
              <span className="text-[#facc15] font-bold">{statusData.dihhhMeter}%</span>
            </div>
            {/* Segmented Pixel Bar */}
            <div className="flex gap-1 h-3 bg-[#0a0212] p-0.5 border border-[#4c1d95]">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-all ${
                    i < meterBlocks
                      ? i > 7
                        ? "bg-red-500 shadow-[0_0_6px_#ef4444]"
                        : i > 4
                        ? "bg-[#facc15] shadow-[0_0_6px_#facc15]"
                        : "bg-green-400 shadow-[0_0_6px_#4ade80]"
                      : "bg-[#250d3b]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Gauge 2: Banana & Brinjal Synergy */}
          <div className="bg-[#120420] border-2 border-[#4c1d95] p-2.5 shadow-[2px_2px_0_0_#000] flex items-center justify-around text-center">
            <div className="flex items-center gap-1.5">
              <PixelBanana size={20} />
              <div className="text-left">
                <div className="text-[10px] text-[#fde047] leading-none">BANANA LVL</div>
                <div className="text-sm font-bold text-white leading-tight">{statusData.bananaLevel}%</div>
              </div>
            </div>
            <div className="h-6 w-[2px] bg-[#3b0764]" />
            <div className="flex items-center gap-1.5">
              <PixelBrinjal size={20} />
              <div className="text-left">
                <div className="text-[10px] text-[#c084fc] leading-none">BRINJAL PWR</div>
                <div className="text-sm font-bold text-white leading-tight">{statusData.brinjalLevel * 10} DP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mb-4 font-[family-name:var(--font-pixel)] text-xs">
          {/* Main Reroll Button */}
          <button
            onClick={handleReroll}
            disabled={loading}
            className="flex-1 pixel-btn-yellow py-3.5 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer uppercase select-none disabled:opacity-75"
          >
            <span className={loading ? "animate-spin" : ""}>🎲</span>
            <span>{loading ? "ROLLING..." : "RE-ROLL STATUS"}</span>
          </button>

          {/* Browser Refresh Button */}
          <button
            onClick={handleBrowserRefresh}
            className="flex-1 pixel-btn-purple py-3.5 px-4 font-bold flex items-center justify-center gap-2 cursor-pointer uppercase select-none"
            title="Performs full browser refresh to test server update"
          >
            <span>🔄</span>
            <span>REFRESH SITE</span>
          </button>
        </div>

        {/* Secondary Utility Controls */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t-2 border-[#3b0764] text-[10px] font-[family-name:var(--font-pixel)] text-[#d8b4fe]">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="px-2.5 py-1.5 bg-[#120420] border border-[#a855f7] hover:bg-[#2e1065] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{soundEnabled ? "🔊" : "🔇"}</span>
              <span>SFX: {soundEnabled ? "ON" : "OFF"}</span>
            </button>
            <button
              onClick={() => setCrtEnabled(!crtEnabled)}
              className="px-2.5 py-1.5 bg-[#120420] border border-[#a855f7] hover:bg-[#2e1065] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>📺</span>
              <span>CRT: {crtEnabled ? "ON" : "OFF"}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (soundEnabled) sound.playClick();
              setShowConfigModal(true);
            }}
            className="px-3 py-1.5 bg-[#facc15] text-[#120420] font-bold border border-[#ca8a04] hover:bg-[#fde047] transition-colors cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0_0_#000]"
          >
            <span>⚙️</span>
            <span>MY 3 STATES</span>
          </button>
        </div>
      </div>

      {/* Info Footnote */}
      <div className="mt-4 text-center font-[family-name:var(--font-vt)] text-sm sm:text-base text-[#c084fc] flex flex-col items-center gap-1">
        <p className="flex items-center gap-2">
          <span>🍌 Soumabho dihhhh status tracker</span>
          <span>•</span>
          <span>🍆 Ready for Vercel</span>
        </p>
        <p className="text-xs text-[#a855f7]">
          Every refresh contacts the backend to update Soumabho&apos;s active dihhhh state!
        </p>
      </div>

      {/* Retro Modal: Open Variables Configuration & Test Bench */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#1b072b] border-4 border-[#facc15] w-full max-w-xl p-6 shadow-[0_0_0_4px_#3b0764,10px_10px_0_0_#000] relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#4c1d95] pb-3 mb-4">
              <h2 className="font-[family-name:var(--font-pixel)] text-sm sm:text-base text-[#facc15] flex items-center gap-2">
                <span>⚙️</span> CONFIGURE 3 STATES
              </h2>
              <button
                onClick={() => {
                  if (soundEnabled) sound.playClick();
                  setShowConfigModal(false);
                }}
                className="font-[family-name:var(--font-pixel)] text-xs text-red-400 hover:text-red-300 px-2 py-1 bg-[#120420] border border-red-500 cursor-pointer"
              >
                [X] CLOSE
              </button>
            </div>

            <p className="font-[family-name:var(--font-vt)] text-base text-[#e9d5ff] mb-4">
              You asked for <strong>three open variables</strong> for the states so you can type them yourself.
              You can edit them directly in <code className="text-[#facc15] bg-[#120420] px-1">app/config/statusConfig.ts</code>, set them in your Vercel Environment Variables, or preview them live below:
            </p>

            {/* 3 Open Input Fields */}
            <div className="space-y-4 mb-5">
              <div>
                <label className="block font-[family-name:var(--font-pixel)] text-[10px] text-green-400 mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 inline-block" />
                  STATE 1 VARIABLE (STATE_1):
                </label>
                <input
                  type="text"
                  value={customStates[0]}
                  onChange={(e) => setCustomStates([e.target.value, customStates[1], customStates[2]])}
                  className="w-full bg-[#120420] border-2 border-[#4c1d95] text-white p-2.5 font-[family-name:var(--font-vt)] text-lg focus:border-[#facc15] outline-none"
                  placeholder="Type state 1 here..."
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-pixel)] text-[10px] text-[#c084fc] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#c084fc] inline-block" />
                  STATE 2 VARIABLE (STATE_2):
                </label>
                <input
                  type="text"
                  value={customStates[1]}
                  onChange={(e) => setCustomStates([customStates[0], e.target.value, customStates[2]])}
                  className="w-full bg-[#120420] border-2 border-[#4c1d95] text-white p-2.5 font-[family-name:var(--font-vt)] text-lg focus:border-[#facc15] outline-none"
                  placeholder="Type state 2 here..."
                />
              </div>

              <div>
                <label className="block font-[family-name:var(--font-pixel)] text-[10px] text-[#facc15] mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#facc15] inline-block" />
                  STATE 3 VARIABLE (STATE_3):
                </label>
                <input
                  type="text"
                  value={customStates[2]}
                  onChange={(e) => setCustomStates([customStates[0], customStates[1], e.target.value])}
                  className="w-full bg-[#120420] border-2 border-[#4c1d95] text-white p-2.5 font-[family-name:var(--font-vt)] text-lg focus:border-[#facc15] outline-none"
                  placeholder="Type state 3 here..."
                />
              </div>
            </div>

            {/* Test Live Preview Toggle */}
            <div className="bg-[#120420] border border-[#a855f7] p-3 mb-4 flex items-center justify-between">
              <span className="font-[family-name:var(--font-vt)] text-base text-[#e9d5ff]">
                Live In-Browser Preview Mode:
              </span>
              <button
                onClick={() => {
                  if (soundEnabled) sound.playClick();
                  setUseLocalCustom(!useLocalCustom);
                  if (!useLocalCustom) {
                    setStatusData((prev) => ({
                      ...prev,
                      status: customStates[0],
                      stateIndex: 1,
                      allStates: customStates,
                    }));
                  }
                }}
                className={`font-[family-name:var(--font-pixel)] text-[10px] px-3 py-1.5 border cursor-pointer ${
                  useLocalCustom
                    ? "bg-green-500 text-black border-green-300 font-bold"
                    : "bg-[#250d3b] text-gray-300 border-gray-600"
                }`}
              >
                {useLocalCustom ? "ENABLED (USING TYPED STATES)" : "DEFAULT (USING BACKEND FILE)"}
              </button>
            </div>

            {/* Quick Copy Code Button */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-gray-400">
                  CODE FOR app/config/statusConfig.ts:
                </span>
                <button
                  onClick={copyConfigSnippet}
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-[#facc15] hover:underline cursor-pointer"
                >
                  {copiedCode ? "✓ COPIED!" : "COPY TO CLIPBOARD"}
                </button>
              </div>
              <pre className="bg-[#0a0212] p-2.5 border border-[#3b0764] text-xs text-green-400 font-mono overflow-x-auto">
                {configSnippet}
              </pre>
            </div>

            {/* Vercel Deployment Tip */}
            <div className="bg-[#240a38] border-l-4 border-[#facc15] p-3 text-xs font-[family-name:var(--font-vt)] text-[#f3e8ff]">
              <p className="font-bold text-[#facc15] mb-1">🚀 DEPLOY TO VERCEL TIP:</p>
              <p>
                Run <code className="text-white bg-black/40 px-1">npx vercel</code> or link this GitHub repo to Vercel.
                You can configure <code className="text-[#facc15]">STATE_1</code>, <code className="text-[#facc15]">STATE_2</code>, and <code className="text-[#facc15]">STATE_3</code> right in Vercel Dashboard Settings &gt; Environment Variables without even touching the code!
              </p>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => {
                  if (soundEnabled) sound.playClick();
                  setShowConfigModal(false);
                }}
                className="pixel-btn-yellow font-[family-name:var(--font-pixel)] text-xs py-2 px-5 font-bold cursor-pointer uppercase"
              >
                APPLY &amp; RETURN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

