import type { Streak } from "@/types";

export const mockStreaks: Streak[] = [
  {
    id: "1",
    name: "Learn React Native",
    iconName: "BookOpen",
    currentStreak: 27,
    milestoneName: "Monthly Warrior",
    daysToMilestone: 3,
    completedToday: false,
  },
  {
    id: "2",
    name: "Exercise",
    iconName: "Dumbbell",
    currentStreak: 12,
    milestoneName: "Consistency",
    daysToMilestone: 3,
    completedToday: true,
  },
  {
    id: "3",
    name: "Drink 2L of Water",
    iconName: "Droplets",
    currentStreak: 5,
    milestoneName: "Week Warrior",
    daysToMilestone: 2,
    completedToday: false,
  },
  {
    id: "4",
    name: "Journal",
    iconName: "Pencil",
    currentStreak: 9,
    milestoneName: "10-Day Habit",
    daysToMilestone: 1,
    completedToday: false,
  },
  {
    id: "5",
    name: "Sleep Before Midnight",
    iconName: "Moon",
    currentStreak: 4,
    milestoneName: "Week Sleeper",
    daysToMilestone: 3,
    completedToday: false,
  },
];
