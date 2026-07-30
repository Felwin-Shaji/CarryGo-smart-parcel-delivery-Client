import { ArrowRight, PackageSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeroButtonsProps {
    isLoggedIn: boolean;
}

const HeroButtons = ({
    isLoggedIn,
}: HeroButtonsProps) => {

    const navigate = useNavigate();

    const handleBookDelivery = () => {
        navigate(isLoggedIn ? "/booking" : "/login");
    };

    const handleTrackParcel = () => {
        navigate(isLoggedIn? "/tracking" : "/login");
    };

    return (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button
                onClick={handleBookDelivery}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[var(--color-accent)]
                    px-7
                    py-4
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                "
            >
                Book a Delivery

                <ArrowRight className="h-5 w-5" />
            </button>

            <button
                onClick={handleTrackParcel}
                className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    px-7
                    py-4
                    font-semibold
                    text-white
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:bg-white/20
                "
            >
                Track a Parcel

                <PackageSearch className="h-5 w-5" />
            </button>

        </div>
    );
};

export default HeroButtons;