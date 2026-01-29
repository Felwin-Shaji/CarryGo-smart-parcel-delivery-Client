import { ArrowRight, Building2, TrendingUp, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgencyHero() {
    const navigate = useNavigate();

    return (
        <section
            className="
            relative min-h-[calc(100vh-80px)] mt-10 pt-40 pb-32
            text-white bg-cover bg-center"
            style={{
                backgroundImage: "url('/src/assets/agency-hero.jpg')",
            }}
        >
            {/* ✅ Directional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r 
                from-[var(--color-primary)]/90 
                via-[var(--color-primary)]/70 
                to-[var(--color-primary)]/40  bg-white/5"/>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

                {/* LEFT CONTENT (text-safe zone) */}
                <div className="max-w-xl">
                    <span className="
                    inline-flex items-center
                    mb-6
                    px-4 py-1.5
                    text-sm font-semibold
                    rounded-full
                    backdrop-blur-md
                    text-[var(--color-accent)]
                    shadow-md
                    ">
                        Logistics Partner Platform
                    </span>


                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Grow Your Logistics Business <br />
                        with <span className="text-[var(--color-accent)]">CarryGo</span>
                    </h1>

                    <p className="mt-8 text-lg text-gray-200">
                        Manage hubs, receive verified bookings, and expand your reach —
                        all from one powerful platform built for logistics agencies.
                    </p>

                    {/* CTA */}
                    <div className="mt-10 flex flex-wrap items-center gap-6">
                        <button
                            onClick={() => navigate("/agency/registration")}
                            className="
                            group
                            flex items-center gap-2
                            px-6 py-3
                            rounded-lg
                            font-semibold
                            bg-[var(--color-accent)]
                            text-[var(--color-primary)]
                            transition-colors duration-200
                            hover:bg-[var(--color-primary-dark)]
                            hover:text-[var(--color-accent)]
                        ">
                            Become a Partner
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={() => navigate("/agency/login")}
                            className="text-sm font-medium text-gray-200 hover:text-white"
                        >
                            Already a partner? Login →
                        </button>
                    </div>
                </div>

                {/* RIGHT VALUE PROPS */}
                <div className="grid grid-cols-2 gap-8">
                    <StatCard
                        icon={<Building2 />}
                        title="Multi-Hub Support"
                        desc="Create and manage multiple hubs under one agency."
                    />
                    <StatCard
                        icon={<TrendingUp />}
                        title="Revenue Growth"
                        desc="Get consistent bookings from verified users."
                    />
                    <StatCard
                        icon={<MapPin />}
                        title="Wider Reach"
                        desc="Serve deliveries across cities with smart routing."
                    />
                    <StatCard
                        icon={<ArrowRight />}
                        title="Fast Onboarding"
                        desc="Get approved and start receiving orders quickly."
                    />
                </div>
            </div>
        </section>
    );
}

function StatCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className="
            rounded-xl
            bg-white/15
            backdrop-blur-md
            p-6
            shadow-lg">
            <div className="mb-4 text-[var(--color-accent)]">{icon}</div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-gray-200">{desc}</p>
        </div>
    );
}
