import { Building2, TrendingUp, MapPin, ShieldCheck } from "lucide-react";

export default function AgencyBenefits() {
  return (
    <section
      className="
        relative
        min-h-[calc(100vh-80px)]
        py-32
        flex items-center
        bg-cover bg-center
      "
      style={{
        backgroundImage: "url('/src/assets/agency-benefits.jpg')",
      }}
    >
      {/* Overlay (lighter than hero) */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">

        {/* Heading */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)]">
            Built for Logistics Agencies
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Everything you need to operate, scale, and grow your logistics
            business — without complexity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <BenefitCard
            icon={<Building2 size={28} />}
            title="Centralized Hub Management"
            desc="Manage all hubs, staff, and service areas from one dashboard."
          />
          <BenefitCard
            icon={<TrendingUp size={28} />}
            title="Consistent Revenue"
            desc="Receive verified bookings directly from CarryGo users."
          />
          <BenefitCard
            icon={<MapPin size={28} />}
            title="Smart Serviceability"
            desc="Auto-match deliveries based on hub location and pincode."
          />
          <BenefitCard
            icon={<ShieldCheck size={28} />}
            title="Trusted Platform"
            desc="Secure payments, role-based access, and audit-ready data."
          />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div
      className="
        p-8
        rounded-2xl
        bg-white
        shadow-lg
        hover:shadow-xl
        transition
      "
    >
      <div className="mb-6 text-[var(--color-primary)]">
        {icon}
      </div>

      <h3 className="font-semibold text-xl text-[var(--color-primary)]">
        {title}
      </h3>

      <p className="mt-4 text-base text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
