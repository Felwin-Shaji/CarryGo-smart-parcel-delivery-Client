import {
  Package,
  Truck,
  Building2,
  Warehouse,
  Route,
  Wallet,
  Bell,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Parcel Booking",
    description:
      "Book parcel deliveries with flexible options, package details, and real-time status updates.",
  },
  {
    icon: Truck,
    title: "Traveler Delivery",
    description:
      "Verified travelers can accept delivery requests and earn rewards while travelling.",
  },
  {
    icon: Building2,
    title: "Agency Management",
    description:
      "Manage bookings, pricing, staff, and delivery operations from a dedicated dashboard.",
  },
  {
    icon: Warehouse,
    title: "Hub Operations",
    description:
      "Coordinate parcel movement between hubs and streamline shipment processing.",
  },
  {
    icon: Route,
    title: "Shipment Tracking",
    description:
      "Track parcel progress throughout the delivery journey with live status updates.",
  },
  {
    icon: Wallet,
    title: "Wallet & Payments",
    description:
      "Manage wallet balances, transactions, and secure payment workflows.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Receive important updates for bookings, deliveries, approvals, and shipment events.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Dedicated dashboards and permissions for customers, agencies, hubs, workers, travelers, and administrators.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Core Features
          </span>

          <h2 className="mt-6 text-4xl font-black text-white">
            Everything Needed for Modern Logistics
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo combines multiple logistics modules into one platform,
            providing a complete parcel delivery experience for every user role.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                <feature.icon className="h-7 w-7 text-blue-400" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;