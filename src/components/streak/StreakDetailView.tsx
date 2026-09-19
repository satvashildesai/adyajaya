"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MoreVertical,
  Flame,
  Trophy,
  CheckCircle2,
  Calendar,
  TrendingUp,
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
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { StreakDetail, CalendarDay, IconName } from "@/types";

// ─── Icon map ──────────────────────────────────────────────────────────────

const ICON_MAP: Record<IconName, ComponentType<LucideProps>> = {
  BookOpen, Dumbbell, Droplets, Moon, Pencil,
  Flame, Zap, Heart, Star, Target,
};

// ─── Month names helper ────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

// ─── Stat card ─────────────────────────────────────────────────────────────

function StatCard({ label, value, suffix }: { label: string; value: number; suffix?: string }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-2xl font-bold text-foreground">
          {value}{suffix}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
      </CardContent>
    </Card>
  );
}

// ─── Activity calendar ──────────────────────────────────────────────────────

function ActivityCalendar({ days }: { days: CalendarDay[] }) {
  if (!days.length) return null;

  const firstDay = new Date(days[0].date).getDay(); // 0 = Sun
  const today = new Date();
  const monthName = MONTHS[today.getMonth()];
  const year = today.getFullYear();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {monthName} {year}
        </h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-success/80" /> Done
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-sm bg-destructive/30" /> Missed
          </span>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-[10px] font-medium text-muted-foreground py-0.5">
            {d}
          </div>
        ))}

        {/* Blank cells before first day */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`blank-${i}`} />
        ))}

        {/* Day cells */}
        {days.map((day) => {
          const dayNum = parseInt(day.date.split("-")[2], 10);
          return (
            <div
              key={day.date}
              title={day.date}
              className={cn(
                "aspect-square flex items-center justify-center rounded-md text-xs font-medium transition-colors",
                day.status === "completed" && "bg-success/80 text-white",
                day.status === "missed"    && "bg-destructive/20 text-destructive",
                day.status === "today"     && "ring-2 ring-primary bg-primary/10 text-primary font-bold",
                day.status === "future"    && "text-muted-foreground/40"
              )}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent activity ───────────────────────────────────────────────────────

function RecentActivity({ activity }: { activity: { date: string; completed: boolean }[] }) {
  return (
    <div className="space-y-2">
      {activity.slice(0, 7).map(({ date, completed }) => {
        const d = new Date(date);
        const label = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
        return (
          <div key={date} className="flex items-center justify-between py-2 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5",
                completed
                  ? "bg-success/10 text-success"
                  : "bg-destructive/10 text-destructive"
              )}
            >
              <CheckCircle2 className="h-3 w-3" />
              {completed ? "Completed" : "Missed"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

interface StreakDetailViewProps {
  streak: StreakDetail;
}

export function StreakDetailView({ streak }: StreakDetailViewProps) {
  const router = useRouter();
  const [completed, setCompleted] = useState(streak.completedToday);
  const [menuOpen, setMenuOpen] = useState(false);

  const Icon = ICON_MAP[streak.iconName] ?? Target;
  const totalToMilestone = streak.currentStreak + streak.daysToMilestone;

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-lg mx-auto px-4 pt-6 md:pt-10 space-y-6">

        {/* ── Header ─────────────────────────────────────── */}
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="relative">
            <button
              aria-label="More actions"
              onClick={() => setMenuOpen((o) => !o)}
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-20 w-36 rounded-xl border border-border bg-card shadow-lg py-1 text-sm">
                <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors">Edit</button>
                <button className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-destructive">Delete</button>
              </div>
            )}
          </div>
        </header>

        {/* ── Identity ───────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 flex items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground leading-tight truncate">
              {streak.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{streak.category}</Badge>
              <span className="text-xs text-muted-foreground">{streak.frequency}</span>
            </div>
          </div>
        </div>

        {/* ── Current streak hero ─────────────────────────── */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center py-8 gap-1">
              <Flame className="h-10 w-10 text-orange-500 mb-1" />
              <p className="text-6xl font-black text-foreground tracking-tight leading-none">
                {streak.currentStreak}
              </p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                Day streak
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Milestone ──────────────────────────────────── */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span className="font-semibold text-sm text-foreground">{streak.milestoneName}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {streak.daysToMilestone} day{streak.daysToMilestone !== 1 ? "s" : ""} left
              </span>
            </div>
            <ProgressBar value={streak.currentStreak} max={totalToMilestone} />
            <p className="text-xs text-muted-foreground">
              {streak.currentStreak} of {totalToMilestone} days completed
            </p>
          </CardContent>
        </Card>

        {/* ── Today's status ─────────────────────────────── */}
        <Card className={cn(completed && "ring-2 ring-success/40 bg-success/5")}>
          <CardContent className="p-5 flex flex-col items-center gap-3 text-center">
            {completed ? (
              <>
                <CheckCircle2 className="h-8 w-8 text-success" />
                <div>
                  <p className="font-semibold text-foreground">Today's win is complete! 🎉</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Come back tomorrow to keep the streak going.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCompleted(false)}
                  className="text-success border-success/40 hover:bg-success/10"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Completed
                </Button>
              </>
            ) : (
              <>
                <Flame className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="font-semibold text-foreground">Keep the streak alive.</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Don't break the chain — mark today as done.</p>
                </div>
                <Button
                  size="md"
                  className="w-full max-w-xs"
                  onClick={() => setCompleted(true)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1.5" />
                  Complete Today
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* ── Statistics ─────────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mb-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Current streak" value={streak.stats.currentStreak} suffix=" days" />
            <StatCard label="Best streak" value={streak.stats.bestStreak} suffix=" days" />
            <StatCard label="Total completed" value={streak.stats.totalCompleted} suffix=" days" />
            <StatCard label="Completion rate" value={streak.stats.completionRate} suffix="%" />
          </div>
        </section>

        {/* ── Calendar ───────────────────────────────────── */}
        <Card>
          <CardContent className="p-5">
            <ActivityCalendar days={streak.calendar} />
          </CardContent>
        </Card>

        {/* ── Recent activity ────────────────────────────── */}
        <section className="pb-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h2>
          <Card>
            <CardContent className="px-5 py-3">
              <RecentActivity activity={streak.recentActivity} />
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
