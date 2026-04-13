import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TrackingView from "./TrackingView";
import type { ParcelTrackingDTO } from "../../../../constants_Types/types/User/Booking/ParcelTracking";
import TrackingEmptyState from "./components/TrackingEmptyState";

interface Props {
  fetchTracking: (id: string) => Promise<ParcelTrackingDTO>;
}

export default function TrackingPage({ fetchTracking }: Props) {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [inputId, setInputId] = useState("");
  const [data, setData] = useState<ParcelTrackingDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (id: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetchTracking(id);
      setData(res);
    } catch (err) {
      setError("Tracking not found or server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!bookingId) return;
    fetchData(bookingId);
  }, [bookingId]);

  const handleSearch = () => {
    const trimmed = inputId.trim();
    if (!trimmed) return;

    if (trimmed === bookingId) {
      fetchData(trimmed);
      return;
    }

    navigate(`/tracking/${trimmed}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* 🔍 Search */}
      <div className="flex gap-2">
        <input
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // ✅ Enter support
          placeholder="Enter Booking ID"
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Track
        </button>
      </div>

      {/* 🟡 Initial */}
      {!bookingId && !loading && !data && !error && (
        <TrackingEmptyState type="initial" />
      )}

      {/* 🔄 Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Fetching tracking details...
        </div>
      )}

      {/* ❌ Error */}
      {error && !loading && (
        <TrackingEmptyState type="not-found" />
      )}

      {/* ✅ Data */}
      {data && !loading && <TrackingView data={data} />}
    </div>
  );
}