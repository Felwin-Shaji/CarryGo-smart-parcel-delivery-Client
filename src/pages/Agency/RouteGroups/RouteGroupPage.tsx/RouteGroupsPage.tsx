import { useCallback, useEffect, useState } from "react";
import { Plus, Route, FolderOpen } from "lucide-react";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import CreateRouteGroupModal from "./Components/CreateRouteGroupModal";
import RouteGroupCard from "./Components/RouteGroupCard";
import type { RouteGroupDTO } from "../../../../shared/constants_Types/types/Agency/AgencyRouteGroup.dto";
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
                <div className="px-4 sm:px-6 py-4">
                    {/* Header */}
                    <div className="mb-1">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            {/* Left Section */}
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div
                                    className="
                                        flex h-14 w-14 items-center justify-center
                                        rounded-2xl
                                        bg-gradient-to-br from-blue-600 to-indigo-700
                                        text-white
                                        shadow-lg shadow-blue-500/20
                                    "
                                >
                                    <Route size={28} />
                                </div>

                                {/* Title & Description */}
                                <div>
                                    {/* Title + Count Badge */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                                            Route Groups
                                        </h1>

                                        <span
                                            className="
                                                inline-flex items-center
                                                rounded-full
                                                bg-slate-100
                                                px-3 py-1
                                                text-xs font-semibold
                                                text-slate-600
                                                ring-1 ring-slate-200
                                            "
                                        >
                                            {total} route group{total !== 1 ? "s" : ""}
                                        </span>
                                    </div>

                                    {/* Subtitle */}
                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Organize and manage your delivery routes efficiently.
                                    </p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => setOpenModal(true)}
                                className="
                                    inline-flex items-center justify-center gap-2
                                    rounded-2xl
                                    bg-gradient-to-r
                                    from-[var(--color-primary)] to-blue-600
                                    px-5 py-3
                                    text-sm font-semibold text-white
                                    shadow-lg shadow-blue-500/20
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:shadow-xl hover:shadow-blue-500/25
                                    active:translate-y-0
                                "
                            >
                                <Plus size={18} />
                                New Route Group
                            </button>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {Array.from({ length: LIMIT }).map((_, i) => (
                                <div
                                    key={i}
                                    className="
                                        rounded-3xl
                                        border border-slate-200
                                        bg-white
                                        p-6
                                        shadow-sm
                                    "
                                >
                                    <div className="animate-pulse space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="h-6 w-40 rounded bg-slate-200" />
                                            <div className="h-8 w-20 rounded-full bg-slate-200" />
                                        </div>
                                        <div className="h-4 w-full rounded bg-slate-200" />
                                        <div className="h-4 w-3/4 rounded bg-slate-200" />
                                        <div className="pt-4">
                                            <div className="h-4 w-24 rounded bg-slate-200" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && routeGroups.length === 0 && (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 shadow-sm">
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                                <FolderOpen size={38} />
                            </div>

                            <h3 className="text-xl font-semibold text-slate-900">
                                No Route Groups Yet
                            </h3>

                            <p className="mt-2 max-w-md text-center text-sm leading-6 text-slate-500">
                                Create your first route group to organize hubs and
                                streamline parcel movement across your logistics network.
                            </p>

                            <button
                                onClick={() => setOpenModal(true)}
                                className="
                                    mt-6 inline-flex items-center gap-2
                                    rounded-xl
                                    bg-[var(--color-primary)]
                                    px-5 py-3
                                    text-sm font-medium text-white
                                    shadow-md
                                    transition hover:opacity-90
                                "
                            >
                                <Plus size={18} />
                                Create Route Group
                            </button>
                        </div>
                    )}

                    {/* Route Groups Grid */}
                    {!loading && routeGroups.length > 0 && (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {routeGroups.map((group) => (
                                    <RouteGroupCard
                                        key={group.id}
                                        group={group}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8">
                                    <UserPagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {/* Modal */}
                    {openModal && (
                        <CreateRouteGroupModal
                            onClose={() => setOpenModal(false)}
                            onCreated={handleCreated}
                        />
                    )}
                </div>
            </DashboardLayout>
        </DashboardProvider>
    );
}