import { Plus } from "lucide-react";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelRequest } from "../../../../Services/User/Traveler/TravelRequest";
import { TravelRequestCard } from "./TravelRequestCard";

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

  totalOrders: number;
  totalEarnings: number;
}


const TravelerTravelRequestList = () => {
  const { getTravelRequestList } = useTravelRequest()
  const navigate = useNavigate();

  const [travelRequests, setTravelRequests] = useState<TravelRequestUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravelRequests = async () => {
      try {
        const resonseData = await getTravelRequestList();
        const data: TravelRequestUI[] = resonseData;
        setTravelRequests(data);
      } catch (error) {
        console.error("Failed to fetch travel requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelRequests();
  }, []);

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
              <TravelRequestCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelerTravelRequestList;