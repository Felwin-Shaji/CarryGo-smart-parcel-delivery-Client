import type { HubResponseDTO } from "../../../../Services/Agency/Agency";

export default function AgencyHubProfileCard({
  hub,
}: {
  hub: HubResponseDTO;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{hub.name}</h2>

      <div className="text-sm text-gray-600 space-y-1">
        <p>Email: {hub.email}</p>
        <p>Mobile: {hub.mobile}</p>
        <p>Status: {hub.isBlocked ? "Blocked" : "Active"}</p>
      </div>
    </div>
  );
}
