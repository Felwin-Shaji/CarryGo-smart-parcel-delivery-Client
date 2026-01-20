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
    <nav className="mb-4 flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.to ? (
            <Link
              to={item.to}
              className="hover:text-gray-900 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
