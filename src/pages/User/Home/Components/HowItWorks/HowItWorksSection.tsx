import TimelineStep from "./TimelineStep";
import { TIMELINE_STEPS } from "./timeline.data";

const HowItWorksSection = () => {
    return (
        <section className="bg-slate-950 py-24">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Header */}
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
                        How It Works
                    </span>

                    <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
                        Shipping Made Simple,
                        <br />
                        From Start to Finish.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                        Book your parcel, choose the delivery option that fits
                        your needs, track every step of the journey, and receive
                        it safely at its destination.
                    </p>

                </div>

                {/* Timeline */}
                <div
                    className="
                        mt-20
                        grid
                        gap-12
                        sm:grid-cols-2
                        lg:grid-cols-5
                    "
                >
                    {TIMELINE_STEPS.map((step, index) => (
                        <TimelineStep
                            key={step.id}
                            step={step}
                            isLast={index === TIMELINE_STEPS.length - 1}
                        />
                    ))}
                </div>

            </div>

        </section>
    );
};

export default HowItWorksSection;