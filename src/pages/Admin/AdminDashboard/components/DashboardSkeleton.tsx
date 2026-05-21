import { DashboardProvider } from "../../../../context/DashboardProvider";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";

export default function DashboardSkeleton() {

    return (
        <>
            <DashboardProvider role="admin">
                <DashboardLayout>


                    <div className="min-h-screen bg-[var(--color-background)]">

                        <div className="max-w-[1700px] mx-auto px-6 py-5 space-y-6 animate-pulse">

                            {/* FILTER BAR */}
                            <div
                                className="
                        h-24
                        rounded-2xl
                        bg-white
                        border border-[var(--color-border)]
                        "
                            />

                            {/* OVERVIEW CARDS */}
                            <div
                                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-5
                    gap-5
                    "
                            >
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="
                            h-32
                            rounded-2xl
                            bg-white
                            border border-[var(--color-border)]
                            "
                                    />
                                ))}
                            </div>

                            {/* CHARTS */}
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                                <div
                                    className="
                            h-[380px]
                            rounded-2xl
                            bg-white
                            border border-[var(--color-border)]
                            "
                                />

                                <div
                                    className="
                            h-[380px]
                        rounded-2xl
                        bg-white
                        border border-[var(--color-border)]
                        "
                                />
                            </div>

                            {/* TABLE */}
                            <div
                                className="
                    h-[500px]
                    rounded-2xl
                    bg-white
                    border border-[var(--color-border)]
                    "
                            />
                        </div>
                    </div>
                </DashboardLayout>
            </DashboardProvider>
        </>
    );
}