import {
    TrendingUp,
    MapPinned,
    Wallet,
    BarChart3,
    Building2,
    ShieldCheck,
} from "lucide-react";

const benefits = [
    {
        icon: TrendingUp,
        title: "Increase Order Volume",
        description:
            "Receive consistent delivery requests from verified users and businesses without additional marketing costs.",
    },
    {
        icon: MapPinned,
        title: "Real-Time Parcel Tracking",
        description:
            "Track every shipment from pickup to delivery with live status updates for customers and agencies.",
    },
    {
        icon: Building2,
        title: "Multi-Hub Operations",
        description:
            "Manage multiple branches and hubs from a single dashboard with centralized control.",
    },
    {
        icon: Wallet,
        title: "Automated Payments",
        description:
            "Secure online payments, transparent earnings, and detailed transaction history.",
    },
    {
        icon: BarChart3,
        title: "Business Insights",
        description:
            "Analyze bookings, revenue, deliveries, and worker performance using powerful analytics.",
    },
    {
        icon: ShieldCheck,
        title: "Verified Platform",
        description:
            "Work with verified customers, agencies, and delivery partners in a secure logistics ecosystem.",
    },
];

export default function AgencyBenefits() {
    return (
        <section
            id="benefits"
            className="bg-slate-950 py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-400">
                        Agency Benefits
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-white">
                        Everything You Need to
                        <span className="block text-yellow-400">
                            Grow Your Agency
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        CarryGo helps agencies streamline operations,
                        improve customer experience, and grow revenue
                        through one unified logistics platform.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {benefits.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-white/10
                                    bg-slate-900
                                    p-8
                                    transition-all
                                    duration-300
                                    hover:-translate-y-2
                                    hover:border-yellow-400/30
                                "
                            >
                                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                                <div className="relative">

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                                        <Icon size={28} />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-semibold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-4 leading-7 text-slate-400">
                                        {item.description}
                                    </p>

                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}