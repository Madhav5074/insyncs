"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleJoin() {
    if (!code.trim()) return;
    setIsLoading(true);
    // This perfectly reuses all the security checks you already built!
    router.push(`/join/${code.trim()}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-6 selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/5 dark:shadow-white/5 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="relative flex items-center justify-center pt-2 h-14 mb-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="absolute left-0 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100 text-black shadow-sm transition-all active:scale-90 dark:bg-zinc-900 dark:text-white"
          >
            <span className="text-2xl leading-none -mt-1 font-light">←</span>
          </button>
        </div>

        <div className="text-center space-y-2 mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Join a Circle
          </h1>
          <p className="text-sm text-zinc-500">
            Enter the secret code provided by your squad leader.
          </p>
        </div>

        <div className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste code here..."
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900 text-center font-mono text-lg transition-all focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
          />

          <button
            onClick={handleJoin}
            disabled={!code.trim() || isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-black py-4 text-white font-medium shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-200 hover:bg-zinc-800 hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black"
          >
            {isLoading ? "Searching..." : "Find Circle"}
          </button>
        </div>

      </div>
    </div>
  );
}
