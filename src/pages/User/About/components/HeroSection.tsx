import { ArrowRight, Boxes, Github, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 backdrop-blur">
              <Rocket className="h-4 w-4" />
              MERN Stack Portfolio Project
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-tight tracking-tight text-white lg:text-6xl">
              Building the Future of
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Smart Parcel Delivery
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">
              CarryGo is a modern logistics platform developed as a portfolio
              project using the MERN Stack. It demonstrates scalable backend
              architecture, secure authentication, parcel booking, traveler
              delivery, shipment management, and cloud deployment using AWS.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="group rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-500">
                Explore Features
                <ArrowRight className="ml-2 inline h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-300 transition-all duration-300 hover:border-blue-500 hover:text-white">
                <Github className="mr-2 inline h-5 w-5" />
                View Source
              </button>
            </div>

            {/* Small Stats */}
            <div className="mt-14 grid grid-cols-3 gap-8 border-t border-slate-800 pt-8">
              <div>
                <h3 className="text-3xl font-bold text-blue-400">6</h3>
                <p className="mt-1 text-sm text-slate-400">
                  User Roles
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-400">10+</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Core Modules
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-400">100%</h3>
                <p className="mt-1 text-sm text-slate-400">
                  TypeScript
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            {/* Main Card */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20">
                  <Boxes className="h-7 w-7 text-blue-400" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    CarryGo Platform
                  </h3>

                  <p className="text-sm text-slate-400">
                    End-to-End Logistics Ecosystem
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  "Parcel Booking & Tracking",
                  "Traveler Delivery System",
                  "Agency & Hub Management",
                  "Wallet & Payments",
                  "Real-time Notifications",
                  "Admin Dashboard",
                  "AWS Cloud Deployment",
                  "Clean Architecture",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 transition hover:border-blue-500/40"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                    <span className="text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 rounded-2xl border border-blue-500/20 bg-slate-900/90 p-5 shadow-xl backdrop-blur">
              <p className="text-xs uppercase tracking-widest text-blue-400">
                Architecture
              </p>

              <h4 className="mt-2 text-lg font-bold text-white">
                Clean Architecture
              </h4>

              <p className="mt-1 text-sm text-slate-400">
                SOLID • Repository Pattern • Dependency Injection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;