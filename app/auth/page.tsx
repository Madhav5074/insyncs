"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ redirect MUST be inside component
 const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function loginGoogle() {
    try {
      setMsg("Signing in...");
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push(redirect);
    } catch {
      setMsg("Google sign-in failed.");
    }
  }

  async function loginEmail() {
    try {
      setMsg("Signing in...");
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch {
      setMsg("Invalid email or password.");
    }
  }

  async function signupEmail() {
    try {
      setMsg("Creating account...");
      await createUserWithEmailAndPassword(auth, email, password);
      router.push(redirect);
    } catch {
      setMsg("Signup failed. Try a stronger password.");
    }
  }

  return (
    <div className="page-fade min-h-screen flex items-center justify-center bg-white px-6 dark:bg-black">
      <div className="w-full max-w-sm space-y-5">
        <div className="flex justify-center">
          <Image src="/logo.png" alt="InSyncs logo" width={64} height={64} />
        </div>

        <h1 className="text-center text-3xl font-semibold tracking-tight text-black dark:text-white">
          InSyncs
        </h1>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          No noise. Pure consistency.
        </p>

        {msg && (
          <div className="rounded-2xl border border-zinc-200 p-3 text-sm dark:border-zinc-800 text-zinc-600 dark:text-zinc-300">
            {msg}
          </div>
        )}

        {/* Google */}
        <button
          onClick={loginGoogle}
          className="w-full rounded-full bg-black px-4 py-3 text-white font-medium hover:opacity-90 dark:bg-white dark:text-black"
        >
          Continue with Google
        </button>

        <div className="text-center text-xs text-zinc-400">OR</div>

        {/* Email/Password */}
        <div className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-zinc-800"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-2xl border border-zinc-200 bg-transparent px-4 py-3 text-sm outline-none dark:border-zinc-800"
          />

          <button
            onClick={loginEmail}
            className="w-full rounded-full border border-zinc-200 px-4 py-3 font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Sign in with Email
          </button>

          <button
            onClick={signupEmail}
            className="w-full rounded-full border border-zinc-200 px-4 py-3 font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
