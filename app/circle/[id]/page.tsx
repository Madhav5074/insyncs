"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

export default function CirclePage() {
  const params = useParams();
  const id = params.id as string;

  const [circle, setCircle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [checkedInToday, setCheckedInToday] = useState(false);

  const [streak, setStreak] = useState(0);
  const [cycleDay, setCycleDay] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const todayKey = new Date().toISOString().split("T")[0];

  function getYesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }

  // Load circle
  useEffect(() => {
    async function loadCircle() {
      const snap = await getDoc(doc(db, "circles", id));
      if (snap.exists()) setCircle(snap.data());
      setLoading(false);
    }
    if (id) loadCircle();
  }, [id]);

  // Load member progress
  useEffect(() => {
    async function loadProgress() {
      const user = auth.currentUser;
      if (!user) return;

      const memberSnap = await getDoc(
        doc(db, "circles", id, "members", user.uid)
      );

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

    if (id) loadProgress();
  }, [id, todayKey]);

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
      }

      // Cycle logic
      newCycleDay = (data.cycleDay || 0) + 1;
      newCompletedCycles = data.completedCycles || 0;

      if (newCycleDay >= circle.durationDays) {
        newCompletedCycles += 1;
        newCycleDay = 0;
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
    setStatus("Check-in successful.");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 bg-white dark:bg-black px-6 py-10 text-black dark:text-white">
      <div className="mx-auto max-w-md space-y-6">

        <h1 className="text-2xl font-semibold">{circle.name}</h1>

        <p className="text-sm text-zinc-500">
          Habit: {circle.habit} • {circle.durationDays} days
        </p>

        {/* Streak */}
        <div className="rounded-2xl border p-4 text-center">
          <p className="text-xs text-zinc-500">Current Streak</p>
          <p className="text-3xl font-bold">{streak} 🔥</p>
        </div>

        {/* Cycle Progress */}
        <div className="rounded-2xl border p-4 text-center">
          <p className="text-xs text-zinc-500">Cycle Progress</p>
          <p className="text-2xl font-bold">
            Day {cycleDay} / {circle.durationDays}
          </p>
        </div>

        {/* Completed Cycles */}
        <div className="rounded-2xl border p-4 text-center">
          <p className="text-xs text-zinc-500">Completed Cycles</p>
          <p className="text-2xl font-bold">
            {completedCycles} 🏆
          </p>
        </div>

        <button
          onClick={checkIn}
          disabled={checkedInToday}
          className="w-full rounded-full bg-black py-3 text-white dark:bg-white dark:text-black disabled:opacity-50"
        >
          {checkedInToday ? "Checked-in Today" : "Check-in"}
        </button>

        {status && (
          <div className="text-sm text-center text-zinc-500">
            {status}
          </div>
        )}

      </div>
    </div>
  );
}
