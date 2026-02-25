"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: "Home", path: "/dashboard" },
    { name: "Board", path: "/leaderboard" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
      <div className="
        w-full max-w-md mx-4
        backdrop-blur-xl
        bg-white/60 dark:bg-black/50
        border border-white/30 dark:border-zinc-800/50
        rounded-3xl
        shadow-xl
        flex justify-around
        py-3
      ">
        {tabs.map((tab) => {
          const active = pathname === tab.path;

          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className={`
                relative text-xs transition-all duration-200
                ${active
                  ? "text-black dark:text-white font-semibold"
                  : "text-zinc-500"}
              `}
            >
              {active && (
                <span className="
                  absolute -top-2 left-1/2 -translate-x-1/2
                  h-1 w-6 rounded-full bg-black dark:bg-white
                " />
              )}
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
