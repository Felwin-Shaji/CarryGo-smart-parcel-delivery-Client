import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgencyCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-950 py-28">

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[180px]" />

      <div className="relative mx-auto max-w-5xl px-6">

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#102467] to-[#1E3A8A] p-16 text-center shadow-2xl">

          <h2 className="text-5xl font-bold text-white">
            Ready to Grow
            <span className="block text-yellow-400">
              Your Logistics Business?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Join CarryGo today and streamline your logistics operations,
            manage deliveries efficiently, and grow your agency with confidence.
          </p>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/agency/registration")}
              className="group flex items-center gap-3 rounded-xl bg-yellow-400 px-8 py-4 text-lg font-semibold text-slate-900 transition hover:bg-yellow-300"
            >
              Become a Partner

              <ArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-8">

            <Benefit text="Free Registration" />

            <Benefit text="Fast Verification" />

            <Benefit text="Secure Payments" />

          </div>

        </div>

      </div>
    </section>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-white">
      <CheckCircle2
        size={18}
        className="text-yellow-400"
      />

      <span>{text}</span>
    </div>
  );
}