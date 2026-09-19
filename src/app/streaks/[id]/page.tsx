export default function StreakDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Streak Detail</h1>
      <p>Viewing details for streak: {params.id}</p>
    </div>
  );
}
