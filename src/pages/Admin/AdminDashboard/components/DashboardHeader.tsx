import { CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Admin Dashboard
        </h1>

        <p className="text-[var(--color-text-muted)] mt-1">
          Monitor platform analytics and operations
        </p>
      </div>

      <button className="flex items-center gap-2">
        <CalendarDays size={18} />
        Last 30 Days
      </button>
    </div>
  );
}