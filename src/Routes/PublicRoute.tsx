import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store/store";
import { ROLES } from "../types/roles";

const PublicRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    switch (user.role) {
      case ROLES.USER:
        return <Navigate to="/user/home" replace />;
      case ROLES.AGENCY:
        return <Navigate to="/agency/dashboard" replace />;
      case ROLES.ADMIN:
        return <Navigate to="/admin/dashboard" replace />;
      case ROLES.HUB:
        return <Navigate to="/hub/dashboard" replace />;
      case ROLES.WORKER:
        return <Navigate to="/worker/dashboard" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
