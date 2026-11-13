/**
 * ============================================================================
 * 🍌🍆 SOUMABHO DIHHHH STATUS - OPEN STATE CONFIGURATION 🍆🍌
 * ============================================================================
 * 
 * 👉 INSTRUCTIONS FOR SOUMABHO / ABHRAJIT:
 * 
 * You asked for three open variables for the state so you can type the states yourself.
 * Simply edit the text inside the quotes below!
 * 
 * You can also override these in your Vercel Dashboard under 
 * Project Settings -> Environment Variables:
 *   STATE_1="your text"
 *   STATE_2="your text"
 *   STATE_3="your text"
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 🟢 STATE 1: Type your first state here
// ----------------------------------------------------------------------------
export const STATE_1: string =
  process.env.STATE_1 ||
  process.env.NEXT_PUBLIC_STATE_1 ||
  "DIHHHH STATE 1: Feeling completely Bananas & fully ERECT! 🍌⚡";

// ----------------------------------------------------------------------------
// 🟣 STATE 2: Type your second state here
// ----------------------------------------------------------------------------
export const STATE_2: string =
  process.env.STATE_2 ||
  process.env.NEXT_PUBLIC_STATE_2 ||
  "DIHHHH STATE 2: Softieee and mushyy 🍆🕶️";
// ----------------------------------------------------------------------------
// 🟡 STATE 3: Type your third state here
// ----------------------------------------------------------------------------
export const STATE_3: string =
  process.env.STATE_3 ||
  process.env.NEXT_PUBLIC_STATE_3 ||
  "DIHHHH STATE 3: Critical level about to activate 👾🚀";

// ----------------------------------------------------------------------------
// Helper array aggregating the three open variables
// ----------------------------------------------------------------------------
export const ALL_DIHHH_STATES: string[] = [STATE_1, STATE_2, STATE_3];

export interface DihhhStatusResponse {
  status: string;
  stateIndex: number; // 1, 2, or 3
  totalStates: number;
  allStates: string[];
  dihhhMeter: number;
  bananaLevel: number;
  brinjalLevel: number;
  vibeText: string;
  updatedAt: string;
}

/**
 * Returns the next status.
 * If previousIndex is provided, it cycles to the next state so EVERY REFRESH GUARANTEES AN UPDATE!
 */
export function getNextDihhhStatus(previousIndex?: number): DihhhStatusResponse {
  const states = [
    process.env.STATE_1 || process.env.NEXT_PUBLIC_STATE_1 || STATE_1,
    process.env.STATE_2 || process.env.NEXT_PUBLIC_STATE_2 || STATE_2,
    process.env.STATE_3 || process.env.NEXT_PUBLIC_STATE_3 || STATE_3,
  ];

  let nextIndex: number;
  if (typeof previousIndex === "number" && !isNaN(previousIndex) && previousIndex >= 0) {
    // Cycle to next state (1 -> 2 -> 3 -> 1)
    nextIndex = (previousIndex + 1) % states.length;
  } else {
    // Random initial selection
    nextIndex = Math.floor(Math.random() * states.length);
  }

  const vibes = [
    "100% MAXIMUM DIHHHH",
    "HYPER-CHARGED PIXEL VIBES",
    "SUPER NOSTALGIC 8-BIT MODE",
    "BRINJAL FREQUENCY TUNED",
    "BANANA OVERLOAD PROTOCOL",
    "LEGENDARY ARCH-DIHHHH"
  ];

  return {
    status: states[nextIndex],
    stateIndex: nextIndex + 1, // 1-indexed for display
    totalStates: states.length,
    allStates: states,
    dihhhMeter: Math.floor(Math.random() * 25) + 75, // 75% to 100%
    bananaLevel: Math.floor(Math.random() * 50) + 50,
    brinjalLevel: Math.floor(Math.random() * 50) + 50,
    vibeText: vibes[Math.floor(Math.random() * vibes.length)],
    updatedAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  };
}

