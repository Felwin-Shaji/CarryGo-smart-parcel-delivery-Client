import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { ROLES } from "../../shared/constants_Types/types/roles";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useHubAddWorker } from "../../Services/Hub/HubAddWorkers";
import WorkerDetailsBase from "../../components/Workers/WorkerKycDetailsBase";
import type { GetWorkerOverviewResponseDTO } from "../../shared/constants_Types/types/Worker/workerRequest.dto";
import WorkerDashboardView from "../Worker/WorkerDashboard/WorkerDashboardView";
import { SecondaryHeader } from "../../layouts/SecondaryHeader";

export default function HubWorkerDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"details" | "dashboard">("details");

    const { getWorkerById } = useHubAddWorker();

    const [worker, setWorker] = useState<GetWorkerOverviewResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchWorker = async () => {
        try {
            setLoading(true);
            if (!id) return;

            const res = await getWorkerById(id);
            setWorker(res);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorker();
    }, [id]);

    return (
        <DashboardProvider role={ROLES.HUB}>
            <DashboardLayout pageTitle="Worker Details">

                {loading && <LoadingScreen />}

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

                {/* TAB CONTENT */}
                <div className="mt-4">
                    {activeTab === "details" && worker && (
                        <WorkerDetailsBase
                            worker={worker}
                            showActions={false}
                            canResubmit={worker.kycStatus === "REJECTED"}
                        />
                    )}

                    {activeTab === "dashboard" && worker && (
                        <WorkerDashboardView
                            role={ROLES.HUB}
                            workerId={worker.id}
                        />
                    )}
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
}