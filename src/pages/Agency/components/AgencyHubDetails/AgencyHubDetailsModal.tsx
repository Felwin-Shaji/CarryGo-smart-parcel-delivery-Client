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

    function handleResubmit() {
        if (hub?.kycStatus !== "REJECTED") {
            return;
        }
        navigate(`/agency/hub/${hubId}/resubmit`);
    }

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
                        <AgencyHubProfileCard
                            hub={hub}
                            actions={
                                hub.kycStatus === "REJECTED" && (
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-lg border border-red-100 bg-red-50/50">
                                        <div className="flex items-center gap-2">
                                            {/* Warning Icon */}
                                            <svg className="h-5 w-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="width">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <span className="text-xs font-medium text-red-700">
                                                Verification Rejected
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleResubmit}
                                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md shadow-sm bg-red-600 text-white hover:bg-red-700 active:bg-red-800 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Fix & Resubmit
                                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            }
                        />
                    </div>
                )}

                {/* WORKERS TAB */}
                {activeTab === "workers list" && (
                    <div className="p-4">
                        {activeTab === "workers list" && (
                            <HubWorkersTable
                                fetchFn={(params) =>
                                    getHubWrokersList(hubId, "agency", params)
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
