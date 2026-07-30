import type { LucideIcon } from "lucide-react";

interface HeroFeatureProps {
    icon: LucideIcon;
    text: string;
}

const HeroFeature = ({
    icon: Icon,
    text,
}: HeroFeatureProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                <Icon className="h-4 w-4 text-[var(--color-accent)]" />
            </div>

            <span className="text-sm font-medium text-slate-200">
                {text}
            </span>
        </div>
    );
};

export default HeroFeature;