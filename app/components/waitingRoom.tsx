"use client";

import { useState } from "react";

export default function WaitingRoom({ id }: { id: string }) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  function copyInviteLink() {
    navigator.clipboard.writeText(`${window.location.origin}/join/${id}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function copyCode() {
    navigator.clipboard.writeText(id);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm mt-4">
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-black/10 dark:border-white/10 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
        <div className="relative z-10 w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center text-xl shadow-xl">⏳</div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Waiting for squad...</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Share the code or link below.</p>
      </div>
      <div className="w-full space-y-3">
        <div className="w-full p-4 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-between shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Join Code</span>
            <span className="text-sm font-mono font-bold text-black dark:text-white truncate max-w-[120px]">{id}</span>
          </div>
          <button
            onClick={copyCode}
            className="px-4 py-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all"
          >
            {codeCopied ? "Copied ✓" : "Copy Code"}
          </button>
        </div>
        <div className="w-full p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center shadow-inner">
          <div className="flex-1 px-4 py-3 text-xs font-mono truncate text-zinc-500">
            {`${typeof window !== 'undefined' ? window.location.origin : ''}/join/${id}`}
          </div>
          <button
            onClick={copyInviteLink}
            className="px-4 py-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all"
          >
            {linkCopied ? "Copied ✓" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
