import ServiceCard from "./ServiceCard";
import { SERVICES } from "./services.data";

interface Props {
    isLoggedIn?: boolean;
}

const ServicesSection = ({
    isLoggedIn = false,
}: Props) => {

    return (
        <section className="bg-slate-950 py-24">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-3xl text-center">

                    <span
                        className="
                            rounded-full
                            border
                            border-[var(--color-accent)]/20
                            bg-[var(--color-accent)]/10
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-[var(--color-accent)]
                        "
                    >
                        Our Services
                    </span>

                    <h2 className="mt-6 text-4xl font-black text-white">
                        Everything You Need,
                        <br />
                        All in One Place.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        From booking your parcel to tracking every step of its
                        journey—or even earning by delivering while you travel—
                        CarryGo brings every service together on one trusted
                        platform.
                    </p>

                </div>

                <div
                    className="
                        mt-16
                        grid
                        gap-8
                        md:grid-cols-2
                        lg:grid-cols-3
                    "
                >
                    {SERVICES.map((service) => (
                        <ServiceCard
                            key={service.title}
                            service={service}
                            isLoggedIn={isLoggedIn}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default ServicesSection;