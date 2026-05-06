import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { confirmToast } from "../../../../components/globelcomponents/confirmToast";
import RejectReasonModal from "../../../../components/globelcomponents/RejectReasonModal";
import LoadingScreen from "../../../../components/loading/CarryGoLoadingScreen";
import { KYCSTATUS, ROLES, type KYCStatus } from "../../../../shared/constants_Types/types/roles";
import type { GetHubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import AdminHubProfileCard from "./AdminHubProfileCard";
import { useAdminHub } from "../../../../Services/Admin/AdminHub";
import AgencyHubDashboard from "../../../Agency/components/AgencyHubDetails/AgencyHubDashboard";
import { SecondaryHeader } from "../../../../layouts/SecondaryHeader";
import Breadcrumbs from "../../../../shared/components/globelcomponents/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { HubWorkersTable } from "../../../Agency/components/AgencyHubDetails/HubWorkersTable";
import { useAgency } from "../../../../Services/Agency/Agency";


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
    const { getHubWrokersList } = useAgency();

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"details" | "workers" | "dashboard">("details");


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

    const { hub } = hubData;

    const breadcrumbs = [
        { label: "Agency", to: "/admin/agency" },
        { label: "Hubs", to: `/admin/agency/${hub.agencyId}` },
        { label: hub.name },
    ];



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

            {/* MODALS */}
            {showRejectReasonModal && (
                <RejectReasonModal
                    open
                    loading={actionLoading}
                    onClose={() => setShowRejectReasonModal(false)}
                    onSubmit={(reason) => updateKYC(KYCSTATUS.REJECTED, reason)}
                />
            )}

            {/* HEADER */}
            <SecondaryHeader
                title="Hub Dashboard"
                showBack
                onBack={() => navigate(-1)}
                tabs={[
                    { key: "details", label: "Details" },
                    { key: "dashboard", label: "Dashboard" },
                    { key: "workers", label: "Workers" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* BREADCRUMB */}
            <Breadcrumbs items={breadcrumbs} />

            {/* BODY */}
            <div className="p-4">


                {/* HUB PROFILE */}
                {activeTab === "details" &&
                    <div className="">
                        <AdminHubProfileCard
                            role={ROLES.ADMIN}
                            hub={hub}
                            loading={actionLoading}
                            onApprove={() => updateKYC("APPROVED")}
                            onReject={() => setShowRejectReasonModal(true)}
                        />
                    </div>
                }


                {/* WORKERS */}
                {activeTab === "workers" &&

                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-3xl border shadow-sm">
                            <HubWorkersTable
                                fetchFn={(params) =>
                                    getHubWrokersList(hubId, params)
                                }
                                onRowClick={(id) => {
                                    return (navigate(`/admin/agency/${hub.agencyId}/hubs/worker/${id}`))
                                }}
                            />
                        </div>
                    </div>
                }

                {/* DASHBOARD */}
                {activeTab === "dashboard" &&
                    <AgencyHubDashboard hubId={hub.id} />
                }

            </div>


        </>
    );
}
