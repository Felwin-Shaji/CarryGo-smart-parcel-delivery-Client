import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const FeaturedArticle = () => {
    const article = blogs.find((blog) => blog.featured);

    if (!article) return null;

    const Icon = article.icon;

    return (
        <section className="bg-slate-900 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-10 flex justify-center">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
                        ⭐ Featured Article
                    </span>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">

                    {/* Background Glow */}

                    <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
                    <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-indigo-600/10 blur-3xl" />

                    <div className="relative grid items-center gap-16 p-12 lg:grid-cols-2">

                        {/* Left */}

                        <div className="flex justify-center">

                            <div className="flex h-48 w-48 items-center justify-center rounded-[2rem] border border-blue-500/20 bg-blue-500/10 shadow-2xl">

                                <Icon className="h-24 w-24 text-blue-400" />

                            </div>

                        </div>

                        {/* Right */}

                        <div>

                            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                                {article.category}
                            </span>

                            <h2 className="mt-6 text-5xl font-black leading-tight text-white">
                                {article.title}
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-300">
                                {article.description}
                            </p>

                            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">

                                <span>{article.date}</span>

                                <span>•</span>

                                <span>{article.readTime}</span>

                            </div>

                            <Link
                                to={`/blog/${article.id}`}
                                className="group mt-10 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition duration-300 hover:bg-blue-700"
                            >
                                Read Article

                                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />

                            </Link>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default FeaturedArticle;