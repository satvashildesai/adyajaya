export default function MilestonePage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-yellow-500">Milestone Reached!</h1>
      <p className="text-center">Congratulations on hitting a milestone for streak: {params.id}</p>
    </div>
  );
}
