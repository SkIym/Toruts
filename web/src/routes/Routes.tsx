import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProfilePage from "../components/pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../components/pages/HomePage";
import { InfoForm } from "../components/templates/InfoForm";

import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";


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
                        <ProfilePage />
                    </ProtectedRoute>)
            },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
            {
                path: "info",
                element: (
                    <ProtectedRoute>
                        <InfoForm />
                    </ProtectedRoute>)
            },
        ],
    },
]);
