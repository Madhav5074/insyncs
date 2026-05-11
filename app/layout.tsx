"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [showInstall, setShowInstall] = useState(false);
  const [os, setOs] = useState<"ios" | "android" | "desktop">("desktop");

  // 🕵️‍♂️ OS DETECTOR
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setOs("ios");
    } else if (/android/.test(userAgent)) {
      setOs("android");
    } else {
      setOs("desktop");
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex flex-col justify-between selection:bg-red-500 selection:text-white">
      
      {/* 🔴 BACKGROUND NOISE & GLITCH EFFECTS */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-[-10%] w-[50vw] h-[50vw] bg-red-900 rounded-full blur-[120px] mix-blend-screen opacity-30"></div>
      </div>

      {/* 🔝 HEADER */}
      <header className="relative z-10 p-6 flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-tighter uppercase leading-none hover:tracking-widest transition-all duration-500 cursor-default">
            InSyncs.
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mt-1">
            Engine v1.0 // Live
          </span>
        </div>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      </header>

      {/* 💥 THE CRAZY HERO SECTION */}
      <main className="relative z-10 px-6 flex flex-col justify-center flex-1 space-y-8">
        <h1 className="text-[12vw] md:text-8xl font-black tracking-tighter leading-[0.85] uppercase break-words">
          Accountability <br />
          <span className="text-transparent text-stroke-white text-stroke-2 hover:text-white transition-colors duration-300">
            Is Ruthless.
          </span>
        </h1>
        
        <p className="text-zinc-400 max-w-md text-sm md:text-base font-medium tracking-wide uppercase border-l-2 border-red-500 pl-4 py-1">
          No soft eras. No phantom mileage. If you break focus, your entire squad burns. Sync your habits or face the Nuclear Reset.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => router.push("/auth")}
            className="group relative px-8 py-5 bg-white text-black text-xl font-bold uppercase tracking-widest overflow-hidden rounded-none border border-white hover:bg-black hover:text-white transition-all duration-300"
          >
            <span className="relative z-10">Enter Terminal ➔</span>
            <div className="absolute inset-0 h-full w-0 bg-red-500 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
          </button>

          <button
            onClick={() => setShowInstall(true)}
            className="px-8 py-5 bg-transparent text-white border border-zinc-700 text-sm font-bold uppercase tracking-widest hover:border-white transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            Install App
          </button>
        </div>
      </main>

      {/* 🔻 FOOTER MARQUEE */}
      <div className="relative z-10 border-t border-zinc-900 overflow-hidden py-3 bg-black">
        <div className="whitespace-nowrap animate-[marquee_15s_linear_infinite] flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          <span>// GPS ANTI-DRIFT ENGINE ACTIVE</span>
          <span>•</span>
          <span>SPA NAVIGATION LOCK SECURED</span>
          <span>•</span>
          <span>NUCLEAR SQUAD RESET ARMED</span>
          <span>•</span>
          <span>// GPS ANTI-DRIFT ENGINE ACTIVE</span>
          <span>•</span>
          <span>SPA NAVIGATION LOCK SECURED</span>
          <span>•</span>
          <span>NUCLEAR SQUAD RESET ARMED</span>
        </div>
      </div>

      {/* 📱 PWA INSTALLATION MODAL (Bottom Sheet) */}
      {showInstall && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-3xl translate-y-0 shadow-2xl relative">
            <button 
              onClick={() => setShowInstall(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-full text-zinc-400 hover:text-white"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold tracking-tight mb-2">Install InSyncs</h3>
            <p className="text-sm text-zinc-400 mb-6">Bypass the browser. Install the engine directly to your home screen.</p>

            {os === "ios" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-xl">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-3-3m0 0L8 8m3-3v12"></path></svg>
                  </div>
                  <p className="text-sm font-medium">1. Tap the <strong className="text-white">Share</strong> icon in your Safari menu bar.</p>
                </div>
                <div className="flex items-center gap-4 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-xl">
                    <span className="text-xl">+</span>
                  </div>
                  <p className="text-sm font-medium">2. Scroll down and select <strong className="text-white">Add to Home Screen</strong>.</p>
                </div>
              </div>
            )}

            {os === "android" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-xl flex-col gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                  <p className="text-sm font-medium">1. Tap the <strong className="text-white">3 dots</strong> in the top right corner of Chrome.</p>
                </div>
                <div className="flex items-center gap-4 bg-black p-4 rounded-2xl border border-zinc-800">
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-xl">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  </div>
                  <p className="text-sm font-medium">2. Select <strong className="text-white">Add to Home screen</strong> or Install app.</p>
                </div>
              </div>
            )}

            {os === "desktop" && (
              <div className="bg-black p-6 rounded-2xl border border-zinc-800 text-center">
                <p className="text-sm font-medium text-zinc-300">
                  You are currently on a desktop. Open this link on your iOS or Android device to install the mobile engine.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GLOBAL CSS FOR CUSTOM ANIMATIONS (Safe to keep inside the component) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .text-stroke-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
        .text-stroke-2 {
          -webkit-text-stroke: 2px rgba(255,255,255,0.8);
        }
      `}} />
    </div>
  );
}
