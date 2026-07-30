import {
  PackagePlus,
  Building2,
  Warehouse,
  Truck,
  CheckCircle2,
  User,
  Car,
  Shield,
} from "lucide-react";

const workflow = [
  {
    icon: PackagePlus,
    title: "Book Parcel",
    description:
      "Customers create parcel bookings by providing pickup, destination, and package details.",
  },
  {
    icon: Building2,
    title: "Agency / Traveler",
    description:
      "Bookings are assigned either to a logistics agency or an approved traveler based on the selected delivery option.",
  },
  {
    icon: Warehouse,
    title: "Hub Processing",
    description:
      "Agencies coordinate parcel movement through hubs for sorting and shipment management.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Workers or travelers complete the delivery while customers receive tracking updates.",
  },
  {
    icon: CheckCircle2,
    title: "Completed",
    description:
      "The parcel reaches its destination and the delivery is successfully completed.",
  },
];

const roles = [
  {
    icon: User,
    title: "Customer",
  },
  {
    icon: Car,
    title: "Traveler",
  },
  {
    icon: Building2,
    title: "Agency",
  },
  {
    icon: Warehouse,
    title: "Hub",
  },
  {
    icon: Truck,
    title: "Worker",
  },
  {
    icon: Shield,
    title: "Administrator",
  },
];

const WorkflowSection = () => {
  return (
    <section className="bg-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-black text-white">
            How CarryGo Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo brings together multiple user roles to manage the complete
            parcel delivery lifecycle, from booking to successful delivery.
          </p>
        </div>

        {/* Workflow */}
        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-5">
            {workflow.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-800 bg-slate-950 p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <step.icon className="h-7 w-7 text-blue-400" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>

                {index < workflow.length - 1 && (
                  <div className="absolute -right-4 top-10 hidden h-0.5 w-8 bg-blue-500/30 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mt-24">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white">
              Supported User Roles
            </h3>

            <p className="mt-4 text-slate-400">
              Each role has dedicated permissions and dashboards tailored to its
              responsibilities.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-center transition-all hover:-translate-y-1 hover:border-blue-500/40"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10">
                  <role.icon className="h-7 w-7 text-blue-400" />
                </div>

                <h4 className="mt-5 font-semibold text-white">
                  {role.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;