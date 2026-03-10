import { Plus } from "lucide-react";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTravelRequest } from "../../../../Services/User/Traveler/TravelRequest";
import { TravelRequestCard } from "./TravelRequestCard";
import { UserPagination } from "../../components/UserPagination";
import { TravelRequestFilter } from "./TravelRequest/TravelRequestFilter";

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

export interface TravelRequestListParams {
  page?: number;
  limit?: number;
  status?: TravelRequestStatus;
}


export interface PaginatedTravelRequestResponse {
  data: TravelRequestUI[];
  totalPages: number;
  totalItems: number;
}

const TravelerTravelRequestList = () => {
  const { getTravelRequestList } = useTravelRequest()
  const navigate = useNavigate();

  const [travelRequests, setTravelRequests] = useState<TravelRequestUI[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState<TravelRequestStatus | "ALL">("ALL");

  const limit = 5;

  useEffect(() => {
    const fetchTravelRequests = async () => {
      try {
        setLoading(true);

        const response = await getTravelRequestList({
          page: currentPage,
          limit,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });

        console.log(response)

        setTravelRequests(response.data);
        setTotalPages(response.totalPages);

      } catch (error) {
        console.error("Failed to fetch travel requests", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelRequests();
  }, [currentPage, statusFilter]);

  return (
    <>
      <Header isLoggedIn={true} />



      <div className="px-6">
        <div className="max-w-5xl mx-auto">

          {/* Filter */}
          <TravelRequestFilter
            status={statusFilter}
            setStatus={(status) => {
              setCurrentPage(1); // reset pagination
              setStatusFilter(status);
            }}
          />

          {/* Top Section */}
          <div className="flex items-center justify-between mb-8">

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Travel Plans
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage your trips and earn by delivering parcels.
              </p>
            </div>

            <button
              onClick={() => navigate("/traveler/request")}
              className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <Plus size={18} />
              Publish Trip
            </button>

          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-500 py-10">
              Loading travel requests...
            </div>
          )}

          {/* Empty State */}
          {!loading && travelRequests?.length === 0 && (
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
            {travelRequests?.map((trip) => (
              <TravelRequestCard key={trip.id} trip={trip} />
            ))}
          </div>
          <UserPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
};

export default TravelerTravelRequestList;