import { useNavigate } from "react-router-dom";

interface TravelerPartnerHeroProps {
  isLoggedIn?: boolean;
  kycStatus?: "PENDING" | "REGISTERED" | "APPROVED" | "REJECTED";
}


const TravelerPartnerHero = ({
  isLoggedIn = false,
  kycStatus,
}: TravelerPartnerHeroProps) => {
  const navigate = useNavigate();

  const handleCarryParcelClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (kycStatus !== "APPROVED") {
      navigate("/kyc-verification");
      return;
    }
    navigate("/travel/create-route");
  };

  return (
    <section
      className="relative min-h-screen w-full flex items-center"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(15, 15, 15, 0.51), rgba(15,15,15,0.4)), url('/src/assets/traveler-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl text-white space-y-6">

          {/* Badge */}
          <span className="inline-block rounded-full bg-[var(--color-accent)]/20 px-4 py-1 text-sm font-semibold text-[var(--color-accent)]">
            Traveler Delivery Program
          </span>

          {/* Heading */}
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold leading-tight tracking-tight">
            Traveling anyway?
            <span className="block text-[var(--color-accent)]">
              Carry a parcel. Earn on the way.
            </span>
          </h1>

          {/* Description */}
          <p className="max-w-lg text-base md:text-lg text-gray-200 leading-relaxed">
            If you’re traveling for work, studies, or personal reasons,
            CarryGo lets you deliver parcels along your route and earn to
            cover your travel expenses.
          </p>

          {/* Highlights */}
          <div className="flex gap-6 pt-4 text-sm text-gray-200">
            <div>
              <p className="text-xl font-bold text-white">No extra trips</p>
              <p>deliver on your route</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Verified users</p>
              <p>safe & trusted</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Flexible</p>
              <p>travel-based earning</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <button
              onClick={handleCarryParcelClick}
              className="rounded-full bg-[var(--color-accent)]
                         px-8 py-3 font-semibold text-black
                         hover:opacity-90 transition"
            >
              Carry a Parcel & Earn
            </button>

            <p className="mt-2 text-xs text-gray-300">
              {kycStatus === "APPROVED"
                ? "Create your travel route and start earning"
                : "KYC verification required to ensure safety"}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TravelerPartnerHero;
