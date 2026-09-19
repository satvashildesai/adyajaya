export interface ProgressWeekDay {
  day: string; // "Mon", "Tue", ...
  fullDate: string; // "YYYY-MM-DD"
  completed: boolean;
  isToday: boolean;
  isFuture: boolean;
}

export interface ActivityDay {
  date: string; // "YYYY-MM-DD"
  count: number; // number of completed streaks that day
  level: 0 | 1 | 2 | 3; // 0: none, 1: low, 2: medium, 3: high
}

export interface ProgressInsight {
  id: string;
  title: string;
  description: string;
  iconName: "TrendingUp" | "Trophy" | "Flame" | "Calendar" | "Zap";
  type: "positive" | "milestone" | "tip";
}

export interface ProgressData {
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

/** Helper to generate realistic mock progress data relative to today */
export function getMockProgressData(): ProgressData {
  const today = new Date();
  
  // ── 1. Calculate current week (Mon – Sun) ──────────────────────────────
  const currentDayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon...
  // Convert so Monday = 0, Sunday = 6
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

    // Simulate completion for past days & today
    let completed = false;
    if (!isFuture) {
      // Sat/Sun might be incomplete depending on mock state
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

  // ── 2. Calculate ~12 weeks of activity grid (84 days) ───────────────────
  const activityGrid: ActivityDay[] = [];
  const totalDays = 84; // 12 weeks
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (totalDays - 1));

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Deterministic pseudo-random simulation based on date index
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

  // ── 3. Return full dataset ─────────────────────────────────────────────
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
