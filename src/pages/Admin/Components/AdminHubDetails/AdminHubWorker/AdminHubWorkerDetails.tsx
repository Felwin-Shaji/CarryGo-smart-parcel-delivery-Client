import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROLES } from '../../../../../shared/constants_Types/types/roles';
import { DashboardProvider } from '../../../../../context/DashboardProvider';
import { DashboardLayout } from '../../../../../layouts/DashboardLayout';
import WorkerDetailsBase from "../../../../../shared/components/Workers/WorkerKycDetailsBase";
import type { GetWorkerOverviewResponseDTO } from '../../../../../shared/constants_Types/types/Worker/workerRequest.dto';
import { useAdminHubWorkers } from "../../../../../Services/Admin/AdminHubWorkers";
import { SecondaryHeader } from "../../../../../layouts/SecondaryHeader";
import WorkerDashboardView from "../../../../Worker/WorkerDashboard/WorkerDashboardView";
import Breadcrumbs from "../../../../../shared/components/globelcomponents/Breadcrumbs";
import { WorkerDetailsSkeleton } from "./WorkerDetailsSkeleton";

const AdminHubWorkerDetails = () => {
    const { agencyId, id } = useParams();
    const { getWorkerById } = useAdminHubWorkers();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"details" | "dashboard">("details");

    const [worker, setWorker] = useState<GetWorkerOverviewResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchWorker = async () => {
            try {
                if (!id) return;
                const res = await getWorkerById(id);
                setWorker(res);
            } finally {
                setLoading(false);
            }
        };

        fetchWorker();
    }, [id]);

    if (loading) {
        return (
            <DashboardProvider role={ROLES.ADMIN}>
                <DashboardLayout pageTitle="Worker Details">
                    <WorkerDetailsSkeleton />
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    if (!worker) {
        return (
            <DashboardProvider role={ROLES.ADMIN}>
                <DashboardLayout pageTitle="Worker Details">
                    <div className="flex flex-col items-center justify-center py-20 text-center">

                        <div className="text-4xl mb-3">⚠️</div>

                        <h2 className="text-lg font-semibold text-gray-800">
                            Worker not found
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            The worker you are looking for doesn’t exist or may have been removed.
                        </p>

                        <button
                            onClick={() => navigate(-1)}
                            className="mt-5 px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            Go Back
                        </button>
                    </div>
                </DashboardLayout>
            </DashboardProvider>
        );
    }

    const breadcrumbs = worker
        ? [
            { label: "Agency List", to: "/admin/agency" },
            { label: "Agency Details", to: "/admin/agency" },
            {
                label: "Hub Details",
                to: `/admin/agency/${agencyId}/hubs/${worker.hubId}`,
            },
            { label: worker.name },
        ]
        : [];



    return (
        <DashboardProvider role={ROLES.ADMIN}>
            <DashboardLayout pageTitle="Worker Details">

                {/* TAB HEADER */}
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

                <Breadcrumbs items={breadcrumbs} />


                {activeTab === "details" && worker && (
                    <WorkerDetailsBase
                        worker={worker}
                        showActions={false}
                    />
                )}

                {activeTab === "dashboard" && worker && (
                    <WorkerDashboardView
                        role={ROLES.ADMIN}
                        workerId={worker.id}
                    />
                )}
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AdminHubWorkerDetails;