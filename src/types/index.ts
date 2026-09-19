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

export interface Streak {
  id: string;
  name: string;
  iconName: IconName;
  category: string;
  currentStreak: number;
  milestoneName: string;
  daysToMilestone: number;
  completedToday: boolean;
}

export interface StreakStats {
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  completionRate: number; // 0–100
}

/** One day entry for the activity calendar */
export interface CalendarDay {
  date: string; // "YYYY-MM-DD"
  status: "completed" | "missed" | "today" | "future";
}

export interface StreakDetail extends Streak {
  description: string;
  startDate: string; // "YYYY-MM-DD"
  frequency: string;
  color: string;
  reminderTime: string;
  stats: StreakStats;
  calendar: CalendarDay[];
  recentActivity: { date: string; completed: boolean }[];
}
