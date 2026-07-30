import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { ServiceItem } from "./types";

interface Props {
    service: ServiceItem;
    isLoggedIn: boolean;
}

const ServiceCard = ({
    service,
    isLoggedIn,
}: Props) => {

    const navigate = useNavigate();

    const handleClick = () => {

        if (service.protected && !isLoggedIn) {
            navigate("/login");
            return;
        }

        navigate(service.path);
    };

    const Icon = service.icon;

    return (
        <div
            className="
                group
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-8
                backdrop-blur-md
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[var(--color-accent)]/40
                hover:bg-white/10
            "
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10">

                <Icon className="h-8 w-8 text-[var(--color-accent)]" />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">
                {service.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
                {service.description}
            </p>

            <button
                onClick={handleClick}
                className="
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    font-semibold
                    text-[var(--color-accent)]
                    transition-all
                    group-hover:gap-3
                "
            >
                {service.buttonText}

                <ArrowRight className="h-4 w-4" />
            </button>
        </div>
    );
};

export default ServiceCard;