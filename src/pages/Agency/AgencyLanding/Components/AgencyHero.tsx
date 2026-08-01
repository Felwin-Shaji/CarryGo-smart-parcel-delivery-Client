import {
    ArrowRight,
    Package,
    Building2,
    Users,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "../../../../assets/agency-hero.jpg";
import dashboardPreview from "../../../../assets/agency-screenshote.png";

export default function AgencyHero() {
    const navigate = useNavigate();

    return (
        <section
            className="relative overflow-hidden min-h-screen pt-28"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081225]/95 via-[#081225]/80 to-[#081225]/35" />

            {/* Blue Glow */}
            <div className="absolute left-0 top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[180px]" />

            {/* Yellow Glow */}
            <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-[150px]" />

            <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

                {/* LEFT */}

                <div>

                    <span className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-300">
                        Trusted Logistics Partner Platform
                    </span>

                    <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-white lg:text-7xl">
                        Power Your
                        <span className="block text-yellow-400">
                            Logistics Agency
                        </span>

                        <span className="block">
                            with CarryGo
                        </span>
                    </h1>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
                        Manage hubs, assign workers, receive parcel bookings, track
                        deliveries in real time, and grow your agency with a platform
                        designed for modern logistics businesses.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <button
                            onClick={() => navigate("/agency/registration")}
                            className="group flex items-center gap-2 rounded-xl bg-yellow-400 px-7 py-4 font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-xl hover:shadow-yellow-400/20"
                        >
                            Become a Partner

                            <ArrowRight className="transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={() => navigate("/agency/login")}
                            className="rounded-xl border border-white/20 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur transition hover:bg-white/10"
                        >
                            Login to Dashboard
                        </button>

                    </div>

                    {/* Stats */}

                    <div className="mt-16 flex flex-wrap gap-10">

                        <Stat number="100+" label="Partner Agencies" />

                        <Stat number="50K+" label="Deliveries Completed" />

                        <Stat number="25+" label="Service Locations" />

                        <Stat number="99.2%" label="Delivery Success" />

                    </div>

                </div>

                {/* RIGHT */}

                <div className="relative">

                    {/* Dashboard */}

                    <div className="relative transition-all duration-500 hover:-translate-y-2">

                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-[0_30px_80px_rgba(0,0,0,.45)]">

                            {/* Browser */}

                            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-4">

                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                    <div className="h-3 w-3 rounded-full bg-green-500" />
                                </div>

                                <div className="rounded-full bg-slate-800 px-4 py-1 text-xs text-slate-400">
                                    app.carrygo.co.in
                                </div>

                                <div className="w-12" />

                            </div>

                            <img
                                src={dashboardPreview}
                                alt="CarryGo Dashboard"
                                className="w-full"
                            />

                        </div>

                    </div>

                    {/* Floating Cards */}

                    <FloatingCard
                        icon={<Building2 size={18} />}
                        title="8 Active Hubs"
                        className="-left-10 top-12"
                    />

                    <FloatingCard
                        icon={<Package size={18} />}
                        title="326 Orders Today"
                        className="-right-8 top-28"
                    />

                    <FloatingCard
                        icon={<Users size={18} />}
                        title="54 Workers Online"
                        className="-left-8 bottom-28"
                    />

                    <FloatingCard
                        icon={<TrendingUp size={18} />}
                        title="+28% Revenue"
                        className="-right-8 bottom-8"
                    />

                </div>

            </div>
        </section>
    );
}

function Stat({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div>
            <div className="text-3xl font-bold text-yellow-400">
                {number}
            </div>

            <div className="mt-1 text-sm text-slate-400">
                {label}
            </div>
        </div>
    );
}

function FloatingCard({
    icon,
    title,
    className,
}: {
    icon: React.ReactNode;
    title: string;
    className: string;
}) {
    return (
        <div
            className={`absolute ${className} hidden items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur-xl lg:flex`}
        >
            <div className="text-yellow-400">
                {icon}
            </div>

            <span className="font-medium text-white">
                {title}
            </span>
        </div>
    );
}