import { useEffect, useState } from "react";
import HubCard from "./HubAvailability/HubCard";
import CenteredCard from "./HubAvailability/CenteredCard";

interface Hub {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
}

const HubAvailabilityStep = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    fetchNearbyHubs();
  }, []);

  const fetchNearbyHubs = async () => {
    setLoading(true);

    // 🔁 Replace with backend API
    await new Promise(res => setTimeout(res, 1200));

    const response = {
      available: true,
      hubs: [
        {
          id: "hub1",
          name: "Vytilla Hub",
          distanceKm: 2.8,
          address: "NH Bypass, Kochi",
        },
        {
          id: "hub2",
          name: "Edappally Hub",
          distanceKm: 5.4,
          address: "Edappally Toll, Kochi",
        },
      ],
    };

    setAvailable(response.available);
    setHubs(response.hubs);
    setSelectedHubId(response.hubs[0]?.id ?? null); // auto-select nearest
    setLoading(false);
  };

  if (loading) {
    return (
      <CenteredCard>
        <p className="text-sm text-center">
          Finding nearby hubs…
        </p>
      </CenteredCard>
    );
  }

  if (!available) {
    return (
      <CenteredCard>
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Service Not Available
        </h2>
        <p className="text-sm text-gray-500 mt-2 text-center">
          We currently don’t serve this location.
        </p>
      </CenteredCard>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg px-6 py-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Nearest Hub
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            We’ll route your parcel through this hub
          </p>
        </div>

        {/* Hub List */}
        <div className="mt-8 space-y-3">
          {hubs.map(hub => (
            <HubCard
              key={hub.id}
              hub={hub}
              selected={selectedHubId === hub.id}
              onClick={() => setSelectedHubId(hub.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          disabled={!selectedHubId}
          onClick={onSuccess}
          className={`mt-10 w-full py-3 rounded-xl text-sm font-semibold transition
            ${
              selectedHubId
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default HubAvailabilityStep;
