"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

export default function CirclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [circle, setCircle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [copied, setCopied] = useState(false);

  // Stats State
  const [streak, setStreak] = useState(0);
  const [cycleDay, setCycleDay] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const todayKey = new Date().toISOString().split("T")[0];

  function getYesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }

  // 1. LIVE LISTENER: Watch the circle for updates (like a partner joining)
  useEffect(() => {
    if (!id) return;
    
    // onSnapshot automatically updates 'circle' the second the database changes
    const unsubscribeCircle = onSnapshot(doc(db, "circles", id), (snap) => {
      if (snap.exists()) {
        setCircle({ id: snap.id, ...snap.data() });
      } else {
        router.push("/dashboard"); // Circle was deleted or doesn't exist
      }
      setLoading(false);
    });

    return () => unsubscribeCircle();
  }, [id, router]);

  // 2. LOAD PROGRESS: Fetch the current user's personal habit stats
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth");
        return;
      }

      if (id) {
        const memberSnap = await getDoc(doc(db, "circles", id, "members", user.uid));
        if (memberSnap.exists()) {
          const data = memberSnap.data();
          setStreak(data.streak || 0);
          setCycleDay(data.cycleDay || 0);
          setCompletedCycles(data.completedCycles || 0);

          if (data.lastCheckin === todayKey) {
            setCheckedInToday(true);
          }
        }
      }
    });

    return () => unsubscribeAuth();
  }, [id, todayKey, router]);

  async function checkIn() {
    const user = auth.currentUser;
    if (!user) return;

    const memberRef = doc(db, "circles", id, "members", user.uid);
    const memberSnap = await getDoc(memberRef);

    let newStreak = 1;
    let newCycleDay = 1;
    let newCompletedCycles = 0;

    if (memberSnap.exists()) {
      const data = memberSnap.data();

      // Streak logic
      if (data.lastCheckin === getYesterday()) {
        newStreak = (data.streak || 0) + 1;
      } else if (data.lastCheckin !== todayKey) {
        // If they missed yesterday, streak resets to 1 (which is the default set above)
      }

      // Cycle logic
      newCycleDay = (data.cycleDay || 0) + 1;
      newCompletedCycles = data.completedCycles || 0;

      if (newCycleDay >= circle.durationDays) {
        newCompletedCycles += 1;
        newCycleDay = 0; // Reset cycle after completion
      }
    }

    await setDoc(memberRef, {
      streak: newStreak,
      lastCheckin: todayKey,
      cycleDay: newCycleDay,
      completedCycles: newCompletedCycles,
    });

    setStreak(newStreak);
    setCycleDay(newCycleDay);
    setCompletedCycles(newCompletedCycles);
    setCheckedInToday(true);
    setStatus("Awesome job! Check-in successful.");
  }

  function copyInviteLink() {
    const inviteUrl = `${window.location.origin}/join/${id}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-10 flex flex-col items-center">
        <div className="w-full max-w-md h-14 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-full mb-8"></div>
        <div className="w-full max-w-md h-64 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-3xl"></div>
      </div>
    );
  }

  const isWaitingForPartner = circle?.members?.length < 2;
  const progressPercentage = Math.min(100, (cycleDay / circle.durationDays) * 100);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black px-6 py-10 text-black dark:text-white selection:bg-zinc-300 dark:selection:bg-zinc-700">
      <div className="mx-auto max-w-md space-y-8 animate-[fadeIn_0.5s_ease-out]">
        
        {/* HEADER WITH BACK BUTTON */}
        <div className="relative flex items-center justify-center pt-2 h-14 mb-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="absolute left-0 w-12 h-12 flex items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 hover:-translate-y-1 active:scale-90 active:translate-y-0 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            aria-label="Go back"
          >
            <span className="text-2xl leading-none -mt-1 font-light">←</span>
          </button>
          <h1 className="text-xl font-semibold tracking-tight truncate px-14">
            {circle.name}
          </h1>
        </div>

        {/* CONDITION 1: WAITING ROOM */}
        {isWaitingForPartner ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
            <div className="relative flex items-center justify-center w-32 h-32">
              <div className="absolute inset-0 rounded-full border-4 border-black/10 dark:border-white/10 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-4 rounded-full border-4 border-black/20 dark:border-white/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
              <div className="relative z-10 w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-3xl shadow-xl">
                ⏳
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Waiting for partner...</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Share this link. The tracker will unlock the moment they join!
              </p>
            </div>

            <div className="w-full p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center shadow-inner">
              <div className="flex-1 px-4 py-3 text-sm font-mono truncate text-zinc-600 dark:text-zinc-400">
                {`${window.location.origin}/join/${id}`}
              </div>
              <button
                onClick={copyInviteLink}
                className="px-5 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div>
          </div>
        ) : (
          
          /* CONDITION 2: ACTIVE HABIT TRACKER */
          <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                {circle.habit}
              </span>
              <span className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300">
                {circle.durationDays} Days
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Streak Card */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col items-center justify-center transition-all hover:shadow-md">
                <p className="text-4xl font-bold mb-2">{streak} <span className="text-2xl">🔥</span></p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Current Streak</p>
              </div>

              {/* Completed Cycles Card */}
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col items-center justify-center transition-all hover:shadow-md">
                <p className="text-4xl font-bold mb-2">{completedCycles} <span className="text-2xl">🏆</span></p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total Cycles</p>
              </div>
            </div>

            {/* Visual Cycle Progress Card */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Cycle Progress</p>
                <p className="text-xl font-bold">Day {cycleDay} <span className="text-zinc-400 font-normal text-sm">/ {circle.durationDays}</span></p>
              </div>
              
              {/* Progress Bar */}
              <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black dark:bg-white rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Check In Button */}
            <div className="pt-4 space-y-3">
              <button
                onClick={checkIn}
                disabled={checkedInToday}
                className={`w-full flex items-center justify-center gap-2 rounded-2xl py-5 text-lg font-bold transition-all duration-200 active:scale-95 ${
                  checkedInToday 
                    ? "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed border border-transparent" 
                    : "bg-black text-white dark:bg-white dark:text-black shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
                }`}
              >
                {checkedInToday ? "✓ Checked in Today" : "Check In"}
              </button>

              {status && (
                <div className="text-sm text-center text-green-600 dark:text-green-400 font-medium animate-[fadeIn_0.3s_ease-out]">
                  {status}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
