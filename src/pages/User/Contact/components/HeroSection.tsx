import { Mail, ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            <Mail className="h-4 w-4" />
            Contact CarryGo
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-6xl">
            We'd Love to
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you have questions about CarryGo, would like to discuss the
            project, report an issue, or simply share feedback, feel free to get
            in touch. Your suggestions and ideas are always welcome.
          </p>

          <div className="mt-12 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Get in Touch
              <ArrowDown className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;