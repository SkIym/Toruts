import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import ProtectedRoute from "./ProtectedRoute";
import UserTypeProtectedRoute from "./UserTypeProtectedRoute";

import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import InfoPage from "../pages/ProfileEditPage";
import SelectPage from "../pages/SelectPage";
import { UserType } from "../types/types";
import { PATH } from "@/constants/constants";


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
