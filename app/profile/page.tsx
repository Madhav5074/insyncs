"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";

type MemberStats = {
  streak: number;
  completedCycles: number;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [totalCycles, setTotalCycles] = useState(0);
  const [activeStreaks, setActiveStreaks] = useState(0);
  const [circlesCount, setCirclesCount] = useState(0);

  useEffect(() => {
    async function loadProfile() {
      const user = auth.currentUser;
      if (!user) {
        router.push("/auth");
        return;
      }

      setEmail(user.email || "");

      let cycles = 0;
      let streaks = 0;
      let circles = 0;

      // Get all circles
      const circlesSnap = await getDocs(collection(db, "circles"));

      for (const circleDoc of circlesSnap.docs) {
        const memberRef = collection(
          db,
          "circles",
          circleDoc.id,
          "members"
        );

        const memberSnap = await getDocs(memberRef);

        memberSnap.docs.forEach((doc) => {
          if (doc.id === user.uid) {
            circles += 1;
            const data = doc.data() as MemberStats;
            cycles += data.completedCycles || 0;
            streaks += data.streak || 0;
          }
        });
      }

      setCirclesCount(circles);
      setTotalCycles(cycles);
      setActiveStreaks(streaks);
      setLoading(false);
    }

    loadProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black px-6 py-10 text-black dark:text-white">
      <div className="mx-auto max-w-md space-y-6">

        <h1 className="text-2xl font-semibold">Your Profile</h1>

        {/* Identity */}
        <div className="rounded-2xl border p-4">
          <p className="text-xs text-zinc-500">Logged in as</p>
          <p className="font-medium">{email}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border p-4 text-center">
            <p className="text-xs text-zinc-500">Circles</p>
            <p className="text-2xl font-bold">{circlesCount}</p>
          </div>

          <div className="rounded-2xl border p-4 text-center">
            <p className="text-xs text-zinc-500">Completed Cycles</p>
            <p className="text-2xl font-bold">{totalCycles} 🏆</p>
          </div>

          <div className="rounded-2xl border p-4 text-center col-span-2">
            <p className="text-xs text-zinc-500">Active Streak Power</p>
            <p className="text-3xl font-bold">{activeStreaks} 🔥</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full rounded-full bg-black py-3 text-white dark:bg-white dark:text-black"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}