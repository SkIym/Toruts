import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../app/store";
import { PATH } from "@/constants/constants";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
	const location = useLocation();
	const user = useSelector((state: RootState) => state.user);
    
	return user ? (
		<>{children}</>
	) : (
		<Navigate to={PATH.login} state={{ from: location }} replace />
	);
};

export default ProtectedRoute;