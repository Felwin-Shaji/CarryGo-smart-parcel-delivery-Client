import heroTruck from "../../../../../assets/hero-truck.jpg";

import {
    MapPinned,
    ShieldCheck,
    Truck,
} from "lucide-react";

import HeroButtons from "./HeroButtons";
import HeroFeature from "./HeroFeature";

interface HeroSectionProps {
    isLoggedIn?: boolean;
}

const HeroSection = ({
    isLoggedIn = false,
}: HeroSectionProps) => {

    return (
        <section
            className="relative overflow-hidden"
            style={{
                backgroundImage: `
                    linear-gradient(
                        90deg,
                        rgba(2,6,23,.92) 0%,
                        rgba(15,23,42,.82) 45%,
                        rgba(15,23,42,.35) 100%
                    ),
                    url(${heroTruck})
                `,
                backgroundSize: "cover",
                backgroundPosition: "75% center",
            }}
        >
            <div className="mx-auto flex min-h-[calc(100vh-1px)] max-w-7xl items-center px-6 py-16 lg:py-20">

                <div className="max-w-2xl">

                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

                        <span className="h-2 w-2 rounded-full bg-blue-400" />

                        <span className="text-sm font-semibold tracking-wide text-blue-300">
                            Smart Parcel Delivery
                        </span>

                    </div>

                    {/* Heading */}

                    <h1
                        className="
                            mt-8
                            text-4xl
                            font-black
                            leading-[1.1]
                            tracking-tight
                            text-white
                            sm:text-5xl
                            lg:text-6xl
                        "
                    >
                        More Ways to Deliver.
                        <br />

                        One Trusted Platform.
                    </h1>

                    {/* Description */}

                    <p
                        className="
                            mt-8
                            max-w-xl
                            text-lg
                            leading-8
                            text-slate-300
                        "
                    >
                        Book parcels with flexible delivery options,
                        real-time tracking, and secure booking—
                        from pickup to doorstep.
                    </p>

                    <HeroButtons
                        isLoggedIn={isLoggedIn}
                    />

                    {/* Features */}

                    <div className="mt-12 flex flex-wrap gap-6">

                        <HeroFeature
                            icon={MapPinned}
                            text="Real-Time Tracking"
                        />

                        <HeroFeature
                            icon={ShieldCheck}
                            text="Secure Booking"
                        />

                        <HeroFeature
                            icon={Truck}
                            text="Flexible Delivery"
                        />

                    </div>

                </div>

            </div>
        </section>
    );
};

export default HeroSection;