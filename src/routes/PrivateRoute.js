import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/authContext";

export default function PrivateRoute({ redirectPath, children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}
