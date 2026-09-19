import type {
  User,
  Streak,
  StreakCompletion,
  Achievement,
  Milestone,
  StreakDetail,
  CalendarDay,
  ProgressStats,
  ProgressWeekDay,
  ActivityDay,
} from "@/types";

// ─── 1. User Profile Mock ──────────────────────────────────────────────────

export const mockUser: User = {
  id: "usr_1",
  name: "Alex Rivera",
  avatarUrl: "",
  joinedDate: "2024-01-15",
};

// ─── 2. Milestones Data ────────────────────────────────────────────────────

export const mockMilestones: Milestone[] = [
  {
    id: "ms_3",
    name: "Getting Started",
    requiredDays: 3,
    emoji: "🌱",
    description: "Complete a 3-day streak on any goal.",
  },
  {
    id: "ms_7",
    name: "One Week",
    requiredDays: 7,
    emoji: "🔥",
    description: "Build real momentum with a 7-day streak.",
  },
  {
    id: "ms_15",
    name: "Consistency",
    requiredDays: 15,
    emoji: "🥉",
    description: "Demonstrate strong habits with a 15-day streak.",
  },
  {
    id: "ms_30",
    name: "Monthly Warrior",
    requiredDays: 30,
    emoji: "🏆",
    description: "Reach an incredible 30-day streak.",
  },
  {
    id: "ms_50",
    name: "Unstoppable",
    requiredDays: 50,
    emoji: "💪",
    description: "Push your limits with a 50-day streak.",
  },
  {
    id: "ms_100",
    name: "Legendary",
    requiredDays: 100,
    emoji: "👑",
    description: "Reach a 100-day streak of mastery.",
  },
  {
    id: "ms_365",
    name: "Year Champion",
    requiredDays: 365,
    emoji: "🌟",
    description: "Complete a full 365-day streak of pure dedication.",
  },
];

// ─── 3. Achievements Data ──────────────────────────────────────────────────

export const mockAchievements: Achievement[] = [
  {
    id: "3-days",
    name: "Getting Started",
    emoji: "🌱",
    description: "Complete a 3-day streak on any goal.",
    requiredDays: 3,
    requiredStreak: 3,
    unlocked: true,
    unlockedAt: "Aug 04, 2024",
    category: "starter",
  },
  {
    id: "7-days",
    name: "One Week",
    emoji: "🔥",
    description: "Build real momentum with a 7-day streak.",
    requiredDays: 7,
    requiredStreak: 7,
    unlocked: true,
    unlockedAt: "Aug 08, 2024",
    category: "starter",
  },
  {
    id: "15-days",
    name: "Consistency",
    emoji: "🥉",
    description: "Demonstrate strong habits with a 15-day streak.",
    requiredDays: 15,
    requiredStreak: 15,
    unlocked: true,
    unlockedAt: "Aug 16, 2024",
    category: "milestone",
  },
  {
    id: "30-days",
    name: "Monthly Warrior",
    emoji: "🏆",
    description: "Reach an incredible 30-day streak.",
    requiredDays: 30,
    requiredStreak: 30,
    unlocked: false,
    category: "milestone",
  },
  {
    id: "50-days",
    name: "Unstoppable",
    emoji: "💪",
    description: "Push your limits with a 50-day streak.",
    requiredDays: 50,
    requiredStreak: 50,
    unlocked: false,
    category: "milestone",
  },
  {
    id: "100-days",
    name: "Legendary",
    emoji: "👑",
    description: "Reach a 100-day streak of mastery.",
    requiredDays: 100,
    requiredStreak: 100,
    unlocked: false,
    category: "legendary",
  },
  {
    id: "365-days",
    name: "Year Champion",
    emoji: "🌟",
    description: "Complete a full 365-day streak of pure dedication.",
    requiredDays: 365,
    requiredStreak: 365,
    unlocked: false,
    category: "legendary",
  },
];

// ─── 4. Streaks Data ───────────────────────────────────────────────────────

export const mockStreaks: Streak[] = [
  {
    id: "1",
    name: "Learn React Native",
    description: "Practice React Native for at least 30 minutes every day to build my side project.",
    category: "Learning",
    iconName: "BookOpen",
    currentStreak: 27,
    bestStreak: 34,
    totalCompletions: 89,
    nextMilestone: "Monthly Warrior",
    nextMilestoneDays: 3,
    milestoneName: "Monthly Warrior",
    daysToMilestone: 3,
    completedToday: false,
    startDate: "2024-08-01",
    frequency: "Every day",
    color: "indigo",
    reminderTime: "20:00",
  },
  {
    id: "2",
    name: "Exercise",
    description: "Workout, run, or do yoga for 45 minutes.",
    category: "Fitness",
    iconName: "Dumbbell",
    currentStreak: 12,
    bestStreak: 21,
    totalCompletions: 45,
    nextMilestone: "Consistency",
    nextMilestoneDays: 3,
    milestoneName: "Consistency",
    daysToMilestone: 3,
    completedToday: true,
    startDate: "2024-08-10",
    frequency: "Every day",
    color: "emerald",
    reminderTime: "07:30",
  },
  {
    id: "3",
    name: "Drink 2L of Water",
    description: "Stay hydrated throughout the workday.",
    category: "Health",
    iconName: "Droplets",
    currentStreak: 5,
    bestStreak: 14,
    totalCompletions: 62,
    nextMilestone: "Week Warrior",
    nextMilestoneDays: 2,
    milestoneName: "Week Warrior",
    daysToMilestone: 2,
    completedToday: false,
    startDate: "2024-07-20",
    frequency: "Every day",
    color: "blue",
    reminderTime: "12:00",
  },
  {
    id: "4",
    name: "Journal",
    description: "Reflect on accomplishments and learnings.",
    category: "Mindfulness",
    iconName: "Pencil",
    currentStreak: 9,
    bestStreak: 18,
    totalCompletions: 38,
    nextMilestone: "10-Day Habit",
    nextMilestoneDays: 1,
    milestoneName: "10-Day Habit",
    daysToMilestone: 1,
    completedToday: false,
    startDate: "2024-08-05",
    frequency: "Every day",
    color: "purple",
    reminderTime: "21:30",
  },
  {
    id: "5",
    name: "Sleep Before Midnight",
    description: "Turn off all screens by 11:30 PM.",
    category: "Health",
    iconName: "Moon",
    currentStreak: 4,
    bestStreak: 10,
    totalCompletions: 29,
    nextMilestone: "Week Sleeper",
    nextMilestoneDays: 3,
    milestoneName: "Week Sleeper",
    daysToMilestone: 3,
    completedToday: false,
    startDate: "2024-08-12",
    frequency: "Every day",
    color: "indigo",
    reminderTime: "23:00",
  },
];

