import { NavLink, Outlet } from "react-router-dom";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { DashboardProvider } from "../../context/DashboardProvider";

export default function AdminPricingLayout() {
  return (
    <DashboardProvider role="admin">
      <DashboardLayout pageTitle="Pricing Management">
        <div className="container max-w-5xl space-y-8">

          {/* Modern Tabs */}
          <div className="relative">

            {/* Background */}
            <div className="bg-gray-100 p-1 rounded-xl inline-flex gap-1 shadow-inner">

              <NavLink
                to="agency"
                className={({ isActive }) =>
                  `relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                Agency Pricing
              </NavLink>

              <NavLink
                to="traveler"
                className={({ isActive }) =>
                  `relative px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                  }`
                }
              >
                Traveler Pricing
              </NavLink>

            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <Outlet />
          </div>

        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
}
