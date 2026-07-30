import {
  ShieldCheck,
  Route,
  Clock3,
  Users,
  Wallet,
  BadgeCheck,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Authentication, authorization, and role-based access control help keep user accounts and operations secure.",
  },
  {
    icon: Route,
    title: "Flexible Delivery",
    description:
      "Choose between agency-managed logistics or traveler-assisted delivery depending on your delivery requirements.",
  },
  {
    icon: Clock3,
    title: "Real-Time Tracking",
    description:
      "Track parcel progress from booking to successful delivery through every stage of the journey.",
  },
  {
    icon: Users,
    title: "Multi-Role System",
    description:
      "Dedicated experiences for customers, travelers, agencies, hubs, workers, and administrators.",
  },
  {
    icon: Wallet,
    title: "Integrated Wallet",
    description:
      "Manage payments and wallet transactions through a simple and centralized interface.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Workflow",
    description:
      "Designed to simulate real-world logistics operations with organized parcel movement and delivery management.",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Why Choose CarryGo
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            Built Around a Better Delivery Experience
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo combines flexible delivery options, organized logistics
            management, and a seamless user experience into one modern platform.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                <reason.icon className="h-8 w-8 text-blue-400" />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-white">
                {reason.title}
              </h3>

              <p className="mt-5 leading-7 text-slate-400">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-24 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-slate-900 p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-3xl font-bold text-white">
                One Platform. Multiple Delivery Solutions.
              </h3>

              <p className="mt-5 leading-8 text-slate-300">
                Whether you need traditional agency logistics or
                traveler-assisted delivery, CarryGo provides flexible options
                while maintaining a consistent and user-friendly experience.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-slate-900 p-5 text-center">
                <h4 className="text-3xl font-black text-blue-400">2</h4>
                <p className="mt-2 text-slate-400">
                  Delivery Models
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-center">
                <h4 className="text-3xl font-black text-blue-400">6</h4>
                <p className="mt-2 text-slate-400">
                  User Roles
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-center">
                <h4 className="text-3xl font-black text-blue-400">10+</h4>
                <p className="mt-2 text-slate-400">
                  Core Modules
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-center">
                <h4 className="text-3xl font-black text-blue-400">100%</h4>
                <p className="mt-2 text-slate-400">
                  TypeScript
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;