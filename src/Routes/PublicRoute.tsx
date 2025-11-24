import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";

const PublicRoute: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.userState);
  const { admin } = useSelector((state: RootState) => state.adminState);
  const { agency } = useSelector((state: RootState) => state.agencyState);
  const { hub } = useSelector((state: RootState) => state.hubState);


  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAgencyRoute = location.pathname.startsWith("/agency")
  const isHubRoute = location.pathname.startsWith("/hub")

  if (isAdminRoute) {
    if (admin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (isAgencyRoute) {
    if (agency) {
      return <Navigate to="/agency/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (isHubRoute) {
    if (hub) {
      return <Navigate to="/hub/dashboard" replace />
    }
    return <Outlet />
  }

  if (!isAdminRoute || !isAgencyRoute || !isHubRoute) {
    if (user) {
      return <Navigate to="/home" replace />;
    }
    return <Outlet />;
  }

  return <Outlet />;
};

export default PublicRoute;
