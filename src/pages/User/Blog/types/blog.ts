import type { LucideIcon } from "lucide-react";

export interface Blog {
    id: string;
    title: string;
    description: string;
    category: string;
    readTime: string;
    date: string;
    featured?: boolean;
    icon: LucideIcon;
}