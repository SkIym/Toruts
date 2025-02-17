import { createBrowserRouter } from "react-router-dom";
import { SignUpForm } from "../components/SignupForm";
import LoginForm from "../components/LoginForm";
import App from "../App";
import ProfilePage from "../components/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../components/HomePage";
import { InfoForm } from "../components/InfoForm";

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
            { path: "login", element: <LoginForm /> },
            { path: "signup", element: <SignUpForm /> },
            { path: "info", element: <InfoForm /> },
        ],
    },
]);
