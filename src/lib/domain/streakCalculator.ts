import type { StreakCompletion, Milestone, Achievement } from "@/types";
import { mockMilestones, mockAchievements } from "@/lib/mock";

// ─── Date Utility Functions ────────────────────────────────────────────────

/**
 * Formats a Date object or date string to standard "YYYY-MM-DD" string.
 */
export function formatDateKey(dateInput: Date | string | number): string {
  if (!dateInput) return "";
  const d = typeof dateInput === "string" ? new Date(dateInput) : new Date(dateInput.valueOf());
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates calendar day difference between two "YYYY-MM-DD" date strings.
 * Returns date2 - date1 in integer days.
 */
export function diffCalendarDays(dateStr1: string, dateStr2: string): number {
  if (!dateStr1 || !dateStr2) return 0;

  const [y1, m1, d1] = dateStr1.split("-").map(Number);
  const [y2, m2, d2] = dateStr2.split("-").map(Number);

  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);

  const msPerDay = 86400000;
  return Math.round((utc2 - utc1) / msPerDay);
}

/**
 * Returns a date string "YYYY-MM-DD" offset by N days relative to target date.
 */
export function addCalendarDays(dateStr: string, days: number): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d + days));
  const resY = utc.getUTCFullYear();
  const resM = String(utc.getUTCMonth() + 1).padStart(2, "0");
  const resD = String(utc.getUTCDate()).padStart(2, "0");
  return `${resY}-${resM}-${resD}`;
}

/**
 * Deduplicates and sorts completion records.
 * Returns sorted unique "YYYY-MM-DD" strings of completed days in ascending order.
 */
export function getCleanCompletedDates(
  completions: StreakCompletion[] | undefined | null,
  referenceDate?: Date | string
): string[] {
  if (!completions || !Array.isArray(completions)) return [];

  const refDateStr = referenceDate ? formatDateKey(referenceDate) : null;
  const dateSet = new Set<string>();

  for (const item of completions) {
    if (!item || !item.completed) continue;
    const key = formatDateKey(item.date);
    if (!key) continue;

    // Filter out future dates relative to referenceDate if specified
    if (refDateStr && key > refDateStr) continue;

    dateSet.add(key);
  }

  return Array.from(dateSet).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

// ─── Domain Functions ──────────────────────────────────────────────────────

/**
 * Determines whether today (or referenceDate) is completed.
 */
export function isTodayCompleted(
  completions: StreakCompletion[] | undefined | null,
  referenceDate?: Date | string
): boolean {
  const refDateStr = formatDateKey(referenceDate ?? new Date());
  const completedDates = getCleanCompletedDates(completions, referenceDate);
  return completedDates.includes(refDateStr);
}

/**
 * Calculates current streak count.
 * Rules:
 * - If Today is completed, streak counts backwards starting from Today.
 * - If Today is NOT completed, check Yesterday. If Yesterday is completed, streak is active (starts from Yesterday).
 * - If neither Today nor Yesterday is completed, current streak is 0.
 */
export function calculateCurrentStreak(
  completions: StreakCompletion[] | undefined | null,
  referenceDate?: Date | string
): number {
  const refDateStr = formatDateKey(referenceDate ?? new Date());
  const completedDates = getCleanCompletedDates(completions, referenceDate);

  if (completedDates.length === 0) return 0;

  const completedSet = new Set(completedDates);

  const todayDone = completedSet.has(refDateStr);
  const yesterdayStr = addCalendarDays(refDateStr, -1);
  const yesterdayDone = completedSet.has(yesterdayStr);

  if (!todayDone && !yesterdayDone) {
    return 0;
  }

  // Start counting backward from Today if today is done, else Yesterday
  let curr = todayDone ? refDateStr : yesterdayStr;
  let streak = 0;

  while (completedSet.has(curr)) {
    streak++;
    curr = addCalendarDays(curr, -1);
  }

  return streak;
}

/**
 * Calculates the all-time best (longest consecutive) streak.
 */
export function calculateBestStreak(
  completions: StreakCompletion[] | undefined | null
): number {
  const completedDates = getCleanCompletedDates(completions);
  if (completedDates.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < completedDates.length; i++) {
    const diff = diffCalendarDays(completedDates[i - 1], completedDates[i]);
    if (diff === 1) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

/**
 * Calculates total unique completed days.
 */
export function calculateTotalCompletedDays(
  completions: StreakCompletion[] | undefined | null
): number {
  const completedDates = getCleanCompletedDates(completions);
  return completedDates.length;
}

/**
 * Calculates completion percentage between startDate and referenceDate inclusive.
 */
export function calculateCompletionPercentage(
  completions: StreakCompletion[] | undefined | null,
  startDate: Date | string,
  referenceDate?: Date | string
): number {
  const startStr = formatDateKey(startDate);
  const refStr = formatDateKey(referenceDate ?? new Date());

  if (!startStr || !refStr || startStr > refStr) return 0;

  const totalPlannedDays = diffCalendarDays(startStr, refStr) + 1;
  if (totalPlannedDays <= 0) return 0;

  const completedDates = getCleanCompletedDates(completions, referenceDate);
  const completedInRange = completedDates.filter(
    (d) => d >= startStr && d <= refStr
  ).length;

  const rate = Math.round((completedInRange / totalPlannedDays) * 100);
  return Math.min(100, Math.max(0, rate));
}

/**
 * Finds the next milestone to be unlocked given current streak.
 */
export function findNextMilestone(
  currentStreak: number,
  milestones: Milestone[] = mockMilestones
): Milestone | null {
  if (!milestones || milestones.length === 0) return null;

  const sorted = [...milestones].sort((a, b) => a.requiredDays - b.requiredDays);
  return sorted.find((m) => m.requiredDays > currentStreak) ?? null;
}

/**
 * Calculates remaining days needed to reach the next milestone.
 */
export function calculateDaysToNextMilestone(
  currentStreak: number,
  milestones: Milestone[] = mockMilestones
): number {
  const next = findNextMilestone(currentStreak, milestones);
  if (!next) return 0;
  return Math.max(0, next.requiredDays - currentStreak);
}

/**
 * Determines which achievements are unlocked based on best streak.
 */
export function determineUnlockedAchievements(
  bestStreak: number,
  achievements: Achievement[] = mockAchievements
): Achievement[] {
  if (!achievements) return [];

  return achievements.map((ach) => {
    const required = ach.requiredStreak ?? ach.requiredDays;
    const unlocked = bestStreak >= required;
    return {
      ...ach,
      unlocked,
    };
  });
}
