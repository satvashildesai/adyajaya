import { CreateStreakForm } from "@/components/streak/CreateStreakForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Streak | Streak Tracker",
  description: "Set up a new habit and start building your streak today.",
};

export default function NewStreakPage() {
  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-lg mx-auto px-4 pt-6 md:pt-10">

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Page header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Create a new streak
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Commit to one habit. Show up every day.
          </p>
        </header>

        {/* Form */}
        <CreateStreakForm />

      </div>
    </div>
  );
}
