import {
  Building2,
  PackageCheck,
  ShieldCheck,
  Truck,
  UserCog,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const ecosystem = [
  {
    title: "Customers",
    description: "Book deliveries dynamically and manage cross-country parcels with frictionless real-time tracking visibility.",
    icon: Users,
    gridClass: "md:col-span-2",
    accent: "from-blue-500/20 via-cyan-500/5 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    title: "Travelers",
    description: "Monetize your journey by securely carrying verified parcels matching your transit route.",
    icon: PackageCheck,
    gridClass: "md:col-span-1",
    accent: "from-emerald-500/20 via-teal-500/5 to-transparent",
    iconColor: "text-emerald-400"
  },
  {
    title: "Agencies",
    description: "Coordinate granular third-party logistics workflows and bulk distribution routes effortlessly.",
    icon: Building2,
    gridClass: "md:col-span-1",
    accent: "from-purple-500/20 via-pink-500/5 to-transparent",
    iconColor: "text-purple-400"
  },
  {
    title: "Hubs",
    description: "Manage distributed routing systems, immediate transit dispatches, and regional sortation nodes.",
    icon: Truck,
    gridClass: "md:col-span-2",
    accent: "from-amber-500/20 via-orange-500/5 to-transparent",
    iconColor: "text-amber-400"
  },
  {
    title: "Workers",
    description: "Handle local first/last-mile operations and systematic processing tasks securely.",
    icon: ShieldCheck,
    gridClass: "md:col-span-1",
    accent: "from-fuchsia-500/20 via-rose-500/5 to-transparent",
    iconColor: "text-fuchsia-400"
  },
  {
    title: "Admin Control",
    description: "Command complete operational overview, platform ledger settlement, and network-wide infrastructure compliance.",
    icon: UserCog,
    gridClass: "md:col-span-2",
    accent: "from-indigo-500/20 via-blue-500/5 to-transparent",
    iconColor: "text-indigo-400"
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white">
      {/* Background Gradients to match Hero Section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-3xl text-center space-y-5"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-400 backdrop-blur-md">
            Unified Logistics Ecosystem
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            One Core Network.<br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Multiple System Roles.
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
            CarryGo synchronizes independent network actors, logistics nodes, and fulfillment 
            agents into an immutable, unified delivery engine.
          </p>
        </motion.div>

        {/* ECOSYSTEM BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {ecosystem.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-900/20 p-8 backdrop-blur-xl ring-1 ring-slate-800/80 transition-all duration-300 hover:border-slate-700/60 hover:bg-slate-900/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] ${item.gridClass}`}
            >
              {/* Dynamic Role Aura Glow */}
              <div className={`absolute right-[-20px] top-[-20px] h-36 w-36 rounded-full bg-gradient-to-br ${item.accent} blur-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100`} />

              {/* CARD CONTAINER ACTION LINK */}
              <div className="absolute right-6 top-6 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-slate-500 hover:text-white">
                <ArrowUpRight size={18} />
              </div>

              {/* ICON BLOCK */}
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950/80 border border-slate-800 shadow-inner ${item.iconColor}`}>
                <item.icon size={22} />
              </div>

              {/* CONTENT SUMMARY */}
              <div className="mt-6 space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-100">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>
              </div>

              {/* MICROMOTION PROGRESS INDICATOR */}
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

export default FeaturesSection;