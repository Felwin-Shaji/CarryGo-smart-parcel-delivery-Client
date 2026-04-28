import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackingView from "./components/TrackingView";
import type { AgencyParcelTrackingDTO, TravelerParcelTrackingDTO } from "../../../../constants_Types/types/User/Booking/ParcelTracking";
import TrackingEmptyState from "./components/TrackingEmptyState";
import TravelerTrackingView from "./components/TravelerTrackingView";

interface Props {
  fetchAgencyTracking: (id: string) => Promise<AgencyParcelTrackingDTO>;
  fetchTravelerTracking: (id: string) => Promise<TravelerParcelTrackingDTO>;

}

type TrackingType = "TRAVELER" | "AGENCY" | "UNKNOWN";

type TrackingResponse =
  | AgencyParcelTrackingDTO
  | TravelerParcelTrackingDTO;


export default function TrackingPage({ fetchAgencyTracking, fetchTravelerTracking }: Props) {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [data, setData] = useState<TrackingResponse | null>(null);
  const [trackingType, setTrackingType] = useState<TrackingType | null>(null);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const getTrackingType = (bookingId: string) => {
    if (bookingId.startsWith("CG-TR-")) return "TRAVELER";
    if (bookingId.startsWith("CG-AG-")) return "AGENCY";
    return "UNKNOWN";
  };

  const fetchData = async (id: string) => {
    setLoading(true);
    setFetchError(null);
    setData(null);

    try {
      const type = getTrackingType(id);
      setTrackingType(type);

      let res: TrackingResponse;

      if (type === "TRAVELER") {
        res = await fetchTravelerTracking(id);
      } else {
        res = await fetchAgencyTracking(id);
      }

      setData(res);
    } catch (err) {
      setFetchError("Tracking not found or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookingId) return;
    fetchData(bookingId);
  }, [bookingId]);

  const isValidBookingId = (id: string) => {
    const regex = /^CG-(AG|TR)-\d{4}-\d{6}$/;
    return regex.test(id);
  };

  const handleSearch = () => {
    const trimmed = inputId.trim();

    if (!trimmed) {
      setInputError("Please enter a Booking ID");
      return;
    }

    if (!isValidBookingId(trimmed)) {
      setInputError("Invalid format. Use CG-AG-XXXX-XXXXXX or CG-TR-XXXX-XXXXXX");
      return;
    }

    setInputError(null);

    if (trimmed === bookingId) {
      fetchData(trimmed);
      return;
    }

    navigate(`/tracking/${trimmed}`);
  };

  return (

    <div className="max-w-4xl mx-auto py-4 space-y-4">

      {/* Search Card */}
      <div className="bg-white shadow-md rounded-xl p-5 space-y-4 border">

        <div className="flex justify-between items-center">

          <h2 className="text-lg font-semibold text-gray-800">
            Track Your Booking
          </h2>
          <div>
            <button
              onClick={() => navigate(-1)}
              className="text-sm  flex items-center gap-1"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Input + Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-end">

          {/* Input */}
          <div className="flex-1">
            <input
              value={inputId}
              onChange={(e) => setInputId(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="CG-AG-2604-999999"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none ${inputError
                  ? "border-red-500 focus:ring-2 focus:ring-red-400"
                  : "focus:ring-2 focus:ring-blue-500"
                }`}
            />

            {inputError && (
              <p className="text-red-500 text-xs mt-1">{inputError}</p>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition h-[40px]"
          >
            Track
          </button>

        </div>
      </div>

      {/* 🟡 Initial */}
      {!bookingId && !loading && !data && !fetchError && (
        <TrackingEmptyState type="initial" />
      )}

      {/* 🔄 Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Fetching tracking details...
        </div>
      )}

      {/* ❌ Error */}
      {fetchError && !loading && (
        <TrackingEmptyState type="not-found" />
      )}
      {/* ✅ Data */}
      {data && !loading && trackingType === "AGENCY" && <TrackingView data={data as AgencyParcelTrackingDTO} />}

      {data && !loading && trackingType === "TRAVELER" && (
        <TravelerTrackingView data={data as TravelerParcelTrackingDTO} />
      )}
    </div>
  );
}