import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  resources: [
    { label: "Track Parcel", href: "/tracking" },
    { label: "Blog", href: "/blog" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};


const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-900 bg-slate-950 text-slate-400">
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_18px_rgba(59,130,246,0.45)]" />
              <h3 className="text-2xl font-black tracking-tight text-white">
                CarryGo
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              CarryGo is a logistics platform built as a learning project using
              the MERN stack. It connects customers, agencies, hubs, and
              travelers to deliver a modern parcel delivery experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-200">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-200">
              Resources
            </h4>

            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-200">
              Contact
            </h4>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-blue-400" />
                <span>Kerala, India</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-blue-400" />
                <span>carrygoo7@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 text-blue-400" />
                <span>+91 90728 95526</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-slate-900" />

        {/* Bottom */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} CarryGo. All rights reserved.
            </p>

            <p>
              Built as a portfolio and educational project using the MERN Stack.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;