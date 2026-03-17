import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import CreateRouteGroupModal from "./Components/CreateRouteGroupModal";
import RouteGroupCard from "./Components/RouteGroupCard";
import type { RouteGroupDTO } from "../../../../constants_Types/types/Agency/AgencyRouteGroup.dto";
import { useAgencyRouteGroup } from "../../../../Services/Agency/AgencyRouteGroup";
import { UserPagination } from "../../../User/components/UserPagination";

export default function RouteGroupsPage() {
    const { getPaginatedRouteGroups } = useAgencyRouteGroup();

    const [routeGroups, setRouteGroups] = useState<RouteGroupDTO[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const LIMIT = 9;

    const fetchRouteGroups = useCallback(async (currentPage: number) => {
        setLoading(true);
        try {
            const result = await getPaginatedRouteGroups({
                page: currentPage,
                limit: LIMIT,
            });

            setRouteGroups(result.data);
            setTotal(result.total);
            setTotalPages(result.totalPages);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRouteGroups(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleCreated = () => {
        setOpenModal(false);
        fetchRouteGroups(page);
    };

    return (
        <DashboardProvider role="agency">
            <DashboardLayout pageTitle="Route Groups">
                <div className="px-3">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-500">
                            {total} route group{total !== 1 ? "s" : ""}
                        </p>
                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition"
                        >
                            <Plus size={18} />
                            New Route Group
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-gray-200 mb-6" />

                    {/* Loading */}
                    {loading && (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: LIMIT }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border p-5 h-36 animate-pulse"
                                />
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && routeGroups.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                            <p className="text-lg font-medium">No route groups yet</p>
                            <p className="text-sm mt-1">Create your first route group to get started</p>
                        </div>
                    )}

                    {/* Grid */}
                    {!loading && routeGroups.length > 0 && (
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {routeGroups.map((group) => (
                                <RouteGroupCard
                                    key={group.id}
                                    group={group}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    <UserPagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />

                </div>

                {/* Modal */}
                {openModal && (
                    <CreateRouteGroupModal
                        onClose={() => setOpenModal(false)}
                        onCreated={handleCreated}
                    />
                )}
            </DashboardLayout>
        </DashboardProvider>
    );
}