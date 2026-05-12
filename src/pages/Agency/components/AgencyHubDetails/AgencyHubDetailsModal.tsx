import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingScreen from "../../../../shared/components/loading/CarryGoLoadingScreen";
import { useAgency } from "../../../../Services/Agency/Agency";
import AgencyHubProfileCard from "./AgencyHubProfileCard";
import AgencyHubDashboard from "./AgencyHubDashboard";
import type { HubOverviewResponseDTO } from "../../../../shared/constants_Types/types/Agency/HubOverview.type";
import { SecondaryHeader } from "../../../../layouts/SecondaryHeader";
import { useNavigate } from "react-router-dom";
import { HubWorkersTable } from "./HubWorkersTable";
import Breadcrumbs from "../../../../shared/components/globelcomponents/Breadcrumbs";

export default function AgencyHubDetailsModal({ open, hubId }: {
    open: boolean;
    hubId: string;
    onClose: () => void;
}) {
    const { getHubDetailsById, getHubWrokersList } = useAgency();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"details" | "dashboard" | "workers list">("details");


    const [loading, setLoading] = useState(false);
    const [hub, setHub] = useState<HubOverviewResponseDTO | null>(null);

    const fetchHubDetails = async () => {
        try {
            setLoading(true);
            const response = await getHubDetailsById(hubId);
            if (!response) return;

            setHub(response.hub);
        } catch {
            toast.error("Failed to load hub details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!open || !hubId) return;
        fetchHubDetails();
    }, [open, hubId]);

    if (!open) return null;
    if (loading) return <LoadingScreen />;
    if (!hub) return null;

    return (
        <>
            {/* HEADER */}
            <SecondaryHeader
                title="Hub Dashboard"
                showBack
                onBack={() => navigate(-1)}
                tabs={[
                    { key: "details", label: "Details" },
                    { key: "dashboard", label: "Dashboard" },
                    { key: "workers list", label: "Workers List" },
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* BREADCRUMBS */}
            <Breadcrumbs
                items={[
                    { label: "Hubs", to: "/agency/hubs" },
                    { label: hub.name }, // current page (no link)
                ]}
            />


            {/* BODY */}
            <div className="mt-6 space-y-8">

                {/* DETAILS TAB */}
                {activeTab === "details" && (
                    <div>
                        <AgencyHubProfileCard hub={hub} />
                    </div>
                )}

                {/* WORKERS TAB */}
                {activeTab === "workers list" && (
                    <div className="p-4">
                        {activeTab === "workers list" && (
                            <HubWorkersTable
                                fetchFn={(params) =>
                                    getHubWrokersList(hubId, params)
                                }
                                onRowClick={(id) => navigate(`/agency/hub/workers/${id}`)}
                            />
                        )}
                    </div>
                )}

                {/* DASHBOARD TAB */}
                {activeTab === "dashboard" && (
                    <AgencyHubDashboard hubId={hub.id} />
                )}

            </div>
        </>
    );
}
