import {
    Building2,
    BadgeCheck,
    Warehouse,
    Package,
    Truck,
    Wallet,
} from "lucide-react";

const steps = [
    {
        icon: Building2,
        title: "Register Agency",
        description:
            "Create your CarryGo agency account and submit your business details.",
    },
    {
        icon: BadgeCheck,
        title: "Verification",
        description:
            "Our team verifies your agency documents and activates your account.",
    },
    {
        icon: Warehouse,
        title: "Setup Hubs",
        description:
            "Add your hubs, workers, pricing, and delivery coverage areas.",
    },
    {
        icon: Package,
        title: "Receive Orders",
        description:
            "Customers begin booking deliveries directly through your agency.",
    },
    {
        icon: Truck,
        title: "Deliver Parcels",
        description:
            "Manage pickups, deliveries, and live tracking from one dashboard.",
    },
    {
        icon: Wallet,
        title: "Get Paid",
        description:
            "Receive secure payments and monitor your agency's earnings.",
    },
];

export default function AgencyHowItWorks() {
    return (
        <section
            id="how-it-works"
            className="bg-[#081225] py-28"
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm font-semibold text-yellow-400">
                        Simple Onboarding
                    </span>

                    <h2 className="mt-6 text-5xl font-bold text-white">
                        Start Delivering in
                        <span className="block text-yellow-400">
                            Six Simple Steps
                        </span>
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-400">
                        Joining CarryGo is quick and straightforward. From
                        registration to receiving bookings, everything is
                        designed to get your agency operational as fast as
                        possible.
                    </p>

                </div>

                {/* Timeline */}

                <div className="relative mt-24">

                    {/* Center Line */}

                    <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-slate-800 lg:block" />

                    <div className="space-y-16">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className={`flex items-center ${
                                        index % 2 === 0
                                            ? "lg:flex-row"
                                            : "lg:flex-row-reverse"
                                    } flex-col gap-10`}
                                >
                                    {/* Card */}

                                    <div className="w-full lg:w-5/12">

                                        <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 transition hover:border-yellow-400/30">

                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400">
                                                <Icon size={28} />
                                            </div>

                                            <span className="text-sm font-semibold text-yellow-400">
                                                Step {index + 1}
                                            </span>

                                            <h3 className="mt-2 text-2xl font-bold text-white">
                                                {step.title}
                                            </h3>

                                            <p className="mt-4 leading-7 text-slate-400">
                                                {step.description}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Timeline Dot */}

                                    <div className="relative z-10 hidden h-6 w-6 rounded-full border-4 border-[#081225] bg-yellow-400 lg:block" />

                                    <div className="hidden lg:block lg:w-5/12" />

                                </div>
                            );
                        })}

                    </div>

                </div>

            </div>
        </section>
    );
}