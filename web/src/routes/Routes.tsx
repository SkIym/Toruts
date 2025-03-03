import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import ProtectedRoute from "./ProtectedRoute";
import UserTypeProtectedRoute from "./UserTypeProtectedRoute";

import ProfilePage from "../components/pages/ProfilePage";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";
import InfoPage from "../components/pages/InfoPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <UserTypeProtectedRoute>
                            <ProfilePage />
                        </UserTypeProtectedRoute>
                    </ProtectedRoute>)
            },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
            {
                path: "info",
                element: (
                    <ProtectedRoute>
                        <InfoPage />
                    </ProtectedRoute>)
            },
        ],
    },
]);
