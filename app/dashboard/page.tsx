"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [circles, setCircles] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCircles() {
      const user = auth.currentUser;
      if (!user) {
        router.push("/auth");
        return;
      }

      const q = query(
        collection(db, "circles"),
        where("members", "array-contains", user.uid)
      );

      const snap = await getDocs(q);
      setCircles(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    }

    fetchCircles();
  }, [router]);

  return (
    <div className="min-h-screen pb-28 p-6 bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-xl font-semibold">My Circles</h1>

      {circles.map((circle) => (
        <div
          key={circle.id}
          onClick={() => router.push(`/circle/${circle.id}`)}
          className="border p-4 rounded-xl cursor-pointer mt-4"
        >
          {circle.name}
        </div>
      ))}

      <button
         onClick={() => router.push("/create")}
        className="w-full rounded-full bg-black py-3 text-white dark:bg-white dark:text-black"
>
         + Create New Circle
      </button>

      <button
         onClick={() => router.push("/profile")}
         className="w-full rounded-full border py-3 dark:border-zinc-800"
>
         👤 View Profile
       </button>
    </div>
  );
}

