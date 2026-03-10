import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const SectionCard = ({ icon, title, subtitle, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-600">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default SectionCard;