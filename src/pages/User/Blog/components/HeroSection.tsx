const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-slate-900 py-28">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb20,transparent_40%)]" />

            <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
                    CarryGo Blog
                </span>

                <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight text-white md:text-6xl">
                    Insights, Engineering &
                    <span className="text-blue-500"> Logistics</span>
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                    Explore articles about parcel delivery, software architecture,
                    cloud deployment, TypeScript, React, Node.js, and the engineering
                    decisions behind building CarryGo.
                </p>

                <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
                    Browse Articles
                </button>

            </div>
        </section>
    );
};

export default HeroSection;