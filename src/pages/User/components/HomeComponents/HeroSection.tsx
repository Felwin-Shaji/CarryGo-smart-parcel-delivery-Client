import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
    isLoggedIn?: boolean;
}

const HeroSection = ({ isLoggedIn = false }: HeroSectionProps) => {
    const navigate = useNavigate();

    const handleBookDelivery = () => {
        if (isLoggedIn) {
            navigate("/book-delivery");
        } else {
            navigate("/login");
        }
    };

    return (
        <section
            className="relative min-h-screen w-full flex items-center"
            style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 0.27), rgba(14, 37, 97, 0.08)), url('/src/assets/hero-truck.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="max-w-xl text-white space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Moving made simple <br />
                        from pickup to doorstep
                    </h1>

                    <p className="text-base md:text-lg text-gray-200">
                        Reliable parcel delivery with real-time tracking, verified partners,
                        and secure payments.
                    </p>

                    <div className="flex gap-4 pt-4">
                        <button 
                        onClick={handleBookDelivery}
                        className="rounded-full bg-[var(--color-accent)] px-8 py-3 font-semibold text-black hover:opacity-90 transition"
                        >
                            Book a Delivery
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
