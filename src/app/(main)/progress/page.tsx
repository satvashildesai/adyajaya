import type { Metadata } from "next";
import { getMockProgressData } from "@/lib/mock/progress";
import { ProgressView } from "@/components/progress/ProgressView";

export const metadata: Metadata = {
  title: "Progress | Streak Tracker",
  description: "Understand your streak consistency, total wins, and long-term habits over time.",
};

export default function ProgressPage() {
  const data = getMockProgressData();
  return <ProgressView data={data} />;
}
