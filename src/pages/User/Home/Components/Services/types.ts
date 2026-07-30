import type { LucideIcon } from "lucide-react";

export interface ServiceItem {
    title: string;
    description: string;
    buttonText: string;
    path: string;
    protected?: boolean;
    icon: LucideIcon;
}