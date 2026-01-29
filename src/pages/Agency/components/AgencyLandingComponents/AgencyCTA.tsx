import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AgencyCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[var(--color-primary)] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Grow with CarryGo?
        </h2>

        <p className="mt-6 text-gray-200">
          Join our network of logistics partners and start receiving
          bookings within days.
        </p>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/agency/registration")}
            className="
              group
              flex items-center gap-2
              px-8 py-4
              rounded-lg
              font-semibold
              bg-[var(--color-accent)]
              text-[var(--color-primary)]
              transition-colors duration-200
              hover:bg-[var(--color-primary-dark)]
              hover:text-[var(--color-accent)]
            "
          >
            Become a Partner
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
