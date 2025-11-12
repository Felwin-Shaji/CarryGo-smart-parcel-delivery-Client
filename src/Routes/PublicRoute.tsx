import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";

const PublicRoute: React.FC = () => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.userState);
  const { admin } = useSelector((state: RootState) => state.adminState);

  const isAdminRoute = location.pathname.startsWith("/admin");

  console.log("isAdminRoute:", isAdminRoute, "| user:", !!user, "| admin:", !!admin);

  if (isAdminRoute) {
    if (admin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Outlet />;
  }

  if (!isAdminRoute) {
    if (user) {
      return <Navigate to="/home" replace />;
    }
    return <Outlet />;
  }

  return <Outlet />;
};

export default PublicRoute;
