export default function AgencyFooter() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-gray-300">
      
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-3">

        {/* Brand */}
        <div>
          <p className="text-lg font-bold text-white">
            CarryGo <span className="text-[var(--color-accent)]">Agency</span>
          </p>

          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            A modern logistics platform helping agencies scale faster
            with smart routing and verified bookings.
          </p>
        </div>

        {/* Product */}
        <div>
          <p className="mb-4 font-semibold text-white">Product</p>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">How it Works</li>
            <li className="hover:text-white cursor-pointer">Pricing</li>
            <li className="hover:text-white cursor-pointer">Partner Program</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="mb-4 font-semibold text-white">Company</p>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CarryGo. All rights reserved.
      </div>
    </footer>
  );
}
