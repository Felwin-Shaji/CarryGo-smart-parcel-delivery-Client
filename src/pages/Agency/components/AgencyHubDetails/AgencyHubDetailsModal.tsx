import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLeftLong } from "react-icons/fa6";
import LoadingScreen from "../../../../components/loading/CarryGoLoadingScreen";
import { useAgency } from "../../../../Services/Agency/Agency";

import type { HubResponseDTO } from "../../../../Services/Agency/Agency";
import AgencyHubProfileCard from "./AgencyHubProfileCard";
import AgencyHubDashboard from "./AgencyHubDashboard";

export default function AgencyHubDetailsModal({
    open,
    hubId,
    onClose,
}: {
    open: boolean;
    hubId: string;
    onClose: () => void;
}) {
    const { getHubDetailsById } = useAgency();

    const [loading, setLoading] = useState(false);
    const [hub, setHub] = useState<HubResponseDTO | null>(null);

    const fetchHubDetails = async () => {
        try {
            setLoading(true);
            const response = await getHubDetailsById(hubId);
            if (!response) return;
            setHub(response);
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
            <div className="sticky top-0 z-10">
                <button
                    onClick={onClose}
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-white/70 
          backdrop-blur-md shadow-md text-gray-700 hover:bg-white hover:text-black transition"
                >
                    <FaLeftLong className="text-lg" />
                </button>
            </div>

            {/* BODY */}
            <div className="mt-6 space-y-8">

                {/* TOP SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* LEFT — HUB PROFILE */}
                    <div className="lg:col-span-4 rounded-2xl bg-white p-5 shadow-sm">
                        <AgencyHubProfileCard hub={hub} />
                    </div>

                    {/* RIGHT — HUB DASHBOARD */}
                    <div className="lg:col-span-8 rounded-3xl border bg-white p-6 shadow-sm">
                        <AgencyHubDashboard hubId={hub._id} />
                    </div>

                </div>

            </div>
        </>
    );
}
