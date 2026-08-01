import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const navItems = [
    { label: "Why CarryGo", href: "#overview" },
    { label: "Benefits", href: "#benefits" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Access Portals", href: "#portals" },
    { label: "FAQ", href: "#faq" },
];

export default function AgencyHeader() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
                    : "bg-gradient-to-b from-black/70 via-black/30 to-transparent"
            }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <div
                    onClick={() => navigate("/agency")}
                    className="flex cursor-pointer items-center gap-3"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1E3A8A] shadow-md">
                        <span className="text-xl font-bold text-white">C</span>
                    </div>

                    <div className="leading-none">
                        <h1 className="text-2xl font-bold text-white">
                            CarryGo
                        </h1>

                        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-400">
                            Agency Portal
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="relative text-[15px] font-medium text-white/80 transition hover:text-white group"
                        >
                            {item.label}

                            <span className="absolute -bottom-2 left-0 h-[2px] w-0 rounded-full bg-yellow-400 transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </nav>

                {/* Right */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/agency/login")}
                        className="rounded-lg px-4 py-2 text-[15px] font-medium text-white transition hover:bg-white/10"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/agency/registration")}
                        className="group flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-2.5 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:bg-yellow-300 hover:shadow-lg"
                    >
                        Become Partner

                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>

                </div>
            </div>
        </header>
    );
}