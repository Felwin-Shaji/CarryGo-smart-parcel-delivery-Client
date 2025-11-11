import { motion } from "framer-motion";
import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-secondary)] text-[var(--color-text)] overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="CarryGo Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-[var(--color-primary)]">CarryGo</h1>
        </div>

        <nav className="hidden md:flex gap-8 font-medium text-gray-700">
          <a href="#" className="hover:text-[var(--color-primary)]">Home</a>
          <a href="#about" className="hover:text-[var(--color-primary)]">About</a>
          <a href="#contact" className="hover:text-[var(--color-primary)]">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="bg-[var(--color-accent)] hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-sm"
          >
            Book Now
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full font-medium hover:bg-[var(--color-primary-dark)]">
              <span>Felwin</span>
              <img src="/user-icon.svg" alt="User" className="w-6 h-6 rounded-full" />
            </button>

            <div className="absolute hidden group-hover:block right-0 bg-white rounded-md shadow-lg mt-2 text-sm text-gray-700 w-36 border">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center h-screen w-full pt-20"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <img
          src="/truck-bg.jpg"
          alt="CarryGo Truck"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/60 to-[var(--color-primary-dark)]/80" />

        <div className="relative z-10 px-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Moving made simple, from your query to your doorstep.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100 max-w-2xl mx-auto mb-8 text-base md:text-lg"
          >
            Reliable, fast, and secure parcel delivery system designed for agencies, hubs, and customers across India.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[var(--color-accent)] text-black font-bold rounded-full shadow-md hover:bg-yellow-400 transition"
          >
            Book Now
          </motion.button>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 px-8 bg-[var(--color-secondary)]"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[var(--color-primary)]">
          Our Key Services
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Truck className="w-10 h-10 text-[var(--color-primary)]" />,
              title: "Express Delivery",
              desc: "Deliver parcels faster with optimized routes and live tracking.",
            },
            {
              icon: <MapPin className="w-10 h-10 text-yellow-600" />,
              title: "Live Tracking",
              desc: "Track your parcel in real time with GPS-enabled monitoring.",
            },
            {
              icon: <Clock className="w-10 h-10 text-orange-500" />,
              title: "24/7 Support",
              desc: "Our dedicated team ensures assistance at every step.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-green-600" />,
              title: "Secure Handling",
              desc: "Verified and safe handling from pickup to delivery.",
            },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white shadow-sm hover:shadow-lg rounded-2xl border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-[var(--color-primary-dark)]">
                {service.title}
              </h4>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-primary-dark)] text-white px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div>
            <h4 className="text-2xl font-bold mb-4 text-[var(--color-accent)]">
              CarryGo
            </h4>
            <p className="text-gray-300 mb-4">
              Making logistics simple, reliable, and fast across India.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Company</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Tracking</a></li>
              <li><a href="#">Agencies</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Support</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-3">Domestic Cities</h5>
            <ul className="space-y-2 text-gray-300">
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Bangalore</li>
              <li>Hyderabad</li>
              <li>Chennai</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-400 mt-12 text-sm border-t border-white/10 pt-6">
          © {new Date().getFullYear()} CarryGo Pvt. Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
