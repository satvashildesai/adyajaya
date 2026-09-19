import type { Streak, StreakDetail, CalendarDay } from "@/types";

export const mockStreaks: Streak[] = [
  {
    id: "1",
    name: "Learn React Native",
    iconName: "BookOpen",
    category: "Learning",
    currentStreak: 27,
    milestoneName: "Monthly Warrior",
    daysToMilestone: 3,
    completedToday: false,
  },
  {
    id: "2",
    name: "Exercise",
    iconName: "Dumbbell",
    category: "Fitness",
    currentStreak: 12,
    milestoneName: "Consistency",
    daysToMilestone: 3,
    completedToday: true,
  },
  {
    id: "3",
    name: "Drink 2L of Water",
    iconName: "Droplets",
    category: "Health",
    currentStreak: 5,
    milestoneName: "Week Warrior",
    daysToMilestone: 2,
    completedToday: false,
  },
  {
    id: "4",
    name: "Journal",
    iconName: "Pencil",
    category: "Mindfulness",
    currentStreak: 9,
    milestoneName: "10-Day Habit",
    daysToMilestone: 1,
    completedToday: false,
  },
  {
    id: "5",
    name: "Sleep Before Midnight",
    iconName: "Moon",
    category: "Health",
    currentStreak: 4,
    milestoneName: "Week Sleeper",
    daysToMilestone: 3,
    completedToday: false,
  },
];

/** Generate calendar days for current month with realistic data */
function generateCalendar(currentStreak: number): CalendarDay[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const todayDay = today.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = [];

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const iso = date.toISOString().split("T")[0];

    if (d > todayDay) {
      days.push({ date: iso, status: "future" });
    } else if (d === todayDay) {
      days.push({ date: iso, status: "today" });
    } else {
      // Simulate: completed for past [currentStreak - 1] days, missed before that
      const daysAgo = todayDay - d;
      days.push({
        date: iso,
        status: daysAgo < currentStreak ? "completed" : "missed",
      });
    }
  }

  return days;
}

/** Mock detail for streak id "1" */
export const mockStreakDetail: StreakDetail = {
  id: "1",
  name: "Learn React Native",
  iconName: "BookOpen",
  category: "Learning",
  description: "Practice React Native for at least 30 minutes every day to build my side project.",
  currentStreak: 27,
  milestoneName: "Monthly Warrior",
  daysToMilestone: 3,
  completedToday: false,
  startDate: "2024-08-01",
  frequency: "Every day",
  color: "indigo",
  reminderTime: "20:00",
  stats: {
    currentStreak: 27,
    bestStreak: 34,
    totalCompleted: 89,
    completionRate: 87,
  },
  calendar: generateCalendar(27),
  recentActivity: Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split("T")[0],
      completed: i === 0 ? false : i % 7 !== 0, // miss every 7th day
    };
  }),
};

/** Look up any streak by id, falling back to streak "1" detail mock */
export function getMockStreakDetail(id: string): StreakDetail {
  const base = mockStreaks.find((s) => s.id === id) ?? mockStreaks[0];
  return {
    ...mockStreakDetail,
    ...base,
    stats: {
      currentStreak: base.currentStreak,
      bestStreak: Math.max(base.currentStreak + 7, 34),
      totalCompleted: base.currentStreak + 62,
      completionRate: Math.round(
        ((base.currentStreak + 62) / (base.currentStreak + 62 + 10)) * 100
      ),
    },
    calendar: generateCalendar(base.currentStreak),
    recentActivity: Array.from({ length: 10 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return {
        date: d.toISOString().split("T")[0],
        completed: i === 0 ? base.completedToday : i % 7 !== 0,
      };
    }),
  };
}
