import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgencyFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/10 bg-[#081225]">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-3">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A]">
                <Building2 className="text-white" size={28} />
              </div>

              <div>

                <h3 className="text-3xl font-bold text-white">
                  CarryGo
                </h3>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                  Agency Portal
                </p>

              </div>

            </div>

            <p className="mt-8 max-w-md leading-8 text-slate-400">
              CarryGo helps logistics agencies streamline
              deliveries, manage hubs, coordinate workers,
              receive verified bookings and grow their business
              through one modern logistics platform.
            </p>



          </div>


          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Access Portals
            </h4>

            <ul className="space-y-4">

              <FooterButton
                label="Agency Portal"
                onClick={() => navigate("/agency/login")}
              />

              <FooterButton
                label="Hub Portal"
                onClick={() => navigate("/hub/login")}
              />

              <FooterButton
                label="Worker Portal"
                onClick={() => navigate("/worker/login")}
              />

            </ul>

          </div>

          {/* Company */}

          <div>

            <h4 className="mb-6 text-lg font-semibold text-white">
              Company
            </h4>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-slate-400">

                <Mail size={18} />

                carrygoo7@gmail.com

              </div>

              <div className="flex items-center gap-3 text-slate-400">

                <Phone size={18} />

                +91 90728 95526

              </div>

              <div className="flex items-center gap-3 text-slate-400">

                <MapPin size={18} />

                Kerala, India

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-1 flex flex-col items-center justify-between gap-6 border-t border-white/10 text-sm text-slate-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} CarryGo. All rights
            reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}


function FooterButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex items-center gap-2 text-slate-400 transition hover:text-yellow-400"
      >
        {label}

        <ArrowUpRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </li>
  );
}