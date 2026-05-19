import { X, Route, MapPinned, Clock3, Ruler, GitBranchPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { HubDropdown } from "./HubDropDown";
import type { HubResponseDTO } from "../../../../../shared/constants_Types/types/Admin/AdminAgency.dto";
import { useAgencyRouteSegmant } from "../../../../../Services/Agency/AgencyRouteSegmant";
import type { CreateRouteSegmentDTO, RouteSegmentDTO, } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";

interface Props {
    routeGroupId: string;
    routeGroupName: string;
    nextSegmentOrder: number;
    segments: RouteSegmentDTO[];
    onClose: () => void;
    onCreated: () => void;
}

export default function AddSegmentModal({
    routeGroupId,
    routeGroupName,
    nextSegmentOrder,
    segments,
    onClose,
    onCreated,
}: Props) {
    const { createRouteSegmants } = useAgencyRouteSegmant();

    const [originHub, setOriginHub] = useState<HubResponseDTO | null>(null);
    const [destHub, setDestHub] = useState<HubResponseDTO | null>(null);
    const [distanceKm, setDistanceKm] = useState("");
    const [estimatedMin, setEstimatedMin] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const lastSegment = segments[segments.length - 1];

    useEffect(() => {
        if (lastSegment) {
            setOriginHub({
                id: lastSegment.destinationHubId,
                name: lastSegment.destinationHubName,
            } as HubResponseDTO);
        }
    }, [lastSegment]);

    const handleSubmit = async () => {
        if (!originHub) {
            setError("Please select an origin hub");
            return;
        }

        if (!destHub) {
            setError("Please select a destination hub");
            return;
        }

        if (originHub.id === destHub.id) {
            setError("Origin and destination cannot be the same hub");
            return;
        }

        if (segments.length > 0) {
            const firstSegment = segments[0];

            if (destHub.id === firstSegment.originHubId) {
                setError(
                    `Circular routes are not allowed. Destination hub cannot be "${firstSegment.originHubName}".`
                );
                return;
            }
        }

        // Distance validation
        if (!distanceKm.trim()) {
            setError("Please enter the distance");
            return;
        }

        const distance = Number(distanceKm);

        if (isNaN(distance) || distance <= 0) {
            setError("Distance must be greater than 0 km");
            return;
        }

        // Estimated time validation
        if (!estimatedMin.trim()) {
            setError("Please enter the estimated time");
            return;
        }

        const estimatedTime = Number(estimatedMin);

        if (isNaN(estimatedTime) || estimatedTime <= 0) {
            setError("Estimated time must be greater than 0 minutes");
            return;
        }

        setError("");
        setSubmitting(true);

        try {
            const data: CreateRouteSegmentDTO = {
                originHubId: originHub.id,
                destinationHubId: destHub.id,
                distanceKm: distance,
                estimatedTimeMinutes: estimatedTime,
                isActive: true,
            };

            await createRouteSegmants(routeGroupId, data);
            onCreated();
        } catch {
            setError("Failed to add segment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
            <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl max-h-[90vh]">
                <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-r from-[#1E3A8A] to-[#2563eb] px-8 py-6 text-white">

                    <div className="relative flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                <GitBranchPlus size={28} />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Add Route Segment
                                </h2>
                                <p className="mt-1 text-sm text-blue-100">
                                    Segment #{nextSegmentOrder} in {routeGroupName}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20 border-none cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-y-auto px-8 py-6">
                    <div className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E3A8A] text-white">
                                <Route size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                    Route Group
                                </p>
                                <p className="font-semibold text-slate-800">
                                    {routeGroupName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="mb-4 flex items-center gap-2">
                            <MapPinned size={16} className="text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-700">
                                Route Preview
                            </h3>
                        </div>

                        <div className="flex items-center gap-3">
                            <div
                                className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold ${originHub
                                    ? "bg-[#1E3A8A] text-white"
                                    : "bg-slate-200 text-slate-400"
                                    }`}
                            >
                                {originHub?.name || "Origin Hub"}
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-px w-6 bg-slate-300" />
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-[#1E3A8A] text-xs font-bold text-[#1E3A8A]">
                                        {nextSegmentOrder}
                                    </div>
                                    <div className="h-px w-6 bg-slate-300" />
                                </div>
                            </div>

                            <div
                                className={`flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold ${destHub
                                    ? "bg-amber-400 text-slate-900"
                                    : "bg-slate-200 text-slate-400"
                                    }`}
                            >
                                {destHub?.name || "Destination Hub"}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-5">
                            <div>
                                <HubDropdown
                                    label="Origin Hub"
                                    selected={originHub}
                                    onSelect={setOriginHub}
                                    placeholder="Select origin hub"
                                    disabled={!!lastSegment}
                                />
                                {lastSegment && (
                                    <p className="mt-2 text-xs text-blue-600">
                                        Auto-selected from previous segment destination
                                    </p>
                                )}
                            </div>

                            <HubDropdown
                                label="Destination Hub"
                                selected={destHub}
                                onSelect={setDestHub}
                                placeholder="Select destination hub"
                            />
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Distance
                                </label>
                                <div className="relative">
                                    <Ruler
                                        size={16}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Enter distance"
                                        value={distanceKm}
                                        onChange={(e) => setDistanceKm(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-14 text-sm outline-none transition focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                        km
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Estimated Time
                                </label>
                                <div className="relative">
                                    <Clock3
                                        size={16}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="number"
                                        min={0}
                                        placeholder="Enter time"
                                        value={estimatedMin}
                                        onChange={(e) => setEstimatedMin(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-14 text-sm outline-none transition focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                                        min
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 flex items-center justify-between border-t border-slate-200 bg-slate-50 px-8 py-5">
                    <p className="text-sm text-slate-500">
                        Creating segment{" "}
                        <span className="font-semibold text-slate-700">
                            #{nextSegmentOrder}
                        </span>
                    </p>
                    {error && (
                        <p className="text-sm font-medium text-red-600">{error}</p>
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="rounded-2xl bg-[#1E3A8A] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#102467] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer border-none"
                        >
                            {submitting ? "Adding..." : "Add Segment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
