import { NextRequest, NextResponse } from "next/server";
import { getNextDihhhStatus } from "@/app/config/statusConfig";

// Ensure this API route is NEVER cached by Vercel / Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  // Read previous index from cookie or query param to guarantee an update on every refresh
  const cookieVal = request.cookies.get("dihhh_prev_index")?.value;
  const urlIndex = request.nextUrl.searchParams.get("prev");
  
  let prevIndex: number | undefined = undefined;
  if (urlIndex !== null && !isNaN(parseInt(urlIndex))) {
    prevIndex = parseInt(urlIndex, 10);
  } else if (cookieVal !== undefined && !isNaN(parseInt(cookieVal))) {
    prevIndex = parseInt(cookieVal, 10);
  }

  const result = getNextDihhhStatus(prevIndex);

  const response = NextResponse.json(result, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });

  // Store the 0-indexed state in the cookie so the next refresh transitions to the next state!
  response.cookies.set("dihhh_prev_index", String(result.stateIndex - 1), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  });

  return response;
}

