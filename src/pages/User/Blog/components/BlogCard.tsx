import type { Blog } from "../types/blog";

interface BlogCardProps {
    blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
    const Icon = blog.icon;

    return (
        <article
            className="
                group
                rounded-3xl
                border
                border-slate-800
                bg-slate-950
                p-8
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-blue-500/40
                hover:shadow-2xl
                hover:shadow-blue-500/10
            "
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                <Icon className="h-8 w-8 text-blue-400" />
            </div>

            <span className="mt-6 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-blue-400">
                {blog.category}
            </span>

            <h3 className="mt-5 text-2xl font-bold leading-snug text-white transition group-hover:text-blue-400">
                {blog.title}
            </h3>

            <p className="mt-4 line-clamp-3 leading-7 text-slate-400">
                {blog.description}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
            </div>

            {/* <Link
                to={`/blog/${blog.id}`}
                className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-400 transition group-hover:gap-3"
            >
                Read Article
                <ArrowRight className="h-4 w-4" />
            </Link> */}
        </article>
    );
};

export default BlogCard;