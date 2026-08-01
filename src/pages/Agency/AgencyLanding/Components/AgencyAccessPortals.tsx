import {
    ArrowRight,
    Building2,
    UserCog,
    Warehouse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const portals = [
    {
        title: "Agency Portal",
        description:
            "Manage hubs, workers, pricing, bookings and business analytics from one powerful dashboard.",
        icon: Building2,
        color: "bg-blue-500/10 text-blue-400",
        path: "/agency/login",
    },
    {
        title: "Hub Portal",
        description:
            "Handle parcel operations, shipment processing and daily hub activities efficiently.",
        icon: Warehouse,
        color: "bg-emerald-500/10 text-emerald-400",
        path: "/hub/login",
    },
    {
        title: "Worker Portal",
        description:
            "Manage pickups, deliveries and assigned parcel tasks with live status updates.",
        icon: UserCog,
        color: "bg-yellow-500/10 text-yellow-400",
        path: "/worker/login",
    },
];

export default function AgencyAccessPortals() {
    const navigate = useNavigate();

    return (
        <section
            id="portals"
            className="bg-slate-950 py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-400">
                        Access Portals
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-white">
                        Choose Your
                        <span className="block text-yellow-400">
                            Workspace
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Access the right portal based on your role in the
                        CarryGo logistics network.
                    </p>

                </div>

                {/* Cards */}

                <div className="mt-20 grid gap-8 lg:grid-cols-3">

                    {portals.map((portal) => {
                        const Icon = portal.icon;

                        return (
                            <div
                                key={portal.title}
                                onClick={() => navigate(portal.path)}
                                className="
                                    group
                                    flex
                                    h-full
                                    cursor-pointer
                                    flex-col
                                    rounded-3xl
                                    border
                                    border-slate-800
                                    bg-gradient-to-br
                                    from-slate-900
                                    to-slate-800
                                    p-8
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:border-yellow-400/30
                                    hover:shadow-2xl
                                "
                            >

                                {/* Icon */}

                                <div
                                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${portal.color}`}
                                >
                                    <Icon size={30} />
                                </div>

                                {/* Title */}

                                <h3 className="mt-8 text-2xl font-bold text-white">
                                    {portal.title}
                                </h3>

                                {/* Description */}

                                <p className="mt-4 flex-1 leading-7 text-slate-400">
                                    {portal.description}
                                </p>

                                {/* Footer */}

                                <div className="mt-8 flex items-center justify-between border-t border-slate-700 pt-6">

                                    <div>

                                        <p className="text-sm font-medium text-slate-500">
                                            Open Portal
                                        </p>

                                        <p className="mt-1 text-xs text-slate-600">
                                            Secure Access
                                        </p>

                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-slate-900 transition-transform duration-300 group-hover:translate-x-1">

                                        <ArrowRight size={20} />

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}