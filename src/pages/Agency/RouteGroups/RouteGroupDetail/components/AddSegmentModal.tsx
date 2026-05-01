import { X } from "lucide-react";
import { useState } from "react";
import { HubDropdown } from "./HubDropDown";
import type { HubResponseDTO } from "../../../../../shared/constants_Types/types/Admin/AdminAgency.dto";
import { useAgencyRouteSegmant } from "../../../../../Services/Agency/AgencyRouteSegmant";
import type { CreateRouteSegmentDTO } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteSegment.dto";


interface Props {
    routeGroupId: string;
    routeGroupName: string;
    nextSegmentOrder: number;
    onClose: () => void;
    onCreated: () => void;
}



export default function AddSegmentModal({
    routeGroupId,
    routeGroupName,
    nextSegmentOrder,
    onClose,
    onCreated,
}: Props) {

    const { createRouteSegmants } = useAgencyRouteSegmant()

    const [originHub, setOriginHub] = useState<HubResponseDTO | null>(null);
    const [destHub, setDestHub] = useState<HubResponseDTO | null>(null);
    const [distanceKm, setDistanceKm] = useState("");
    const [estimatedMin, setEstimatedMin] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!originHub) { setError("Please select an origin hub"); return; }
        if (!destHub) { setError("Please select a destination hub"); return; }
        if (originHub.id === destHub.id) {
            setError("Origin and destination cannot be the same hub");
            return;
        }
        setError("");
        setSubmitting(true);
        try {
            const data: CreateRouteSegmentDTO = {
                originHubId: originHub.id,
                destinationHubId: destHub.id,
                distanceKm: distanceKm ? Number(distanceKm) : undefined,
                estimatedTimeMinutes: estimatedMin ? Number(estimatedMin) : undefined,
                isActive: true,
            }
            await createRouteSegmants(routeGroupId, data)
            onCreated();
        } catch {
            setError("Failed to add segment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-xl border border-gray-200 flex flex-col">

                {/* ── Header ── */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-base font-bold text-[#1E3A8A]">
                            Add Segment <span className="text-gray-300">#{nextSegmentOrder}</span>
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">
                            Define origin and destination for this route leg.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition border-none bg-transparent cursor-pointer"
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* ── Route group pill ── */}
                <div className="mx-6 mt-4 flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] flex-shrink-0" />
                    <span className="text-xs font-semibold text-[#1E3A8A] truncate">{routeGroupName}</span>
                    <span className="text-xs text-blue-300 flex-shrink-0">· route group</span>
                </div>

                <div className="px-6 py-4 space-y-4">

                    {/* ── Error ── */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                                <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.3" />
                                <path d="M7 4.5v3M7 9.5v.5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                            <p className="text-xs text-red-600">{error}</p>
                        </div>
                    )}

                    {/* ── Hub dropdowns ── */}
                    <HubDropdown
                        label="Origin Hub"
                        selected={originHub}
                        // hubs={hubs}
                        onSelect={setOriginHub}
                        placeholder="Select origin hub"
                    />

                    {/* ── Route preview connector ── */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-[#eff1f7] border border-gray-200 rounded-xl">
                        <div className={`flex-1 text-center text-xs font-semibold py-1.5 px-2 rounded-lg truncate ${originHub ? "bg-[#1E3A8A] text-white" : "bg-gray-200 text-gray-400"
                            }`}>
                            {originHub?.name ?? "Origin"}
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                            <div className="h-px w-3 bg-gray-300" />
                            <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-[#1E3A8A] shadow-sm">
                                {nextSegmentOrder}
                            </div>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1 5h8M6 2l3 3-3 3" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="h-px w-3 bg-gray-300" />
                        </div>

                        <div className={`flex-1 text-center text-xs font-semibold py-1.5 px-2 rounded-lg truncate ${destHub ? "bg-[#FACC15] text-[#102467]" : "bg-gray-200 text-gray-400"
                            }`}>
                            {destHub?.name ?? "Destination"}
                        </div>
                    </div>

                    <HubDropdown
                        label="Destination Hub"
                        selected={destHub}
                        // hubs={hubs}
                        onSelect={setDestHub}
                        placeholder="Select destination hub"
                    />

                    {/* ── Distance + Time ── */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                                Distance
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={distanceKm}
                                    onChange={e => setDistanceKm(e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 bg-white"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none">km</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                                Est. Time
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={estimatedMin}
                                    onChange={e => setEstimatedMin(e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-12 text-sm outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 bg-white"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 pointer-events-none">min</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ── Footer ── */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-[#eff1f7] rounded-b-2xl">
                    <p className="text-xs text-gray-400">
                        Segment <span className="font-semibold text-gray-600">#{nextSegmentOrder}</span> of {routeGroupName}
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm border border-gray-200 rounded-xl hover:bg-white transition font-medium text-gray-600 bg-white cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-5 py-2 text-sm bg-[#1E3A8A] text-white rounded-xl hover:bg-[#102467] transition font-semibold disabled:opacity-60 cursor-pointer border-none"
                        >
                            {submitting ? "Adding…" : "Add Segment"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}