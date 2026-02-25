import Link from "next/link";

export default function GatePage() {
  return (
    <div className="page-fade min-h-screen flex items-center justify-center bg-white px-6 dark:bg-black">
      <div className="w-full max-w-sm space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
          Create or join a circle
        </h2>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          You must be in a circle to use InSyncs.
        </p>

        <div className="space-y-3 pt-2">
      
          <Link
            href="/create"
            className="block w-full rounded-full bg-black px-4 py-3 text-center text-white font-medium hover:opacity-90 dark:bg-white dark:text-black"
           >
            + Create a Circle
           </Link>

          <Link
            href="/create"
            className="block w-full rounded-full border border-zinc-200 px-4 py-3 text-center font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            # Join a Circle
          </Link>
        </div>
      </div>
    </div>
  );
}
