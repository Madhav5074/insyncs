"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [circles, setCircles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // NEW: Tracks data loading
  const router = useRouter();

  useEffect(() => {
    // NEW: Safely wait for Firebase to confirm the user's login state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }

      try {
        const q = query(
          collection(db, "circles"),
          where("members", "array-contains", user.uid)
        );

        const snap = await getDocs(q);
        setCircles(
          snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        console.error("Failed to fetch circles", error);
      } finally {
        setIsLoading(false); // Stop loading animation once data arrives
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen p-6 bg-zinc-50 dark:bg-black text-black dark:text-white selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <div className="max-w-md mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header Section */}
        <div className="flex items-center justify-between pt-4">
          <h1 className="text-3xl font-bold tracking-tight">My Circles</h1>
          
          {/* Moved profile button to the top right for a native app feel */}
          <button
            onClick={() => router.push("/profile")}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-95"
            aria-label="Profile"
          >
            👤
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {isLoading ? (
            // Skeleton Loading State
            <>
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="h-20 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800/50 animate-pulse" />
              ))}
            </>
          ) : circles.length === 0 ? (
            // Empty State (When they have no circles)
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-lg font-medium">No circles yet</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Create your first circle to start syncing up with your friends.
              </p>
            </div>
          ) : (
            // Loaded State (List of circles)
            circles.map((circle) => (
              <div
                key={circle.id}
                onClick={() => router.push(`/circle/${circle.id}`)}
                className="group relative flex items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm cursor-pointer transition-all duration-200 active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  {/* Generates a nice little avatar placeholder based on the circle's name */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-lg">
                    {circle.name ? circle.name.charAt(0).toUpperCase() : "#"}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{circle.name}</h2>
                    <p className="text-sm text-zinc-500">Tap to view</p>
                  </div>
                </div>
                
                {/* Arrow icon that moves slightly on hover */}
                <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
                  ➔
                </span>
              </div>
            ))
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => router.push("/create")}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-black py-4 text-white font-medium transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <span className="text-xl">+</span> Create New Circle
        </button>
      </div>
    </div>
  );
}
