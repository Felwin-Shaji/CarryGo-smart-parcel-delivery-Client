import {
    ArrowRight,
    Calendar,
    Route,
    GitBranch,
    MapPinned,
} from "lucide-react";

import type { RouteGroupDTO } from "../../../../../shared/constants_Types/types/Agency/AgencyRouteGroup.dto";

import { useNavigate } from "react-router-dom";

interface Props {
    group: RouteGroupDTO;
}

export default function RouteGroupCard({
    group,
}: Props) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() =>
                navigate(`/agency/route-groups/${group.id}`)
            }
            className={`
                group relative overflow-hidden cursor-pointer
                rounded-3xl border
                p-6
                transition-all duration-300
                hover:-translate-y-1.5

                ${group.isActive
                    ? `
                        border-slate-200/70
                        bg-white
                        shadow-[0_10px_35px_rgba(0,0,0,0.05)]
                        hover:border-blue-200
                        hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]
                    `
                    : `
                        border-rose-200/70
                        bg-gradient-to-br from-rose-50 via-white to-red-50
                        shadow-[0_10px_35px_rgba(244,63,94,0.080)]
                        hover:border-rose-300
                        hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)]
                    `
                }
            `}
        >

            {/* Background Glow */}
            <div
                className={`
                absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl
                opacity-0 transition-opacity duration-500 group-hover:opacity-100
                ${group.isActive
                        ? "bg-blue-100/40"
                        : "bg-rose-100/50"
                    }
                `}
            />

            {/* TOP */}
            <div className="relative flex items-start justify-between gap-4">

                {/* LEFT */}
                <div className="flex min-w-0 gap-4">

                    {/* ICON */}
                    <div
                        className={`
                            relative flex h-14 w-14 shrink-0
                            items-center justify-center
                            rounded-2xl
                            bg-gradient-to-br
                            ${group.isActive ? `
                                from-[#1E3A8A]
                                to-[#2854c5]
                                shadow-blue-200
                            `: `
                                from-rose-400
                                to-red-400
                                shadow-rose-200
                            `
                            }
                            text-white
                            shadow-lg shadow-blue-200
                            transition-transform duration-300
                            group-hover:scale-105
                        `}
                    >

                        <Route size={24} />

                        {/* Tiny glow */}
                        <div className="absolute inset-0 rounded-2xl bg-white/10" />

                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2 flex-wrap">

                            <h3
                                className="
                                    truncate text-xl font-bold
                                    tracking-tight text-slate-900
                                    transition-colors
                                    group-hover:text-[#1E3A8A]
                                "
                            >
                                {group.name}
                            </h3>

                            {/* STATUS */}
                            <div
                                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${group.isActive
                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                                    : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                                    }`}
                            >

                                <div
                                    className={`h-2 w-2 rounded-full ${group.isActive
                                        ? "bg-emerald-500"
                                        : "bg-slate-400"
                                        }`}
                                />

                                {group.isActive
                                    ? "Active"
                                    : "Inactive"}

                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">

                            {group.description ??
                                "No description available for this route group."}

                        </p>

                    </div>
                </div>

                {/* ACTION */}
                <div
                    className="
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-2xl border border-slate-200
                        bg-slate-50 text-slate-500
                        transition-all duration-300
                        group-hover:translate-x-1
                        group-hover:border-blue-100
                        group-hover:bg-blue-50
                        group-hover:text-[#1E3A8A]
                    "
                >
                    <ArrowRight size={18} />
                </div>

            </div>

            {/* MIDDLE METRICS */}
            <div className="mt-6 grid grid-cols-2 gap-3">

                {/* ROUTE TYPE */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">

                    <div className="flex items-center gap-2 text-slate-400">

                        <GitBranch size={14} />

                        <span className="text-xs font-medium uppercase tracking-wide">
                            Network
                        </span>

                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-700">
                        Route Connected
                    </p>

                </div>

                {/* CREATED */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">

                    <div className="flex items-center gap-2 text-slate-400">

                        <Calendar size={14} />

                        <span className="text-xs font-medium uppercase tracking-wide">
                            Created
                        </span>

                    </div>

                    <p className="mt-2 text-sm font-semibold text-slate-700">
                        {new Date(group.createdAt).toLocaleDateString()}
                    </p>

                </div>

            </div>

            {/* FOOTER */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <div className="flex items-center gap-2 text-sm text-slate-400">

                    <MapPinned size={15} />

                    <span>
                        Logistics Route Group
                    </span>

                </div>

                <div
                    className="
                        text-xs font-semibold uppercase tracking-wider
                        text-[#1E3A8A]
                    "
                >
                    View Details
                </div>

            </div>

        </div>
    );
}