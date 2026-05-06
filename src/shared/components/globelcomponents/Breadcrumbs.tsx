import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

export default function Breadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <div className="w-full bg-blue-50 border-b border-blue-100">
      <nav className="px-6 py-1.5 flex items-center text-xs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={index} className="flex items-center">
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="text-blue-700 hover:text-blue-900 font-medium transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-semibold">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight className="mx-1.5 h-3.5 w-3.5 text-blue-300" />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}