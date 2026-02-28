import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-14 text-black dark:bg-black dark:text-white selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <div className="w-full max-w-sm space-y-12 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Hero Section */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Image 
              src="/logo.png" 
              alt="InSyncs" 
              width={56} 
              height={56} 
              className="rounded-2xl shadow-sm"
              priority 
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">InSyncs</h1>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              No noise. Just consistency.
            </p>
          </div>
        </div>

        {/* Feature List (Sleek Typography & Borders) */}
        <div className="space-y-6">
          <div className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
            <h3 className="text-sm font-semibold tracking-tight">Small Circles</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Dedicated groups focused entirely on building one daily habit together.
            </p>
          </div>

          <div className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
            <h3 className="text-sm font-semibold tracking-tight">Verified Action</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Location-based check-ins ensure real-world proof, not just pressed buttons.
            </p>
          </div>

          <div className="relative pl-4 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[2px] before:bg-zinc-200 dark:before:bg-zinc-800">
            <h3 className="text-sm font-semibold tracking-tight">Cycle Progression</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Track completed cycles to eliminate the pressure of endless, easily broken streaks.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/auth"
            className="flex w-full items-center justify-center rounded-2xl bg-black px-4 py-4 text-sm font-bold text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] dark:bg-white dark:text-black dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
          >
            Get Started
          </Link>
        </div>

      </div>
    </div>
  );
}
