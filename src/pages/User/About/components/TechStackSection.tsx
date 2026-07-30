import {
  Monitor,
  Server,
  Database,
  Cloud,
} from "lucide-react";

const techStacks = [
  {
    icon: Monitor,
    title: "Frontend",
    description: "Modern, responsive user interfaces built with reusable components.",
    technologies: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Router",
      "Tailwind CSS",
      "Vite",
    ],
  },
  {
    icon: Server,
    title: "Backend",
    description: "Scalable server-side architecture following industry best practices.",
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "JWT Authentication",
      "Google OAuth",
      "REST API",
    ],
  },
  {
    icon: Database,
    title: "Database",
    description: "Reliable data storage with optimized queries and schema design.",
    technologies: [
      "MongoDB",
      "Mongoose",
      "Aggregation Pipeline",
      "Indexes",
      "Transactions",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "Production-style deployment using cloud infrastructure.",
    technologies: [
      "AWS EC2",
      "Amazon S3",
      "CloudFront",
      "Docker",
      "Nginx",
      "GitHub",
    ],
  },
];

const TechStackSection = () => {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Technology Stack
          </span>

          <h2 className="mt-6 text-4xl font-black text-white">
            Built with Modern Technologies
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            CarryGo combines modern frontend, backend, database, and cloud
            technologies to create a scalable and maintainable logistics
            platform.
          </p>
        </div>

        {/* Stack Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {techStacks.map((stack) => (
            <div
              key={stack.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
                <stack.icon className="h-7 w-7 text-blue-400" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {stack.title}
              </h3>

              <p className="mt-3 text-slate-400 leading-7">
                {stack.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {stack.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-blue-500 hover:text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;