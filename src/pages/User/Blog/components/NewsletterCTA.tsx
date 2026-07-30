import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const NewsletterCTA = () => {
    return (
        <section className="bg-slate-900 py-24">
            <div className="mx-auto max-w-5xl px-6">

                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-12 text-center">

                    {/* Background Glow */}
                    <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
                    <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

                    <div className="relative">

                        <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
                            Let's Connect
                        </span>

                        <h2 className="mt-6 text-4xl font-black text-white">
                            Interested in CarryGo?
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Thanks for exploring the CarryGo engineering blog.
                            If you'd like to discuss the project, share feedback,
                            or collaborate on future opportunities, I'd love to hear from you.
                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                            >
                                <Mail className="h-5 w-5" />
                                Contact Me
                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-blue-500 hover:bg-slate-900"
                            >
                                Learn More
                                <ArrowRight className="h-5 w-5" />
                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default NewsletterCTA;