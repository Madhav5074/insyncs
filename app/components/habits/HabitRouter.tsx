"use client";

import GymTracker from "./GymTracker";
import RunningTracker from "./RunningTracker";
import MeditationTracker from "./MeditationTracker"; // 👈 1. Import the new engine

export default function HabitRouter({ 
  circle, 
  me, 
  circleId, 
  todayKey, 
  checkedInToday, 
  standardCheckIn,
  members 
}: any) {
  
  switch (circle.habit) {
    case "Gym":
      return <GymTracker circle={circle} me={me} circleId={circleId} todayKey={todayKey} members={members} />;
    
    case "Running":
      return <RunningTracker circle={circle} me={me} circleId={circleId} todayKey={todayKey} members={members} />;

    case "Meditation":
      // 👈 2. Route to the Focus Lock engine
      return <MeditationTracker circle={circle} me={me} circleId={circleId} todayKey={todayKey} members={members} />;
      
    // Reading still falls back to the generic button
    case "Reading":
    default:
      return (
        <div className="pt-2">
          <button
            onClick={standardCheckIn}
            disabled={checkedInToday}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold transition-all duration-200 active:scale-95 ${
              checkedInToday 
                ? "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed" 
                : "bg-black text-white dark:bg-white dark:text-black shadow-md hover:-translate-y-1"
            }`}
          >
            {checkedInToday ? "✓ Checked in Today" : "Check In Now"}
          </button>
        </div>
      );
  }
}
