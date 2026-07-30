import { ArrowRight, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center shadow-xl lg:p-16">
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            Explore CarryGo
          </span>

          <h2 className="mt-6 text-4xl font-black text-white lg:text-5xl">
            Interested in the Project?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            CarryGo demonstrates how modern web technologies and software
            engineering principles can be combined to build a scalable logistics
            platform. Feel free to explore the application or connect with me
            to discuss the project.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Explore Project
              <ArrowRight className="h-5 w-5" />
            </Link>

            <a
              href="https://github.com/Felwin-Shaji"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-7 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              <Github className="h-5 w-5" />
              View Source
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-7 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
            >
              <Mail className="h-5 w-5" />
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;