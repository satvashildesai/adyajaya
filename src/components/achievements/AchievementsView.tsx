"use client";

import { useState } from "react";
import { Trophy, Filter, Sparkles, Lock, CheckCircle2 } from "lucide-react";
import { AchievementsSummary } from "./AchievementsSummary";
import { AchievementCard } from "./AchievementCard";
import { cn } from "@/lib/utils";
import type { AchievementsData, Achievement } from "@/lib/mock/achievements";

type FilterTab = "all" | "unlocked" | "locked";

export function AchievementsView({ data }: { data: AchievementsData }) {
  const [filter, setFilter] = useState<FilterTab>("all");

  const unlockedList = data.achievements.filter((a) => a.unlocked);
  const lockedList = data.achievements.filter((a) => !a.unlocked);
  
  // Next achievement is the first locked achievement sorted by requiredStreak
  const nextAchievement =
    lockedList.sort((a, b) => a.requiredStreak - b.requiredStreak)[0] ?? null;

  const filteredAchievements = data.achievements.filter((a) => {
    if (filter === "unlocked") return a.unlocked;
    if (filter === "locked") return !a.unlocked;
    return true;
  });

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-xl mx-auto px-4 pt-6 md:pt-10 space-y-6">
        
        {/* ── Page Header ─────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-500" />
            Achievements
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Celebrate your streak milestones and consistency awards
          </p>
        </div>

        {/* ── Summary Cards ───────────────────────────────── */}
        <AchievementsSummary
          unlockedCount={unlockedList.length}
          totalCount={data.achievements.length}
          userBestStreak={data.userCurrentBestStreak}
          nextAchievement={nextAchievement}
        />

        {/* ── Filter Tabs & Grid Header ────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-muted-foreground" />
              All Milestones ({data.achievements.length})
            </h2>

            {/* Filter pills */}
            <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-border/50 text-xs">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={cn(
                  "px-3 py-1 rounded-lg font-medium transition-colors",
                  filter === "all"
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All ({data.achievements.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unlocked")}
                className={cn(
                  "px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1",
                  filter === "unlocked"
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Unlocked ({unlockedList.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("locked")}
                className={cn(
                  "px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1",
                  filter === "locked"
                    ? "bg-card text-foreground shadow-sm font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Locked ({lockedList.length})
              </button>
            </div>
          </div>

          {/* ── Achievements Grid ────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                userStreak={data.userCurrentBestStreak}
              />
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No achievements match the selected filter.
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
