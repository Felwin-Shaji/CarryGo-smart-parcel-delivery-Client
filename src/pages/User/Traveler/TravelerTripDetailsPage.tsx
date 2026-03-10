import { useParams } from "react-router-dom";
import { useTravelRequest } from "../../../Services/User/Traveler/TravelRequest";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import type { TripDetailsUI, TripOrderUI } from "../../../constants_Types/types/User/Traveler/TravelerType";
import BackButton from "../../../components/globelcomponents/BackButton";

export const TravelerTripDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const { getTripById } = useTravelRequest();

  const [trip, setTrip] = useState<TripDetailsUI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (!id) return;
        const data = await getTripById(id);
        console.log(data)
        setTrip(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading)
    return (
      <>
        <Header isLoggedIn />
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          Loading trip details...
        </div>
      </>
    );

  if (!trip)
    return (
      <>
        <Header isLoggedIn />
        <div className="min-h-screen bg-gray-50 pt-24 flex justify-center items-center">
          Trip not found
        </div>
      </>
    );

  const usedCapacity = trip.capacityKg - trip.remainingCapacityKg;

  return (
    <>
      <Header isLoggedIn />

      <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10">

        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="bg-white border rounded-xl p-6 flex items-start justify-between shadow-sm">

            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {trip.startCity} → {trip.endCity}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Departure: {new Date(trip.departureAt).toLocaleString()}
              </p>

              {trip.arrivalAt && (
                <p className="text-sm text-gray-500">
                  Arrival: {new Date(trip.arrivalAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-3">
              <BackButton />
              <StatusBadge status={trip.status} />
            </div>

          </div>


          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">

              {/* KPI CARDS */}
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">

                <KpiCard
                  title="Capacity Used"
                  value={`${usedCapacity} / ${trip.capacityKg} kg`}
                />

                <KpiCard
                  title="Orders"
                  value={trip.stats.totalOrders}
                />

                <KpiCard
                  title="Active Orders"
                  value={trip.stats.activeOrders}
                />

                <KpiCard
                  title="Earnings"
                  value={`₹${trip.earnings.total}`}
                  highlight
                />

              </div>


              {/* ORDERS */}
              <div className="bg-white border rounded-xl shadow-sm">
                <div className="p-6 border-b flex justify-between items-center">

                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Trip Orders
                    </h2>

                    <p className="text-sm text-gray-500">
                      Manage parcels assigned to this trip
                    </p>
                  </div>

                  <span className="text-sm font-medium text-gray-600">
                    {trip.orders.length} {trip.orders.length === 1 ? "Order" : "Orders"}
                  </span>

                </div>


                <OrdersTable orders={trip.orders} />

              </div>

            </div>


            {/* RIGHT SIDE - TRIP INFO */}
            <div className="space-y-6">

              <div className="bg-white border rounded-xl shadow-sm p-6">

                <h2 className="text-lg font-semibold mb-5">
                  Trip Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  <DetailItem label="Transport" value={trip.modeOfTransport} />

                  <DetailItem
                    label="Total Volume"
                    value={`${trip.totalVolumeCm3} cm³`}
                  />

                  <DetailItem
                    label="Remaining Volume"
                    value={`${trip.remainingVolumeCm3} cm³`}
                  />

                  <DetailItem
                    label="Max Length"
                    value={`${trip.allowedPackageDimensions.maxLengthCm} cm`}
                  />

                  <DetailItem
                    label="Max Width"
                    value={`${trip.allowedPackageDimensions.maxWidthCm} cm`}
                  />

                  <DetailItem
                    label="Max Height"
                    value={`${trip.allowedPackageDimensions.maxHeightCm} cm`}
                  />

                </div>

                {trip.description && (
                  <div className="mt-6 pt-4 border-t">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Notes
                    </p>

                    <p className="text-sm text-gray-700">
                      {trip.description}
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};


const StatusBadge = ({ status }: { status: string }) => {

  const config: Record<string, string> = {
    DRAFT: "bg-gray-100 text-gray-700",
    PENDING_APPROVAL: "bg-yellow-100 text-yellow-700",
    ACTIVE: "bg-green-100 text-green-700",
    PARTIALLY_BOOKED: "bg-blue-100 text-blue-700",
    FULLY_BOOKED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-gray-200 text-gray-800",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const formatted = status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      ${config[status] || "bg-gray-100 text-gray-600"}`}
    >
      {formatted}
    </span>
  );
};

const KpiCard = ({
  title,
  value,
  highlight = false,
  icon
}: {
  title: string;
  value: string | number;
  highlight?: boolean;
  icon?: React.ReactNode;
}) => {

  return (
    <div
      className={`rounded-xl border p-5 transition hover:shadow-md
      ${highlight
          ? "bg-green-50 border-green-200"
          : "bg-white border-gray-200"
        }`}
    >

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          {title}
        </p>

        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}

      </div>

      <p className="text-2xl font-semibold mt-2">
        {value}
      </p>

    </div>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {

  return (
    <div className="bg-gray-50 border rounded-lg px-4 py-3">

      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="text-sm font-semibold text-gray-800 mt-1">
        {value}
      </p>

    </div>
  );
};

const OrdersTable = ({ orders }: { orders: TripOrderUI[] }) => {

  const getStatusColor = (status: string) => {

    const map: Record<string, string> = {
      PAID_PENDING_PICKUP: "bg-yellow-100 text-yellow-700",
      PICKED_UP: "bg-blue-100 text-blue-700",
      IN_TRANSIT: "bg-indigo-100 text-indigo-700",
      DELIVERED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    };

    return map[status] || "bg-gray-100 text-gray-600";
  };

  if (!orders.length) {
    return (
      <div className="p-12 text-center">

        <div className="text-4xl mb-3">📦</div>

        <h3 className="text-sm font-semibold text-gray-700">
          No orders yet
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Once customers book parcels on this trip, they will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">

      {orders.map(order => (
        <div
          key={order.id}
          className="flex items-center justify-between p-5 rounded-xl border hover:shadow-md transition"
        >

          {/* LEFT */}
          <div className="space-y-1">

            <p className="font-semibold text-gray-800">
              #{order.id}
            </p>

            <p className="text-sm text-gray-500">
              {order.pickupCity} → {order.deliveryCity}
            </p>

            <p className="text-xs text-gray-400">
              {order.weightKg} kg
            </p>

          </div>

          {/* PRICE */}
          <div className="text-lg font-semibold text-green-600">
            ₹{order.amount}
          </div>

          {/* STATUS */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(order.status)}`}
          >
            {order.status.replaceAll("_", " ")}
          </span>

          {/* ACTIONS */}
          <div className="flex gap-3">

            <select
              className="border rounded-lg text-sm px-3 py-1 bg-gray-50"
              defaultValue={order.status}
            >
              <option value="PAID_PENDING_PICKUP">Pending Pickup</option>
              <option value="PICKED_UP">Picked Up</option>
              <option value="IN_TRANSIT">In Transit</option>
              <option value="DELIVERED">Delivered</option>
            </select>

            <button className="text-sm px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update
            </button>

            <button className="text-sm px-4 py-1 border rounded-lg hover:bg-gray-50">
              View
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};