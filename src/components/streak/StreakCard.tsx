"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import type { Streak, IconName } from "@/types";
import {
  CheckCircle2,
  Flame,
  Trophy,
  BookOpen,
  Dumbbell,
  Droplets,
  Moon,
  Pencil,
  Zap,
  Heart,
  Star,
  Target,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const ICON_MAP: Record<IconName, ComponentType<LucideProps>> = {
  BookOpen,
  Dumbbell,
  Droplets,
  Moon,
  Pencil,
  Flame,
  Zap,
  Heart,
  Star,
  Target,
};

interface StreakCardProps {
  streak: Streak;
}

export function StreakCard({ streak }: StreakCardProps) {
  const [completed, setCompleted] = useState(streak.completedToday);

  const Icon = ICON_MAP[streak.iconName] ?? Target;
  const totalToMilestone = streak.currentStreak + streak.daysToMilestone;

  return (
    <Card
      className={cn(
        "w-full transition-all duration-300",
        completed && "ring-2 ring-success/40 bg-success/5"
      )}
    >
      <CardContent className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                completed ? "bg-success/15 text-success" : "bg-primary/10 text-primary"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground leading-tight truncate">
                {streak.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Flame
                  className={cn(
                    "h-3.5 w-3.5",
                    completed ? "text-success" : "text-orange-500"
                  )}
                />
                <span className="text-sm font-semibold text-orange-500">
                  {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
          {completed && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success mt-0.5" />
          )}
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <ProgressBar
            value={streak.currentStreak}
            max={totalToMilestone}
            className={cn(completed && "[&>div]:bg-success")}
          />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Trophy className="h-3 w-3" />
            <span>
              {streak.daysToMilestone} day{streak.daysToMilestone !== 1 ? "s" : ""} until{" "}
              <span className="font-medium text-foreground">{streak.milestoneName}</span>
            </span>
          </div>
        </div>

        {/* Done button */}
        <div className="flex justify-end">
          <Button
            variant={completed ? "outline" : "primary"}
            size="sm"
            onClick={() => setCompleted((prev) => !prev)}
            className={cn(
              "gap-1.5 transition-all",
              completed && "text-success border-success/40 hover:bg-success/10"
            )}
          >
            <CheckCircle2 className="h-4 w-4" />
            {completed ? "Completed" : "Mark Done"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
