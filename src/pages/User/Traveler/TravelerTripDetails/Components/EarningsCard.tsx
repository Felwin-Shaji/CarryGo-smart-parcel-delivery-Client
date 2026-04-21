import type { TripDetailsUI } from "../../../../../constants_Types/types/User/Traveler/TravelerType";

export const EarningsCard = ({ trip }: { trip: TripDetailsUI }) => {
  const completed = trip.orders
    .filter(o => o.status === "DELIVERED")
    .reduce((sum, o) => sum + o.amount, 0);

  const pending = trip.orders
    .filter(o => o.status !== "DELIVERED")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4">

      <h3 className="text-sm text-gray-500">TOTAL EARNINGS</h3>

      <h2 className="text-2xl font-bold">
        ₹{completed + pending}
      </h2>

      <div className="flex gap-3">

        <div className="flex-1 bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="font-semibold">₹{completed}</p>
        </div>

        <div className="flex-1 bg-gray-50 p-3 rounded-xl">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="font-semibold">₹{pending}</p>
        </div>

      </div>

    </div>
  );
};