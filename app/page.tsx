import { cookies } from "next/headers";
import PixelBackground from "./components/PixelBackground";
import StatusCard from "./components/StatusCard";
import { getNextDihhhStatus } from "./config/statusConfig";

// Ensure this page is dynamically computed on EVERY SINGLE request/refresh
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const cookieStore = await cookies();
  const prevVal = cookieStore.get("dihhh_prev_index")?.value;
  const prevIndex = prevVal !== undefined && !isNaN(parseInt(prevVal, 10)) ? parseInt(prevVal, 10) : undefined;

  // On every refresh, compute the updated dihhhh status from the backend!
  const initialStatus = getNextDihhhStatus(prevIndex);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden selection:bg-[#facc15] selection:text-[#1e0538]">
      {/* Dynamic Animated Pixel Bananas, Brinjals & Sparkles Background */}
      <PixelBackground />

      {/* Main Arcade Status Machine */}
      <StatusCard initialStatus={initialStatus} />
    </main>
  );
}
