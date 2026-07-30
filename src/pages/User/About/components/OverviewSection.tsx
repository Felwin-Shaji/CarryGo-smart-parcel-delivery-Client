import {
  Boxes,
  ShieldCheck,
  Cloud,
  Layers3,
  ArrowRight,
} from "lucide-react";

const highlights = [
  {
    icon: Layers3,
    title: "Clean Architecture",
    description:
      "Designed using Clean Architecture, SOLID principles, Repository Pattern, and Dependency Injection for a scalable and maintainable codebase.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Implements JWT authentication, Google OAuth, role-based authorization, and robust validation to secure application workflows.",
  },
  {
    icon: Cloud,
    title: "Cloud Deployment",
    description:
      "Deployed using Docker, Nginx, AWS EC2, Amazon S3, and CloudFront to simulate a production-ready environment.",
  },
  {
    icon: Boxes,
    title: "Modern Development",
    description:
      "Built with React, TypeScript, Tailwind CSS, Express.js, and MongoDB while following modern development practices.",
  },
];

const OverviewSection = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            About CarryGo
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-white lg:text-5xl">
            A Modern Logistics Platform Built for Learning
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo is a full-stack logistics platform developed as a portfolio
            project to explore enterprise application development using the
            MERN Stack. The project focuses on building scalable software,
            applying clean architecture principles, and solving real-world
            logistics workflows.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold text-white">
              What is CarryGo?
            </h3>

            <p className="mt-6 leading-8 text-slate-300">
              CarryGo provides a complete parcel delivery ecosystem where
              customers can book shipments, agencies manage operations, hubs
              coordinate logistics, travelers participate as delivery partners,
              and administrators oversee the entire platform.
            </p>

            <p className="mt-6 leading-8 text-slate-300">
              Beyond implementing features, the project emphasizes writing
              maintainable code, designing scalable backend architecture, and
              following industry-standard software engineering practices.
            </p>

            {/* Key Points */}
            <div className="mt-10 space-y-4">
              {[
                "Multi-role logistics platform",
                "End-to-end parcel management",
                "Scalable backend architecture",
                "Responsive user experience",
                "Cloud deployment on AWS",
                "Built entirely with TypeScript",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-4"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                  <item.icon className="h-7 w-7 text-blue-400" />
                </div>

                <h4 className="mt-6 text-xl font-semibold text-white">
                  {item.title}
                </h4>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statistics */}
        <div className="mt-24 grid grid-cols-2 gap-6 border-t border-slate-800 pt-12 md:grid-cols-4">
          <div className="text-center">
            <h3 className="text-4xl font-black text-blue-400">6</h3>
            <p className="mt-2 text-sm text-slate-400">User Roles</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-blue-400">10+</h3>
            <p className="mt-2 text-sm text-slate-400">Core Modules</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-blue-400">100%</h3>
            <p className="mt-2 text-sm text-slate-400">TypeScript</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-blue-400">MERN</h3>
            <p className="mt-2 text-sm text-slate-400">Technology Stack</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;