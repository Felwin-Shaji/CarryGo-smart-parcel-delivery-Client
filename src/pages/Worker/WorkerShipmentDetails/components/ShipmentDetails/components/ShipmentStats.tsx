export function ShipmentStats({
  total,
  loaded,
  transit,
  completed,
}: any) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <StatCard title="Total Parcels" value={total} />
      <StatCard title="Loaded" value={loaded} />
      <StatCard title="In Transit" value={transit} />
      <StatCard title="Completed" value={`${completed}`} />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}