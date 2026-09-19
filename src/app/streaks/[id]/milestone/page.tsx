import type { Metadata } from "next";
import { getMockStreakDetail } from "@/lib/mock/streaks";
import { MilestoneCelebrationView } from "@/components/streak/MilestoneCelebrationView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const streak = getMockStreakDetail(id);
  return {
    title: `Milestone Celebration - ${streak.name} | Streak Tracker`,
    description: `Congratulations on reaching your milestone for ${streak.name}!`,
  };
}

export default async function MilestonePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const streak = getMockStreakDetail(id);

  return <MilestoneCelebrationView streak={streak} />;
}
