import { ArrowRight, Package, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
              Our Services
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white lg:text-6xl">
              Smart Logistics
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Simplified
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              CarryGo offers flexible parcel delivery solutions through agency
              logistics, traveler-assisted delivery, shipment tracking, and
              secure payment management—all within a single platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Book a Parcel
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
              >
                Contact Us
              </Link>
            </div>

            {/* Small Highlights */}
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <h3 className="text-3xl font-bold text-blue-400">6</h3>
                <p className="text-slate-400">User Roles</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-400">2</h3>
                <p className="text-slate-400">Delivery Models</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-400">100%</h3>
                <p className="text-slate-400">TypeScript</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Card 1 */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="rounded-xl bg-blue-500/10 p-3">
                    <Package className="h-7 w-7 text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Parcel Booking
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Schedule parcel deliveries with flexible delivery options
                      and real-time tracking.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="rounded-xl bg-blue-500/10 p-3">
                    <Truck className="h-7 w-7 text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      Traveler Delivery
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Verified travelers can transport parcels securely while
                      travelling between locations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-8 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
                <h4 className="font-semibold text-blue-300">
                  Flexible Delivery Solutions
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Choose between agency logistics or traveler-assisted delivery
                  depending on your shipment requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;