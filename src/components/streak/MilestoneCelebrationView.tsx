"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Flame, Trophy, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import type { StreakDetail } from "@/types";

interface MilestoneCelebrationViewProps {
  streak: StreakDetail;
}

// Confetti particle configuration for lightweight celebration effect
const CONFETTI_PARTICLES = [
  { top: "10%", left: "15%", color: "bg-amber-400", delay: "0s", duration: "2.8s" },
  { top: "5%", left: "45%", color: "bg-orange-500", delay: "0.4s", duration: "3.2s" },
  { top: "12%", left: "80%", color: "bg-emerald-400", delay: "0.2s", duration: "2.6s" },
  { top: "25%", left: "10%", color: "bg-indigo-400", delay: "0.6s", duration: "3.5s" },
  { top: "20%", left: "88%", color: "bg-rose-400", delay: "0.3s", duration: "2.9s" },
  { top: "35%", left: "22%", color: "bg-amber-300", delay: "0.8s", duration: "3.1s" },
  { top: "30%", left: "75%", color: "bg-emerald-500", delay: "0.5s", duration: "2.7s" },
  { top: "45%", left: "8%", color: "bg-indigo-500", delay: "0.1s", duration: "3.4s" },
  { top: "40%", left: "92%", color: "bg-orange-400", delay: "0.7s", duration: "3.0s" },
];

export function MilestoneCelebrationView({
  streak,
}: MilestoneCelebrationViewProps) {
  const router = useRouter();

  const streakDays = streak.currentStreak > 0 ? streak.currentStreak : 30;
  const milestoneName = streak.milestoneName || "Monthly Warrior";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-background via-card to-background">
      
      {/* ── Background Celebration Confetti Particles ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        {CONFETTI_PARTICLES.map((particle, idx) => (
          <span
            key={idx}
            className={`absolute h-2.5 w-2.5 rounded-full animate-confetti ${particle.color}`}
            style={{
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}

        {/* Radial glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-3xl animate-pulse-glow" />
      </div>

      {/* ── Main Container / Card ────────────────────────────────────── */}
      <div className="w-full max-w-md mx-auto relative z-10 animate-pop-in">
        <Card className="border-amber-500/30 dark:border-amber-500/40 shadow-2xl bg-card/95 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6 sm:p-8 text-center flex flex-col items-center space-y-6">
            
            {/* Celebration Icon Header */}
            <div className="relative flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center ring-4 ring-amber-500/30 shadow-inner">
                <Trophy className="h-12 w-12 text-amber-500 animate-bounce motion-reduce:animate-none" />
              </div>
              <span className="absolute -top-1 -right-1 text-3xl select-none animate-pulse motion-reduce:animate-none">
                🎉
              </span>
            </div>

            {/* Title & Streak Number */}
            <div className="space-y-1">
              <Badge variant="outline" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 px-3 py-1 font-semibold text-xs tracking-wider uppercase">
                Milestone Reached!
              </Badge>
              
              <h1 className="text-5xl font-black text-foreground tracking-tight pt-2 leading-none">
                {streakDays} DAYS
              </h1>

              <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 tracking-wide pt-1 flex items-center justify-center gap-1.5">
                {milestoneName.toUpperCase()} 🏆
              </h2>
            </div>

            {/* Congratulatory Message */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              You showed up for yourself{" "}
              <strong className="text-foreground font-semibold">
                {streakDays} days in a row
              </strong>
              . Consistency is your superpower!
            </p>

            {/* Visual Progress / Completion Bar */}
            <div className="w-full bg-muted/60 p-4 rounded-2xl border border-border/60 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-orange-500 flex items-center gap-1">
                  <Flame className="h-4 w-4" /> Streak Complete
                </span>
                <span className="text-success flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> 100%
                </span>
              </div>

              <ProgressBar value={100} max={100} className="h-3" />

              <p className="text-xs text-muted-foreground font-medium">
                Keep going. You're building an unstoppable habit!
              </p>
            </div>

            {/* Continue CTA */}
            <div className="w-full pt-2">
              <Button
                size="lg"
                className="w-full font-bold text-base shadow-md group"
                onClick={() => router.push(`/streaks/${streak.id}`)}
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Link
                href="/"
                className="inline-block text-xs text-muted-foreground hover:text-foreground transition-colors mt-3 font-medium"
              >
                Back to Home
              </Link>
            </div>

          </CardContent>
        </Card>
      </div>

    </div>
  );
}
