import {
  Package,
  Truck,
  Building2,
  Warehouse,
  MapPinned,
  Wallet,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Parcel Booking",
    description:
      "Create parcel bookings with flexible delivery options, package details, and convenient pickup and destination management.",
  },
  {
    icon: Truck,
    title: "Traveler Delivery",
    description:
      "Verified travelers can accept delivery requests and transport parcels while travelling between locations.",
  },
  {
    icon: Building2,
    title: "Agency Logistics",
    description:
      "Logistics agencies manage bookings, pricing, workers, deliveries, and operational workflows from one dashboard.",
  },
  {
    icon: Warehouse,
    title: "Hub Management",
    description:
      "Coordinate parcel sorting, shipment transfers, and hub operations to ensure smooth parcel movement.",
  },
  {
    icon: MapPinned,
    title: "Parcel Tracking",
    description:
      "Monitor parcel status throughout every stage of the delivery journey with clear tracking updates.",
  },
  {
    icon: Wallet,
    title: "Wallet & Payments",
    description:
      "Secure wallet management and payment workflows for booking charges and delivery-related transactions.",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Our Services
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            Everything You Need for Parcel Delivery
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo provides a complete set of logistics services designed for
            customers, travelers, agencies, and logistics operators within one
            unified platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors duration-300 group-hover:bg-blue-500/20">
                <service.icon className="h-8 w-8 text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="mt-8 text-2xl font-bold text-white">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-5 leading-7 text-slate-400">
                {service.description}
              </p>

            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-950 p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-3xl font-bold text-white">
                Flexible Delivery Options
              </h3>

              <p className="mt-5 leading-8 text-slate-300">
                CarryGo supports both traditional agency logistics and
                traveler-assisted delivery, allowing users to choose the most
                suitable delivery method based on their needs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                <h4 className="text-3xl font-black text-blue-400">2</h4>
                <p className="mt-2 text-slate-400">Delivery Models</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                <h4 className="text-3xl font-black text-blue-400">6</h4>
                <p className="mt-2 text-slate-400">User Roles</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                <h4 className="text-3xl font-black text-blue-400">10+</h4>
                <p className="mt-2 text-slate-400">Core Modules</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                <h4 className="text-3xl font-black text-blue-400">24/7</h4>
                <p className="mt-2 text-slate-400">Project Availability*</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            *This portfolio project is available for demonstration purposes and
            does not represent a commercial logistics service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;