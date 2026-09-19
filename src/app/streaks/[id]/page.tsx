import { getMockStreakDetail } from "@/lib/mock/streaks";
import { StreakDetailView } from "@/components/streak/StreakDetailView";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const streak = getMockStreakDetail(id);
  return {
    title: `${streak.name} | Streak Tracker`,
    description: streak.description,
  };
}

export default async function StreakDetailPage({ params }: Props) {
  const { id } = await params;
  const streak = getMockStreakDetail(id);

  return <StreakDetailView streak={streak} />;
}
