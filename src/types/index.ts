export type IconName =
  | "BookOpen"
  | "Dumbbell"
  | "Droplets"
  | "Moon"
  | "Pencil"
  | "Flame"
  | "Zap"
  | "Heart"
  | "Star"
  | "Target";

/** User Profile */
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  joinedDate: string;
}

/** Streak item structure */
export interface Streak {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: IconName;
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  nextMilestone: string;
  nextMilestoneDays: number;
  // Aliases for layout compatibility
  milestoneName: string;
  daysToMilestone: number;
  completedToday: boolean;
  startDate: string; // "YYYY-MM-DD"
  frequency: string;
  color: string;
  reminderTime: string;
}

/** Single completion record */
export interface StreakCompletion {
  id: string;
  streakId: string;
  date: string; // "YYYY-MM-DD"
  completed: boolean;
}

/** Milestone definition */
export interface Milestone {
  id: string;
  name: string;
  requiredDays: number;
  emoji: string;
  description: string;
}

/** Achievement card item */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  requiredDays: number;
  requiredStreak: number; // Non-optional alias for requiredDays
  unlocked: boolean;
  unlockedAt?: string;
  emoji: string;
  category?: "starter" | "milestone" | "legendary";
}

/** Stat overview for streak details */
export interface StreakStats {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  completionRate: number; // 0–100
}

/** Activity calendar single day node */
export interface CalendarDay {
  date: string; // "YYYY-MM-DD"
  status: "completed" | "missed" | "today" | "future";
}

/** Expanded streak detail view dataset */
export interface StreakDetail extends Streak {
  stats: StreakStats;
  calendar: CalendarDay[];
  recentActivity: StreakCompletion[];
}

/** Progress screen datasets */
export interface ProgressWeekDay {
  day: string; // "Mon", "Tue"...
  fullDate: string; // "YYYY-MM-DD"
  completed: boolean;
  isToday: boolean;
  isFuture: boolean;
}

export interface ActivityDay {
  date: string; // "YYYY-MM-DD"
  count: number; // Number of completed streaks that day
  level: 0 | 1 | 2 | 3;
}

export interface ProgressInsight {
  id: string;
  title: string;
  description: string;
  iconName: "TrendingUp" | "Trophy" | "Flame" | "Calendar" | "Zap";
  type: "positive" | "milestone" | "tip";
}

export interface ProgressStats {
  overallConsistency: number; // e.g. 82%
  thisWeek: ProgressWeekDay[];
  stats: {
    currentStreak: number;
    bestStreak: number;
    totalWins: number;
    completionRate: number;
  };
  activityGrid: ActivityDay[];
  insights: ProgressInsight[];
}
