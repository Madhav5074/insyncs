"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

export default function CreateCirclePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  async function createCircle() {
    const user = auth.currentUser;
    if (!user) return;

    const docRef = await addDoc(collection(db, "circles"), {
      name,
      habit: "Gym",
      durationDays: 21,
      members: [user.uid],
      createdAt: serverTimestamp(),
    });

    router.push(`/circle/${docRef.id}`);
  }

  return (
    <div className="p-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Circle name"
        className="border p-3 rounded-xl w-full"
      />

      <button
        onClick={createCircle}
        className="w-full bg-black text-white rounded-full p-3 mt-4"
      >
        Create
      </button>
    </div>
  );
}