import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROLES } from "../types/roles";
import type { RootState } from "../store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: (typeof ROLES)[keyof typeof ROLES];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {

  const { user } = useSelector((state: RootState) => state.userState);
  const { admin, accessToken } = useSelector((state: RootState) => state.adminState);

  console.log(admin, accessToken)

  const allRoles: Partial<Record<(typeof ROLES)[keyof typeof ROLES], any>> = {
    [ROLES.USER]: user,
    [ROLES.ADMIN]: admin,
  };

  const currentUser = allRoles[requiredRole];
  const isAuthenticated = !!currentUser;

  console.log("🛡️ ProtectedRoute -> role:", requiredRole, "| isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("🚫 Redirecting - no session for", requiredRole);
    switch (requiredRole) {
      case ROLES.ADMIN:
        return <Navigate to="/admin/login" replace />;
      case ROLES.USER:
        return <Navigate to="/" replace />;
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  if (requiredRole !== currentUser?.role) {
    console.log("⚠️ Role mismatch -> redirecting to their dashboard:", currentUser?.role);
    switch (currentUser?.role) {
      case ROLES.USER:
        return <Navigate to="/home" replace />;
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

  console.log("✅ Access granted for:", requiredRole);
  return <>{children}</>;
};

export default ProtectedRoute;
