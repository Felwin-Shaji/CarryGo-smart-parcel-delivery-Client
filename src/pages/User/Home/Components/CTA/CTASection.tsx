import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CTASectionProps {
    isLoggedIn?: boolean;
}

const CTASection = ({
    isLoggedIn = false,
}: CTASectionProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(isLoggedIn ? "/booking" : "/login");
    };

    return (
        <section className="bg-slate-950 pb-24">

            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-white/10
                        bg-gradient-to-r
                        from-slate-900
                        via-slate-800
                        to-slate-900
                        px-8
                        py-20
                        text-center
                        lg:px-20
                    "
                >

                    {/* Background Glow */}

                    <div
                        className="
                            absolute
                            -top-32
                            left-1/2
                            h-80
                            w-80
                            -translate-x-1/2
                            rounded-full
                            bg-[var(--color-accent)]/10
                            blur-3xl
                        "
                    />

                    <div className="relative z-10">

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
                            Ready to Ship?
                        </span>

                        <h2 className="mt-8 text-4xl font-black text-white lg:text-5xl">
                            Deliver with Confidence.
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Book your parcel in minutes with flexible delivery
                            options, secure booking, and real-time tracking—
                            all in one trusted platform.
                        </p>

                        <button
                            onClick={handleClick}
                            className="
                                mt-10
                                inline-flex
                                items-center
                                gap-3
                                rounded-xl
                                bg-[var(--color-accent)]
                                px-8
                                py-4
                                font-semibold
                                text-black
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-2xl
                            "
                        >
                            Book a Delivery

                            <ArrowRight className="h-5 w-5" />
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default CTASection;