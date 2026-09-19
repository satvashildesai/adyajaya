import { mockStreaks } from "@/lib/mock/streaks";
import { StreakCard } from "@/components/streak/StreakCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Flame, Plus, Sparkles } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const completedToday = mockStreaks.filter((s) => s.completedToday).length;
const totalStreaks = mockStreaks.length;

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 pt-6 md:pt-10 space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium mb-0.5">
              {getGreeting()} 👋
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Win today.
            </h1>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/15 ring-2 ring-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">U</span>
          </div>
        </header>

        {/* Today's progress summary */}
        {totalStreaks > 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 p-4 flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Today's focus</p>
              <p className="font-semibold text-foreground">
                {completedToday === totalStreaks
                  ? "All done! 🎉 You're on fire."
                  : `${completedToday} of ${totalStreaks} streaks complete`}
              </p>
            </div>
            {completedToday === totalStreaks && (
              <Sparkles className="h-5 w-5 text-primary shrink-0" />
            )}
          </div>
        )}

        {/* Section heading */}
        {totalStreaks > 0 && (
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground tracking-tight flex items-center gap-1.5">
              🔥 Your Streaks
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {totalStreaks} active
            </span>
          </div>
        )}

        {/* Streak list */}
        {totalStreaks > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockStreaks.map((streak) => (
              <StreakCard key={streak.id} streak={streak} />
            ))}
          </section>
        ) : (
          <EmptyState
            icon={<Flame className="w-8 h-8" />}
            title="Start your first streak"
            description="Pick a habit, commit to it daily, and watch your streak grow. Small wins compound into big results."
            action={
              <Link href="/streaks/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first streak
                </Button>
              </Link>
            }
          />
        )}

        {/* Add Streak CTA */}
        {totalStreaks > 0 && (
          <div className="flex justify-center pt-2">
            <Link href="/streaks/new">
              <Button variant="outline" size="md" className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Streak
              </Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
