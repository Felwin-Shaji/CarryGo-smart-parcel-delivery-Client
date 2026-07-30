import type { TimelineStepItem } from "./types";

interface TimelineStepProps {
    step: TimelineStepItem;
    isLast: boolean;
}

const TimelineStep = ({
    step,
    isLast,
}: TimelineStepProps) => {

    const Icon = step.icon;

    return (
        <div className="relative flex flex-col items-center text-center">

            {/* Connector Line (Desktop) */}
            {!isLast && (
                <div
                    className="
                        absolute
                        top-8
                        left-1/2
                        hidden
                        h-0.5
                        w-full
                        bg-white/10
                        lg:block
                    "
                />
            )}

            {/* Icon */}
            <div
                className="
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:border-[var(--color-accent)]/40
                "
            >
                <Icon className="h-7 w-7 text-[var(--color-accent)]" />
            </div>

            {/* Step Number */}
            <span className="mt-4 text-sm font-semibold text-[var(--color-accent)]">
                Step {step.id}
            </span>

            {/* Title */}
            <h3 className="mt-2 text-xl font-bold text-white">
                {step.title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-7 text-slate-300">
                {step.description}
            </p>

        </div>
    );
};

export default TimelineStep;