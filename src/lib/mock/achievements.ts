export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requiredStreak: number;
  unlocked: boolean;
  unlockedAt?: string;
  category: "starter" | "milestone" | "legendary";
}

export interface AchievementsData {
  userCurrentBestStreak: number; // e.g. 27
  achievements: Achievement[];
}

export const mockAchievementsData: AchievementsData = {
  userCurrentBestStreak: 27,
  achievements: [
    {
      id: "3-days",
      name: "Getting Started",
      emoji: "🌱",
      description: "Complete a 3-day streak on any goal.",
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
      requiredStreak: 30,
      unlocked: false,
      category: "milestone",
    },
    {
      id: "50-days",
      name: "Unstoppable",
      emoji: "💪",
      description: "Push your limits with a 50-day streak.",
      requiredStreak: 50,
      unlocked: false,
      category: "milestone",
    },
    {
      id: "100-days",
      name: "Legendary",
      emoji: "👑",
      description: "Reach a 100-day streak of mastery.",
      requiredStreak: 100,
      unlocked: false,
      category: "legendary",
    },
    {
      id: "365-days",
      name: "Year Champion",
      emoji: "🌟",
      description: "Complete a full 365-day streak of pure dedication.",
      requiredStreak: 365,
      unlocked: false,
      category: "legendary",
    },
  ],
};
