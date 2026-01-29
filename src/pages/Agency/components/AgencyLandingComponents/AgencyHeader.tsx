import { useNavigate } from "react-router-dom";

export default function AgencyHeader() {
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[var(--color-primary)] shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/agency")}
                >
                    <span className="text-xl font-bold text-white">
                        CarryGo
                        <span className="text-[var(--color-accent)] ml-1">
                            Agency
                        </span>
                    </span>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-200">
                    <button className="bg-transparent hover:text-[var(--color-accent)]">
                        Why CarryGo
                    </button>
                    <button className="bg-transparent hover:text-[var(--color-accent)]">
                        How it Works
                    </button>
                    <button className="bg-transparent hover:text-[var(--color-accent)]">
                        Pricing
                    </button>
                    <button className="bg-transparent hover:text-[var(--color-accent)]">
                        Contact
                    </button>
                </nav>

                {/* CTA */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/agency/login")}
                        className="bg-transparent text-white hover:text-[var(--color-accent)]"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/agency/registration")}
                        className="px-5 py-2.5 rounded-lg font-semibold bg-[var(--color-accent)] text-[var(--color-primary)] 
                        transition-colors duration-200 hover:bg-[var(--color-primary-dark)] hover:text-[var(--color-accent)] ">
                        Become a Partner
                    </button>
                </div>

            </div>
        </header>
    );
}
