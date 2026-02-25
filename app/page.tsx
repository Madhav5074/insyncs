import Link from "next/link";
import Image from "next/image";
import PageTransition from "./components/PageTransition";


export default function Home() {
  return (
    <div className="min-h-screen bg-white px-6 py-14 text-black dark:bg-black dark:text-white">
      <div className="mx-auto max-w-md space-y-10">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <Image src="/logo.png" alt="InSyncs logo" width={64} height={64} />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">InSyncs</h1>

          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Build habits because your people are doing them.
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            No noise. Pure consistency.
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-2xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            ✅ Small circles. One habit. Daily proof.
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            📍 Location-based check-ins (for gym circles)
          </div>

          <div className="rounded-2xl border border-zinc-200 p-4 text-sm dark:border-zinc-800">
            🏁 Completed cycles on profile (not endless streak pressure)
          </div>
        </div>

        <Link
          href="/auth"
          className="block w-full rounded-full bg-black px-4 py-3 text-center text-white font-medium hover:opacity-90 dark:bg-white dark:text-black"
        >
          Start
        </Link>
      </div>
    </div>
  );
}
