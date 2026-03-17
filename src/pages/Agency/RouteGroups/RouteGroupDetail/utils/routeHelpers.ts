import type { RouteSegmentDTO } from "../../../../../constants_Types/types/Agency/AgencyRouteSegment.dto";

export function formatTime(minutes: number | null) {
    if (!minutes) return "—";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function totalDistance(segments: RouteSegmentDTO[]) {
    return segments.reduce((acc, s) => acc + (s.distanceKm ?? 0), 0);
}

export function totalTime(segments: RouteSegmentDTO[]) {
    return segments.reduce((acc, s) => acc + (s.estimatedTimeMinutes ?? 0), 0);
}

export function sortSegments(segments: RouteSegmentDTO[]) {
    return [...segments].sort((a, b) => a.segmentOrder - b.segmentOrder);
}