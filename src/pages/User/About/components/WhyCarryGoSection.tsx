import {
  Layers3,
  ShieldCheck,
  Code2,
  Cloud,
  Database,
  Rocket,
} from "lucide-react";

const highlights = [
  {
    icon: Layers3,
    title: "Scalable Architecture",
    description:
      "Designed using Clean Architecture and SOLID principles to keep the application modular, maintainable, and easy to extend.",
  },
  {
    icon: Code2,
    title: "Type-Safe Development",
    description:
      "Built entirely with TypeScript across the frontend and backend to improve reliability and reduce runtime errors.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Implements JWT authentication, Google OAuth, role-based authorization, and request validation.",
  },
  {
    icon: Database,
    title: "Efficient Data Management",
    description:
      "Uses MongoDB with Mongoose, optimized queries, indexing, and well-structured data models.",
  },
  {
    icon: Cloud,
    title: "Production Deployment",
    description:
      "Containerized with Docker and deployed on AWS using EC2, Nginx, S3, and CloudFront.",
  },
  {
    icon: Rocket,
    title: "Real-World Learning",
    description:
      "Created to gain practical experience in designing and developing enterprise-scale web applications.",
  },
];

const WhyCarryGoSection = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Why CarryGo?
          </span>

          <h2 className="mt-6 text-4xl font-black text-white">
            More Than Just Building Features
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo was developed to gain hands-on experience building a
            production-style logistics platform while applying modern software
            engineering principles, scalable architecture, and industry best
            practices.
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                <item.icon className="h-7 w-7 text-blue-400" />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h3 className="text-2xl font-bold text-white">
            Engineering First Approach
          </h3>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            The primary goal of CarryGo is not only to deliver application
            features but also to demonstrate clean code practices, scalable
            architecture, secure development, and production deployment. Every
            module was designed with maintainability and extensibility in mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyCarryGoSection;