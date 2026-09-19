"use client";

import { Trophy, Target, Award, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import type { Achievement } from "@/lib/mock/achievements";

interface AchievementsSummaryProps {
  unlockedCount: number;
  totalCount: number;
  userBestStreak: number;
  nextAchievement: Achievement | null;
}

export function AchievementsSummary({
  unlockedCount,
  totalCount,
  userBestStreak,
  nextAchievement,
}: AchievementsSummaryProps) {
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="space-y-4">
      {/* Overview Card */}
      <Card className="overflow-hidden border-amber-500/20 bg-gradient-to-br from-card via-card to-amber-500/5">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Achievement summary
                </h2>
                <p className="text-xs text-muted-foreground">
                  Milestones & honors earned
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-semibold"
            >
              {unlockedCount} / {totalCount} Unlocked
            </Badge>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                Overall Progress ({percentage}%)
              </span>
              <span className="text-muted-foreground">
                {totalCount - unlockedCount} remaining
              </span>
            </div>
            <ProgressBar value={unlockedCount} max={totalCount} />
          </div>

          {/* Current best streak banner */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-primary" /> Current Best Active Streak
            </span>
            <span className="font-bold text-foreground">
              {userBestStreak} days
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Next Up Focus Banner */}
      {nextAchievement && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                {nextAchievement.emoji}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Next Target
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium text-foreground">
                    {nextAchievement.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {nextAchievement.requiredStreak - userBestStreak} days left to unlock!
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="shrink-0 font-bold">
              {userBestStreak} / {nextAchievement.requiredStreak}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
