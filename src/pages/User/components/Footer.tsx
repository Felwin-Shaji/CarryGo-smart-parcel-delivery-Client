import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Activity,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#", badge: "Hiring" },
    { label: "Blog", href: "#" },
    { label: "Partner with us", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Refund Policy", href: "#" },
  ],
  legal: [
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Payment Policy", href: "#" },
    { label: "KYC Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-400 border-t border-slate-900">
      {/* Background Micro Glow */}
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        
        {/* TOP LAYOUT GRID */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-5 lg:gap-8">
          
          {/* BRAND COLUMN */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
              <h3 className="text-xl font-black text-white tracking-tight">CarryGo</h3>
            </div>
            
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Frictionless crowd-sourced logistics connecting customers, travelers, and local hubs 
              into an encrypted tracking distribution engine.
            </p>

            {/* Live Infrastructure Status */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 border border-slate-900 px-3 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-sm">
              <Activity size={12} className="animate-pulse" />
              All Systems Operational (99.98%)
            </div>
          </div>

          {/* COMPANY LINKS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="group flex items-center gap-1.5 text-sm hover:text-white transition-colors duration-200">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-blue-400">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT LINKS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL LINKS */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* INTERMEDIATE BORDER LINE */}
        <div className="my-12 border-t border-slate-900" />

        {/* BOTTOM METADATA BAR */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            <p>© {new Date().getFullYear()} CarryGo Inc. Engineered for hyper-scale distribution.</p>
          </div>

          {/* SOCIAL PLATFORM HANDLES */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-900 text-slate-400 transition-all duration-200 hover:border-slate-800 hover:bg-slate-900/60 hover:text-white"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;