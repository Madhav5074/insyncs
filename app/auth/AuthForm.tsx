"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export default function AuthForm() {
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  async function loginGoogle() {
    setIsLoading(true);
    setMsg("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
      }, { merge: true });
      router.push("/dashboard");
    } catch (error: any) {
      setMsg(`Google Error: ${error.message}`);
      setIsLoading(false);
    }
  }

  async function handleEmailAuth() {
    setIsLoading(true);
    setMsg("");
    try {
      if (isSignUp) {
        if (!name.trim() || !username.trim()) {
          setMsg("Please enter your Name and Username.");
          setIsLoading(false);
          return;
        }
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await setDoc(doc(db, "users", result.user.uid), {
          name,
          username: username.toLowerCase().replace(/\s/g, ""),
          email,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') setMsg("An account with this email already exists.");
      else if (error.code === 'auth/invalid-credential') setMsg("Incorrect email or password.");
      else setMsg(error.message);
      setIsLoading(false);
    }
  }

  return (
    // 🌑 PERMANENT DARK SHELL
    <div className="min-h-screen flex items-center justify-center bg-black px-6 text-white selection:bg-zinc-700">
      <div className="w-full max-w-sm space-y-6 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="flex justify-center">
          <div className="animate-[bounce_1s_ease-in-out]">
            <Image src="/logo.png" alt="logo" width={64} height={64} className="rounded-xl grayscale invert" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">InSyncs</h1>
          <p className="text-sm text-zinc-500">
            {isSignUp ? "Create an account to join your squad" : "Welcome back"}
          </p>
        </div>

        {msg && (
          <div className="p-3 bg-red-900/30 border border-red-900/50 text-red-400 rounded-lg text-sm text-center animate-[shake_0.5s_ease-in-out]">
            {msg}
          </div>
        )}

        {/* ⚪ THE PRIMARY ACTION (GOOGLE) */}
        <button
          onClick={loginGoogle}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-black font-bold transition-all duration-200 hover:bg-zinc-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <span className="animate-pulse">Connecting...</span> : "Continue with Google"}
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink-0 mx-4 text-xs text-zinc-500 font-bold tracking-widest uppercase">Or email</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        {/* 🎹 THE INPUT STACK */}
        <div className="space-y-3">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-3 animate-[fadeIn_0.3s_ease-out]">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                disabled={isLoading}
                className="w-full rounded-xl border border-zinc-800 p-3.5 bg-zinc-950 text-sm transition-all focus:ring-2 focus:ring-white outline-none disabled:opacity-50"
              />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                disabled={isLoading}
                className="w-full rounded-xl border border-zinc-800 p-3.5 bg-zinc-950 text-sm transition-all focus:ring-2 focus:ring-white outline-none disabled:opacity-50 lowercase"
              />
            </div>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            disabled={isLoading}
            className="w-full rounded-xl border border-zinc-800 p-3.5 bg-zinc-950 text-sm transition-all focus:ring-2 focus:ring-white outline-none disabled:opacity-50"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            disabled={isLoading}
            className="w-full rounded-xl border border-zinc-800 p-3.5 bg-zinc-950 text-sm transition-all focus:ring-2 focus:ring-white outline-none disabled:opacity-50"
          />
        </div>

        {/* SECONDARY ACTION */}
        <button
          onClick={handleEmailAuth}
          disabled={isLoading}
          className="w-full rounded-full border border-zinc-800 bg-zinc-900/50 py-3.5 font-bold transition-all duration-200 hover:bg-zinc-900 active:scale-95 disabled:opacity-50"
        >
          {isSignUp ? "Create Account" : "Sign In"}
        </button>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMsg("");
            }}
            disabled={isLoading}
            className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>

      </div>
    </div>
  );
}
