import { Header } from '../../../components/Header';

const TravelerTripDetailsLoading = () => {
    return (
        <>
            <Header isLoggedIn />

            <div className="min-h-screen bg-gray-50 pt-24 px-6 pb-10 animate-pulse">

                <div className="max-w-7xl mx-auto space-y-6">

                    {/* HEADER SKELETON */}
                    <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-200 rounded" />
                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="h-5 w-60 bg-gray-200 rounded" />
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                            </div>
                            <div className="h-8 w-20 bg-gray-200 rounded" />
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="grid lg:grid-cols-3 gap-6">

                        {/* LEFT PANEL */}
                        <div className="space-y-6">

                            {/* Trip Card */}
                            <div className="bg-white border rounded-2xl p-5 space-y-3">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-5 w-48 bg-gray-200 rounded" />
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                            </div>

                            {/* Capacity Card */}
                            <div className="bg-white border rounded-2xl p-5 space-y-4">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                <div className="h-2 w-full bg-gray-200 rounded" />
                                <div className="h-2 w-full bg-gray-200 rounded" />
                                <div className="h-3 w-32 bg-gray-200 rounded" />
                            </div>

                            {/* Earnings Card */}
                            <div className="bg-white border rounded-2xl p-5 space-y-3">
                                <div className="h-3 w-28 bg-gray-200 rounded" />
                                <div className="h-6 w-32 bg-gray-200 rounded" />
                                <div className="flex gap-2">
                                    <div className="h-12 w-full bg-gray-200 rounded" />
                                    <div className="h-12 w-full bg-gray-200 rounded" />
                                </div>
                            </div>

                        </div>

                        {/* RIGHT PANEL */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* KPI Skeleton */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="bg-white border rounded-xl p-4 space-y-2">
                                        <div className="h-3 w-16 bg-gray-200 rounded" />
                                        <div className="h-5 w-10 bg-gray-200 rounded" />
                                    </div>
                                ))}
                            </div>

                            {/* Orders Skeleton */}
                            <div className="bg-white border rounded-2xl p-5 space-y-4">
                                <div className="h-4 w-32 bg-gray-200 rounded" />

                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="border rounded-lg p-4 space-y-2">
                                        <div className="h-3 w-40 bg-gray-200 rounded" />
                                        <div className="h-3 w-32 bg-gray-200 rounded" />
                                        <div className="h-2 w-full bg-gray-200 rounded" />
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default TravelerTripDetailsLoading