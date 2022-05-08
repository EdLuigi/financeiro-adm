import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ redirectPath, children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}
