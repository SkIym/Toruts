import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store";

type Props = { children: React.ReactNode };

const UserTypeProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);
    
    return user?.userType !== null ? (
        <>{children}</>
    ) : (
        <Navigate to="/info" state={{ from: location }} replace />
    );
};

export default UserTypeProtectedRoute;