"use client";

import { Lock, CheckCircle2, Trophy, Flame, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/lib/mock/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  userStreak: number;
}

export function AchievementCard({
  achievement,
  userStreak,
}: AchievementCardProps) {
  const { name, emoji, description, requiredStreak, unlocked, unlockedAt } =
    achievement;

  const currentProgress = Math.min(userStreak, requiredStreak);
  const remaining = Math.max(0, requiredStreak - userStreak);

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 group",
        unlocked
          ? "border-amber-500/30 dark:border-amber-500/40 bg-gradient-to-br from-card via-card to-amber-500/5 shadow-sm hover:shadow-md hover:border-amber-500/60 hover:-translate-y-0.5"
          : "border-border/60 bg-card/60 opacity-90 hover:opacity-100"
      )}
    >
      {/* Decorative background glow for unlocked cards */}
      {unlocked && (
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/10 blur-xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />
      )}

      <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full space-y-4">
        
        {/* Header row: Emoji/Icon + Status Badge */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110",
              unlocked
                ? "bg-amber-500/10 text-amber-500 ring-2 ring-amber-500/20 shadow-inner"
                : "bg-muted text-muted-foreground/60 border border-border"
            )}
          >
            {unlocked ? emoji : <Lock className="h-5 w-5 text-muted-foreground/70" />}
          </div>

          <div>
            {unlocked ? (
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 text-[11px] font-semibold py-0.5"
              >
                <CheckCircle2 className="h-3 w-3" />
                Unlocked
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="gap-1 text-[11px] font-medium text-muted-foreground"
              >
                <Lock className="h-3 w-3" />
                Locked
              </Badge>
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3
              className={cn(
                "font-bold text-base tracking-tight leading-snug",
                unlocked ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {name}
            </h3>
            {unlocked && (
              <span className="text-sm select-none" aria-hidden="true">
                {emoji}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Progress or Completion detail */}
        <div className="pt-2 border-t border-border/50">
          {unlocked ? (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" /> Achieved
              </span>
              {unlockedAt && <span>{unlockedAt}</span>}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">
                  {currentProgress} / {requiredStreak} days
                </span>
                <span className="text-muted-foreground">
                  {remaining} day{remaining !== 1 ? "s" : ""} remaining
                </span>
              </div>
              <ProgressBar value={currentProgress} max={requiredStreak} />
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
}
