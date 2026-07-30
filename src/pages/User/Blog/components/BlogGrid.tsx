import BlogCard from "./BlogCard";
import { blogs } from "../data/blogs";

const BlogGrid = () => {
    const articles = blogs.filter((blog) => !blog.featured);

    return (
        <section className="bg-slate-900 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-12 text-center">
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                        Latest Articles
                    </span>

                    <h2 className="mt-6 text-4xl font-black text-white">
                        Explore More Topics
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
                        Discover articles covering logistics, software architecture,
                        cloud deployment, security, and modern web development.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {articles.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BlogGrid;