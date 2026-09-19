import { mockAchievements, mockUser } from "./index";
import type { Achievement } from "@/types";

export type { Achievement };

export interface AchievementsData {
  userCurrentBestStreak: number;
  achievements: Achievement[];
}

export const mockAchievementsData: AchievementsData = {
  userCurrentBestStreak: 27,
  achievements: mockAchievements,
};

export { mockAchievements, getMockAchievements } from "./index";
