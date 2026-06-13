import {
  ArrowRight,
  Building2,
  ShieldCheck,
  Truck,
  UserCog,
  Users,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

const portals = [
  {
    title: "Customer Portal",
    description: "Book regional orders, coordinate trackings, and manage systemic personal logistics delivery profiles.",
    icon: Users,
    route: "/login",
    gridClass: "md:col-span-2",
    accent: "from-blue-500/20 via-indigo-500/5 to-transparent",
    iconColor: "text-blue-400",
  },
  {
    title: "Agency Operations",
    description: "Coordinate cross-docking workflows, handle vendor allocations, and track regional hub inventory streams.",
    icon: Building2,
    route: "/agency/login",
    gridClass: "md:col-span-1",
    accent: "from-purple-500/20 via-pink-500/5 to-transparent",
    iconColor: "text-purple-400",
  },
  {
    title: "Hub Management",
    description: "Manage regional sortation matrices, real-time fleet assignments, and automated delivery dispatches.",
    icon: Truck,
    route: "/hub/login",
    gridClass: "md:col-span-1",
    accent: "from-amber-500/20 via-orange-500/5 to-transparent",
    iconColor: "text-amber-400",
  },
  {
    title: "Worker Access",
    description: "Process live distribution tickets, record route completions, and track performance payouts.",
    icon: ShieldCheck,
    route: "/worker/login",
    gridClass: "md:col-span-1",
    accent: "from-emerald-500/20 via-teal-500/5 to-transparent",
    iconColor: "text-emerald-400",
  },
  {
    title: "Admin Control",
    description: "Access complete ecosystem settings, cryptographic ledger updates, and architecture node scaling protocols.",
    icon: UserCog,
    route: "/admin/login",
    gridClass: "md:col-span-1",
    accent: "from-rose-500/20 via-red-500/5 to-transparent",
    iconColor: "text-rose-400",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

const AccessPortalPage = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-20 text-white">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-5%] top-[-5%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute right-[-5%] bottom-[-5%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
      </div>

      {/* Structured Layout Canvas Grid */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px), 
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* HEADER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-400 backdrop-blur-md">
            <ShieldCheck size={14} />
            Secure Gateway Infrastructure
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Access CarryGo <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Network Portals
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400">
            Secure multi-role clearance pipelines for managing localized hubs, active delivery networks,
            and platform-wide infrastructure nodes.
          </p>
        </motion.div>

        {/* PORTAL INTERACTIVE ASYMMETRIC BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {portals.map((portal) => (
            <motion.div
              key={portal.title}
              variants={itemVariants}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/20 p-8 backdrop-blur-xl ring-1 ring-slate-800/80 transition-all duration-300 hover:border-slate-700/60 hover:bg-slate-900/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${portal.gridClass}`}
            >
              {/* Specialized Dynamic Aura Glow */}
              <div className={`absolute right-[-30px] top-[-30px] h-36 w-36 rounded-full bg-gradient-to-br ${portal.accent} blur-2xl transition-opacity duration-500 opacity-50 group-hover:opacity-100`} />

              {/* CORE METADATA */}
              <div>
                {/* ICON ASSET */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner ${portal.iconColor}`}>
                  <portal.icon size={22} />
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-slate-100">
                    {portal.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
                    {portal.description}
                  </p>
                </div>
              </div>

              {/* ROUTE CTAS */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => navigate(portal.route)}
                  className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-950 border border-slate-800 px-5 py-3 text-xs font-semibold text-slate-200 shadow-inner transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 hover:text-white active:scale-95"
                >
                  Enter Gateway
                  <ArrowRight size={14} className="text-slate-500 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
                </button>
              </div>

              {/* MICROMOTION UNDERLINE ACTIVE BAR */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900">
                <div className="h-full w-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AccessPortalPage;