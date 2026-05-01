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
                <div className="px-3 max-w-5xl mx-auto">

                    {/* Back */}
                    <button
                        onClick={() => navigate("/agency/route-groups")}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E3A8A] mb-5 transition bg-transparent border-none p-0 cursor-pointer"
                    >
                        <ArrowLeft size={15} />
                        Back to Route Groups
                    </button>

                    {/* Loading skeleton */}
                    {loading && (
                        <div className="space-y-4">
                            <div className="h-36 bg-white rounded-2xl border border-gray-200 animate-pulse" />
                            <div className="h-96 bg-white rounded-2xl border border-gray-200 animate-pulse" />
                        </div>
                    )}

                    {!loading && detail && (
                        <div className="space-y-4">

                            <RouteSummaryHeader
                                detail={detail}
                                segments={sorted}
                                groupActive={groupActive}
                                onToggle={() => setGroupActive(v => !v)}
                            />

                            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">

                                {/* Chain header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-[15px] font-semibold text-[#1E3A8A]">Segment Chain</h2>
                                        <span className="text-[11px] font-semibold text-[#1E3A8A] bg-blue-100 px-2.5 py-0.5 rounded-full">
                                            {detail.segments.length} segments
                                        </span>
                                    </div>

                                    {/* ── ADD SEGMENT BUTTON ── */}
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] border border-dashed border-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition bg-transparent cursor-pointer"
                                    >
                                        <Plus size={12} />
                                        Add Segment
                                    </button>
                                </div>

                                <div className="px-6 py-5">

                                    {/* START node */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#102467] flex items-center justify-center flex-shrink-0">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <path d="M8 2l1.5 3.5 3.5.5-2.5 2.5.5 3.5L8 10.5 5 12l.5-3.5L3 6l3.5-.5L8 2z" fill="white" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Start</p>
                                            <p className="text-sm font-semibold text-[#102467]">{startHub}</p>
                                        </div>
                                    </div>

                                    {/* Vertical dashed line */}
                                    <div className="ml-[17px] border-l-2 border-dashed border-blue-200 pl-8 space-y-0">
                                        {sorted.map((seg) => (
                                            <SegmentRow
                                                segment={seg}
                                            />
                                        ))}
                                    </div>

                                    {/* Empty state */}
                                    {sorted.length === 0 && (
                                        <div className="ml-[17px] border-l-2 border-dashed border-blue-200 pl-8 py-10 text-center">
                                            <p className="text-sm text-gray-400">No segments yet</p>
                                            <button
                                                onClick={() => setOpenModal(true)}
                                                className="mt-3 text-xs text-[#1E3A8A] hover:underline bg-transparent border-none cursor-pointer"
                                            >
                                                + Add your first segment
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