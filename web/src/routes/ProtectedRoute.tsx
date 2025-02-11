import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    
    console.log("(protroute) hello", user)
    return user ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;