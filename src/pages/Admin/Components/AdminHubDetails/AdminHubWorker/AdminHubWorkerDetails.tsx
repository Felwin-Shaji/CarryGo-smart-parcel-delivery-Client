import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROLES } from '../../../../../shared/constants_Types/types/roles';
import { DashboardProvider } from '../../../../../context/DashboardProvider';
import { DashboardLayout } from '../../../../../layouts/DashboardLayout';
import WorkerDetailsBase from '../../../../../components/Workers/WorkerKycDetailsBase';
import type { GetWorkerOverviewResponseDTO } from '../../../../../shared/constants_Types/types/Worker/workerRequest.dto';
import { useAdminHubWorkers } from "../../../../../Services/Admin/AdminHubWorkers";
import { SecondaryHeader } from "../../../../../layouts/SecondaryHeader";
import WorkerDashboardView from "../../../../Worker/WorkerDashboard/WorkerDashboardView";

const AdminHubWorkerDetails = () => {
    const { id } = useParams();
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

    if (loading) return <div>Loading...</div>;
    if (!worker) return <div>No worker found</div>;

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