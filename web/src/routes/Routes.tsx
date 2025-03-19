import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import ProtectedRoute from "./ProtectedRoute";
import UserTypeProtectedRoute from "./UserTypeProtectedRoute";

import ProfilePage from "../components/pages/ProfilePage";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import SignupPage from "../components/pages/SignupPage";
import InfoPage from "../components/pages/ProfileEditPage";
import SelectPage from "../components/pages/SelectPage";
import { UserType } from "../types";
import { PATH } from "@/constants";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            {
                path: PATH.PROFILE.default,
                element: (
                    <ProtectedRoute>
                        <UserTypeProtectedRoute>
                            <ProfilePage />
                        </UserTypeProtectedRoute>
                    </ProtectedRoute>)
            },
            { path: PATH.login, element: <LoginPage /> },
            { path: PATH.SIGNUP.default, element: <SignupPage type={null}/> },
            { path: PATH.select, element: <SelectPage /> },
            { path: PATH.SIGNUP.tutor, element: <SignupPage type={UserType.TUTOR}/>},
            { path: PATH.SIGNUP.student, element: <SignupPage type={UserType.STUDENT}/>},
            {
                path: PATH.PROFILE.edit,
                element: (
                    <ProtectedRoute>
                        <InfoPage />
                    </ProtectedRoute>)
            },
        ],
    },
]);
