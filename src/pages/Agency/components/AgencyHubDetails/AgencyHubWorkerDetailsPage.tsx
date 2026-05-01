import { useNavigate, useParams } from "react-router-dom";
import WorkerDetailsBase from "../../../../components/Workers/WorkerKycDetailsBase";
import { useEffect, useState } from "react";
import type { GetWorkerOverviewResponseDTO, KYCStatus } from "../../../../constants_Types/types/Worker/workerRequest.dto";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { ROLES } from "../../../../constants_Types/types/roles";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import { useAgencyHubWorker } from "../../../../Services/Agency/AgencyHubWorker";
import toast from "react-hot-toast";
import { confirmToast } from "../../../../components/globelcomponents/confirmToast";
import RejectReasonModal from "../../../../components/globelcomponents/RejectReasonModal";
import { SecondaryHeader } from "../../../../layouts/SecondaryHeader";
import WorkerDashboardView from "../../../Worker/WorkerDashboard/WorkerDashboardView";

export default function AgencyHubWorkerDetailsPage() {
    const { getAgencyHubWorker, updateWorkerKycStatus } = useAgencyHubWorker()
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const { id } = useParams();
    const [worker, setWorker] = useState<GetWorkerOverviewResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"details" | "dashboard">("details");

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                if (!id) return
                const res = await getAgencyHubWorker(id)

                setWorker(res);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchWorker();
    }, [id]);

    const updateKYC = async (status: KYCStatus) => {
        if (!id || !worker) return;

        let message = "Are you sure?";

        if (status === "APPROVED") {
            message = `Are you sure you want to approve ${worker.name}'s KYC?`;
        }


        confirmToast(message, async () => {
            try {
                setActionLoading(true);

                const result = await updateWorkerKycStatus(id, status);

                setWorker((prev) =>
                    prev ? { ...prev, kycStatus: status } : prev
                );

                toast.success(result.message || "KYC updated successfully");

            } finally {
                setActionLoading(false);
            }
        });
    };

    const handleSubmitRejection = async (reason: string) => {
        if (!id) return;

        try {
            setActionLoading(true);

            const result = await updateWorkerKycStatus(id, "REJECTED", reason);

            setWorker((prev) =>
                prev ? { ...prev, kycStatus: "REJECTED" } : prev
            );

            toast.success(result.message || "KYC rejected");

        } finally {
            setActionLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 w-40 bg-gray-200 rounded" />
                    <div className="h-40 bg-gray-200 rounded" />
                </div>
            </div>
        );
    }
    if (!worker) return <div>No worker found</div>;

    return (
        <>
            <DashboardProvider role={ROLES.AGENCY}>
                <DashboardLayout>

                    {showRejectModal && (<RejectReasonModal
                        open={showRejectModal}
                        loading={actionLoading}
                        onClose={() => setShowRejectModal(false)}
                        onSubmit={async (reason) => {
                            await handleSubmitRejection(reason);
                            setShowRejectModal(false);
                        }}
                    />)}

                    <SecondaryHeader
                        title="Worker Dashboard"
                        showBack
                        onBack={() => navigate(-1)}
                        tabs={[
                            { key: "details", label: "Details" },
                            { key: "dashboard", label: "Dashboard" },
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {activeTab === "details" && worker && (
                        <WorkerDetailsBase
                            worker={worker}
                            showActions
                            onApprove={() => updateKYC("APPROVED")}
                            onReject={() => setShowRejectModal(true)}
                            actionLoading={actionLoading}
                        />
                    )}

                    {activeTab === "dashboard" && worker && (
                        <WorkerDashboardView
                            role={ROLES.AGENCY}
                            workerId={worker.id}
                        />
                    )}

                </DashboardLayout>
            </DashboardProvider>
        </>
    )
}



