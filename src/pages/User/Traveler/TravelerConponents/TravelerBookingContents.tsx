import { Calendar, MapPin, Plus, Truck } from "lucide-react";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type TravelRequestStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "PARTIALLY_BOOKED"
  | "FULLY_BOOKED"
  | "COMPLETED"
  | "CANCELLED";

export interface TravelRequestUI {
  id: string;
  startAddress: string;
  endAddress: string;
  departureAt: string;
  arrivalAt?: string;
  capacityKg: number;
  remainingCapacityKg: number;
  status: TravelRequestStatus;
  modeOfTransport: string;
}

const TravelerTravelRequestList = () => {
  const navigate = useNavigate();

  const [travelRequests, setTravelRequests] = useState<TravelRequestUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelRequests = async () => {
      try {
        // Replace with real API call
        const data: TravelRequestUI[] = [];
        setTravelRequests(data);
      } catch (error) {
        console.error("Failed to fetch travel requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "PENDING_APPROVAL":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <Header isLoggedIn={true} />

      <div className="min-h-screen bg-gray-50 pt-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Top Section */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              My Travel Requests
            </h1>

            <button
              onClick={() => navigate("/traveler/request")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition"
            >
              <Plus size={18} />
              Publish New Trip
            </button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-500 py-10">
              Loading travel requests...
            </div>
          )}

          {/* Empty State */}
          {!loading && travelRequests.length === 0 && (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <p className="text-gray-600 text-lg mb-4">
                You haven't published any trips yet.
              </p>

              <button
                onClick={() => navigate("/traveler/request")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl"
              >
                Create Your First Trip
              </button>
            </div>
          )}

          {/* Travel Request Cards */}
          <div className="grid gap-6">
            {travelRequests.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Route */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <MapPin size={16} />
                      {trip.startAddress}
                    </div>

                    <div className="text-sm text-gray-400">to</div>

                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <MapPin size={16} />
                      {trip.endAddress}
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusColor(
                      trip.status
                    )}`}
                  >
                    {trip.status}
                  </span>
                </div>

                {/* Info Row */}
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(trip.departureAt).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <Truck size={16} />
                    {trip.modeOfTransport}
                  </div>

                  <div>
                    {trip.remainingCapacityKg} / {trip.capacityKg} kg left
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelerTravelRequestList;