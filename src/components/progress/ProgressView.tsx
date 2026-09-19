"use client";

import { useState } from "react";
import {
  TrendingUp,
  Trophy,
  Flame,
  Zap,
  Check,
  Calendar,
  Sparkles,
  Award,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { ProgressData, ProgressInsight } from "@/lib/mock/progress";

const INSIGHT_ICON_MAP: Record<
  ProgressInsight["iconName"],
  ComponentType<LucideProps>
> = {
  TrendingUp,
  Trophy,
  Flame,
  Calendar,
  Zap,
};

// ─── Stat Card Component ───────────────────────────────────────────────────

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon: ComponentType<LucideProps>;
}) {
  return (
    <Card>
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-2xl font-bold text-foreground tracking-tight">
          {value}
          {suffix}
        </p>
        <p className="text-xs text-muted-foreground mt-1 font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}

// ─── Activity Grid Component ──────────────────────────────────────────────

function ActivityGrid({
  activity,
}: {
  activity: ProgressData["activityGrid"];
}) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  // Group 84 days into 12 columns (weeks) of 7 days each
  const weeks: typeof activity[] = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Past 12 weeks</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Less</span>
          <span className="h-2.5 w-2.5 rounded-sm bg-muted border border-border" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-200 dark:bg-emerald-950/80" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400 dark:bg-emerald-700" />
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-600" />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex gap-1.5 min-w-full">
          {/* Day of week labels */}
          <div className="flex flex-col justify-between py-0.5 text-[10px] text-muted-foreground font-medium pr-1 select-none">
            {dayLabels.map((lbl, idx) => (
              <span key={idx} className="h-3 flex items-center">
                {lbl}
              </span>
            ))}
          </div>

          {/* Weeks columns */}
          <div className="flex gap-1">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day) => {
                  const levelClasses =
                    day.level === 0
                      ? "bg-muted border border-border/50"
                      : day.level === 1
                      ? "bg-emerald-200 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800"
                      : day.level === 2
                      ? "bg-emerald-400 dark:bg-emerald-700"
                      : "bg-emerald-600 text-white";

                  return (
                    <button
                      key={day.date}
                      type="button"
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onClick={() => setHoveredDay(day)}
                      className={cn(
                        "h-3 w-3 rounded-sm transition-transform hover:scale-125 focus:outline-none focus:ring-1 focus:ring-primary",
                        levelClasses
                      )}
                      aria-label={`${day.date}: ${day.count} streaks completed`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic hover details */}
      <div className="min-h-[20px] text-xs text-muted-foreground text-center">
        {hoveredDay ? (
          <span>
            <strong className="text-foreground">{hoveredDay.date}</strong>:{" "}
            {hoveredDay.count === 0
              ? "No streaks completed"
              : `${hoveredDay.count} streak${
                  hoveredDay.count > 1 ? "s" : ""
                } completed`}
          </span>
        ) : (
          <span>Tap or hover over squares for date details</span>
        )}
      </div>
    </div>
  );
}

// ─── Main ProgressView Component ──────────────────────────────────────────

export function ProgressView({ data }: { data: ProgressData }) {
  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-xl mx-auto px-4 pt-6 md:pt-10 space-y-6">
        
        {/* ── Page Header ─────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Progress
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track your consistency & long-term wins
          </p>
        </div>

        {/* ── Overall Consistency Card ───────────────────── */}
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Overall consistency
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Based on all planned days
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                Top 10%
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-foreground tracking-tight">
                {data.overallConsistency}%
              </span>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="h-3.5 w-3.5" /> +4% this week
              </span>
            </div>

            <ProgressBar value={data.overallConsistency} max={100} />

            <p className="text-xs text-muted-foreground">
              You've completed{" "}
              <strong className="text-foreground font-semibold">
                {data.overallConsistency}%
              </strong>{" "}
              of your planned days. Keep up the strong momentum!
            </p>
          </CardContent>
        </Card>

        {/* ── This Week Check-ins ─────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            This week
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {data.thisWeek.map((item) => (
                  <div
                    key={item.day}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors",
                      item.isToday && "bg-primary/10 ring-1 ring-primary/40"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs font-medium",
                        item.isToday
                          ? "text-primary font-bold"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.day}
                    </span>

                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs transition-colors",
                        item.completed
                          ? "bg-success text-white shadow-sm"
                          : item.isFuture
                          ? "border border-dashed border-border text-muted-foreground/30"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {item.completed ? (
                        <Check className="h-4 w-4 stroke-[3]" />
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Streak Statistics Grid ──────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Award className="h-4 w-4 text-muted-foreground" />
            Streak statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              label="Current streak"
              value={data.stats.currentStreak}
              suffix=" days"
              icon={Flame}
            />
            <StatCard
              label="Best streak"
              value={data.stats.bestStreak}
              suffix=" days"
              icon={Trophy}
            />
            <StatCard
              label="Total wins"
              value={data.stats.totalWins}
              icon={Zap}
            />
            <StatCard
              label="Completion rate"
              value={data.stats.completionRate}
              suffix="%"
              icon={TrendingUp}
            />
          </div>
        </section>

        {/* ── Activity Visualization ─────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            Activity
          </h2>
          <Card>
            <CardContent className="p-4">
              <ActivityGrid activity={data.activityGrid} />
            </CardContent>
          </Card>
        </section>

        {/* ── Insights Section ────────────────────────────── */}
        <section className="space-y-3 pb-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Insights & Nudges
          </h2>
          <div className="space-y-3">
            {data.insights.map((insight) => {
              const Icon = INSIGHT_ICON_MAP[insight.iconName] ?? Sparkles;
              return (
                <Card
                  key={insight.id}
                  className={cn(
                    "transition-colors",
                    insight.type === "milestone"
                      ? "border-amber-500/30 bg-amber-500/5"
                      : insight.type === "positive"
                      ? "border-emerald-500/30 bg-emerald-500/5"
                      : "border-primary/20 bg-primary/5"
                  )}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div
                      className={cn(
                        "h-9 w-9 shrink-0 rounded-xl flex items-center justify-center mt-0.5",
                        insight.type === "milestone"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : insight.type === "positive"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {insight.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
