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
  currentStreak: number;
  milestoneName: string;
  daysToMilestone: number;
  completedToday: boolean;
}
