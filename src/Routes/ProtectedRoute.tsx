import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { ROLES } from "../constants_Types/types/roles";


interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: (typeof ROLES)[keyof typeof ROLES];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {

  const { user } = useSelector((state: RootState) => state.userState);
  const { admin } = useSelector((state: RootState) => state.adminState);
  const { agency } = useSelector((state: RootState) => state.agencyState);
  const { hub } = useSelector((state: RootState) => state.hubState);

  console.log(user,admin,agency,hub)


  const allRoles: Partial<Record<(typeof ROLES)[keyof typeof ROLES], any>> = {
    [ROLES.USER]: user,
    [ROLES.ADMIN]: admin,
    [ROLES.AGENCY]: agency,
    [ROLES.HUB]:hub
  };

  const currentUser = allRoles[requiredRole];
  const isAuthenticated = !!currentUser;


  if (!isAuthenticated) {
    switch (requiredRole) {
      case ROLES.ADMIN:
        return <Navigate to="/admin/login" replace />;
      case ROLES.USER:
        return <Navigate to="/" replace />;
      case ROLES.AGENCY:
        return <Navigate to="/agency/login" />;
      case ROLES.HUB:
        return <Navigate to="/hub/login"/>
      default:
        return <Navigate to="/unauthorized" replace />;
    }
  }

  if (requiredRole !== currentUser?.role) {
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

  return <>{children}</>;
};

export default ProtectedRoute;
