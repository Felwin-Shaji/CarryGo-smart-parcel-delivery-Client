import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";
import { ROLES } from "../../constants_Types/types/roles";
import LoadingScreen from "../../components/loading/CarryGoLoadingScreen";
import { useHubAddWorker } from "../../Services/Hub/HubAddWorkers";
import WorkerDetailsBase from "../../components/Workers/WorkerKycDetailsBase";
import type { GetWorkerOverviewResponseDTO } from "../../constants_Types/types/Worker/workerRequest.dto";

export default function HubWorkerDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    ← Back
                </button>

                {loading && <LoadingScreen />}

                {!loading && worker && (
                    <WorkerDetailsBase
                        worker={worker}
                        showActions={false}
                        canResubmit={worker.kycStatus === "REJECTED"}
                    />
                )}

            </DashboardLayout>
        </DashboardProvider>
    );
}