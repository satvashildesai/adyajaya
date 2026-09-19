import type { Metadata } from "next";
import { mockAchievementsData } from "@/lib/mock/achievements";
import { AchievementsView } from "@/components/achievements/AchievementsView";

export const metadata: Metadata = {
  title: "Achievements | Streak Tracker",
  description: "View unlocked streak milestones, rewards, and upcoming achievement goals.",
};

export default function AchievementsPage() {
  return <AchievementsView data={mockAchievementsData} />;
}
