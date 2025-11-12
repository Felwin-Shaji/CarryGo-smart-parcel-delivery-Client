import React from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../core/store/store";
import { Navigate } from "react-router-dom";
import { ROLES } from "../types/roles";
import type { RootState } from "../store/store";
// import { ROLES } from "../core/types/roles";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
    const { user } = useSelector((state: RootState) => state.userState)
    const isAuthenticated = !!user
    if (!isAuthenticated) {
        return <Navigate to="/" replace />

    }

    if (requiredRole !== user?.role) {
        switch (user?.role) {
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
        };
    };
    return <>{children}</>
}

export default ProtectedRoute