// ─── 5. Streak Completions Deterministic Helper ───────────────────────────

export function getMockCompletions(streakId?: string): StreakCompletion[] {
  const completions: StreakCompletion[] = [];
  const today = new Date();

  const targetStreaks = streakId
    ? mockStreaks.filter((s) => s.id === streakId)
    : mockStreaks;

  targetStreaks.forEach((streak) => {
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      // Completed if within current streak window or periodic past wins
      const completed =
        i === 0
          ? streak.completedToday
          : i < streak.currentStreak
          ? true
          : (i * 7 + parseInt(streak.id, 10)) % 3 !== 0;

      completions.push({
        id: `cmp_${streak.id}_${dateStr}`,
        streakId: streak.id,
        date: dateStr,
        completed,
      });
    }
  });

  return completions;
}

// ─── 6. Calendar Generator Helper ─────────────────────────────────────────

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
      const daysAgo = todayDay - d;
      days.push({
        date: iso,
        status: daysAgo < currentStreak ? "completed" : "missed",
      });
    }
  }

  return days;
}

// ─── 7. Streak Detail Generator ───────────────────────────────────────────

export function getMockStreakDetail(id: string): StreakDetail {
  const base = mockStreaks.find((s) => s.id === id) ?? mockStreaks[0];
  const completions = getMockCompletions(base.id);

  return {
    ...base,
    stats: {
      currentStreak: base.currentStreak,
      bestStreak: base.bestStreak,
      totalCompleted: base.totalCompletions,
      completionRate: Math.round(
        (base.totalCompletions / (base.totalCompletions + 12)) * 100
      ),
    },
    calendar: generateCalendar(base.currentStreak),
    recentActivity: completions.slice(0, 10),
  };
}

// ─── 8. Progress Statistics Generator ───────────────────────────────────────

export function getMockProgressStats(): ProgressStats {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const monOffset = (currentDayOfWeek + 6) % 7;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - monOffset);

  const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const thisWeek: ProgressWeekDay[] = daysShort.map((dayLabel, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    const dateStr = d.toISOString().split("T")[0];
    const isToday = d.toDateString() === today.toDateString();
    const isFuture = d > today && !isToday;

    let completed = false;
    if (!isFuture) {
      completed = index < 5 || (index === 5 && isToday);
    }

    return {
      day: dayLabel,
      fullDate: dateStr,
      completed,
      isToday,
      isFuture,
    };
  });

  const activityGrid: ActivityDay[] = [];
  const totalDays = 84;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (totalDays - 1));

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let count = 0;
    if (d <= today) {
      const hash = (i * 13 + dayOfWeek * 7) % 10;
      if (isWeekend) {
        count = hash > 4 ? 2 : hash > 2 ? 1 : 0;
      } else {
        count = hash > 1 ? 3 : hash > 0 ? 2 : 1;
      }
    }

    const level: 0 | 1 | 2 | 3 =
      count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : 3;

    activityGrid.push({
      date: dateStr,
      count,
      level,
    });
  }

  return {
    overallConsistency: 82,
    thisWeek,
    stats: {
      currentStreak: 27,
      bestStreak: 42,
      totalWins: 183,
      completionRate: 82,
    },
    activityGrid,
    insights: [
      {
        id: "1",
        title: "Weekday Consistency Champion",
        description: "You're 92% consistent on weekdays! Your morning routines are solid.",
        iconName: "TrendingUp",
        type: "positive",
      },
      {
        id: "2",
        title: "Upcoming Milestone",
        description: "You're 3 days away from unlocking the 'Monthly Warrior' badge!",
        iconName: "Trophy",
        type: "milestone",
      },
      {
        id: "3",
        title: "Weekend Momentum",
        description: "Completing 1 streak on Saturday doubles your odds of a 7-day streak.",
        iconName: "Zap",
        type: "tip",
      },
    ],
  };
}

// ─── Data Access API ───────────────────────────────────────────────────────

export function getMockUser(): User {
  return mockUser;
}

export function getMockStreaks(): Streak[] {
  return mockStreaks;
}

export function getMockAchievements(): Achievement[] {
  return mockAchievements;
}

export function getMockMilestones(): Milestone[] {
  return mockMilestones;
}
