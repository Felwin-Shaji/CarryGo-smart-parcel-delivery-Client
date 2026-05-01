import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirmToast } from "../../../../components/globelcomponents/confirmToast";
import RejectReasonModal from "../../../../components/globelcomponents/RejectReasonModal";
import LoadingScreen from "../../../../components/loading/CarryGoLoadingScreen";
import { KYCSTATUS, type KYCStatus } from "../../../../shared/constants_Types/types/roles";
import type { GetHubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import HubWorkersList, { EmptyWorkersState } from "../../../Agency/components/AgencyHubDetails/HubWorkersList";
import AdminHubProfileCard from "./AdminHubProfileCard";
import Breadcrumbs from "../../../../components/globelcomponents/Breadcrumbs";
import { useAdminHub } from "../../../../Services/Admin/AdminHub";
import AgencyHubDashboard from "../../../Agency/components/AgencyHubDetails/AgencyHubDashboard";


export default function AdminHubDetailsModal({
    open,
    hubId,
    onClose,
    onUpdated,
}: {
    open: boolean;
    hubId: string;
    onClose: () => void;
    onUpdated: () => void;
}) {
    const { getHubDetailsById, updateHubKycStatus } = useAdminHub();


    const [loading, setLoading] = useState(false);
    const [hubData, setHubData] = useState<GetHubOverviewResponseDTO | null>(null);

    const [actionLoading, setActionLoading] = useState(false);
    const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);

    useEffect(() => {
        if (!open) return;

        async function fetchHub() {
            try {
                setLoading(true);
                const res = await getHubDetailsById(hubId);
                if (!res) return
                setHubData(res);
            } catch {
                toast.error("Failed to load hub details");
            } finally {
                setLoading(false);
            }
        }

        fetchHub();
    }, [open, hubId]);


    if (!open) return null;
    if (loading) return <LoadingScreen />;
    if (!hubData) return null;

    const { hub, workers } = hubData;

    const breadcrumbs = [
        { label: "Agency", to: "/admin/agency" },
        { label: "Hubs", to: `/admin/agency/${hub.agencyId}` },
        { label: hub.name },
    ];

    const canTakeAction =
        hub.kycStatus === "REGISTERED" ||
        hub.kycStatus === "RESUBMITTED" ||
        hub.kycStatus === "PENDING";

    const updateKYC = async (status: KYCStatus, reason?: string) => {
        let message = "Are you sure?";

        if (status === KYCSTATUS.APPROVED) {
            message = `Approve ${hub.name}'s verification?`;
        }

        if (status === KYCSTATUS.REJECTED) {
            message = `Reject ${hub.name}'s verification?`;
        }

        confirmToast(message, async () => {
            try {
                setActionLoading(true);

                await updateHubKycStatus(hub.id, status, reason);

                toast.success("Hub verification updated successfully");

                onUpdated();
                onClose();

            } finally {
                setActionLoading(false);
            }
        });
    };


    return (
        <>
            <Breadcrumbs items={breadcrumbs} />

            {showRejectReasonModal && (
                <RejectReasonModal
                    open
                    loading={actionLoading}
                    onClose={() => setShowRejectReasonModal(false)}
                    onSubmit={(reason) => updateKYC(KYCSTATUS.REJECTED, reason)}
                />
            )}

            {/* BODY */}
            <div className="mt-6 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* HUB PROFILE */}
                    <div className="lg:col-span-4 bg-white p-5 rounded-2xl shadow-sm">
                        <AdminHubProfileCard
                            hub={hub}
                            canTakeAction={canTakeAction}
                            loading={actionLoading}
                            onApprove={() => updateKYC("APPROVED")}
                            onReject={() => setShowRejectReasonModal(true)}
                        />
                    </div>

                    {/* WORKERS */}
                    <div className="lg:col-span-8 bg-white p-6 rounded-3xl border shadow-sm">
                        {workers && workers.data.length > 0 ? (
                            <HubWorkersList
                                workers={workers.data}
                                getWorkerRoute={(worker) => `/admin/agency/hub/worker/${worker._id}`}
                            />
                        ) : (
                            <EmptyWorkersState />
                        )}
                    </div>
                </div>
                {/* BOTTOM — DASHBOARD */}
                <AgencyHubDashboard hubId={hub.id} />
            </div>
        </>
    );
}
