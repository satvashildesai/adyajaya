import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  formatDateKey,
  diffCalendarDays,
  addCalendarDays,
  isTodayCompleted,
  calculateCurrentStreak,
  calculateBestStreak,
  calculateTotalCompletedDays,
  calculateCompletionPercentage,
  findNextMilestone,
  calculateDaysToNextMilestone,
  determineUnlockedAchievements,
} from "../streakCalculator";
import type { StreakCompletion, Milestone, Achievement } from "@/types";

describe("Streak Calculator Domain Logic", () => {
  // ── 1. Helper Utilities Tests ──────────────────────────────────────────

  test("formatDateKey formats Date objects and strings to YYYY-MM-DD", () => {
    assert.equal(formatDateKey("2024-08-15"), "2024-08-15");
    assert.equal(formatDateKey(new Date(2024, 7, 15)), "2024-08-15");
    assert.equal(formatDateKey(""), "");
    assert.equal(formatDateKey("invalid-date"), "");
  });

  test("diffCalendarDays calculates day difference across months, years, leap years", () => {
    // Normal days
    assert.equal(diffCalendarDays("2024-08-01", "2024-08-05"), 4);
    // Month boundary
    assert.equal(diffCalendarDays("2024-08-31", "2024-09-01"), 1);
    // Year boundary
    assert.equal(diffCalendarDays("2024-12-31", "2025-01-01"), 1);
    // Leap year (2024 is leap year: Feb 28 -> Feb 29 -> Mar 1)
    assert.equal(diffCalendarDays("2024-02-28", "2024-02-29"), 1);
    assert.equal(diffCalendarDays("2024-02-28", "2024-03-01"), 2);
  });

  test("addCalendarDays correctly increments and decrements dates", () => {
    assert.equal(addCalendarDays("2024-08-31", 1), "2024-09-01");
    assert.equal(addCalendarDays("2025-01-01", -1), "2024-12-31");
    assert.equal(addCalendarDays("2024-02-28", 1), "2024-02-29");
  });

  // ── 2. Edge Case: Empty & Invalid Inputs ──────────────────────────────

  test("handles empty, null, or undefined completion history", () => {
    assert.equal(calculateCurrentStreak([]), 0);
    assert.equal(calculateCurrentStreak(null as any), 0);
    assert.equal(calculateCurrentStreak(undefined as any), 0);

    assert.equal(calculateBestStreak([]), 0);
    assert.equal(calculateBestStreak(null as any), 0);

    assert.equal(calculateTotalCompletedDays([]), 0);
    assert.equal(isTodayCompleted([], "2024-08-15"), false);
  });

  // ── 3. Single Completed Day ───────────────────────────────────────────

  test("calculates single completed day correctly", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-15", completed: true },
    ];

    // Reference date is the completed date -> streak = 1
    assert.equal(calculateCurrentStreak(completions, "2024-08-15"), 1);
    // Reference date is next day (today not completed yet) -> streak = 1 (active from yesterday)
    assert.equal(calculateCurrentStreak(completions, "2024-08-16"), 1);
    // Reference date is 2 days later -> streak = 0 (broken)
    assert.equal(calculateCurrentStreak(completions, "2024-08-17"), 0);

    assert.equal(calculateBestStreak(completions), 1);
    assert.equal(calculateTotalCompletedDays(completions), 1);
  });

  // ── 4. Consecutive Completed Days ──────────────────────────────────────

  test("calculates consecutive completed days", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-10", completed: true },
      { streakId: "s1", date: "2024-08-11", completed: true },
      { streakId: "s1", date: "2024-08-12", completed: true },
      { streakId: "s1", date: "2024-08-13", completed: true },
      { streakId: "s1", date: "2024-08-14", completed: true },
    ];

    assert.equal(calculateCurrentStreak(completions, "2024-08-14"), 5);
    assert.equal(calculateBestStreak(completions), 5);
    assert.equal(calculateTotalCompletedDays(completions), 5);
  });

  // ── 5. Missing Days & Multiple Historical Streaks ────────────────────

  test("handles gaps and calculates best streak vs current streak", () => {
    const completions: StreakCompletion[] = [
      // Old streak: 4 days (Aug 1 to Aug 4)
      { streakId: "s1", date: "2024-08-01", completed: true },
      { streakId: "s1", date: "2024-08-02", completed: true },
      { streakId: "s1", date: "2024-08-03", completed: true },
      { streakId: "s1", date: "2024-08-04", completed: true },
      // Gap: Aug 5 missed
      // Current streak: 2 days (Aug 6 to Aug 7)
      { streakId: "s1", date: "2024-08-06", completed: true },
      { streakId: "s1", date: "2024-08-07", completed: true },
    ];

    const refDate = "2024-08-07";
    assert.equal(calculateCurrentStreak(completions, refDate), 2);
    assert.equal(calculateBestStreak(completions), 4);
    assert.equal(calculateTotalCompletedDays(completions), 6);
  });

  // ── 6. Duplicate Completion Dates ─────────────────────────────────────

  test("deduplicates multiple completion entries for the same date", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-10", completed: true },
      { streakId: "s1", date: "2024-08-10", completed: true }, // Duplicate
      { streakId: "s1", date: "2024-08-11", completed: true },
      { streakId: "s1", date: "2024-08-11", completed: true }, // Duplicate
    ];

    assert.equal(calculateTotalCompletedDays(completions), 2);
    assert.equal(calculateCurrentStreak(completions, "2024-08-11"), 2);
    assert.equal(calculateBestStreak(completions), 2);
  });

  // ── 7. Today Completed vs Yesterday Completed ─────────────────────────

  test("handles Today completed vs Yesterday completed vs Broken streak", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-10", completed: true },
      { streakId: "s1", date: "2024-08-11", completed: true },
    ];

    // Today is Aug 11 (completed today) -> streak = 2
    assert.equal(isTodayCompleted(completions, "2024-08-11"), true);
    assert.equal(calculateCurrentStreak(completions, "2024-08-11"), 2);

    // Today is Aug 12 (today not completed yet, yesterday Aug 11 WAS completed) -> streak = 2 (active!)
    assert.equal(isTodayCompleted(completions, "2024-08-12"), false);
    assert.equal(calculateCurrentStreak(completions, "2024-08-12"), 2);

    // Today is Aug 13 (neither today nor yesterday completed) -> streak = 0 (broken!)
    assert.equal(isTodayCompleted(completions, "2024-08-13"), false);
    assert.equal(calculateCurrentStreak(completions, "2024-08-13"), 0);
  });

  // ── 8. Future Dates ────────────────────────────────────────────────────

  test("ignores completion entries dated after referenceDate", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-10", completed: true },
      { streakId: "s1", date: "2024-08-11", completed: true },
      { streakId: "s1", date: "2024-08-20", completed: true }, // Future date
    ];

    // As of Aug 11, future completion on Aug 20 is ignored
    assert.equal(calculateCurrentStreak(completions, "2024-08-11"), 2);
  });

  // ── 9. Month & Year Boundaries & Leap Years ────────────────────────────

  test("handles streak across month boundary", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-30", completed: true },
      { streakId: "s1", date: "2024-08-31", completed: true },
      { streakId: "s1", date: "2024-09-01", completed: true },
      { streakId: "s1", date: "2024-09-02", completed: true },
    ];

    assert.equal(calculateCurrentStreak(completions, "2024-09-02"), 4);
    assert.equal(calculateBestStreak(completions), 4);
  });

  test("handles streak across year boundary", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-12-30", completed: true },
      { streakId: "s1", date: "2024-12-31", completed: true },
      { streakId: "s1", date: "2025-01-01", completed: true },
    ];

    assert.equal(calculateCurrentStreak(completions, "2025-01-01"), 3);
  });

  test("handles leap year Feb 28 -> Feb 29 -> Mar 1 streak", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-02-28", completed: true },
      { streakId: "s1", date: "2024-02-29", completed: true },
      { streakId: "s1", date: "2024-03-01", completed: true },
    ];

    assert.equal(calculateCurrentStreak(completions, "2024-03-01"), 3);
    assert.equal(calculateBestStreak(completions), 3);
  });

  // ── 10. Completion Percentage ──────────────────────────────────────────

  test("calculates completion percentage accurately", () => {
    const completions: StreakCompletion[] = [
      { streakId: "s1", date: "2024-08-01", completed: true },
      { streakId: "s1", date: "2024-08-02", completed: true },
      { streakId: "s1", date: "2024-08-03", completed: true },
      { streakId: "s1", date: "2024-08-04", completed: false }, // Missed
    ];

    // Start Aug 1, Ref Aug 4 -> 4 total planned days, 3 completed -> 75%
    assert.equal(
      calculateCompletionPercentage(completions, "2024-08-01", "2024-08-04"),
      75
    );
  });

  // ── 11. Milestones & Achievements ─────────────────────────────────────

  test("finds next milestone and calculates days remaining", () => {
    const customMilestones: Milestone[] = [
      { id: "m1", name: "3 Days", requiredDays: 3, emoji: "🌱", description: "" },
      { id: "m2", name: "7 Days", requiredDays: 7, emoji: "🔥", description: "" },
      { id: "m3", name: "30 Days", requiredDays: 30, emoji: "🏆", description: "" },
    ];

    const currentStreak = 5;
    const next = findNextMilestone(currentStreak, customMilestones);
    assert.equal(next?.name, "7 Days");
    assert.equal(calculateDaysToNextMilestone(currentStreak, customMilestones), 2);

    // When streak exceeds all milestones
    const maxNext = findNextMilestone(50, customMilestones);
    assert.equal(maxNext, null);
    assert.equal(calculateDaysToNextMilestone(50, customMilestones), 0);
  });

  test("determines unlocked achievements based on best streak", () => {
    const customAchievements: Achievement[] = [
      { id: "a1", name: "3 Days", description: "", requiredDays: 3, requiredStreak: 3, unlocked: false, emoji: "🌱" },
      { id: "a2", name: "7 Days", description: "", requiredDays: 7, requiredStreak: 7, unlocked: false, emoji: "🔥" },
      { id: "a3", name: "30 Days", description: "", requiredDays: 30, requiredStreak: 30, unlocked: false, emoji: "🏆" },
    ];

    const bestStreak = 10;
    const updated = determineUnlockedAchievements(bestStreak, customAchievements);

    assert.equal(updated.find((a) => a.id === "a1")?.unlocked, true);
    assert.equal(updated.find((a) => a.id === "a2")?.unlocked, true);
    assert.equal(updated.find((a) => a.id === "a3")?.unlocked, false);
  });
});
