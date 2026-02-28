import Link from "next/link";
import Image from "next/image";
import PageTransition from "./components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 text-black dark:bg-black dark:text-white">
        <div className="w-full max-w-sm space-y-12">
          
          <div className="space-y-4 text-center">
            <Image 
              src="/logo.png" 
              alt="InSyncs logo" 
              width={48} 
              height={48} 
              className="mx-auto rounded-xl grayscale"
            />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">InSyncs</h1>
              <p className="mt-2 text-sm text-zinc-500">No Bullshit, Pure Consistency.</p>
            </div>
          </div>

          <div className="space-y-3 text-center">
            <blockquote className="text-lg font-medium italic text-zinc-700 dark:text-zinc-300">
              "You do not rise to the level of your goals. You fall to the level of your systems."
            </blockquote>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              — James Clear
            </p>
          </div>

          <Link
            href="/auth"
            className="block w-full rounded-xl bg-black py-4 text-center text-sm font-medium text-white transition-transform active:scale-95 dark:bg-white dark:text-black"
          >
            Start
          </Link>

        </div>
      </div>
    </PageTransition>
  );
}
