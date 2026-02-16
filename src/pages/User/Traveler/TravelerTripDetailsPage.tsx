import { useNavigate, useParams } from "react-router-dom";
import { useTravelRequest } from "../../../Services/User/Traveler/TravelRequest";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import type { TripDetailsUI, TripOrderUI } from "../../../constants_Types/types/User/Traveler/TravelerType";
import { ArrowLeft } from "lucide-react";

export const TravelerTripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTripById } = useTravelRequest();

  const [trip, setTrip] = useState<TripDetailsUI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        if (!id) return;
        const data = await getTripById(id);
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
        <div className="min-h-screen bg-gray-50 pt-24 px-6 flex items-center justify-center">
          <p className="text-gray-500">Loading trip details...</p>
        </div>
      </>
    );

  if (!trip)
    return (
      <>
        <Header isLoggedIn />
        <div className="min-h-screen bg-gray-50 pt-24 px-6 flex items-center justify-center">
          <p className="text-gray-500">Trip not found</p>
        </div>
      </>
    );

  return (
    <>
      <Header isLoggedIn />

      <div className="min-h-screen bg-gray-50 pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* HERO SECTION */}
          <div className="bg-white rounded-3xl shadow-sm border p-8 flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold tracking-tight">
                {trip.startCity} → {trip.endCity}
              </h1>

              <p className="text-gray-500 mt-2">
                Departure: {new Date(trip.departureAt).toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-end gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center 
                                w-12 h-12 rounded-full bg-white shadow-lg border text-gray-700 hover:bg-gray-100
                                transition-all">
                <ArrowLeft size={20} />
              </button>
              <StatusBadge status={trip.status} />

              <div className="flex gap-3">
                {/* const hasBookings = trip.orders.length > 0; */}

                <div className="flex gap-3">

                  {/* Edit allowed only if DRAFT and no bookings */}
                  {/* {trip.status === "DRAFT" && trip.orders.length === 0 && (
                    <button
                      onClick={() => navigate(`/traveler/trip/${trip.id}/edit`)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    >
                      Edit Trip
                    </button>
                  )} */}

                  {/* Cancel allowed only if ACTIVE / PARTIALLY_BOOKED and no delivered bookings */}
                  {/* {(trip.status === "ACTIVE" || trip.status === "PARTIALLY_BOOKED" || trip.status === "DRAFT") && (
                      <button
                        className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                      >
                        Cancel Trip
                      </button>
                    )} */}

                </div>

              </div>
            </div>
          </div>


          {/* KPI CARDS */}
          <div className="grid grid-cols-4 gap-6">

            <KpiCard
              title="Capacity Used"
              value={`${trip.capacityKg - trip.remainingCapacityKg} / ${trip.capacityKg} kg`}
            />

            <KpiCard
              title="Total Orders"
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


          {/* TRIP DETAILS SECTION */}
          <div className="bg-white rounded-3xl shadow-sm border p-8 space-y-6">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Trip Information
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">

              <DetailItem label="Mode">
                {trip.modeOfTransport}
              </DetailItem>

              <DetailItem label="Allowed Sizes">
                {trip.allowedPackageSizes.join(", ")}
              </DetailItem>

              <DetailItem label="Created At">
                {new Date(trip.createdAt).toLocaleDateString()}
              </DetailItem>

            </div>

            {trip.description && (
              <div>
                <p className="text-gray-500 text-sm mb-1">Description</p>
                <p className="text-sm">{trip.description}</p>
              </div>
            )}

          </div>

          {/* ORDERS SECTION */}
          <OrdersTable orders={trip.orders} />



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

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
};

const KpiCard = ({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-2xl p-6 shadow-sm border ${highlight ? "bg-green-50 border-green-200" : "bg-white"
      }`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
  </div>
);

const DetailItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <p className="text-gray-500 mb-1">{label}</p>
    <p className="font-medium">{children}</p>
  </div>
);

const OrdersTable = ({ orders }: { orders: TripOrderUI[] }) => {

  if (!orders.length) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border p-8 text-center text-gray-500">
        No orders yet for this trip.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border p-8">
      <h2 className="text-xl font-semibold mb-6">
        Orders ({orders.length})
      </h2>

      <div className="divide-y">

        {orders.map(order => (
          <div
            key={order.id}
            className="py-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">#{order.id}</p>
              <p className="text-sm text-gray-500">
                {order.pickupCity} → {order.deliveryCity}
              </p>
            </div>

            <div className="text-sm">
              {order.weightKg} kg
            </div>

            <div className="font-semibold text-green-600">
              ₹{order.amount}
            </div>

            <div className="text-xs text-gray-500">
              {order.status}
            </div>

            <button className="text-blue-600 text-sm hover:underline">
              View
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

