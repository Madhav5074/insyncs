"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";

export default function JoinPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [circle, setCircle] = useState<any>(null);
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    async function loadCircle() {
      const snap = await getDoc(doc(db, "circles", id));

      if (!snap.exists()) {
        setMsg("Circle not found");
        return;
      }

      setCircle(snap.data());
      setMsg("");
    }

    loadCircle();
  }, [id]);

  async function joinCircle() {
    const user = auth.currentUser;

    if (!user) {
      router.push(`/auth?redirect=/join/${id}`);
      return;
    }

    await updateDoc(doc(db, "circles", id), {
      members: arrayUnion(user.uid),
    });

    router.push(`/circle/${id}`);
  }

  if (msg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {msg}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-sm space-y-4 p-6 text-center">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Join {circle.name}
        </h1>

        <p className="text-sm text-zinc-500">
          Habit: {circle.habit} • {circle.durationDays} days
        </p>

        <button
          onClick={joinCircle}
          className="w-full rounded-full bg-black py-3 text-white dark:bg-white dark:text-black"
        >
          Join Circle
        </button>
      </div>
    </div>
  );
}
