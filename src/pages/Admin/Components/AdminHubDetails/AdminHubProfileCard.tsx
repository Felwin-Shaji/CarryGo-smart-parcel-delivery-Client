import type { HubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import type { Roles } from "../../../../shared/constants_Types/types/roles";
import AgencyHubProfilePage from "../../../Agency/components/AgencyHubDetails/AgencyHubProfileCard";

export default function AdminHubProfileCard({
    role,
    hub,
    loading,
    onApprove,
    onReject,
    onResubmit,
}: {
    role: Roles;
    hub: HubOverviewResponseDTO;
    loading: boolean;
    onApprove: () => void;
    onReject: () => void;
    onResubmit?: () => void;
}) {

    const canTakeAction =
        hub.kycStatus === "REGISTERED" ||
        hub.kycStatus === "RESUBMITTED" ||
        hub.kycStatus === "PENDING";

    const renderActions = () => {
        if (!canTakeAction) return null;

        //  ADMIN VIEW
        if (role === "admin") {
            return (
                <div className="flex gap-2">
                    <button
                        onClick={onApprove}
                        disabled={loading}
                        className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                    >
                        Approve
                    </button>

                    <button
                        onClick={onReject}
                        disabled={loading}
                        className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        Reject
                    </button>
                </div>
            );
        }

        // AGENCY VIEW
        if (role === "agency" && hub.kycStatus === "REJECTED") {
            return (
                <button
                    onClick={onResubmit}
                    className="px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Resubmit KYC
                </button>
            );
        }

        return null;
    };

    return (
        <div className="space-y-4">
            <AgencyHubProfilePage
                hub={hub}
                actions={renderActions()} // 👈 inject here
            />
        </div>
    );
}