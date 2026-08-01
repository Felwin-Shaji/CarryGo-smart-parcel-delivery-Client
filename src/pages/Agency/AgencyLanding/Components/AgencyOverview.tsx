import {
    PackageCheck,
    Building2,
    TrendingUp,
    Route,
} from "lucide-react";

const overviewItems = [
    {
        icon: <PackageCheck size={28} />,
        title: "Verified Bookings",
        description:
            "Receive parcel delivery requests from verified customers without relying on traditional marketing.",
    },
    {
        icon: <Building2 size={28} />,
        title: "Smart Hub Management",
        description:
            "Manage multiple hubs, workers, shipments and operations from one centralized dashboard.",
    },
    {
        icon: <Route size={28} />,
        title: "Optimized Deliveries",
        description:
            "Reduce operational delays with intelligent routing, live tracking and streamlined workflows.",
    },
    {
        icon: <TrendingUp size={28} />,
        title: "Business Growth",
        description:
            "Increase revenue through higher order volume, performance analytics and operational insights.",
    },
];

export default function AgencyOverview() {
    return (
        <section
            id="overview"
            className="bg-[#081225] py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Section Header */}

                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-400">
                        Why CarryGo
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
                        Helping Logistics Agencies
                        <span className="block text-yellow-400">
                            Scale Smarter
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        CarryGo provides agencies with a complete logistics
                        management platform that combines verified bookings,
                        smart operations, live tracking and powerful business
                        analytics—all in one place.
                    </p>

                </div>

                {/* Cards */}

                <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {overviewItems.map((item) => (

                        <div
                            key={item.title}
                            className="
                                group
                                rounded-3xl
                                border
                                border-white/10
                                bg-slate-900
                                p-8
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-yellow-400/30
                                hover:shadow-[0_20px_50px_rgba(0,0,0,.35)]
                            "
                        >

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-slate-900">
                                {item.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-4 leading-7 text-slate-400">
                                {item.description}
                            </p>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}