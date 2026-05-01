import { useParams } from "react-router-dom";
import { useTravelRequest } from "../../../../Services/User/Traveler/TravelRequest";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import type { TravelerActionStatus, TripDetailsUI } from "../../../../shared/constants_Types/types/User/Traveler/TravelerType";
import { KpiSection } from "./Components/KpiSection";
import { OrdersSection } from "./Components/OrdersSection";
import { TripCard } from "./Components/TripCard";
import { CapacityCard } from "./Components/CapacityCard";
import { EarningsCard } from "./Components/EarningsCard";
import Breadcrumbs from "../../../../components/globelcomponents/Breadcrumbs";
import TravelerTripDetailsLoading from "./Components/TravelerTripDetailsLoading";

export const TravelerTripDetails = () => {
  const { id } = useParams();
  const { getTripById, updateOrderStatus } = useTravelRequest();

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

  const handleStatusUpdate = async (orderId: string, status: TravelerActionStatus) => {
    try {
      await updateOrderStatus(orderId, status);

      // 🔥 Optimistic UI update
      setTrip(prev => {
        if (!prev) return prev;

        return {
          ...prev,
          orders: prev.orders.map(o =>
            o.id === orderId ? { ...o, status } : o
          )
        };
      });

    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading)
    return (
      <>
        <TravelerTripDetailsLoading />
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

  const isExpired =
    new Date(trip.departureAt) < new Date() &&
    trip.orders.length === 0;

  return (
    <>
      <Header isLoggedIn />

      <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10">

        <div className="max-w-7xl mx-auto space-y-6">

          {/* HEADER */}
          <div className="mb-4">

            <Breadcrumbs
              items={[
                { label: "Trips", to: "/traveler" },
                { label: `Trip #${trip.id.slice(0, 6)}` },
              ]}
            />


            {/* LEFT */}
            <div>
              <h1 className="text-xl font-semibold">
                Trip Parcel Management
              </h1>

              <p className="text-sm text-gray-500">
                {new Date(trip.departureAt).toLocaleDateString()} •{" "}
                {trip.modeOfTransport}
              </p>
            </div>

          </div>


          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT PANEL */}
            <div className="space-y-6">

              <TripCard trip={trip} />

              <CapacityCard trip={trip} />

              <EarningsCard trip={trip} />

            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-2 space-y-6">

              <KpiSection stats={trip.stats} />

              <OrdersSection orders={trip.orders} isExpired={isExpired} onStatusUpdate={handleStatusUpdate} />

            </div>

          </div>

        </div>

      </div>
    </>
  );
};






