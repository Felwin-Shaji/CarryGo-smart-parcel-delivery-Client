import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROLES } from '../../../../../constants_Types/types/roles';
import { DashboardProvider } from '../../../../../context/DashboardProvider';
import { DashboardLayout } from '../../../../../layouts/DashboardLayout';
import WorkerDetailsBase from '../../../../../components/Workers/WorkerKycDetailsBase';
import type { GetWorkerOverviewResponseDTO } from '../../../../../constants_Types/types/Worker/workerRequest.dto';
import { useAdminHubWorkers } from "../../../../../Services/Admin/AdminHubWorkers";

const AdminHubWorkerDetails = () => {
    const { id } = useParams();
    const { getWorkerById } = useAdminHubWorkers();
    const navigate = useNavigate();

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
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    ← Back
                </button>
                <WorkerDetailsBase
                    worker={worker}
                    showActions={false}
                />
            </DashboardLayout>
        </DashboardProvider>
    );
};

export default AdminHubWorkerDetails;