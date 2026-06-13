import {
    ArrowRight,
    Globe,
    ShieldCheck,
    Route,
    WalletCards,
    CheckCircle2,
    Users,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const floatingCards = [
    {
        title: "Live Tracking",
        icon: Route,
        desc: "Real-time telemetry",
        color: "from-blue-500/20 to-cyan-500/5",
    },
    {
        title: "Verified Network",
        icon: ShieldCheck,
        desc: "100% KYC compliant",
        color: "from-emerald-500/20 to-teal-500/5",
    },
    {
        title: "Secure Payments",
        icon: WalletCards,
        desc: "Encrypted escrow",
        color: "from-purple-500/20 to-pink-500/5",
    },
    {
        title: "Global Reach",
        icon: Globe,
        desc: "Cross-border nodes",
        color: "from-amber-500/20 to-orange-500/5",
    },
];


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20
        },
    },
};

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-24 text-white">
            {/* Dynamic Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[140px]" />
                <div className="absolute -right-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[130px]" />
                <div className="absolute bottom-[-10%] left-[20%] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
            </div>

            {/* Futuristic Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px), 
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative mx-auto grid max-w-7xl min-h-[calc(100vh-6rem)] items-center gap-12 px-6 py-12 lg:grid-cols-12">

                {/* LEFT CONTENT */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8 lg:col-span-7 xl:col-span-6"
                >
                    {/* BADGE */}
                    <motion.div variants={itemVariants} className="inline-flex">
                        <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-md shadow-inner">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                            Next-Gen Crowd-Sourced Logistics
                        </div>
                    </motion.div>

                    {/* HEADING */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.1]">
                            Smart Logistics <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Powered by Travelers
                            </span>
                        </h1>
                        <p className="max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                            CarryGo decentralizes traditional shipping. We bridge customers,
                            everyday travelers, and regional hubs into a hyper-efficient network across India.
                        </p>
                    </motion.div>

                    {/* INTERACTIVE CALL TO ACTIONS */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/booking")}
                            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-transform duration-200 active:scale-95 hover:brightness-110"
                        >
                            Send Your Parcel
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </button>

                        <button
                            onClick={() => navigate("/traveler/request")}
                            className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/40 px-8 py-4 font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-900/80 hover:text-white"
                        >
                            Earn While Traveling
                        </button>
                    </motion.div>

                    {/* STATS / TRUST SECTION */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-8"
                    >
                        {[
                            { label: "Active Nodes", val: "12K+" },
                            { label: "Secure Escrows", val: "100%" },
                            { label: "City coverage", val: "240+" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-xl font-bold text-white md:text-2xl">{stat.val}</p>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* RIGHT VISUAL CANVAS */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative hidden lg:col-span-5 lg:block xl:col-span-6 h-[620px]"
                >
                    {/* Main Network Core Widget */}
                    <div className="absolute left-1/2 top-1/2 w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-200">Unified Grid</h3>
                                    <p className="text-xs text-slate-500">Live infrastructure mapping</p>
                                </div>
                            </div>
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                        </div>

                        <div className="mt-5 space-y-3.5">
                            {[
                                "Traveler Ecosystem Integration",
                                "Hub Automated Sorting",
                                "Cryptographic Route Proofing",
                                "Instant Settlement Engine",
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-lg bg-slate-950/40 p-2.5 border border-slate-900/50">
                                    <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                                    <p className="text-xs font-medium text-slate-300">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Feature Node Elements */}
                    {floatingCards.map((card, index) => {
                        const layoutStyles = [
                            "left-4 top-4",
                            "right-4 top-12",
                            "left-0 bottom-12",
                            "right-2 bottom-4",
                        ];

                        return (
                            <motion.div
                                key={card.title}
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 5 + index,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className={`absolute ${layoutStyles[index]} w-56 rounded-2xl border border-slate-800/60 bg-gradient-to-b ${card.color} p-4 shadow-xl backdrop-blur-md transition-colors hover:border-slate-700`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950/80 text-slate-200 border border-slate-800">
                                        <card.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200">{card.title}</h4>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{card.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;