import { ReactNode } from "react";
import { Navigation } from "@/components/layout/Navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <Navigation />
      {/* On desktop, add left margin to account for side nav. On mobile, add bottom padding. */}
      <main className="flex-1 w-full md:ml-64 pb-16 md:pb-0">
        {children}
      </main>
    </div>
  );
}
