import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import AddSegmentModal from "./components/AddSegmentModal";
import { useAgencyRouteGroup } from "../../../../Services/Agency/AgencyRouteGroup";
import type { RouteGroupDetailDTO } from "../../../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";
import { SegmentRow } from "./components/SegmentRow copy";
import RouteSummaryHeader from "./components/RouteSummaryHeader";


export default function RouteGroupDetailPage() {

    const { getRouteGroupDetail } = useAgencyRouteGroup();

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [detail, setDetail] = useState<RouteGroupDetailDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [groupActive, setGroupActive] = useState(true);

    const fetchDetail = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getRouteGroupDetail(id!);
            setDetail(res);
            setGroupActive(res.isActive);
        } finally {
            setLoading(false);
        }
    }, [id]);


    useEffect(() => {
        fetchDetail();
    }, []);


    const sorted = detail
        ? [...detail.segments].sort((a, b) => a.segmentOrder - b.segmentOrder)
        : [];

    const startHub = sorted[0]?.originHubName ?? "—";

    return (
        <DashboardProvider role="agency">
            <DashboardLayout pageTitle={detail?.name ?? "Route Group"}>
                <div className="w-full px-6 pb-6">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/agency/route-groups")}
                        className="group mb-6 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-[#1E3A8A] cursor-pointer"
                    >
                        <ArrowLeft
                            size={16}
                            className="transition-transform group-hover:-translate-x-0.5"
                        />
                        Back to Route Groups
                    </button>

                    {/* Loading */}
                    {loading && (
                        <div className="space-y-5 animate-pulse">

                            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="h-5 w-40 rounded-lg bg-gray-200" />
                                <div className="mt-4 h-24 rounded-2xl bg-gray-100" />
                            </div>

                            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="h-5 w-36 rounded-lg bg-gray-200" />
                                    <div className="h-10 w-28 rounded-xl bg-gray-200" />
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="h-24 rounded-2xl bg-gray-100"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && detail && (
                        <div className="space-y-5">

                            {/* Summary Header */}
                            <div className="overflow-hidden rounded-[28px] border border-white/30 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                                <RouteSummaryHeader
                                    detail={detail}
                                    segments={sorted}
                                    groupActive={groupActive}
                                    onToggle={() => setGroupActive(v => !v)}
                                />
                            </div>

                            {/* Main Timeline Card */}
                            <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

                                {/* Background Glow */}
                                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/40 blur-3xl" />
                                <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-yellow-100/30 blur-3xl" />

                                {/* Header */}
                                <div className="relative flex flex-col gap-4 border-b border-gray-100 px-7 py-6 sm:flex-row sm:items-center sm:justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#102467] shadow-lg shadow-blue-200">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 2l1.5 3.5 3.5.5-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-lg font-bold text-gray-900">
                                                    Segment Chain
                                                </h2>

                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#1E3A8A]">
                                                    {detail.segments.length} segments
                                                </span>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Manage and monitor route flow connections
                                            </p>
                                        </div>
                                    </div>

                                    {/* Add Button */}
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="group flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1E3A8A] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-[#142d6b] cursor-pointer border-none"
                                    >
                                        <Plus
                                            size={15}
                                            className="transition-transform group-hover:rotate-90"
                                        />
                                        Add Segment
                                    </button>
                                </div>

                                {/* Body */}
                                <div className="relative px-7 py-8">

                                    {/* Start Node */}
                                    <div className="relative flex items-center gap-5">

                                        <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#102467] shadow-xl shadow-blue-200">

                                            <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M8 2l1.5 3.5 3.5.5-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
                                                Starting Hub
                                            </p>

                                            <h3 className="mt-1 text-lg font-bold text-[#102467]">
                                                {startHub}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    {sorted.length > 0 ? (
                                        <div className="relative ml-7 mt-6">

                                            {/* Vertical Line */}
                                            <div className="absolute left-[5px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-200 via-blue-100 to-transparent" />

                                            <div className="mt-6 space-y-4">
                                                {sorted.map((seg, index) => (
                                                    <div
                                                        key={seg.id}
                                                        className="relative flex gap-4"
                                                    >
                                                        {/* Timeline */}
                                                        <div className="relative flex flex-col items-center">
                                                            {/* Dot */}
                                                            <div className="z-10 h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow" />

                                                            {/* Line */}
                                                            {index !== sorted.length - 1 && (
                                                                <div className="w-[2px] flex-1 min-h-[80px] bg-gradient-to-b from-blue-300 to-slate-200" />
                                                            )}
                                                        </div>

                                                        {/* Card */}
                                                        <div className="flex-1">
                                                            <SegmentRow segment={seg} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-16 text-center">

                                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-md">
                                                <Plus
                                                    size={28}
                                                    className="text-[#1E3A8A]"
                                                />
                                            </div>

                                            <h3 className="mt-5 text-lg font-bold text-gray-800">
                                                No segments added yet
                                            </h3>

                                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                                                Start building your logistics route by creating
                                                the first segment connection.
                                            </p>

                                            <button
                                                onClick={() => setOpenModal(true)}
                                                className="mt-6 rounded-2xl bg-[#1E3A8A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#142d6b] cursor-pointer border-none"
                                            >
                                                Add First Segment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Add Segment Modal */}
                {openModal && detail && (
                    <AddSegmentModal
                        routeGroupId={detail.id}
                        routeGroupName={detail.name}
                        nextSegmentOrder={detail.segments.length + 1}
                        segments={sorted}
                        onClose={() => setOpenModal(false)}
                        onCreated={() => {
                            setOpenModal(false);
                            fetchDetail();
                        }}
                    />
                )}

            </DashboardLayout>
        </DashboardProvider>
    );
}